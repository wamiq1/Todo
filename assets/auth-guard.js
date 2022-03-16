let localUser = JSON.parse(localStorage.getItem("authenticated-user"));

if (localUser === null) {
    window.location.href = "./login.html";
}