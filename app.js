// Register service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}

const entryInput = document.getElementById("entry");
const saveBtn = document.getElementById("saveBtn");
const entriesList = document.getElementById("entriesList");

// Load existing entries
let entries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
renderEntries();

saveBtn.addEventListener("click", () => {
  const text = entryInput.value.trim();
  if (!text) return;

  const newEntry = {
    text,
    timestamp: new Date().toLocaleString(),
  };

  entries.unshift(newEntry);
  localStorage.setItem("diaryEntries", JSON.stringify(entries));
  entryInput.value = "";
  renderEntries();
});

function renderEntries() {
  entriesList.innerHTML = "";
  entries.forEach((e) => {
    const li = document.createElement("li");
    li.textContent = `${e.timestamp} — ${e.text}`;
    entriesList.appendChild(li);
  });
}
