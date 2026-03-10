// server.js
const express = require('express');
const os = require('os');

const app = express();
const port = process.env.PORT || 3000;

// トップページ
app.get('/', (req, res) => {
  res.send(`
    <h1>Hello from Node.js on Docker!</h1>
    <p>Running on host: ${os.hostname()}</p>
    <p>Base image: ${process.env.BASE_IMAGE || 'unknown'}</p>
  `);
});

// ヘルスチェック用
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});