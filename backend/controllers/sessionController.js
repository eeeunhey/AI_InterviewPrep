const Session = require("../models/Session");
const Question = require("../models/Question");

// @desc 새로운 세션을 생성하고 연관 질문을 등록하기 위한 코드블럭
// @route  POST /api/session/create
// @access Private
exports.createSession = async (req, res) => {
    try {
        const { role, experience, topicsToFocus, description, questions } =
            req.body;
        const userId = req.user._id; // 미들웨어로 이미 로그인한 사용자 정보를 req.user에 세팅함
        // req.user는 로그인한 사용자의 DB 정보
        // req.user를 사용하면 로그인 후 다시 검증할 필요 없이 바로 사용 가능

        const session = await Session.create({
            user: userId,
            role,
            experience,
            topicsToFocus,
            description,
        });

        const questionDocs = await Promise.all(
            questions.map(async (q) => {
                const question = await Question.create({
                    session: session._id,
                    question: q.question,
                    answer: q.answer,
                });
                return question._id;
            })
        );

        session.questions = questionDocs;
        await session.save();

        res.status(201).json({ success: true, session});
    } catch (error) {
        res.status(500).json ({ success: false, message: "Server Error" });
    }
};

// @desc 로그인한 사용자의 모든 세션 가져오기
// @route GET /api/sessions/my-sessions
// @access private
exports.getMySessions = async (req, res) => {
    try {
        const session = await Session.find({ user: req.user.id })
           .sort({ createdAt: -1 })
           .populate("questions");
        res.status(200).json(session);
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" })
    }
};

// @desc 세션 ID로 조회하고, 연결된 질문까지 함께 불러오기
// @route GET /api/sessions/:id
// @access Private
exports.getSessionById = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id)
          .populate({
            path: "questions",
            options: { sort: { isPinned: -1, createdAt: 1} },
          })
          .exec();
    
    if (!session) {
        return res
          .status(404)
          .json({ success: false, message: "Session not found" });
    }

    res.status(200).json({ success: true, session });
    } catch (error) {
        res.status(500).json({ sucess: false, message: "Server Error"});
    }
};

// @desc "세션과 해당 세션에 속한 모든 질문을 삭제한다."
// @route DELETE /api/sessions/:id
// @access Private
exports.deleteSession = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id);

        if(!session) {
            return res.status(404).json({ message: "세션을 찾을 수 없습니다"});
        }

        // 로그인한 사용자가 이 세션의 소유자인지 확인한다
        if (session.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ message: "Not authorized to delete this session" });
        }

        //먼저 이 세션에 연결된 모든 질문을 삭제한다
        await Question.deleteMany({ session: session._id });

        //다음 세션을 삭제한다
        await session.deleteOne();

        res.status(200).json({ message: "Session deleted successfully" });
    } catch (error) {
        res.status(500).json ({ success: false, message: "Server Error" });
    }

};