import request from 'supertest'
import app from '../app'

let token: string
let usuarioId: string
let categoriaId: string

const timestamp = Date.now()
const emailTeste = `teste${timestamp}@estacaodoforno.com`

describe('Teste de integração - Autenticação', () => {

  test('POST /usuarios - cadastrar usuário válido deve retornar 201', async () => {
    const result = await request(app).post('/usuarios').send(
      {
        nome: 'Usuário Teste',
        email: emailTeste,
        senha: 'Senha@123',
        cpf: '35983680080'
      }
    )
    expect(result.statusCode).toEqual(201)
    expect(result.body).toHaveProperty('id')
    expect(result.body).toHaveProperty('email', emailTeste)
    expect(result.body).not.toHaveProperty('senha')
    usuarioId = result.body.id
  })

  test('POST /usuarios - email duplicado deve retornar 400', async () => {
  const result = await request(app).post('/usuarios').send({
    nome: 'Usuário Teste',
    email: emailTeste,
    senha: 'Senha@123',
    cpf: '52998224725'
  })
  expect(result.statusCode).toEqual(400)
  expect(result.body).toHaveProperty('message', 'Email já cadastrado')
})

  test('POST /usuarios - email inválido deve retornar 400', async () => {
    const result = await request(app).post('/usuarios').send({
      nome: 'Teste',
      email: 'emailinvalido',
      senha: 'Senha@123',
      cpf: '11111111111'
    })
    expect(result.statusCode).toEqual(400)
    expect(result.body).toHaveProperty('message', 'Email inválido')
  })

  test('POST /usuarios - senha fraca deve retornar 400', async () => {
    const result = await request(app).post('/usuarios').send({
      nome: 'Teste',
      email: 'outro@email.com',
      senha: '123456',
      cpf: '71683372062'
    })
    expect(result.statusCode).toEqual(400)
  })

  test('POST /usuarios - CPF inválido deve retornar 400', async () => {
    const result = await request(app).post('/usuarios').send({
      nome: 'Teste',
      email: 'outro@email.com',
      senha: 'Senha@123',
      cpf: '11111111111'
    })
    expect(result.statusCode).toEqual(400)
    expect(result.body).toHaveProperty('message', 'CPF inválido')
  })

  test('POST /auth/login - login válido deve retornar 200 e token', async () => {
    const result = await request(app).post('/auth/login').send(
      {
        email: emailTeste,
        senha: 'Senha@123'
      }
    )
    expect(result.statusCode).toEqual(200)
    expect(result.body).toHaveProperty('token')
    expect(result.body).toHaveProperty('usuario')
    expect(result.body.usuario).not.toHaveProperty('senha')
    token = result.body.token
  })

  test('POST /auth/login - credenciais erradas deve retornar 401', async () => {
    const result = await request(app).post('/auth/login').send({
      email: 'teste@estacaodoforno.com',
      senha: 'SenhaErrada@123'
    })
    expect(result.statusCode).toEqual(401)
    expect(result.body).toHaveProperty('message', 'Email ou senha inválidos')
  })

  test('POST /auth/login - sem dados deve retornar 400', async () => {
    const result = await request(app).post('/auth/login').send({})
    expect(result.statusCode).toEqual(400)
  })

})

