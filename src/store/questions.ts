import { create } from "zustand";
import { type Question } from "../types";

interface QuestionsState {
  questions: Question[];
  currentQuestionIndex: number;
  fetchQuestions: (limit: number) => Promise<void>;
}

export const useQuestionsStore = create<QuestionsState>((set) => {
    return {
        questions: [],
        currentQuestionIndex: 0,
        fetchQuestions: async (limit: number) => {
            const res = await fetch('http://localhost:5173/data.json');
            const json = await res.json();

            const questions = json.sort(() => Math.random() - 0.5).slice(0, limit);

            set({ questions });
        }
    }
});
