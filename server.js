const express = require('express');
const path = require('path');
const app = express();

// 把整個資料夾公開
app.use(express.static(__dirname));

// 首頁導向 index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 這裡抓 Render 給的 Port，不然就用 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});