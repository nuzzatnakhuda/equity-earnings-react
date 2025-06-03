function Validation(values) {
    let error = {}
    // const username_pattern = /^[A-Za-z]{6,16}$/;
    // const password_pattern = /^(?=.*?[a-z]).{8,32}$/;
    // const email_pattern = /^[A-Z0-9. _%+-]+@[A-Z0-9. -]+\. [A-Z]{2,}$/i;
    
    //username validation
    if(values.username === ""){
        error.username = "Enter Username between 6-16 Characters"
    }
    // else if(!username_pattern.test(values.name)){
    //     error.name = "Username Didn't Match"
    // }
    else{
        error.username = ""
    }

    //email validation
    if(values.email === ""){
        error.email = "Please Enter Email"
    }
    // else if(!email_pattern.test(values.email)){
    //     error.email = "Email Didn't Match"
    // }
    else{
        error.email = ""
    }

    //password validation
    if(values.password === ""){
        error.password = "Enter Password Between 8-32 Characters"
    }
    // else if(!password_pattern.test(values.password)){
    //     error.password = "Password Didn't Match"
    // }
    else{
        error.password = ""
    }

    return error;
}

export default Validation;