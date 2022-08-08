import './style.css'
import logo from '../../assets/logo.svg'

function Header() {
    return (
        <header className="header">
            <div className='logo__vote'>
                <img className='logo' src={logo} alt='Logo Vote' />
            </div>
        </header>
    )
}

export default Header