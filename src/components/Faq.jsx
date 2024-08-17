
import React, { useState } from "react";

function Faq() {
    const [openIndex, setOpenIndex] = useState(null);
  
    const questions = [
      { title: '¿Que necesito para mi registro?', answer: 'Necesitas tu nombre, matricula, correo electronico y una contraseña' },
      { title: '¿Que puedo hacer si olvide mi contraseña?', answer: 'Selecciona la opción en inicio de sesión "Olvide mi contraseña" e ingresa el correo electrónico con el que te registraste' },
        { title: '¿Como hago una asesoría?', answer: 'Primero debes ingresar al sistema y veras la opción de agregar una asesoría y seguirás unos pasos para registrar una asesoría a tu nombre' },
        { title: '¿Por que no puedo registrar mi asesoría para hoy?', answer: 'Por cuestiones de tiempos, no se puede registrar una asesoría 24 horas antes de hora de la asesoría' },
        { title: '¿Por que no me aparece el asesor de un idioma?', answer: 'Revisa si en tu perfil tienes registrado el idioma del asesor al que quieres acceder' },
        { title: 'Al momento de registrar una asesoria no puedo escoger un horario', answer: 'Solo puedes tener una asesoria al dia, si quieres registrar otro horario debes cancelar anteriormente la ya registrada' },
        { title: 'Tengo un error que no puedo se resuelve', answer: 'Por favor contacta con el soporte mandando un mensaje el error que tengas, tu nombre y matricula. ejemplodecorre@gmail.com' },

      // Agrega más preguntas aquí
    ];
  
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        {questions.map((question, index) => (
          <div key={index} className="w-full max-w-md p-4 bg-white rounded shadow">
            <div onClick={() => setOpenIndex(index === openIndex ? null : index)} className="cursor-pointer">
              <h2 className="text-xl font-bold">{question.title}</h2>
            </div>
            {openIndex === index && (
              <div className="mt-2">
                <p>{question.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

export default Faq;