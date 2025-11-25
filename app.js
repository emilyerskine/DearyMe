// Register service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
  .then(() => console.log("Service Worker Registered"))
  .catch(error => console.log("Service Worker Registration Failed", error));
}

const entryInput = document.getElementById("entry");
const saveBtn = document.getElementById("saveBtn");
const entriesList = document.getElementById("entriesList");

// track mood
let selectedMood = null;

// load existing entries
let entries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
renderEntries();

//save entries
saveBtn.addEventListener("click", () => {
  const text = entryInput.value.trim();
  if (!text) return;

  const newEntry = {
    text,
    timestamp: new Date().toLocaleString(),
    mood: selectedMood || "No Mood Logged",
  };

  entries.unshift(newEntry);
  localStorage.setItem("diaryEntries", JSON.stringify(entries));
  entryInput.value = "";
  renderEntries();
});

//add entries
function renderEntries() {
  entriesList.innerHTML = "";
  entries.forEach((e) => {
    const li = document.createElement("li");
    li.textContent = `${e.timestamp} — (${e.mood}) — ${e.text}`;
    entriesList.appendChild(li);
  });
}

//add mood selection buttons 
document.querySelectorAll("#moodSelector button").forEach(btn => {
  btn.addEventListener("click", () => {
    selectedMood = btn.dataset.value;
    updateMoodUI();
  });
});

function updateMoodUI() {
  document.querySelectorAll("#moodSelector button").forEach(btn => {
    btn.classList.toggle("selected", btn.dataset.value === selectedMood);
  });
}

