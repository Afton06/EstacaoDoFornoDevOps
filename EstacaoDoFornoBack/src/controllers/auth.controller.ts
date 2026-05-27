import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../prisma'
import { validarEmail } from '../utils/validacoes'

class AuthController {
    static async login(req: Request, res: Response) {
        const { email, senha } = req.body

        if (!email || email === '') {
            return res.status(400).json({ message: 'Email é obrigatório' })
        }

        if (!validarEmail(email)) {
            return res.status(400).json({ message: 'Email inválido' })
        }

        if (!senha || senha === '') {
            return res.status(400).json({ message: 'Senha é obrigatória' })
        }

        const usuario = await prisma.usuario.findUnique({ where: { email } })

        if (!usuario) {
            return res.status(401).json({ message: 'Email ou senha inválidos' })
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha)

        if (!senhaValida) {
            return res.status(401).json({ message: 'Email ou senha inválidos' })
        }

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            process.env.JWT_SECRET as string,
            { expiresIn: '8h' }
        )

        return res.status(200).json({
            message: 'Login realizado com sucesso',
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                isAdmin: usuario.isAdmin
            }
        })
    }
}

export default AuthController 