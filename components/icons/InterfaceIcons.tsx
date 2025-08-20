import React from 'react';

type IconProps = {
  className?: string;
};

export const DanceIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-8 w-8 ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="url(#dance-gradient)"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <defs>
      <linearGradient id="dance-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#06b6d4" />
        <stop offset="1" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
    {/* シンプルな踊っている人のシルエット */}
    <circle cx="12" cy="6" r="2" stroke="url(#dance-gradient)" strokeWidth="1.5" fill="none"/>
    <path d="M8 12c0-2 1.5-3.5 4-3.5s4 1.5 4 3.5" stroke="url(#dance-gradient)" strokeWidth="1.5"/>
    <path d="M6 18l3-3 3 3" stroke="url(#dance-gradient)" strokeWidth="1.5"/>
    <path d="M18 18l-3-3-3 3" stroke="url(#dance-gradient)" strokeWidth="1.5"/>
  </svg>
);

export const MirrorBallIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-8 w-8 ${className}`}
    viewBox="0 0 24 24"
  >
    <defs>
      <radialGradient id="highlight" cx="0.3" cy="0.3" r="0.4">
        <stop offset="0%" stopColor="white" stopOpacity="0.8" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </radialGradient>
       <linearGradient id="disco-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a855f7" />
        <stop offset="50%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
    </defs>
    
    {/* Base circle with a metallic look */}
    <circle cx="12" cy="12" r="10" fill="#9ca3af" />
    <circle cx="12" cy="12" r="10" fill="url(#disco-gradient)" opacity="0.4" />

    {/* Grid pattern */}
    <g stroke="#f9fafb" strokeWidth="0.5" strokeOpacity="0.5">
      {/* Vertical-ish lines */}
      <path d="M4.05 14A8 8 0 0 1 12 4a8 8 0 0 1 7.95 10" fill="none" />
      <path d="M5.9 18.1A8 8 0 0 1 12 4a8 8 0 0 1 6.1 14.1" fill="none" />
      <path d="M8.5 20.5A8 8 0 0 1 12 4a8 8 0 0 1 3.5 16.5" fill="none" />
      
      {/* Horizontal-ish lines */}
      <path d="M2.5 9A10 10 0 0 1 21.5 9" fill="none" />
      <path d="M2 12A10 10 0 0 1 22 12" fill="none" />
      <path d="M2.5 15A10 10 0 0 1 21.5 15" fill="none" />
      <path d="M4 18A10 10 0 0 1 20 18" fill="none" />
    </g>

    {/* Highlight */}
    <circle cx="12" cy="12" r="10" fill="url(#highlight)" />

    {/* Top attachment */}
    <rect x="11" y="1" width="2" height="2" rx="0.5" fill="#4b5563" />
    <path d="M12 3v-2" stroke="#4b5563" strokeWidth="1" />
  </svg>
);

export const TrophyIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-8 w-8 ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="url(#trophy-gradient)"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <defs>
      <linearGradient id="trophy-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#06b6d4" />
        <stop offset="1" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="10" stroke="url(#trophy-gradient)" strokeWidth="1.5" fill="none"/>
    <path d="M8 17h8M12 17v-6M9 11l3-3 3 3" />
  </svg>
);

export const SparklesIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-6 w-6 ${className}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 3v4M3 5h4M16 17v4m-2-2h4M19 12a7 7 0 11-14 0 7 7 0 0114 0z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5V3m0 18v-2" />
  </svg>
);

export const HeartIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
);

export const SwitchHorizontalIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
);

export const ChartBarIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);

export const UserGroupIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.28-1.25-1.43-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.28-1.25 1.43-1.857m0 0A5.985 5.985 0 0112 13a5.985 5.985 0 014.57 2.143m-9.14 0a5.985 5.985 0 014.57-2.143m0 0a5 5 0 10-9.14 0 5 5 0 009.14 0z" />
    </svg>
);

export const DownloadIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

export const FileArrowUpIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export const PencilIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
  </svg>
);

export const TrashIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

export const CogIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);