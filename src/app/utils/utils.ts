import { Member } from "@/app/types/member";

function hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
}

function seededRandom(seed: number): () => number {
    return () => {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
    };
}

function shuffle<T>(array: T[], seed: number): T[] {
    const random = seededRandom(seed);
    const shuffled = [...array];

    // Fisher-Yates
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
}

function getDailyMember(members: Member[]): Member {
    const today = new Date().toISOString().split("T")[0];
    const seed = hashString(today);
    const shuffledMembers = shuffle(members, seed);
    return shuffledMembers[0];
}


const formatGuess = (
    guessField: string | number | number[] | string[],
    dailyMemberField: string | number | number[] | string[],
    fieldName: keyof Member,
): string => {
    if (
        !["lsd_year", "ufcg_year", "project", "area"].includes(
            fieldName as string,
        )
    ) {
        return guessField.toString();
    }

    const formatYearGuess = (year: number, dailyValue: number[]): string => {
        if (dailyValue.includes(year)) {
            return `${year}`;
        }
        if (year < Math.min(...dailyValue)) {
            return `${year} ⬆`;
        }
        if (year > Math.max(...dailyValue)) {
            return `${year} ⬇`;
        }
        return `${year} ⬆⬇`;
    };

    if (Array.isArray(guessField) && typeof guessField[0] === "number") {
        return guessField
            .map((year) =>
                formatYearGuess(year as number, dailyMemberField as number[]),
            )
            .join(", ");
    }

    if (Array.isArray(guessField) && typeof guessField[0] === "string") {
        return guessField.join(", ");
    }

    if (
        typeof guessField === "number" &&
        typeof dailyMemberField === "number"
    ) {
        return guessField > dailyMemberField
            ? `${guessField} ⬇`
            : guessField < dailyMemberField
            ? `${guessField} ⬆`
            : `${guessField}`;
    }

    throw new Error("Invalid guess or field for the provided Member type.");
};

function handleGuessColor(
    guessField: number | string | number[] | string[],
    dailyMemberField: number | string | number[] | string[],
): string {
    const guessArray = Array.isArray(guessField) ? guessField : [guessField];
    const dailyArray = Array.isArray(dailyMemberField)
        ? dailyMemberField
        : [dailyMemberField];

    if (guessArray.toString() === dailyArray.toString()) {
        return "bg-[#52bebc7d]";
    }

    if (
        guessArray.some((item) => dailyArray.includes(item)) ||
        dailyArray.some((item) => guessArray.includes(item))
    ) {
        return "bg-[#dd935678]";
    }
    return "bg-[#de576581]";
}

const removeAccents = (str: string): string => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export { hashString, getDailyMember, formatGuess, handleGuessColor, removeAccents };
