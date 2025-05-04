// Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// Твой конфиг
const firebaseConfig = {
  apiKey: "AIzaSyDxOjhsAu2ZRVL7_lyzMsJRrZbgsvhWIlo",
  authDomain: "gitsitejason.firebaseapp.com",
  databaseURL: "https://gitsitejason-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gitsitejason",
  storageBucket: "gitsitejason.firebasestorage.app",
  messagingSenderId: "410268743426",
  appId: "1:410268743426:web:1ae68e86de8966bfa7741b",
  measurementId: "G-F7605SEP4Q"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const namesRef = ref(db, "names");

// Обработка отправки
window.submitName = function () {
  const name = document.getElementById("nameInput").value.trim();
  if (!name) return;

  const date = new Date().toLocaleString();
  push(namesRef, { name, date });
  document.getElementById("nameInput").value = "";
};

// Отображение списка
onValue(namesRef, (snapshot) => {
  const list = document.getElementById("nameList");
  list.innerHTML = "";
  const data = snapshot.val();
  if (data) {
    const entries = Object.values(data);
    entries.forEach((entry, index) => {
      const li = document.createElement("li");
      li.textContent = `${index + 1}. ${entry.name} — ${entry.date}`;
      list.appendChild(li);
    });
  }
});
