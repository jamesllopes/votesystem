import { useState } from "react";
import api from '../services/api'

function useProvider() {
    const [questions, setQuestions] = useState([])
    const [responses, setResponses] = useState([])
    const [openModal, setOpenModal] = useState('')
    const [deleteQuestion, setDeleteQuestion] = useState('')

    const getQuestions = async () => {
        try {
            const response = await api.get('/questions');
            setQuestions(response.data[0].questions)
            setResponses(response.data[0].resp)
        } catch (error) {
            throw error
        }
    }

    return {
        getQuestions,
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