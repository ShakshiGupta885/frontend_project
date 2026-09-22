document.getElementById("orderForm").addEventListener("submit", async function(event) {

    event.preventDefault();

    const orderData = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        product: document.getElementById("product").value,
        quantity: Number(document.getElementById("quantity").value),
        paymentMethod: document.getElementById("paymentMethod").value
    };

    const result = document.getElementById("result");

    result.innerHTML = "Processing order...";

    try {

        const response = await fetch("http://localhost:5001/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderData)
        });

        const data = await response.json();

        if (response.ok) {

            result.innerHTML = `
                <h3>Order Successful ✅</h3>
                <p>Order ID: ${data.orderId}</p>
                <p>Payment Status: ${data.payment.status}</p>
            `;

        } else {

            result.innerHTML = `
                <p>Order failed ❌</p>
                <p>${data.message}</p>
            `;

        }

    } catch (error) {

        console.error(error);

        result.innerHTML =
            "Unable to connect to Order Service ❌";
    }

});