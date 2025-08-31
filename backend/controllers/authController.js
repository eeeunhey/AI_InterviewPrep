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

const registerUser = async (requestAnimationFrame, res) => {

};

// @desc 로그인한 사용자
// @route POST /api/auth/login
// @access Public
const loginUser = async (req, res) => {

};

// @desc 사용자 프로필 가져옴
// @route GET /api/auth/profile
// @access Private {Requires JWT}
const getUserProfile = async (req, res) => {

};

module.exports = { registerUser, loginUser, getUserProfile };