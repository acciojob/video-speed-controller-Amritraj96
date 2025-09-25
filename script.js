const video = document.querySelector('.viewer');
const toggle = document.querySelector('.toggle');
const progress = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');
const volume = document.querySelector('input[name="volume"]');
const speed = document.querySelector('input[name="playbackRate"]');
const rewind = document.querySelector('.rewind');
const forward = document.querySelector('.forward');

// Toggle play/pause
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

// Update progress bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.width = `${percent}%`;
}

// Scrub progress bar
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Volume & Speed controls
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// Skip controls
function skip(seconds) {
  video.currentTime += seconds;
}

// Event listeners
toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

volume.addEventListener('input', handleRangeUpdate);
speed.addEventListener('input', handleRangeUpdate);

rewind.addEventListener('click', () => skip(-10));
forward.addEventListener('click', () => skip(25));
