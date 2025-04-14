
const express = require('express');
const path = require('path');
const app = express();

// 讓 express 直接服務靜態檔案
app.use(express.static(__dirname));

// 首頁
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 啟動伺服器，監聽 PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`伺服器啟動囉，port: ${port}`);
});
