export function dias_entre_semana() {
  const hoy = new Date();
  const fechaDiaSemanaActual = new Date(hoy);
  const mes = (fechaDiaSemanaActual.getMonth() + 1).toString().padStart(2, '0');
  const dia = fechaDiaSemanaActual.getDate().toString().padStart(2, '0');
  
  const diasSemana = [
  {"dia":'Lunes ', "valor":'lunes'},
  {"dia":'Martes ', "valor":'martes'},
  {"dia":'Miercoles ', "valor":'miercoles'},
  {"dia":'Jueves ', "valor":'jueves'},
  {"dia":'Viernes ', "valor":'viernes'}];
  
  const diaSemana = hoy.getDay() ; 
  console.log("dia: " + diaSemana)// 0 para domingo, 1 para lunes, ..., 6 para sábado

  const diasSiguientes = [];
  
  if (diaSemana === 6 || diaSemana === 0 || diaSemana === 5) { // Si es sábado o domingo o viernes
    return diasSemana;
  } else { // Si es un día de entre semana
    for (let i = 0; i <= (4 - diaSemana); i++) {
      const diaIndex = (diaSemana + i) % 7;
      diasSiguientes.push(diasSemana[diaIndex]);
    }
  }

  console.log("dias entre semana"+ diasSiguientes)
  
  return diasSiguientes;
}

export function obtenerFechaDiaSemanaActual(nombreDiaSemana) {
  const diasSemana = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
  const hoy = new Date();
  const diaSemana = hoy.getDay(); // 0 para domingo, 1 para lunes, ..., 6 para sábado

  const indiceDia = diasSemana.findIndex(dia => dia === nombreDiaSemana);
  if (indiceDia === -1) {
    return obtenerFechaDiaSemanaActual('lunes');
  }

  let diferenciaDias = indiceDia - diaSemana + 1; // +1 porque los días de la semana comienzan en lunes en lugar de domingo
  if (diferenciaDias <= 0) {
    diferenciaDias += 7; // Si la diferencia de días es negativa, agrega 7 para obtener la fecha del mismo día de la semana en la próxima semana
  }

  const fechaDiaSemanaActual = new Date(hoy);
  fechaDiaSemanaActual.setDate(hoy.getDate() + diferenciaDias);

  const year = fechaDiaSemanaActual.getFullYear();
  const month = (fechaDiaSemanaActual.getMonth() + 1).toString().padStart(2, '0');
  const day = fechaDiaSemanaActual.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export function obtenerDiaMañana() {
  const diasSemana = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
  const hoy = new Date();
  const dia = hoy.getDay(); // 0 para domingo, 1 para lunes, etc.

  if(dia === 6 || dia === 0 || dia === 5)
    return 'lunes';

  return diasSemana[dia+1];
}

export function obtenerDiaHoy() {
  const diasSemana = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
  const hoy = new Date();
  const dia = hoy.getDay(); // 0 para domingo, 1 para lunes, etc.


  return diasSemana[dia];
}

export function obtenerMensaje(dia) {
  const diasSemana = ['lunes','martes', 'miércoles', 'jueves'];

  if (diasSemana.includes(dia.toLowerCase())) {
    return '*Los días mostrados son para agendar asesorias en esta semana';
  } else {
    return '*Los días mostrados son para agendar asesorias la semana próxima';
  }
}
