
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

// Firebase 設定
const firebaseConfig = {
  apiKey: "AIzaSyBU1AYuZzvZC1eW4nllG5qCAvcKXT90sg0",
  authDomain: "ddm-fy.firebaseapp.com",
  databaseURL: "https://ddm-fy-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ddm-fy",
  storageBucket: "ddm-fy.firebasestorage.app",
  messagingSenderId: "439647437849",
  appId: "1:439647437849:web:b195f3e4d316d417969688"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 打卡寫入函式
export function checkIn(nickname, sutra, count) {
  const dateKey = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const data = {
    nickname,
    sutra,
    count: parseInt(count) || 1
  };
  const refPath = ref(db, 'checkins/' + dateKey);
  return push(refPath, data);
}
