const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEL = document.getElementById("current-time");
const durationEL = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// volume buttons
const volumeBtnUp = document.getElementById("volume-up");
const volumeBtnDown = document.getElementById("volume-down");
const volumeBox = document.getElementById("volume-box");
const volume = document.getElementById("volume");

// Image Container
const imgContainer = document.getElementsByClassName("img-container")[0];
console.log(imgContainer);

// Music
const songs = [
  {
    name: "hemant-1",
    displayName: "Manasilaayo",
    artist: "Anirudh Ravichander",
  },
  {
    name: "hemant-2",
    displayName: "Illuminati",
    artist: "Dabzee, Sushin Shyam", //, and Vinayak Sasikumar
  },
  {
    name: "hemant-3",
    displayName: "Coolie Disco",
    artist: "Anirudh Ravichander",
  },
  {
    name: "hemant-4",
    displayName: "Vikram Title Song",
    artist: "Anirudh Ravichander",
  },
  {
    name: "hemant-5",
    displayName: "Sagar Di Vohti (Remix)",
    artist: "Gurmeet Singh, Satnam Sagar", //, and Sharanjeet Shammi
  },
];

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
  imgContainer.classList.add("crazy-box");
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
  imgContainer.classList.remove("crazy-box");
}

// Play / Pause Event Listener
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Previous Song
function previousSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    //Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    //Delay switching duration Element to avoid Nan
    if (durationSeconds) {
      durationEL.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    //Calculate display for current
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEL.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;

  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// Volumn Increase
function volumeUp() {
  if (music.volume > 0.91) {
    music.volume = 1.0;
  } else {
    music.volume += 0.1;
  }
}

// Volumn Decrease
function volumeDown() {
  if (music.volume < 0.099) {
    music.volume = 0;
  } else {
    music.volume -= 0.1;
  }
}

function updateVolumeBar(e) {
  volume.style.width = `${music.volume * 100}%`;
}

// Set Progress Bar
function setVolumeBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  music.volume = (clickX / width) * 1.0;
}

// Event Listeners
prevBtn.addEventListener("click", previousSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);

volumeBtnUp.addEventListener("click", volumeUp);
volumeBtnDown.addEventListener("click", volumeDown);
music.addEventListener("volumechange", updateVolumeBar);
volumeBox.addEventListener("click", setVolumeBar);
