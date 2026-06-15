export function validarEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export function validarCPF(cpf: string): boolean {
  const cpfLimpo = cpf.replace(/[.\-]/g, '')

  if (cpfLimpo.length !== 11) return false
  if (/^(\d)\1+$/.test(cpfLimpo)) return false

  let soma = 0
  for (let i = 0; i < 9; i++) {
    soma += Number(cpfLimpo[i]) * (10 - i)
  }
  let digito1 = (soma * 10) % 11
  if (digito1 === 10 || digito1 === 11) digito1 = 0
  if (digito1 !== Number(cpfLimpo[9])) return false

  soma = 0
  for (let i = 0; i < 10; i++) {
    soma += Number(cpfLimpo[i]) * (11 - i)
  }
  let digito2 = (soma * 10) % 11
  if (digito2 === 10 || digito2 === 11) digito2 = 0
  if (digito2 !== Number(cpfLimpo[10])) return false

  return true
}

export function validarSenha(senha: string): boolean {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  return regex.test(senha)
}   