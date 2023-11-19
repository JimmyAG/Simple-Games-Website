const loadStorage = document.getElementById("loadStorage");
let placeHolder = document.getElementById("placeHolder");


//This function checks if the user is logged or not and if then retrieves the values assigned to his username
//otherwise it returns the data for the guest


function checkGuest() {
    if (localStorage.getItem("guest") !== null){
        const p = document.createElement("p");
        p.innerText = `guest: ${localStorage["guest"]}`;
        placeHolder.appendChild(p);
    } else {
        const p = document.createElement("p");
        p.innerText = `There are not stats at the moment, try playing some games first!`;
        placeHolder.appendChild(p);
    }

}

function checkUser() {
    try {
        let user = document.getElementById("user").innerText;
        if (localStorage.getItem(`${user}`) !== null) {
            const p = document.createElement("p");
            p.innerText = `${user}: ${localStorage[`${user}`]}`;
            placeHolder.appendChild(p);
        }else{
            const p = document.createElement("p");
            p.innerText = `There are not stats at the moment, try playing some games first!`;
            placeHolder.appendChild(p);
        }

    } catch {
        const p = document.createElement("p");
        p.innerText = `There are not stats at the moment, try playing some games first!`;
        placeHolder.appendChild(p);
    }
}


function loadFromStorage() {
    if (document.getElementById("user")) {
        checkUser();
    }else{
        checkGuest();
    }

}



loadStorage.addEventListener("click", () => {loadFromStorage()}, {once:true});
