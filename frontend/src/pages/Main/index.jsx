import './style.css'
import Header from '../../components/Header'
import ListQuestions from '../../components/ListQuestions'
import useVote from '../../hooks/useVote'


function Main() {

  return (
    <div className="container">
      <Header />
      <section className='btn_create'>
        <button className='btn'> Crie sua enquete
        </button>
      </section>

      <main className='listQuestions'>
        <ListQuestions />
      </main>
    </div>
  )
}

export default Main
