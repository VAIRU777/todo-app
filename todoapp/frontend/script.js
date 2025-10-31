const API_URL = "http://127.0.0.1:8000/tasks";
const taskList = document.getElementById("taskList");
const addBtn = document.getElementById("addBtn");
const input = document.getElementById("taskInput");

// タスク取得
async function fetchTasks() {
  const res = await fetch(API_URL);
  const tasks = await res.json();
  taskList.innerHTML = "";
  tasks.forEach(t => {
    const li = document.createElement("li");
    li.textContent = t.title;
    taskList.appendChild(li);
  });
}

// タスク追加
addBtn.addEventListener("click", async () => {
  const title = input.value.trim();
  if (!title) return alert("タスクを入力してください");
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  input.value = "";
  fetchTasks();
});

fetchTasks();

