import { FC } from "react";

interface BoxProps {
    children?: React.ReactNode;
    title: string;
    descripton: string;
    className?: string;
}

const Box : FC<BoxProps> = ({ children, title, descripton, className }) => {
    return (
        <div className={`bg-white p-8 rounded-xl w-[400px] mx-auto text-center shadow-[0.625rem_0.625rem_0.875rem_0_rgb(225,226,228),-0.5rem_-0.5rem_1.125rem_0_rgb(255,255,255)] ${className}`}>
            <h1 className="text-4xl font-semibold text-gray-800 mb-4">
                {title}
            </h1>
            <p className="text-gray-500 mb-6">
                {descripton}
            </p>
            <div className="relative">
                {children}
            </div>
        </div>
    )
}

export default Box;