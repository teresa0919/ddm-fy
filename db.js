
const firebaseConfig = {
  apiKey: "AIzaSyBU1AYuZzvZC1eW4nllG5qCAvcKXT90sg0",
  authDomain: "ddm-fy.firebaseapp.com",
  databaseURL: "https://ddm-fy-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ddm-fy",
  storageBucket: "ddm-fy.appspot.com",
  messagingSenderId: "439647437849",
  appId: "1:439647437849:web:b195f3e4d316d417969688",
  measurementId: "G-2S6W1JH4EN"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function saveCheckIn(nickname, sutra, count = 1) {
  const date = new Date().toISOString().slice(0, 10);
  const path = `checkins/${date}/${nickname}/${sutra}`;
  return db.ref(path).transaction(prev => (prev || 0) + count);
}
