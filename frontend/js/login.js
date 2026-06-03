const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async () => {

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;

    try {

        const response = await fetch(
            "http://localhost:3000/api/auth/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        if (response.ok) {

            localStorage.setItem("token", data.token);

            alert("Login exitoso");

            window.location.href = "dashboard.html";

        } else {

            alert(data.error);

        }

    } catch (error) {

        console.log(error);

        alert("Error del servidor");

    }

});