const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <h1>Форма</h1>
    <form action="/data" method="post">
      <input type="text" name="username" placeholder="Имя пользователя">
      <input type="email" name="email" placeholder="Email">
      <input type="submit" value="Отправить">
    </form>
  `);
});

app.post('/data', (req, res) => {
  const base = req.body;
  io.emit('send', base);
  res.send('Сіздің ұсынсыңыз сақталды! e')
});

io.on('connection', (socket) => {
  console.log('Клиент подключился');

  socket.on('disconnect', () => {
    console.log('Клиент отключился');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
