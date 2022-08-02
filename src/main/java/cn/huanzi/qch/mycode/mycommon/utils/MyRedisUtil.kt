@file:JvmName("MyRedisUtil")
package cn.huanzi.qch.mycode.mycommon.utils

import cn.hutool.db.nosql.redis.RedisDS
import java.io.File
import java.io.IOException

/**
 * 获取默认配置的RedisDs对象
 * 
 * @return
 */
fun createRedisDS(): RedisDS {
    val directory = File("src/main/resources")
    var reportPath: String? = null
    try {
        reportPath = directory.canonicalPath
    } catch (e: IOException) {
        e.printStackTrace()
    }
    return RedisDS(reportPath + RedisDS.REDIS_CONFIG_PATH)
}

/**
 * 获取jedis用于操作redis
 * 
 * @return
 */
/*fun getJedis(): Jedis? {
    return createRedisDS().jedis
}*/
