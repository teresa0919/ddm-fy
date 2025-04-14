const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

// 靜態檔案 (CSS、JS、HTML)
app.use(express.static(__dirname));

// 根目錄打開 index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 啟動 server，並且監聽 PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});