import React, { useState, useEffect } from 'react';
import { Player } from './types';
import { generateDebateQuestion } from './services/geminiService';
import { Button } from './components/Button';
import { Card } from './components/Card';
import { ArrowLeft, Sparkles, Moon, Sun, Heart, MessageCircle } from 'lucide-react';

const App: React.FC = () => {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [targetPlayer, setTargetPlayer] = useState<Player>(Player.MATHOU);
  const [loading, setLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (gameStarted && history.length === 0) {
      handleNextQuestion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStarted]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleStart = () => {
    setGameStarted(true);
    setHistory([]);
  };

  const handleBack = () => {
    setGameStarted(false);
    setCurrentQuestion("");
    setHistory([]);
  };

  const handleNextQuestion = async () => {
    setLoading(true);
    const nextPlayer = Math.random() > 0.5 ? Player.NONO : Player.MATHOU;
    setTargetPlayer(nextPlayer);
    const question = await generateDebateQuestion(nextPlayer);
    setCurrentQuestion(question);
    setHistory(prev => [...prev, question]);
    setLoading(false);
  };

  // Welcome Screen Component
  const WelcomeScreen = () => (
    <div className="flex flex-col items-center justify-between h-full py-12 px-6 animate-fade-in">
      <div className="flex-1 flex flex-col items-center justify-center space-y-8 w-full max-w-sm">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-400/20 blur-3xl rounded-full" />
          <div className="relative bg-white dark:bg-[#1C1C1E] p-6 rounded-[2rem] shadow-xl shadow-blue-500/10 dark:shadow-none animate-float">
            <Heart className="w-16 h-16 text-[#FF2D55] fill-[#FF2D55]" />
          </div>
        </div>
        
        <div className="text-center space-y-3">
          <h1 className="text-[40px] leading-tight font-bold tracking-tight text-gray-900 dark:text-white">
            Nono & Mathou
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed font-medium">
            Prenez le temps de discuter de ce qui compte vraiment.
          </p>
        </div>
      </div>

      <div className="w-full max-w-xs space-y-4">
        <Button onClick={handleStart} fullWidth variant="primary">
          Commencer
        </Button>
        <p className="text-center text-xs text-gray-400 dark:text-gray-600 font-medium uppercase tracking-widest">
          Propulsé par Gemini AI
        </p>
      </div>
    </div>
  );

  // Game Screen Component
  const GameScreen = () => (
    <div className="flex flex-col h-full py-6 px-4 md:px-6 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button variant="icon" onClick={handleBack} aria-label="Retour">
          <ArrowLeft size={20} className="stroke-[2.5]" />
        </Button>
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
          Question {history.length}
        </span>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center pb-12">
        <Card className="w-full min-h-[400px] flex flex-col justify-between overflow-hidden relative group">
          
          {/* Decorative gradients */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/10 dark:bg-purple-600/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center space-y-6 animate-pulse">
              <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-full">
                <Sparkles className="w-8 h-8 text-blue-500 dark:text-blue-400 animate-spin-slow" />
              </div>
              <p className="text-gray-400 dark:text-gray-500 font-medium">Réflexion en cours...</p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center text-center z-10 animate-scale-in">
              <div className="mt-6 mb-8">
                <span className={`
                  inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase shadow-sm
                  ${targetPlayer === Player.NONO 
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-200' 
                    : 'bg-pink-100 text-pink-700 dark:bg-pink-500/20 dark:text-pink-200'}
                `}>
                  {targetPlayer === Player.NONO ? 'Pour Nono' : 'Pour Mathou'}
                </span>
              </div>
              
              <div className="flex-1 flex items-center justify-center">
                <h2 className="text-[26px] md:text-3xl leading-snug font-semibold text-gray-900 dark:text-white tracking-tight">
                  {currentQuestion}
                </h2>
              </div>
              
              <div className="mt-8 text-gray-400 dark:text-gray-600">
                <MessageCircle size={24} strokeWidth={1.5} />
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Action Area */}
      <div className="w-full">
        <Button 
          onClick={handleNextQuestion} 
          disabled={loading} 
          fullWidth 
          variant="primary"
          className="shadow-xl shadow-blue-500/20 dark:shadow-blue-900/20"
        >
          {loading ? '...' : 'Question Suivante'}
        </Button>
      </div>
    </div>
  );

  return (
    <div className={`${darkMode ? 'dark' : ''} h-full`}>
      <div className="fixed inset-0 bg-[#F2F2F7] dark:bg-black transition-colors duration-500">
        {/* Background Ambient Mesh */}
        <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-blue-300/20 dark:bg-blue-600/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-purple-300/20 dark:bg-purple-600/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen" />
      </div>

      <div className="relative z-10 h-screen w-full flex flex-col">
        {/* Top Right Controls */}
        <div className="absolute top-6 right-6 z-50">
          <Button variant="icon" onClick={toggleDarkMode}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </div>

        {/* Main View */}
        {!gameStarted ? WelcomeScreen() : GameScreen()}
      </div>

      {/* Styles globaux pour animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .animate-spin-slow { animation: spinSlow 4s linear infinite; }
      `}</style>
    </div>
  );
};

export default App;