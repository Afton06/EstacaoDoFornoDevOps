import express from 'express'
import cors from 'cors'
import categoriaRouter from './routes/categoria.routes'
import produtoRouter from './routes/produto.routes'
import usuarioRouter from './routes/usuario.routes'
import authRouter from './routes/auth.routes'

const app = express()

app.use(cors({
  origin: 'http://localhost:3000'
}))

app.use(express.json())

app.use('/categorias', categoriaRouter)
app.use('/produtos', produtoRouter)
app.use('/usuarios', usuarioRouter)
app.use('/auth', authRouter)

export default app