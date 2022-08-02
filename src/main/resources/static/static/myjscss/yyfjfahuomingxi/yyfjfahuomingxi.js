
layui.config({
    base: '../../modules/', //配置 layui 第三方扩展组件存放的基础目录
    version: 'v1.6.4' // 插件版本号
}).extend({
    soulTable: 'soulTable/soulTable',
    tableChild: 'soulTable/tableChild',
    tableMerge: 'soulTable/tableMerge',
    tableFilter: 'soulTable/tableFilter',
    excel: 'soulTable/excel',
}).use(['form', 'table','soulTable'],function () {

let soulTable = layui.soulTable;
    
//引用组件
let layer = layui.layer;
let table = layui.table;
let form = layui.form;
let laydate = layui.laydate;
let upload = layui.upload;

//定义名称
let pojoName = 'yyfjfahuomingxi';
//定义请求路径
let requestPath = ctx + '/mycode/'+pojoName;
//获取用户
let loginUserSessionStorage = sessionStorage.getItem('loginUser');

let queryData = {};

let mycommon1 = new mycommon();
//获取插叙输入框 空字符转成undefined
queryData['dingDanHao'] = mycommon1.kongZiFuZhuanUndefined($('#dingDanHao').val());

//layuiTable参数
let newTableVar = {
    elem: '#'+pojoName
    , url: requestPath+'/page'//@erupt注解的实体类的url路径
    , method: 'post'//必须是post
    //请求前转换分页参数名称
    , request: {
        pageName: 'page' //页码的参数名称，默认：page
        , limitName: 'rows' //每页数据量的参数名，默认：limit
    }
    //设置返回的数据格式
    , response: {
        statusName: 'flag' //规定数据状态的字段名称，默认：code
        , statusCode: true //规定成功的状态码，默认：0
        , msgName: 'msg' //规定状态信息的字段名称，默认：msg
        , countName: 'records' //规定数据总数的字段名称，默认：count
        , dataName: 'rows' //规定数据列表的字段名称，默认：data
    }
    //文件导出时的标题
    , title: '发货明细'
    //列标题
    , cols: [[
        
        {field: 'dingDanHao',hide:false, title: '订单号',width:220}
        , {field: 'xiuGaiLeiXing',hide:false, title: '修改类型',filter:true,sort:true}
        , {field: 'xiuGaiQian',hide:false, title: '修改前',filter:true,sort:true}
        , {field: 'xiuGaiHou',hide:false, title: '修改后',filter:true,sort:true}
        , {field: 'xiuGaiShuoMing',hide:false, title: '修改说明'}
        , {field: 'xiuGaiRen',hide:false, title: '操作人',templet:function (d) {
                let res="";
                if(mycommon1.buWeiKong(d.xiuGaiRen)&&d.xiuGaiRen.indexOf(",") != -1){
                    res=d.xiuGaiRen.split(",")[2];
                } else{
                    res=d.xiuGaiRen;
                }
                return res;

            },width:100}
        , {field: 'xiuGaiTime',hide:false, title: '修改时间',width:122}

    ]]
    //开启分页
    , page: false
    //每页显示
    , limit:999999999
    //可以选择每页多少条
    , limits:[5,10,50,100,500,1000,10000,999999999]
    //用于将返回的任意数据格式解析成 table 组件规定的数据格式
    , parseData: function (res) { //res 即为原始返回的数据
        let data = res.data;
        return {
            "flag": res.flag, //解析接口状态
            "msg": res.msg, //解析提示文本
            "records": data.records, //解析数据长度
            "rows": data.rows //解析数据列表
        };
    }
    ,where: queryData
    , done: function (res, curr, count) {
        soulTable.render(this)
    }
};
table.render(newTableVar);

});
