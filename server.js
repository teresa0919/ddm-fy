
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;

// 提供靜態資源 (CSS、JS、HTML)
app.use(express.static(__dirname));

// 首頁
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 啟動伺服器
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
