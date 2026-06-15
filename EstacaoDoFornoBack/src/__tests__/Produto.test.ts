import { Produto } from '../models/Produto'

describe('Teste da classe Produto', () => {

  test('Calcular desconto de 10%', () => {
    const produto = new Produto('Brownie de Chocolate', 10)
    expect(produto.calcularDesconto(10)).toBe(9)
  })

  test('Calcular desconto de 50%', () => {
    const produto = new Produto('Bolo de Cenoura', 20)
    expect(produto.calcularDesconto(50)).toBe(10)
  })

  test('Erro ao passar desconto negativo', () => {
    const produto = new Produto('Cookie', 5)
    expect(() => produto.calcularDesconto(-10)).toThrow('Percentual de desconto deve estar entre 0 e 100.')
  })

  test('Erro ao passar desconto acima de 100', () => {
    const produto = new Produto('Brigadeiro', 3)
    expect(() => produto.calcularDesconto(150)).toThrow('Percentual de desconto deve estar entre 0 e 100.')
  })

  test('Retornar nome do produto', () => {
    const produto = new Produto('Torta de Limão', 15)
    expect(produto.getNome()).toBe('Torta de Limão')
  })

  test('Retornar preço do produto', () => {
    const produto = new Produto('Torta de Limão', 15)
    expect(produto.getPreco()).toBe(15)
  })

})