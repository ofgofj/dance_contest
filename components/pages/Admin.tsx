import { useState, useEffect } from "react";
import { db } from "../../services/firebase";
import { ref, onValue, set } from "firebase/database";
import { Team, Criterion } from "../../types";
import JudgeManager from "./JudgeManager";
import RankingTable from "./RankingTable";

export default function Admin() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [criteria, setCriteria] = useState<Criterion[]>([]);
  const [scores, setScores] = useState<Record<string, any>>({});
  const [totals, setTotals] = useState<Record<string, number>>({});
  const [version, setVersion] = useState<string>("");
  const [judges, setJudges] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('ranking');

  useEffect(() => {
    const configRef = ref(db, 'config');
    const configUnsub = onValue(configRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setTeams(data.teams || []);
        setCriteria(data.criteria || []);
        setJudges(data.judges || []);
      }
    });

    const versionRef = ref(db, "published/currentVersion");
    const versionUnsub = onValue(versionRef, (snap) => {
      setVersion(snap.val() || "");
    });

    const scoresRef = ref(db, 'scores');
    const scoresUnsub = onValue(scoresRef, (snapshot) => {
      setScores(snapshot.val() || {});
    });

    return () => {
      configUnsub();
      versionUnsub();
      scoresUnsub();
    };
  }, []);

  useEffect(() => {
    if (teams.length === 0 || criteria.length === 0) return;

    const calculatedTotals: Record<string, number> = {};
    teams.forEach(team => {
      let totalScore = 0;
      let judgeCount = 0;
      judges.forEach(judgeId => {
        const judgeScores = scores[judgeId]?.[team.id];
        if (judgeScores) {
          judgeCount++;
          let currentJudgeTotal = 0;
          criteria.forEach(c => {
            currentJudgeTotal += (judgeScores[c.id] || 0);
          });
          totalScore += currentJudgeTotal;
        }
      });
      calculatedTotals[team.id] = judgeCount > 0 ? totalScore / judgeCount : 0;
    });
    setTotals(calculatedTotals);
  }, [scores, teams, criteria, judges]);

  const handlePublish = () => {
    const newVersion = new Date().toISOString();
    set(ref(db, "published/totals"), totals);
    set(ref(db, "published/currentVersion"), newVersion);
    alert("公開しました: " + newVersion);
  };

  return (
    <div className="container mx-auto p-4 md:p-8 h-full flex flex-col">
      <h1 className="text-3xl font-bold mb-4 neon-text-purple">管理者画面</h1>
      <p className="text-lg mb-6">現在のバージョン: <span className="font-semibold">{version || "(未公開)"}</span></p>

      <div className="mb-4 border-b border-gray-700">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('ranking')}
            className={`${activeTab === 'ranking' ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            チームランキング
          </button>
          <button
            onClick={() => setActiveTab('judges')}
            className={`${activeTab === 'judges' ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            審査員管理
          </button>
        </nav>
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeTab === 'ranking' && (
          <RankingTable 
            teams={teams}
            criteria={criteria}
            scores={scores}
            totals={totals}
            judges={judges}
          />
        )}
        {activeTab === 'judges' && <JudgeManager judges={judges} />}
      </div>

      <div className="pt-6">
        <button 
          onClick={handlePublish} 
          className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold transition-all duration-300 shadow-lg"
        >
          公開
        </button>
      </div>
    </div>
  );
}
