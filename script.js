const questions = [
  { prompt: "What is the speed of light?", options: ["300,000 km/h", "300,000 km/s", "3,000 km/s"], correct: 1 },
  { prompt: "Which element fuels stars in early fusion?", options: ["Helium", "Hydrogen", "Carbon"], correct: 1 },
  { prompt: "Can sound travel in space?", options: ["Yes", "Only in black holes", "No"], correct: 2 },
  { prompt: "What is the main gas in Jupiter's atmosphere?", options: ["Oxygen", "Hydrogen", "Carbon Dioxide"], correct: 1 },
  { prompt: "What is the largest planet in our solar system?", options: ["Earth", "Saturn", "Jupiter"], correct: 2 },
  { prompt: "What is the chemical symbol for gold?", options: ["Au", "Ag", "Pb"], correct: 0 },
  { prompt: "What is the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome"], correct: 1 },
  { prompt: "What is the boiling point of water at sea level?", options: ["100°C", "90°C", "80°C"], correct: 0 },
  { prompt: "What is the most abundant gas in Earth's atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide"], correct: 1 },
  { prompt: "What is the chemical formula for table salt?", options: ["NaCl", "KCl", "CaCl2"], correct: 0 },
  { prompt: "What is the smallest unit of life?", options: ["Atom", "Molecule", "Cell"], correct: 2 },
  { prompt: "What is the main function of red blood cells?", options: ["Transport oxygen", "Fight infections", "Clot blood"], correct: 0 },
  { prompt: "What is the primary source of energy for Earth?", options: ["The Moon", "The Sun", "Volcanoes"], correct: 1 },
  { prompt: "What is the chemical symbol for water?", options: ["H2O", "CO2", "O2"], correct: 0 },
  { prompt: "What is the process by which plants make their own food?", options: ["Photosynthesis", "Respiration", "Digestion"], correct: 0 },
  { prompt: "What is the largest organ in the human body?", options: ["Heart", "Liver", "Skin"], correct: 2 },
  { prompt: "What is the main function of the brain?", options: ["Pump blood", "Control body functions", "Digest food"], correct: 1 },
  { prompt: "What is the chemical symbol for carbon dioxide?", options: ["CO2", "O2", "H2O"], correct: 0 },
  { prompt: "What is the primary function of the lungs?", options: ["Pump blood", "Exchange gases", "Digest food"], correct: 1 },
  { prompt: "What is the basic unit of heredity?", options: ["Gene", "Chromosome", "DNA"], correct: 0 },
  { prompt: "What is the main function of the kidneys?", options: ["Filter blood", "Pump blood", "Digest food"], correct: 0 },
  { prompt: "What is the chemical symbol for oxygen?", options: ["O", "O2", "H2O"], correct: 1 },
  { prompt: "What is the process by which cells divide?", options: ["Mitosis", "Meiosis", "Fission"], correct: 0 },
  { prompt: "What is the main function of the digestive system?", options: ["Pump blood", "Break down food", "Exchange gases"], correct: 1 },
  { prompt: "What is the chemical symbol for sodium?", options: ["Na", "K", "Ca"], correct: 0 },
  { prompt: "What is the primary function of the immune system?", options: ["Fight infections", "Pump blood", "Digest food"], correct: 0 },
  { prompt: "What is the main function of the skeletal system?", options: ["Support the body", "Pump blood", "Digest food"], correct: 0 }
];

let currentQuestion = 0;
let score = 0;
let lives = 3;
let highScore = 0;
let timer;
let timeLeft = 15;

function displayQuestion() {
  if (lives === 0) {
    document.querySelector(".game-container").style.display = "none";
    document.getElementById("game-over").style.display = "block";
    document.getElementById("final-score").textContent = score;
    document.getElementById("final-high-score").textContent = highScore;
    return;
  }

  const q = questions[currentQuestion];
  document.getElementById("question").textContent = q.prompt;
  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(index);
    answersDiv.appendChild(btn);
  });

  updateCharacterFace();
  document.getElementById("feedback").textContent = "";
  document.getElementById("lives").textContent = `Lives: ${"❤️".repeat(lives)}`;
  document.getElementById("score").textContent = `Score: ${score} | High Score: ${highScore}`;
  timeLeft = 15;
  document.getElementById("timer").textContent = `Time left: ${timeLeft}s`;

  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = `Time left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      lives--;
      if (lives === 0) {
        document.querySelector(".game-container").style.display = "none";
        document.getElementById("game-over").style.display = "block";
        document.getElementById("final-score").textContent = score;
        document.getElementById("final-high-score").textContent = highScore;
        return;
      }
      nextQuestion();
    }
  }, 1000);
}

function checkAnswer(selectedIndex) {
  clearInterval(timer);
  const q = questions[currentQuestion];
  const isCorrect = selectedIndex === q.correct;

  const selectedBtn = document.querySelectorAll("#answers button")[selectedIndex];
  selectedBtn.classList.add(isCorrect ? "correct" : "wrong");
  setTimeout(() => selectedBtn.classList.remove("correct", "wrong"), 600);

  if (isCorrect) {
    score++;
    document.getElementById("feedback").textContent = "✅ Brain power engaged!";
  } else {
    lives--;
    document.getElementById("feedback").textContent = "❌ Oof! Lost a life!";
  }

  if (score > highScore) highScore = score;

  if (lives === 0) {
    document.querySelector(".game-container").style.display = "none";
    document.getElementById("game-over").style.display = "block";
    document.getElementById("final-score").textContent = score;
    document.getElementById("final-high-score").textContent = highScore;
    return;
  }

  document.getElementById("lives").textContent = `Lives: ${"❤️".repeat(lives)}`;
  document.getElementById("score").textContent = `Score: ${score} | High Score: ${highScore}`;
}

function nextQuestion() {
  currentQuestion = (currentQuestion + 1) % questions.length;
  displayQuestion();
}

function resetGame() {
  score = 0;
  lives = 3;
  currentQuestion = 0;
  document.querySelector(".game-container").style.display = "block";
  document.getElementById("game-over").style.display = "none";
  displayQuestion();
}

function updateCharacterFace() {
  const faces = ["🧠 vs 🐍", "🧠 vs 🦎", "🧠 vs 🐙", "🧠 vs 🦾", "🧠 vs 🤖"];
  document.getElementById("character-face").textContent = faces[currentQuestion % faces.length];
}

window.onload = displayQuestion;
