import express, { Express, Request, Response } from "express";
import fs from "fs";

const app: Express = express();
const port: number = 3001;

const server = app.listen(port, () => console.log('[server]: Server is running. Good!'))

import { Server } from "socket.io";
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
    let data = JSON.parse(fs.readFileSync('../data.json', { encoding: 'utf8' }))
    console.log('[client]: connected!')
    socket.emit('getTasks', data)
    socket.on('addTask', (type, value) => {
        if(type == 'planned') data.planned.push(value)
        if(type == 'making') data.making.push(value)
        if(type == 'completed') data.completed.push(value)
        fs.writeFileSync('../data.json', JSON.stringify(data))
    })
    socket.on('deleteTask', (type, index) => {
        if(type == 'planned') data.planned = data.planned.filter((_: null, i: number) => i != index)
        if(type == 'making') data.making = data.making.filter((_: null, i: number) => i != index)
        if(type == 'completed') data.completed = data.completed.filter((_: null, i: number) => i != index)
        fs.writeFileSync('../data.json', JSON.stringify(data))
    })
    socket.on('saveNote', (value) => {
        data.notes = value
        fs.writeFileSync('../data.json', JSON.stringify(data))
    })
})