let allUsers = [];
let getUsersInLocal = JSON.parse(localStorage.getItem("users"));

let getCurrentYear = new Date().getFullYear();
document.getElementById("currentYear").innerHTML = getCurrentYear;


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
function signUpUser() {
    event.preventDefault();
    let username = document.getElementById("signupUsername").value;
    let email = document.getElementById("signupEmail").value;
    let password = document.getElementById("signupPassword").value;


    let userObj = {
        username,
        email,
        password
    }

    let getUsersEmails = allUsers.map(em => em.email);
    let getUsersUsername = allUsers.map(usr => usr.username);

    if (!getUsersEmails.includes(userObj.email) && !getUsersUsername.includes(userObj.username) && userObj.username !== "") {
        const isValid = validatePassword(password);
        if (isValid && allUsers !== null) {
            console.log("IF");
            allUsers.push(userObj);
        }
        else {
            console.log("ELSE");
            allUsers = [userObj]
        }  
        swal("Success", "You're Account has been Registered", "success");
        localStorage.setItem('users', JSON.stringify(allUsers));
    } else if (getUsersEmails.includes(userObj.email)) {
        swal("Error", "Email has already taken", "error");
    } else if (getUsersUsername.includes(userObj.username)) {
        swal("Error", "Username has already taken", "error");
    } else if (userObj.username == "") {
        swal("Error", "Username required", "error");
    }  else {
        console.log("Outer")
    }      
}

function login() {
    event.preventDefault();

    let email = document.getElementById("inputEmail3").value;
    let password = document.getElementById("inputPassword3").value;

    let localUser = JSON.parse(localStorage.getItem("users"));

    localUser.forEach(user => {
        if (user.email === email && user.password === password) {
            localStorage.setItem("authenticated-user", JSON.stringify(user));
            window.location.href = "./index.html";
        }
    });
}