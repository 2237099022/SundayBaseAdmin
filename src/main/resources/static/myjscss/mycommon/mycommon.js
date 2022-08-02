//定义类
class mycommon {

    /**
     * 获得当前时间
     * @returns {string}
     */
    getNow() {
        var nowDate = new Date();
        var year = nowDate.getFullYear();
        var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
        var date = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
        var hour = nowDate.getHours()< 10 ? "0" + nowDate.getHours() : nowDate.getHours();
        var minute = nowDate.getMinutes()< 10 ? "0" + nowDate.getMinutes() : nowDate.getMinutes();
        var second = nowDate.getSeconds()< 10 ? "0" + nowDate.getSeconds() : nowDate.getSeconds();
        return year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second;
    }

    /**
     * 获取目前系统的url
     * @returns fullUrl：系统访问路径，例如：http://localhost:8080/amudraya/amudraya
     */
    getNowUrl(){
        var fullUrl = window.location.href;
        var a=fullUrl.lastIndexOf('/');
        fullUrl=fullUrl.substring(0,a);
        var b=fullUrl.lastIndexOf('/');
        fullUrl=fullUrl.substring(0,b);
        var c=fullUrl.lastIndexOf('/');
        fullUrl=fullUrl.substring(0,c);
        return fullUrl;
    }

    /**
     * 不为空
     * @param str2
     * @returns {boolean}
     */
    buWeiKong(str2){
        let notNull=false;
        
        if(str2==undefined||str2==null||str2.toLowerCase()=="null"||str2==""||str2.replace(/(^s*)|(s*$)/g, "").length ==0){
            
        }else{
            
            notNull=true
        }
        
        return notNull;
            

    }
    
    /**
     * 不为空
     * @param str2
     * @returns {boolean}
     */
    notnull(str2){
        let notNull=false;

        if(str2==undefined||str2==null){

        }else{

            notNull=true
        }

        return notNull;


    }

    /**
     * 空转undefined
     * @param str2
     * @returns {undefined}
     */
    kongZiFuZhuanUndefined(str2){
        let res=undefined;

        if(str2==null||str2==""||str2.replace(/(^s*)|(s*$)/g, "").length ==0){
            
        }else{
            res=str2
        }

        return res;


    }
    
    
    //cookie工具类（这个是w3c官网的代码）
    //设置cookie
    setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }
    //获取cookie
    getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    }
    //清除cookie  
    clearCookie(name) {
        this.setCookie(name, "", -1);
    }
    
    //插入 
    //为字符串插入字符 其中soure为原字符串,start为将要插入字符的位置，newStr为要插入的字符
    insertStr(soure, start, newStr){
        return soure.slice(0, start) + newStr + soure.slice(start);
    }
}