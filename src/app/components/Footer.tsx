import { FaGithub } from "react-icons/fa"

const Footer = () => {
    return (
        <footer className="py-2 flex-shrink-0">
            <div className="text-center text-gray-400">
            <p className="mb-2 flex justify-center items-center gap-2">
                Desenvolvido com{' '}
                <span
                className="text-black-500 animate-pulse"
                style={{
                    animationDuration: '1.5s',
                    animationIterationCount: 'infinite',
                }}
                >
                🖤
                </span>{' '}
                pela equipe da Carvalheira!
            </p>
            <a
                href="https://github.com/ummatias/lsdle"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-600 transition"
            >
                <FaGithub className="text-2xl" />
                Acesse o repositório no GitHub
            </a>
            </div>
        </footer>
    )
}

export default Footer;