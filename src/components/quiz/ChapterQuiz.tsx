import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  ChevronRight,
  Trophy,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { playSound } from "@/lib/sounds";
import type { QuizQuestion } from "@/types";

interface ChapterQuizProps {
  chapterTitle: string;
  questions: QuizQuestion[];
  onComplete: (score: number, total: number, passed: boolean) => void;
  onClose: () => void;
  passingScore?: number;
}

export function ChapterQuiz({
  chapterTitle,
  questions,
  onComplete,
  onClose,
  passingScore = 0.7,
}: ChapterQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<{ correct: boolean; answer: string }[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);

  const question = questions[currentIndex];
  if (!question) return null;

  const isCorrect = selectedAnswer === question.correctAnswer;
  const score = answers.filter((a) => a.correct).length;
  const total = questions.length;
  const passed = score / total >= passingScore;

  const handleSelect = useCallback(
    (answer: string) => {
      if (showResult) return;
      setSelectedAnswer(answer);
      setShowResult(true);

      const correct = answer === question.correctAnswer;
      if (correct) {
        playSound("quiz_correct");
      } else {
        playSound("quiz_wrong");
      }

      setAnswers((prev) => [...prev, { correct, answer }]);
    },
    [showResult, question],
  );

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
      const finalScore = answers.filter((a) => a.correct).length;
      const finalPassed = finalScore / total >= passingScore;
      if (finalPassed) {
        playSound("achievement");
      }
    }
  }, [currentIndex, questions.length, answers, total, passingScore]);

  if (quizComplete) {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="bg-card border border-border rounded-2xl p-8 max-w-md w-full text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15 }}
        >
          {passed ? (
            <>
              <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-2xl font-black mb-2">Quiz Passed!</h2>
              <p className="text-muted-foreground mb-4">
                You scored {score}/{total} on {chapterTitle}
              </p>
              <div className="flex gap-2 mb-6">
                {questions.map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex-1 h-2 rounded-full",
                      answers[i]?.correct ? "bg-green-500" : "bg-red-500",
                    )}
                  />
                ))}
              </div>
              <motion.button
                onClick={() => onComplete(score, total, true)}
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Continue Reading (+100 XP)
              </motion.button>
            </>
          ) : (
            <>
              <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h2 className="text-2xl font-black mb-2">Not Quite!</h2>
              <p className="text-muted-foreground mb-2">
                You scored {score}/{total}. You need{" "}
                {Math.ceil(total * passingScore)}/{total} to pass.
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Re-read the chapter and try again. You've got this!
              </p>
              <div className="flex gap-2 mb-6">
                {questions.map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex-1 h-2 rounded-full",
                      answers[i]?.correct ? "bg-green-500" : "bg-red-500",
                    )}
                  />
                ))}
              </div>
              <div className="flex gap-3">
                <motion.button
                  onClick={onClose}
                  className="flex-1 px-4 py-3 bg-muted rounded-lg font-medium text-sm"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Re-read Chapter
                </motion.button>
                <motion.button
                  onClick={() => {
                    setCurrentIndex(0);
                    setSelectedAnswer(null);
                    setShowResult(false);
                    setAnswers([]);
                    setQuizComplete(false);
                  }}
                  className="flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium text-sm flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <RotateCcw className="w-4 h-4" />
                  Retry Quiz
                </motion.button>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-card border border-border rounded-2xl p-6 sm:p-8 max-w-lg w-full"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 20 }}
      >
        {/* Progress */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            Question {currentIndex + 1} of {total}
          </p>
          <div className="flex gap-1">
            {questions.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "w-2 h-2 rounded-full",
                  i < currentIndex
                    ? answers[i]?.correct
                      ? "bg-green-500"
                      : "bg-red-500"
                    : i === currentIndex
                      ? "bg-primary"
                      : "bg-muted",
                )}
              />
            ))}
          </div>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-lg font-bold mb-6">{question.question}</h3>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {question.options?.map((option) => {
                const isSelected = selectedAnswer === option;
                const isRight = option === question.correctAnswer;

                return (
                  <motion.button
                    key={option}
                    onClick={() => handleSelect(option)}
                    disabled={showResult}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-lg border text-sm font-medium transition-all",
                      !showResult && !isSelected &&
                        "border-border hover:border-primary/50 hover:bg-accent/50",
                      !showResult && isSelected && "border-primary bg-accent",
                      showResult && isRight &&
                        "border-green-500 bg-green-500/10 text-green-400",
                      showResult && isSelected && !isRight &&
                        "border-red-500 bg-red-500/10 text-red-400",
                      showResult && !isRight && !isSelected &&
                        "border-border opacity-50",
                    )}
                    whileHover={!showResult ? { scale: 1.01 } : undefined}
                    whileTap={!showResult ? { scale: 0.99 } : undefined}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showResult && isRight && (
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                      )}
                      {showResult && isSelected && !isRight && (
                        <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className={cn(
                    "rounded-lg p-4 mb-4 text-sm",
                    isCorrect
                      ? "bg-green-500/10 border border-green-500/30"
                      : "bg-amber-500/10 border border-amber-500/30",
                  )}
                >
                  <p className="font-semibold mb-1">
                    {isCorrect ? "Correct!" : "Not quite."}
                  </p>
                  <p className="text-muted-foreground">
                    {question.explanation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next button */}
            {showResult && (
              <motion.button
                onClick={handleNext}
                className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold flex items-center justify-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {currentIndex < questions.length - 1 ? (
                  <>
                    Next Question
                    <ChevronRight className="w-4 h-4" />
                  </>
                ) : (
                  "See Results"
                )}
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
