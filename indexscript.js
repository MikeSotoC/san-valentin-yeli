document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // Crear elementos flotantes
    // =========================
    function createFloatingItems() {
        const container = document.getElementById('heartsContainer');
        const items = ['💕','💖','💗','💓','💝','💘','❤️','🌸','🌺','✨','💫','🦋'];
        
        for (let i = 0; i < 25; i++) {
            const item = document.createElement('div');
            item.className = 'floating-item';
            item.innerHTML = items[Math.floor(Math.random() * items.length)];
            item.style.left = Math.random() * 100 + 'vw';
            item.style.animationDuration = (Math.random() * 12 + 12) + 's';
            item.style.animationDelay = Math.random() * 10 + 's';
            item.style.fontSize = (Math.random() * 15 + 12) + 'px';
            container.appendChild(item);
        }
    }

    // =========================
    // Crear partículas
    // =========================
    function createParticles() {
        const container = document.getElementById('heartsContainer');
        
        for (let i = 0; i < 40; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.top = Math.random() * 100 + 'vh';
            particle.style.animationDelay = Math.random() * 2 + 's';
            particle.style.background = Math.random() > 0.5 ? '#ff69b4' : '#a855f7';
            container.appendChild(particle);
        }
    }

    // =========================
    // Variables del botón No
    // =========================
    let runAwayCount = 0;
    let messageTimeout = null;
    let noBtnMovedToBody = false;

    const funnyMessages = [
        "¡Jaja! Buen intento, Yeli 😜💕",
        "¡No! ¡Ese botón te tiene miedo! 😏",
        "El botón dice: 'Creo que no' 💖",
        "Aww… mejor di que Sí 😘",
        "¡Ese botón se está haciendo el difícil! 🙈",
        "¡No puedes atraparlo, Yeli! 😄",
        "¡Está huyendo de ti! 💕",
        "¡El botón No abandonó el chat! 😝",
        "¡Botón equivocado! ➡️ El Sí te espera",
        "Yeli, la resistencia es inútil 💘",
        "Ese botón es muy tímido 🙊",
        "Sigue intentando… o mejor presiona Sí 😉",
        "🧸 ¡El osito quiere que digas Sí!",
        "El osito te está juzgando 🧸😂",
        "¡Haz feliz al osito, Yeli! 🧸💖"
    ];

    // =========================
    // Función runAway (CORREGIDA)
    // =========================
    window.runAway = function () {

        const noBtn = document.getElementById('noBtn');
        const yesBtn = document.getElementById('yesBtn');
        const hoverMessage = document.getElementById('hoverMessage');

        // 🔥 SOLUCIÓN DEFINITIVA:
        // Mover el botón al body UNA sola vez
        if (!noBtnMovedToBody) {
            document.body.appendChild(noBtn);
            noBtnMovedToBody = true;

            noBtn.style.position = 'fixed';
            noBtn.style.zIndex = '2147483647'; // máximo posible
        }

        // Posición del botón Sí
        const yesRect = yesBtn.getBoundingClientRect();
        const centerX = yesRect.left + yesRect.width / 2;
        const centerY = yesRect.top + yesRect.height / 2;

        const minRadius = 100;
        const maxRadius = 180;

        const angle = Math.random() * Math.PI * 2;
        const distance = minRadius + Math.random() * (maxRadius - minRadius);

        let newX = centerX + Math.cos(angle) * distance;
        let newY = centerY + Math.sin(angle) * distance;

        const btnWidth = noBtn.offsetWidth;
        const btnHeight = noBtn.offsetHeight;

        const padding = 15;

        newX = Math.max(padding, Math.min(newX - btnWidth/2, window.innerWidth - btnWidth - padding));
        newY = Math.max(padding, Math.min(newY - btnHeight/2, window.innerHeight - btnHeight - padding));

        noBtn.style.left = newX + 'px';
        noBtn.style.top = newY + 'px';
        noBtn.style.transform = `rotate(${Math.random() * 16 - 8}deg)`;

        runAwayCount++;

        if (messageTimeout) clearTimeout(messageTimeout);

        hoverMessage.textContent = funnyMessages[runAwayCount % funnyMessages.length];
        hoverMessage.classList.add('show');

        messageTimeout = setTimeout(() => {
            hoverMessage.classList.remove('show');
        }, 4000);

        // Hacer el Sí más atractivo
        const scale = Math.min(1.25, 1 + runAwayCount * 0.025);
        yesBtn.style.transform = `scale(${scale})`;

        if (runAwayCount > 3) {
            yesBtn.style.boxShadow = `
                0 10px 30px rgba(255,105,180,0.6),
                0 0 ${15 + runAwayCount * 4}px rgba(255,105,180,0.5)
            `;
        }

        // Reducir el No
        if (runAwayCount > 5) {
            const fontSize = Math.max(0.85, 1 - runAwayCount * 0.02);
            noBtn.style.fontSize = fontSize + 'rem';
        }

        if (runAwayCount > 10) {
            noBtn.style.opacity = Math.max(0.4, 1 - (runAwayCount - 10) * 0.1);
        }

        if (runAwayCount === 15) noBtn.textContent = "Está bien 😅";
        if (runAwayCount === 20) noBtn.textContent = "Vale, vale 🏳️";
    };

    // =========================
    // Botón Sí
    // =========================
    window.sayYes = function () {

    // =========================
    // GUARDAR ESTADO DE LA MÚSICA
    // =========================
    const music = document.getElementById("bgMusic");

    if (music) {
        sessionStorage.setItem("musicTime", music.currentTime);
        sessionStorage.setItem("musicWasPlaying", !music.paused);
    }

    createHeartBurst();

    document.body.style.transition = 'all 0.5s ease';
    document.body.style.background = 'radial-gradient(circle, #a855f7 0%, #0f0c29 100%)';

    setTimeout(() => {
        window.location.href = 'celebration.html';
    }, 800);
};


    // =========================
    // Explosión de corazones
    // =========================
    function createHeartBurst() {
        const items = ['💕','💖','💗','💓','💝','💘','❤️','🧸','✨'];
        const yesBtn = document.getElementById('yesBtn');
        const rect = yesBtn.getBoundingClientRect();

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < 40; i++) {
            const item = document.createElement('div');
            item.innerHTML = items[Math.floor(Math.random() * items.length)];
            item.style.position = 'fixed';
            item.style.left = centerX + 'px';
            item.style.top = centerY + 'px';
            item.style.fontSize = (Math.random() * 25 + 15) + 'px';
            item.style.pointerEvents = 'none';
            item.style.zIndex = '10000';
            item.style.transition = 'all 0.7s ease-out';

            document.body.appendChild(item);

            setTimeout(() => {
                const angle = (Math.PI * 2 * i) / 40;
                const distance = 80 + Math.random() * 150;
                item.style.transform = `translate(${Math.cos(angle)*distance}px, ${Math.sin(angle)*distance}px) scale(0)`;
                item.style.opacity = '0';
            }, 10);

            setTimeout(() => item.remove(), 800);
        }
    }

    // =========================
    // Inicializar
    // =========================
    createFloatingItems();
    createParticles();

    console.log('%c💕 ¡Una sorpresa especial para Yeli! 💕', 'font-size: 20px; color: #ff69b4;');
    console.log('%c🧸 ¡El osito está animándote!', 'font-size: 14px; color: #a855f7;');

});
