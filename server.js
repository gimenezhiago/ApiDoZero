import express from 'express'
import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()

app.use(express.json())

const users = []

//Pegar
app.get('/usuarios', (req, res) => {
    res.status(200).json(users)
} )

//Criar
app.post('/usuarios', async (req, res) => {
    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
    res.status(201).json(req.body)
})

//Atualizar



//Deletar

//Porta
const porta = process.env.PORTA
app.listen(porta)

console.log('Servidor rodando')