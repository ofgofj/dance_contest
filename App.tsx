import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { db } from './services/firebase';
import { ref, set, onValue, get } from 'firebase/database';

import { Team, Scores } from './types';
import { INITIAL_TEAMS, SCORING_CRITERIA, initialScores } from './constants';

import { RankingBoard } from './components/RankingBoard';
import { ScoringForm } from './components/ScoringForm';
import { Header } from './components/Header';
import { TeamManagementModal } from './components/TeamManagementModal';
import Judge from './components/pages/Judge';
import Admin from './components/pages/Admin';
import Display from './components/pages/Display';
import { Sidebar } from './components/Sidebar';

type View = 'ranking' | 'scoring';

const AppLayout = () => (
  <div className="flex h-screen bg-black text-gray-200">
    <Sidebar />
    <div className="flex-1 flex flex-col overflow-hidden">
      <Outlet />
    </div>
  </div>
);

import Papa from 'papaparse';

const App: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [allScores, setAllScores] = useState<any>({});
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
  const [isTeamModalOpen, setTeamModalOpen] = useState(false);
  const [judges, setJudges] = useState<string[]>([]);

  // Firebaseからスコアを購読（初回のみ）
  useEffect(() => {
    const scoresRef = ref(db, 'scores');
    const unsubscribe = onValue(scoresRef, (snapshot) => {
      setAllScores(snapshot.val() || {});
    });
    return () => unsubscribe();
  }, []);

  // Firebaseからチーム情報と審査員情報を購読
  useEffect(() => {
    const configRef = ref(db, 'config');
    const unsubscribe = onValue(configRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setTeams(data.teams || []);
        setJudges(data.judges || []);
      }
    });
    return () => unsubscribe();
  }, []);

  // FirebaseのconfigにINITIAL_TEAMSを初期設定（初回のみ）
  useEffect(() => {
    const configRef = ref(db, 'config');
    get(configRef).then((snapshot) => {
      const data = snapshot.val();
      if (!data || !data.teams || data.teams.length === 0) {
        updateFirebaseConfig(INITIAL_TEAMS);
      }
    });
  }, []);

  // allScoresが更新されたら、チームのスコアとランクを再計算
  useEffect(() => {
    setTeams(currentTeams => {
      const updatedTeams = currentTeams.map(team => {
        let totalScore = 0;
        let judgeCount = 0;

        judges.forEach(judgeId => {
          const judgeScores = allScores[judgeId]?.[team.id];
          if (judgeScores) {
            judgeCount++;
            let currentJudgeTotal = 0;
            SCORING_CRITERIA.forEach(c => {
              currentJudgeTotal += (judgeScores[c.id] || 0);
            });
            totalScore += currentJudgeTotal;
          }
        });

        const averageScore = judgeCount > 0 ? totalScore / judgeCount : 0;
        return { ...team, totalScore: averageScore };
      });

      // ランク付け
      const teamsWithPreviousRanks = updatedTeams.map(t => ({ ...t, previousRank: t.rank }));
      teamsWithPreviousRanks.sort((a, b) => b.totalScore - a.totalScore);
      return teamsWithPreviousRanks.map((team, index) => ({
        ...team,
        rank: index + 1,
      }));
    });
  }, [allScores, judges]);

  useEffect(() => {
    if (teams.length > 0 && !teams.find(t => t.id === selectedTeamId)) {
      setSelectedTeamId(teams[0].id);
    } else if (teams.length === 0) {
      setSelectedTeamId(null);
    }
  }, [teams, selectedTeamId]);

  const handleScoreUpdate = (teamId: number, newScores: Scores) => {
    // ホーム画面の採点フォーム（審査員ID 0）からの採点をFirebaseに書き込む
    const judgeId = 0; // ホーム画面の採点者はID 0とする
    set(ref(db, `scores/${judgeId}/${teamId}`), newScores);
  };

  const handleVote = useCallback((teamId: number) => {
    setTeams(prev =>
      prev.map(t => (t.id === teamId ? { ...t, votes: (t.votes || 0) + 1 } : t))
    );
  }, []);

  const updateFirebaseConfig = (newTeams: Team[]) => {
    set(ref(db, 'config'), {
      teams: newTeams.map(({ id, name, genre }) => ({ id, name, genre })),
      criteria: SCORING_CRITERIA,
    });
  };

  const handleAddNewTeam = useCallback(({ name, genre }: { name: string; genre: string }) => {
    setTeams(currentTeams => {
      const newId = currentTeams.length > 0 ? Math.max(...currentTeams.map(t => t.id)) + 1 : 1;
      const newTeam: Team = {
        id: newId,
        name,
        genre,
        scores: initialScores,
        totalScore: 0,
        rank: 0,
        previousRank: 0,
        votes: 0,
      };
      const newTeams = [...currentTeams, newTeam];
      updateFirebaseConfig(newTeams);
      return newTeams;
    });
  }, []);

  const handleUpdateTeam = useCallback((teamId: number, updatedData: { name: string; genre: string }) => {
    setTeams(currentTeams => {
      const newTeams = currentTeams.map(team => (team.id === teamId ? { ...team, ...updatedData } : team));
      updateFirebaseConfig(newTeams);
      return newTeams;
    });
  }, [teams]);

  const handleDeleteTeam = useCallback((teamIdToDelete: number) => {
    if (window.confirm('このチームを本当に削除しますか？')) {
      setTeams(currentTeams => {
        const newTeams = currentTeams.filter(t => t.id !== teamIdToDelete);
        updateFirebaseConfig(newTeams);
        return newTeams;
      });
    }
  }, []);

  const handleExportCSV = () => {
    const dataToExport = teams.map(team => ({
      'ランキング': team.rank,
      'チーム名': team.name,
      'ジャンル': team.genre,
      '合計得点': team.totalScore.toFixed(2),
    }));

    const csv = Papa.unparse(dataToExport);
    const blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'dance_contest_ranking.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
    const handleImportCSV = useCallback((file: File) => { /* ... */ }, []);

  const selectedTeam = teams.find(t => t.id === selectedTeamId) || null;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route
            path="/"
            element={
              <div className="flex flex-col h-full">
                <Header setTeamModalOpen={setTeamModalOpen} handleExportCSV={handleExportCSV} />
                <main className="p-4 md:p-8 flex-1 overflow-y-auto">
                  <RankingBoard teams={teams} onVote={handleVote} />
                </main>
                <TeamManagementModal
                  isOpen={isTeamModalOpen}
                  onClose={() => setTeamModalOpen(false)}
                  teams={teams}
                  onAddNewTeam={handleAddNewTeam}
                  onUpdateTeam={handleUpdateTeam}
                  onDeleteTeam={handleDeleteTeam}
                  onImportCSV={handleImportCSV}
                />
              </div>
            }
          />
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route path="/judge/:judgeId" element={<Judge />} />
        <Route path="/display" element={<Display />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
