const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// JWT 토큰을 생성

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// @desc 새로 가입한 사용자
// @route POST /api/auto/register
//@access Public

const registerUser = async (req, res) => {
    try {
    const {name, email, password, profileImageUrl } =
     req.body;
    
     //Check if user already exists
     const userExists = await User.findOne({ email });
     if (userExists) {
        return res.status(400).json({ message: "사용자가 이미 존재합니다"});
     }

     //비밀번호 암호화
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt);

    const user  = await User.create({
        name,
        email,
        password: hashedPassword,
        profileImageUrl,
    });

    //JWT 토큰 | 사용자 정보를 함께 반환"
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json ({ message: "Server error", error: error.message});
  }
};


// @desc 로그인한 사용자
// @route POST /api/auth/login
// @access Public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 사용자 확인
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(500).json({ message: "이메일 또는 비밀번호가 올바르지 않습니다."});
        }

        // 비밀번호 확인
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(500).json({ message: "이메일 또는 비밀번호가 올바르지 않습니다."})
        }

        // 사용자 정보와 JWT 반환하는 코드
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        });
    } catch(error) {
    console.error("로그인 에러:", error);
    res.status(500).json({ message: "서버 에러가 발생했습니다", error: error.message});
    }
};

// @desc 사용자 프로필 가져옴
// @route GET /api/auth/profile
// @access Private {Requires JWT}
const getUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      if(!user) {
        return res.status(404).json({ message: "사용자를 찾을 수 없습니다"});
      }
      res.json(user);
    } catch (error) {
        res.status(500).json({ message: "오류가 발생했습니다", error: error.message});
    }
};

module.exports = { registerUser, loginUser, getUserProfile };