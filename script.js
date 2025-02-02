const images = [
  "./assets/images/img00.jpg", //intro music 6s
  "./assets/images/img01.jpg", //6s
  "./assets/images/img02.jpg", //7s
  "./assets/images/img03.jpg", //6s
  "./assets/images/img04.jpg", //7s
  "./assets/images/3voiliers.png", //refrain 5s
  "./assets/images/IA02.png", //refrain 5s
  "./assets/images/IA03.png", //refrain 5s
  "./assets/images/IA06.png", //refrain 5s
  "./assets/images/map.jpg", //3s
  "./assets/images/img06.jpg", //6s
  "./assets/images/IA12.jpeg", //6s
  "./assets/images/img07.jpg", //5s
  "./assets/images/img08.jpg", //6s
  "./assets/images/3voiliers.png", //refrain 4s
  "./assets/images/IA04.png", //refrain 3s
  "./assets/images/IA05.png", //refrain 3s
  "./assets/images/IA08.jpeg", //refrain 3s
  "./assets/images/img09.jpg", //6s
  "./assets/images/img10.jpg", //7s
  "./assets/images/img11.jpg", //10s
  "./assets/images/img12.jpg", //4s
  "./assets/images/3voiliers.png", //refrain 5s
  "./assets/images/IA13.jpeg", //refrain 4s
  "./assets/images/IA09.png", //refrain 5s
  "./assets/images/IA11.png", //refrain 5s
  "./assets/images/img13.jpg", //3s
  "./assets/images/img14.jpg", //4s
  "./assets/images/img15.jpg", //4s
  "./assets/images/img16.jpg", //3s
  "./assets/images/img19.jpg", //5s
  "./assets/images/img18.jpg", //5s
  "./assets/images/img17.jpg", //6s
  "./assets/images/IA14.jpeg", //6s
];

// Temps en secondes auxquels les images doivent apparaître
const timestamps = [
  0, 6, 12, 19, 25, 32, 37, 42, 47, 52, 55, 61, 67, 72, 78, 82, 85, 88, 91, 97,
  104, 114, 118, 123, 127, 132, 137, 140, 144, 148, 151, 155, 159, 164,
];

const imageContainer = document.getElementById("image-container");
const audio = document.getElementById("audio");
const playBtn = document.querySelector(".play-btn");
const seekBar = document.querySelector(".seek-bar");
const volumeBar = document.querySelector(".volume");
const timeDisplay = document.querySelector(".time");

function updateTime() {
  let current = Math.floor(audio.currentTime);
  let total = Math.floor(audio.duration) || 0;
  timeDisplay.textContent = `${formatTime(current)} / ${formatTime(total)}`;
  seekBar.value = (audio.currentTime / audio.duration) * 100 || 0;
}

function formatTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = Math.floor(seconds % 60);
  return `${min}:${sec.toString().padStart(2, "0")}`;
}

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸️";
  } else {
    audio.pause();
    playBtn.textContent = "▶️";
  }
});

audio.addEventListener("timeupdate", updateTime);
audio.addEventListener("loadedmetadata", updateTime);

seekBar.addEventListener("input", () => {
  audio.currentTime = (seekBar.value / 100) * audio.duration;
});

volumeBar.addEventListener("input", () => {
  audio.volume = volumeBar.value;
});

let currentIndex = 0;

function updateImage() {
  if (currentIndex < images.length) {
    imageContainer.style.opacity = 0;

    setTimeout(() => {
      imageContainer.style.backgroundImage = `url(${images[currentIndex]})`;
      imageContainer.style.opacity = 1;
    }, 500);
  }
}

function checkImageUpdate() {
  let time = audio.currentTime;
  let newIndex = timestamps.findIndex(
    (t, i) =>
      time >= t && (i === timestamps.length - 1 || time < timestamps[i + 1])
  );

  if (newIndex !== -1 && newIndex !== currentIndex) {
    currentIndex = newIndex;
    updateImage();
  }
}

audio.addEventListener("timeupdate", checkImageUpdate);
audio.addEventListener("seeked", checkImageUpdate);
audio.addEventListener("play", checkImageUpdate);

window.onload = () => {
  imageContainer.style.backgroundImage = `url(${images[0]})`;
};
