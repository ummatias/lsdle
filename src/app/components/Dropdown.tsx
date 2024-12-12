import { FC } from "react";
import { Member } from "@/app/types/member";

interface DropdownProps {
    items: Member[];
    onSelect: (member: Member) => void;
    hoverColor: (index: number) => string;
}

const Dropdown: FC<DropdownProps> = ({ items, onSelect, hoverColor }) => {
    return (
        <div
            className="absolute left-0 right-0 mt-2 bg-white rounded-lg z-10 shadow-md"
            style={{
                maxHeight: items.length > 5 ? "200px" : "auto",
                overflowY: items.length > 5 ? "auto" : "visible",
                scrollbarColor: "#4A4A4A #E5E7EB",
                scrollbarWidth: "thin",
            }}
        >
            {items.map((member, index) => (
                <div
                    key={index}
                    className="px-4 py-2 text-gray-800 cursor-pointer transition duration-200"
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                            hoverColor(index);
                        e.currentTarget.style.color = "#FFFFFF";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "#4A4A4A";
                    }}
                    onClick={() => onSelect(member)}
                >
                    {member.name}
                </div>
            ))}
        </div>
    );
};

export default Dropdown;
