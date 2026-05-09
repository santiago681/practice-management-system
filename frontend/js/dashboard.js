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

fetch("http://localhost:3000/api/users", {

    headers: {
        Authorization: `Bearer ${token}`
    }

})
.then(response => response.json())
.then(users => {

    const table = document.getElementById("usersTable");

    users.forEach(user => {

        table.innerHTML += `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>
                    <button onclick="deleteUser(${user.id})">
                        Eliminar
                    </button>
                    </td>
            </tr>
            
        `;

    });

})
.catch(error => {
    console.log(error);
});

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {

    localStorage.removeItem("token");

    window.location.href = "login.html";

});

async function deleteUser(id) {

    const confirmDelete = confirm(
        "¿Eliminar usuario?"
    );

    if (!confirmDelete) return;

    try {

        const response = await fetch(
            `http://localhost:3000/api/users/${id}`,
            {
                method: "DELETE",

                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            location.reload();
        } else {
            alert(data.error || "Error al eliminar usuario");
        }

    } catch (error) {

        console.log(error);
        alert("Error del servidor");

    }

}