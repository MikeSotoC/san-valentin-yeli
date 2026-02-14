document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // CONFETTI SYSTEM
    // =========================
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const confettiColors = ['#ff69b4', '#ff1493', '#a855f7', '#ffd700', '#ffffff'];
    const confettiShapes = ['circle', 'square', 'heart'];

    let confettiParticles = [];

    class Confetti {
        constructor(fromCenter = false) {
            this.reset(fromCenter);
        }

        reset(fromCenter = false) {
            if (fromCenter) {
                this.x = canvas.width / 2;
                this.y = canvas.height / 2;
                this.speedY = Math.random() * 15 - 12;
                this.speedX = Math.random() * 20 - 10;
            } else {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * -canvas.height;
                this.speedY = Math.random() * 1 + 0.5;
                this.speedX = Math.random() * 0.5 - 0.25;
            }

            this.size = Math.random() * 8 + 4;
            this.color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
            this.shape = confettiShapes[Math.floor(Math.random() * confettiShapes.length)];
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

            if (this.shape === 'circle') {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            } else if (this.shape === 'square') {
                ctx.fillRect(this.x, this.y, this.size, this.size);
            } else {
                ctx.font = this.size * 2 + "px Arial";
                ctx.fillText("💖", this.x, this.y);
            }
        }
    }

    function createConfetti(count = 120) {
        for (let i = 0; i < count; i++) {
            confettiParticles.push(new Confetti(false));
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

    // =========================
    // FONDO FLOTANTE
    // =========================
    function createFloatingItems() {
        const container = document.getElementById('floatingBg');
        const items = ['💕', '💖', '✨', '🌸', '🦋'];

        for (let i = 0; i < 20; i++) {
            const item = document.createElement('div');
            item.className = 'floating-item';
            item.innerHTML = items[Math.floor(Math.random() * items.length)];
            item.style.left = Math.random() * 100 + 'vw';
            item.style.top = Math.random() * 100 + 'vh';
            item.style.fontSize = (Math.random() * 25 + 20) + 'px';
            container.appendChild(item);
        }
    }

    // =========================
    // LOVE JAR
    // =========================
    const loveReasons = [
        { emoji: "😊", text: "Amo tu sonrisa, ilumina todo mi mundo." },
        { emoji: "💭", text: "Porque siempre estás en mis pensamientos." },
        { emoji: "🎵", text: "Tu risa es mi sonido favorito." },
        { emoji: "🤗", text: "Contigo me siento en paz." },
        { emoji: "✨", text: "Haces mágicos los momentos simples." },
        { emoji: "💪", text: "Siempre crees en mí." },
        { emoji: "🦋", text: "Aún me provocas mariposas." },
        { emoji: "🌟", text: "Me inspiras a ser mejor." },
        { emoji: "💕", text: "Te elegiría en cada vida." },
        { emoji: "💖", text: "Te amo por ser tú, Yeli." }
    ];

    let currentReasonIndex = 0;

    window.openLoveNote = function () {
        const popup = document.getElementById('loveNotePopup');
        const overlay = document.getElementById('overlay');
        const reason = loveReasons[currentReasonIndex];

        document.getElementById('noteEmoji').textContent = reason.emoji;
        document.getElementById('noteText').textContent = reason.text;
        document.getElementById('noteNumber').textContent =
            `Razón ${currentReasonIndex + 1} de ${loveReasons.length}`;

        overlay.classList.add('show');
        popup.classList.add('show');

        currentReasonIndex = (currentReasonIndex + 1) % loveReasons.length;

        burstConfetti();
    };

    window.closeLoveNote = function () {
        document.getElementById('overlay').classList.remove('show');
        document.getElementById('loveNotePopup').classList.remove('show');
    };

    // =========================
    // ABRAZO VIRTUAL
    // =========================
    window.sendVirtualHug = function () {
        const hug = document.getElementById('hugAnimation');
        const msg = document.getElementById('hugMessage');

        hug.classList.add('show');
        msg.classList.add('show');

        burstConfetti();

        setTimeout(() => {
            hug.classList.remove('show');
            msg.classList.remove('show');
        }, 3000);
    };

    // =========================
    // MEDIDOR DE AMOR
    // =========================
    let loveLevel = 0;
    let infinityMode = false;

    const messages = [
        "¡Sigue tocando! 💕",
        "¡El amor está creciendo! 💖",
        "¡Muchísimo amor! 💗",
        "¡Casi al máximo! 💓",
        "¡Amor desbordado! 💝"
    ];

    window.fillLoveMeter = function (amount = 10) {
        if (infinityMode) return;

        loveLevel = Math.min(100, loveLevel + amount);

        const fill = document.getElementById('loveMeterFill');
        const text = document.getElementById('loveMeterText');

        fill.style.width = loveLevel + "%";

        text.textContent = messages[Math.floor(loveLevel / 20)];

        if (loveLevel >= 100) {
            infinityMode = true;
            text.textContent = "∞ Amor infinito para Yeli ∞";
            burstConfetti();
        }
    };

    // =========================
    // INTERACCIONES
    // =========================
    window.handleInteraction = function (event, type) {
        fillLoveMeter(10);

        if (type === "confetti") burstConfetti();
        if (type === "hug") sendVirtualHug();
        if (type === "jar") openLoveNote();
    };

    // =========================
    // CONTADOR
    // =========================
    function updateCountdown() {
        const date = new Date("February 14, 2026 00:00:00").getTime();
        const now = new Date().getTime();
        const distance = date - now;

        if (distance < 0) {
            document.getElementById('countdownSection').innerHTML =
                "<p class='countdown-title'>💖 ¡Feliz San Valentín, Yeli! 💖</p>";
            return;
        }

        document.getElementById('days').textContent =
            Math.floor(distance / (1000 * 60 * 60 * 24));
    }

    setInterval(updateCountdown, 1000);

    // =========================
    // INICIALIZACIÓN
    // =========================
    createConfetti();
    animateConfetti();
    createFloatingItems();

    setTimeout(burstConfetti, 500);

    console.log("💕 Hecho con amor para Yeli 💕");
});
