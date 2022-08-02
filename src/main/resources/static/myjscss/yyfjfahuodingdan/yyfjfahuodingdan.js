layui.use(function(){
//引用组件
let layer = layui.layer;
let table = layui.table;
let form = layui.form;
let laydate = layui.laydate;
let upload = layui.upload;

//定义名称
let pojoName = 'yyfjfahuodingdan';
//定义请求路径
let requestPath = ctx + '/mycode/' + pojoName;

//layuiTable参数
let newTableVar = {
    elem: '#' + pojoName
    , url: requestPath + '/page'//@erupt注解的实体类的url路径
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
    , title: '发货订单'
    //列标题
    , cols: [[
        /*{type: 'checkbox'}*/
        {field: 'id', hide: true, width: 50, title: 'ID', sort: true}
        , {field: 'dingDanHao', hide: false, title: '订单号', width: 208}
        , {
            field: 'jiJianXingMing', hide: true, title: '寄件人', templet: function (d) {
                let res = "";
                res += "寄件人姓名:" + d.jiJianXingMing + ""
                res += "手机:" + d.jiJianShouJi + "<br/>"
                res += "寄件人座机:" + d.jiJianZuoJi + "<br/>"
                res += "寄件人地址:" + d.jiJianDiZhi + "<br/>"
                return res;
            }
        }
        , {field: 'jiJianXingMing', hide: true, title: '寄件人姓名'}
        , {field: 'jiJianShouJi', hide: true, title: '寄件人手机'}
        , {field: 'jiJianZuoJi', hide: true, title: '寄件人座机'}
        , {
            field: 'jiJianDiZhi', hide: false, title: '收件人', width: 193, templet: function (d) {
                let res = "";
                res += "收件人姓名:" + d.shouJianXingMing + "<br/>"
                res += "收件人手机:" + d.shouJianShouJi + "<br/>"
                res += "收件人座机:" + d.shouJianZuoJi + "<br/>"
                return res;
            }
        }
        , {field: 'shouJianXingMing', hide: true, title: '收件人姓名'}
        , {field: 'shouJianShouJi', hide: true, title: '收件人手机'}
        , {field: 'shouJianZuoJi', hide: true, title: '收件人座机'}
        , {
            field: 'shouJianDiZhi',
            hide: false,
            title: '收件人地址',
            width: 165,
            style: "text-overflow:ellipsis;overflow:hidden;",
            templet: function (d) {

                let mycommon1 = new mycommon();
                let shouJianDiZhi = d.shouJianDiZhi;
                if (mycommon1.buWeiKong(shouJianDiZhi)) {
                    let res = ""
                    if (shouJianDiZhi.length > 11) {
                        shouJianDiZhi = mycommon1.insertStr(shouJianDiZhi, 11, "<br/>")
                    }
                    if (shouJianDiZhi.length > 26) {
                        shouJianDiZhi = mycommon1.insertStr(shouJianDiZhi, 26, "<br/>")
                    }
                    return "<p>" + shouJianDiZhi + "</p>";
                } else {
                    return shouJianDiZhi
                }


            }
        }
        , {
            field: 'zhiFuJinQianYunFeiHeWuPin', title: '物品信息', width: 220, templet: function (d) {
                let res = "";
                res += "支付金额:" + d.zhiFuJinQian
                res += "<br/>支付运费:" + d.zhiFuYunFei
                res += "<br/>商品:" + d.wuPinXinXi
                return res;
            }
        }
        , {field: 'wuPinXinXi', hide: true, title: '物品信息', width: 100}
        , {field: 'zhiFuJinQian', hide: true, title: '支付金额', width: 100}
        , {field: 'zhiFuYunFei', hide: true, title: '支付运费', width: 100}
        , {
            field: 'zhiFuJinQianYunFeiHeWuPin', title: '快递信息', width: 160, templet: function (d) {
                let res = "";
                res += "快递公司:" + d.kuaiDiGongSi
                res += "<br/>快递网点:" + d.kuaiDiWangDian
                res += "<br/>快递费用:" + d.kuaiDiFei
                return res;
            }
        }
        , {field: 'kuaiDiGongSi', hide: true, title: '快递公司', width: 10}
        , {field: 'kuaiDiWangDian', hide: true, title: '快递网点', width: 10}
        , {field: 'kuaiDiDanHao', hide: false, title: '快递单号', width: 100}
        , {field: 'kuaiDiFei', hide: true, title: '快递费用', width: 10}
        , {field: 'ziTiWanCheng', hide: false, title: '自提完成', width: 95}
        , {
            fixed: 'right', field: 'faHuoState', hide: false, title: '发货状态', width: 95, templet: function (d) {
                //发货状态(1导入,2待发,3已发,4遗留,5退货申请,6退货完成)
                let res = "";
                if (d.faHuoState == 1) {
                    res = "1待发";
                } else if (d.faHuoState == 2) {
                    res = "2待发";
                } else if (d.faHuoState == 3) {
                    res = "3已发";
                } else if (d.faHuoState == 4) {
                    res = "4遗留";
                } else if (d.faHuoState == 5) {
                    res = "5退货";
                } else if (d.faHuoState == 6) {
                    res = "6退货完成";
                } else {

                }
                return res;
            }
        }
        , {
            fixed: 'right', field: 'daoZhangState', hide: false, title: '到账状态', width: 95, templet: function (d) {
                //到账状态(1未到账,2到账,3退款申请,4退款完成)
                let res = "";
                if (d.daoZhangState == 1) {
                    res = "1未到账";
                } else if (d.daoZhangState == 2) {
                    res = "2已到账";
                } else if (d.daoZhangState == 3) {
                    res = "3申请退款";
                } else if (d.daoZhangState == 4) {
                    res = "4退款完成";
                } else {

                }
                return res;
            }
        }
        , {
            field: 'shiFouZiTi', hide: false, title: '自提', width: 120, templet: function (d) {
                //到账状态(1未到账,2到账,3退款申请,4退款完成)
                let res = "";
                if (d.shiFouZiTi == 1) {
                    res = "1自提";
                } else if (d.shiFouZiTi == 2) {
                    res = "2非自提";
                } else {

                }
                return res;
            }
        }
        //, {field: 'bianHuaJiLu', hide: false, title: '变化记录', width: 90}
        , {field: 'beiZhu', hide: true, title: '备注', width: 90}
        , {field: 'createTime', hide: false, title: '导入时间', width: 125}
        , {field: 'updateTime', hide: true, title: '修改时间'}
        , {fixed: 'right', title: '操作', toolbar: '#rowBar', width: 200}
        /**
         , {field: 'xinXi', width: 280, title: '信息',templet: function(d){
            //返回按钮
            showdata = '<button type="button" class="layui-btn layui-btn-radius layui-btn-primary layui-btn-sm"><i class="layui-icon layui-icon-ok"></i>已扣库存</button>';
            var res="";
            //返回值
            return d.xinXi;
            }}
         */
    ]]
    //头部工具栏对应元素
    , toolbar: '#titleBar'
    //头部右侧显示图标
    , defaultToolbar: ["filter","exports","print"
        // ,{
        // title:'关于'
        // ,layEvent:'LAYTABLE_TIPS'
        // ,icon:'layui-icon-tips'
        // }
    ]
    //开启分页
    , page: true
    //每页显示
    , limit: 10
    //可以选择每页多少条
    , limits:[5,10,50,100,500,1000,10000,999999999]
    , height: 'full-100'
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
    //在表格加载完毕后执行的方法
    , done: function (res, curr, count) {
        //设置layui数据表格自动高度
        $(".layui-table-cell").css("height", "auto")
        //$(".layui-table-cell").css("line-height","136px")
        table.resize('' + pojoName + '');

        //设置layui自动高度后,解决使用fixed之后表格与fixed列错位
        $(".layui-table-main tr").each(function (index, val) {
            $(".layui-table-fixed").each(function () {
                $($(this).find(".layui-table-body tbody tr")[index]).height($(val).height());
            });
        });
        $(".layui-table-header tr").each(function (index, val) {
            $(".layui-table-fixed").each(function () {
                $($(this).find(".layui-table-header thead tr")[index]).height($(val).height());
            });
        });
    }
};
let tableIns = table.render(newTableVar);

//--顶部1查询
//最顶部工具栏--------------
$('#addOneFun').click(function () {
    addOneFun();
});
$('#daoChuFun').click(function () {
    daoChuFun();
});

/**
 * 搜索栏
 */

/**
 * 查询提交
 */
function chaXunF() {
    let mycommon1 = new mycommon();
    let queryData = {};

    //获取插叙输入框 空字符转成undefined
    queryData['id'] = mycommon1.kongZiFuZhuanUndefined($('#id').val());
    queryData['fuKuanTime'] = mycommon1.kongZiFuZhuanUndefined($('#fuKuanTime').val());
    queryData['dingDanHao'] = mycommon1.kongZiFuZhuanUndefined($('#dingDanHao').val());
    queryData['jiJianXingMing'] = mycommon1.kongZiFuZhuanUndefined($('#jiJianXingMing').val());
    queryData['jiJianShouJi'] = mycommon1.kongZiFuZhuanUndefined($('#jiJianShouJi').val());
    queryData['jiJianZuoJi'] = mycommon1.kongZiFuZhuanUndefined($('#jiJianZuoJi').val());
    queryData['jiJianDiZhi'] = mycommon1.kongZiFuZhuanUndefined($('#jiJianDiZhi').val());
    queryData['shouJianXingMing'] = mycommon1.kongZiFuZhuanUndefined($('#shouJianXingMing').val());
    queryData['shouJianShouJi'] = mycommon1.kongZiFuZhuanUndefined($('#shouJianShouJi').val());
    queryData['shouJianZuoJi'] = mycommon1.kongZiFuZhuanUndefined($('#shouJianZuoJi').val());
    queryData['shouJianDiZhi'] = mycommon1.kongZiFuZhuanUndefined($('#shouJianDiZhi').val());
    queryData['wuPinXinXi'] = mycommon1.kongZiFuZhuanUndefined($('#wuPinXinXi').val());
    queryData['zhiFuJinQian'] = mycommon1.kongZiFuZhuanUndefined($('#zhiFuJinQian').val());
    queryData['zhiFuYunFei'] = mycommon1.kongZiFuZhuanUndefined($('#zhiFuYunFei').val());
    queryData['kuaiDiGongSi'] = mycommon1.kongZiFuZhuanUndefined($('#kuaiDiGongSi').val());
    queryData['kuaiDiWangDian'] = mycommon1.kongZiFuZhuanUndefined($('#kuaiDiWangDian').val());
    queryData['kuaiDiDanHao'] = mycommon1.kongZiFuZhuanUndefined($('#kuaiDiDanHao').val());
    queryData['kuaiDiFei'] = mycommon1.kongZiFuZhuanUndefined($('#kuaiDiFei').val());
    queryData['ziTiWanCheng'] = mycommon1.kongZiFuZhuanUndefined($('#ziTiWanCheng').val());
    queryData['faHuoState'] = mycommon1.kongZiFuZhuanUndefined($('#faHuoState').val());
    queryData['daoZhangState'] = mycommon1.kongZiFuZhuanUndefined($('#daoZhangState').val());
    queryData['bianHuaJiLu'] = mycommon1.kongZiFuZhuanUndefined($('#bianHuaJiLu').val());
    queryData['beiZhu'] = mycommon1.kongZiFuZhuanUndefined($('#beiZhu').val());
    queryData['createTime'] = mycommon1.kongZiFuZhuanUndefined($('#createTime').val());
    queryData['updateTime'] = mycommon1.kongZiFuZhuanUndefined($('#updateTime').val());

    //let currpage = $('.layui-laypage-em').next().text();
    table.reload("" + pojoName + "", {
        where: queryData
        , url: requestPath + '/page'//@erupt注解的实体类的url路径
        , page: {
            curr: 1
        }

    }, false)

    biaoGeChongZai()

};

//--顶部2操作
/**
 * 顶部工具栏渲染
 */
table.on('toolbar(' + pojoName + ')', function (obj) {
    switch (obj.event) {
        case 'chaXunMoreF':
            //查询更多
            $('.chaXunNone').css('display', 'inline')
            break;
        case 'chaXunLessF':
            //查询更少
            $('.chaXunNone').css('display', 'none')
            break;
        case 'chaXunChongZhiF':
            //查询重置
            $('.layui-table-tool input').val("")
            break;
        case 'chaXunF':
            //查询方法
            chaXunF(obj);
            break;
            
        case 'addOneFun':
            //头部按钮执行的方法
            addOneFun(obj);
            break;
        case 'daoRuFun':
            daoRuFun(obj);
            break;
        case 'daoChuFun':
            //询问框

            //alert("aaa")
            
            



        // case 'LAYTABLE_TIPS':
        //     alert("关于");
        //     break;
    }
});


/**
 * 弹出添加表单
 * @param obj
 */
function addOneFun(obj) {
    //alert("早上")
    layer.open({
        title: '变更申请'
        , type: 1
        //显示添加的表单
        , content: $('#addShowDiv')
        //按钮[确认,取消]
        //,btn: ['提交变更申请','重置', '取消'] //可以无限个按钮
        , closeBtn: 1
    });

}


//导出方法
function daoChuFun(obj) {

    layer.confirm('请选择导出内容', {
        btn: ['物流发货', '自提'] //按钮
    }, function () {

        //向服务端发送指令
        $.post(ctx + requestPath + '/daoChuGeiWuLiuBefore', {ziti: 2}, function (res) {
            if (res.flag) {
                location.href = ctx + requestPath + '/daoChuGeiWuLiuBuJiaMi?ziti=2'
                layer.closeAll();
            } else {
                layer.open({
                    content: res.msg
                });
            }
        });


    }, function () {

        //向服务端发送指令
        $.post(ctx + requestPath + '/daoChuGeiWuLiuBefore', {ziti: 1}, function (res) {
            if (res.flag) {
                location.href = ctx + requestPath + '/daoChuGeiWuLiuBuJiaMi?ziti=1'
                layer.closeAll();
            } else {
                layer.open({
                    content: res.msg
                });
            }
        });
    });

}

/**
 * 提交添加方法
 */
form.on('submit(addSub)', function (data) {

    //确认按钮
    //获取表单区域所有值
    let formData = form.val("addForm");
    formData.bianHao = formData.bianHao.toUpperCase();
    formData.scState = 0;
    formData.zhuangTai = 0;
    formData.boHui = 0;
    //引入当前时间
    let my = new mycommon();

    //向服务端发送指令
    $.post(requestPath + '/save', formData, function (res) {
        $("#addForm")[0].reset();
        layer.closeAll();
        table.reload("" + pojoName + "", {
            page: {
                page: 1
            }
        }, true)
        layer.open({
            content: res.msg
        });
    });

    return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
});

/**
 * 上传取消的订单
 */
var uploadInst = upload.render({
    elem: '#uploadQuXiaoFun' //绑定元素
    , url: requestPath + '/uploadQuXiaoFun'//上传取消的订单
    , accept: 'file'
    , acceptMime: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    , contentType: "application/json"
    , before: function (obj) { //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
        layer.load(); //上传loading
    }
    , done: function (res) {
        //上传完毕回调
        if (res.flag) {
            layer.closeAll();
            var index = layer.open({
                content: '成功' + res.msg
                , move: false//禁止拖拽
            });
            biaoGeChongZai();
        } else {
            var index = layer.open({
                content: '<h2 style="color: red">失败' + res.msg + '</h2>'
                , move: false//禁止拖拽
            });
            //显示错误信息
            layer.closeAll('loading'); //关闭loading
            let showErrStr = "<table class=\"layui-table\">";
            showErrStr += "<thead>\n" +
                "    <tr>\n" +
                "      <th>订单号</th>\n" +
                "      <th>姓名</th>\n" +
                "      <th>错误信息</th>\n" +
                "    </tr> \n" +
                "  </thead>"
            showErrStr += "<tbody>"

            for (let i = 0; i < res.data.length; i++) {
                showErrStr += "<tr>"
                showErrStr += "<td>" + res.data[i].dingDanHao + "</td>"
                showErrStr += "<td>" + res.data[i].shouJianXingMing + "</td>"
                showErrStr += "<td>" + res.data[i].beiZhu + "</td>"
                showErrStr += "</tr>"

            }
            showErrStr += "</tbody></table>"

            layer.open({
                type: 1
                , title: "导入失败,请修改后重新尝试"
                , content: showErrStr
                , btn: '导入失败,请修改后重新尝试'
                , yes: function (index, layero) {
                    layer.closeAll();
                }
            });
        }
    }
    , error: function () {
        //请求异常回调
        console.log("异常")
        var index = layer.open({
            content: '<h1 style="color: red">请求上传接口失败,请重试</h1>'
            , move: false//禁止拖拽
        });
        layer.closeAll('loading'); //关闭loading
    }
});

/**
 * 上传1
 * @type {{elem: string, before: shangChuan1Var.before, acceptMime: string, error: shangChuan1Var.error, contentType: string, done: shangChuan1Var.done, url: string, accept: string}}
 */
let shangChuan1Var = {
    elem: '#daoRuFun'
    , url: requestPath + '/daoRuDaiFaHuiXianBuJiaMi'//上传续会表
    , accept: 'file'
    , acceptMime: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    , contentType: "application/json"
    , before: function (obj) { //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
        layer.load(); //上传loading
    }
    , done: function (res) {
        //上传完毕回调
        //console.log(res.data)
        let newTableVar = {
            elem: '#shangChuanHuiXian' //指定原始表格元素选择器（推荐id选择器）
            , cols: [[
                {field: 'hangShu', title: '行', width: 50}
                , {
                    field: 'faHuoState', title: '设置遗留', width: 95, templet: function (d) {
                        let res = "";
                        if (d.faHuoState == 1) {
                            res = "未发";
                        } else if (d.faHuoState == 2) {
                            res = "已发";
                        } else if (d.faHuoState == 3) {
                            res = "退货";
                        } else if (d.faHuoState == 4) {
                            res = "遗留";
                        } else {

                        }
                        return res;
                    }
                }
                , {field: 'fuKuanTime', title: '付款时间', width: 160}
                , {field: 'dingDanHao', title: '订单号', width: 208}
                /*, {field: 'jiJianXingMing', title: '寄件人姓名',width:10}
                , {field: 'jiJianShouJi', title: '寄件人手机',width:10}
                , {field: 'jiJianZuoJi', title: '寄件人座机',width:10}
                , {field: 'jiJianDiZhi', title: '寄件人地址',width:10}*/
                , {field: 'shouJianXingMing', title: '收件人姓名', width: 100}
                , {field: 'shouJianShouJi', title: '收件人手机', width: 122}
                , {field: 'shouJianZuoJi', title: '收件人座机', width: 10}
                , {field: 'shouJianDiZhi', title: '收件人地址', width: 100}
                , {field: 'wuPinXinXi', title: '物品信息', width: 100}
                , {field: 'zhiFuJinQian', title: '支付金额', width: 90}
                , {field: 'zhiFuYunFei', title: '支付运费', width: 90}
                /*, {field: 'kuaiDiGongSi', title: '快递公司',width:10}
                , {field: 'kuaiDiWangDian', title: '快递网点',width:10}
                , {field: 'kuaiDiDanHao', title: '快递单号',width:10}
                , {field: 'kuaiDiFei', title: '快递费用',width:10}*/
                , {field: 'ziTiWanCheng', title: '自提完成', width: 95}
            ]]
            , limit: Number.MAX_VALUE
            , data: res.data
            , height: (document.body.clientHeight - 210)

            //,…… //更多参数参考右侧目录：基本参数选项

        }
        //执行渲染
        let render = table.render(newTableVar);

        if (res.flag == true) {

            //console.log(res.data)
            layer.open({
                type: 1
                , content: $('#test')
                , area: ['90%', (document.body.clientHeight - 74) + "px"]
                , closeBtn: 0
                , btnAlign: 'l'
                , btn: ['确认导入', '取消']
                , yes: function (index, layero) {

                    //console.log(JSON.stringify(res.data))
                    //向服务端发送删除指令
                    //向服务端发送指令
                    $.post(ctx + requestPath + '/daoRuDaiFa', {parmFaHuoList: JSON.stringify(res.data)}, function (res) {

                        if (res.flag) {

                            biaoGeChongZai();

                            //请求完成
                            layer.close(index);
                            layer.alert('成功', {icon: 1}); //这时如果你也还想执行yes回调，可以放在第三个参数中。

                        } else {
                            layer.close(index);
                            let showErrStr = "<table class=\"layui-table\">";
                            showErrStr += "<thead>\n" +
                                "    <tr>\n" +
                                "      <th>订单号</th>\n" +
                                "      <th>姓名</th>\n" +
                                "      <th>错误信息</th>\n" +
                                "    </tr> \n" +
                                "  </thead>"
                            showErrStr += "<tbody>"

                            for (let i = 0; i < res.data.length; i++) {
                                showErrStr += "<tr>"
                                showErrStr += "<td>" + res.data[i].dingDanHao + "</td>"
                                showErrStr += "<td>" + res.data[i].shouJianXingMing + "</td>"
                                showErrStr += "<td>" + res.data[i].beiZhu + "</td>"
                                showErrStr += "</tr>"

                            }
                            showErrStr += "</tbody></table>"

                            layer.open({
                                type: 1
                                , title: "导入失败,请修改后重新尝试"
                                , content: showErrStr
                                , btn: '导入失败,请修改后重新尝试'
                                , yes: function (index, layero) {
                                    layer.closeAll();
                                }
                            });

                            //请求失败
                            //layer.alert('失败', {icon: 2}); //这时如果你也还想执行yes回调，可以放在第三个参数中。
                        }

                    });

                    //按钮【按钮一】的回调
                }
                , btn2: function (index, layero) {
                    //按钮【按钮二】的回调

                    //return false 开启该代码可禁止点击该按钮关闭
                }
            });


            var btn2 = $(".layui-layer-btn").children();
            btn2.css("margin", "0px 30px");
            btn2.css("border-radius", "18px")

            //console.log("成功")
        } else {
            layer.closeAll('loading'); //关闭loading
            console.log("失败")
            var index = layer.open({
                content: '<h2 style="color: red">录入失败' + res.message + '</h2>'
                , move: false//禁止拖拽
            });
        }
        layer.closeAll('loading'); //关闭loading
    }
    , error: function (index, upload) {
        //请求异常回调
        console.log("异常")
        var index = layer.open({
            content: '<h1 style="color: red">请求上传接口失败,请重试</h1>'
            , move: false//禁止拖拽
        });
        layer.closeAll('loading'); //关闭loading
    }
};
/**
 * 上传1渲染
 */
upload.render(shangChuan1Var);

/**
 * 上传2
 * @type {{elem: string, before: shangChuan2Var.before, acceptMime: string, error: shangChuan2Var.error, contentType: string, done: shangChuan2Var.done, url: string, accept: string}}
 */
let shangChuan2Var = {
    elem: '#daoRuWuLiuFun'
    , url: requestPath + '/daoRuWuLiuHuiXianBuJiaMi'//上传续会表
    , accept: 'file'
    , acceptMime: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    , contentType: "application/json"
    , before: function (obj) { //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
        layer.load(); //上传loading
    }
    , done: function (res) {
        console.log(res)
        if (res.flag) {

            layer.closeAll('loading'); //关闭loading
            var index = layer.open({
                content: '<h2 style="color: red">成功' + res.msg + '</h2>'
                , move: false//禁止拖拽
            });

        } else {
            layer.closeAll('loading'); //关闭loading
            let mycommon1 = new mycommon();
            if(mycommon1.notnull(res.data)){
                //console.log(res.data)
                
                let showErrStr = "<table class=\"layui-table\">";
                showErrStr += "<thead>\n" +
                    "    <tr>\n" +
                    "      <th>订单号</th>\n" +
                    "      <th>姓名</th>\n" +
                    "      <th>错误信息</th>\n" +
                    "    </tr> \n" +
                    "  </thead>"
                showErrStr += "<tbody>"

                for (let i = 0; i < res.data.length; i++) {
                    showErrStr += "<tr>"
                    showErrStr += "<td>" + res.data[i].dingDanHao + "</td>"
                    showErrStr += "<td>" + res.data[i].shouJianXingMing + "</td>"
                    showErrStr += "<td>" + res.data[i].beiZhu + "</td>"
                    showErrStr += "</tr>"

                }
                showErrStr += "</tbody></table>"

                layer.open({
                    type: 1
                    , title: "导入失败,请修改后重新尝试"
                    , content: showErrStr
                    , btn: '导入失败,请修改后重新尝试'
                    , yes: function (index, layero) {
                        layer.closeAll();
                    }
                });
            }else{
                //alert("66")
                //layer.closeAll();
                var index = layer.open({
                    content: '<h2 style="color: red">失败' + res.msg + '</h2>'
                    , move: false//禁止拖拽
                });
            }
            

        }

    }
    , error: function (index, upload) {
        //请求异常回调
        console.log("异常")
        var index = layer.open({
            content: '<h1 style="color: red">请求上传接口失败,请重试</h1>'
            , move: false//禁止拖拽
        });
        layer.closeAll('loading'); //关闭loading
    }
};
/**
 * 上传2渲染
 */
upload.render(shangChuan2Var);

//--行内单行操作
/**
 * 行内按钮渲染
 */
table.on('tool(' + pojoName + ')', function (obj) {
    let data = obj.data;
    let layEvent = obj.event;

    if (layEvent === 'wuLiuCaoZuoFun') {
        wuLiuCaoZuoFun(obj.data.dingDanHao);
    } else if (layEvent === 'caiWuCaoZuoFun') {
        //console.log(obj.data.dingDanHao)
        caiWuCaoZuoFun(obj.data.dingDanHao);
    } else if (layEvent === 'chaCaoZuoMingXi') {
        //console.log(obj.data.dingDanHao)
        chaCaoZuoMingXi(obj.data.dingDanHao);
    }
});

/**
 * 财务操作
 * @param pval
 */
function caiWuCaoZuoFun(parm) {
    //console.log(parm)
    var caiWuOpenVar = `
    <div style="margin: 30px">
        
        <button class="layui-btn layui-btn-radius" onclick="caiWuShouKuanFun('` + parm + `')">收款</button>
        <button class="layui-btn layui-btn-radius" onclick="caiWuTuiKuanFun('` + parm + `')">申请退款</button>
        <button class="layui-btn layui-btn-radius layui-btn-primary" onclick="guanBiTanChuangFun()"><i class="layui-icon layui-icon-close"></i></button>
        
    </div>
    `
    layer.open({
        type: 1
        , content: caiWuOpenVar //这里content是一个普通的String
    });
}

/**
 * 物流操作
 * @param pval
 */
function wuLiuCaoZuoFun(parm) {
    //alert("执行")
    //console.log(parm)
    var caiWuOpenVar = `
    <div style="margin: 30px">
        
        <button class="layui-btn layui-btn-radius" onclick="wuLiuGaiDiZhiFun('` + parm + `')">修改地址</button>
        <button class="layui-btn layui-btn-radius" onclick="wuLiuTuiHuoFun('` + parm + `')">退货</button>
        <button class="layui-btn layui-btn-radius layui-btn-primary" onclick="guanBiTanChuangFun()"><i class="layui-icon layui-icon-close"></i></button>
        
    </div>
    `
    layer.open({
        type: 1
        , content: caiWuOpenVar //这里content是一个普通的String
    });
}

/**
 * 财务收款fun
 */
function caiWuShouKuanFun(parm) {
    console.log("收款==" + parm)
    //向服务端发送指令
    $.post(ctx + requestPath + '/caiWuShouKuan', {dingDanHao: parm}, function (res) {
        if (res.flag) {
            layer.closeAll();
            biaoGeChongZai();
            layer.open({
                title: '成功'
                , content: '收款成功'
            });
        } else {
            layer.open({
                title: '失败'
                , content: '修改收款失败'
            });

        }
    });

    //alert("收款")
}

/**
 * 财务退款fun
 */
function caiWuTuiKuanFun(parm) {
    //向服务端发送指令
    $.post(ctx + requestPath + '/caiWuTuiKuan', {dingDanHao: parm}, function (res) {
        if (res.flag) {
            layer.closeAll();
            biaoGeChongZai();
            layer.open({
                title: '成功'
                , content: '退款成功'
            });
        } else {
            layer.open({
                title: '失败'
                , content: '修改退款失败'
            });

        }
    });

    //alert("退款")
}

/**
 * 物流改地址fun
 */
window.wuLiuGaiDiZhiFun = function (parm) {
    //alert("666")
    //alert(parm+"第一")
    //输入地址
    //例子2
    layer.prompt({
        formType: 0,
        title: '请输入地址'
    }, function (value, index, elem) {
        //alert(value); //得到value
        let mycommon2 = new mycommon();
        if (mycommon2.buWeiKong(value)) {
            //alert(parm+"第二")
            //alert(value)
            //向服务端发送指令
            $.post(ctx + requestPath + '/wuLiuGaiDiZhi', {dingDanHao: parm, shouJianDiZhi: value}, function (res) {
                if (res.flag) {
                    layer.closeAll();
                    biaoGeChongZai();
                    layer.open({
                        title: '成功'
                        , content: '修改成功'
                    });
                } else {
                    layer.open({
                        title: '失败'
                        , content: '修改退款失败'
                    });

                }
            });
            layer.closeAll()
        }

    });

    //alert("退款")
}

/**
 * 物流退货fun
 */
function wuLiuTuiHuoFun(parm) {
    //发货状态(1导入,2待发,3已发,4遗留,5退货申请,6退货完成)
    //向服务端发送指令
    $.post(ctx + requestPath + '/wuLiuTuiHuo', {dingDanHao: parm, zhuangtai: 5}, function (res) {
        if (res.flag) {
            layer.closeAll();
            biaoGeChongZai();
            layer.open({
                title: '成功'
                , content: '物流退货成功'
            });
        } else {
            layer.open({
                title: '失败'
                , content: '修改退款失败' + res.msg
            });

        }
    });

    //alert("退款")
}

/**
 * 查操作明细fun
 */
function chaCaoZuoMingXi(parm) {

    //alert("退款")

    /*
    如果是iframe层
    */
    layer.open({
        type: 2,
        content: ctx + '/mycode/' + 'yyfjfahuomingxi/index?ddh=' + parm
        , area: ['75%', '75%']
    });

}


/**
 * 更新单行
 */
function updateOneF(data) {
    alert("更新" + data.id + "-" + data.xingMing);
};

/**
 * 更新单行
 */
function shenHeTongGuoF(data) {
    //发送请求到后台
    //向服务端发送指令
    layer.confirm("确认审核<span style='color: red'>" + data.bianHao + "</span>(<span style='color: orange'>" + data.xingMing + "</span>)", {
        btn: ['确认', '取消'] //可以无限个按钮
    }, function (index, layero) {

        $.post(requestPath + '/save', {id: data.id, zhuangTai: 1}, function (res) {
            resData = res.data;
            $("#addForm")[0].reset();
            layer.closeAll();
            table.reload("" + pojoName + "", {
                page: {
                    page: 1
                }
            }, false)
            layer.open({
                content: "审核通过" + res.msg + "<span style='color: red'>" + resData.bianHao + "</span>(<span style='color: orange'>" + resData.xingMing + "</span>)"
            });
        })

    }, function (index) {
        //按钮【按钮二】的回调
    });
};

/**
 * 重新渲染表格
 */
function biaoGeChongZai() {
    //重载表格
    tableIns.reload({}, true)
    //重新渲染上传组件
    //upload.render(shangChuan1Var);

    //upload.render(shangChuan2Var);
    

}

/**
 * 关闭layer弹窗
 */
function guanBiTanChuangFun() {
    layer.closeAll();
}
});


