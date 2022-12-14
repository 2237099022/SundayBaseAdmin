package cn.huanzi.qch.baseadmin.config.security;

import cn.huanzi.qch.baseadmin.sys.sysauthority.service.SysAuthorityService;
import cn.huanzi.qch.baseadmin.sys.sysauthority.vo.SysAuthorityVo;
import cn.huanzi.qch.baseadmin.util.UUIDUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.AccessDecisionVoter;
import org.springframework.security.access.vote.RoleVoter;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.web.access.intercept.FilterSecurityInterceptor;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

@EnableWebSecurity
@Configuration
@EnableGlobalMethodSecurity(
        prePostEnabled = true,
        securedEnabled = true,
        jsr250Enabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    
    /*@Autowired
    private AuthenticationManager authenticationManager;*/
    
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
    
    @Autowired
    private CaptchaFilterConfig captchaFilterConfig;

    @Autowired
    private UserDetailsServiceImpl userDetailsServiceImpl;

    @Autowired
    private PasswordConfig passwordConfig;

    @Autowired
    private LoginFailureHandlerConfig loginFailureHandlerConfig;

    @Autowired
    private LoginSuccessHandlerConfig loginSuccessHandlerConfig;

    @Autowired
    private LogoutHandlerConfig logoutHandlerConfig;

    @Autowired
    private SysAuthorityService sysAuthorityService;

    @Autowired
    private MyFilterInvocationSecurityMetadataSource myFilterInvocationSecurityMetadataSource;

    @Autowired
    private DataSource dataSource;

    //?????????????????????URL???????????????/**/???/*.??????????????????????????????????????????CaptchaFilterConfig???????????????
    public static final String[] MATCHERS_PERMITALL_URL = {
            "/login",
            "/logout",
            "/loginPage",
            "/favicon.ico",
            "/common/**",
            "/webjars/**",
            "/getVerifyCodeImage",
            "/error/*",
            "/openApi/*",
            //????????????
            "/myjscss/mycommon/**",
            "/modules/**",
    };

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                //??????????????????
                .userDetailsService(userDetailsServiceImpl)
                //????????????
                .passwordEncoder(passwordConfig);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                // ??????csrf??????
                .csrf().disable()
                .headers().frameOptions().disable()
                .and();

        http
                //????????????
                .addFilterBefore(captchaFilterConfig, UsernamePasswordAuthenticationFilter.class)
                .formLogin()
                .loginProcessingUrl("/login")
                //??????????????????????????????
                .loginPage("/loginPage")
                .failureHandler(loginFailureHandlerConfig)
                .successHandler(loginSuccessHandlerConfig)
                .permitAll()
                .and();
        http
                //????????????
                .logout()
                .addLogoutHandler(logoutHandlerConfig)
                .logoutUrl("/logout")
                .logoutSuccessUrl("/loginPage")
                .permitAll()
                .and();
        http
                //??????url?????????????????????????????????????????????https://www.jianshu.com/p/0a06496e75ea
                .addFilterAfter(dynamicallyUrlInterceptor(), FilterSecurityInterceptor.class)
                .authorizeRequests()

                //??????????????????
                .antMatchers(MATCHERS_PERMITALL_URL).permitAll()

                //???????????????????????????????????????
                .anyRequest().authenticated()
                .and();

        http
                //???????????????
                .rememberMe()
                .tokenValiditySeconds(604800*53)//???????????????
                .tokenRepository(persistentTokenRepository())
                .userDetailsService(userDetailsServiceImpl)
                .rememberMeServices(myPersistentTokenBasedRememberMeServices())
                .and();
    }

    @Bean
    public PersistentTokenRepository persistentTokenRepository() {
        JdbcTokenRepositoryImpl persistentTokenRepository = new JdbcTokenRepositoryImpl();
        persistentTokenRepository.setDataSource(dataSource);
        return persistentTokenRepository;
    }

    @Bean()
    public MyPersistentTokenBasedRememberMeServices myPersistentTokenBasedRememberMeServices() {
        MyPersistentTokenBasedRememberMeServices rememberMeServices = new MyPersistentTokenBasedRememberMeServices(UUIDUtil.getUuid(), userDetailsServiceImpl,persistentTokenRepository());
        rememberMeServices.setAlwaysRemember(true);
        return rememberMeServices;
    }

    @Bean
    public DynamicallyUrlInterceptor dynamicallyUrlInterceptor(){
        //????????????
        myFilterInvocationSecurityMetadataSource.setRequestMap(sysAuthorityService.list(new SysAuthorityVo()).getData());
        //????????????????????????????????????
        DynamicallyUrlInterceptor interceptor = new DynamicallyUrlInterceptor();
        interceptor.setSecurityMetadataSource(myFilterInvocationSecurityMetadataSource);

        //??????RoleVoter??????
        List<AccessDecisionVoter<?>> decisionVoters = new ArrayList<>(1);
        decisionVoters.add(new RoleVoter());

        //???????????????????????????
        interceptor.setAccessDecisionManager(new MyAccessDecisionManager(decisionVoters));
        return interceptor;
    }

    @Bean
    SessionRegistry sessionRegistry() {
        return new SessionRegistryImpl();
    }
}