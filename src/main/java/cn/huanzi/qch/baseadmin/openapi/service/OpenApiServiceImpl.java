package cn.huanzi.qch.baseadmin.openapi.service;

import cn.huanzi.qch.baseadmin.common.pojo.Result;
import cn.huanzi.qch.baseadmin.util.CopyUtil;
import cn.hutool.core.date.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.Random;

@Service
public class OpenApiServiceImpl implements OpenApiService {
    

    
    @Override
    @Transactional(rollbackFor = Exception.class)
    public Result<String> test() {
        
        
        return Result.of("无需登录的接口：OpenApi测试数据！");
    }
}
