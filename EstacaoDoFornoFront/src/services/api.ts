const BASE_URL = process.env.REACT_APP_API_URL

async function requisicao<T>(
  endpoint: string,
  opcoes: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('token')

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(opcoes.headers || {}),
  }

  const resposta = await fetch(`${BASE_URL}${endpoint}`, {
    ...opcoes,
    headers,
  })

  if (resposta.status === 204) {
    return undefined as T
  }

  const contentType = resposta.headers.get('Content-Type') || ''
  if (!contentType.includes('application/json')) {
    throw new Error(`Erro: Desculpe, ocorreu um erro inesperado.`)
  }

  const dados = await resposta.json()

  if (!resposta.ok) {
    throw new Error(dados.message || 'Erro inesperado')
  }

  return dados as T
}

export default requisicao