
const firebaseConfig = {
  databaseURL: "https://ddm-fy-default-rtdb.asia-southeast1.firebasedatabase.app/"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function toggleOtherField() {
  const select = document.getElementById("scripture");
  const other = document.getElementById("otherInput");
  if (select.value === "其他") {
    other.style.display = "inline-block";
  } else {
    other.style.display = "none";
  }
}

function checkIn() {
  const nickname = document.getElementById("nickname").value || "匿名小菩薩";
  let sutra = document.getElementById("scripture").value;
  const other = document.getElementById("otherInput").value;
  const count = parseInt(document.getElementById("count").value || "1");

  if (!sutra) return alert("請選擇佛經！");
  if (sutra === "其他") {
    if (!other) return alert("請填寫佛經名稱");
    sutra = other;
  }

  const now = new Date();
  const dateStr = now.toISOString().split("T")[0];
  db.ref('checkins/' + dateStr).push({
    nickname: nickname,
    sutra: sutra,
    count: count,
    timestamp: now.toISOString()
  }).then(() => {
    const msg = document.getElementById("successMessage");
    const quotes = [
      "讚嘆您，持經功德無量！",
      "一念佛號，一道光明！",
      "願您日日法喜，處處吉祥～",
      "功不唐捐，願願皆成！"
    ];
    msg.textContent = quotes[Math.floor(Math.random() * quotes.length)];
  });
}
