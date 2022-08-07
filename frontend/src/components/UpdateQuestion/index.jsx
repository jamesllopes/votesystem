import './style.css'
import close from '../../assets/close.svg'
import useVote from '../../hooks/useVote'
import { useEffect, useState } from 'react'
import api from '../../services/api'
import dateFormat from '../../utils/date'

function UpdateQuestion() {
    const { getQuestions,
        setOpenModal,
        openModal,
        error,
        setError,
        updateQuestions
    } = useVote()
    const [form, setForm] = useState({ pergunta: '', data_inicial: '', data_final: '' })
    const [resp, setResp] = useState([])

    const handleChangeInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('')
    }

    const handleChangeResp = (e, id, index) => {
        const currentResps = resp
        const currentResp = { id, resposta: e }
        currentResps.splice(index, 1, currentResp)
        setResp([...currentResps])
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
        return await updateQuestionsApi()
        setError('')
    }

    const updateQuestionsApi = async () => {
        try {
            const response = await api.put(`/questions/${updateQuestions[0].question.id}`, {
                pergunta: form.pergunta,
                data_inicial: form.data_inicial.split("/").reverse().join("/"),
                data_final: form.data_final.split("/").reverse().join("/"),
                respostas: resp
            });
            console.log(response)
            // setErrorMessage('')
            // setNewOrUpdateTransaction('')

        } catch (error) {
            console.log(error)
        }
    }
    const question = updateQuestions[0].question
    const resps = updateQuestions[0].resp
    const respostas = []
    resps.map(item => {
        respostas.push({ id: item.id, resposta: item.resposta })
    })
    useEffect(() => {
        setResp(respostas)
        setForm({
            pergunta: question.pergunta,
            data_inicial: dateFormat(question.data_inicial),
            data_final: dateFormat(question.data_final)
        })
    }, [])

    return (
        <div className='container__modal'>
            <div className='close__modal'>
                <img
                    className='close-img'
                    src={close}
                    alt='Fechar'
                    onClick={() => setOpenModal('')} />
            </div>
            <div className='content'>
                <h1 className='title__modal'>Atualizar Enquete</h1>
                <form className="input-group"
                    onSubmit={handleSubmit}>
                    <h2 className='title__question'>Pergunta</h2>
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

                    <h2 className='title__question'>Respostas</h2>

                    <div className='responses__submit'>
                        {resp.map((item, index) => (
                            <div className='responses'>
                                <input
                                    className='input'
                                    type='text'
                                    name='resposta'
                                    value={resp[index].resposta}
                                    placeholder='Resposta'
                                    onChange={(e) => handleChangeResp(e.target.value, item.id, index)} />
                                <button className='btn__responses btn'
                                    type='button'
                                    onClick={() => handleNextResp()}>Salvar</button>
                            </div>
                        ))}
                    </div>
                    <button className='btn'
                        type='submit'>Enviar</button>
                </form>
                {error && <span className='error'>{error}</span>}
            </div>
        </div>
    )
}

export default UpdateQuestion