import React, { useState } from 'react';
import { useCodeRush } from './hooks/useCodeRush.js';
import { Header } from './components/Header.jsx';
import { StartScreen } from './components/StartScreen.jsx';
import { ProblemCard } from './components/ProblemCard.jsx';
import { EditorPane } from './components/EditorPane.jsx';
import { GameOverScreen } from './components/GameOverScreen.jsx';
import { PROBLEMS } from './problems/index.js';
import './styles/coderush.css';

export default function App() {
  const {
    status,
    mode,
    language,
    setLanguage,
    currentIndex,
    currentProblem,
    score,
    strikes,
    comboStreak,
    maxStreak,
    timeRemaining,
    timeElapsed,
    userCode,
    setUserCode,
    isSubmitting,
    lastResult,
    feedback,
    history,
    personalBests,
    isNewPersonalBest,
    startGame,
    submitCode,
    skipProblem,
    resetCode,
    endGame,
  } = useCodeRush();

  const [selectedMode, setSelectedMode] = useState(mode);

  return (
    <div className="rush-app-container">
      <Header
        status={status}
        mode={mode}
        score={score}
        strikes={strikes}
        comboStreak={comboStreak}
        timeRemaining={timeRemaining}
        timeElapsed={timeElapsed}
        language={language}
        setLanguage={setLanguage}
        onEndGame={endGame}
        onBackToHome={() => endGame('Returned to lobby')}
      />

      <main className="rush-main-content">
        {status === 'idle' && (
          <StartScreen
            selectedMode={selectedMode}
            onSelectMode={setSelectedMode}
            onStart={(m) => startGame(m)}
            personalBests={personalBests}
            language={language}
            setLanguage={setLanguage}
          />
        )}

        {status === 'playing' && (
          <div className="arena-layout fade-in">
            <ProblemCard
              problem={currentProblem}
              index={currentIndex}
              total={PROBLEMS.length}
              lastResult={lastResult}
            />

            <EditorPane
              code={userCode}
              onChange={setUserCode}
              onSubmit={submitCode}
              onReset={resetCode}
              onSkip={skipProblem}
              isSubmitting={isSubmitting}
              lastResult={lastResult}
              feedback={feedback}
              language={language}
            />
          </div>
        )}

        {status === 'game_over' && (
          <GameOverScreen
            score={score}
            mode={mode}
            maxStreak={maxStreak}
            timeElapsed={timeElapsed}
            history={history}
            isNewPersonalBest={isNewPersonalBest}
            personalBests={personalBests}
            onPlayAgain={() => startGame(mode)}
            onHome={() => endGame('Returned to lobby')}
          />
        )}
      </main>
    </div>
  );
}
