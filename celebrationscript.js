document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // CONFETTI
    // =========================
    const canvas = document.getElementById("confettiCanvas");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const confettiColors = ["#ff69b4", "#ff1493", "#a855f7", "#ffd700", "#ffffff"];
    let confettiParticles = [];

    class Confetti {
        constructor(fromCenter = false) {
            this.reset(fromCenter);
        }

        reset(fromCenter = false) {
            if (fromCenter) {
                this.x = canvas.width / 2;
                this.y = canvas.height / 2;
                this.speedY = Math.random() * 15 - 10;
                this.speedX = Math.random() * 20 - 10;
            } else {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * -canvas.height;
                this.speedY = Math.random() * 1 + 0.5;
                this.speedX = Math.random() * 0.5 - 0.25;
            }

            this.size = Math.random() * 6 + 4;
            this.color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;

            if (this.y > canvas.height + 20) {
                this.reset(false);
            }
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function createConfetti(count = 120) {
        for (let i = 0; i < count; i++) {
            confettiParticles.push(new Confetti());
        }
    }

    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confettiParticles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateConfetti);
    }

    function burstConfetti() {
        for (let i = 0; i < 60; i++) {
            confettiParticles.push(new Confetti(true));
        }
    }

    // Hacer global para HTML
    window.handleInteraction = function (event, type) {
        fillLoveMeter(10);

        if (type === "confetti") burstConfetti();
        if (type === "hug") sendVirtualHug();
        if (type === "jar") openLoveNote();
        if (type === "heart") burstConfetti();
    };

    // =========================
    // FONDO FLOTANTE
    // =========================
    function createFloatingItems() {
        const container = document.getElementById("floatingBg");
        const items = ["💕", "💖", "✨", "🌸", "🦋"];

        for (let i = 0; i < 20; i++) {
            const item = document.createElement("div");
            item.className = "floating-item";
            item.innerHTML = items[Math.floor(Math.random() * items.length)];
            item.style.left = Math.random() * 100 + "vw";
            item.style.top = Math.random() * 100 + "vh";
            item.style.fontSize = (Math.random() * 25 + 20) + "px";
            container.appendChild(item);
        }
    }

    // =========================
    // LOVE JAR
    // =========================
    const loveReasons = [
        { emoji: "😊", text: "Amo tu sonrisa, ilumina todo mi mundo." },
        { emoji: "💭", text: "Siempre estás en mis pensamientos." },
        { emoji: "🎵", text: "Tu risa es mi sonido favorito." },
        { emoji: "🤗", text: "Contigo me siento en paz." },
        { emoji: "✨", text: "Haces mágicos los momentos simples." },
        { emoji: "🦋", text: "Aún me provocas mariposas." },
        { emoji: "💕", text: "Te elegiría en cada vida." },
        { emoji: "💖", text: "Te amo por ser tú, Yeli." }
    ];

    let reasonIndex = 0;

    window.openLoveNote = function () {
        const popup = document.getElementById("loveNotePopup");
        const overlay = document.getElementById("overlay");

        const reason = loveReasons[reasonIndex];

        document.getElementById("noteEmoji").textContent = reason.emoji;
        document.getElementById("noteText").textContent = reason.text;
        document.getElementById("noteNumber").textContent =
            `Razón ${reasonIndex + 1} de ${loveReasons.length}`;

        popup.classList.add("show");
        overlay.classList.add("show");

        reasonIndex = (reasonIndex + 1) % loveReasons.length;

        burstConfetti();
    };

    window.closeLoveNote = function () {
        document.getElementById("overlay").classList.remove("show");
        document.getElementById("loveNotePopup").classList.remove("show");
    };

    // =========================
    // ABRAZO
    // =========================
    function sendVirtualHug() {
        const hug = document.getElementById("hugAnimation");
        const msg = document.getElementById("hugMessage");

        hug.classList.add("show");
        msg.classList.add("show");

        burstConfetti();

        setTimeout(() => {
            hug.classList.remove("show");
            msg.classList.remove("show");
        }, 3500);
    }

    // =========================
    // MEDIDOR DE AMOR
    // =========================
    let loveLevel = 0;
    let infinityMode = false;

    const messages = [
        "¡Sigue tocando! 💕",
        "¡El amor crece! 💖",
        "¡Muchísimo amor! 💗",
        "¡Casi al máximo! 💓",
        "¡Amor infinito! 💝"
    ];

    function fillLoveMeter(amount) {
        if (infinityMode) return;

        loveLevel = Math.min(100, loveLevel + amount);

        const fill = document.getElementById("loveMeterFill");
        const text = document.getElementById("loveMeterText");
        const infinity = document.getElementById("infinityContainer");
        const container = document.getElementById("loveMeterContainer");

        fill.style.width = loveLevel + "%";
        text.textContent = messages[Math.floor(loveLevel / 20)];

        if (loveLevel >= 100) {
            infinityMode = true;
            container.classList.add("morphing");
            setTimeout(() => {
                infinity.classList.add("show");
                text.textContent = "∞ Amor infinito para Yeli ∞";
                text.classList.add("infinity-text");
            }, 300);

            burstConfetti();
        }
    }

    // =========================
    // COUNTDOWN SAN VALENTÍN
    // =========================
    function updateCountdown() {
        const target = new Date("February 14, 2026 00:00:00").getTime();
        const now = new Date().getTime();
        const distance = target - now;

        if (distance < 0) {
            document.getElementById("countdownSection").innerHTML =
                "<p class='countdown-title'>💖 ¡Feliz San Valentín, Yeli! 💖</p>";
            return;
        }

        document.getElementById("days").textContent =
            Math.floor(distance / (1000 * 60 * 60 * 24));
        document.getElementById("hours").textContent =
            Math.floor((distance / (1000 * 60 * 60)) % 24);
        document.getElementById("minutes").textContent =
            Math.floor((distance / (1000 * 60)) % 60);
        document.getElementById("seconds").textContent =
            Math.floor((distance / 1000) % 60);
    }

    // =========================
    // TIEMPO JUNTOS (28/03/2025)
    // =========================
   function updateRelationshipTime() {
    const startDate = new Date("March 28, 2025 00:00:00").getTime();
    const now = new Date().getTime();
    const diff = now - startDate;

    if (diff < 0) return;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("relDays").textContent = days;
    document.getElementById("relHours").textContent = hours;
    document.getElementById("relMinutes").textContent = minutes;
    document.getElementById("relSeconds").textContent = seconds;
}

setInterval(updateRelationshipTime, 1000);
updateRelationshipTime();


    // =========================
    // MÚSICA
    // =========================
    const music = document.getElementById("bgMusic");
    const musicBtn = document.getElementById("musicToggle");

    let playing = false;
    music.volume = 0.4;

    musicBtn.addEventListener("click", function () {
        if (playing) {
            music.pause();
            musicBtn.classList.remove("playing");
        } else {
            music.play();
            musicBtn.classList.add("playing");
        }
        playing = !playing;
    });

    // =========================
    // INICIALIZACIÓN
    // =========================
    createConfetti();
    animateConfetti();
    createFloatingItems();
    updateCountdown();
    updateRelationshipTime();

    setInterval(updateCountdown, 1000);
    setInterval(updateRelationshipTime, 1000);

    setTimeout(burstConfetti, 500);

    console.log("💕 Hecho con amor infinito para Yeli 💕");
});
