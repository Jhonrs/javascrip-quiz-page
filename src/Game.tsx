import { Card, Typography } from "@mui/material"
import { useQuestionsStore } from "./store/questions"
import { Question as QuestionType } from "./types"

const Question = ({info}:{info: QuestionType}) => {
    return (
        <Card variant="outlined">
            <Typography variant="h5">
                {info.question}
            </Typography>
        </Card>
    )
}

export const Game = () => {
    const questions = useQuestionsStore(state => state.questions);
    const currentQuestionIndex = useQuestionsStore(state => state.currentQuestionIndex);

    const questionInfo = questions[currentQuestionIndex];

    return (
        <>
            <Question info={questionInfo}/>
        </>
    )
}
