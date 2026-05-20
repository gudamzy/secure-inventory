require("dotenv").config();

const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const session = require("express-session");

const app = express();

app.use(helmet());


// ================= CORS =================
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true
    })
);


// ================= BODY PARSER =================
app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);


// ================= SESSION =================
app.use(

    session({

        secret: process.env.SESSION_SECRET,

        resave: false,

        saveUninitialized: false,

        cookie: {

            httpOnly: true,

            secure: false,

            sameSite: "strict"

        }

    })

);


// ================= DATABASE =================
const db = mysql.createPool({

    host: process.env.DB_HOST,

    user: process.env.DB_USER,

    password: process.env.DB_PASSWORD,

    database: process.env.DB_NAME

}).promise();

console.log(process.env.DB_NAME);


// ================= AUDIT LOG FUNCTION =================
async function logAction(username, action) {

    await db.query(

        `
        INSERT INTO audit_logs
        (username, action)

        VALUES (?, ?)
        `,

        [
            username,
            action
        ]

    );

}


// ================= HOME =================
app.get("/", (req, res) => {

    res.json({

        message:
            "Secure Inventory API Running"

    });

});


// ================= REGISTER =================
app.post("/auth/register", async (req, res) => {

    try {

        const {
            username,
            password,
            role
        } = req.body;

        // CHECK EXISTING USER
        const [existingUser] = await db.query(

            `
            SELECT *
            FROM users

            WHERE username=?
            `,

            [username]

        );

        if (existingUser.length > 0) {

            return res.status(400).json({

                message:
                    "User already exists"

            });

        }

        // HASH PASSWORD
        const hashedPassword =
            await bcrypt.hash(password, 10);

        // INSERT USER
        await db.query(

            `
            INSERT INTO users
            (
                username,
                password,
                role
            )

            VALUES (?, ?, ?)
            `,

            [
                username,
                hashedPassword,
                username === "admin"
        ? "admin"
        : "user"
            ]

        );

        // AUDIT LOG
        await logAction(

            username,

            "User registered"

        );

        res.json({

            message:
                "User registered successfully"

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({

            error:
                err.message

        });

    }

});


// ================= LOGIN =================
app.post("/auth/login", async (req, res) => {

    try {

        const {
            username,
            password
        } = req.body;

        // FIND USER
        const [rows] = await db.query(

            `
            SELECT *
            FROM users

            WHERE username=?
            `,

            [username]

        );

        if (rows.length === 0) {

            return res.status(400).json({

                message:
                    "Invalid username or password"

            });

        }

        const user = rows[0];

        // COMPARE PASSWORD
        const validPassword =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!validPassword) {

            return res.status(400).json({

                message:
                    "Invalid username or password"

            });

        }

        // CREATE SESSION
        req.session.user = {

            id: user.id,

            username: user.username,

            role: user.role

        };

        // AUDIT LOG
        await logAction(

            user.username,

            "User logged in"

        );

        res.json({

            message:
                "Login successful",

            user:
                req.session.user

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({

            error:
                err.message

        });

    }

});


// ================= LOGOUT =================
app.post("/auth/logout", async (req, res) => {

    try {

        if (req.session.user) {

            await logAction(

                req.session.user.username,

                "User logged out"

            );

        }

        req.session.destroy();

        res.json({

            message:
                "Logged out successfully"

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({

            error:
                err.message

        });

    }

});


// ================= PROFILE =================
app.get("/profile", (req, res) => {

    if (!req.session.user) {

        return res.status(401).json({

            message:
                "Unauthorized"

        });

    }

    res.json({

        user:
            req.session.user

    });

});


// ================= ADMIN PAGE =================
app.get("/admin", (req, res) => {

    if (!req.session.user) {

        return res.status(401).json({

            message:
                "Unauthorized"

        });

    }

    res.json({

        message:
            "Welcome Admin"

    });

});


// ================= VIEW PRODUCTS =================
app.get("/products", async (req, res) => {

    try {

        const [products] = await db.query(

            `
            SELECT *
            FROM products

            ORDER BY id DESC
            `

        );

        res.json(products);

    } catch (err) {

        console.log(err);

        res.status(500).json({

            error:
                err.message

        });

    }

});


// ================= ADD PRODUCT =================
app.post("/products", async (req, res) => {

    try {

        // CHECK LOGIN
        if (!req.session.user) {

            return res.status(401).json({

                message:
                    "Please login first"

            });

        }

        // GET DATA
        const {
            name,
            quantity,
            price,
            image
        } = req.body;

        // VALIDATION
        if (
            !name ||
            !quantity ||
            !price ||
            !image
        ) {

            return res.status(400).json({

                message:
                    "All fields are required"

            });

        }

        // INSERT PRODUCT
        await db.query(

            `
            INSERT INTO products
            (
                name,
                quantity,
                price,
                image
            )

            VALUES (?, ?, ?, ?)
            `,

            [
                name,
                quantity,
                price,
                image
            ]

        );

        // AUDIT LOG
        await logAction(

            req.session.user.username,

            `Added product: ${name}`

        );

        res.json({

            message:
                "Product added successfully"

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({

            error:
                err.message

        });

    }

});


// ================= UPDATE PRODUCT =================
app.put("/products/:id", async (req, res) => {

    try {

        // CHECK LOGIN
        if (!req.session.user) {

            return res.status(401).json({

                message:
                    "Please login first"

            });

        }

        const { id } = req.params;

        const {
            name,
            quantity,
            price,
            image
        } = req.body;

        // VALIDATION
        if (
            !name ||
            !quantity ||
            !price ||
            !image
        ) {

            return res.status(400).json({

                message:
                    "All fields are required"

            });

        }

        // UPDATE PRODUCT
        await db.query(

            `
            UPDATE products

            SET
                name=?,
                quantity=?,
                price=?,
                image=?

            WHERE id=?
            `,

            [
                name,
                quantity,
                price,
                image,
                id
            ]

        );

        // AUDIT LOG
        await logAction(

            req.session.user.username,

            `Updated product ID: ${id}`

        );

        res.json({

            message:
                "Product updated successfully"

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({

            error:
                err.message

        });

    }

});


// ================= DELETE PRODUCT =================
app.delete("/products/:id", async (req, res) => {

    try {

        // CHECK LOGIN
        if (!req.session.user) {

            return res.status(401).json({

                message:
                    "Please login first"

            });

        }

        // ADMIN ONLY
        if (req.session.user.role !== "admin") {

            return res.status(403).json({

                message:
                    "Only admin can delete products"

            });

        }

        const { id } = req.params;

        // DELETE PRODUCT
        await db.query(

            `
            DELETE FROM products

            WHERE id=?
            `,

            [id]

        );

        // AUDIT LOG
        await logAction(

            req.session.user.username,

            `Deleted product ID: ${id}`

        );

        res.json({

            message:
                "Product deleted successfully"

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({

            message:
                "Internal Server Error"

        });

    }

});

// ================= VIEW AUDIT LOGS =================
app.get("/audit-logs", async (req, res) => {

    try {

        // CHECK LOGIN
        if (!req.session.user) {

            return res.status(401).json({

                message:
                    "Please login first"

            });

        }

        const [logs] = await db.query(

            `
            SELECT *
            FROM audit_logs

            ORDER BY created_at DESC
            `

        );

        res.json(logs);

    } catch (err) {

        console.log(err);

        res.status(500).json({

            error:
                err.message

        });

    }

});


// ================= START SERVER =================
app.listen(5000, () => {

    console.log(
        "Server Running on Port 5000"
    );

});