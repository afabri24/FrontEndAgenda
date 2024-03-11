import Card from "./Card";

function App() {
  return (
    <div>
      <div className="mx-auto w-full lg:px-24 max-w-7xl md:px-12 items-center px-8 py-24 scroll-mt-12">
        <div className="mx-auto max-w-xl text-center">
          <div>
            <p className="text-4xl tracking-tight font-medium text-black md:text-5xl font-display">
              En esta pagina podras agendar tus asesorias con nuestras maestros
              y maestras de idiomas
            </p>
            <p className="mt-4 text-lg text-na mx-auto tracking-tight text-gray-500">
              Con el apoyo de ellas podras seguir desarrollando tus habilidades
              en el idioma que desees.
            </p>
          </div>
        </div>
        <div>
          <div className="mx-auto max-w-7xl pt-12">
            <h2 className="sr-only">Acesores</h2>
            <div>
              <div className="grid gap-12 grid-cols-1 lg:space-y-0 lg:text-center md:grid-cols-3">
                <div>
                  <div>
                    <div className="items-center justify-center text-accent-500 bg-gray-100 rounded-xl flex h-10 w-10 lg:mx-auto">
                      <img src="/1.jpg" alt="Imagen maestra Gabriela" />
                    </div>
                    <p className="mt-4 text-lg font-semibold leading-6 text-black font-display tracking-tight">
                      Mtra. Gabriela Jimenez Aguilar
                    </p>
                  </div>
                  <div className="mt-4 text-gray-500 text-sm">Ingles</div>
                </div>
                <div>
                  <div>
                    <div className="items-center justify-center text-accent-500 bg-gray-100 rounded-xl flex h-10 w-10 lg:mx-auto">
                      <img src="/2.jpeg" alt="Imagen doctora Roxana" />
                    </div>
                    <p className="mt-4 text-lg font-semibold leading-6 text-black font-display tracking-tight">
                      Dra. Ma. Roxana Rivera Ochoa
                    </p>
                  </div>
                  <div className="mt-4 text-gray-500 text-sm">Ingles</div>
                </div>
                <div>
                  <div>
                    <div className="items-center justify-center text-accent-500 bg-gray-100 rounded-xl flex h-10 w-10 lg:mx-auto">
                      <img src="/3.jpg" alt="Imagen doctora Eugenia" />
                    </div>
                    <p className="mt-4 text-lg font-semibold leading-6 text-black font-display tracking-tight">
                      Dra. Ma. Eugenia Castilla Villalobos
                    </p>
                  </div>
                  <div className="mt-4 text-gray-500 text-sm">Ingles</div>
                </div>
                <div>
                  <div>
                    <div className="items-center justify-center text-accent-500 bg-gray-100 rounded-xl flex h-10 w-10 lg:mx-auto">
                      <img
                        src="/4.jpg"
                        alt="Imagen maestra Kirina"
                        className=""
                      />
                    </div>
                    <p className="mt-4 text-lg font-semibold leading-6 text-black font-display tracking-tight">
                      Mtra. Kirina Reyes Hernandez
                    </p>
                  </div>
                  <div className="mt-4 text-gray-500 text-sm">Frances</div>
                </div>
                <div>
                  <div>
                    <div className="items-center justify-center text-accent-500 bg-gray-100 rounded-xl flex h-10 w-10 lg:mx-auto">
                      <img src="/5.jpeg" alt="Imagen maestra Victoria" />
                    </div>
                    <p className="mt-4 text-lg font-semibold leading-6 text-black font-display tracking-tight">
                      Mtra. Victoria Sanchez
                    </p>
                  </div>
                  <div className="mt-4 text-gray-500 text-sm">italiano</div>
                </div>
                <div>
                  <div>
                    <div className="items-center justify-center text-accent-500 bg-gray-100 rounded-xl flex h-10 w-10 lg:mx-auto">
                      <img src="/6.jpeg" alt="Imagen maestra Josefina" />
                    </div>
                    <p className="mt-4 text-lg font-semibold leading-6 text-black font-display tracking-tight">
                      Mtra. Josefina Tapia
                    </p>
                  </div>
                  <div className="mt-4 text-gray-500 text-sm">Aleman</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {<Card
        title="Aseroria ingles Basico 1"
        description="Tema: Presente Simple"
        date="11/03/2024"
      />} */}
    </div>
  );
}

export default App;
