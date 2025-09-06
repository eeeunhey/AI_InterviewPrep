import React from "react";

const SummaryCard = () => ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdataed,
  onSelect,
  onDelete,
  }) => {  
    return  <div
        className="bg-white border border-gray-300/40 rounded-xl p-2 "
        onClick={onSelect}
        >
            <div
                className=""
                style={{
                    background: colors.bgcolor,
                }}
            >
                <div className="">
                    <div className="">
                        <span className="">
                            GU
                        </span>
                    </div>

                    {/* Content Container */}
                    <div className="">
                        <div className="">
                            {/* Title and Skills */}
                            <div>
                                <h2 className="">{role}</h2>
                                <p className="">
                                    {topicsToFocus}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <button
                    className=""
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                    >
                        delete
                    </button>
            </div>
            
            <div className="">
                <div className="">
                    <div className="">
                        Experience: {experience} {experience == 1 ? "Year" : "Years"}
                    </div>

                    <div className="">
                        {questions} Q&A
                    </div>

                    <div className="">
                        Last Updated: {lastUpdataed}
                    </div>

                    {/*Description */}
                    <p className="">
                        {description}
                    </p>

                </div>
            </div>
        </div>
};

export default SummaryCard;
