import { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import { ref, onValue } from "firebase/database";
import { Team } from "../../types";
import { Maximize, Minimize } from "lucide-react";

type Totals = Record<string, number>;

export default function Display() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [totals, setTotals] = useState<Totals>({});
  const [version, setVersion] = useState<string>("(未公開)");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const configRef = ref(db, 'config/teams');
    const teamsUnsubscribe = onValue(configRef, (snapshot) => {
      setTeams(snapshot.val() || []);
    });

    let totalsUnsubscribe: (() => void) | undefined;

    const vRef = ref(db, "published/currentVersion");
    const versionUnsubscribe = onValue(vRef, (snap) => {
      const ver = snap.val();
      setVersion(ver || "(未公開)");

      if (totalsUnsubscribe) {
        totalsUnsubscribe();
      }

      if (ver) {
        totalsUnsubscribe = onValue(ref(db, "published/totals"), (totSnap) => {
          setTotals(totSnap.val() || {});
        });
      } else {
        setTotals({});
      }
    });

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    // Mount animation
    const timer = setTimeout(() => setVisible(true), 100);

    return () => {
      clearTimeout(timer);
      teamsUnsubscribe();
      versionUnsubscribe();
      if (totalsUnsubscribe) {
        totalsUnsubscribe();
      }
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const sorted = Object.entries(totals)
    .map(([teamId, score]) => ({
      team: teams.find(t => t.id === Number(teamId)),
      score,
    }))
    .filter(item => item.team)
    .sort((a, b) => b.score - a.score);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className="relative bg-black text-gray-200 min-h-screen p-4 sm:p-8 flex flex-col items-center font-sans">
      <style>
        {`
          @keyframes gradient-animation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .gradient-border {
            border-image: linear-gradient(to right, #8e2de2, #4a00e0) 1;
          }
          .animated-gradient-text {
            background: linear-gradient(270deg, #ff00ff, #00ffff, #ff00ff);
            background-size: 200% 200%;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: gradient-animation 4s ease infinite;
          }
        `}
      </style>

      <button 
        onClick={toggleFullscreen}
        className="absolute top-4 right-4 p-2 rounded-full bg-gray-800/50 hover:bg-purple-500/50 transition-colors backdrop-blur-sm z-10"
        aria-label="Toggle Fullscreen"
      >
        {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
      </button>

      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl md:text-6xl font-bold animated-gradient-text tracking-wider">RANKING</h1>
            <div className="h-1 w-24 bg-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="space-y-4">
          {sorted.map(({ team, score }, idx) => (
            <div 
              key={team!.id} 
              className={`flex items-center p-4 bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-2xl border border-purple-500/30 transition-all duration-500 ease-out transform hover:scale-105 hover:border-purple-500/80 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="flex-shrink-0 w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mr-4 border-2 border-purple-500/50">
                <span className="text-3xl font-bold text-white">{idx + 1}</span>
              </div>
              <div className="flex-grow">
                <p className="text-2xl font-bold text-white tracking-wide">{team!.name}</p>
                <p className="text-md text-purple-300/80">{team!.genre}</p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold text-cyan-400 tracking-tighter">{score.toFixed(2)}</span>
                <p className="text-sm text-gray-400">SCORE</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="absolute bottom-4 right-4 text-xs text-gray-500">Version: {version}</p>
    </div>
  );
}
