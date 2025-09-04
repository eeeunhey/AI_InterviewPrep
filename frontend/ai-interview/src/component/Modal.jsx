import React, { useRef, useEffect, useLayoutEffect, useState } from "react";

const Modal = ({
  children,
  isOpen,
  onClose,
  hideHeader,
  title,
  margin = 16,      // 화면 여백
  minScale = 0.7,   // 최소 축소 배율(글자 너무 작아지는 것 방지)
  designWidth = 520 // 디자인 기준 폭(px) — 줄여도 이 폭을 기준으로 스케일만 조절
}) => {
  const contentRef = useRef(null);
  const [scale, setScale] = useState(1);

  // 배경 클릭 닫기
  useEffect(() => {
    if (!isOpen) return;
    const out = (e) => {
      if (contentRef.current && !contentRef.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", out);
    return () => document.removeEventListener("mousedown", out);
  }, [isOpen, onClose]);

  // 배경 스크롤 잠금(레이아웃 흔들림 방지)
  useEffect(() => {
    if (!isOpen) return;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    const prevPad = html.style.paddingRight;
    const sw = window.innerWidth - html.clientWidth;
    html.style.overflow = "hidden";
    if (sw > 0) html.style.paddingRight = `${sw}px`;
    return () => {
      html.style.overflow = prevOverflow;
      html.style.paddingRight = prevPad;
    };
  }, [isOpen]);

  // 동일 레이아웃 유지: 폭/높이 제약 기준으로 균등 스케일
  useLayoutEffect(() => {
    if (!isOpen) return;

    const fit = () => {
      if (!contentRef.current) return;

      const naturalW = designWidth;
      const naturalH = contentRef.current.scrollHeight; // 자연 높이

      const availW = Math.max(0, window.innerWidth - margin * 2);
      const availH = Math.max(0, window.innerHeight - margin * 2);

      const byW = availW / naturalW;
      const byH = availH / naturalH;

      // 균등 스케일(가로/세로 모두 만족). 블러 줄이려 0.05 단위로 스냅.
      const raw = Math.min(1, Math.max(minScale, Math.min(byW, byH)));
      const snapped = Math.round(raw / 0.05) * 0.05;

      setScale(snapped);
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(document.body);
    if (contentRef.current) ro.observe(contentRef.current);
    window.addEventListener("resize", fit);
    return () => {
      window.removeEventListener("resize", fit);
      ro.disconnect();
    };
  }, [isOpen, margin, minScale, designWidth]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      {/* 스케일을 적용하는 래퍼: 디자인 폭은 고정, 화면이 작으면 축소 */}
      <div
        className="will-change-transform transition-transform duration-150"
        style={{
          width: `${designWidth}px`,
          maxWidth: "92vw",
          transform: `scale(${scale})`,
          transformOrigin: "center top"
        }}
      >
        {/* 실제 모달(자연 크기) */}
        <div
          ref={contentRef}
          className="overflow-hidden rounded-xl bg-white shadow-xl"
          style={{
            // 한국어 줄바꿈 안정화 + 폰트 스무딩
            wordBreak: "keep-all",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale"
          }}
        >
          {!hideHeader && (
            <div className="relative flex items-center justify-between border-b border-gray-200 p-5">
              <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
              <button
                onClick={onClose}
                className="absolute right-3.5 top-3.5 flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-orange-100 hover:text-gray-900"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" className="h-5 w-5">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l12 12M13 1 1 13" />
                </svg>
              </button>
            </div>
          )}

          {/* 본문: 폭 넘김 방지 규칙 */}
          <div className="p-6 break-words">
            <div className="[&_*]:max-w-full [&_img]:max-w-full [&_img]:h-auto [&_input]:w-full [&_button]:w-full">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
