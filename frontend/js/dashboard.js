const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}
let currentUserRole = "";
const message = document.getElementById("message");

fetch("https://practice-management-system.onrender.com/profile", {

    headers: {
        Authorization: `Bearer ${token}`
    }
    
})
.then(response => response.json())
.then(data => {

    currentUserRole = data.user.role;
    message.innerText =
        `Bienvenido usuario con ID ${data.user.id}`;

})
.catch(error => {
    console.log(error);
});

fetch("https://practice-management-system.onrender.com/stats", {
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

fetch("https://practice-management-system.onrender.com/api/users", {

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

                    ${
                        currentUserRole === "admin"
                        ? `
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
                    `
                    : "Sin permisos"
    }

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
            `https://practice-management-system.onrender.com/api/users/${id}`,
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

const modal = document.getElementById("editModal");
const editName = document.getElementById("editName");
const editRole = document.getElementById("editRole");
const saveBtn = document.getElementById("saveBtn");

let selectedUserId = null;

function openEditModal(id, name, role) {
    selectedUserId = id;
    editName.value = name;
    editRole.value = role;

    modal.style.display = "flex";
}

saveBtn.addEventListener("click", async () => {
    try {
        const response = await fetch(   
            `https://practice-management-system.onrender.com/api/users/${selectedUserId}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify({
                    name: editName.value,
                    role: editRole.value
                })
            }
        );

        const data = await response.json();

        alert(data.message || "Usuario actualizado");

        modal.style.display = "none";
        location.reload();
    } catch (error) {
        console.log(error);
        alert("Error al actualizar usuario");
    }
});