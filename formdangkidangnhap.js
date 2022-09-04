
    class Signup {
        constructor(email, password) {
            this.email = email;
            this.password = password;
        }
    }
    var Modaldangnhap = [];
    var modal = "formdangnhap"
    function Formmodal() {
        if (localStorage.getItem(modal) == null) {
            Modaldangnhap = [
                new Signup("admin", "admin")
            ]
            localStorage.setItem(modal, JSON.stringify(Modaldangnhap));
        }
        else {
            Modaldangnhap = JSON.parse(localStorage.getItem(modal))
        }

    }
    Formmodal();
    function dangki() {
        if ((document.getElementById('emaildangki').value).trim() == "" || (document.getElementById('emaildangki').value).trim() == null) {
            document.getElementById("emailsignin").innerText = "Vui lòng nhập Email đăng kí"
        }

        if ((document.getElementById('password').value).trim() == "" || (document.getElementById('password').value).trim() == null) {
            document.getElementById("pass").innerText = "Vui lòng nhập mật khẩu "
        }

        if ((document.getElementById('returnpass').value).trim() == "" || (document.getElementById('password').value).trim() == null) {
            document.getElementById("passreturn").innerText = "Vui lòng nhập lại mật khẩu"
        }
        if((document.getElementById('emaildangki').value).trim() != "" && (document.getElementById('password').value).trim() != "" &&(document.getElementById('returnpass').value).trim() != ""){
            if(document.getElementById('password').value==document.getElementById('returnpass').value){
                let email=document.getElementById('emaildangki').value;
                let password=document.getElementById('password').value;
                Information= new Signup(email,password);
                Modaldangnhap.push(Information);
                localStorage.setItem(modal,JSON.stringify(Modaldangnhap));
                alert("Bạn đã đang kí thành công, xin mời đăng nhập");
                formdangnhap();
            }
        }
    }
    function dangnhap(){
        if ((document.getElementById('emaildangnhap').value).trim() == "" || (document.getElementById('emaildangnhap').value).trim() == null) {
            document.getElementById("email").innerText = "Vui lòng nhập Email đăng nhập"
        }

        if ((document.getElementById('passworddangnhap').value).trim() == "" || (document.getElementById('passworddangnhap').value).trim() == null) {
            document.getElementById("passwordsignin").innerText = "Vui lòng nhập mật khẩu "
        }
        if((document.getElementById('passworddangnhap').value).trim() != ""&&(document.getElementById('emaildangnhap').value).trim() != ""){
        let count=0;
        for (i=0;i<Modaldangnhap.length;i++){
            if(Modaldangnhap[i].email==document.getElementById('emaildangnhap').value && Modaldangnhap[i].password==document.getElementById('passworddangnhap').value){
                count++;
            }
        }
        if(count>0){
            alert("Đăng nhập thành công");
            window.location.replace("khoproduct.html");
        }
        else{
            document.getElementById("passwordsignin").innerText = "Email hoặc mật khẩu chưa đúng"
        }
    }
    }
    function resetformdangki() {
        document.getElementById('emaildangki').value="";
        document.getElementById('password').value="";
        document.getElementById('returnpass').value="";
        document.getElementById("emailsignin").innerText = "";
        document.getElementById("pass").innerText ="";
        document.getElementById("passreturn").innerText ="";
    }
    function resetformdangnhap(){
        document.getElementById('emaildangnhap').value="";
        document.getElementById('passwordsignin').value="";
        document.getElementById('passworddangnhap').value="";
        document.getElementById("email").innerText ="";
        document.getElementById("passwordsignin").innerText ="";

    }
    function formdangki() {
        document.querySelector('.modal').classList.remove('modal-none');
        document.querySelector('.modaldangnhap').classList.add('modal-none');
        resetformdangki();
    }
    function offformdangki() {
        document.querySelector('.modal').classList.add('modal-none');
    }
    function formdangnhap() {
        document.querySelector('.modaldangnhap').classList.remove('modal-none');
        document.querySelector('.modal').classList.add('modal-none');
        resetformdangnhap();
    }
    function offformdangnhap() {
        document.querySelector('.modaldangnhap').classList.add('modal-none');
    }
