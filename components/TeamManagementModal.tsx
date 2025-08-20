
import React, { useState, useEffect, useRef } from 'react';
import { Team } from '../types';
import { PencilIcon, TrashIcon, CheckIcon, FileArrowUpIcon } from './icons/InterfaceIcons';

interface TeamManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  teams: Team[];
  onAddNewTeam: (data: { name: string, genre: string }) => void;
  onUpdateTeam: (id: number, data: { name: string, genre: string }) => void;
  onDeleteTeam: (id: number) => void;
  onImportCSV: (file: File) => void;
}

export const TeamManagementModal: React.FC<TeamManagementModalProps> = ({
  isOpen,
  onClose,
  teams,
  onAddNewTeam,
  onUpdateTeam,
  onDeleteTeam,
  onImportCSV
}) => {
  const [editingTeamId, setEditingTeamId] = useState<number | null>(null);
  const [editedData, setEditedData] = useState({ name: '', genre: '' });

  const [isAdding, setIsAdding] = useState(false);
  const [newData, setNewData] = useState({ name: '', genre: '' });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setEditingTeamId(null);
      setIsAdding(false);
    }
  }, [isOpen]);

  const handleEditClick = (team: Team) => {
    setEditingTeamId(team.id);
    setEditedData({ name: team.name, genre: team.genre });
    setIsAdding(false); 
  };

  const handleCancelClick = () => {
    setEditingTeamId(null);
  };

  const handleSaveClick = () => {
    if (editingTeamId && editedData.name.trim() && editedData.genre.trim()) {
      onUpdateTeam(editingTeamId, editedData);
      setEditingTeamId(null);
    } else {
        alert('チーム名とジャンルは必須です。');
    }
  };

  const handleAddClick = () => {
    setIsAdding(true);
    setNewData({ name: '', genre: '' });
    setEditingTeamId(null);
  };

  const handleSaveNewClick = () => {
    if (newData.name.trim() && newData.genre.trim()) {
      onAddNewTeam(newData);
      setIsAdding(false);
    } else {
      alert('チーム名とジャンルを入力してください。');
    }
  };
  
  const handleCancelNewClick = () => {
      setIsAdding(false);
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImportCSV(file);
      if(fileInputRef.current) {
          fileInputRef.current.value = '';
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-gray-900 w-full max-w-2xl rounded-2xl shadow-lg border-gradient p-6 flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold neon-text-purple">チーム管理</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <span className="text-2xl font-bold">×</span>
          </button>
        </div>

        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 mb-6 flex-grow">
          {teams.map(team => (
            <div key={team.id} className="bg-gray-800 p-3 rounded-lg flex items-center gap-4">
              {editingTeamId === team.id ? (
                <>
                  <input
                    type="text"
                    value={editedData.name}
                    onChange={e => setEditedData({ ...editedData, name: e.target.value })}
                    className="bg-gray-700 text-white rounded px-2 py-1 w-1/2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="チーム名"
                  />
                  <input
                    type="text"
                    value={editedData.genre}
                    onChange={e => setEditedData({ ...editedData, genre: e.target.value })}
                    className="bg-gray-700 text-white rounded px-2 py-1 flex-grow focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="ジャンル"
                  />
                  <button onClick={handleSaveClick} className="text-green-400 hover:text-green-300"><CheckIcon /></button>
                  <button onClick={handleCancelClick} className="text-gray-400 hover:text-white"><span className="text-xl font-bold">×</span></button>
                </>
              ) : (
                <>
                  <div className="flex-grow">
                    <p className="font-bold">{team.name}</p>
                    <p className="text-sm text-gray-400">{team.genre}</p>
                  </div>
                  <button onClick={() => handleEditClick(team)} className="text-cyan-400 hover:text-cyan-300"><PencilIcon /></button>
                  <button onClick={() => onDeleteTeam(team.id)} className="text-red-500 hover:text-red-400"><TrashIcon /></button>
                </>
              )}
            </div>
          ))}
          {isAdding && (
             <div className="bg-gray-800 p-3 rounded-lg flex items-center gap-4">
                <input
                    type="text"
                    value={newData.name}
                    onChange={e => setNewData({ ...newData, name: e.target.value })}
                    className="bg-gray-700 text-white rounded px-2 py-1 w-1/2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="新しいチーム名"
                />
                <input
                    type="text"
                    value={newData.genre}
                    onChange={e => setNewData({ ...newData, genre: e.target.value })}
                    className="bg-gray-700 text-white rounded px-2 py-1 flex-grow focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="ジャンル"
                />
                <button onClick={handleSaveNewClick} className="text-green-400 hover:text-green-300"><CheckIcon /></button>
                <button onClick={handleCancelNewClick} className="text-gray-400 hover:text-white"><span className="text-xl font-bold">×</span></button>
             </div>
          )}
        </div>

        <div>
            <div className="flex gap-4">
                 <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept=".csv" className="hidden" />
                 <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 font-bold text-white rounded-lg bg-cyan-600 hover:bg-cyan-500 transition-colors"
                >
                    <FileArrowUpIcon />
                    CSVインポート
                </button>
                {!isAdding && (
                    <button
                        onClick={handleAddClick}
                        className="flex-1 px-6 py-3 font-bold text-white rounded-lg btn-gradient hover:opacity-90 transition-opacity"
                    >
                        新しいチームを追加
                    </button>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};
