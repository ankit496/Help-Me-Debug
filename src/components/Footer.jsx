import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white p-4">
            <div className='flex items-center justify-evenly'>
                <div className="text-center text-gray-400">&copy; 2024 HelpMe-Debug</div>
                <div className="flex space-x-4">
                    <a href="#" className="hover:text-gray-300">
                        <FaFacebookF />
                    </a>
                    <a href="#" className="hover:text-gray-300">
                        <FaTwitter />
                    </a>
                    <a href="#" className="hover:text-gray-300">
                        <FaInstagram />
                    </a>
                    <a href="#" className="hover:text-gray-300">
                        <FaLinkedinIn />
                    </a>
                </div>
                
            </div>
        </footer>
    );
};

export default Footer;
