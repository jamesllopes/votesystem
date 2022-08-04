import './style.css'
import Header from '../../components/Header'
import ListQuestions from '../../components/ListQuestions'
import CreateUpdate from "../../components/CreateUpdateQuestions"
import useVote from '../../hooks/useVote'

function Main() {
  const {
    openModal,
    setOpenModal
  } = useVote()

  return (
    <div className="container">
      {openModal && <CreateUpdate />}
      <Header />
      <section className='btn_create'>
        <button className='btn'
          onClick={() => setOpenModal(true)}> Crie sua enquete
        </button>
      </section>
      <main className='listQuestions'>
        <ListQuestions />
      </main>
    </div>
  )
}

export default Main
