const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

const message = document.getElementById("message");

fetch("http://localhost:3000/profile", {

    headers: {
        Authorization: `Bearer ${token}`
    }

})
.then(response => response.json())
.then(data => {

    message.innerText =
        `Bienvenido usuario con ID ${data.user.id}`;

})
.catch(error => {
    console.log(error);
});

fetch("http://localhost:3000/stats", {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
.then(response => response.json())
.then(data => {

    document.getElementById("totalUsers").innerText = data.totalUsers;
})
.catch(error => {
    console.log(error);
});

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {

    localStorage.removeItem("token");

    window.location.href = "login.html";

});