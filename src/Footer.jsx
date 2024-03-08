import logo from './assets/logoUV.svg';

function Footer(){
    return (
        <footer>
            <div
                className="mx-auto w-full lg:px-24 max-w-7xl md:px-12 items-center px-8 py-24"
            >
                <div className="grid grid-cols-2 lg:grid-cols-4 items-start gap-x-8 gap-y-24">
                <a
                    href="/"
                    className="xl:col-span-1 text-black inline-flex items-center gap-3"
                >
                <img src={logo} alt="UV Logo" className="w-10 h-13" />
                    <span className="font-bold font-display">Agenda acesorias</span>
                </a>
                <div
                    className="md:grid md:grid-cols-2 xl:grid-cols-4 md:gap-8 text-sm text-gray-400 lg:col-span-3"
                >
                    <div>
                    <h3 className="text-lg text-black font-medium tracking-tight">
                        Todas las paginas
                    </h3>
                    <ul role="list" className="mt-4 space-y-1">
                        <li>
                        <a href="/" className="hover:text-black">Pagina principal</a>
                        </li>
                        <li>
                        <a href="/faq" className="hover:text-black">Freguntas frecuentes</a>
                        </li>
                        <li>
                        <a href="/terms" className="hover:text-black">Acerca de nosostros</a>
                        </li>
                        <li>
                        <a href="/privacy" className="hover:text-black">Creditos</a>
                        </li>
                        <li>
                        <a href="/signup" className="hover:text-black">Registro</a>
                        </li>
                        <li>
                        <a href="/signup" className="hover:text-black">Inicio de sesion</a>
                        </li>
                    </ul>
                    </div>
                    <div className="mt-12 md:mt-0">
                    <h3 className="text-lg text-black font-medium tracking-tight">
                        Recursos
                    </h3>
                    <ul role="list" className="mt-4 space-y-1">
                        <li>
                        <a
                            href="https://github.com/michael-andreuzza/astrosaas"
                            className="hover:text-black"
                        >
                            GitHub repo
                        </a>
                        </li>
                    </ul>
                    </div>

                    
                    <div className="mt-12 md:mt-0">
                    <h3 className="text-lg text-black font-medium tracking-tight">Mas redes</h3>
                    <ul role="list" className="mt-4 space-y-1">
                        <li>
                        <a href="https://www.uv.mx/" className="hover:text-black">
                            Universidad Veracruzana
                        </a>
                        </li>
                        <li>
                        <a href="https://www.uv.mx/cadixal/" className="hover:text-black">
                            Centro de autoacceso
                        </a>
                        </li>
                    </ul>
                    </div>

                    <div className="mt-12 md:mt-0">
                    <p className="text-2xl font-bold text-purple-500">8 de marzo</p>
                    <img className="w-1/6"  src="../public/corazon.png" alt="corazon" />
                    </div>
                </div>
                </div>
            </div>
            </footer>
    );
}

export default Footer;