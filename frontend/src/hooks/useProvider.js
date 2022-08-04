import { useState } from "react";

function useProvider() {
    const [questions, setQuestions] = useState([])
    const [responses, setResponses] = useState([])
    const [openModal, setOpenModal] = useState(false)
    return {
        questions,
        setQuestions,
        responses,
        setResponses,
        openModal,
        setOpenModal
    }
}
export default useProvider;