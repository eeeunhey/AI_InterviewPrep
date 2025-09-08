import React from "react";

const RoleInfoHeader = ({
  role = "",
  topicsToFocus = "",
  experience = 0,
  questions = 0,
  description, // 아직 미사용
  lastUpdated = "",
}) => {
  const topics =
    Array.isArray(topicsToFocus) ? topicsToFocus.join(", ") : topicsToFocus;

  const yearsLabel = experience === 1 ? "Year" : "Years";

  // 보기 좋은 날짜 포맷 (값이 유효할 때만)
  const lastUpdatedLabel = lastUpdated
    ? new Intl.DateTimeFormat("ko-KR", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(lastUpdated))
    : "-";

  return (
    <div className="bg-white relative">
      <div className="container mx-auto px-6 md:px-0">
        <div className="h-[160px] flex flex-col justify-center">
          <div className="flex items-start">
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-semibold">{role}</h2>
                  <p className="text-sm text-gray-900 mt-1 line-clamp-2">
                    {topics}
                  </p>
                </div>
                {/* 필요 시 우측에 버튼/액션 배치 */}
              </div>
            </div>
          </div>
        </div>

        {/* 하단 메타 정보는 container 내부로 */}
        <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-700">
          <div>
            Experience : {experience} {yearsLabel}
          </div>
          <div>{questions} Q&A</div>
          <div>Last Update: {lastUpdatedLabel}</div>
        </div>
      </div>
    </div>
  );
};

export default RoleInfoHeader;
