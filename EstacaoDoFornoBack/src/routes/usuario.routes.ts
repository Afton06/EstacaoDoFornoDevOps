import { Router } from 'express'
import UsuarioController from '../controllers/usuario.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const usuarioRouter = Router()

usuarioRouter.post('/', UsuarioController.create)
usuarioRouter.get('/', authMiddleware, UsuarioController.findAll)
usuarioRouter.get('/:id', authMiddleware, UsuarioController.getById)
usuarioRouter.put('/:id', authMiddleware, UsuarioController.update)
usuarioRouter.delete('/:id', authMiddleware, UsuarioController.remove)

export default usuarioRouter