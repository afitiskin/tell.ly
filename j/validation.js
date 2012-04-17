/***************************/
//@Author: Adrian "yEnS" Mato Gondelle & Ivan Guardado Castro
//@website: www.yensdesign.com
//@email: yensamg@gmail.com
//@license: Feel free to use it, but keep this credits please!                  
/***************************/

$(document).ready(function(){
    //global vars
    var form = $("#customForm");
    var login = $("#login");
    var loginInfo = $("#loginInfo SPAN");
    var email = $("#email");
    var emailInfo = $("#emailInfo SPAN");
    var name = $("#name");
    var nameInfo = $("#nameInfo SPAN");
    var sname = $("#sname");
    var snameInfo = $("#snameInfo SPAN");
    var pass1 = $("#pass1");
    var pass1Info = $("#pass1Info SPAN");
    var pass2 = $("#pass2");
    var pass2Info = $("#pass2Info SPAN");
    
    //On blur
    login.blur(validateLogin);
    name.blur(validateName);
    sname.blur(validateSName);
    email.blur(validateEmail);
    pass1.blur(validatePass1);
    pass2.blur(validatePass2);
    //On key press
    name.keyup(validateName);
    sname.keyup(validateSName);
    //pass1.keyup(validatePass1);
    pass2.keyup(validatePass2);
    //On Submitting
    form.submit(function(){
    if(validateLogin() & validateEmail() & validateName() & validateSName() & validatePass1() & validatePass2())
            return true
        else
            return false;
    });
    
    function validateLogin(){
        if(login.val().length <4){
            $(this).parent().parent().addClass('field_error');
            $('#loginInfo').removeClass('dnone');
            loginInfo.text("The login is too short!");
            return true;
        } else{
            $(this).parent().parent().removeClass('field_error');
            $('#loginInfo').addClass('dnone');
            $(this).parent().prev().show();
        }
    }
    
    function validateEmail(){
        //testing regular expression
        var a = $("#email").val();
        var filter = /^[a-zA-Z0-9]+[a-zA-Z0-9_.-]+[a-zA-Z0-9_-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{2,4}$/;
        //if it's valid email
        if(filter.test(a)){
            $(this).parent().parent().removeClass('field_error');
            $('#emailInfo').addClass('dnone');
            $(this).parent().prev().show();
            return true;
        }
        //if it's NOT valid
        else{
            $(this).parent().parent().addClass('field_error');
            $('#emailInfo').removeClass('dnone');
            emailInfo.text("The email is wrong!");
            return false;
        }
    }
    
    function validatePass1(){
		var a = $("#password1");
		var b = $("#password2");

		//it's NOT valid
		if(pass1.val().length <4){
			$(this).parent().parent().addClass('field_error');
            $('#pass1Info').removeClass('dnone');
            pass1Info.text("At least 4 characters!");
            $(this).parent().prev().hide();
			return false;
		}
		//it's valid
		else{		
			$(this).parent().parent().removeClass('field_error');
            $('#pass1Info').addClass('dnone');
            $(this).parent().prev().show();
		    //validatePass2();
			return true;
		}
	}
    function validatePass2(){
        var a = $("#password1");
        var b = $("#password2");
        //are NOT valid
        if( pass1.val() != pass2.val() ){
            $(this).parent().parent().addClass('field_error');
            $('#pass2Info').removeClass('dnone');
            pass2Info.text("Passwords doesn't match!");
            $(this).parent().prev().hide();
            return false;
        }
        //are valid
        else{
            $(this).parent().parent().removeClass('field_error');
            $('#pass2Info').addClass('dnone');
            $(this).parent().prev().show();
            return true;
        }
    }
    
    function validateName(){
        if(name.val().length < 1){
            $(this).parent().prev().hide();
        } else {
            $(this).parent().prev().show();
        }
    }
    
    function validateSName(){
        if(sname.val().length < 1){
            $(this).parent().prev().hide();
        } else {
            $(this).parent().prev().show();
        }
    }
});