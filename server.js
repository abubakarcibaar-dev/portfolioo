
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================
// GMAIL
// ==========================

const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// ==========================
// TEST
// ==========================

app.get("/", (req, res) => {
    res.send("Backend is working! ✅");
});

// ==========================
// SEND EMAIL
// ==========================

app.post("/send-email", async (req, res) => {

    console.log("📩 Received:", req.body);

    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {

        return res.status(400).json({
            success: false,
            message: "Fadlan dhammaan meelaha buuxi."
        });

    }

    try {

        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: process.env.EMAIL_USER,

            replyTo: email,

            subject: `Portfolio Contact: ${subject}`,

            html: `
                <div style="font-family: Arial, sans-serif;">

                    <h2>📩 New Portfolio Message</h2>

                    <p>
                        <strong>Name:</strong>
                        ${name}
                    </p>

                    <p>
                        <strong>Email:</strong>
                        ${email}
                    </p>

                    <p>
                        <strong>Subject:</strong>
                        ${subject}
                    </p>

                    <hr>

                    <p>
                        <strong>Message:</strong>
                    </p>

                    <p>
                        ${message}
                    </p>

                </div>
            `
        });

        console.log("✅ Email sent successfully!");

        return res.status(200).json({

            success: true,

            message: "Fariinta waa la diray! ✅"

        });

    } catch (error) {

        console.error("❌ EMAIL ERROR:", error);

        return res.status(500).json({

            success: false,

            message: "Email lama diri karin: " + error.message

        });

    }

});

// ==========================
// SERVER
// ==========================

app.listen(5000, () => {

    console.log("--------------------------------");
    console.log("🚀 Server running on port 5000");
    console.log("http://localhost:5000");
    console.log("--------------------------------");
 
});
