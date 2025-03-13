import { Button } from "@mui/material";
import { useQuestionsData } from "./hooks/useQuestionsData";
import { useQuestionsStore } from "./store/questions";

export const Footer = () => {
  const { correct, incorrect, unanswered } = useQuestionsData();
  const reset = useQuestionsStore((state) => state.reset);

  return (
    <footer style={{ marginTop: "1rem" }}>
      <strong>{`✅${correct} correctas - ❌${incorrect} incorrectas - ❓${unanswered} sin responder`}</strong>
      <div>
        <Button onClick={() => reset()}>Resetear Juego</Button>
      </div>
    </footer>
  );
};
