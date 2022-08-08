import { useState } from "react";
import api from '../services/api'

function useProvider() {
    const [questions, setQuestions] = useState([])
    const [openModal, setOpenModal] = useState('')
    const [deleteQuestion, setDeleteQuestion] = useState('')
    const [openVote, setOpenVote] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState({})
    const [error, setError] = useState('')
    const [updateQuestions, setUpdateQuestions] = useState([])
    const [success, setSuccess] = useState('')

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
        setError,
        updateQuestions,
        setUpdateQuestions,
        success,
        setSuccess
    }
}
export default useProvider;