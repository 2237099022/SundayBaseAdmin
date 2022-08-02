package cn.huanzi.qch.baseadmin.common.service;

import cn.huanzi.qch.baseadmin.common.pojo.PageCondition;
import cn.huanzi.qch.baseadmin.common.pojo.PageInfo;
import cn.huanzi.qch.baseadmin.common.pojo.Result;
import cn.huanzi.qch.baseadmin.common.repository.CommonRepository;
import cn.huanzi.qch.baseadmin.sys.sysuser.service.SysUserService;
import cn.huanzi.qch.baseadmin.sys.sysuser.vo.SysUserVo;
import cn.huanzi.qch.baseadmin.util.CopyUtil;
import cn.huanzi.qch.baseadmin.util.ErrorUtil;
import cn.huanzi.qch.baseadmin.util.SecurityUtil;
import cn.huanzi.qch.baseadmin.util.SqlUtil;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.NotFound;
import org.hibernate.query.sql.internal.NativeQueryImpl;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.util.StringUtils;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Id;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

/**
 * 通用Service实现类
 *
 * @param <V> 实体类Vo
 * @param <E> 实体类
 * @param <T> id主键类型
 */
@Slf4j
public class ZiZengCommonServiceImpl<V, E, T> implements MyCommonService<V, E, T> {
    //EntityManager
    @PersistenceContext
    private EntityManager em;
    //操作人
    @Autowired
    private SysUserService sysUserService;
    
    private Class<V> entityVoClass;//实体类Vo

    private Class<E> entityClass;//实体类

    @Autowired
    private CommonRepository<E, T> commonRepository;//注入实体类仓库
    private V entityVo;

    public ZiZengCommonServiceImpl() {
        Type[] types = ((ParameterizedType) this.getClass().getGenericSuperclass()).getActualTypeArguments();
        this.entityVoClass = (Class<V>) types[0];
        this.entityClass = (Class<E>) types[1];
    }

    @Override
    public Result<PageInfo<V>> page(V entityVo) {
        //缺失分页信息
        if (!(entityVo instanceof PageCondition)) {
            throw new RuntimeException("缺失分页参数！");
        }
        PageCondition pageCondition = (PageCondition) entityVo;
        //先entityVo转entity，再调用findAll（传多一个分页参数），结果集再转回entityVo
        return Result.of(PageInfo.of(commonRepository.findAll(Example.of(CopyUtil.copy(entityVo, entityClass)), pageCondition.getPageable()), entityVoClass));
    }

    @Override
    public Result<List<V>> list(V entityVo) {
        //先entityVo转entity，再调用findAll，结果集再转回entityVo
        return Result.of(CopyUtil.copyList(commonRepository.findAll(Example.of(CopyUtil.copy(entityVo, entityClass))), entityVoClass));
    }

    @Override
    public Result<V> get(T id) {
        //findById返回Optional<T>，再获取entity转成entityVo
        return commonRepository.findById(id).map(e -> Result.of(CopyUtil.copy(e, entityVoClass))).orElseGet(() -> Result.of(null, false, "ID不存在！"));
    }


    @Override
    public E getE(T id) {
        //findById返回Optional<T>，再获取entity转成entityVo

        Optional<E> byId = commonRepository.findById(id);

        E e = byId.get();

        return e;
    }

