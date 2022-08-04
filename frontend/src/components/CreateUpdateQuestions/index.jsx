import './style.css'
import close from '../../assets/close.svg'
import useVote from '../../hooks/useVote'

function CreateUpdate() {
    const { setOpenModal } = useVote()
    return (
        <div className='container__modal'>
            <div className='close'>
                <img
                    className='close-img'
                    src={close}
                    alt='Fechar'
                    onClick={() => setOpenModal(false)} />
            </div>
            <h1>Crie sua Enquete</h1>
            <form className="input-group">

            </form>
        </div>
    )
}

export default CreateUpdate