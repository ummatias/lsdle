import { Member } from "@/types/member";

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

function getDailyMember(members: Member[]): Member {
  const today = new Date().toISOString().split('T')[0];
  const seed = hashString(today);
  const index = Math.abs(seed) % members.length; 
  return members[index];
}

const formatGuess = (
  guess: string | number | number[] | string[], 
  fieldName: keyof Member, 
  dailyMember: Member
): string => {
  const dailyValue = dailyMember[fieldName];

  // Handle non-relevant fields early
  if (!['lsd_year', 'ufcg_year', 'project', 'area'].includes(fieldName)) {
    return guess.toString();
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

  if (Array.isArray(guess) && typeof guess[0] === 'number') {
    return guess.map((year) => formatYearGuess(year as number, dailyValue as number[])).join(', ');
  }

  if (Array.isArray(guess) && typeof guess[0] === 'string') {
    return guess.join(', ');
  }

  // If guess is a number, compare with daily value
  if (typeof guess === 'number' && typeof dailyValue === 'number') {
    return guess > dailyValue
      ? `${guess} ⬇`
      : guess < dailyValue
        ? `${guess} ⬆`
        : `${guess}`;
  }

  // If no valid case matches
  throw new Error('Invalid guess or field for the provided Member type.');
};



export { getDailyMember, formatGuess };