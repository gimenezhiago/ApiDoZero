import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()

app.use(express.json())
app.use(cors())

//Pegar
app.get('/usuarios', async (req, res) => {
    let users = []
    if (req.query) {
        users = await prisma.user.findMany({ //localhost:4321/usuarios?name=Hiago
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        })
    } else {
        users = await prisma.user.findMany()
    }
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
app.put('/usuarios/:id', async (req, res) => {
    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
    res.status(201).json(req.body)
})

//Deletar
app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({message: "Usuário deletado"})
})

//Porta
const porta = process.env.PORTA
app.listen(porta)

console.log('Servidor rodando')