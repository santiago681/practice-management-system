const registerBtn = document.getElementById("registerBtn");

registerBtn.addEventListener("click", async () => {

    const name = document.getElementById("name").value;

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;

    const role = document.getElementById("role").value;

    try {

        const response = await fetch(
            "http://localhost:3000/api/auth/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    role
                })
            }
        );

        const data = await response.json();

        if (response.ok) {
            alert("Usuario registrado exitosamente.");
            window.location.href = "login.html";
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error(error);
        alert("Error del servidor");
    }
});