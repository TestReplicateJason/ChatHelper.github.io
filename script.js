// Firebase config
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "ТОКЕН_ОТСЮДА",
  authDomain: "имя-проекта.firebaseapp.com",
  databaseURL: "https://имя-проекта.firebaseio.com",
  projectId: "имя-проекта",
  storageBucket: "имя-проекта.appspot.com",
  messagingSenderId: "xxxxxx",
  appId: "xxx"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const namesRef = ref(db, "names");

window.submitName = function () {
  const name = document.getElementById("nameInput").value;
  const date = new Date().toLocaleString();

  if (name) {
    push(namesRef, { name, date });
    document.getElementById("nameInput").value = "";
  }
};

// Подгружаем список имён
onValue(namesRef, (snapshot) => {
  const list = document.getElementById("nameList");
  list.innerHTML = "";
  const data = snapshot.val();
  const entries = data ? Object.values(data) : [];

  entries.forEach((entry, index) => {
    const li = document.createElement("li");
    li.textContent = `${entry.name} — ${entry.date}`;
    list.appendChild(li);
  });
});
