@file:JvmName("MemberCodeUtil")
package cn.huanzi.qch.mycode.mycommon.utils

/**
 * 获得业务员编号
 */
fun initOldCode(oldBianHao: String): String {
    var oldBianHao = oldBianHao
    oldBianHao = try {
        val replace = oldBianHao.replace(" ", "")
        replace.substring(replace.length - 6)
    } catch (e: Exception) {
        return oldBianHao
    }
    return oldBianHao
}

/**
 * 格式化新编号
 * 
 * 
 */
fun initNewCode(oldBianHao: String): String {
    return try {
        val replace = oldBianHao.replace(" ", "")
        val length = replace.length
        if (length == 10) {
            val substring = replace.substring(0, 4)
            if (substring.equals("sl00", ignoreCase = true)) {
                val houliuwei = replace.substring(replace.length - 6)
                if (isZhengZhengShu(houliuwei)) {
                    replace.substring(replace.length - 6)
                } else {
                    "编号错误$oldBianHao"
                }
            } else {
                "编号错误$oldBianHao"
            }
        } else if (length == 8) {
            val firststr = replace.substring(0, 1)
            val secondstr = replace.substring(0, 2)
            if (secondstr.equals("sl", ignoreCase = true) || secondstr.equals("00", ignoreCase = true)) {
                val houliuwei = replace.substring(replace.length - 6)
                if (isZhengZhengShu(houliuwei)) {
                    replace.substring(replace.length - 6)
                } else {
                    "编号错误$oldBianHao"
                }
            } else if (firststr.equals("s", ignoreCase = true)) {
                val houqiwei = replace.substring(replace.length - 7)
                if (isZhengZhengShu(houqiwei)) {
                    "s$houqiwei"
                } else {
                    "编号错误$oldBianHao"
                }
            } else {
                "编号错误$oldBianHao"
            }
        } else if (length == 6) {
            if (isZhengZhengShu(oldBianHao)) {
                oldBianHao
            } else {
                "编号错误$oldBianHao"
            }
        } else {
            "编号错误$oldBianHao"
        }
    } catch (e: Exception) {
        "编号错误"
    }
}