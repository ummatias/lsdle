import { createContext, useContext, ReactNode } from "react";
import { useMembers } from "@/app/hooks/useMembers";
import { Member } from "@/app/types/member";

interface MembersContextType {
    members: Member[];
    dailyMember: Member | null;
    guesses: Member[];
    guessed: boolean;
    loading: boolean;
    handleGuess: (member: Member) => void;
}

const MembersContext = createContext<MembersContextType | undefined>(undefined);

export const MembersProvider = ({ children }: { children: ReactNode }) => {
    const membersState = useMembers();
    return (
        <MembersContext.Provider value={membersState}>
            {children}
        </MembersContext.Provider>
    );
};

export const useMembersContext = () => {
    const context = useContext(MembersContext);
    if (context === undefined) {
        throw new Error(
            "useMembersContext must be used within a MembersProvider",
        );
    }
    return context;
};
