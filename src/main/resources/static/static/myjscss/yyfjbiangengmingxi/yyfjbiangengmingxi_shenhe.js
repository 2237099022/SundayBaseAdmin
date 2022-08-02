layui.use(function () {
//引用组件
    let layer = layui.layer;
    let table = layui.table;
    let form = layui.form;
    let laydate = layui.laydate;
//定义名称
    let pojoName = "yyfjbiangengmingxi";
//定义请求路径
    let requestPath = ctx + '/mycode/' + pojoName;
//获取用户
//let loginUserSessionStorage = sessionStorage.getItem('loginUser');
//console.log(loginUserSessionStorage)

//layuiTable参数
    let newTableVar = {
        elem: '#' + pojoName
        , url: requestPath + '/chaMyPage'//@erupt注解的实体类的url路径
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
        , title: '变更明细表'
        //列标题
        , cols: [[
            //{type: 'checkbox'}
            {field: 'id', hide: true, width: 50, title: 'ID', sort: true}
            //, {title:'操作',toolbar:'#rowBar',width:130}
            , {
                field: 'zhuangTai', width: 150, title: '状态', templet: function (d) {
                    //状态(0待审核,1审核通过,2已修改,完成)
                    let zhuangTaiRes = "";
                    if (d.zhuangTai == 0) {

                        zhuangTaiRes = "当前状态:<span style='background-color: lightskyblue'>0待审核</span>";
                        d.updateVal = 1;
                        d.tiShiMsg = "审核"
                        zhuangTaiRes += '<br/>操作:<button type="button" class="layui-btn layui-btn-sm layui-btn-radius layui-btn-normal" onclick="xiuGaiZhuangTaiF(' + JSON.stringify(d).replace(/"/g, '&quot;') + ')">' + d.tiShiMsg + '</button>';
                        d.updateVal = 4;
                        d.tiShiMsg = "驳回"
                        zhuangTaiRes += '<br/>操作:<button type="button" class="layui-btn layui-btn-sm layui-btn-radius layui-btn-normal" onclick="xiuGaiZhuangTaiF(' + JSON.stringify(d).replace(/"/g, '&quot;') + ')">' + d.tiShiMsg + '</button>';
                    } else if (d.zhuangTai == 1) {
                        zhuangTaiRes = "当前状态:<span style='background-color: lightgoldenrodyellow'>1修改中</span>";
                        d.updateVal = 2;
                        d.tiShiMsg = "修改"
                        zhuangTaiRes += '<br/>操作:<button type="button" class="layui-btn layui-btn-sm layui-btn-radius layui-btn-normal" onclick="xiuGaiZhuangTaiF(' + JSON.stringify(d).replace(/"/g, '&quot;') + ')">' + d.tiShiMsg + '</button>';

                    } else if (d.zhuangTai == 2) {
                        zhuangTaiRes = "当前状态:<span style='background-color: rgba(228,144,234,0.53)'>2待复核</span>";
                        d.updateVal = 3;
                        d.tiShiMsg = "复核"
                        zhuangTaiRes += '<br/>操作:<button type="button" class="layui-btn layui-btn-sm layui-btn-radius layui-btn-normal" onclick="xiuGaiZhuangTaiF(' + JSON.stringify(d).replace(/"/g, '&quot;') + ')">' + d.tiShiMsg + '</button>';


                    } else if (d.zhuangTai == 3) {
                        zhuangTaiRes = "当前状态:<span style='background-color: lightgreen'>3完成</span>";

                    } else if (d.zhuangTai == 4) {
                        zhuangTaiRes = "<span style='background-color: red;color: white'>审核驳回</span>";

                    } else {
                        zhuangTaiRes = "状态错误";
                    }
                    return zhuangTaiRes;
                }
            }
            , {
                field: 'xinXi', width: 220, title: '信息', templet: function (d) {
                    //状态(0待审核,1审核通过,2已修改,3驳回)
                    let zhuangTaiRes = "";
                    zhuangTaiRes = zhuangTaiRes + "会员:<span style='color: red'>" + d.bianHao + "</span>(<span style='color: orange'>" + d.xingMing + "</span>)" + "<br/>电话:" + d.dianHua + "<br/>身份证:" + d.shenFenZheng + ""
                    return zhuangTaiRes;
                }
            }
            , {field: 'bianHao', hide: true, width: 100, title: '编号'}
            , {field: 'xingMing', hide: true, width: 90, title: '姓名', sort: true}
            , {field: 'dianHua', hide: true, width: 120, title: '电话'}

            , {
                field: 'shenFenZheng', hide: true, width: 175, title: '身份证', templet: function (d) {
                    return d.shenFenZheng + "\t";
                }
            }
            , {field: 'laiYuan', width: 75, title: '来源'}
            , {
                field: 'createUser', width: 125, title: '提交人', templet: function (d) {
                    let res = "";
                    let mycommon1 = new mycommon();

                    if (mycommon1.buWeiKong(d.createUser) && d.createUser.indexOf(",") != -1) {
                        res = d.createUser.split(",")[2];
                    } else {
                        res = d.createUser;
                    }
                    return res;

                }
            }
            , {field: 'bianGengXiangId', hide: true, width: 95, title: '变更项'}
            , {field: 'qianNeiRong', hide: true, width: 95, title: '修改前'}
            , {field: 'houNeiRong', hide: true, width: 95, title: '修改后'}

            , {
                field: 'bianGengXinXi', hide: false, width: 160, title: '变更信息', templet: function (d) {
                    //状态(0待审核,1审核通过,2已修改,3驳回)
                    let zhuangTaiRes = "";
                    zhuangTaiRes = zhuangTaiRes + "变更项:" + d.bianGengXiangId + "<br/>修改前:" + d.qianNeiRong + "<br/>修改后:" + d.houNeiRong
                    return zhuangTaiRes;
                }
            }
            , {field: 'xiuGaiQi', hide: false, width: 115, title: '变更在第几期'}
            , {field: 'tiJiaoTime', hide: true, width: 122, title: '提交日期'}
            , {field: 'shenHeTime', hide: true, width: 122, title: '审核日期'}
            , {field: 'xiuGaiTime', hide: true, width: 122, title: '修改日期'}

            , {
                field: 'riQi', width: 185, title: '变更日期', templet: function (d) {
                    //状态(0待审核,1审核通过,2已修改,3驳回)
                    let zhuangTaiRes = "";
                    zhuangTaiRes = zhuangTaiRes + "提交日期:" + d.tiJiaoTime + "<br/>审核日期:" + d.shenHeTime + "<br/>修改日期:" + d.xiuGaiTime
                    return zhuangTaiRes;
                }
            }

            , {field: 'shuoMing', title: '说明'}
            // , {field: 'boHuiYuanYin',  title: '驳回原因'}


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
        , limits: [5, 10, 50, 100, 500, 1000, 10000, 999999999]
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
//搜索栏--------------
//查询更多
    $('#chaXunMoreF').click(function () {
        chaXunMoreF();
    });
//查询更少
    $('#chaXunLessF').click(function () {
        chaXunLessF();
    });
//查询重置
    $('#chaXunChongZhiF').click(function () {
        chaXunChongZhiF();
    });
//查询方法
    $('#chaXunF').click(function () {
        chaXunF();
    });

//顶部工具栏--------------
    table.on('toolbar(' + pojoName + ')', function (obj) {
        switch (obj.event) {
            case 'addOneFun':
                //头部按钮执行的方法
                addOneFun(obj);
                break;
            // case 'LAYTABLE_TIPS':
            //     alert("关于");
            //     break;
        }
    });

// 行内按钮--------------
    table.on('tool(' + pojoName + ')', function (obj) {
        let data = obj.data;
        let layEvent = obj.event;

        if (layEvent === 'xiuGaiZhuangTaiF') {
            xiuGaiZhuangTaiF(data);
        } else if (layEvent === 'boHuiF') {
            boHuiF(data);
        }
    });


//弹出添加表单
    window.addOneFun = function (obj) {

        layer.open({
            title: '变更申请'
            , type: 1
            //显示添加的表单
            , content: $('#addShowDiv')
            //按钮[确认,取消]
            //,btn: ['提交变更申请','重置', '取消'] //可以无限个按钮
            , closeBtn: 1
            , area: ['50%', '90%']
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

    /**
     * 查询更多
     */
    window.chaXunMoreF = function () {
        $('.chaXunNone').css('display', 'inline')
    }

    /**
     * 查询更少
     */
    window.chaXunLessF = function () {
        $('.chaXunNone').css('display', 'none')
    }

    /**
     * 重置查询条件
     */
    window.chaXunChongZhiF = function () {
        $('.layui-form-item input').val("")
    }


    /**
     * 查询提交
     */
    window.chaXunF = function () {
        let mycommon1 = new mycommon();
        let queryData = {};

        //获取插叙输入框 空字符转成undefined
        queryData['xingMing'] = mycommon1.kongZiFuZhuanUndefined($('#xingMing').val());
        queryData['bianHao'] = mycommon1.kongZiFuZhuanUndefined($('#bianHao').val());
        queryData['dianHua'] = mycommon1.kongZiFuZhuanUndefined($('#dianHua').val());
        queryData['shenFenZheng'] = mycommon1.kongZiFuZhuanUndefined($('#shenFenZheng').val());
        queryData['bianGengXiangId'] = mycommon1.kongZiFuZhuanUndefined($('#bianGengXiangId').val());
        queryData['shuoMing'] = mycommon1.kongZiFuZhuanUndefined($('#shuoMing').val());
        queryData['qianNeiRong'] = mycommon1.kongZiFuZhuanUndefined($('#qianNeiRong').val());
        queryData['houNeiRong'] = mycommon1.kongZiFuZhuanUndefined($('#houNeiRong').val());

        //let currpage = $('.layui-laypage-em').next().text();
        table.reload("" + pojoName + "", {
            where: queryData
            , url: requestPath + '/chaMyPage'//@erupt注解的实体类的url路径
            , page: {
                curr: 1
            }

        }, false)

    };

    /**
     * 更新单行
     */
    window.xiuGaiZhuangTaiF = function (data) {
        let updateVal = data.updateVal;
        let tiShiMsg = data.tiShiMsg;
        //发送请求到后台
        //向服务端发送指令
        //alert("进入方法")
        layer.confirm("确认" + tiShiMsg + "<span style='color: red'>" + data.bianHao + "</span>(<span style='color: orange'>" + data.xingMing + "</span>)", {
            btn: ['确认', '取消'] //可以无限个按钮
        }, function (index, layero) {

            //alert(data.id+"-"+updateVal)

            $.post(requestPath + '/xiuGaiZhuangTai', {id: data.id, zhuangTai: updateVal}, function (res) {
                if (res.flag) {
                    //console.log(res.msg)
                    resData = res.data;
                    $("#addForm")[0].reset();
                    layer.closeAll();
                    table.reload("" + pojoName + "", {
                        page: {
                            page: 1
                        }
                    }, false)
                    layer.open({
                        content: tiShiMsg + "通过" + res.msg + "<span style='color: red'>" + resData.bianHao + "</span>(<span style='color: orange'>" + resData.xingMing + "</span>)"
                    });
                } else {
                    layer.alert(res.msg);
                }


            })
        }, function (index) {
            //按钮【按钮二】的回调
        });


        // let updateVal=-1;
        // let tiShiMsg="";
        // if(rowdata.zhuangTai==0){
        //     updateVal=1;
        //     tiShiMsg="审核";
        // }else if(rowdata.zhuangTai==1){
        //     updateVal=2;
        //     tiShiMsg="修改";
        // }else if(rowdata.zhuangTai==2){
        //     updateVal=3;
        //     tiShiMsg="复核";
        // }else if(rowdata.zhuangTai==3){
        //
        // }else if(rowdata.zhuangTai==4){
        //
        // }else{
        //
        // }
        //
        // //发送请求到后台
        // //向服务端发送指令
        // layer.confirm("确认"+tiShiMsg+"<span style='color: red'>"+rowdata.bianHao+"</span>(<span style='color: orange'>"+rowdata.xingMing+"</span>)", {
        //     btn: ['确认', '取消'] //可以无限个按钮
        // }, function(index, layero){
        //     alert(rowdata.id+"-"+updateVal)
        //    
        //     $.post(requestPath+'/updateZhuangTai', {id:68,zhuangTai:1}, function (res) {
        //         let resData=res.data;
        //         $("#addForm")[0].reset();
        //         layer.closeAll();
        //         table.reload(""+pojoName+"", {
        //             page: {
        //                 page: 1
        //             }
        //         }, false)
        //         layer.open({
        //             content: tiShiMsg+"通过"+res.msg+"<span style='color: red'>"+resData.bianHao+"</span>(<span style='color: orange'>"+resData.xingMing+"</span>)"
        //         });
        //     })
        //
        // }, function(index){
        //     //按钮【按钮二】的回调
        // });
    };


    /**
     * 更新单行
     */
    window.boHuiF = function (data) {
        //发送请求到后台
        //向服务端发送指令

        let updateVal = data.updateVal;
        let tiShiMsg = data.tiShiMsg;

        layer.confirm("确认" + tiShiMsg + "<span style='color: red'>" + data.bianHao + "</span>(<span style='color: orange'>" + data.xingMing + "</span>)", {
            btn: ['确认', '取消'] //可以无限个按钮
        }, function (index, layero) {
            //输入驳回原因
            layer.prompt({title: '请输入驳回原因'}, function (value, index, elem) {
                let boHuiYuanYin = value; //得到value
                layer.close(index);
                //alert(data.id+"-"+updateVal)

                $.post(requestPath + '/xiuGaiZhuangTai', {
                    id: data.id,
                    zhuangTai: updateVal,
                    boHuiYuanYin: boHuiYuanYin
                }, function (res) {
                    if (res.flag) {
                        resData = res.data;
                        $("#addForm")[0].reset();
                        layer.closeAll();
                        table.reload("" + pojoName + "", {
                            page: {
                                page: 1
                            }
                        }, false)
                        layer.open({
                            content: tiShiMsg + "通过" + res.msg + "<span style='color: red'>" + resData.bianHao + "</span>(<span style='color: orange'>" + resData.xingMing + "</span>)"
                        });
                    } else {
                        layer.alert(res.msg);
                    }

                })
            });

        }, function (index) {
            //按钮【按钮二】的回调
        });


    };

//执行一个laydate实例
    laydate.render({
        elem: '#tiJiaoTime' //指定元素
    });
});

