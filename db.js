
// Firebase Realtime Database 版本
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "https://ddm-fy-default-rtdb.firebaseio.com",
  projectId: "ddm-fy",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// 儲存打卡資料：暱稱 + 經文 + 次數
async function saveCheckIn(nickname, sutra, count = 1) {
  const dateStr = new Date().toISOString().split('T')[0]; // 例如 2025-04-15
  const path = `checkins/${dateStr}/${nickname}/${sutra}`;

  const ref = database.ref(path);
  const snapshot = await ref.get();
  const prev = snapshot.exists() ? snapshot.val() : 0;

  await ref.set(prev + count);
}

// 查詢誦經統計（累加所有經文的次數）
async function getSutraStats() {
  const ref = database.ref('checkins');
  const snapshot = await ref.get();
  const stats = {};

  if (!snapshot.exists()) return stats;

  const data = snapshot.val();
  for (const date in data) {
    for (const nickname in data[date]) {
      for (const sutra in data[date][nickname]) {
        if (!stats[sutra]) stats[sutra] = 0;
        stats[sutra] += data[date][nickname][sutra];
      }
    }
  }

  return stats;
}

// 查詢某人某月的打卡日
async function getCheckInDays(nickname, year, month) {
  const ref = database.ref('checkins');
  const snapshot = await ref.get();
  const days = [];

  if (!snapshot.exists()) return days;

  const data = snapshot.val();
  for (const dateStr in data) {
    const date = new Date(dateStr);
    if (date.getFullYear() === year && date.getMonth() === month) {
      if (data[dateStr][nickname]) {
        days.push(dateStr);
      }
    }
  }

  return days;
}
