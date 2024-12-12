import React, { FC, ChangeEvent, RefObject } from "react";

interface InputFieldProps {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    inputRef?: RefObject<HTMLInputElement | null>;
    className?: string;
}

const InputField: FC<InputFieldProps> = ({
    value,
    onChange,
    placeholder = "Enter text",
    inputRef,
    className = "",
}) => {
    return (
        <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full p-4 text-lg text-gray-700 bg-gray-100 rounded-lg focus:border-[#52BEBD] focus:outline-none shadow-inner ${className}`}
        />
    );
};

export default InputField;
