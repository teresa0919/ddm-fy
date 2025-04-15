
const firebaseConfig = {
  databaseURL: "https://ddm-fy-default-rtdb.asia-southeast1.firebasedatabase.app/"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function checkIn() {
  const nickname = document.getElementById('nickname').value || "匿名小菩薩";
  let sutra = document.getElementById('scripture').value;
  const otherInput = document.getElementById('otherScripture').value;
  const count = parseInt(document.getElementById('count').value) || 1;

  if (sutra === "other") {
    if (!otherInput) return alert("請輸入佛經名稱");
    sutra = otherInput;
  }

  const date = new Date();
  const dateStr = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2,'0')}-${date.getDate().toString().padStart(2,'0')}`;
  const timestamp = date.toISOString();

  db.ref(`checkins/${dateStr}`).push({
    nickname: nickname,
    sutra: sutra,
    count: count,
    timestamp: timestamp
  }).then(() => {
    alert("打卡成功！");
  });
}
