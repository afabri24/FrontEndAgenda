

export function es_valido_email(email) {
    const regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return regexEmail.test(email);
}

export function es_valido_password(password){
    const regexPassword = /^.{8,16}$/
    return regexPassword.test(password)
}

export function es_valido_matricula(matricula){
    const regexMatricula = /S\d{8,8}/
    return regexMatricula.test(matricula)
}