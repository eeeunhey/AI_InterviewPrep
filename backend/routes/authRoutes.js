const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const router = express.Router();

//Auth Routes
router.post("/register", registerUser); //회원가입 사용자
router.post("/login", loginUser); // 로그인 사용자
router.get("/profile", protect, getUserProfile); // 사용자 프로필 얻어오기

router.post("/upload-image", upload.single("image"), (req, res) => { 

    if(!req.file) {
        return res.status(400).json({ message: "파일이 없습니다"});
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
    }`;
      res.status(200).json({ imageUrl })
});

module.exports = router;