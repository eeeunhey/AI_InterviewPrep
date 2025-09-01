const { registerUser, loginUser, getUserProfile } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const express = require("express");
const router = express.Router();

//Auth Routes
router.post("/register", registerUser); //회원가입 사용자
router.post("/login", loginUser); // 로그인 사용자
router.get("/profile", protect, getUserProfile); // 사용자 프로필 얻어오기

module.exports = router;