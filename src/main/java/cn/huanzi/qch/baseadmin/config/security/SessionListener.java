package cn.huanzi.qch.baseadmin.config.security;


import cn.huanzi.qch.baseadmin.util.SecurityUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import jakarta.servlet.annotation.WebListener;
import jakarta.servlet.http.HttpSession;
import jakarta.servlet.http.HttpSessionEvent;
import jakarta.servlet.http.HttpSessionListener;

/**
 * session创建、销毁监听
 */
@Slf4j
@WebListener
public class SessionListener implements HttpSessionListener {

    @Autowired
    private SecurityUtil securityUtil;

    /**
     * session创建
     */
    @Override
    public void sessionCreated(HttpSessionEvent event) {
        log.info("session创建：{}",event.getSession().getId());
    }

    /**
     * session销毁
     */
    @Override
    public void sessionDestroyed(HttpSessionEvent event) {
        HttpSession session = event.getSession();

        log.info("session销毁：{}",session.getId());

        
        //从注册表中移除
        if(securityUtil!=null){
            securityUtil.sessionRegistryRemoveUserByRequest(session.getId());
        }
        
        
    }
}