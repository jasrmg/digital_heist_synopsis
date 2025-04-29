// Simulate background music (as we don't have actual audio, we'll just toggle the icon)
const audioToggle = document.getElementById("audioToggle");
const audioIcon = document.getElementById("audioIcon");
const bgMusic = document.getElementById("bgMusic");
let isPlaying = false;

audioToggle.addEventListener("click", () => {
  if (isPlaying) {
    audioIcon.textContent = "🔇";
    try {
      bgMusic.pause();
    } catch (e) {
      console.log("Music control error:", e);
    }
  } else {
    audioIcon.textContent = "🔊";
    try {
      bgMusic.play().catch((e) => console.log("Autoplay prevented:", e));
    } catch (e) {
      console.log("Music control error:", e);
    }
  }
  isPlaying = !isPlaying;
});

// Coming soon button functionality
const comingSoonBtn = document.getElementById("comingSoonBtn");
const screenFlash = document.getElementById("screenFlash");
const terminalOverlay = document.getElementById("terminalOverlay");
const alertBox = document.getElementById("alertBox");
const dismissAlert = document.getElementById("dismissAlert");

comingSoonBtn.addEventListener("click", () => {
  // Flash screen effect
  let flashCount = 0;
  const maxFlashes = 5;
  const flashInterval = setInterval(() => {
    screenFlash.style.display = flashCount % 2 === 0 ? "block" : "none";
    flashCount++;

    if (flashCount > maxFlashes * 2) {
      clearInterval(flashInterval);
      screenFlash.style.display = "none";

      // Show terminal overlay
      terminalOverlay.style.display = "flex";

      // After terminal animation, show alert
      setTimeout(() => {
        terminalOverlay.style.display = "none";
        alertBox.style.display = "block";
      }, 6000);
    }
  }, 100);
});

dismissAlert.addEventListener("click", () => {
  alertBox.style.display = "none";
});

// Add typing cursor effect to title
const title = document.querySelector(".title");
setInterval(() => {
  title.classList.toggle("after:opacity-0");
}, 500);

// Fake loading screen when page first loads
window.addEventListener("load", () => {
  const loadingElement = document.createElement("div");
  loadingElement.className =
    "fixed inset-0 bg-black flex items-center justify-center z-50";
  loadingElement.innerHTML =
    '<p class="terminal-text text-2xl">LOADING SYSTEM...</p>';
  document.body.appendChild(loadingElement);

  setTimeout(() => {
    loadingElement.style.transition = "opacity 1s";
    loadingElement.style.opacity = "0";
    setTimeout(() => {
      document.body.removeChild(loadingElement);
    }, 1000);
  }, 1500);
});
