import React from "react";

interface TabsProps {
  tabs: ("reviews" | "wines")[];
  activeTab: "reviews" | "wines";
  onTabChange: (tab: "reviews" | "wines") => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`tab ${activeTab === tab ? "active" : ""}`}
        >
          {tab === "reviews" ? "내가 쓴 후기" : "내가 등록한 와인"}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
