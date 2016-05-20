(function(){
    var form = document.getElementById('form');

function addListeners(){
    form.addEventListener('submit',function validateLogin(e)
    {
    var sUserName = document.frmLogin.txtUserName.value;
    var sPassword = document.frmLogin.txtPassword.value;
    if( sUserName=="" )
    {
        alert("请输入用户名！");
    }
    if( sPassword=="" )
    {
        alert("请输入密码！");
    }
    if( sUserName=="WANGMENG" && sPassword=="CAOJINGJING")
    {
        top.location.href="../niki.html";
    });
    
    addListeners();
}
