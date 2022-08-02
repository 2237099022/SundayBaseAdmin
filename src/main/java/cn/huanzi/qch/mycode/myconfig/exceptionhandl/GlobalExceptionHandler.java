package cn.huanzi.qch.mycode.myconfig.exceptionhandl;


import cn.huanzi.qch.baseadmin.common.pojo.Result;
import cn.hutool.core.exceptions.ExceptionUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;



@ControllerAdvice
public class GlobalExceptionHandler {

    /**
     * 处理自定义的业务异常
     *
     * @param req
     * @param e
     * @return
     */
    @ExceptionHandler(value = BizException.class)
    @ResponseBody
    public Result bizExceptionHandler(HttpServletRequest req, BizException e) {
        //return Result.error(req.toString() + "-----" + e.toString());

        String exceptionCause = "";
        try {
            int i=0;
            Throwable cause = e.getCause();
            while (cause != null||i>10) {
                exceptionCause += cause.toString();
                cause = cause.getCause();
                i++;
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        return Result.error(e.getErrorCode(), "请求地址:" + req.getRequestURI() + "-错误码:" + e.getErrorCode() + "-错误信息:" + e.getErrorMsg() + "-错误详细:" + exceptionCause);
    }

    /**
     * 处理空指针的异常
     * @param req
     * @param e
     * @return
     */
    /*@ExceptionHandler(value =NullPointerException.class)
    @ResponseBody
    public Result exceptionHandler(HttpServletRequest req, NullPointerException e){
        logger.error("发生空指针异常！原因是:",e);
        return Result.error(CommonEnum.BODY_NOT_MATCH);
    }*/
    
    /**
     * 处理其他异常
     * @param req
     * @param e
     * @return
     */
    /*@ExceptionHandler(value =Exception.class)
    @ResponseBody
    public Result exceptionHandler(HttpServletRequest req, Exception e){
        logger.error("未知异常！原因是:",e);
        String s = e.fillInStackTrace().toString();
        String s1 = ExceptionUtil.stacktraceToString(e);
        System.out.println("------"+s1);
        String requestURI = req.getRequestURI();
        requestURI + "-----" + e.toString()
        return ResultBody.error(e.toString());

        return Result.error(e.toString());
    }*/

    /**
     * 处理其他异常
     *
     * @param req
     * @param e
     * @return
     */
    @ExceptionHandler(value = Exception.class)
    @ResponseBody
    public Result exceptionHandler(HttpServletRequest req, Exception e) {
        
        String exceptionCause = "";
        try {
            int i=0;
            Throwable cause = e.getCause();
            while (cause != null||i>10) {
                exceptionCause += cause.toString();
                cause = cause.getCause();
                i++;
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        return Result.error("请求地址:" + req.getRequestURI() + "-错误类型:" + e.toString() + "-错误信息:" + exceptionCause);
    }
}
