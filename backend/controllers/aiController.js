const { GoogleGenAI } = require("@google/genai");
const { concepExplainPrompt, questionAnswerPrompt } = require("../utils/prompts");

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is missing");
}
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY});

// @desc Gemini를 사용해 면접 질문과 답변을 생성한다
// @route POST /api/ai/generate-questions
// @access Private

const generateInterviewQuestions = async (req, res) => {
    try {
        const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

        if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
            return res.status(400).json({ message: "필수 입력 항목이 누락되었습니다"});
        }

        const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents: prompt,
        });

        let rawText = response.text;

        // 깨끗하게 정리: 맨 앞의 ```json 과 맨 뒤의 ``` 제거
        // 이유: 실제 JSON 데이터로 사용하려면 마크다운 코드 블록 기호(```)가 있으면 파싱 오류 발생
        const cleanedText = rawText
            .replace(/^```json\s*/, "") // 시작 부분의 ```json 제거 → JSON 시작 인식 방해 방지
            .replace(/```$/, "")        // 끝 부분의 ``` 제거 → JSON 끝에 불필요한 기호 제거
            .trim();                    // 앞뒤 공백 제거 → 불필요한 스페이스/줄바꿈 방지
        
        //json 코드 블럭 마크다운 제거 안전하게 json파싱 가능함
        const data = JSON.parse(cleanedText);

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: "질문 생성에 실패하였습니다.",
            error: error.message,
        });
    }
};

// @desc 면접 질문에 대한 설명을 생성한다
// @route POST /api/ai/generate-explanation
// @access Private
const generateConceptExplanation = async (req, res) => {
    try {
        const { question } = req.body;

        if(!question) {
            return res.status(400).json({ message: "필수 입력 항목이 누락되었습니다" })
        }

        const prompt = concepExplainPrompt(question);

        const response = await ai.model.generateContent({
            model: "gemini-2.5-flash-Lite",
            contents: prompt,
        });

        let rawText = response.text;

        const cleanedText = rawText
            .replace(/^```json\s*/, "") 
            .replace(/```$/, "")        
            .trim();                   
        
        //json 코드 블럭 마크다운 제거 안전하게 json파싱 가능함
        const data = JSON.parse(cleanedText);

        res.status(200).json(data);
    } catch (error) {
                res.status(500).json({
            message: "질문 생성에 실패하였습니다.",
            error: error.message,
        });
    }

};

module.exports = { generateInterviewQuestions, generateConceptExplanation };