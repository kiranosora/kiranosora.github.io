(function(){
    var form = document.getElementById('form');

function addListeners(){
    form.addEventListener('submit',function(e)
    {
    var sUserName = document.frmLogin.txtUserName.value;
    var sPassword = document.frmLogin.txtPassword.value;
    if( sUserName=="" )
    {
        alert("请输入用户名！");
        return false;
    }
    if( sPassword=="" )
    {
        alert("请输入密码！");
        return false;
    }
    if( sUserName=="WANGMENG" && sPassword=="CAOJINGJING")
    {
        alert("Verification Successed !");
        //window.open("../niki.html");
        //window.open("/niki.html");
        //var aa=location.href="../niki.html";
        //alert('aa = ' + aa);
        //top.location.href="../niki.html";
        //top.location.href="/niki.html";
        return true;
    }
    alert("Verification Failed !");
    return false;
    });
    }
    
    addListeners();
})();
