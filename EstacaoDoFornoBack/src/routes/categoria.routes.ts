import { Router } from 'express'
import CategoriaController from '../controllers/categoria.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const categoriaRouter = Router()

categoriaRouter.get('/', CategoriaController.findAll)
categoriaRouter.get('/:id', authMiddleware, CategoriaController.getById)
categoriaRouter.post('/', authMiddleware, CategoriaController.create)
categoriaRouter.put('/:id', authMiddleware, CategoriaController.update)
categoriaRouter.delete('/:id', authMiddleware, CategoriaController.remove)

export default categoriaRouter