
// 初始化 Firebase（請自行替換為你的 Firebase 設定）
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 儲存打卡資料：暱稱 + 經文 + 次數
async function saveCheckIn(nickname, sutra, count = 1) {
  const docRef = db.collection('checkins').doc(`${nickname}_${sutra}`);
  const doc = await docRef.get();

  if (doc.exists) {
    const prev = doc.data().count || 0;
    await docRef.update({
      count: prev + count,
      lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
    });
  } else {
    await docRef.set({
      nickname,
      sutra,
      count,
      created: firebase.firestore.FieldValue.serverTimestamp()
    });
  }
}

// 查詢誦經統計
async function getSutraStats() {
  const snapshot = await db.collection('checkins').get();
  const stats = {};
  snapshot.forEach(doc => {
    const data = doc.data();
    if (stats[data.sutra]) {
      stats[data.sutra] += data.count;
    } else {
      stats[data.sutra] = data.count;
    }
  });
  return stats;
}

// 查詢某人某月的打卡日
async function getCheckInDays(nickname, year, month) {
  const snapshot = await db.collection('checkins').get();
  const days = [];
  snapshot.forEach(doc => {
    const data = doc.data();
    if (data.nickname === nickname && data.created) {
      const date = data.created.toDate();
      if (date.getFullYear() === year && date.getMonth() === month) {
        days.push(date.toISOString().split('T')[0]);
      }
    }
  });
  return days;
}
