import { useState } from 'react';
import { db } from '../../services/firebase';
import { ref, set } from 'firebase/database';

interface JudgeManagerProps {
  judges: string[];
}

export default function JudgeManager({ judges }: JudgeManagerProps) {
  const [newJudgeName, setNewJudgeName] = useState('');

  const handleAddJudge = async () => {
    if (newJudgeName.trim() === '') {
      alert('審査員名を入力してください。');
      return;
    }
    const newJudges = [...judges, newJudgeName.trim()];
    await set(ref(db, 'config/judges'), newJudges);
    setNewJudgeName('');
  };

  const handleDeleteJudge = async (judgeToDelete: string) => {
    if (window.confirm(`審査員 "${judgeToDelete}" を削除しますか？`)) {
      const newJudges = judges.filter((j) => j !== judgeToDelete);
      await set(ref(db, 'config/judges'), newJudges);
    }
  };

  const getJudgeUrl = (judgeId: string) => {
    return `${window.location.origin}/judge/${judgeId}`;
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="mb-4">
        <input
          type="text"
          value={newJudgeName}
          onChange={(e) => setNewJudgeName(e.target.value)}
          placeholder="新しい審査員名"
          className="bg-gray-700 text-white p-2 rounded-l-lg focus:outline-none"
        />
        <button onClick={handleAddJudge} className="bg-blue-600 hover:bg-blue-700 p-2 rounded-r-lg font-bold">追加</button>
      </div>
      <ul>
        {judges.map((judge) => (
          <li key={judge} className="flex items-center justify-between p-2 border-b border-gray-700">
            <div>
              <span className="font-semibold">{judge}</span>
              <input type="text" readOnly value={getJudgeUrl(judge)} className="ml-4 bg-gray-600 text-gray-300 p-1 rounded w-96" />
            </div>
            <button onClick={() => handleDeleteJudge(judge)} className="bg-red-600 hover:bg-red-700 p-1 rounded text-xs">削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
