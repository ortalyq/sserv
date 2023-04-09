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
    <form class="hhh" id="myForm" action="/data" method="post"> <!-- Исправлено: добавлен атрибуты action и method для отправки формы -->
      <!-- Поле названия -->
      <label for="name">Название:</label>
      <input type="text" id="name" name="title" required>

      <!-- Поле текста адаптивного размера -->
      <label for="text">Не туралы:</label>
      <textarea id="text" name="content" rows="4" cols="50" required></textarea>

      <!-- Список -->
      <label for="list">Список:</label>
      <select name="labels">
        <option value="Ұсыныс">Ұсыныс</option>
        <option value="Жаңалық">Жаңалық</option>
        <option value="Тапсырма">Тапсырма</option>
      </select>

      <!-- Кнопка отправки формы -->
      <input type="submit" value="Отправить">
    </form>
  `);
});

app.post('/data', (req, res) => {
  const base = req.body;
  io.emit('send', base);
  res.send('Сіздің ұсынсыңыз сақталды!'); // Исправлено: убрана лишняя буква "e"
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
