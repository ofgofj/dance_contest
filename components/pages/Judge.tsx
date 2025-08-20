import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../services/firebase";
import { ref, set, onValue, get } from "firebase/database";
import { Team, Criterion } from "../../types";
import { judgeList } from "../../constants";

export default function Judge() {
  const { judgeId } = useParams<{ judgeId: string }>();
  const [teams, setTeams] = useState<Team[]>([]);
  const [criteria, setCriteria] = useState<Criterion[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [tempScores, setTempScores] = useState<Record<string, number>>({});

  // config（チームと採点項目）を読み込む
  useEffect(() => {
    const configRef = ref(db, 'config');
    const unsubscribe = onValue(configRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setTeams(data.teams || []);
        setCriteria(data.criteria || []);
      }
    });
    return () => unsubscribe();
  }, []);

  // チームを選択したときに、そのチームの既存スコアを読み込む
  useEffect(() => {
    if (selectedTeam && judgeId) {
      const scoreRef = ref(db, `scores/${judgeId}/${selectedTeam.id}`);
      get(scoreRef).then((snapshot) => {
        if (snapshot.exists()) {
          const loadedScores = snapshot.val();
          setScores(loadedScores);
          setTempScores(loadedScores);
        } else {
          // データがない場合はスコアをリセット
          setScores({});
          setTempScores({});
        }
      });
    } else {
      // チーム選択画面に戻ったらスコアをクリア
      setScores({});
      setTempScores({});
    }
  }, [selectedTeam, judgeId]);

  const handleScoreChange = (criterionId: string, value: number) => {
    setTempScores({ ...tempScores, [criterionId]: value });
  };

  const handleConfirmScore = () => {
    if (selectedTeam && judgeId) {
      set(ref(db, `scores/${judgeId}/${selectedTeam.id}`), tempScores);
      setScores(tempScores); // Firebaseに保存後、確定スコアを更新
      alert("採点結果を保存しました！");
      setSelectedTeam(null); // 採点確定後、チーム選択画面に戻る
    }
  };

  // チーム選択画面
  if (!selectedTeam) {
    return (
      <div className="bg-black text-gray-200 min-h-screen p-4 md:p-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6 neon-text-purple">チーム選択</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {teams.map((team) => (
              <button
                key={team.id}
                onClick={() => setSelectedTeam(team)}
                className="p-6 bg-gray-800 rounded-lg shadow-lg hover:bg-purple-600 transition-all duration-300 h-32 flex flex-col justify-center items-center"
              >
                <div className="font-bold text-xl text-center">{team.name}</div>
                <div className="text-sm text-gray-400 mt-1">{team.genre}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 採点画面
  return (
    <div className="bg-black text-gray-200 min-h-screen p-4 md:p-8">
      <div className="container mx-auto">
        <button 
          onClick={() => {
            setSelectedTeam(null);
          }} 
          className="mb-6 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-300"
        >
          ← チーム選択に戻る
        </button>
        <h1 className="text-3xl font-bold mb-2 neon-text-purple">{selectedTeam.name}</h1>
        <p className="text-lg text-gray-400 mb-6">{selectedTeam.genre}</p>
        
        <div className="space-y-6">
          {criteria.map((criterion) => (
            <div key={criterion.id} className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <label className="text-xl font-semibold mb-3 block">
                {criterion.name}: <span className="text-purple-400 font-bold">{tempScores[criterion.id] ?? 0}</span>
              </label>
              <input
                type="range"
                min={0}
                max={100}
                value={tempScores[criterion.id] ?? 0}
                onChange={(e) => handleScoreChange(criterion.id, Number(e.target.value))}
                className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg"
              />
            </div>
          ))}
        </div>
        <button 
          onClick={handleConfirmScore} 
          className="mt-8 w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold transition-all duration-300 shadow-lg"
        >
          採点確定
        </button>
      </div>
    </div>
  );
}
