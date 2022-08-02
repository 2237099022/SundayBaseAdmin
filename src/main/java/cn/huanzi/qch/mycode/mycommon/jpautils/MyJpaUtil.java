package cn.huanzi.qch.mycode.mycommon.jpautils;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * The interface Param transformer.
 *
 * @author 问道于盲
 * @date 2019-06-14
 */
public class MyJpaUtil {
    /**
     * 获取查询对象的所有属性 获取父类属性是为了保证继承
     *
     * @param object 查询条件封装 或者class对象
     * @return 属性集合 declared fields
     */
    public static List<Field> getDeclaredFields(Object object) {
        Class<?> clazz;
        if (object instanceof Class) {
            clazz = (Class<?>) object;
        } else {
            clazz = object.getClass();
        }

        List<Field> fieldList = new ArrayList<>();
        while (!clazz.equals(Object.class)) {
            Field[] fields = clazz.getDeclaredFields();
            if (fields.length > 0) {
                fieldList.addAll(Arrays.asList(fields));
            }
            clazz = clazz.getSuperclass();
        }
        return fieldList;
    }

    /**
     * 获取属性值
     *
     * @param queryPojo 查询对象
     * @param field     属性
     * @return 值 field value
     */
    public static Object getFieldValue(Object queryPojo, Field field) {
        boolean accessible = field.isAccessible();
        if (!accessible) {
            field.setAccessible(true);
        }
        try {
            return field.get(queryPojo);

        } catch (Exception e) {
            throw new UnsupportedOperationException(e.getMessage(), e);
        } finally {
            if (!accessible) {
                field.setAccessible(false);
            }
        }
    }

    /**
     * 驼峰转下划线
     *
     * @param para 源字符串
     * @return 带下划线的字符串 string
     */
    public static String humpToUnderline(String para) {
        StringBuilder sb = new StringBuilder(para);
        // 定位
        int temp = 0;
        if (!para.contains("_")) {
            for (int i = 0; i < para.length(); i++) {
                if (Character.isUpperCase(para.charAt(i))) {
                    sb.insert(i + temp, "_");
                    temp += 1;
                }
            }
        }
        return sb.toString().toUpperCase();
    }
    
    
}
