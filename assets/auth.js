let allUsers = [];
let getUsersInLocal = JSON.parse(localStorage.getItem("users"));
console.log(getUsersInLocal)

function showMessages(message) {
    document.getElementById("validationPassword").innerHTML = message
}
function validatePassword(password) {
    if (password == "") {
        showMessages("Password field in required") 
        return false;
    } else if (password.length < 8) {
        console.log("8")
        showMessages("Password length must be atleast 8 characters")
        return false;
    }else if (password.length > 15) {
        showMessages("Password length must be atleast 15 characters")
        return false;
    } else {
        return true
    }
}
function signup() {
    event.preventDefault();

    let username = document.getElementById("inputUsername1").value;
    let email = document.getElementById("inputEmail2").value;
    let password = document.getElementById("inputPassword3").value;


    let userObj = {
        username,
        email,
        password
    }

    let getUsersEmails = allUsers.map(em => em.email);
    let getUsersUsername = allUsers.map(em => em.username);

    if (!getUsersEmails.includes(userObj.email) && allUsers !== null && !getUsersUsername.includes(userObj.username)) {
    const isValid = validatePassword(password);
    if (isValid) {
        allUsers.push(userObj);
        swal("Success", "You're Account has been Registered", "success");
        localStorage.setItem('users', JSON.stringify(allUsers));
        return
    }
    } 
    else if (getUsersEmails.includes(userObj.email)) {
        swal("Errorr", "Email has already taken", "error");
    }
    else if (getUsersUsername.includes(userObj.username)) {
        swal("Errorr", "Username has already taken", "error");
    }
    else {
        swal("Errorr", "Registration Failed", "error");
    }          
    username.value = "";
    email.value = "";
    password.value = "";

}