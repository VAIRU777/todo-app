const API_URL = "http://127.0.0.1:8000/tasks";
const taskList = document.getElementById("taskList");
const addBtn = document.getElementById("addBtn");
const input = document.getElementById("taskInput");

async function loadTasks() {
  const res = await fetch(API_URL);
  const tasks = await res.json();

  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "task-item";
    li.style.marginBottom = "8px";

    const title = document.createElement("span");
    title.textContent = task.title;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "削除";
    deleteBtn.className = "delete-btn";
    deleteBtn.style.marginLeft = "12px";

    deleteBtn.onclick = () => deleteTask(task.id);

    li.appendChild(title);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadTasks();
}

addBtn.addEventListener("click", async () => {
  const title = input.value.trim();
  if (!title) return alert("タスクを入力してください");

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  input.value = "";
  loadTasks();
});

loadTasks();
