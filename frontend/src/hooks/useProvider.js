import { useState } from "react";

function useProvider() {
    const [questions, setQuestions] = useState([])
    const [responses, setResponses] = useState([])
    return {
        questions,
        setQuestions,
        responses,
        setResponses
    }
}
export default useProvider;