    @Override
    public Result<V> save(V entityVo) {
        //传进来的对象（属性可能残缺）
        E entity = CopyUtil.copy(entityVo, entityClass);

        //最终要保存的对象
        E entityFull = entity;

        //为空的属性值，忽略属性，BeanUtils复制的时候用到
        List<String> ignoreProperties = new ArrayList<>(5);

        //获取最新数据，解决部分更新时jpa其他字段设置null问题
        try {
            //新增 true，更新 false，要求实体类的Id属性排在第一位，因为for循环读取是按照顺序的
            boolean isInsert = false;

            //反射获取Class的属性（Field表示类中的成员变量）
            for (Field field : entity.getClass().getDeclaredFields()) {
                //获取授权
                field.setAccessible(true);
                //属性名称
                String fieldName = field.getName();
                //属性的值
                Object fieldValue = field.get(entity);
                Object fieldValueFull = field.get(entityFull);

                //找出Id主键
                if (field.isAnnotationPresent(Id.class)) {
                    if(!StringUtils.isEmpty(fieldValue)){
                        //如果Id主键不为空，则为更新
                        Optional<E> one = commonRepository.findById((T) fieldValue);
                        if (one.isPresent()) {
                            entityFull = one.get();
                        }
                    }else{
                        //如果Id主键为空，则为新增
                        //我的修改↓删除了uuid,留空数据库自增
                        //fieldValue = UUIDUtil.getUuid();
                        //我的修改↑
                        //set方法，第一个参数是对象
                        field.set(entity, fieldValue);
                        isInsert = true;
                    }
                }
                //如果前端不传这两个值，后台来维护创建时间、更新时间
                if(isInsert && "createTime".equals(fieldName) && StringUtils.isEmpty(fieldValueFull)){
                    //先赋值给fieldValue，以免后续进行copy对象判断属性是否为忽略属性是出错
                    fieldValue = new Date();
                    //set方法，第一个参数是对象
                    field.set(entity, fieldValue);
                }
                //我的修改↓增加了创建人
                //操作人
                if("createUser".equals(fieldName) && StringUtils.isEmpty(fieldValueFull)){
                    User user = SecurityUtil.getLoginUser();
                    SysUserVo sysUserVo = sysUserService.findByLoginName(SecurityUtil.getLoginUser().getUsername()).getData();
                    
                    //先赋值给fieldValue，以免后续进行copy对象判断属性是否为忽略属性是出错
                    fieldValue = sysUserVo.getUserId()+","+sysUserVo.getLoginName()+","+sysUserVo.getUserName();
                    //set方法，第一个参数是对象
                    field.set(entity, fieldValue);
                }
                //我的修改↑
                //找出值为空的属性，值为空则为忽略属性，或者被NotFound标注，我们复制的时候不进行赋值
                if(null == fieldValue || field.isAnnotationPresent(NotFound.class)){
                    ignoreProperties.add(fieldName);
                }
            }
            /*
                org.springframework.beans BeanUtils.copyProperties(A,B); 是A中的值付给B
                org.apache.commons.beanutils; BeanUtils.copyProperties(A,B);是B中的值付给A
                把entity的值赋给entityFull，第三个参数是忽略属性，表示不进行赋值
             */
            BeanUtils.copyProperties(entity, entityFull, ignoreProperties.toArray(new String[0]));
        } catch (IllegalAccessException e) {
            //输出到日志文件中
            log.error(ErrorUtil.errorInfoToString(e));
        }

        E e = commonRepository.save(entityFull);
        
        return Result.of(CopyUtil.copy(e, entityVoClass));
    }

    @Override
    public Result<T> delete(T id) {
        commonRepository.deleteById(id);
        return Result.of(id);
    }

    @Override
    public Result<PageInfo<V>> chaLikeFenYeByShiTiLei(V para) {
        //缺失分页信息
        if (!(para instanceof PageCondition)) {
            throw new RuntimeException("缺失分页参数！");
        }
        
        //获取分页信息
        PageCondition pageCondition = (PageCondition) para;
        
        StringBuilder stringBuilder = SqlUtil.joinSqlByEntityAndVo(entityClass, para);

        //SQL
        String sql=stringBuilder+"";
        
        //设置SQL、映射实体，以及设置值，返回一个Query对象
        Query query = em.createNativeQuery(sql, entityClass);
        
        //分页、排序信息，并设置，page从0开始
        PageRequest pageRequest = PageRequest.of(pageCondition.getPage()-1, pageCondition.getRows());
        query.setFirstResult((int) pageRequest.getOffset());
        query.setMaxResults(pageRequest.getPageSize());

        //获取分页结果
        Page page = PageableExecutionUtils.getPage(query.getResultList(), pageRequest, () -> {
            //设置countQuerySQL语句
            Query countQuery = em.createNativeQuery("select count(1) from ( " + ((NativeQueryImpl) query).getQueryString() + " ) count_table");
            //设置countQuerySQL参数
            query.getParameters().forEach(parameter -> countQuery.setParameter(parameter.getName(), query.getParameterValue(parameter.getName())));
            //返回一个总数
            return Long.valueOf(countQuery.getResultList().get(0).toString());
        });

        //组装返回值

        return Result.of(PageInfo.of(page, entityVoClass));
        //List<YyfjBianGengMingXi> res=yyfjBianGengMingXiRepository.chaLikeFenYeByShiTiLei(sql);

    }

    @Override
    public List<E> saveAll(List<E> parml)  {

        List<E> es = new ArrayList<>();
        
        es = commonRepository.saveAll(parml);
        
        return es;
    }
    
}
