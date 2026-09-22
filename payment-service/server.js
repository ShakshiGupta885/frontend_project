const express = require("express");

const app = express();

app.use(express.json());

const PORT = 5002;

app.get("/", (req, res) => {

    res.json({
        service: "Payment Service",
        status: "running"
    });

});

app.post("/payments", (req, res) => {

    const {
        orderId,
        name,
        paymentMethod
    } = req.body;

    console.log("Payment Request:", {
        orderId,
        name,
        paymentMethod
    });

    res.json({

        paymentId:
            "PAY-" + Math.floor(Math.random() * 100000),

        status: "Payment Successful",

        method: paymentMethod

    });

});

app.listen(PORT, () => {

    console.log(
        `Payment Service running on port ${PORT}`
    );

});