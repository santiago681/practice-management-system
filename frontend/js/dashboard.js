const token = localStorage.getItem("token");

// Verificar si existe token
if (!token) {
    window.location.href = "login.html";
}

fetch("http://localhost:3000/profile", {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
.then((response) => {
    if (!response.ok) {
        throw new Error("Error getting profile");
    }
    return response.json();
})
.then((data) => {
    document.getElementById("welcomeName").innerText = `Bienvenido`;
    document.getElementById("welcomeRole").innerText = `Rol: ${data.user.role}`;
})
.catch((error) => {
    console.log(error);
});

// Obtener estadísticas
fetch("http://localhost:3000/api/dashboard/stats", {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
.then((response) => {

    if (!response.ok) {
        throw new Error("Error getting stats");
    }

    return response.json();
})
.then((data) => {
    document.getElementById("totalUsers").innerText = data.totalUsers;
    document.getElementById("totalCompanies").innerText = data.totalCompanies;
    document.getElementById("totalInternships").innerText = data.totalInternships;
    
})
.catch((error) => {
    console.log("Stats error:", error);
});

// Obtener usuarios
fetch("http://localhost:3000/api/users", {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
.then((response) => {

    if (!response.ok) {
        throw new Error("Error getting users");
    }

    return response.json();
})
.then((users) => {

    const tableBody = document.getElementById("usersTableBody");

    tableBody.innerHTML = "";

    users.forEach((user) => {

        const row = `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>

                    <button onclick="openEditModal(
                        ${user.id},
                        '${user.name}',
                        '${user.role}'
                    )">
                        Editar
                    </button>

                    <button onclick="deleteUser(${user.id})">
                        Eliminar
                    </button>
                </td>
            </tr>
        `;

        tableBody.innerHTML += row;
    });

})
.catch((error) => {
    console.log("Users error:", error);
});

// Eliminar usuario
function deleteUser(id) {

    const confirmDelete = confirm("¿Deseas eliminar este usuario?");

    if (!confirmDelete) {
        return;
    }

    fetch(`http://localhost:3000/api/users/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then((response) => {

        if (!response.ok) {
            throw new Error("Error deleting user");
        }

        return response.json();
    })
    .then((data) => {

        alert(data.message);

        location.reload();

    })
    .catch((error) => {
        console.log("Delete error:", error);
    });
}

// Logout
function logout() {

    localStorage.removeItem("token");

    window.location.href = "login.html";
}