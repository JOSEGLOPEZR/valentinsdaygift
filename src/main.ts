import '../style.css'

declare const confetti: any;

const bgMusic = document.getElementById('bg-music') as HTMLAudioElement;
const startBtn = document.getElementById('start-btn');
const startOverlay = document.getElementById('start-overlay');
const envelopeContainer = document.getElementById('envelope-container');
const envelope = document.getElementById('envelope');
const videoOverlay = document.getElementById('video-overlay');
const video = document.getElementById('val-video') as HTMLVideoElement;
const controlsContainer = document.getElementById('controls-container');
const btnSi = document.getElementById('btn-si');
const btnNo = document.getElementById('btn-no');
const resultScreen = document.getElementById('result-screen');
const resultText = document.getElementById('result-text');
const heartContainer = document.getElementById('heart-container');
const finalVideoContainer = document.getElementById('final-video-container');
const finalVideo = document.getElementById('final-video') as HTMLVideoElement;

// Confirmation Modal elements
const modalContainer = document.getElementById('modal-container');
const modalText = document.getElementById('modal-text');
const modalConfirm = document.getElementById('modal-confirm');
const modalCancel = document.getElementById('modal-cancel');

let noStage = 0;

// 1. Initial Interaction (Start Music & Show Envelope)
startBtn?.addEventListener('click', () => {
  startOverlay?.classList.add('hidden');
  envelopeContainer?.classList.remove('hidden');
  bgMusic.volume = 0.3;
  bgMusic.play().catch(e => console.error("Audio play failed:", e));
});

// 2. Click Envelope -> Show Video
envelope?.addEventListener('click', () => {
  envelopeContainer?.classList.add('hidden');
  videoOverlay?.classList.remove('hidden');
  video.play();
});

// 3. Video Ends -> Show Buttons
video.onended = () => {
  controlsContainer?.classList.remove('hidden');
};

// 4. "SÍ" Flow
btnSi?.addEventListener('click', () => {
  showFinalResult(true);
});

// 5. "NO" Flow (Confirmation Logic)
btnNo?.addEventListener('click', () => {
  noStage = 1;
  showModal("¿Estás segura? 🥺");
});

modalConfirm?.addEventListener('click', () => {
  if (noStage === 1) {
    noStage = 2;
    showModal("¿Muy muy segura? 💔");
  } else if (noStage === 2) {
    showFinalResult(false);
  }
});

modalCancel?.addEventListener('click', () => {
  modalContainer?.classList.add('hidden');
  noStage = 0;
  // Re-play video or reset choice
  video.currentTime = 0;
  video.play();
  controlsContainer?.classList.add('hidden');
});

function showModal(text: string) {
  if (modalText && modalContainer) {
    modalText.innerText = text;
    modalContainer.classList.remove('hidden');
  }
}

function showFinalResult(isYes: boolean) {
  video.pause();
  videoOverlay?.classList.add('hidden');
  modalContainer?.classList.add('hidden');
  resultScreen?.classList.remove('hidden');

  if (isYes) {
    if (resultText) resultText.innerText = "¡LE QUIERO MUCHITO!";
    if (heartContainer) {
      heartContainer.innerText = "❤️";
      heartContainer.classList.add('beating');
    }

    // Show and play final video
    finalVideoContainer?.classList.remove('hidden');
    finalVideo?.play();

    // Fire confetti
    launchConfetti();
  } else {
    if (resultText) resultText.innerText = "...";
    if (heartContainer) {
      heartContainer.innerText = "💔";
      heartContainer.classList.remove('beating');
    }
  }
}

function launchConfetti() {
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  setInterval(function () {
    confetti({ ...defaults, particleCount: 40, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
    confetti({ ...defaults, particleCount: 40, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
  }, 250);
}
