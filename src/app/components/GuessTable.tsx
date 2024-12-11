import { Member } from "../types/member";
import { FIELDS } from "../utils/constants"
import { formatGuess, handleGuessColor } from "@/app/utils/utils";
import { FC } from "react";

interface GuessingTableProps {
    dailyMember: Member | null;
    guesses: Member[];
}

const GuessingTable: FC<GuessingTableProps> = ({ dailyMember, guesses }) => {

    
    return (
        <table className="table-auto w-7xl border-collapse border border-gray-200 mx-auto mt-8">
            <thead>
            <tr className='sticky top-0 z-9 bg-gray-100'>
                {FIELDS.map((field, index) => (
                <th
                    key={index}
                    className="text-lg font-semibold text-gray-800 border border-gray-200 px-4 py-2"
                >
                    {field[0]}
                </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {dailyMember &&
                guesses.map((guess, rowIndex) => (
                <tr key={rowIndex} className="border border-gray-200">
                    {FIELDS.map((field, colIndex) => (
                    <td
                        key={colIndex}
                        className={`text-lg text-gray-800 text-center border border-gray-200 px-4 py-2 ${handleGuessColor(
                        guess[field[1]],
                        dailyMember[field[1] as keyof typeof dailyMember]
                        )}
                        `}
                    >
                        {formatGuess(guess[field[1]], dailyMember[field[1] as keyof typeof dailyMember], field[1])}
                    </td>
                    ))}
                </tr>
                ))}
            </tbody>
        </table>
    )
}

export default GuessingTable;