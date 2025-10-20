const playlist = [
    "assets/music/music1.mp3",
    "assets/music/music2.mp3",
    "assets/music/music3.mp3",
    "assets/music/music4.mp3",
    "assets/music/music5.mp3"
];

const player = document.createElement("audio");
player.id = "bgMusic";
player.autoplay = true;
player.volume = 0.5;
document.body.appendChild(player);

let index = 0;
player.src = playlist[index];
player.addEventListener("ended", () => {
    index = (index + 1) % playlist.length;
    player.src = playlist[index];
    player.play();
});

const controlBtn = document.createElement("button");
controlBtn.innerHTML = "🎵 Tạm dừng";
Object.assign(controlBtn.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    padding: "8px 14px",
    background: "rgba(240,98,146,0.9)",
    color: "white",
    border: "none",
    borderRadius: "20px",
    fontSize: "14px",
    cursor: "pointer",
    boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
    zIndex: "1000"
});
document.body.appendChild(controlBtn);

controlBtn.onclick = () => {
    if (player.paused) {
        player.play();
        controlBtn.innerHTML = "🎵 Tạm dừng";
    } else {
        player.pause();
        controlBtn.innerHTML = "▶️ Phát nhạc";
    }
};
