const express = require('express');
const path = require('path');

const app = express();

const { PORT = 4200, PUBLIC_PATH = '../dist' } = process.env
const publicPath = path.resolve(__dirname, PUBLIC_PATH);

app.use(express.static(publicPath));

app.get('*', (_, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
