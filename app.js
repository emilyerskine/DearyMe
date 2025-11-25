// Register service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
  .then(() => console.log("Service Worker Registered"))
  .catch(error => console.log("Service Worker Registration Failed", error));
}

//for entries
const entryInput = document.getElementById("entry");
const saveBtn = document.getElementById("saveBtn");
const entriesList = document.getElementById("entriesList");
//for symptoms
const symptoms = ["Stress", "Anxiety", "Low Mood", "Fatigue",]
const symptomSelected = [];
const symDisplay = document.querySelector("#symptomsMulti .multi-display");
const symOptions = document.querySelector("#symptomsMulti .multi-options");
//for behaviours
const behaviours = ["Busy Workload", "Poor Sleep", "High Screentime", "Caffeine",]
const behaviourSelected = [];
const behDisplay = document.querySelector("#behavioursMulti .multi-display");
const behOptions = document.querySelector("#behavioursMulti .multi-options");

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
    symptoms: [...symptomSelected] ,
    behaviours: [...behaviourSelected] ,
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
    li.textContent = `${e.timestamp} — ${e.mood} — [${e.symptoms.join(", ")}] — [${e.behaviours.join(", ")}] —  ${e.text} `;
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

//add symptoms drop down
symDisplay.addEventListener("click", () => symOptions.classList.toggle("hidden"));

symptoms.forEach(sym => {
  const div = document.createElement("div");
  div.textContent = sym;
  div.addEventListener("click", () => toggleSymptom(sym));
  symOptions.appendChild(div);
});

function toggleSymptom(sym) {
  if (symptomSelected.includes(sym)) {
    symptomSelected.splice(symptomSelected.indexOf(sym), 1);
  } else {
    symptomSelected.push(sym);
  }
  updateSymptomsUI();
}

function updateSymptomsUI() {
  symDisplay.textContent  = symptomSelected.length
  ? symptomSelected.join(", ")
  : "Select symptoms";
}

//add behaviours drop down
behDisplay.addEventListener("click", () => behOptions.classList.toggle("hidden"));

behaviours.forEach(beh => {
  const div = document.createElement("div");
  div.textContent = beh;
  div.addEventListener("click", () => toggleBehaviour(beh));
  behOptions.appendChild(div);
});

function toggleBehaviour(beh) {
  if (behaviourSelected.includes(beh)) {
    behaviourSelected.splice(behaviourSelected.indexOf(beh), 1);
  } else {
    behaviourSelected.push(beh);
  }
  updateBehaviourUI();
}

function updateBehaviourUI() {
  behDisplay.textContent  = behaviourSelected.length
  ? behaviourSelected.join(", ")
  : "Select behaviours";
}
