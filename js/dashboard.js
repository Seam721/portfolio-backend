async function loadDashboard() {

    const token = localStorage.getItem("token");

    const debug = document.getElementById("debug");

    if (!token) {
        debug.innerText = "NO TOKEN FOUND";
        window.location.href = "login.html";
        return;
    }

    debug.innerText = "Token found. Calling Railway API...";

    try {

        const response = await fetch(
            "https://portfolio-backend-production-5e12.up.railway.app/api/dashboard",
            {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        );

        const data = await response.json();

        console.log("STATUS:", response.status);
        console.log("RESPONSE:", data);

        debug.innerText =
            "HTTP STATUS: " + response.status +
            "\n\nAPI RESPONSE:\n" +
            JSON.stringify(data, null, 2);

        if (!response.ok) {
            return;
        }

        if (!data.success) {
            return;
        }

        if (!data.data) {
            return;
        }

        document.getElementById("total").innerText =
            data.data.totalMessages ?? 0;

        const table =
            document.getElementById("messages");

        table.innerHTML = "";

        const messages =
            data.data.latestMessages ?? [];

        if (messages.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="4">
                        No messages found.
                    </td>
                </tr>
            `;

            return;
        }

        messages.forEach(item => {

            table.innerHTML += `
                <tr>
                    <td>${item.name ?? ""}</td>
                    <td>${item.email ?? ""}</td>
                    <td>${item.message ?? ""}</td>
                    <td>${item.created_at ?? ""}</td>
                </tr>
            `;

        });

    } catch (error) {

        debug.innerText =
            "REQUEST ERROR:\n\n" +
            error.message;

        console.error(error);

    }
}

loadDashboard();
