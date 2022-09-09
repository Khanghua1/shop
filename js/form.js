
// Đối tượng Validator
function Validator(options) {
    var formElement = document.querySelector(options.form)
    //Hàm thực hiện
    function validate(inputElement, rule) {
        var errorMessage = rule.test(inputElement.value);
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector)

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');
        } else {
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');
        }
    }
    //Lấy element đối tượng cần validate
    if (formElement) {
        formElement.onSubmit = function(e){
            e.preventDefault();

            options.rules.forEach(function(rule){
                var inputElement = formElement.querySelector(rule.selector);
            })
        }




        //Lặp qua mỗi rule và xử lí
        options.rules.forEach(function (rule) {
            var inputElement = formElement.querySelector(rule.selector);

            if (inputElement) {
                //Xử lí blur ra khỏi Input
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                }
                inputElement.oninput = function(){
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid');
                }
              
            }
        })
    }
}


Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : "Please enter this field";
        }
    }
}


Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : "Please enter Email";
        }
    }
}

Validator.minLength = function (selector, min) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : `Please enter at least ${min} characters` ;
        }
    }
}

Validator.isConfirmed = function(selector, getConfirmValue, message){
    return{
        selector : selector,
        test: function(value){
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chích xác';
        }
    }
}


//
function validForm() {
    var frm = document.forms[0];
    var obj, txt = "";
     //Check box
    obj = frm.elements["t"];
    var i;
    for (i = 0; i < obj.length; i++)
        if (obj[i].checked) {
            break;
        }
    if (i == obj.length) {
        alert("Please select option");
        obj[0].focus();
        return false;
    }
    //Giới tính
    obj = frm.elements["fav_language"];
    var i;
    for (i = 0; i < obj.length; i++)
        if (obj[i].checked) {
            break;
        }
    if (i == obj.length) {
        alert("Please select your gender");
        obj[0].focus();
        return false;
    }
    //Tỉnh
    var i = frm.tinh.selectedIndex;
    if (i < 1) {
        alert("You have not selected a province");
        return false;
    }
    //Printf
    if (alert('Update successful'))
        return false;
    return true;
}
