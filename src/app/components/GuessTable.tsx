import { Member } from "../types/member";
import { FIELDS } from "../utils/constants";
import { formatGuess, handleGuessColor } from "../utils/utils";
import { FC } from "react";

interface GuessingTableProps {
    dailyMember: Member | null;
    guesses: Member[];
}

const GuessingTable: FC<GuessingTableProps> = ({ dailyMember, guesses }) => {
    return (
        <div
            className="w-full sm:w-[90%] lg:w-[80%] h-[16rem] mx-auto mt-8 px-4 overflow-auto rounded-xl bg-white shadow-[0.625rem_0.625rem_0.875rem_0_rgb(225,226,228),-0.5rem_-0.5rem_1.125rem_0_rgb(255,255,255)]"
            style={{
                scrollbarColor: "#4A4A4A #F3F4F6",
                scrollbarWidth: "thin",
            }}
        >
            <table className="table-fixed w-full min-w-[48rem] border-separate border-spacing-0">
                <colgroup>
                    {FIELDS.map((_, index) => (
                        <col
                            key={index}
                            style={{ width: `${100 / FIELDS.length}%` }}
                        />
                    ))}
                </colgroup>
                <thead>
                    <tr className="sticky top-0 z-[1]">
                        {FIELDS.map((field, index) => (
                            <th
                                key={index}
                                className="text-sm md:text-base font-semibold text-gray-600 tracking-wide px-4 py-3 bg-white/95 backdrop-blur-sm border-b border-gray-100"
                            >
                                {field[0]}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {dailyMember &&
                        guesses.map((guess) => (
                            <tr
                                key={guess.name}
                                className="group animate-fadeInUp"
                            >
                                {FIELDS.map((field, colIndex) => (
                                    <td
                                        key={colIndex}
                                        className="text-center px-2 py-2 border-b border-gray-50"
                                    >
                                        <span
                                            className={`animate-flipIn origin-top inline-block w-full rounded-lg px-3 py-2 text-sm md:text-base font-medium shadow-[0.2rem_0.2rem_0.4rem_0_rgb(225,226,228),-0.15rem_-0.15rem_0.3rem_0_rgb(255,255,255)] transition-transform duration-200 group-hover:-translate-y-0.5 ${handleGuessColor(
                                                guess[field[1]],
                                                dailyMember[
                                                    field[1] as keyof typeof dailyMember
                                                ],
                                            )}`}
                                            style={{
                                                animationDelay: `${colIndex * 120}ms`,
                                            }}
                                        >
                                            {formatGuess(
                                                guess[field[1]],
                                                dailyMember[
                                                    field[1] as keyof typeof dailyMember
                                                ],
                                                field[1],
                                            )}
                                        </span>
                                    </td>
                                ))}
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default GuessingTable;
