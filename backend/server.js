require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path"); // 요청 로깅 (선택)
const connectDB = require("./config/db"); // 몽고 연결 함수

const app = express();

// 프론트와 백을 연결할 미들웨어
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

connectDB();

// 미들웨어
app.use(express.json());

// 라우트
app.use("/api/auth",authRoutes);
app.use("/api/session",sessionRoutes);
app.use("/api/questions",questionRoutes);


app.use("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.use("/api/ai/generate-explanation", protect, generateConceptExplanation);


// 서버 업로드 폴더

app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));

// 서버 시작!
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
