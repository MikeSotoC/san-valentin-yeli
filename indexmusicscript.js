document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // ELEMENTOS
    // =========================
    const music = document.getElementById("bgMusic");
    const musicBtn = document.getElementById("musicToggle");

    if (!music || !musicBtn) return;

    // =========================
    // CONFIGURACIÓN
    // =========================
    const START_TIME = 11;   // segundo inicial
    const VOLUME = 0.4;

    let isPlaying = false;
    let userInteracted = false;

    music.volume = VOLUME;
    music.loop = false; // controlaremos el loop manualmente

    // =========================
    // VISUALIZADOR
    // =========================
    function createBars() {
        const container = document.createElement("div");
        container.className = "music-bars";

        for (let i = 0; i < 4; i++) {
            const bar = document.createElement("div");
            bar.className = "music-bar";
            container.appendChild(bar);
        }
        return container;
    }

    function updateButton() {
        musicBtn.innerHTML = "";

        if (isPlaying) {
            musicBtn.appendChild(createBars());
            musicBtn.classList.add("playing");
        } else {
            musicBtn.textContent = "🎵";
            musicBtn.classList.remove("playing");
        }
    }

    // =========================
    // REPRODUCIR DESDE SEGUNDO
    // =========================
    function playMusic() {
        music.currentTime = START_TIME;

        music.play().then(() => {
            isPlaying = true;
            userInteracted = true;
            updateButton();
        }).catch(() => {
            // Autoplay bloqueado
            waitForFirstInteraction();
        });
    }

    function pauseMusic() {
        music.pause();
        isPlaying = false;
        updateButton();
    }

    function toggleMusic(e) {
        e.stopPropagation();
        userInteracted = true;

        if (isPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    }

    musicBtn.addEventListener("click", toggleMusic);

    // =========================
    // AUTOPLAY INTENTO
    // =========================
    function tryAutoplay() {
        music.currentTime = START_TIME;

        music.play().then(() => {
            isPlaying = true;
            userInteracted = true;
            updateButton();
        }).catch(() => {
            // Navegador lo bloqueó
            waitForFirstInteraction();
        });
    }

    // =========================
    // PRIMER TOQUE (MÓVIL)
    // =========================
    function waitForFirstInteraction() {

        function firstInteraction() {
            if (userInteracted) return;

            userInteracted = true;
            playMusic();

            document.removeEventListener("click", firstInteraction);
            document.removeEventListener("touchstart", firstInteraction);
        }

        document.addEventListener("click", firstInteraction, { passive: true });
        document.addEventListener("touchstart", firstInteraction, { passive: true });
    }

    // =========================
    // LOOP DESDE EL SEGUNDO 11
    // =========================
    music.addEventListener("timeupdate", () => {
        if (!music.duration) return;

        // Si faltan menos de 0.3s para terminar
        if (music.duration - music.currentTime < 0.3) {
            music.currentTime = START_TIME;
            music.play();
        }
    });

    // =========================
    // PAUSAR SI CAMBIA DE PESTAÑA
    // =========================
    document.addEventListener("visibilitychange", () => {
        if (!userInteracted) return;

        if (document.hidden) {
            music.pause();
        } else if (isPlaying) {
            music.play();
        }
    });

    // =========================
    // INICIAR
    // =========================
    tryAutoplay();

});
