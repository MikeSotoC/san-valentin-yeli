 // ========== MUSIC CONTROLLER ==========
        const music = document.getElementById('bgMusic');
        const musicBtn = document.getElementById('musicToggle');
        let isMusicPlaying = false;
        let hasMusicInteracted = false;

        // Music settings
        music.volume = 0.4;
        const startTime = 11; // Start from 10 seconds

        // Create visualizer bars
        const barsContainer = document.createElement('div');
        barsContainer.className = 'music-bars';
        for (let i = 0; i < 4; i++) {
            const bar = document.createElement('div');
            bar.className = 'music-bar';
            barsContainer.appendChild(bar);
        }
        musicBtn.innerHTML = '';
        musicBtn.appendChild(document.createTextNode('🎵'));

        // Function to start music
        function startMusic() {
            music.currentTime = startTime;
            music.play().then(() => {
                isMusicPlaying = true;
                hasMusicInteracted = true;
                updateMusicButton();
            }).catch(err => {
                console.log('Music play failed:', err);
            });
        }

        // Function to update button appearance
        function updateMusicButton() {
            if (isMusicPlaying) {
                musicBtn.innerHTML = '';
                musicBtn.appendChild(barsContainer.cloneNode(true));
                musicBtn.classList.add('playing');
            } else {
                musicBtn.innerHTML = '🎵';
                musicBtn.classList.remove('playing');
            }
        }

        // Toggle music function
        function toggleMusic(e) {
            e.stopPropagation();
            
            if (!hasMusicInteracted) {
                startMusic();
                return;
            }

            if (isMusicPlaying) {
                music.pause();
                isMusicPlaying = false;
            } else {
                music.currentTime = startTime;
                music.play();
                isMusicPlaying = true;
            }
            updateMusicButton();
        }

        // Button click handler
        musicBtn.addEventListener('click', toggleMusic);

        // All possible interaction events for autoplay
        const interactionEvents = [
            'click',
            'touchstart',
            'mousemove',
            'scroll',
            'keydown'
        ];

        // Handler for first interaction
        function onFirstInteraction(e) {
            if (hasMusicInteracted) return;
            if (e.target.id === 'musicToggle') return; // Let button handle itself
            
            startMusic();
            removeInteractionListeners();
        }

        // Add interaction listeners
        function addInteractionListeners() {
            interactionEvents.forEach(event => {
                document.addEventListener(event, onFirstInteraction, { passive: true });
            });
        }

        // Remove interaction listeners
        function removeInteractionListeners() {
            interactionEvents.forEach(event => {
                document.removeEventListener(event, onFirstInteraction);
            });
        }

        // Try autoplay first
        music.currentTime = startTime;
        music.play().then(() => {
            isMusicPlaying = true;
            hasMusicInteracted = true;
            updateMusicButton();
            removeInteractionListeners();
        }).catch(() => {
            // Autoplay blocked - add listeners for first interaction
            console.log('🎵 Waiting for interaction to play music...');
            addInteractionListeners();
        });

        // Handle page visibility (pause when tab hidden)
        document.addEventListener('visibilitychange', () => {
            if (!hasMusicInteracted) return;
            
            if (document.hidden && isMusicPlaying) {
                music.pause();
            } else if (!document.hidden && isMusicPlaying) {
                music.play();
            }
        });

        // When song loops, restart from 9 seconds
        music.addEventListener('ended', () => {
            music.currentTime = startTime;
            music.play();
        });

        // Double-check loop reset (in case 'ended' doesn't fire with loop)
        music.addEventListener('timeupdate', () => {
            // If near the end, go back to start time
            if (music.duration - music.currentTime < 0.5) {
                music.currentTime = startTime;
            }
        });
