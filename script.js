/* === BACKGROUND đổi tự động === */
const backgrounds = [
    "assets/img/bg1.jpg",
    "assets/img/bg2.jpg",
    "assets/img/bg3.jpg",
    "assets/img/bg4.jpg",
    "assets/img/bg5.jpg"
];
let bgIndex = 0;
function changeBackground() {
    document.body.style.backgroundImage = `url('${backgrounds[bgIndex]}')`;
    bgIndex = (bgIndex + 1) % backgrounds.length;
}
window.addEventListener("load", () => {
    changeBackground();
    setInterval(changeBackground, 10000); // đổi nền mỗi 10s
});

/* === NHẠC nền ngẫu nhiên === */
const musicList = [
    "assets/music/song1.mp3",
    "assets/music/song2.mp3",
    "assets/music/song3.mp3",
    "assets/music/song4.mp3",
    "assets/music/song5.mp3"
];
const bgMusic = document.getElementById("bgMusic");
let musicIndex = Math.floor(Math.random() * musicList.length);
function playNextMusic() {
    bgMusic.src = musicList[musicIndex];
    bgMusic.play().catch(() => { }); // tránh lỗi autoplay
    musicIndex = (musicIndex + 1) % musicList.length;
}
bgMusic.addEventListener("ended", playNextMusic);
window.addEventListener("click", () => { if (bgMusic.paused) playNextMusic(); });

/* === HIỂN THỊ THƯ === */
document.getElementById("btnSubmit").addEventListener("click", showLetter);

function showLetter() {
    const inputName = document.getElementById("nameInput").value.trim();
    const result = document.getElementById("result");
    result.innerHTML = "";

    if (!inputName) {
        alert("Nhập tên hoặc họ tên trước khi nhận thư nhé 💌");
        return;
    }

    const today = "20-10-2025";
    const found = findMessageForName(inputName);
    const displayName = found.displayName;
    const message = found.message;
    const ending = found.ending;
    const morse = found.morse || null;

    // nếu có morse => hiển thị Morse thay dòng gạch
    const divider = morse
        ? `<div class="divider morse">${morse}</div>`
        : `<div class="divider">-----------------------------------------------------------------------</div>`;

    // nếu có Morse => thêm dòng note nhỏ dưới chữ ký
    const morseNote = morse
        ? `<div class="morse-note">note: có thông điệp ẩn nhé bạn !</div>`
        : "";

    result.innerHTML = `
    ${divider}
    <div class="letter-paper">
      <div id="textContainer" class="text-container"></div>
      <div id="endingArea" class="ending"></div>
      <div id="signature" class="signature"></div>
      ${morseNote}
    </div>
    ${divider}
  `;

    const textContainer = document.getElementById("textContainer");
    const endingArea = document.getElementById("endingArea");
    const signature = document.getElementById("signature");

    const fullText =
        `${today}
To: ${displayName}

${message}

`;
    typeTextVertical(fullText, textContainer, () => {
        typeTextVertical(ending, endingArea, () => {
            typeTextVertical("Huy Tran", signature);
            // Nếu có Morse Note thì cho nó hiện trễ 1s sau khi ký tên
            if (morse) {
                setTimeout(() => {
                    const noteEl = document.querySelector(".morse-note");
                    if (noteEl) noteEl.style.opacity = "1";
                }, 1000);
            }
        });
    });
}

/* === TÌM THÔNG ĐIỆP THEO TÊN === */
function findMessageForName(input) {
    const lower = input.toLowerCase();
    for (const g of specialGroups) {
        if (g.names.some(n => n === lower)) {
            return {
                displayName: g.displayName,
                message: g.message,
                ending: g.ending,
                morse: g.morse || null
            };
        }
    }
    return {
        displayName: "Bạn",
        message: "Chúc bạn luôn vui vẻ, hạnh phúc và rạng rỡ trong ngày 20/10 này 💐",
        ending: "Thân mến 💖",
        morse: null
    };
}

/* === HIỆU ỨNG VIẾT TAY (từng ký tự xuống dòng) === */
function typeTextVertical(text, container, callback) {
    container.innerHTML = "";
    let i = 0;
    const chars = text.split("");
    const timer = setInterval(() => {
        const c = chars[i];
        if (c === "\n") container.innerHTML += "<br/>";
        else container.innerHTML += c;
        i++;
        container.scrollTop = container.scrollHeight;
        if (i >= chars.length) {
            clearInterval(timer);
            if (callback) callback();
        }
    }, 100);
}
