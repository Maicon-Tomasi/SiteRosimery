const padZero = (num: number) => num.toString().padStart(2, '0');

const formatDate = (dateString: Date) => {
  const data = new Date(dateString);
  const dia = padZero(data.getDate());
  const mes = padZero(data.getMonth() + 1);
  const ano = data.getFullYear();
  const horas = padZero(data.getHours());
  const minutos = padZero(data.getMinutes());
  const segundos = padZero(data.getSeconds());

  return `${dia}-${mes}-${ano} ${horas}:${minutos}:${segundos}`;
};

const calculaIdadePaciente = (dataNascimento: Date | string): number => {
  const nascimento = new Date(dataNascimento); // converte string para Date se necessário
  const hoje = new Date();

  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mesAtual = hoje.getMonth();
  const diaAtual = hoje.getDate();

  const mesNascimento = nascimento.getMonth();
  const diaNascimento = nascimento.getDate();

  if (
    mesAtual < mesNascimento ||
    (mesAtual === mesNascimento && diaAtual < diaNascimento)
  ) {
    idade--;
  }

  return idade;
};



export {formatDate, calculaIdadePaciente}