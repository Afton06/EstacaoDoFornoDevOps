import { Request, Response } from 'express'
import prisma from '../prisma'

class ProdutoController {
  static async findAll(req: Request, res: Response) {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  const [produtos, total] = await Promise.all([
    prisma.produto.findMany({
      skip,
      take: limit,
      include: { categoria: true }
    }),
    prisma.produto.count()
  ])

  return res.status(200).json({
    dados: produtos,
    total,
    pagina: page,
    totalPaginas: Math.ceil(total / limit)
  })
}

  static async getById(req: Request, res: Response) {
    const id = String(req.params.id)
    const produto = await prisma.produto.findUnique({
      where: { id },
      include: { categoria: true }
    })

    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' })
    }

    return res.status(200).json(produto)
  }

  static async create(req: Request, res: Response) {
    const { nome, descricao, preco, imagem, destaque, categoriaId } = req.body

    if (!nome || nome === '') {
      return res.status(400).json({ message: 'Nome é obrigatório' })
    }

    if (!descricao || descricao === '') {
      return res.status(400).json({ message: 'Descrição é obrigatória' })
    }

    if (!preco) {
      return res.status(400).json({ message: 'Preço é obrigatório' })
    }

    if (!categoriaId || categoriaId === '') {
      return res.status(400).json({ message: 'Categoria é obrigatória' })
    }

    const categoria = await prisma.categoria.findUnique({
      where: { id: categoriaId }
    })

    if (!categoria) {
      return res.status(404).json({ message: 'Categoria não encontrada' })
    }

    const produto = await prisma.produto.create({
      data: { nome, descricao, preco, imagem, destaque, categoriaId }
    })

    return res.status(201).json(produto)
  }

  static async update(req: Request, res: Response) {
    const id = String(req.params.id)
    const { nome, descricao, preco, imagem, destaque, ativo, categoriaId } = req.body

    const produto = await prisma.produto.findUnique({ where: { id } })

    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' })
    }

    const atualizado = await prisma.produto.update({
      where: { id },
      data: { nome, descricao, preco, imagem, destaque, ativo, categoriaId }
    })

    return res.status(200).json(atualizado)
  }

  static async remove(req: Request, res: Response) {
    const id = String(req.params.id)

    const produto = await prisma.produto.findUnique({ where: { id } })

    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' })
    }

    await prisma.produto.delete({ where: { id } })

    return res.status(204).send()
  }
}

export default ProdutoController