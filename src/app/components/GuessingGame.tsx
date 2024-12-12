import { useState, useRef, useEffect } from "react";
import Dropdown from "./Dropdown";
import InputField from "./InputField";
import GuessingTable from "./GuessTable";
import { useMembersContext } from "@/app/contexts/MembersContext";
import { Member } from "@/app/types/member";
import { COLORS } from "@/app/utils/constants";
import Box from "./Box";
import { removeAccents } from "@/app/utils/utils";

const GuessingGame = () => {
    const { members, guesses, guessed, dailyMember, handleGuess, loading } =
        useMembersContext();
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const inputRef = useRef<HTMLInputElement | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const normalizedValue = removeAccents(value);

        setSearchQuery(value);
        const newFilteredMembers = members.filter((member) =>
            removeAccents(member.name)
                .toLowerCase()
                .includes(normalizedValue.toLowerCase()),
        );
        setFilteredMembers(newFilteredMembers);
        setIsDropdownOpen(newFilteredMembers.length > 0);
    };

    const handleOptionClick = (member: Member) => {
        handleGuess(member);
        setSearchQuery("");
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const getHoverColor = (index: number) => COLORS[index % COLORS.length];

    return (
        <div>
            {!guessed && (
                <Box
                    title="Bem-vindo ao LSDLE"
                    descripton="Adivinhe o membro do LSD de hoje!"
                >
                    <InputField
                        onChange={handleSearchChange}
                        value={searchQuery}
                        inputRef={inputRef}
                        placeholder="Digite o nome do membro"
                    />
                    {isDropdownOpen && (
                        <div ref={dropdownRef}>
                            <Dropdown
                                items={filteredMembers}
                                onSelect={handleOptionClick}
                                hoverColor={getHoverColor}
                            />
                        </div>
                    )}
                </Box>
            )}

            {guessed && (
                <Box
                    title="Parabéns!"
                    descripton={`Você acertou o membro do LSD de hoje em ${guesses.length} tentativas!`}
                />
            )}

            {guesses.length > 0 && (
                <GuessingTable guesses={guesses} dailyMember={dailyMember} />
            )}
        </div>
    );
};

export default GuessingGame;
