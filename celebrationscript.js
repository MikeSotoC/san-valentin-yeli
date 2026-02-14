 // Create floating items
        function createFloatingItems() {
            const container = document.getElementById('heartsContainer');
            const items = ['💕', '💖', '💗', '💓', '💝', '💘', '❤️', '🌸', '🌺', '✨', '💫', '🦋'];
            
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

        // Create twinkling particles
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

        // No button logic
        let runAwayCount = 0;
        let messageTimeout = null;

        const funnyMessages = [
            "Haha! Nice try, Khushi! 😜💕",
            "Nope! That button is scared of you! 😏",
            "The No button says: 'I don't think so!' 💖",
            "Aww, just say Yes already! 😘",
            "That button is playing hard to get! 🙈",
            "You can't catch it, Khushi! 😄",
            "It's running away from you! 💕",
            "The No button has left the chat! 😝",
            "Wrong button! ➡️ Yes is waiting!",
            "Khushi, resistance is futile! 💘",
            "That button is too shy! 🙊",
            "Keep trying... or just click Yes! 😉",
            "🧸 The teddy wants you to say Yes!",
            "The teddy is judging you! 🧸😂",
            "Make the teddy happy, Khushi! 🧸💖"
        ];

        function runAway() {
            const noBtn = document.getElementById('noBtn');
            const yesBtn = document.getElementById('yesBtn');
            const hoverMessage = document.getElementById('hoverMessage');
            
            // Get Yes button position as anchor point
            const yesBtnRect = yesBtn.getBoundingClientRect();
            const yesCenterX = yesBtnRect.left + yesBtnRect.width / 2;
            const yesCenterY = yesBtnRect.top + yesBtnRect.height / 2;
            
            // Strict radius around Yes button (100-180px)
            const minRadius = 100;
            const maxRadius = 180;
            
            // Random angle
            const angle = Math.random() * Math.PI * 2;
            
            // Random distance within radius
            const distance = minRadius + Math.random() * (maxRadius - minRadius);
            
            // Calculate new position
            let newX = yesCenterX + Math.cos(angle) * distance;
            let newY = yesCenterY + Math.sin(angle) * distance;
            
            // Get button dimensions
            const noBtnRect = noBtn.getBoundingClientRect();
            const btnWidth = noBtnRect.width;
            const btnHeight = noBtnRect.height;
            
            // Keep within viewport with padding
            const padding = 15;
            newX = Math.max(padding, Math.min(newX - btnWidth/2, window.innerWidth - btnWidth - padding));
            newY = Math.max(padding, Math.min(newY - btnHeight/2, window.innerHeight - btnHeight - padding));
            
            // Apply position
            noBtn.style.position = 'fixed';
            noBtn.style.left = newX + 'px';
            noBtn.style.top = newY + 'px';
            noBtn.style.transform = `rotate(${Math.random() * 16 - 8}deg)`;
            noBtn.style.zIndex = '999';
            
            runAwayCount++;
            
            // Clear existing timeout
            if (messageTimeout) {
                clearTimeout(messageTimeout);
            }
            
            // Show message
            hoverMessage.textContent = funnyMessages[runAwayCount % funnyMessages.length];
            hoverMessage.classList.add('show');
            
            // Keep message visible for 4 seconds
            messageTimeout = setTimeout(() => {
                hoverMessage.classList.remove('show');
            }, 4000);
            
            // Make Yes button more attractive
            const scale = Math.min(1.25, 1 + runAwayCount * 0.025);
            yesBtn.style.transform = `scale(${scale})`;
            
            if (runAwayCount > 3) {
                yesBtn.style.boxShadow = `
                    0 10px 30px rgba(255,105,180,0.6),
                    0 0 ${15 + runAwayCount * 4}px rgba(255,105,180,0.5)
                `;
            }

            // Shrink No button after many attempts
            if (runAwayCount > 5) {
                const fontSize = Math.max(0.85, 1 - runAwayCount * 0.02);
                noBtn.style.fontSize = fontSize + 'rem';
            }
            
            // Fade No button
            if (runAwayCount > 10) {
                noBtn.style.opacity = Math.max(0.4, 1 - (runAwayCount - 10) * 0.1);
            }

            // Change text
            if (runAwayCount === 15) {
                noBtn.textContent = "Fine! 😅";
            }
            if (runAwayCount === 20) {
                noBtn.textContent = "Ok ok! 🏳️";
            }
        }

        function sayYes() {
            createHeartBurst();
            
            document.body.style.transition = 'all 0.5s ease';
            document.body.style.background = 'radial-gradient(circle, #a855f7 0%, #0f0c29 100%)';
            
            setTimeout(() => {
                window.location.href = 'celebration.html';
            }, 800);
        }

        function createHeartBurst() {
            const items = ['💕', '💖', '💗', '💓', '💝', '💘', '❤️', '🧸', '✨'];
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
                item.style.zIndex = '1000';
                item.style.transition = 'all 0.7s ease-out';
                document.body.appendChild(item);
                
                setTimeout(() => {
                    const angle = (Math.PI * 2 * i) / 40;
                    const distance = 80 + Math.random() * 150;
                    item.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`;
                    item.style.opacity = '0';
                }, 10);
                
                setTimeout(() => item.remove(), 800);
            }
        }

        // Initialize
        createFloatingItems();
        createParticles();

        // Console message
        console.log('%c💕 A special surprise for Khushi! 💕', 'font-size: 20px; color: #ff69b4;');
        console.log('%c🧸 The teddy is rooting for you!', 'font-size: 14px; color: #a855f7;');
