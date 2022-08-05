import { useState } from "react";

function useProvider() {
    const [questions, setQuestions] = useState([])
    const [responses, setResponses] = useState([])
    const [openModal, setOpenModal] = useState('')
    const [deleteQuestion, setDeleteQuestion] = useState('')
    return {
        questions,
        setQuestions,
        responses,
        setResponses,
        openModal,
        setOpenModal,
        deleteQuestion,
        setDeleteQuestion
    }
}
export default useProvider;