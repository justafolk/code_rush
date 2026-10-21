import { useState, useEffect, useRef, useCallback } from 'react';
import { PROBLEMS, getProblemByIndex } from '../problems/index.js';
import { executeCode } from '../engine/executor.js';
import {
  playSuccess,
  playWrong,
  playComboMilestone,
  playTick,
  playStart,
  playGameOver,
} from '../audio/soundEffects.js';
import confetti from 'canvas-confetti';

const STORAGE_KEY_PB = 'coderush_personal_bests';

function loadPersonalBests() {
  if (typeof localStorage === 'undefined') return { rush_3min: 0, rush_5min: 0, survival: 0 };
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PB);
    return raw ? JSON.parse(raw) : { rush_3min: 0, rush_5min: 0, survival: 0 };
  } catch {
    return { rush_3min: 0, rush_5min: 0, survival: 0 };
  }
}

function savePersonalBests(pbs) {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_PB, JSON.stringify(pbs));
  } catch (_) {}
}

export function useCodeRush() {
  const [status, setStatus] = useState('idle'); // 'idle' | 'countdown' | 'playing' | 'game_over'
  const [mode, setMode] = useState('rush_3min'); // 'rush_3min' | 'rush_5min' | 'survival'
  const [language, setLanguage] = useState('javascript'); // 'javascript' | 'typescript'

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [strikes, setStrikes] = useState(0);
  const [comboStreak, setComboStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  const [timeRemaining, setTimeRemaining] = useState(180);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const [userCode, setUserCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastResult, setLastResult] = useState(null);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'strike', text: string }
  const [history, setHistory] = useState([]);
  const [personalBests, setPersonalBests] = useState(loadPersonalBests);
  const [isNewPersonalBest, setIsNewPersonalBest] = useState(false);

  const problemStartTimeRef = useRef(Date.now());
  const timerRef = useRef(null);

  const currentProblem = getProblemByIndex(currentIndex) || PROBLEMS[0];

  // Initialize starter code when problem changes or language changes
  useEffect(() => {
    if (currentProblem) {
      const code = language === 'typescript'
        ? (currentProblem.typescriptStarter || currentProblem.starterCode)
        : currentProblem.starterCode;
      setUserCode(code);
      setLastResult(null);
      problemStartTimeRef.current = Date.now();
    }
  }, [currentIndex, language]);

  // Main game timer
  useEffect(() => {
    if (status !== 'playing') {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);

      if (mode !== 'survival') {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            endGame('Time Up!');
            return 0;
          }
          if (prev <= 10 && prev > 1) {
            playTick();
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status, mode]);

  const triggerConfetti = useCallback(() => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#00f0ff', '#00ff88', '#ffea00', '#ff0055', '#a855f7'],
      });
    } catch (_) {}
  }, []);

  const endGame = useCallback((reason = 'Game Over') => {
    setStatus('game_over');
    playGameOver();

    // Check personal best
    setPersonalBests((prevPbs) => {
      const currentPb = prevPbs[mode] || 0;
      if (score > currentPb) {
        setIsNewPersonalBest(true);
        const updated = { ...prevPbs, [mode]: score };
        savePersonalBests(updated);
        return updated;
      }
      return prevPbs;
    });
  }, [mode, score]);

  const startGame = useCallback((selectedMode = mode) => {
    setMode(selectedMode);
    setCurrentIndex(0);
    setScore(0);
    setStrikes(0);
    setComboStreak(0);
    setMaxStreak(0);
    setTimeElapsed(0);
    setLastResult(null);
    setFeedback(null);
    setHistory([]);
    setIsNewPersonalBest(false);

    const initTime = selectedMode === 'rush_3min' ? 180 : selectedMode === 'rush_5min' ? 300 : 0;
    setTimeRemaining(initTime);

    playStart();
    setStatus('playing');
    problemStartTimeRef.current = Date.now();
  }, [mode]);

  const resetCode = useCallback(() => {
    if (!currentProblem) return;
    const code = language === 'typescript'
      ? (currentProblem.typescriptStarter || currentProblem.starterCode)
      : currentProblem.starterCode;
    setUserCode(code);
  }, [currentProblem, language]);

  const submitCode = useCallback(async (codeToRun = userCode) => {
    if (status !== 'playing' || isSubmitting || !currentProblem) return;

    setIsSubmitting(true);
    setFeedback(null);

    const timeSpent = Math.round((Date.now() - problemStartTimeRef.current) / 100) / 10;
    const result = await executeCode(codeToRun, currentProblem, { language });
    setLastResult(result);
    setIsSubmitting(false);

    if (result.allPassed) {
      // SUCCESS!
      const newScore = score + 1;
      const newStreak = comboStreak + 1;
      setScore(newScore);
      setComboStreak(newStreak);
      setMaxStreak((prev) => Math.max(prev, newStreak));

      // Sound and visual fx
      playSuccess(newStreak);
      triggerConfetti();

      if (newStreak % 5 === 0) {
        playComboMilestone();
        setFeedback({ type: 'combo', text: `${newStreak}x STREAK COMBO! 🔥` });
      } else {
        setFeedback({ type: 'success', text: 'CORRECT! +1' });
      }

      setHistory((prev) => [
        ...prev,
        {
          problem: currentProblem,
          solved: true,
          timeSpent,
          code: codeToRun,
          strikesIncurred: 0,
        },
      ]);

      // Instantly advance to next problem!
      if (currentIndex + 1 < PROBLEMS.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        // Solved all 30 problems! Victory!
        endGame('ALL PUZZLES SOLVED! CONGRATULATIONS!');
      }
      return { success: true, result };
    } else {
      // FAILED / STRIKE!
      playWrong();
      const newStrikes = strikes + 1;
      setStrikes(newStrikes);
      setComboStreak(0); // Combo breaks on strike

      setFeedback({ type: 'strike', text: `STRIKE ${newStrikes}/3!` });

      if (newStrikes >= 3) {
        setHistory((prev) => [
          ...prev,
          {
            problem: currentProblem,
            solved: false,
            timeSpent,
            code: codeToRun,
            strikesIncurred: 1,
          },
        ]);
        endGame('3 Strikes - Game Over');
      }

      return { success: false, result };
    }
  }, [
    status,
    isSubmitting,
    currentProblem,
    userCode,
    language,
    score,
    comboStreak,
    strikes,
    currentIndex,
    triggerConfetti,
    endGame,
  ]);

  const skipProblem = useCallback(() => {
    if (status !== 'playing' || !currentProblem) return;

    playWrong();
    const newStrikes = strikes + 1;
    setStrikes(newStrikes);
    setComboStreak(0);

    setHistory((prev) => [
      ...prev,
      {
        problem: currentProblem,
        solved: false,
        timeSpent: Math.round((Date.now() - problemStartTimeRef.current) / 100) / 10,
        code: userCode,
        strikesIncurred: 1,
        skipped: true,
      },
    ]);

    if (newStrikes >= 3) {
      endGame('3 Strikes - Game Over');
      return;
    }

    setFeedback({ type: 'strike', text: `SKIPPED! STRIKE ${newStrikes}/3` });
    if (currentIndex + 1 < PROBLEMS.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      endGame('Completed queue');
    }
  }, [status, currentProblem, strikes, userCode, currentIndex, endGame]);

  // Expose AI Agent bridge on window
  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.__CODE_RUSH_AGENT__ = {
      getGameState: () => ({
        status,
        mode,
        language,
        score,
        strikes,
        comboStreak,
        maxStreak,
        timeRemaining,
        timeElapsed,
        currentIndex,
        totalProblems: PROBLEMS.length,
        currentProblem: currentProblem
          ? {
              id: currentProblem.id,
              title: currentProblem.title,
              rating: currentProblem.rating,
              difficulty: currentProblem.difficulty,
              description: currentProblem.description,
              functionName: currentProblem.functionName,
              params: currentProblem.params,
              starterCode: currentProblem.starterCode,
              visibleTestCases: currentProblem.testCases.filter((t) => !t.hidden),
            }
          : null,
        lastResult,
      }),
      startGame: (chosenMode) => startGame(chosenMode || mode),
      setUserCode: (code) => setUserCode(code),
      submitCode: (code) => submitCode(code !== undefined ? code : userCode),
      solveWithReference: () => {
        if (!currentProblem) return null;
        setUserCode(currentProblem.referenceSolution);
        return submitCode(currentProblem.referenceSolution);
      },
      skipProblem: () => skipProblem(),
      resetCode: () => resetCode(),
      endGame: (reason) => endGame(reason),
    };

    return () => {
      delete window.__CODE_RUSH_AGENT__;
    };
  }, [
    status,
    mode,
    language,
    score,
    strikes,
    comboStreak,
    maxStreak,
    timeRemaining,
    timeElapsed,
    currentIndex,
    currentProblem,
    lastResult,
    userCode,
    startGame,
    submitCode,
    skipProblem,
    resetCode,
    endGame,
  ]);

  return {
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
  };
}
