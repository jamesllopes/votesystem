import './style.css'
import useVote from '../../hooks/useVote'
import { useEffect } from 'react'
import api from '../../services/api'
import { format } from 'date-fns'

function ListQuestions() {
    const {
        setQuestions,
        questions,
        setResponses,
        responses
    } = useVote()

    const getQuestions = async () => {
        try {
            const response = await api.get('/questions');
            setQuestions(response.data[0].questions)
            setResponses(response.data[0].resp)
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        getQuestions()
    }, [])

    return (
        <div className="questions__list">
            {questions.map(item => (
                <div className="card">
                    <span>{item.status_pergunta}</span>
                    <h1>{item.pergunta}</h1>
                    <h3>{format(new Date(item.data_inicial), `dd/MM/yyyy`)}</h3>
                    <h3>{format(new Date(item.data_final), `dd/MM/yyyy`)}</h3>
                    <h3></h3>
                    {responses.map(resp => (
                        <h1>{item.id === resp.id_pergunta && resp.resposta}</h1>
                    ))}
                </div>
            ))
            }
        </div >
    )
}

export default ListQuestions
