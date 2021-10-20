//JS Below
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');


//Songs Included
const songs = [
	
	{
		displayName: "That's What Love Is",
		artist: 'Justin Bieber',
		imgPath: 'img/changes.jpg',
		songPath: 'music/What-Love-Is',
	},
	{
		displayName: "Still",
		artist: 'Seinabo Sey',
		imgPath: 'img/seinabo.jpg',
		songPath: 'music/Still',
	},
	{
		displayName: "Deserve You",
		artist: 'Justin Bieber',
		imgPath: 'img/justice.jpg',
		songPath: 'music/Deserve-You',
	},
	{
		displayName: 'Amin',
		artist: 'Ayra Starr',
		imgPath: 'img/ayra-19-and-dangerous.jpg',
		songPath: 'music/Amin',
	},
	{
		displayName: 'Anyone',
		artist: 'Justin Bieber',
		imgPath: 'img/justice.jpg',
		songPath: 'music/Anyone',
	},
	{
		displayName: 'Melo',
		artist: 'Liya',
		imgPath: 'img/Llya-melo.jpg',
		songPath: 'music/Melo',
	},
	{
		displayName: 'Save Your Tears',
		artist: 'The Weeknd',
		imgPath: 'img/after-hours.jpg',
		songPath: 'music/Save-Your-Tears',
	},
	{
		displayName: 'Midnight Sky',
		artist: 'Miley Cyrus',
		imgPath: 'img/midnight-sky.jpg',
		songPath: 'music/Midnight-Sky',
	},
	{
		displayName: 'Essence',
		artist: 'Wizkid / Justin Bieber / Tems',
		imgPath: 'img/made-in-lagos.jpeg',
		songPath: 'music/Essence',
	},
	{
		displayName: 'Memories',
		artist: 'Ayra Starr',
		imgPath: 'img/memories.jpeg',
		songPath: 'music/Memories',
	},
];

//Check If PLaying
let isPlaying = false;

//Play 
function playSong() {
	isPlaying = true;
	playBtn.classList.replace('fa-play', 'fa-pause');
	playBtn.setAttribute('title', 'Pause');
	music.play();
}

//Pause
function pauseSong() {
	isPlaying = false;
	playBtn.classList.replace('fa-pause', 'fa-play');
	playBtn.setAttribute('title', 'Play');
	music.pause();
}

playBtn.addEventListener('click', ()=> (isPlaying ? pauseSong() : playSong()));

function loadSong(song) {
	title.textContent = song.displayName;
	artist.textContent = song.artist;
	music.src = `${song.songPath}.mp3`;
	image.src = `${song.imgPath}`;
}

//Current Song
let songIndex = 0;

function prevSong() {
	songIndex--;
	if (songIndex < 0) {
		songIndex = songs.length - 1;
	}
	loadSong(songs[songIndex]);
	playSong();
}

function nextSong() {
	songIndex++;
	if (songIndex > songs.length -1) {
		songIndex = 0;
	}
	loadSong(songs[songIndex]);
	playSong();
}

loadSong(songs[songIndex]);

function updateProgressBar(e) {
	if(isPlaying) {
		const {duration, currentTime} = e.srcElement;
		//console.log(duration, currentTime);
		const progressPercent = (currentTime / duration) * 100;
		progress.style.width = `${progressPercent}%`;

		//Calcultate display for duration
		const durationMinutes = Math.floor(duration / 60);
		let durationSeconds = Math.floor(duration % 60);
		if(durationSeconds < 10) {
			durationSeconds = `0${durationSeconds}`;
		}
		//Delay switching duration Element to avoid Nan
		if(durationSeconds) {
			durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
		}

		//Calcultate display for current time
		const currentMinutes = Math.floor(currentTime / 60);
		let currentSeconds = Math.floor(currentTime % 60);
		if(currentSeconds < 10) {
			currentSeconds = `0${currentSeconds}`;
		}
		//Delay switching duration Element to avoid Nan
		if(currentSeconds) {
			currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
		}
	}
}

//Set Progress Bar
function setProgressBar(e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const {duration} = music;

	music.currentTime = (clickX / width) * duration;
}

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);