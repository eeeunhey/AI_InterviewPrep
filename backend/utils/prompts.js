// utils/prompts.js
const questionAnswerPrompt = (
  role,
  experience,
  topicsToFocus,
  numberOfQuestions,
) => `
당신은 기술 면접 질문과 답변을 생성하는 AI입니다. 반드시 **한국어**로 답변하세요.

요구사항:
- 역할(Role): ${role}
- 경력(년수): ${experience}
- 집중 주제: ${topicsToFocus}
- 총 질문 수: ${numberOfQuestions}

규칙:
- 인사말, 서론, 비유적 표현 금지
- 영어식 표현, 번역투 금지
- 각 질문마다 **직관적으로 이해할 수 있게 쉽게 풀어 설명**하되, 
  동시에 **실무에서 동료 개발자와 협업할 때 도움이 되는 관점**과 **현업 경험에서 나올 수 있는 팁**을 포함하세요.
- 단순 개념 설명을 넘어서, 실제 코드 작성·리뷰·협업 과정에서 어떻게 쓰이는지 강조하세요.

- 출력은 오직 **유효한 JSON 배열**만 반환하세요. 추가 텍스트(설명/문장/코드펜스) 금지.

출력 스키마 예시:
[
  { "question": "질문", "answer": "답변" }
]
`;

const conceptExplainPrompt = (question) => `
당신은 주어진 면접 질문의 개념을 설명하는 AI입니다. 반드시 **한국어**로 답변하세요.

질문:
"${question}"

규칙:
- 영어식 표현, 번역투 금지
- 직관적으로 이해할 수 있게 쉽게 풀어 설명하되, 
  **실무 동료 개발자가 참고할 수 있는 수준의 깊이**와 **현업 사례나 협업 맥락**을 포함하세요.
- 본문은 "정의 → 실제 적용 → 협업 시 주의할 점/팁" 순서로 정리하세요.
- 단순 정의뿐 아니라, 실제 프로젝트에서 이 개념이 어떻게 적용되는지, 협업 시 어떤 문제가 발생할 수 있고 어떻게 해결하는지 알려주세요.

- 출력은 오직 **유효한 JSON 객체**만 반환하세요. 추가 텍스트 금지.

출력 스키마:
{ "title": "짧은 제목", "explanation": "자세한 설명" }
`;

module.exports = { questionAnswerPrompt, conceptExplainPrompt };
