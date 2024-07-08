import React from "react";

function PaginaPrincipal() {
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
            <div className="justify-center items-center flex p-4">
              <h1 className="text-4xl">Acesores del centro de idiomas</h1>
            </div>
            <div>
              <div className="grid gap-12 grid-cols-1 lg:space-y-0 lg:text-center md:grid-cols-3">
                <div>
                  <div>
                    <div className="items-center justify-center text-accent-500 bg-gray-100 rounded-xl flex h-20 w-20 lg:mx-auto">
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
                    <div className="items-center justify-center text-accent-500 bg-gray-100 rounded-xl flex h-20 w-20 lg:mx-auto">
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
                    <div className="items-center justify-center text-accent-500 bg-gray-100 rounded-xl flex h-20 w-20 lg:mx-auto">
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
                    <div className="items-center justify-center text-accent-500 bg-gray-100 rounded-xl flex h-20 w-20 lg:mx-auto">
                      <img src="/4.jpg" alt="Imagen maestra Kirina" />
                    </div>
                    <p className="mt-4 text-lg font-semibold leading-6 text-black font-display tracking-tight">
                      Mtra. Kirina Reyes Hernandez
                    </p>
                  </div>
                  <div className="mt-4 text-gray-500 text-sm">Frances</div>
                </div>
                <div>
                  <div>
                    <div className="items-center justify-center text-accent-500 bg-gray-100 rounded-xl flex h-20 w-20 lg:mx-auto">
                      <img src="/5.jpeg" alt="Imagen maestra Victoria" />
                    </div>
                    <p className="mt-4 text-lg font-semibold leading-6 text-black font-display tracking-tight">
                      Mtra. Victoria Sanchez
                    </p>
                  </div>
                  <div className="mt-4 text-gray-500 text-sm">Italiano</div>
                </div>
                <div>
                  <div>
                    <div className="items-center justify-center text-accent-500 bg-gray-100 rounded-xl flex h-20 w-20 lg:mx-auto">
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
            <section id="quees" className="flex py-12 px-4 text-center">
              <div className="md:w-1/2 pr-4">
                <h1 className="text-4xl mb-4 font-bold">
                  ¿Que es este sistema?
                </h1>
                <p className="text-lg mb-4">
                  En el centro de idiomas contamos con maestros y maestras de
                  diferentes idiomas, los cuales te ayudaran a mejorar tus
                  habilidades en el idioma que desees.
                </p>
                <p className="text-lg mb-4">
                  Tan solo registrate e inicia sesion en el sistema y podras
                  agendar las asesorias como tambien ver que asesorias has
                  tenido y que tema fue.
                </p>
                <p className="text-lg">
                  Tambien si tienes una asesoria que es virtual en el sistema
                  podras consultar las ligas donde puedes entrar a la reunion
                  virtual.
                </p>
              </div>
              <div className="w-1/2 border-l pl-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdPfh5HGMpB624KhKBj9PIO32cTcoBMXc3T3BMypRV4w&s"
                  alt="Bandera Ingles"
                  className="hidden md:block mb-4 p-4 h-40"
                />
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgLHyAHGXdTofBtGZfKH2HHrzvWuWC991MIEpKb91eSQ&s"
                  alt="Bandera de Francia"
                  className="hidden md:block mb-4 p-4 h-40"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/200px-Flag_of_Germany.svg.png"
                  alt="Bandera de Alemania"
                  className="hidden md:block mb-4 p-4 h-40"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Italy.svg/310px-Flag_of_Italy.svg.png"
                  alt="Bandera de italia"
                  className="hidden md:block mb-4 p-4 h-40"
                />
              </div>
            </section>

            <section id="conocenos" className="py-12 px-4">
              <h1 className="text-4xl mb-4 font-bold text-center">Conócenos</h1>
              <div className="flex flex-col space-y-4">
                <div className="flex bg-white border rounded p-2 w-full shadow-lg transition duration-200 ease-in-out">
                  <img
                    src="/1.jpg"
                    alt="Imagen maestra Gabriela"
                    className="mr-2 h-40"
                  />
                  <div>
                    <p className="font-bold mb-1">
                      Mtra. Gabriela Jimenez Aguilar
                    </p>
                    <p className="text-gray-500 mb-2">Ingles</p>
                    <p className="text-gray-600">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quidem fugiat temporibus similique rerum vitae dolorem
                      magni reiciendis illum iusto. Eum similique omnis, officia
                      aut nisi nobis voluptates atque delectus quasi.
                    </p>
                  </div>
                </div>

                <div className="flex border  bg-white rounded p-2 w-full shadow-lg transition duration-200 ease-in-out">
                  <div className="mr-2">
                    <p className="font-bold mb-1">Dra. Roxana Rivera ochoa</p>
                    <p className="text-gray-500 mb-2">Ingles</p>
                    <p className="text-gray-600">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Laborum soluta, enim nobis similique quis iste omnis velit
                      quisquam architecto fuga deleniti nesciunt. Mollitia
                      tempora nostrum quas cupiditate asperiores modi corrupti.
                    </p>
                  </div>
                  <img
                    src="/2.jpeg"
                    alt="Imagen doctora Roxana"
                    className="mr-2 h-40"
                  />
                </div>

                <div className="flex border bg-white rounded p-2 w-full shadow-lg transition duration-200 ease-in-out">
                  <img
                    src="/3.jpg"
                    alt="Imagen doctora Eugenia"
                    className="mr-2 h-40"
                  />
                  <div>
                    <p className="font-bold mb-1">
                      Dra. Ma. Eugenia Castilla Villalobos
                    </p>
                    <p className="text-gray-500 mb-2">Ingles</p>
                    <p className="text-gray-600">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quidem fugiat temporibus similique rerum vitae dolorem
                      magni reiciendis illum iusto. Eum similique omnis, officia
                      aut nisi nobis voluptates atque delectus quasi.
                    </p>
                  </div>
                </div>

                <div className="flex border bg-white rounded p-2 w-full shadow-lg transition duration-200 ease-in-out">
                  <div className="mr-2">
                    <p className="font-bold mb-1">
                      Mtra. Kirina Reyes Hernandez
                    </p>
                    <p className="text-gray-500 mb-2">Frances</p>
                    <p className="text-gray-600">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Laborum soluta, enim nobis similique quis iste omnis velit
                      quisquam architecto fuga deleniti nesciunt. Mollitia
                      tempora nostrum quas cupiditate asperiores modi corrupti.
                    </p>
                  </div>
                  <img
                    src="/4.jpg"
                    alt="Imagen maestra Kirina"
                    className="mr-2 h-40"
                  />
                </div>

                <div className="flex border bg-white rounded p-2 w-full shadow-lg transition duration-200 ease-in-out">
                  <img
                    src="/5.jpeg"
                    alt="Imagen maestra Victoria"
                    className="mr-2 h-40"
                  />
                  <div>
                    <p className="font-bold mb-1">Mtra. Victoria Sanchez</p>
                    <p className="text-gray-500 mb-2">Italiano</p>
                    <p className="text-gray-600">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quidem fugiat temporibus similique rerum vitae dolorem
                      magni reiciendis illum iusto. Eum similique omnis, officia
                      aut nisi nobis voluptates atque delectus quasi.
                    </p>
                  </div>
                </div>

                <div className="flex border bg-white rounded p-2 w-full shadow-lg transition duration-200 ease-in-out">
                  <div className="mr-2">
                    <p className="font-bold mb-1">Mtra. Josefina Tapia</p>
                    <p className="text-gray-500 mb-2">Aleman</p>
                    <p className="text-gray-600">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Laborum soluta, enim nobis similique quis iste omnis velit
                      quisquam architecto fuga deleniti nesciunt. Mollitia
                      tempora nostrum quas cupiditate asperiores modi corrupti.
                    </p>
                  </div>
                  <img
                    src="/6.jpeg"
                    alt="Imagen maestra Josefina"
                    className="mr-2 h-40"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <div class="fixed top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>
    </div>
  );
}

export default PaginaPrincipal;
