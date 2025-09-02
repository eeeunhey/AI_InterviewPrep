const { GoogleGenAI } = require("@google.genai");
const { concepExplainPrompt } = require("../utils/prompts");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// @desc Gemini를 사용해 면접 질문과 답변을 생성한다
// @route POST /api/ai/generate-questions
// @access Private

const generateInterviewQuestions = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({
            message: "Failed to generate questions",
            error: error.message,
        });
    }
};

// @desc 면접 질문에 대한 설명을 생성한다
// @route POST /api/ai/generate-explanation
// @access Private
const generateConceptExplanation = async (req, res) => {};

module.exports = { generateInterviewQuestions, generateConceptExplanation };