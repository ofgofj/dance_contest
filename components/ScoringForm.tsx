import React, { useState, useEffect } from 'react';
import { Team, Scores, CriterionKey } from '../types';
import { SCORING_CRITERIA } from '../constants';

interface ScoringFormProps {
  team: Team;
  onScoreUpdate: (teamId: number, scores: Scores) => void;
}

export const ScoringForm: React.FC<ScoringFormProps> = ({ team, onScoreUpdate }) => {
  const [scores, setScores] = useState<Scores>(team.scores);

  useEffect(() => {
    setScores(team.scores);
  }, [team]);

  const handleSliderChange = (criterionId: CriterionKey, value: number) => {
    const newScores = { ...scores, [criterionId]: value };
    setScores(newScores);
    onScoreUpdate(team.id, newScores);
  };

  return (
    <div className="bg-gray-900/50 p-6 rounded-2xl border-gradient">
      <h2 className="text-2xl font-bold mb-1">採点: <span className="text-cyan-300">{team.name}</span></h2>
      <p className="text-gray-400 mb-6">ジャンル: {team.genre}</p>
      <div className="space-y-6">
        {SCORING_CRITERIA.map(criterion => (
          <div key={criterion.id}>
            <div className="flex justify-between items-baseline mb-2">
              <label className="font-semibold text-lg">{criterion.name}</label>
              <span className="font-orbitron text-xl text-purple-300 w-16 text-right">{scores[criterion.id]}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={scores[criterion.id]}
              onChange={(e) => handleSliderChange(criterion.id, parseInt(e.target.value, 10))}
              className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg accent-purple-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
};