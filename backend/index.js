const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/test', (req, res, next) => {
    try {
        res.status(200).json({ message: "Success!"});
    } catch (err) {
        next(err);
    }
});

app.get('/users', async (req, res, next) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
});

app.get('/users/:id', async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(req.params.id) },
        });
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
});

app.post('/users', async (req, res, next) => {
    try {
        const user = await prisma.user.create({
            data: { ...req.body },
        });
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
});

app.put('/users/:id', async (req, res) => {
    try {
        const user = await prisma.user.update({
            where: { id: Number(req.params.id) },
            data: { ...req.body },
        });
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

app.delete('/users/:id', async (req, res, next) => {
    try {
        const user = await prisma.user.delete({
            where: { id: Number(req.params.id) },
        });
        res.status(200).json(user);
    } catch (error) {
        next(err);
    }
});

const Port = process.env.port || 4000;
app.listen(Port, () => console.log(`Server running on port ${Port}`));