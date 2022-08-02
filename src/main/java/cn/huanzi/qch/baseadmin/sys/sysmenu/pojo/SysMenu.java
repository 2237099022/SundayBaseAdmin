package cn.huanzi.qch.baseadmin.sys.sysmenu.pojo;

import lombok.Data;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "sys_menu")
@Data
public class SysMenu implements Serializable {
    @Id
    private String menuId;//菜单id

    private String menuName;//菜单名称

    private String menuPath;//菜单路径

    private String menuParentId;//上级id

    private Integer sortWeight;//同级排序权重：0-10

    private Date createTime;//创建时间

    private Date updateTime;//修改时间

}
