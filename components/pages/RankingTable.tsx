import { Team, Criterion } from '../../types';

interface RankingTableProps {
  teams: Team[];
  criteria: Criterion[];
  scores: Record<string, any>;
  totals: Record<string, number>;
  judges: string[];
}

export default function RankingTable({ teams, criteria, scores, totals, judges }: RankingTableProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="py-3 px-4 bg-gray-700 text-lg font-bold rounded-tl-lg whitespace-nowrap">#</th>
              <th className="py-3 px-4 bg-gray-700 text-lg font-bold whitespace-nowrap min-w-[200px]">チーム</th>
              {judges.map((judgeId) => (
                <th key={judgeId} className="py-3 px-4 bg-gray-700 text-lg font-bold text-center whitespace-nowrap min-w-[120px]">{judgeId}</th>
              ))}
              <th className="py-3 px-4 bg-gray-700 text-lg font-bold rounded-tr-lg text-right whitespace-nowrap min-w-[120px]">平均点</th>
            </tr>
          </thead>
          <tbody>
            {teams.slice().sort((a, b) => (totals[b.id] || 0) - (totals[a.id] || 0)).map((team, index) => (
              <tr key={team.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                <td className="py-3 px-4 font-semibold whitespace-nowrap">{index + 1}</td>
                <td className="py-3 px-4 font-semibold whitespace-nowrap">{team.name}</td>
                {judges.map((judgeId) => {
                  const judgeScores = scores[judgeId]?.[team.id];
                  let judgeTotal = 0;
                  if (judgeScores && criteria.length > 0) {
                    criteria.forEach((c) => {
                      judgeTotal += (judgeScores[c.id] || 0);
                    });
                  }
                  return <td key={judgeId} className="py-3 px-4 text-center whitespace-nowrap">{judgeTotal > 0 ? judgeTotal.toFixed(2) : '-'}</td>;
                })}
                <td className="py-3 px-4 text-right font-bold text-purple-400">{totals[team.id]?.toFixed(2) || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
