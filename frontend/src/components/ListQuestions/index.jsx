import './style.css'
import delet from '../../assets/delete.svg'
import update from '../../assets/update.svg'
import useVote from '../../hooks/useVote'
import { useEffect } from 'react'
import DeleteQuestion from '../ModalDelete'
import { format } from 'date-fns'

function ListQuestions() {
    const {
        getQuestions,
        questions,
        setOpenModal,
        setDeleteQuestion,
        deleteQuestion
    } = useVote()



    const handleDelete = (id) => {
        setDeleteQuestion(id)
    }

    useEffect(() => {
        getQuestions()
    }, [])

    return (
        <div className="questions__list">
            {deleteQuestion && <DeleteQuestion />}
            {questions.map(item => (
                <div className="card"
                    key={item.id}>
                    <div className='card__content'>
                        <div className='status'>
                            <span className='status__text'>{item.status_pergunta}</span>
                            <span>{item.status_pergunta === "Não Iniciada" && `Inicia em: ${format(new Date(item.data_inicial), `dd/MM/yyyy`)}`}</span>
                            <span>{item.status_pergunta === "Em Andamento" && `Finaliza em: ${format(new Date(item.final), `dd/MM/yyyy`)}`}</span>
                            <span>{item.status_pergunta === "Finalizada" && `Finalizada em: ${format(new Date(item.data_final), `dd/MM/yyyy`)}`}</span>
                        </div>
                        <h2 className='title__question'>{item.pergunta}</h2>
                        <button className="btn"> Votar
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
                                onClick={() => setOpenModal('atualizar')} />
                        </div>
                    </div>
                </div>
            ))
            }
        </div >
    )
}

export default ListQuestions
