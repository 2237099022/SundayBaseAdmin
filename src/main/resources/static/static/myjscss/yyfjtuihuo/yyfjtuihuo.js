layui.use(function () {
//引用组件
    let layer = layui.layer;
    let table = layui.table;
    let form = layui.form;
    let laydate = layui.laydate;
    let upload = layui.upload;

//定义名称
    let pojoName = 'yyfjtuihuo';
//定义请求路径
    let requestPath = ctx + '/mycode/' + pojoName;
//获取用户
    let loginUserSessionStorage = sessionStorage.getItem('loginUser');

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
        , title: '退货'
        //列标题
        , cols: [[
            {type: 'checkbox'}
            , {field: 'id', hide: true, width: 50, title: 'ID', sort: true}
            , {field: 'id', hide: false, title: 'id'}
            , {field: 'dingDanHao', hide: false, title: '订单号', width: 210}
            , {field: 'shouJianXingMing', hide: false, title: '收件人姓名', width: 133}
            , {field: 'shangPinJinQian', hide: false, title: '商品金额', width: 95}
            , {field: 'zongJinQian', hide: false, title: '总金额(含运费)', width: 130}
            , {field: 'fuKuanTime', hide: false, title: '付款时间', width: 164}
            , {
                field: '', hide: false, title: '会员信息', width: 175, templet: function (d) {
                    return "会员编号:" + d.bianHao + "<br/>会员姓名:" + d.xingMing + "<br/>会员电话" + d.dianHua
                }
            }

            , {field: 'shangPin', hide: false, title: '商品'}
            , {field: 'bianHao', hide: true, title: '会员编号'}
            , {field: 'xingMing', hide: true, title: '会员姓名'}
            , {field: 'dianHua', hide: true, title: '会员电话'}

            , {field: 'shouJianDianHua', hide: false, title: '收件人电话'}
            , {field: 'shouJianDiZhi', hide: false, title: '收件地址'}

            , {field: 'jiFen', hide: false, title: '订单积分'}
            , {field: 'yunFei', hide: false, title: '运费'}

            , {field: 'xiaDanTime', hide: false, title: '下单时间'}

            , {field: 'dingDanZhuangTai', hide: false, title: '订单状态'}
            , {field: 'dingDanLaiYuan', hide: false, title: '订单来源'}
            , {field: 'dianMingCheng', hide: false, title: '专营店名称'}
            , {field: 'dingDanLeiXing', hide: false, title: '订单类型'}
            , {field: 'keFu', hide: false, title: '客服'}
            , {field: 'jieSuanTime', hide: false, title: '结算时间'}
            , {field: 'beiZhu', hide: false, title: '备注'}
            , {field: 'createTime', hide: false, title: '创建时间'}
            , {field: 'createUser', hide: false, title: '创建人'}
            , {field: 'updateTime', hide: false, title: '修改时间'}
            , {field: 'updateUser', hide: false, title: '修改人'}

            , {fixed: 'right', title: '操作', toolbar: '#rowBar', width: 150}
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
        , defaultToolbar: ["filter", "exports", "print"
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
        //,height:(document.body.clientHeight-85)
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
    table.render(newTableVar);

//最顶部工具栏--------------
    $('#addOneFun').click(function () {
        addOneFun();
    });
    $('#daoChuFun').click(function () {
        daoChuFun();
    });

//弹出添加表单
    function addOneFun(obj) {
        layer.open({
            title: '变更申请'
            , type: 1
            //显示添加的表单
            , content: $('#addShowDiv')
            //按钮[确认,取消]
            //,btn: ['提交变更申请','重置', '取消'] //可以无限个按钮
            , closeBtn: 1
            , area: ['auto', '80%']
        });

    }

//提交添加方法
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
        $.post(ctx + requestPath + '/save', formData, function (res) {
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


//导入-上传组件
    upload.render({
        elem: '#daoRuFun'
        , url: requestPath + '/daoRuFun'//上传续会表
        , accept: 'file'
        , acceptMime: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        , contentType: "application/json"
        , before: function (obj) { //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
            layer.load(); //上传loading
        }
        , done: function (res) {
            if (res.flag) {
                layer.closeAll();
                var index = layer.open({
                    content: '成功' + res.msg
                    , move: false//禁止拖拽
                });
            } else {
                layer.closeAll();
                var index = layer.open({
                    content: '<h2 style="color: red">失败' + res.msg + '</h2>'
                    , move: false//禁止拖拽
                });
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
    });

//导出方法
    function daoChuFun(obj) {

        location.href = ctx + requestPath + '/daoChuFun'

    }


//搜索栏--------------
    /**
     * 查询提交
     */
    function chaXunF() {
        let mycommon1 = new mycommon();
        let queryData = {};

        //获取插叙输入框 空字符转成undefined
        queryData['id'] = mycommon1.kongZiFuZhuanUndefined($('#id').val());
        queryData['dingDanHao'] = mycommon1.kongZiFuZhuanUndefined($('#dingDanHao').val());
        queryData['shangPin'] = mycommon1.kongZiFuZhuanUndefined($('#shangPin').val());
        queryData['bianHao'] = mycommon1.kongZiFuZhuanUndefined($('#bianHao').val());
        queryData['xingMing'] = mycommon1.kongZiFuZhuanUndefined($('#xingMing').val());
        queryData['dianHua'] = mycommon1.kongZiFuZhuanUndefined($('#dianHua').val());
        queryData['shouJianXingMing'] = mycommon1.kongZiFuZhuanUndefined($('#shouJianXingMing').val());
        queryData['shouJianDianHua'] = mycommon1.kongZiFuZhuanUndefined($('#shouJianDianHua').val());
        queryData['shouJianDiZhi'] = mycommon1.kongZiFuZhuanUndefined($('#shouJianDiZhi').val());
        queryData['shangPinJinQian'] = mycommon1.kongZiFuZhuanUndefined($('#shangPinJinQian').val());
        queryData['jiFen'] = mycommon1.kongZiFuZhuanUndefined($('#jiFen').val());
        queryData['yunFei'] = mycommon1.kongZiFuZhuanUndefined($('#yunFei').val());
        queryData['zongJinQian'] = mycommon1.kongZiFuZhuanUndefined($('#zongJinQian').val());
        queryData['xiaDanTime'] = mycommon1.kongZiFuZhuanUndefined($('#xiaDanTime').val());
        queryData['fuKuanTime'] = mycommon1.kongZiFuZhuanUndefined($('#fuKuanTime').val());
        queryData['dingDanZhuangTai'] = mycommon1.kongZiFuZhuanUndefined($('#dingDanZhuangTai').val());
        queryData['dingDanLaiYuan'] = mycommon1.kongZiFuZhuanUndefined($('#dingDanLaiYuan').val());
        queryData['dianMingCheng'] = mycommon1.kongZiFuZhuanUndefined($('#dianMingCheng').val());
        queryData['dingDanLeiXing'] = mycommon1.kongZiFuZhuanUndefined($('#dingDanLeiXing').val());
        queryData['keFu'] = mycommon1.kongZiFuZhuanUndefined($('#keFu').val());
        queryData['jieSuanTime'] = mycommon1.kongZiFuZhuanUndefined($('#jieSuanTime').val());
        queryData['beiZhu'] = mycommon1.kongZiFuZhuanUndefined($('#beiZhu').val());
        queryData['createTime'] = mycommon1.kongZiFuZhuanUndefined($('#createTime').val());
        queryData['createUser'] = mycommon1.kongZiFuZhuanUndefined($('#createUser').val());
        queryData['updateTime'] = mycommon1.kongZiFuZhuanUndefined($('#updateTime').val());
        queryData['updateUser'] = mycommon1.kongZiFuZhuanUndefined($('#updateUser').val());

        //let currpage = $('.layui-laypage-em').next().text();
        table.reload("" + pojoName + "", {
            where: queryData
            , url: requestPath + '/page'//@erupt注解的实体类的url路径
            , page: {
                curr: 1
            }
        }, false)

    };

    /*//查询更多
    $('#chaXunMoreF').click(function () {
        $('.chaXunNone').css('display', 'inline')
    });
    //查询更少
    $('#chaXunLessF').click(function () {
        $('.chaXunNone').css('display', 'none')
    });
    //查询重置
    $('#chaXunChongZhiF').click(function () {
        $('.layui-form-item input').val("")
    });
    //查询方法
    $('#chaXunF').click(function () {
        chaXunF();
    });*/

//搜索栏按钮执行的方法
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
            case 'daoChuFun':
                //询问框

                //alert("aaa")

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

            // case 'LAYTABLE_TIPS':
            //     alert("关于");
            //     break;
        }
    });


// 行内按钮--------------
    table.on('tool(' + pojoName + ')', function (obj) {
        let data = obj.data;
        let layEvent = obj.event;

        if (layEvent === 'updateOneF') {
            updateOneF(data);
        } else if (layEvent === 'deleteOneF') {
            deleteOneF(data);
        }
    });

    /**
     * 行内按钮-更新单行
     */
    function updateOneF(data) {
        alert("更新" + data.id + "-" + data.xingMing);
    };

    /**
     * 行内按钮-更新单行
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

//执行一个laydate实例
    laydate.render({
        elem: '#tiJiaoTime' //指定元素
    });
});


