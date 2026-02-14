// ========== CONFETTI SYSTEM ==========
        const canvas = document.getElementById('confettiCanvas');
        const ctx = canvas.getContext('2d');
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const confettiColors = ['#ff69b4', '#ff1493', '#a855f7', '#ffb6c1', '#ff85a2', '#ffd700', '#ffffff', '#ee82ee', '#da70d6'];
        const confettiShapes = ['circle', 'square', 'heart', 'star'];
        
        let confettiParticles = [];

        class Confetti {
            constructor(fromCenter = false) {
                this.reset(fromCenter);
            }

            reset(fromCenter = false) {
                if (fromCenter) {
                    this.x = canvas.width / 2 + (Math.random() - 0.5) * 100;
                    this.y = canvas.height / 2;
                    this.speedY = Math.random() * 15 - 12;
                    this.speedX = Math.random() * 20 - 10;
                } else {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * -canvas.height;
                    this.speedY = Math.random() * 0.5 + 0.2;
                    this.speedX = Math.random() * 0.8 - 0.3;
                }
                this.size = Math.random() * 10 + 5;
                this.color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
                this.shape = confettiShapes[Math.floor(Math.random() * confettiShapes.length)];
                this.rotation = Math.random() * 360;
                this.rotationSpeed = Math.random() * 10 - 5;
                this.wobble = Math.random() * 10;
                this.wobbleSpeed = Math.random() * 0.1;
            }

            update() {
                this.y += this.speedY;
                this.x += this.speedX + Math.sin(this.wobble) * 0.3;
                this.rotation += this.rotationSpeed;
                this.wobble += this.wobbleSpeed;
                this.speedY += 0.005;

                if (this.y > canvas.height + 50) {
                    this.reset(false);
                }
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate((this.rotation * Math.PI) / 180);
                ctx.fillStyle = this.color;

                switch (this.shape) {
                    case 'circle':
                        ctx.beginPath();
                        ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
                        ctx.fill();
                        break;
                    case 'square':
                        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
                        break;
                    case 'heart':
                        this.drawHeart();
                        break;
                    case 'star':
                        this.drawStar();
                        break;
                }

                ctx.restore();
            }

            drawHeart() {
                const size = this.size;
                ctx.beginPath();
                ctx.moveTo(0, size / 4);
                ctx.bezierCurveTo(size / 2, -size / 4, size / 2, -size / 2, 0, -size / 4);
                ctx.bezierCurveTo(-size / 2, -size / 2, -size / 2, -size / 4, 0, size / 4);
                ctx.fill();
            }

            drawStar() {
                const spikes = 5;
                const outerRadius = this.size / 2;
                const innerRadius = this.size / 4;
                
                ctx.beginPath();
                for (let i = 0; i < spikes * 2; i++) {
                    const radius = i % 2 === 0 ? outerRadius : innerRadius;
                    const angle = (i * Math.PI) / spikes - Math.PI / 2;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.closePath();
                ctx.fill();
            }
        }

        function createConfetti(count = 120) {
            for (let i = 0; i < count; i++) {
                const particle = new Confetti(false);
                particle.y = Math.random() * canvas.height;
                confettiParticles.push(particle);
            }
        }

        function animateConfetti() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            confettiParticles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            requestAnimationFrame(animateConfetti);
        }

        function burstConfetti() {
            for (let i = 0; i < 80; i++) {
                confettiParticles.push(new Confetti(true));
            }
            playPopSound();
            
            if (confettiParticles.length > 350) {
                confettiParticles = confettiParticles.slice(-350);
            }
        }

        // ========== FLOATING BACKGROUND ==========
        function createFloatingItems() {
            const container = document.getElementById('floatingBg');
            const items = ['💕', '💖', '💗', '✨', '💫', '🦋', '🌸', '💜'];

            for (let i = 0; i < 20; i++) {
                const item = document.createElement('div');
                item.className = 'floating-item';
                item.innerHTML = items[Math.floor(Math.random() * items.length)];
                item.style.left = Math.random() * 100 + 'vw';
                item.style.top = Math.random() * 100 + 'vh';
                item.style.fontSize = (Math.random() * 30 + 20) + 'px';
                item.style.animationDelay = Math.random() * 5 + 's';
                item.style.animationDuration = (Math.random() * 10 + 10) + 's';
                container.appendChild(item);
            }
        }

        // ========== EMOJI RAIN ==========
        function startEmojiRain() {
            const emojis = ['💕', '💖', '🌸', '✨', '💫', '🦋', '💗', '🌺'];
            
            setInterval(() => {
                const emoji = document.createElement('div');
                emoji.className = 'emoji-rain';
                emoji.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
                emoji.style.left = Math.random() * 100 + 'vw';
                emoji.style.animationDuration = (Math.random() * 4 + 4) + 's';
                document.body.appendChild(emoji);
                
                setTimeout(() => emoji.remove(), 8000);
            }, 700);
        }

        // ========== LOVE JAR ==========
        const loveReasons = [
            { emoji: "😊", text: "I love your beautiful smile that lights up my entire world." },
            { emoji: "💭", text: "I love how you're always on my mind, from morning till night." },
            { emoji: "🎵", text: "I love your laugh - it's my favorite sound in the universe." },
            { emoji: "🤗", text: "I love how safe and warm I feel when I'm with you." },
            { emoji: "✨", text: "I love how you make ordinary moments feel magical." },
            { emoji: "💪", text: "I love how you support me and believe in me always." },
            { emoji: "🦋", text: "I love the butterflies I still get when I see you." },
            { emoji: "🌟", text: "I love how you inspire me to be a better person every day." },
            { emoji: "🥰", text: "I love the way you look at me - like I'm your whole world." },
            { emoji: "💕", text: "I love that you chose me, and I'd choose you in every lifetime." },
            { emoji: "🌈", text: "I love how you bring color and joy into my life." },
            { emoji: "💖", text: "I love you simply because you're YOU, Khushi." },
            { emoji: "🏠", text: "I love how anywhere feels like home when I'm with you." },
            { emoji: "🤝", text: "I love that you're my best friend and my soulmate." },
            { emoji: "💫", text: "I love every little thing about you - the list is endless!" }
        ];

        let currentReasonIndex = 0;

        function openLoveNote() {
            const popup = document.getElementById('loveNotePopup');
            const overlay = document.getElementById('overlay');
            const reason = loveReasons[currentReasonIndex];
            
            document.getElementById('noteEmoji').textContent = reason.emoji;
            document.getElementById('noteText').textContent = reason.text;
            document.getElementById('noteNumber').textContent = `Reason #${currentReasonIndex + 1} of ${loveReasons.length}`;
            
            overlay.classList.add('show');
            popup.classList.add('show');
            
            currentReasonIndex = (currentReasonIndex + 1) % loveReasons.length;
            
            for (let i = 0; i < 20; i++) {
                confettiParticles.push(new Confetti(true));
            }
        }

        function closeLoveNote() {
            const popup = document.getElementById('loveNotePopup');
            const overlay = document.getElementById('overlay');
            
            popup.classList.remove('show');
            overlay.classList.remove('show');
        }

        // ========== VIRTUAL HUG - GIF VERSION ==========
        function sendVirtualHug() {
            const hugAnimation = document.getElementById('hugAnimation');
            const hugMessage = document.getElementById('hugMessage');
            
            // Show hug GIF and message
            hugAnimation.classList.add('show');
            hugMessage.classList.add('show');
            
            // Burst confetti
            burstConfetti();
            
            // Create extra floating hearts around the screen
            for (let i = 0; i < 30; i++) {
                setTimeout(() => {
                    createFloatingHeart();
                }, i * 80);
            }
            
            // Hide after 3.5 seconds (matching animation duration)
            setTimeout(() => {
                hugAnimation.classList.remove('show');
                hugMessage.classList.remove('show');
            }, 3500);
        }

        function createFloatingHeart() {
            const hearts = ['💕', '💖', '💗', '💓', '💝', '🤗'];
            const heart = document.createElement('div');
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.left = (Math.random() * 80 + 10) + 'vw';
            heart.style.top = (Math.random() * 80 + 10) + 'vh';
            heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '2999';
            heart.style.animation = 'pop-heart 1.5s ease-out forwards';
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 1500);
        }

        // ========== LOVE METER - MORPHING INFINITY ==========
        let loveLevel = 0;
        let isInfinityMode = false;
        let infinityTimeout = null;

        const loveMeterMessages = [
            "Keep tapping! 💕",
            "Love is growing! 💖",
            "So much love! 💗",
            "Almost there! 💓",
            "Overflowing! 💝"
        ];

        function fillLoveMeter(amount = 10, sourceX = null, sourceY = null) {
            if (sourceX !== null && sourceY !== null) {
                showMeterFillIndicator(sourceX, sourceY);
            }

            if (isInfinityMode) return;

            loveLevel = Math.min(100, loveLevel + amount);
            
            const fill = document.getElementById('loveMeterFill');
            const text = document.getElementById('loveMeterText');
            
            fill.style.width = loveLevel + '%';
            
            if (loveLevel < 20) {
                text.textContent = loveMeterMessages[0];
            } else if (loveLevel < 40) {
                text.textContent = loveMeterMessages[1];
            } else if (loveLevel < 60) {
                text.textContent = loveMeterMessages[2];
            } else if (loveLevel < 80) {
                text.textContent = loveMeterMessages[3];
            } else if (loveLevel < 100) {
                text.textContent = loveMeterMessages[4];
            }
            
            if (loveLevel >= 100) {
                morphToInfinity();
            }
        }

        function morphToInfinity() {
            isInfinityMode = true;
            
            const meterContainer = document.getElementById('loveMeterContainer');
            const infinityContainer = document.getElementById('infinityContainer');
            const text = document.getElementById('loveMeterText');
            
            meterContainer.classList.add('morphing');
            
            setTimeout(() => {
                infinityContainer.classList.add('show');
                text.textContent = '∞ Infinite Love for Khushi ∞';
                text.classList.add('infinity-text');
            }, 300);
            
            burstConfetti();
            
            infinityTimeout = setTimeout(() => {
                morphBackToBar();
            }, 2500);
        }

        function morphBackToBar() {
            const meterContainer = document.getElementById('loveMeterContainer');
            const infinityContainer = document.getElementById('infinityContainer');
            const fill = document.getElementById('loveMeterFill');
            const text = document.getElementById('loveMeterText');
            
            infinityContainer.classList.remove('show');
            
            setTimeout(() => {
                fill.style.transition = 'none';
                fill.style.width = '0%';
                fill.offsetHeight;
                fill.style.transition = 'width 0.3s ease';
                meterContainer.classList.remove('morphing');
                text.textContent = "Let's fill it again! 💕";
                text.classList.remove('infinity-text');
                loveLevel = 0;
                isInfinityMode = false;
            }, 300);
        }

        function showMeterFillIndicator(x, y) {
            const indicators = ['💕', '💖', '+10', '💗', '+5'];
            const indicator = document.createElement('div');
            indicator.className = 'meter-fill-indicator';
            indicator.innerHTML = indicators[Math.floor(Math.random() * indicators.length)];
            indicator.style.left = x + 'px';
            indicator.style.top = y + 'px';
            
            if (indicator.innerHTML.includes('+')) {
                indicator.style.color = '#ffd700';
                indicator.style.fontWeight = 'bold';
                indicator.style.fontSize = '20px';
                indicator.style.textShadow = '0 0 10px rgba(255,215,0,0.8)';
            }
            
            document.body.appendChild(indicator);
            setTimeout(() => indicator.remove(), 800);
        }

                // ========== UNIFIED INTERACTION HANDLER ==========
        function handleInteraction(event, type) {
            const x = event.clientX || event.touches?.[0]?.clientX || window.innerWidth / 2;
            const y = event.clientY || event.touches?.[0]?.clientY || window.innerHeight / 2;
            
            // Always fill the love meter
            fillLoveMeter(10, x, y);
            
            // Create click hearts
            createClickHeart(event);
            
            // Handle specific interactions
            switch(type) {
                case 'confetti':
                    burstConfetti();
                    break;
                case 'hug':
                    sendVirtualHug();
                    break;
                case 'jar':
                    openLoveNote();
                    break;
                case 'heart':
                    burstConfetti();
                    break;
                case 'meter':
                    // Already handled by fillLoveMeter
                    break;
            }
        }

        // ========== CLICK HEARTS ==========
        function createClickHeart(e) {
            const hearts = ['💕', '💖', '💗', '💓', '💝'];
            const x = e.clientX || e.touches?.[0]?.clientX || window.innerWidth / 2;
            const y = e.clientY || e.touches?.[0]?.clientY || window.innerHeight / 2;
            
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    const heart = document.createElement('div');
                    heart.className = 'click-heart';
                    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
                    heart.style.left = (x - 15 + (Math.random() - 0.5) * 40) + 'px';
                    heart.style.top = (y - 15 + (Math.random() - 0.5) * 40) + 'px';
                    heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
                    document.body.appendChild(heart);
                    
                    setTimeout(() => heart.remove(), 1000);
                }, i * 80);
            }
        }

        // General click handler for the page
        document.addEventListener('click', (e) => {
            if (e.target.closest('.love-jar') || 
                e.target.closest('.action-btn') ||
                e.target.closest('.close-note-btn') ||
                e.target.closest('.mega-heart') ||
                e.target.closest('.love-meter-container') ||
                e.target.closest('.love-meter-wrapper') ||
                e.target.closest('.music-btn')) {
                return;
            }
            
            createClickHeart(e);
            fillLoveMeter(5, e.clientX, e.clientY);
        });

        // ========== SPARKLE CURSOR ==========
        let lastSparkleTime = 0;
        document.addEventListener('mousemove', (e) => {
            const now = Date.now();
            if (now - lastSparkleTime > 50) {
                lastSparkleTime = now;
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.style.left = e.clientX - 4 + 'px';
                sparkle.style.top = e.clientY - 4 + 'px';
                sparkle.style.background = Math.random() > 0.5 ? 
                    'radial-gradient(circle, #ff69b4, transparent)' : 
                    'radial-gradient(circle, #a855f7, transparent)';
                document.body.appendChild(sparkle);
                
                setTimeout(() => sparkle.remove(), 600);
            }
        });

        // ========== COUNTDOWN ==========
        function updateCountdown() {
            const valentinesDay = new Date('February 14, 2025 00:00:00').getTime();
            const now = new Date().getTime();
            const distance = valentinesDay - now;

            if (distance < 0) {
                document.getElementById('countdownSection').innerHTML = `
                    <p class="countdown-title" style="color: #ff69b4; font-size: 1.5rem;">🎉 Happy Valentine's Day, Khushi! 🎉</p>
                    <p style="color: #e0e0e0; font-size: 1.2rem; margin-top: 10px;">Today is OUR special day! 💕</p>
                `;
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        }

        // ========== SOUND EFFECT ==========
        function playPopSound() {
            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = 600;
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.15);
            } catch (e) {
                // Audio not supported
            }
        }

        // ========== KEYBOARD SHORTCUTS ==========
        document.addEventListener('keydown', (e) => {
            // Press 'L' for love burst
            if (e.key.toLowerCase() === 'l') {
                burstConfetti();
                fillLoveMeter(20);
            }
            
            // Press 'H' for hug
            if (e.key.toLowerCase() === 'h') {
                sendVirtualHug();
                fillLoveMeter(15);
            }
            
            // Press 'K' for Khushi special
            if (e.key.toLowerCase() === 'k') {
                for (let i = 0; i < 50; i++) {
                    setTimeout(() => {
                        const heart = document.createElement('div');
                        heart.innerHTML = '💖';
                        heart.style.position = 'fixed';
                        heart.style.left = Math.random() * 100 + 'vw';
                        heart.style.top = Math.random() * 100 + 'vh';
                        heart.style.fontSize = (Math.random() * 40 + 20) + 'px';
                        heart.style.pointerEvents = 'none';
                        heart.style.zIndex = '999';
                        heart.style.animation = 'pop-heart 1.5s ease-out forwards';
                        document.body.appendChild(heart);
                        setTimeout(() => heart.remove(), 1500);
                    }, i * 50);
                }
                fillLoveMeter(50);
            }
            
            // Press 'I' for instant infinity mode
            if (e.key.toLowerCase() === 'i') {
                if (!isInfinityMode) {
                    loveLevel = 100;
                    document.getElementById('loveMeterFill').style.width = '100%';
                    morphToInfinity();
                }
            }
            
            // Press 'J' to open love jar
            if (e.key.toLowerCase() === 'j') {
                openLoveNote();
                fillLoveMeter(10);
            }
            
            // Press 'C' for confetti
            if (e.key.toLowerCase() === 'c') {
                burstConfetti();
                fillLoveMeter(10);
            }
            
            // Press 'G' for GIF hug
            if (e.key.toLowerCase() === 'g') {
                sendVirtualHug();
                fillLoveMeter(15);
            }
        });

        // ========== TOUCH SUPPORT FOR MOBILE ==========
        document.addEventListener('touchstart', (e) => {
            if (e.target.closest('.love-jar') || 
                e.target.closest('.action-btn') ||
                e.target.closest('.close-note-btn') ||
                e.target.closest('.mega-heart') ||
                e.target.closest('.love-meter-container') ||
                e.target.closest('.love-meter-wrapper') ||
                e.target.closest('.music-btn')) {
                return;
            }
            
            const touch = e.touches[0];
            createClickHeart({ clientX: touch.clientX, clientY: touch.clientY });
            fillLoveMeter(5, touch.clientX, touch.clientY);
        });

        // ========== INITIALIZE EVERYTHING ==========
        function init() {
            // Create initial confetti
            createConfetti(120);
            animateConfetti();
            
            // Create floating background items
            createFloatingItems();
            
            // Start emoji rain
            startEmojiRain();
            
            // Start countdown
            updateCountdown();
            setInterval(updateCountdown, 1000);

            // Initial confetti burst on page load
            setTimeout(() => {
                burstConfetti();
            }, 500);

            // Auto-fill love meter slowly at start (to show it's interactive)
            setTimeout(() => {
                const autoFillInterval = setInterval(() => {
                    if (loveLevel < 15 && !isInfinityMode) {
                        loveLevel += 1;
                        document.getElementById('loveMeterFill').style.width = loveLevel + '%';
                    } else {
                        clearInterval(autoFillInterval);
                    }
                }, 300);
            }, 2000);
        }

        // Run initialization when page loads
        init();

        // ========== CONSOLE EASTER EGGS ==========
        console.log('%c💕 Made with infinite love for Khushi! 💕', 
            'font-size: 24px; color: #ff69b4; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 
            'color: #a855f7;');
        console.log('%c🎹 Secret Keyboard Shortcuts:', 
            'font-size: 14px; color: #ffd700; font-weight: bold;');
        console.log('%c   L = Love confetti burst', 
            'font-size: 12px; color: #ff69b4;');
        console.log('%c   H = Send virtual hug (GIF)', 
            'font-size: 12px; color: #ff69b4;');
        console.log('%c   K = Khushi special! 💖', 
            'font-size: 12px; color: #ff69b4;');
        console.log('%c   I = Instant infinity mode', 
            'font-size: 12px; color: #ff69b4;');
        console.log('%c   J = Open love jar', 
            'font-size: 12px; color: #ff69b4;');
        console.log('%c   C = More confetti!', 
            'font-size: 12px; color: #ff69b4;');
        console.log('%c   G = GIF hug animation', 
            'font-size: 12px; color: #ff69b4;');
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 
            'color: #a855f7;');
    </script>

    <!-- ========== MUSIC CONTROLLER ========== -->
    <script>
        const music = document.getElementById('bgMusic');
        const musicBtn = document.getElementById('musicToggle');
        let isMusicPlaying = false;
        let hasMusicInteracted = false;

        // Music settings
        music.volume = 0.4;
        const startTime = 9; // Start from 9 seconds

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
            if (e.target.id === 'musicToggle') return;
            
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

        // Audio error handling
        music.addEventListener('error', (e) => {
            console.error('Audio error:', e);
            console.error('Audio error code:', music.error?.code);
            console.error('Audio error message:', music.error?.message);
        });

        music.addEventListener('loadeddata', () => {
            console.log('Audio loaded successfully');
        });

        // Try autoplay first
        music.currentTime = startTime;
        music.play().then(() => {
            isMusicPlaying = true;
            hasMusicInteracted = true;
            updateMusicButton();
            removeInteractionListeners();
        }).catch((err) => {
            console.log('🎵 Autoplay blocked:', err.message);
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

        // Double-check loop reset
        music.addEventListener('timeupdate', () => {
            if (music.duration - music.currentTime < 0.5) {
                music.currentTime = startTime;
            }
        });
