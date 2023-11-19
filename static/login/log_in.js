const loginButton = document.getElementById("login_button");
const loginUsername = document.getElementById("login_username");

function checkLogin() {
    let message = document.getElementById("wrong");
    console.log("found");
    if (localStorage.length > 0) {
        if (localStorage.getItem(`${loginUsername.value}`) == null) {
            console.log("found");
            message.style.display = "block";
        }
    } else {
        console.log("not found");
        message.innerText = "Username is not found";
        message.style.display = "block";
    }
}

loginButton.addEventListener("click", () => {checkLogin()});