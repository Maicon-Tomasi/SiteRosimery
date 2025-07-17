function aplicarMascaraCPF(valor: string): string {
  return valor
    .replace(/\D/g, '') // remove tudo que não for número
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function aplicarMascaraTelefone(valor: string): string {
  return valor
    .replace(/\D/g, '') // remove tudo que não for número
    .replace(/^(\d{2})(\d)/, '($1) $2')       // (82) 
    .replace(/(\d{5})(\d{1,4})$/, '$1-$2');   // 98123-1016
}

function filtrarCaracteresEmail(valor: string): string {
  // remove espaços e acentos, opcional
  return valor.replace(/\s/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// function validarEmail(email: string): boolean {
//   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return regex.test(email);
// }

export {aplicarMascaraCPF, aplicarMascaraTelefone, filtrarCaracteresEmail}