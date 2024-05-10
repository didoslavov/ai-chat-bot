import Image from 'next/image';
import logo from '/public/logo.png';

function Logo() {
    return (
        <div className="mx-auto">
            <Image className="max-w-28" src={logo} alt="Logo of the application" />
        </div>
    );
}

export default Logo;
