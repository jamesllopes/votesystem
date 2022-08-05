import './style.css'
import close from '../../assets/close.svg'
import useVote from '../../hooks/useVote'

function CreateUpdate() {
    const { setOpenModal, openModal } = useVote()
    return (
        <div className='container__modal'>
            <div className='close'>
                <img
                    className='close-img'
                    src={close}
                    alt='Fechar'
                    onClick={() => setOpenModal('')} />
            </div>
            <h1>{openModal === 'Criar' ? 'Crie sua Enquete' : 'Atualizar Enquete'}</h1>
            <form className="input-group">
            </form>
        </div>
    )
}

export default CreateUpdate