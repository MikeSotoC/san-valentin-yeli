document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // FONDO FLOTANTE
    // =========================
    function createFloatingItems() {
        const container = document.getElementById('heartsContainer');
        const items = ['💕','💖','💗','💓','💝','💘','❤️','🌸','🌺','✨','💫','🦋'];
        
        if (!container) return;

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

    function createParticles() {
        const container = document.getElementById('heartsContainer');
        if (!container) return;
        
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
    // BOTÓN NO (HUYE)
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
        "¡Botón equivocado! ➡️ El Sí te espera",
        "Yeli, la resistencia es inútil 💘",
        "¡Haz feliz al osito, Yeli! 🧸💖"
    ];

    window.runAway = function () {

        const noBtn = document.getElementById('noBtn');
        const yesBtn = document.getElementById('yesBtn');
        const hoverMessage = document.getElementById('hoverMessage');

        if (!noBtn || !yesBtn) return;

        // Mover al body una sola vez para evitar problemas de capas
        if (!noBtnMovedToBody) {
            document.body.appendChild(noBtn);
            noBtnMovedToBody = true;
            noBtn.style.position = 'fixed';
            noBtn.style.zIndex = '2147483647';
        }

        const yesRect = yesBtn.getBoundingClientRect();
        const centerX = yesRect.left + yesRect.width / 2;
        const centerY = yesRect.top + yesRect.height / 2;

        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random() * 80;

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

        if (hoverMessage) {
            if (messageTimeout) clearTimeout(messageTimeout);

            hoverMessage.textContent = funnyMessages[runAwayCount % funnyMessages.length];
            hoverMessage.classList.add('show');

            messageTimeout = setTimeout(() => {
                hoverMessage.classList.remove('show');
            }, 3000);
        }

        // Escalar botón Sí
        const scale = Math.min(1.25, 1 + runAwayCount * 0.025);
        yesBtn.style.transform = `scale(${scale})`;

        // Evitar que desaparezca en móvil
        if (runAwayCount > 10 && window.innerWidth > 768) {
            noBtn.style.opacity = Math.max(0.7, 1 - (runAwayCount - 10) * 0.05);
        }
    };

    // =========================
    // BOTÓN SÍ
    // =========================
window.sayYes = function () {

    const music = document.getElementById("bgMusic");

    // Guardar estado de música
    if (music) {
        sessionStorage.setItem("musicTime", music.currentTime);
        sessionStorage.setItem("musicWasPlaying", !music.paused);
    }

    createHeartBurst();

    document.body.style.transition = "all 0.5s ease";
    document.body.style.background = "radial-gradient(circle, #a855f7 0%, #0f0c29 100%)";

    setTimeout(() => {
        window.location.href = "celebration.html";
    }, 800);
};




    // =========================
    // EXPLOSIÓN DE CORAZONES
    // =========================
    function createHeartBurst() {
        const items = ['💕','💖','💗','💓','💝','💘','❤️','🧸','✨'];
        const yesBtn = document.getElementById('yesBtn');
        if (!yesBtn) return;

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
    // CARGAR CELEBRATION SIN RECARGAR (SIN CORTAR MÚSICA)
    // =========================
function loadCelebration() {

    fetch("celebration.html")
        .then(response => response.text())
        .then(html => {

            // Reemplazar contenido
            document.getElementById("app").innerHTML = html;

            // Cargar CSS (solo una vez)
            if (!document.getElementById("celebrationCSS")) {
                const link = document.createElement("link");
                link.id = "celebrationCSS";
                link.rel = "stylesheet";
                link.href = "celebrationstyle.css";
                document.head.appendChild(link);
            }

            // Cargar JS y FORZAR ejecución
            const script = document.createElement("script");
            script.src = "celebrationscript.js";
            script.defer = true;

            script.onload = function () {
                console.log("celebrationscript cargado correctamente");
            };

            document.body.appendChild(script);
        })
        .catch(err => console.error("Error cargando celebration:", err));
}




    // =========================
    // INICIALIZAR
    // =========================
    createFloatingItems();
    createParticles();

    console.log('%c💕 Sorpresa preparada con amor para Yeli 💕', 'color:#ff69b4; font-size:16px;');

});
