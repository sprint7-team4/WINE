import React, { useEffect, useRef, useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import { DropdownProps } from "@/types/dropdownTypes";
import { MenuItem } from "@/constants/dropdown";

export default function Dropdown({
  trigger = <></>,
  items = [],
  children = null,
  onSelect = () => {},
  triggerClassName = "",
  menuClassName = "",
  itemClassName = "",
  onToggle = () => {},
  ...rest
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<string>(
    typeof trigger === "string" ? trigger : ""
  );

  const handleToggle = () => {
    setIsOpen(!isOpen);
    onToggle(!isOpen);
  };

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
    setIsOpen(false);
    onSelect(item);
    onToggle(false);
  };

  useClickOutside(dropdownRef, () => {
    setIsOpen(false);
    onToggle(false);
  });

  const renderTrigger = () => {
    if (typeof trigger === "string") {
      return <>{selectedItem}</>;
    } else if (React.isValidElement(trigger))
      return React.cloneElement(trigger);
  };

  useEffect(() => {}, [trigger]);

  return (
    <div className="relative" ref={dropdownRef} {...rest}>
      <div
        className={`cursor-pointer ${triggerClassName}`}
        onClick={handleToggle}
      >
        {renderTrigger()}
      </div>
      {isOpen && (
        <ul
          className={`flex flex-col flex-center font-medium-14 md:font-medium-16 translate-y-8 right-0 whitespace-nowrap absolute bg-white rounded-16 border border-grayscale-300 z-3 ${menuClassName}`}
        >
          {items.length !== 0
            ? items.map((value) => (
                <div className="w-110 md:w-126 p-[3px_6px]" key={value}>
                  <li
                    className={`flex flex-col flex-center p-[8px_14px] md:p-[10px_22px] hover:bg-main-10 text-grayscale-800 hover:text-main rounded-10 cursor-pointer ${itemClassName}`}
                    onClick={() => handleItemClick(value)}
                  >
                    {value}
                  </li>
                </div>
              ))
            : children}
        </ul>
      )}
    </div>
  );
}
