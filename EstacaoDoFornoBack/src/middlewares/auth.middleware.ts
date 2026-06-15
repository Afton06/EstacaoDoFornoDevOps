import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { UsuarioPayload } from '../types'

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ message: 'Token não informado' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as UsuarioPayload
    req.body = req.body || {}  // ← garante que body existe
    req.body.usuarioId = decoded.id
    next()
  } catch {
    return res.status(401).json({ message: 'Token inválido ou expirado' })
  }
}