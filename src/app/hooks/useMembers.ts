import { useState, useEffect } from 'react';
import { Member } from '@/app/types/member';
import data from '../data/data.json';
import { getDailyMember } from '@/app/utils/utils';
import { getLocalStorage, setLocalStorage } from '@/app/utils/localStorage';

export const useMembers = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [dailyMember, setDailyMember] = useState<Member | null>(null);
  const [guesses, setGuesses] = useState<Member[]>([]);
  const [guessed, setGuessed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMembers(data);
    const daily = getDailyMember(data);
    setDailyMember(daily);

    const lastGuesses = getLocalStorage<Member[]>('last_guesses', []);
    const lastMember = getLocalStorage<Member>('last_member', {} as Member);

    if (lastMember && lastMember.name === daily.name) {
      setGuessed(true);
      setGuesses(lastGuesses || []);
    }
    setLoading(false);
  }, []);
  null
  const handleGuess = (member: Member) => {
    setGuesses((prev) => [member, ...prev]);
    setMembers((prev) => prev.filter((m) => m.name !== member.name));

    if (member.name === dailyMember?.name) {
      setGuessed(true);
      const points = getLocalStorage<number>('lsd_points', 0) + 1;

      setLocalStorage('lsd_points', points);
      setLocalStorage('last_member', member);
      setLocalStorage('last_guesses', guesses);
    }
  };

  return { members, dailyMember, guesses, guessed, handleGuess, loading };
};
