const blessings = [
  "願你心如止水",
  "願你法喜充滿",
  "日日是好日",
  "平安喜樂",
  "智慧圓滿"
];

document.getElementById('checkinButton').addEventListener('click', () => {
  fetch('/checkin')
    .then(response => {
      if (response.ok) {
        window.location.href = '/success.html';
      } else {
        alert('打卡失敗了，再試一次喔！');
      }
    })
    .catch(error => {
      alert('連線錯誤，請稍後再試～');
    });
});