import { Member } from "@/app/types/member";

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
  guessField: string | number | number[] | string[], 
  dailyMemberField: string | number | number[] | string[], 
  fieldName: keyof Member
): string => {

  if (!['lsd_year', 'ufcg_year', 'project', 'area'].includes(fieldName as string)) {
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

  if (Array.isArray(guessField) && typeof guessField[0] === 'number') {
    return guessField.map((year) => formatYearGuess(year as number, dailyMemberField as number[])).join(', ');
  }

  if (Array.isArray(guessField) && typeof guessField[0] === 'string') {
    return guessField.join(', ');
  }

  // If guess is a number, compare with daily value
  if (typeof guessField === 'number' && typeof dailyMemberField === 'number') {
    return guessField > dailyMemberField
      ? `${guessField} ⬇`
      : guessField < dailyMemberField
        ? `${guessField} ⬆`
        : `${guessField}`;
  }

  // If no valid case matches
  throw new Error('Invalid guess or field for the provided Member type.');
};

function handleGuessColor(
  guessField: number | string | number[] | string[],
  dailyMemberField: number | string | number[] | string[] 
): string {
  const guessArray = Array.isArray(guessField) ? guessField : [guessField];
  const dailyArray = Array.isArray(dailyMemberField) ? dailyMemberField : [dailyMemberField];

  console.log(guessArray, dailyArray);
  console.log(guessArray.toString(), dailyArray.toString());
  if (guessArray.toString() === dailyArray.toString()) {
      return 'bg-[#52bebc7d]';
  }

  if (
      guessArray.some(item => dailyArray.includes(item)) ||
      dailyArray.some(item => guessArray.includes(item))
  ) {
      return 'bg-[#dd935678]';
  }
  return 'bg-[#de576581]';
}



export { getDailyMember, formatGuess, handleGuessColor };