const background = document.querySelector('#background'); 
const thumbnail = document.querySelector('#thumbnail');
const song = document.querySelector('#song');

const songArtist = document.querySelector('.song-artist');
const songTitle = document.querySelector('.song-title');
const progressBar = document.querySelector('#progress-bar');
let pPause = document.querySelector('#play-pause');

songIndex = 0;
songs = ['music/music1.mp3', 'music/music2.mp3','music/music3.mp3','music/music4.mp3','music/music5.mp3'];
thumbnails = ['music/cover1.jpg', 'music/cover2.jpg','music/cover3.jpg','music/cover4.jpg','music/cover5.jpg']; 
songArtists = ['A-Ha', 'Bee Gees','Lang Lang','Michael Jackson','NCT 2020'];
songTitles = ["Take On Me", "Staying Alive","Fur Elise","Billie Jean","RESONANCE"]; 
let playing = true;
function playPause() {
    if (playing) {
        const song = document.querySelector('#song'),
        thumbnail = document.querySelector('#thumbnail');

        pPause.src = "img/media/pause.png"
        thumbnail.style.transform = "scale(1.15)";

        song.play();
        playing = false;
    } else {
        pPause.src = "img/media/play.png"
        thumbnail.style.transform = "scale(1)"

        song.pause();
        playing = true;
    }
}

song.addEventListener('ended', function(){
    nextSong();
});


function nextSong() {
    songIndex++;
    if (songIndex > 4) {
        songIndex = 0;
    };
    song.src = songs[songIndex];
    thumbnail.src = thumbnails[songIndex];
    background.src = thumbnails[songIndex];

    songArtist.innerHTML = songArtists[songIndex];
    songTitle.innerHTML = songTitles[songIndex];

    playing = true;
    playPause();
}

function previousSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = 4;
    };
    song.src = songs[songIndex];
    thumbnail.src = thumbnails[songIndex];
    background.src = thumbnails[songIndex];

    songArtist.innerHTML = songArtists[songIndex];
    songTitle.innerHTML = songTitles[songIndex];

    playing = true;
    playPause();
}

function updateProgressValue() {
    progressBar.max = song.duration;
    progressBar.value = song.currentTime;
    document.querySelector('.currentTime').innerHTML = (formatTime(Math.floor(song.currentTime)));
    if (document.querySelector('.durationTime').innerHTML === "NaN:NaN") {
        document.querySelector('.durationTime').innerHTML = "0:00";
    } else {
        document.querySelector('.durationTime').innerHTML = (formatTime(Math.floor(song.duration)));
    }
};

function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10){
        sec  = `0${sec}`;
    };
    return `${min}:${sec}`;
};

setInterval(updateProgressValue, 500);

function changeProgressBar() {
    song.currentTime = progressBar.value;
};
