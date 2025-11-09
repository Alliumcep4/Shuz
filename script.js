const songs = [
    {
        title: "bla"
        artist: "artista"
        audioSrc: "audio/s1"
        imageSrc: "img/c1"
    },

    {
        title: "bla"
        artist: "artista"
        audioSrc: "audio/s1"
        imageSrc: "img/c1"
    },

    {
        title: "bla"
        artist: "artista"
        audioSrc: "audio/s1"
        imageSrc: "img/c1"
    },

    {
        title: "bla"
        artist: "artista"
        audioSrc: "audio/s1"
        imageSrc: "img/c1"
    },

    {
        title: "bla"
        artist: "artista"
        audioSrc: "audio/s1"
        imageSrc: "img/c1"
    },

    {
        title: "bla"
        artist: "artista"
        audioSrc: "audio/s1"
        imageSrc: "img/c1"
    },

];

const cover = document.getElementById('cover');
const titleE1 = document.getElementById('title');
const artistE1 = document.getElementById('artist');

const playBtn = document.getElementById('play').querySelector('img');
const prevBtn = document.getElementById('prev').querySelector('img');
const nextBtn = document.getElementById('next').querySelector('img');

const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const playlistEl = document.getElementById('playlist');

let currentIndex = 0;
let isPlaying = false;
const audio = new Audio();

const icons = {
    play: 'img/play.png',
    pause: 'img/pause.png',
    next: 'img/next.png',
    prev: 'img/prev.png'
};

// Build playlist
function buildPlaylist() {
    playlistEl.innerHTML = '';
    songs.forEach((song, i) => {
        const li = document.createElement('li');
        li.className = 'playlist-item';
        li.dataset.index = i;
        li.innerHTML = `
            <img src="${song.imageSrc}" alt="${song.title}" class="thumb" width="48" height="48">
            <div class="meta">
                <div class="meta-title">${song.title}</div>
                <div class="meta-artist">${song.artist}</div>
            </div>
        `;
        playlistEl.appendChild(li);
    });
}

// Load song
function loadSong(index) {
    const song = songs[index];
    audio.src = song.audioSrc;
    cover.src = song.imageSrc;
    titleEl.textContent = song.title;
    artistEl.textContent = song.artist;

    document.querySelectorAll('.playlist-item').forEach(item => {
        item.classList.toggle('active', Number(item.dataset.index) === index);
    });
}

// Play / Pause
function playSong() {
    audio.play();
    isPlaying = true;
    playBtn.src = icons.pause;
    cover.classList.add('rotating');
}

function pauseSong() {
    audio.pause();
    isPlaying = false;
    playBtn.src = icons.play;
    cover.classList.remove('rotating');
}

function togglePlay() {
    if(isPlaying) pauseSong();
    else playSong();
}

// Next / Prev
function nextSong() {
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
    playSong();
}

function prevSong() {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
    playSong();
}

// Progress
function updateProgress() {
    if (!audio.duration) return;
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${percent}%`;
    currentTimeEl.textContent = formatTime(audio.currentTime);
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    if(!duration) return;
    audio.currentTime = (clickX / width) * duration;
}

function formatTime(time) {
    const minutes = Math.floor(time / 60) || 0;
    const seconds = Math.floor(time % 60) || 0;
    return `${minutes}:${seconds < 10 ? '0'+seconds : seconds}`;
}

// Events
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong);
audio.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audio.duration);
});

document.getElementById('play').addEventListener('click', togglePlay);
document.getElementById('next').addEventListener('click', nextSong);
document.getElementById('prev').addEventListener('click', prevSong);
progressContainer.addEventListener('click', setProgress);

playlistEl.addEventListener('click', (e) => {
    const li = e.target.closest('.playlist-item');
    if(!li) return;
    currentIndex = Number(li.dataset.index);
    loadSong(currentIndex);
    playSong();
});

// Init
function init() {
    buildPlaylist();
    loadSong(currentIndex);
    playBtn.src = icons.play;
    prevBtn.src = icons.prev;
    nextBtn.src = icons.next;
    audio.preload = 'metadata';
}

init();

