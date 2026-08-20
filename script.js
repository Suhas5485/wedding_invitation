const loader = document.getElementById("loader");
const invitation = document.getElementById("invitation");
const openBtn = document.getElementById("openBtn");
const musicBtn = document.getElementById("musicBtn");
const audio = document.getElementById("weddingMusic");

let playing = false;

openBtn.addEventListener("click", async () => {
  loader.classList.add("fade-out");
  invitation.classList.remove("hidden");
  musicBtn.style.display = "grid";
  setTimeout(() => loader.remove(), 550);

  try {
    await audio.play();
    playing = true;
    musicBtn.textContent = "❚❚";
  } catch (e) {
    playing = false;
    musicBtn.textContent = "♫";
  }

  setTimeout(() => {
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
  }, 100);
});

musicBtn.addEventListener("click", async () => {
  if (playing) {
    audio.pause();
    playing = false;
    musicBtn.textContent = "♫";
  } else {
    try {
      await audio.play();
      playing = true;
      musicBtn.textContent = "❚❚";
    } catch (e) {
      alert("Please tap the page once and try the music button again.");
    }
  }
});

const weddingDate = new Date("2026-08-26T11:23:00+05:30");

function updateCountdown() {
  const now = new Date();
  const diff = weddingDate.getTime() - now.getTime();

  if (diff <= 0) {
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    return;
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const style = document.createElement("style");
style.textContent = ".fade-out{opacity:0;transition:opacity .55s ease;pointer-events:none}";
document.head.appendChild(style);
