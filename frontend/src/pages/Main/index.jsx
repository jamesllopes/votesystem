import './style.css'
import Header from '../../components/Header'
import ListQuestions from '../../components/ListQuestions'
import CreateQuestion from "../../components/CreateQuestion"
import UpdateQuestion from '../../components/UpdateQuestion'
import useVote from '../../hooks/useVote'

function Main() {
  const {
    openModal,
    setOpenModal
  } = useVote()

  return (
    <div className="container">
      {openModal === 'Criar' && <CreateQuestion />}
      {openModal === 'Atualizar' && <UpdateQuestion />}
      <Header />
      <section className='btn_create'>
        <button className='btn'
          onClick={() => setOpenModal('Criar')}> Crie sua enquete
        </button>
      </section>
      <main className='listQuestions'>
        <ListQuestions />
      </main>
    </div>
  )
}

export default Main
