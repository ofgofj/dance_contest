import React from 'react';
import { Team } from '../types';
import { TeamCard } from './TeamCard';

interface RankingBoardProps {
  teams: Team[];
  onVote: (teamId: number) => void;
}

export const RankingBoard: React.FC<RankingBoardProps> = ({ teams, onVote }) => {
  const cardHeight = 110; // h-28 in Tailwind is 7rem which is 112px, let's use 110 for margin
  const cardGap = 16; // gap-4 is 1rem which is 16px

  return (
    <div>
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 font-orbitron">
        <span className="neon-text-cyan">ランキング</span>
      </h1>
      <div
        className="relative transition-all duration-700 ease-in-out"
        style={{ height: `${teams.length * (cardHeight + cardGap)}px` }}
      >
        {teams.map((team) => (
          <div
            key={team.id}
            className="absolute w-full transition-transform duration-700 ease-out"
            style={{
              transform: `translateY(${(team.rank - 1) * (cardHeight + cardGap)}px)`,
            }}
          >
            <TeamCard team={team} onVote={onVote} />
          </div>
        ))}
      </div>
    </div>
  );
};