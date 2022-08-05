import './style.css'
import close from '../../assets/close.svg'
import useVote from '../../hooks/useVote'
import { useState } from 'react'
import api from '../../services/api'

function CreateUpdate() {
    const { getQuestions, setOpenModal, openModal, questions, setQuestions } = useVote()
    const [form, setForm] = useState({ pergunta: '', data_inicial: '', data_final: '', resposta: '' })
    const [error, setError] = useState('')
    const [resp, setResp] = useState([])

    const handleChangeInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleNextResp = () => {
        const currentResposta = form.resposta
        setResp([...resp, currentResposta])
        setForm({ ...form, resposta: '' })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!form.pergunta || !form.data_inicial || !form.data_final) {
            setError('Todos os campos são obrigatórios.')
            return
        }

        if (resp.length < 3) {
            setError('Você precisa enviar pelo menos 3 opções de repsostas.')
        }

        if (openModal === 'Criar') {
            return await createQuestion()
        }

        // if (newOrUpdateTransaction === 'atualizar') {
        //     return updateTransaction()
        // }

    }

    const createQuestion = async () => {
        try {
            await api.post('/questions', {
                pergunta: form.pergunta,
                data_inicial: new Date(form.data_inicial.split("/").reverse().join("/")),
                data_final: new Date(form.data_final.split("/").reverse().join("/")),
                resposta: resp
            });
            setError('')
            setOpenModal('')
            getQuestions()

        } catch (error) {
            // setError(erro)
            console.log(error)
        }
    }


    return (
        <div className='container__modal'>
            <div className='content'>
                <div className='close'>
                    <img
                        className='close-img'
                        src={close}
                        alt='Fechar'
                        onClick={() => setOpenModal('')} />
                </div>
                <h1 className='title__modal'>{openModal === 'Criar' ? 'Crie sua Enquete' : 'Atualizar Enquete'}</h1>
                <form className="input-group"
                    onSubmit={handleSubmit}>
                    <h2 className='title__question'>Crie sua Pergunta</h2>
                    <input
                        className='input'
                        type='text'
                        name='pergunta'
                        value={form.pergunta}
                        placeholder='Pergunta'
                        onChange={(e) => handleChangeInput(e)} />
                    <input
                        className='input'
                        type='text'
                        name='data_inicial'
                        value={form.data_inicial}
                        placeholder='Data de Inicio'
                        onChange={(e) => handleChangeInput(e)} />
                    <input
                        className='input'
                        type='text'
                        name='data_final'
                        value={form.data_final}
                        placeholder='Data do Fim'
                        onChange={(e) => handleChangeInput(e)} />

                    <h2 className='title__question'>Crie pelo menos 3 opções de respostas</h2>

                    <input
                        className='input'
                        type='text'
                        name='resposta'
                        value={form.resposta}
                        placeholder='Resposta'
                        onChange={(e) => handleChangeInput(e)} />
                    <button className='btn'
                        type='button'
                        onClick={() => handleNextResp()}>Enviar Proxima Resposta</button>

                    {resp.map(item => (
                        <h1>{item}</h1>
                    ))}
                    <button className='btn'
                        type='submit'>Enviar</button>
                </form>
                {error && <span>{error}</span>}
            </div>
        </div>
    )
}

export default CreateUpdate