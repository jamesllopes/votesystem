import './style.css'
import useVote from '../../hooks/useVote'
import api from '../../services/api'

function DeleteQuestion() {
    const { setDeleteQuestion, deleteQuestion, questions, setQuestions } = useVote()
    const handleDeleteQuestion = async () => {
        const currentTransaction = [...questions]
        try {
            await api.delete(`/question/${deleteQuestion}`);
            const findItem = currentTransaction.findIndex(item => (
                item.id === Number(deleteQuestion)
            ))
            currentTransaction.splice(findItem, 1)
            setQuestions(currentTransaction)
            setDeleteQuestion('')
        } catch (error) {
            throw error
        }
    }
    return (
        <div className='container__modal-delete'>
            <div className='content__modal'>
                <h1 className='title__delete'>Tem Certeza que deseja Deletar essa enquete?</h1>
                <button
                    className='btn'
                    onClick={handleDeleteQuestion}> Deletar</button>
                <button
                    className='btn_cancelar'
                    onClick={() => setDeleteQuestion('')}>Cancelar</button>
            </div>
        </div>
    )
}

export default DeleteQuestion