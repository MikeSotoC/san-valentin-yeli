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
    const START_TIME = 0;   // segundo inicial
    const VOLUME = 0.4;

    let isPlaying = false;
    let userInteracted = false;

    music.volume = VOLUME;
    music.loop = false; // loop manual

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
    // REPRODUCIR
    // =========================
    function playMusic() {
        // SIEMPRE iniciar desde el segundo configurado
        music.currentTime = START_TIME;

        music.play().then(() => {
            isPlaying = true;
            userInteracted = true;
            updateButton();
        }).catch(() => {
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
            playMusic(); // reinicia desde START_TIME
        }
    }

    musicBtn.addEventListener("click", toggleMusic);

    // =========================
    // AUTOPLAY (intento)
    // =========================
    function tryAutoplay() {
        music.currentTime = START_TIME;

        music.play().then(() => {
            isPlaying = true;
            userInteracted = true;
            updateButton();
        }).catch(() => {
            waitForFirstInteraction();
        });
    }

    // =========================
    // PRIMER TOQUE (móvil)
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
    // LOOP desde segundo 11
    // =========================
    music.addEventListener("timeupdate", () => {
        if (!music.duration) return;

        if (music.duration - music.currentTime < 0.3) {
            music.currentTime = START_TIME;
            music.play();
        }
    });

    // =========================
    // VISIBILIDAD
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
