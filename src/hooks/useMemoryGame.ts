"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export interface CardState {
  id: number;       // unique slot id (0-7)
  pairId: number;   // 0-3 — which face pair this card belongs to
  isFlipped: boolean;
  isMatched: boolean;
}

export interface BestScore {
  moves: number;
  timeMs: number;
}

const STORAGE_KEY = "angad14-memory-best";

function shuffleFisherYates<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeck(): CardState[] {
  const pairs = [0, 1, 2, 3, 0, 1, 2, 3]; // 4 pairs
  const shuffled = shuffleFisherYates(pairs);
  return shuffled.map((pairId, id) => ({
    id,
    pairId,
    isFlipped: false,
    isMatched: false,
  }));
}

function loadBest(): BestScore | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as BestScore) : null;
  } catch {
    return null;
  }
}

function saveBest(score: BestScore) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(score));
  } catch {
    // ignore storage errors
  }
}

export type MismatchId = number | null;

export function useMemoryGame() {
  const [cards, setCards] = useState<CardState[]>([]);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [locked, setLocked] = useState(false);
  const [moves, setMoves] = useState(0);
  const [matchedCount, setMatchedCount] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [started, setStarted] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [bestScore, setBestScore] = useState<BestScore | null>(null);
  const [mismatchIds, setMismatchIds] = useState<[number, number] | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const mismatchTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize deck after mount (hydration-safe)
  useEffect(() => {
    setCards(buildDeck());
    setBestScore(loadBest());
  }, []);

  // Timer
  useEffect(() => {
    if (started && !isWon) {
      startTimeRef.current = Date.now() - elapsedMs;
      timerRef.current = setInterval(() => {
        setElapsedMs(Date.now() - startTimeRef.current);
      }, 100);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [started, isWon]); // eslint-disable-line react-hooks/exhaustive-deps

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (mismatchTimerRef.current) clearTimeout(mismatchTimerRef.current);
    };
  }, []);

  const handleFlip = useCallback(
    (cardId: number) => {
      if (locked) return;
      const card = cards[cardId];
      if (!card || card.isFlipped || card.isMatched) return;

      // Start timer on first flip
      if (!started) setStarted(true);

      const newFlipped = [...flippedIds, cardId];

      setCards((prev) =>
        prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c))
      );

      if (newFlipped.length === 1) {
        setFlippedIds(newFlipped);
        return;
      }

      // Two cards flipped — evaluate
      const [firstId, secondId] = newFlipped;
      const first = cards[firstId];
      const second = card;
      const nextMoves = moves + 1;
      setMoves(nextMoves);
      setLocked(true);
      setFlippedIds([]);

      if (first.pairId === second.pairId) {
        // Match!
        const nextMatched = matchedCount + 1;
        setMatchedCount(nextMatched);
        setCards((prev) =>
          prev.map((c) =>
            c.id === firstId || c.id === secondId
              ? { ...c, isMatched: true }
              : c
          )
        );
        setLocked(false);

        if (nextMatched === 4) {
          // Win!
          if (timerRef.current) clearInterval(timerRef.current);
          const finalMs = Date.now() - startTimeRef.current;
          setElapsedMs(finalMs);
          setIsWon(true);

          // Check best score (fewer moves wins, then faster time)
          const current: BestScore = { moves: nextMoves, timeMs: finalMs };
          setBestScore((prev) => {
            if (
              !prev ||
              nextMoves < prev.moves ||
              (nextMoves === prev.moves && finalMs < prev.timeMs)
            ) {
              saveBest(current);
              return current;
            }
            return prev;
          });
        }
      } else {
        // Mismatch — shake then flip back
        setMismatchIds([firstId, secondId]);
        mismatchTimerRef.current = setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setMismatchIds(null);
          setLocked(false);
        }, 900);
      }
    },
    [cards, flippedIds, locked, moves, matchedCount, started]
  );

  const replay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (mismatchTimerRef.current) clearTimeout(mismatchTimerRef.current);
    setCards(buildDeck());
    setFlippedIds([]);
    setLocked(false);
    setMoves(0);
    setMatchedCount(0);
    setIsWon(false);
    setStarted(false);
    setElapsedMs(0);
    setMismatchIds(null);
    setBestScore(loadBest());
  }, []);

  const formatTime = (ms: number): string => {
    const s = Math.floor(ms / 1000);
    const tenth = Math.floor((ms % 1000) / 100);
    return `${s}.${tenth}s`;
  };

  return {
    cards,
    moves,
    isWon,
    elapsedMs,
    bestScore,
    mismatchIds,
    handleFlip,
    replay,
    formatTime,
  };
}
