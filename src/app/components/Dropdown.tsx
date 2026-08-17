import { FC, useEffect, useRef } from "react";
import { Member } from "@/app/types/member";

interface DropdownProps {
    items: Member[];
    onSelect: (member: Member) => void;
    hoverColor: (index: number) => string;
    highlightedIndex?: number;
}

const Dropdown: FC<DropdownProps> = ({
    items,
    onSelect,
    hoverColor,
    highlightedIndex = -1,
}) => {
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        itemRefs.current[highlightedIndex]?.scrollIntoView({
            block: "nearest",
        });
    }, [highlightedIndex]);

    return (
        <div
            className="absolute left-0 right-0 mt-2 bg-white rounded-lg z-20 shadow-md animate-fadeIn"
            style={{
                maxHeight: items.length > 5 ? "200px" : "auto",
                overflowY: items.length > 5 ? "auto" : "visible",
                scrollbarColor: "#4A4A4A #E5E7EB",
                scrollbarWidth: "thin",
            }}
        >
            {items.map((member, index) => {
                const isHighlighted = index === highlightedIndex;
                return (
                    <div
                        key={index}
                        ref={(el) => {
                            itemRefs.current[index] = el;
                        }}
                        className="px-4 py-2 text-gray-800 cursor-pointer transition duration-200"
                        style={{
                            backgroundColor: isHighlighted
                                ? hoverColor(index)
                                : "transparent",
                            color: isHighlighted ? "#FFFFFF" : "#4A4A4A",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor =
                                hoverColor(index);
                            e.currentTarget.style.color = "#FFFFFF";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor =
                                isHighlighted
                                    ? hoverColor(index)
                                    : "transparent";
                            e.currentTarget.style.color = isHighlighted
                                ? "#FFFFFF"
                                : "#4A4A4A";
                        }}
                        onClick={() => onSelect(member)}
                    >
                        {member.name}
                    </div>
                );
            })}
        </div>
    );
};

export default Dropdown;
