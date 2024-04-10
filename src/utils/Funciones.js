export function dias_entre_semana() {
  const diasSemana = [{"dia":'Lunes', "valor":'lunes'},{"dia":'Martes', "valor":'martes'},
  {"dia":'Miércoles', "valor":'miercoles'},{"dia":'Jueves', "valor":'jueves'},
  {"dia":'Viernes', "valor":'viernes'}];
  const hoy = new Date();
  const diaSemana = hoy.getDay() ; 
  console.log("dia: " + diaSemana)// 0 para domingo, 1 para lunes, ..., 6 para sábado

  const diasSiguientes = [];
  
  if (diaSemana === 6 || diaSemana === 0) { // Si es sábado o domingo
    for (let i = 1; i < 6; i++) {
      diasSiguientes.push(diasSemana[i]);
    }
  } else { // Si es un día de entre semana
    for (let i = 0; i <= (4 - diaSemana); i++) {
      const diaIndex = (diaSemana + i) % 7;
      diasSiguientes.push(diasSemana[diaIndex]);
    }
  }
  
  return diasSiguientes;
}

export function obtenerFechaDiaSemanaActual(nombreDiaSemana) {
  const diasSemana = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const hoy = new Date();
  const diaSemana = hoy.getDay(); // 0 para domingo, 1 para lunes, ..., 6 para sábado

  const indiceDia = diasSemana.findIndex(dia => dia === nombreDiaSemana.toLowerCase());
  if (indiceDia === -1) {
    throw new Error('El nombre del día de la semana no es válido.');
  }

  const diferenciaDias = indiceDia - diaSemana;
  const fechaDiaSemanaActual = new Date(hoy);
  fechaDiaSemanaActual.setDate(hoy.getDate() + diferenciaDias);

  const year = fechaDiaSemanaActual.getFullYear();
  const month = (fechaDiaSemanaActual.getMonth() + 1).toString().padStart(2, '0');
  const day = fechaDiaSemanaActual.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};