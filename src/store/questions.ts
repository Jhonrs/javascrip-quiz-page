import { create } from "zustand";
import { type Question } from "../types";
import confetti from "canvas-confetti";
import { persist } from "zustand/middleware";

interface QuestionsState {
  questions: Question[];
  currentQuestionIndex: number;
  fetchQuestions: (limit: number) => Promise<void>;
  selectAnswer: (questionId: number, answerIndex: number) => void;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
  reset: () => void;
  
}

export const useQuestionsStore = create<QuestionsState>()(
  persist(
    (set, get) => {
      return {
        questions: [],
        currentQuestionIndex: 0,
        fetchQuestions: async (limit: number) => {
          const res = await fetch("/data.json");
          const json = await res.json();

          const questions = json
            .sort(() => Math.random() - 0.5)
            .slice(0, limit);

          set({ questions });
        },

        selectAnswer: (questionId: number, answerIndex: number) => {
          const { questions } = get();
          // usar el structuredClone para clonar el objeto
          const newQuestions = structuredClone(questions);
          // encontramos el indice de la pregunta
          const questionIndex = newQuestions.findIndex(
            (q) => q.id === questionId
          );
          // obtenemos la informacion de la pregunta
          const questionInfo = newQuestions[questionIndex];
          // averiguamos si el usuario ha seleccionado la respuesta correcta
          const isCorrectUserAnswer =
            questionInfo.correctAnswer === answerIndex;
          if (isCorrectUserAnswer) confetti();
          // cambiar la informacion en la copia de la pregunta
          newQuestions[questionIndex] = {
            ...questionInfo,
            isCorrectUserAnswer,
            userSelectedAnswer: answerIndex,
          };
          // actualizamos el estado
          set({ questions: newQuestions });
        },

        goNextQuestion: () => {
          const { currentQuestionIndex, questions } = get();
          const nextIndex = currentQuestionIndex + 1;

          if (nextIndex < questions.length) {
            set({ currentQuestionIndex: nextIndex });
          }
        },

        goPreviousQuestion: () => {
          const { currentQuestionIndex, questions } = get();
          const previousQuestion = currentQuestionIndex - 1;

          if (previousQuestion < questions.length) {
            set({ currentQuestionIndex: previousQuestion });
          }
        },
        reset: () => {
          set({ currentQuestionIndex: 0, questions: [] });
        },
      };
    },
    { name: "questions" }
  )
);
