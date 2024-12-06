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

const formatGuessYear = (guess: string | number | number[], fieldName: keyof Member, dailyMember: Member): string => {
  if (![ 'lsd_year', 'ufcg_year', 'born_year' ].includes(fieldName)) return guess.toString();
  
  const dailyValue = dailyMember[fieldName];

  if (Array.isArray(guess) && Array.isArray(dailyValue)) {
    // Handle case where both guess and dailyValue are arrays
    return guess
      .map((year) => {
        if (dailyValue.includes(year)) {
          return `${year}`; // Exact match, no arrow
        } else if (year < Math.min(...dailyValue)) {
          return `${year} ⬆`; // Guess is smaller than the smallest dailyValue year
        } else if (year > Math.max(...dailyValue)) {
          return `${year} ⬇`; // Guess is larger than the largest dailyValue year
        } else {
          return `${year} ⬆⬇`; // Guess is between but not an exact match
        }
      })
      .join(', ');
  } else if (typeof guess === 'number' && typeof dailyValue === 'number') {
    // Handle case where both guess and dailyValue are numbers
    if (guess > dailyValue) {
      return `${guess} ⬇`;
    } else if (guess < dailyValue) {
      return `${guess} ⬆`;
    } else {
      return `${guess}`;
    }
  }

  throw new Error('Invalid guess or field for the provided Member type.');
};

export { getDailyMember, formatGuessYear };