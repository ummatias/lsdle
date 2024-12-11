'use client';
import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import { FaGithub } from 'react-icons/fa';
import data from './data/data.json';
import { Member } from '@/types/member';
import { formatGuess, getDailyMember, removeAccents } from '@/utils/utils';

export default function Home() {

  const colors = [
    '#52BEBD',
    '#5474B7',
    '#7069AE',
    '#AD689E',
    '#DE5764',
    '#DD9356',
  ];

  const fields: [string, keyof Member][] = [
    ['Nome', 'name'],
    ['Sala', 'room'],
    ['Projeto', 'project'],
    ['Gênero', 'gender'],
    ['Graduação', 'graduation_level'],
    ['Atuação', 'area'],
    ['Entrou LSD', 'lsd_year'],
    ['Entrou na UFCG', 'ufcg_year']
  ]

  const [members, setMembers] = useState<Member[]>(data);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dailyMember, setDailyMember] = useState<Member | null>(null);
  const [guesses, setGuesses] = useState<Member[]>([]);
  const [guessed, setGuessed] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const getHoverColor = (index: number) => colors[index % colors.length];

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const normalizedValue = removeAccents(value);

    setSearchQuery(value);

    setFilteredMembers(
      members.filter((member) =>
        removeAccents(member.name).toLowerCase().includes(normalizedValue.toLowerCase())
      )
    );
    setIsDropdownOpen(value.length > 0 && filteredMembers.length > 0);
  };

  const handleOptionClick = (member: Member) => {
    setSearchQuery('');
    setFilteredMembers([]);
    setIsDropdownOpen(false);
    setGuesses([member, ...guesses]);
    setMembers(members.filter((m) => m.name !== member.name));

    if (member === dailyMember) {
      setGuessed(true);
      let points = localStorage.getItem('lsd_points');
      if (points) {
        points = (parseInt(points) + 1).toString();
      } else {
        points = "1";
      }

      localStorage.setItem('lsd_points', points.toString());
      localStorage.setItem('last_member', JSON.stringify(member));
      localStorage.setItem('last_guesses', JSON.stringify([...guesses, member]));
    }
  };

  function handleGuessColor(guess: Member, field: keyof Member): string {
    if (!dailyMember) return 'bg-[#de576581]';

    console.log(guess, dailyMember);
    const guessValue = guess[field];
    const dailyValue = dailyMember[field];
    const guessArray = Array.isArray(guessValue) ? guessValue : [guessValue];
    const dailyArray = Array.isArray(dailyValue) ? dailyValue : [dailyValue];

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


  useEffect(() => {
    setMembers(data);
    setDailyMember(getDailyMember(members));
    const lastMember = localStorage.getItem('last_member');
  
    if (lastMember && JSON.parse(lastMember) === JSON.stringify(dailyMember)) {
      setGuessed(true);
      setGuesses(JSON.parse(localStorage.getItem('last_guesses') || '[]'));
    } 

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
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dailyMember]);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <main className="flex flex-col justify-center bg-gray-100 flex-grow overflow-hidden">
        <div className="text-center">
          <img src="/lsd-logo.png" alt="logo" className="h-32 mx-auto mb-8" />

          {!guessed && (
            <div className="bg-white p-8 rounded-xl w-[400px] mx-auto shadow-[0.625rem_0.625rem_0.875rem_0_rgb(225,226,228),-0.5rem_-0.5rem_1.125rem_0_rgb(255,255,255)]">
              <h1 className="text-4xl font-semibold text-gray-800 mb-4">
                Bem-vindo ao LSDLE
              </h1>
              <p className="text-gray-500 mb-6">
                Adivinhe o membro do LSD de hoje!
              </p>
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  className="w-full p-4 text-lg text-gray-700 bg-gray-100 rounded-lg focus:border-[#52BEBD] focus:outline-none shadow-inner"
                  placeholder="Digite o nome do membro"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                {isDropdownOpen && filteredMembers.length > 0 && (
                  <div
                    ref={dropdownRef}
                    className="absolute left-0 right-0 mt-2 bg-white rounded-lg z-10 shadow-md"
                    style={{
                      maxHeight: filteredMembers.length > 5 ? '200px' : 'auto',
                      overflowY: filteredMembers.length > 5 ? 'auto' : 'visible',
                      scrollbarColor: '#4A4A4A #E5E7EB',
                      scrollbarWidth: 'thin',
                    }}
                  >
                    {filteredMembers.map((member, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 text-gray-800 cursor-pointer transition duration-200"
                        style={{
                          backgroundColor: 'transparent',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            getHoverColor(index);
                          e.currentTarget.style.color = '#FFFFFF';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = '#4A4A4A';
                        }}
                        onClick={() => handleOptionClick(member)}
                      >
                        {member.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {guessed && (
            <div className="bg-white p-8 rounded-xl shadow-md w-[400px] mx-auto">
              <h1 className="text-4xl font-semibold text-gray-800 mb-4">
                Parabéns!
              </h1>
              <p className="text-gray-500 mb-6">
                Você acertou o membro do LSD de hoje em{' '}
                <span className="font-semibold">{guesses.length}</span> tentativas!
              </p>
            </div>
          )}
        </div>

        {guesses.length > 0 && (
          <div
            className="mt-12 w-full h-[220px] px-4 py-2 overflow-x-auto"
            style={{
              maxHeight: guesses.length > 2 ? '220px' : 'auto',
              overflowY: guesses.length > 2 ? 'auto' : 'visible',
              scrollbarColor: '#4A4A4A #E5E7EB',
              scrollbarWidth: 'thin',
            }}
          >
            <table className="table-auto w-7xl border-collapse border border-gray-200 mx-auto">
              <thead>
                <tr className='sticky top-0 z-9 bg-gray-100'>
                  {fields.map((field, index) => (
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
                      {fields.map((field, colIndex) => (
                        <td
                          key={colIndex}
                          className={`text-lg text-gray-800 text-center border border-gray-200 px-4 py-2 ${handleGuessColor(
                            guess,
                            field[1]
                          )}
                          `}
                        >
                          {formatGuess(guess[field[1]], field[1], dailyMember)}
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <footer className="py-2 flex-shrink-0">
        <div className="text-center text-gray-400">
          <p className="mb-2 flex justify-center items-center gap-2">
            Desenvolvido com{' '}
            <span
              className="text-black-500 animate-pulse"
              style={{
                animationDuration: '1.5s',
                animationIterationCount: 'infinite',
              }}
            >
              🖤
            </span>{' '}
            pela equipe da Carvalheira!
          </p>
          <a
            href="https://github.com/ummatias/lsdle"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-600 transition"
          >
            <FaGithub className="text-2xl" />
            Acesse o repositório no GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
