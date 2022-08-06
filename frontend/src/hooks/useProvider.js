import { useState } from "react";
import api from '../services/api'

function useProvider() {
    const [questions, setQuestions] = useState([])
    const [openModal, setOpenModal] = useState('')
    const [deleteQuestion, setDeleteQuestion] = useState('')
    const [openVote, setOpenVote] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState({})
    const [error, setError] = useState('')

    const getQuestions = async () => {
        try {
            const response = await api.get('/questions');
            setQuestions(response.data)
        } catch (error) {
            throw error
        }
    }

    return {
        getQuestions,
        questions,
        setQuestions,
        openModal,
        setOpenModal,
        deleteQuestion,
        setDeleteQuestion,
        openVote,
        setOpenVote,
        currentQuestion,
        setCurrentQuestion,
        error,
        setError

    }
}
export default useProvider;