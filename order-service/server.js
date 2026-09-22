const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5001;

app.get("/", (req, res) => {
    res.json({
        service: "Order Service",
        status: "running"
    });
});

app.post("/orders", async (req, res) => {

    const {
        name,
        phone,
        product,
        quantity,
        paymentMethod
    } = req.body;

    if (!name || !phone || !product || !quantity) {
        return res.status(400).json({
            message: "Please provide all required details"
        });
    }

    const orderId =
        "ORD-" + Math.floor(Math.random() * 100000);

    console.log("New Order:", {
        orderId,
        name,
        phone,
        product,
        quantity
    });

    try {

        const paymentResponse = await fetch(
            "http://payment-service:5002/payments",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    orderId,
                    name,
                    paymentMethod
                })
            }
        );

        const payment = await paymentResponse.json();

        res.json({
            message: "Order created successfully",
            orderId,
            customer: name,
            product,
            quantity,
            payment
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Payment service unavailable"
        });
    }
});

app.listen(PORT, () => {

    console.log(
        `Order Service running on port ${PORT}`
    );

});