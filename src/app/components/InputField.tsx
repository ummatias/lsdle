import React, { FC, ChangeEvent, KeyboardEvent, RefObject } from "react";

interface InputFieldProps {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
    placeholder?: string;
    inputRef?: RefObject<HTMLInputElement | null>;
    className?: string;
}

const InputField: FC<InputFieldProps> = ({
    value,
    onChange,
    onKeyDown,
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
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            autoComplete="off"
            className={`w-full p-4 text-lg text-gray-700 bg-gray-100 rounded-lg focus:border-[#52BEBD] focus:outline-none shadow-inner ${className}`}
        />
    );
};

export default InputField;
