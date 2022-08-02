@file:JvmName("MyExcelUtil")
package cn.huanzi.qch.mycode.mycommon.utils

import cn.hutool.core.collection.IterUtil
import cn.hutool.core.date.DateUtil
import cn.hutool.core.io.IoUtil
import cn.hutool.core.util.StrUtil
import cn.hutool.poi.excel.ExcelUtil

import java.io.IOException
import java.io.UnsupportedEncodingException
import java.net.URLEncoder

import jakarta.servlet.ServletOutputStream
import jakarta.servlet.http.HttpServletResponse

/**
 * 导出excel
 * 
 * @param data 导出数据
 * @param response 浏览器response
 * @param lieKuan 列宽
 * @param fileName 文件名 自动加时间后缀
 * @param titleBieMing 标题列别名
 * @throws UnsupportedEncodingException
 */
@kotlin.Throws(UnsupportedEncodingException::class)
fun downExcel(
    data: Iterable<*>,
    response: HttpServletResponse,
    lieKuan: Int,
    fileName: String,
    titleBieMing: Map<String, String?>
) {

    //如果不为空则导出
    if (IterUtil.size(data) != 0) {

        //获得excelwriter对象
        val writer = ExcelUtil.getWriter(true)

        //设置标题别名
        for (entry in titleBieMing) {
            writer.addHeaderAlias(entry.key, entry.value)
        }

        //写入excel数据
        writer.write(data, true)
        //设置excel列宽
        writer.setColumnWidth(-1, lieKuan)
        //返回网页下载
        val name = StrUtil.utf8Str(fileName + DateUtil.now())
        var out: ServletOutputStream? = null
        response.contentType = "application/binary;charset=utf-8"
        response.setHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode("$name.xlsx", "utf-8"))
        try {
            out = response.outputStream
            writer.flush(out, true)
        } catch (e: IOException) {
            e.printStackTrace()
        } finally {
            // 关闭writer，释放内存
            writer.close()
        }
        //此处记得关闭输出Servlet流
        IoUtil.close(out)
    }
}


/**
 * 判断表头对不对
 * 
 * uploadFileTitle 上传的二维list
 * rightTitle 正确的二维list
 * map 对应 行-列
 * rightCount 应该正确的数量
 */
fun isTitOk(
    uploadFileTitle: List<List<String>>,
    rightTitle:List<List<String>>,
    hangLie: Array<IntArray>,
    rightCount: Int
): Boolean {

    var okTitle = 0

    for (entry in hangLie) {
        val thisCell = uploadFileTitle[entry[0]][entry[1]]
        val rightCell = rightTitle[entry[0]][entry[1]]
        if (thisCell.contains(rightCell)) {
            okTitle += 1
        }

    }

    var titleYiZhi = false
    if (okTitle == rightCount) {
        titleYiZhi = true
    }
    return titleYiZhi
}


