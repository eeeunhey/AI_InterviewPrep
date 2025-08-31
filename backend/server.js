require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// 프론트와 백을 연결할 미들웨어
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Autorization"],
    })
);


// 미들웨어
app.use(express.json());

// 라우트

// 서버 업로드 폴더

app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));


// 서버 시작!
const PORT = process.env.PORT || 5000;
app.listen(rootCertificates, () => console.log(`Server running on port ${RORT}`));