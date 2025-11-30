import React, { useState, useEffect } from 'react';
import { Player } from './types';
import { generateDebateQuestion } from './services/geminiService';
import { Button } from './components/Button';
import { Card } from './components/Card';
import { ArrowLeft, Sparkles, RefreshCcw, Moon, Sun, MessageCircleHeart } from 'lucide-react';

const App: React.FC = () => {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [targetPlayer, setTargetPlayer] = useState<Player>(Player.MATHOU);
  const [loading, setLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Initialize dark mode
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  // Effect to generate first question when game starts
  useEffect(() => {
    if (gameStarted && history.length === 0) {
      handleNextQuestion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStarted]);

  const handleStart = () => {
    setGameStarted(true);
    setHistory([]);
  };

  const handleBack = () => {
    setGameStarted(false);
    setCurrentQuestion("");
    setHistory([]);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleNextQuestion = async () => {
    setLoading(true);
    
    // Switch player turn
    const nextPlayer = Math.random() > 0.5 ? Player.NONO : Player.MATHOU;
    setTargetPlayer(nextPlayer);

    const question = await generateDebateQuestion(nextPlayer);
    
    setCurrentQuestion(question);
    setHistory(prev => [...prev, question]);
    setLoading(false);
  };

  const renderWelcome = () => (
    <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-12 animate-fade-in-up">
      <div className="text-center space-y-4">
        <div className="inline-block p-4 rounded-3xl bg-white dark:bg-gray-800 shadow-lg mb-4 transition-colors duration-500 ring-1 ring-black/5 dark:ring-white/10">
            <MessageCircleHeart className="w-12 h-12 text-indigo-500 dark:text-indigo-400" />
        </div>
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white tracking-tight transition-colors duration-500">
          Nono & Mathou
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xs mx-auto leading-relaxed transition-colors duration-500">
          Un espace pour échanger, débattre et refaire le monde à deux.
        </p>
      </div>

      <div className="w-full max-w-xs">
        <Button 
          onClick={handleStart} 
          fullWidth 
          className="bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 shadow-xl shadow-indigo-200 dark:shadow-none border-transparent py-5 text-xl"
        >
          Lancer la discussion
        </Button>
      </div>
    </div>
  );

  const renderGame = () => (
    <div className="flex flex-col h-full justify-between py-6 max-w-md mx-auto w-full">
      {/* Header */}
      <div className="flex justify-between items-center px-2">
        <button 
          onClick={handleBack}
          className="p-3 rounded-full bg-white/50 dark:bg-black/30 hover:bg-white dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-all backdrop-blur-md"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="text-xs font-bold uppercase tracking-widest text-indigo-500/80 dark:text-indigo-300/80 transition-colors">
          Débat Philosophique
        </div>
        <div className="w-10" /> {/* Spacer for balance */}
      </div>

      {/* Main Card */}
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full min-h-[420px] flex flex-col items-center justify-center text-center relative overflow-hidden ring-1 ring-white/20">
            {/* Ambient Background Gradient inside card */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 dark:from-indigo-600 dark:via-purple-600 dark:to-pink-600 transition-all duration-700" />

            {loading ? (
                <div className="flex flex-col items-center space-y-6 animate-pulse">
                    <Sparkles className="text-indigo-300 dark:text-indigo-600 w-12 h-12 animate-spin-slow" />
                    <p className="text-gray-400 dark:text-gray-500 font-medium tracking-wide">Recherche d'un sujet profond...</p>
                </div>
            ) : (
                <div className="space-y-8 animate-fade-in w-full">
                    <div className="inline-flex items-center px-5 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-200 text-sm font-bold tracking-wide transition-colors uppercase">
                        {targetPlayer} commence
                    </div>
                    <h2 className="text-2xl md:text-3xl font-serif font-medium text-gray-800 dark:text-gray-100 leading-relaxed transition-colors px-2">
                        {currentQuestion}
                    </h2>
                </div>
            )}
        </Card>
      </div>

      {/* Footer Controls */}
      <div className="p-4 w-full">
        <Button 
            onClick={handleNextQuestion} 
            disabled={loading} 
            fullWidth 
            className="flex items-center justify-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
        >
            {loading ? '...' : (
                <>
                    Sujet Suivant <RefreshCcw size={18} />
                </>
            )}
        </Button>
      </div>
    </div>
  );

  return (
    <div className={`${darkMode ? 'dark' : ''} h-full`}>
      <div className="min-h-screen bg-[#F2F2F7] dark:bg-[#050505] relative overflow-hidden font-sans selection:bg-indigo-500/30 transition-colors duration-700">
        
        {/* Elegant Background Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-200/30 dark:bg-indigo-900/10 rounded-full blur-[130px] pointer-events-none mix-blend-multiply dark:mix-blend-screen transition-colors duration-1000" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-200/30 dark:bg-purple-900/10 rounded-full blur-[130px] pointer-events-none mix-blend-multiply dark:mix-blend-screen transition-colors duration-1000" />
        
        {/* Dark Mode Toggle */}
        <div className="absolute top-6 right-6 z-50">
          <button 
            onClick={toggleDarkMode}
            className="p-3 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-md shadow-sm text-gray-500 dark:text-yellow-400 hover:scale-105 hover:bg-white dark:hover:bg-gray-700 transition-all duration-300"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <div className="relative z-10 h-screen w-full px-4">
          {!gameStarted ? renderWelcome() : renderGame()}
        </div>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.98); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          .animate-fade-in-up {
              animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          .animate-spin-slow {
              animation: spin 3s linear infinite;
          }
          @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default App;