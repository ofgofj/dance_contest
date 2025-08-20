import React from 'react';
import { MirrorBallIcon, PencilIcon, CogIcon, DownloadIcon } from './icons/InterfaceIcons';

type HeaderProps = {
  setTeamModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleExportCSV: () => void;
};

export const Header: React.FC<HeaderProps> = ({ setTeamModalOpen, handleExportCSV }) => {
  return (
    <header className="sticky top-0 z-40 bg-black/50 backdrop-blur-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <MirrorBallIcon />
            <h1 
              className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 cursor-pointer"
            >
              ダンスコンテスト
            </h1>
          </div>
          <div className="flex items-center gap-2">
            
            <button
              onClick={() => setTeamModalOpen(true)}
              className="bg-gray-800/70 backdrop-blur-sm p-3 rounded-full text-white hover:bg-purple-500 transition-colors shadow-lg border border-gray-700"
              title="チーム管理"
            >
              <CogIcon />
            </button>
            <button
              onClick={handleExportCSV}
              className="bg-gray-800/70 backdrop-blur-sm p-3 rounded-full text-white hover:bg-cyan-500 transition-colors shadow-lg border border-gray-700"
              title="CSVエクスポート"
            >
              <DownloadIcon />
            </button>
          </div>
        </div>
      </div>
       <div className="h-[2px] bg-gradient-to-r from-purple-500 to-cyan-500 opacity-50"></div>
    </header>
  );
};