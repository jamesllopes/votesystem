import './style.css'
import useVote from '../../hooks/useVote'
import { useState } from 'react'
import api from '../../services/api'
import close from '../../assets/close.svg'

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
    setError('')
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
      <div className='close__modal'>
        <img
          className='close_logo'
          src={close}
          alt="fechar"
          onClick={() => setOpenVote(false)} />
      </div>
      <div className="card card__vote">
        <div className='card__content content__vote'>
          <h1 className='title__question'>{currentQuestion.question.pergunta}</h1>
          {currentQuestion.resp.map(resp => (
            <div
              key={resp.id}
              className='inputs'
            >
              <input
                className='input__radio'
                type="radio"
                id={resp.id}
                name='resposta'
                value={resp.resposta}
                onChange={(e) => handleChangeValue(e, resp.qtd_votos)} />

              <label
                className={options.resposta === resp.resposta ? 'options__title options_bg' : 'options__title'}
                htmlFor={resp.id}><p>{resp.resposta}</p>
                <p className='vote_computed'>{resp.qtd_votos}</p>
              </label>
            </div>
          ))}

          <button className='btn'
            onClick={() => handleSubmitVote()}>Confirmar</button>
          {success && <h3 className='success'>{success}</h3>}
          {error && <h3 className='error'>{error}</h3>}
        </div>
      </div>
    </div >
  )
}

export default Vote
