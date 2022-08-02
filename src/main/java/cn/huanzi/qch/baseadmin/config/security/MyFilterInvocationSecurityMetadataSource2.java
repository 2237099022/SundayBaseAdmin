package cn.huanzi.qch.baseadmin.config.security;

import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import java.util.*;

/**
 * 配置认证数据源，实现动态权限加载（注意：不要手动new，把它交给spring管理，spring默认单例）
 */
@Component
public class MyFilterInvocationSecurityMetadataSource2 implements FilterInvocationSecurityMetadataSource{
        
        private Map<RequestMatcher, Collection<ConfigAttribute>> requestMap;

        // ~ Constructors
        // ===================================================================================================

        /**
         * Sets the internal request map from the supplied map. The key elements should be of
         * type {@link RequestMatcher}, which. The path stored in the key will depend on the
         * type of the supplied UrlMatcher.
         *
         * @param requestMap order-preserving map of request definitions to attribute lists
         */
        public MyFilterInvocationSecurityMetadataSource2(
                LinkedHashMap<RequestMatcher, Collection<ConfigAttribute>> requestMap) {

            this.requestMap = requestMap;
        }

        // ~ Methods
        // ========================================================================================================

        public Collection<ConfigAttribute> getAllConfigAttributes() {
            Set<ConfigAttribute> allAttributes = new HashSet<>();

            for (Map.Entry<RequestMatcher, Collection<ConfigAttribute>> entry : requestMap
                    .entrySet()) {
                allAttributes.addAll(entry.getValue());
            }

            return allAttributes;
        }

        public Collection<ConfigAttribute> getAttributes(Object object) {
            final HttpServletRequest request = ((FilterInvocation) object).getRequest();
            for (Map.Entry<RequestMatcher, Collection<ConfigAttribute>> entry : requestMap
                    .entrySet()) {
                if (entry.getKey().matches(request)) {
                    return entry.getValue();
                }
            }
            return null;
        }

        public boolean supports(Class<?> clazz) {
            return FilterInvocation.class.isAssignableFrom(clazz);
        }
}
