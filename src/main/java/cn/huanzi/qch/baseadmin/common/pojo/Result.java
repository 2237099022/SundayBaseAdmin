package cn.huanzi.qch.baseadmin.common.pojo;

import cn.huanzi.qch.mycode.myconfig.exceptionhandl.BaseErrorInfoInterface;
import lombok.Data;
import org.apache.poi.ss.formula.functions.T;

import java.io.Serializable;

/**
 * 统一返回对象
 */

@Data
public class Result<T> implements Serializable {
    /**
     * 通信数据
     */
    private T data;
    /**
     * 通信状态
     */
    private boolean flag = true;
    /**
     * 通信描述
     */
    private String msg = "操作成功";
    /**
     * 通信码
     */
    private String code = "-1";


    /**
     * 通过静态方法获取实例
     */

    /**
     * 通过静态方法获取实例
     */
    public static <T> Result<T> of(boolean flag) {
        return new Result<>(flag);
    }

    public static <T> Result<T> of(T data) {
        return new Result<>(data);
    }

    public static <T> Result<T> of(T data, boolean flag) {
        return new Result<>(data, flag);
    }

    public static <T> Result<T> of(T data, boolean flag, String msg) {
        return new Result<>(data, flag, msg);
    }


    public static <T> Result<T> of(T data, boolean flag, String msg,String code) {
        return new Result<>(data, flag, msg,code);
    }

    public static <T> Result<T> of(boolean flag, String msg) {
        return new Result<>(flag, msg);
    }

    @Deprecated
    public Result() {

    }

    private Result(T data) {
        this.data = data;
    }


    private Result(boolean flag) {
        this.flag = flag;
    }


    private Result(T data, boolean flag) {
        this.data = data;
        this.flag = flag;
    }

    private Result(T data, boolean flag, String msg) {
        this.data = data;
        this.flag = flag;
        this.msg = msg;
    }

    private Result(T data, boolean flag, String msg,String code) {
        this.data = data;
        this.flag = flag;
        this.msg = msg;
        this.code = code;
    }

    private Result(boolean flag, String msg) {
        this.flag = flag;
        this.msg = msg;
    }


    /**
     * 失败
     */
    public static Result error(String message, Object data) {
        return Result.of(data,false,message);
    }


    /**
     * 失败
     */
    public static Result error(String code,String message) {
        return Result.of(null,false,message,code);
    }

    /**
     * 失败
     */
    public static Result error(String code,String message, Object data) {
        return Result.of(data,false,message,code);
    }

    /**
     * 失败
     */
    public static Result error(String message) {
        return Result.of(false,message);
    }

    /**
     * 失败
     */
    public static Result error(BaseErrorInfoInterface errorInfo) {
        return Result.error(errorInfo.getResultCode(),errorInfo.getResultMsg());
    }


}
