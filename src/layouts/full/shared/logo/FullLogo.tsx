// src/layouts/full/shared/logo/FullLogo.tsx
import Logo from '/src/assets/images/logos/logo.svg'
import { Link } from 'react-router-dom'

const FullLogo = () => {
    return (
        <Link to="/" className="block">
            <img
                src={Logo}
                alt="CellCom Logo"
                className="block w-48 h-auto"  // define largura fixa (32 = 8rem = 128px) e altura automática
            />
        </Link>
    )
}

export default FullLogo
