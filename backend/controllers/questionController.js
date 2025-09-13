const Question = require("../models/Question");
const Session = require("../models/Session");

// @desc 기존 세션에 추가 질문을 등록한다
// @route POST /api/questions/add
// @access Private
exports.addQuestionsToSession = async (req, res) => {
    try{
        const { sessionId, questions } = req.body;
    
    if(!sessionId || !questions || !Array.isArray(questions)) {
        return res.status(400).json({  message: "입력 형식이 올바르지 않습니다" });
    }

    const session = await Session.findById(sessionId);

    if (!session) {
        return res.status(404).json({ message: "세션을 찾을 수 없습니다" });
    }

    // 새로운 질문 생성을 위한 코드블럭
    const createQuestions = await Question.insertMany(
        questions.map((q) => ({
            session: sessionId,
            question: q.question,
            answer: q.answer,
        }))
    );

    // 세션에 새 questionId들을 포함하도록 업데이트 (더보기 버튼 클릭 시 Q&A 추가 업데이트)
    session.questions.push(...createQuestions.map((q) => q._id));
    await session.save();

    } catch (error) {
        res.status(500).json({ message: "서버 에러" });
    }
};

// @desc 질문을 고정하거나 고정을 해제한다
// @route POST /api/questions/:id/pin
// @access Private
exports.togglePinQuestion = async (req, res) => {
    try{
      const question = await Question.findById(req.params.id);

      if (!question) {
        return res
          .status(404)
          .json({ success: false, message: "질문을 찾을 수 없습니다" });
      }
    
      question.isPinned = !question.isPinned;
      await question.save();

      res.status(200).json({ success: true, question });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc 질문에 대한 노트를 수정한다
// @route POST /api/questions/:id/note
// @access Private
exports.updateQuestionNote = async (req, res) => {
    try{
        const { note } = req.body;
        const question = await Question.findById(req.params.id);

        if(!question) {
            return res
              .status(404)
              .json({ success: false, message: "Question not found" });
        }

        question.note = note || "";
        await question.save();

        res.status(200).json({ success: true, question });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};