import './style.css'
import useVote from '../../hooks/useVote'
import { useEffect, useState } from 'react'
import api from '../../services/api'

function Vote({ getQuestionForVote }) {
    const [options, setOptions] = useState({ id: '', resposta: '', votos: '' })
    const [success, setSuccess] = useState('')
    const {
        currentQuestion,
        setOpenVote,
        error,
        setError
    } = useVote()

    const handleChangeValue = (e, qtd_votos) => {
        setOptions({ id: e.target.id, resposta: e.target.value, votos: qtd_votos })
        console.log(options)
    }

    const handleSubmitVote = async () => {
        const id = currentQuestion.question.id

        if (!options.resposta || !options.id) {
            setError('É necessário escolher uma resposta.')
            return
        }

        try {
            const response = await api.put(`/vote/${id}`, {
                id: options.id,
                qtd_votos: (options.votos + 1)
            })
            setSuccess(response.data)
            getQuestionForVote(currentQuestion.question.id)

            setTimeout(() => {
                setOpenVote(false)
            }, 1500)

        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="modal__vote">
            <div className="card card__vote">
                <div className='card__content content__vote'>
                    <span>{currentQuestion.question.pergunta}</span>
                    {currentQuestion.resp.map(resp => (
                        <div
                            key={resp.id}
                            className={options.resposta === resp.resposta ? 'options_bg inputs' : 'inputs'}
                        >
                            <input
                                className='input__radio'
                                type="radio"
                                id={resp.id}
                                name='resposta'
                                value={resp.resposta}
                                onChange={(e) => handleChangeValue(e, resp.qtd_votos)} />
                            <label
                                htmlFor={resp.id}>{resp.resposta}</label>
                            <h1>{resp.qtd_votos}</h1>
                        </div>
                    ))}

                    <button className='btn'
                        onClick={() => handleSubmitVote()}>Confirmar</button>
                    {success && <h3>{success}</h3>}
                    {error && <h3>{error}</h3>}
                </div>
            </div>
        </div >
    )
}

export default Vote
