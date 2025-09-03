// utils/prompts.js
const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions, codeLang = "javascript") => `
당신은 기술 면접 질문과 답변을 생성하는 AI입니다. 반드시 **한국어**로 답변하세요.

요구사항:
- 역할(Role): ${role}
- 경력(년수): ${experience}
- 집중 주제: ${topicsToFocus}
- 총 질문 수: ${numberOfQuestions}

규칙:
- 각 질문마다 초보자도 이해할 수 있는 상세하고 친절한 답변을 작성하세요.
- 코드 예제가 필요하면 반드시 \`\`\`${codeLang}\`\`\` 코드 블록으로 포함하세요.
- 출력은 오직 **유효한 JSON 배열**만 반환하세요. 추가 텍스트(설명/문장/코드펜스) 금지.

출력 스키마 예시:
[
  { "question": "질문", "answer": "답변" }
]
`;

const conceptExplainPrompt = (question, codeLang = "javascript") => `
당신은 주어진 면접 질문의 개념을 설명하는 AI입니다. 반드시 **한국어**로 답변하세요.

질문:
"${question}"

규칙:
- 초보 개발자에게 강의하듯 깊이 있으나 명확하게 설명하세요.
- 필요하면 \`\`\`${codeLang}\`\`\` 코드 블록으로 간단 예제를 제시하세요.
- 출력은 오직 **유효한 JSON 객체**만 반환하세요. 추가 텍스트 금지.

출력 스키마:
{ "title": "짧은 제목", "explanation": "자세한 설명" }
`;

module.exports = { questionAnswerPrompt, conceptExplainPrompt };
