@file:JvmName("MyStrUtil")
package cn.huanzi.qch.mycode.mycommon.utils

import java.util.regex.Pattern

/**
 * 去除空格与换行与制表符
 * 
 * @param str
 * @return
 */
fun quKongGeHuanHang(str: String): String? {
    //去空格和换行制表等空字符
    return str.replace("\\s*".toRegex(), "")
}

/*
 * 判断是否为整数[0-9整数]
 * 
 * 是返回true
 */
fun isZhengZhengShu(s: String?): Boolean {
    val pattern = Pattern.compile("[0-9]*")
    val isNum = pattern.matcher(s)
    return isNum.matches()
}

/**
 * 获得字符串中的汉字
 * 
 */
fun getHanZi(oldString: String?): String {
    var res="";
    return if (oldString != null) {
        if (oldString != null && oldString.length > 0 && oldString != "null" && oldString != "" && oldString != "null") {
            oldString.replace("[^\u3a00-\ufa99]".toRegex(), "")
        } else {
            ""
        }
    } else {
        ""
    }
}


