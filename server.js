
const express = require('express');
const app = express();
const path = require('path');

// 把當前資料夾設為靜態檔案目錄
app.use(express.static(__dirname));

// 首頁路由：送出 index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 讓 Render 或本地環境可以自動選 Port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
