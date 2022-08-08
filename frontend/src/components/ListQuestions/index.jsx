import './style.css'
import delet from '../../assets/delete.svg'
import update from '../../assets/update.svg'
import useVote from '../../hooks/useVote'
import { useEffect } from 'react'
import DeleteQuestion from '../ModalDelete'
import Vote from '../Vote'
import api from '../../services/api'
import dateFormat from '../../utils/date'

function ListQuestions() {
  const {
    getQuestions,
    questions,
    setOpenModal,
    setDeleteQuestion,
    deleteQuestion,
    setOpenVote,
    openVote,
    setCurrentQuestion,
    setUpdateQuestions
  } = useVote()
  const handleDelete = (id) => {
    setDeleteQuestion(id)
  }

  const handleVote = async (id, status) => {
    if (status !== "Em Andamento") {
      return
    }
    await getQuestionForVote(id)
    setOpenVote(true)
  }

  const getQuestionForVote = async (id) => {
    try {
      const response = await api.get(`/question/${id}`);
      setCurrentQuestion(...response.data)
    } catch (error) {
      throw error
    }
  }

  const handleUpdateQuestions = async (item) => {
    try {
      const response = await api.get(`/question/${item.id}`);
      setUpdateQuestions([...response.data], item)
    } catch (error) {
      throw error
    }
    setOpenModal('Atualizar')
  }

  useEffect(() => {
    getQuestions()
  }, [])

  return (
    <div className="questions__list">
      {openVote && <Vote
        getQuestionForVote={getQuestionForVote} />}
      {deleteQuestion && <DeleteQuestion />}
      <h1 className='title__list'>Lista de Enquetes</h1>
      <div className='content__list'>
        {questions.map(item => (
          <div className="card"
            key={item.id}>
            <div className='card__content'>
              <div className='status'>
                <span className='status__text'>{item.status_pergunta}</span>
                <span>{item.status_pergunta === "Não Iniciada" && `Inicia em: ${dateFormat(item.data_inicial)}`}</span>
                <span>{item.status_pergunta === "Em Andamento" && `Finaliza em: ${dateFormat(item.data_final)}`}</span>
                <span>{item.status_pergunta === "Finalizada" && `Finalizada em: ${dateFormat(item.data_final)}`}</span>
              </div>
              <h2 className='title__question-list'>{item.pergunta}</h2>
              <button
                className={item.status_pergunta !== 'Em Andamento' ? 'oculto ' : 'btn'}
                onClick={() => handleVote(item.id, item.status_pergunta)}
                id={item.id}> Votar
              </button>
              <div className='delete__update'>
                <img
                  className='delete'
                  src={delet}
                  alt='Excluir'
                  id={item.id}
                  onClick={() => handleDelete(item.id)} />
                <img
                  className='update'
                  src={update}
                  alt='Atualizar'
                  onClick={() => handleUpdateQuestions(item)} />
              </div>
            </div>
          </div>
        ))
        }
      </div>
    </div >
  )
}

export default ListQuestions