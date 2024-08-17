import React from "react";
import TransitionText from './Transitions/TransitionText'
import TransitionComponent from './Transitions/TransitionComponent'

function PaginaPrincipal() {
  return (
    <div>
      <div className="mx-auto w-full lg:px-24 max-w-7xl md:px-12 items-center px-8 py-24 scroll-mt-12">
        <div className="mx-auto max-w-xl text-center">
          <div>
            <TransitionText>
              <p className="text-4xl tracking-tight font-medium text-black md:text-5xl font-display">
                En esta pagina podras agendar tus asesorias con nuestras maestros
                y maestras de idiomas
              </p>
            </TransitionText>
            <TransitionComponent>
              <p className="mt-4 text-lg text-na mx-auto tracking-tight text-gray-500">
                Con el apoyo de ellas podras seguir desarrollando tus habilidades
                en el idioma que desees.
              </p>
            </TransitionComponent>
          </div>
        </div>

            <section id="quees" className="flex py-12 px-4 text-center">
            <div className='grid max-w-5xl mx-auto md:grid-cols-2 px-3'>
              <div>
                <TransitionText>
                  <h1 className="text-4xl mb-4 font-bold">
                    ¿Que es este sistema?
                  </h1>
                </TransitionText>
                <TransitionComponent>
                  <p className="text-lg mb-4">
                    En el centro de idiomas contamos con maestros y maestras de
                    diferentes idiomas, los cuales te ayudaran a mejorar tus
                    habilidades en el idioma que desees.
                  </p>
                </TransitionComponent>
                <TransitionComponent>
                  <p className="text-lg mb-4">
                    Tan solo registrate e inicia sesion en el sistema y podras
                    agendar las asesorias como tambien ver que asesorias has
                    tenido y que tema fue.
                  </p>
                </TransitionComponent>
                <TransitionComponent>
                  <p className="text-lg">
                    Tambien si tienes una asesoria que es virtual en el sistema
                    podras consultar las ligas donde puedes entrar a la reunion
                    virtual.
                  </p>
                </TransitionComponent>
              </div>
              <TransitionText>
                <div className="w-full border-l  pl-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdPfh5HGMpB624KhKBj9PIO32cTcoBMXc3T3BMypRV4w&s"
                    alt="Bandera Ingles"
                    className="mb-4 p-4 h-40 w-auto"
                  />
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgLHyAHGXdTofBtGZfKH2HHrzvWuWC991MIEpKb91eSQ&s"
                    alt="Bandera de Francia"
                    className="mb-4 p-4 h-40"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/200px-Flag_of_Germany.svg.png"
                    alt="Bandera de Alemania"
                    className="mb-4 p-4 h-40"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Italy.svg/310px-Flag_of_Italy.svg.png"
                    alt="Bandera de italia"
                    className="mb-4 p-4 h-40"
                  />
                </div>
                </TransitionText>
              </div>
            </section>

            <section id="conocenos" className="py-12 px-4">
              <TransitionText>
                <h1 className="text-4xl mb-4 font-bold text-center">Conócenos</h1>
              </TransitionText>

              <div className="flex flex-col space-y-4">
                <TransitionComponent className="flex bg-white border rounded p-2 w-full shadow-lg transition duration-200 ease-in-out">
                  <img
                    src="/1.jpg"
                    alt="Imagen maestra Gabriela"
                    className="mr-2 h-40"
                  />
                  <div>
                    <p className="font-bold mb-1">
                      Mtra. Gabriela Jiménez Aguilar
                    </p>
                    <p className="text-gray-500 mb-2">Ingles</p>
                    <p className="text-gray-600">
                    Licenciatura en Idioma inglés. Maestría en Enseñanza del Inglés como Lengua Extranjera. 
                    Doctorado en Educación. Asesora de inglés en CAA del Centro de Idiomas Xalapa UV. 
                    Docente de Inglés. Investigador-Ponente. Coordinadora de la Academia de Comprensión de Textos. Responsable del CAA por 19 años.

                    </p>
                  </div>
                </TransitionComponent>

                <TransitionComponent className="flex border  bg-white rounded p-2 w-full shadow-lg transition duration-200 ease-in-out">
                  <TransitionText className="mr-2">
                    <p className="font-bold mb-1">Dra.María Roxana Rivera Ochoa</p>
                    <p className="text-gray-500 mb-2">Ingles</p>
                    <p className="text-gray-600">
                    Licenciatura en Idioma inglés. Licenciatura en Idioma francés. Maestría en Ciencias de la Educación.
                    Doctorado en Educación. Asesora de inglés en CAA del Centro de Idiomas Xalapa UV. Docente de Francés.
                    Investigador-Ponente. Coordinadora de la Academia Estatal de Francés. Responsable del CAA del CIX.
                    </p>
                  </TransitionText>
                  <img
                    src="/2.jpeg"
                    alt="Imagen doctora Roxana"
                    className="mr-2 h-40"
                  />
                </TransitionComponent>

                <TransitionComponent className="flex border bg-white rounded p-2 w-full shadow-lg transition duration-200 ease-in-out">
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
                </TransitionComponent>

                <TransitionComponent className="flex border bg-white rounded p-2 w-full shadow-lg transition duration-200 ease-in-out">
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
                </TransitionComponent>

                <TransitionComponent className="flex border bg-white rounded p-2 w-full shadow-lg transition duration-200 ease-in-out">
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
                </TransitionComponent>

                <TransitionComponent className="flex border bg-white rounded p-2 w-full shadow-lg transition duration-200 ease-in-out">
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
                </TransitionComponent>
              </div>
            </section>
          </div>
      <div class="fixed top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>
    </div>
  );
}

export default PaginaPrincipal;
