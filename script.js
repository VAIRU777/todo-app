const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");

addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (text === "") return;
  const li = document.createElement("li");
  li.textContent = text;
  
  const delBtn = document.createElement("button");
  delBtn.textContent = "削除";
  delBtn.onclick = () => li.remove();
  
  li.appendChild(delBtn);
  list.appendChild(li);
  input.value = "";
});