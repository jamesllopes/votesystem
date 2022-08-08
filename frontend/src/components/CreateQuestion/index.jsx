import './style.css'
import close from '../../assets/close.svg'
import useVote from '../../hooks/useVote'
import { useState } from 'react'
import api from '../../services/api'

function CreateQuestion() {
    const { getQuestions,
        setOpenModal,
        error,
        setError,
        success,
        setSuccess
    } = useVote()
    const [form, setForm] = useState({ pergunta: '', data_inicial: '', data_final: '', resposta: '' })
    const [resp, setResp] = useState([])

    const handleChangeInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('')
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
        return await createQuestion()
    }

    const createQuestion = async () => {
        try {
            const response = await api.post('/questions', {
                pergunta: form.pergunta,
                data_inicial: form.data_inicial.split("/").reverse().join("/"),
                data_final: form.data_final.split("/").reverse().join("/"),
                resposta: resp
            });
            setError('')
            setSuccess(response.data)
            setTimeout(() => {
                setOpenModal('')
                setSuccess('')
            }, [1500])
            getQuestions()
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='modal modal__create__update'>
            <div className='close__modal'>
                <img
                    className='close__logo'
                    src={close}
                    alt='Fechar'
                    onClick={() => setOpenModal('')} />
            </div>
            <div className='content'>
                <h1 className='title__modal'>Crie sua Enquete</h1>
                <form className="input-group"
                    onSubmit={handleSubmit}>
                    <h2 className='title__question'>Adicione a Pergunta</h2>
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

                    <h2 className='title__question'>Adicione pelo menos 3 opções</h2>
                    <div className='responses'>
                        <input
                            className='input'
                            type='text'
                            name='resposta'
                            value={form.resposta}
                            placeholder='Resposta'
                            onChange={(e) => handleChangeInput(e)} />
                        <button className='btn__responses btn'
                            type='button'
                            onClick={() => handleNextResp()}>Salvar</button>
                    </div>

                    <div className='itens__response'>
                        {resp.map(item => (
                            <p className='submit__responses'>
                                {item}
                            </p>
                        ))}
                    </div>
                    <button className='btn'
                        type='submit'>Enviar</button>
                </form>
                {error && <span className='error'>{error}</span>}
                {success && <span className='success'>{success}</span>}
            </div>
        </div>
    )
}

export default CreateQuestion