describe('Teste de integração - Categorias', () => {

  test('GET /categorias - sem token deve retornar 401', async () => {
    const result = await request(app).get('/categorias')
    expect(result.statusCode).toEqual(401)
  })

  test('GET /categorias - com token deve retornar 200', async () => {
    const result = await request(app)
      .get('/categorias')
      .set('Authorization', `Bearer ${token}`)
    expect(result.statusCode).toEqual(200)
    expect(result.body).toHaveProperty('dados')
    expect(result.body).toHaveProperty('total')
    expect(result.body).toHaveProperty('pagina')
    expect(result.body).toHaveProperty('totalPaginas')
  })

  test('POST /categorias - criar categoria válida deve retornar 201', async () => {
    const result = await request(app)
      .post('/categorias')
      .set('Authorization', `Bearer ${token}`)
      .send({ descricao: 'Bolos de Teste' })
    expect(result.statusCode).toEqual(201)
    expect(result.body).toHaveProperty('id')
    expect(result.body).toHaveProperty('descricao', 'Bolos de Teste')
    categoriaId = result.body.id
  })

  test('POST /categorias - sem descrição deve retornar 400', async () => {
    const result = await request(app)
      .post('/categorias')
      .set('Authorization', `Bearer ${token}`)
      .send({})
    expect(result.statusCode).toEqual(400)
  })

  test('GET /categorias/:id - buscar categoria existente deve retornar 200', async () => {
    const result = await request(app)
      .get(`/categorias/${categoriaId}`)
      .set('Authorization', `Bearer ${token}`)
    expect(result.statusCode).toEqual(200)
    expect(result.body).toHaveProperty('id', categoriaId)
  })

  test('GET /categorias/:id - categoria inexistente deve retornar 404', async () => {
    const result = await request(app)
      .get('/categorias/id-que-nao-existe')
      .set('Authorization', `Bearer ${token}`)
    expect(result.statusCode).toEqual(404)
  })

  test('PUT /categorias/:id - editar categoria deve retornar 200', async () => {
    const result = await request(app)
      .put(`/categorias/${categoriaId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ descricao: 'Bolos Editados', ativo: true })
    expect(result.statusCode).toEqual(200)
    expect(result.body).toHaveProperty('descricao', 'Bolos Editados')
  })

  test('DELETE /categorias/:id - deletar categoria deve retornar 204', async () => {
    const result = await request(app)
      .delete(`/categorias/${categoriaId}`)
      .set('Authorization', `Bearer ${token}`)
    expect(result.statusCode).toEqual(204)
  })

  test('DELETE /categorias/:id - deletar inexistente deve retornar 404', async () => {
    const result = await request(app)
      .delete(`/categorias/${categoriaId}`)
      .set('Authorization', `Bearer ${token}`)
    expect(result.statusCode).toEqual(404)
  })

})

describe('Teste de integração - Usuários', () => {

  test('GET /usuarios - com token deve retornar 200', async () => {
    const result = await request(app)
      .get('/usuarios')
      .set('Authorization', `Bearer ${token}`)
    expect(result.statusCode).toEqual(200)
    expect(result.body).toHaveProperty('dados')
    expect(result.body).toHaveProperty('total')
  })

  test('GET /usuarios/:id - buscar usuário existente deve retornar 200', async () => {
    const result = await request(app)
      .get(`/usuarios/${usuarioId}`)
      .set('Authorization', `Bearer ${token}`)
    expect(result.statusCode).toEqual(200)
    expect(result.body).not.toHaveProperty('senha')
  })

  test('GET /usuarios/:id - usuário inexistente deve retornar 404', async () => {
    const result = await request(app)
      .get('/usuarios/id-que-nao-existe')
      .set('Authorization', `Bearer ${token}`)
    expect(result.statusCode).toEqual(404)
  })

  test('PUT /usuarios/:id - editar próprio usuário deve retornar 200', async () => {
    const result = await request(app)
      .put(`/usuarios/${usuarioId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        nome: 'Usuário Editado',
        cpf: '71683372062',
        senha: 'Senha@456'
      })
    expect(result.statusCode).toEqual(200)
    expect(result.body).toHaveProperty('nome', 'Usuário Editado')
    expect(result.body).not.toHaveProperty('senha')
  })

  test('DELETE /usuarios/:id - deletar próprio usuário deve retornar 204', async () => {
    const result = await request(app)
      .delete(`/usuarios/${usuarioId}`)
      .set('Authorization', `Bearer ${token}`)
    expect(result.statusCode).toEqual(204)
  })

})