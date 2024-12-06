import { Member } from "@/types/member";

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

function getDailyMember(members: Member[]): Member {
  const today = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format
  const seed = hashString(today); // Hash the date to generate a seed
  const index = Math.abs(seed) % members.length; // Ensure the index is within bounds
  return members[index];
}

export { getDailyMember };