
import React, { useState } from "react";

function Faq() {
    const [openIndex, setOpenIndex] = useState(null);
  
    const questions = [
      { title: '¿Que necesito para mi registro?', answer: 'Necesitas tu nombre, matricula, correo electronico y una contraseña' },
      { title: '¿Que como agrego la ', answer: 'Respuesta a la pregunta 2.' },
        { title: 'Pregunta 3', answer: 'Respuesta a la pregunta 3.' },
        { title: 'Pregunta 4', answer: 'Respuesta a la pregunta 4.' },
        { title: 'Pregunta 5', answer: 'Respuesta a la pregunta 5.' },
        { title: 'Pregunta 6', answer: 'Respuesta a la pregunta 6.' },
        { title: 'Pregunta 7', answer: 'Respuesta a la pregunta 7.' },
        { title: 'Pregunta 8', answer: 'Respuesta a la pregunta 8.' },
        { title: 'Pregunta 9', answer: 'Respuesta a la pregunta 9.' },
        { title: 'Pregunta 10', answer: 'Respuesta a la pregunta 10.' },
        
      // Agrega más preguntas aquí
    ];
  
    return (
      <div className="flex flex-col items-center justify-center space-y-4 h-screen">
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