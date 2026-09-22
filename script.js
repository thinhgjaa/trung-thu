/* ====================================================================
   TRUNG THU YÊU THƯƠNG - SCRIPT & INTERACTIVE LOGIC
   Canvas Stars, Fireworks, Hold-to-Charge, Revolving Lantern, Typewriter
   ==================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. CONFIG INITIALIZATION
    // ----------------------------------------------------
    const cfg = window.TRUNG_THU_CONFIG || {};

    // Header & Info
    const headerQuoteText = document.getElementById('headerQuoteText');
    if (headerQuoteText && cfg.headerQuote) {
        headerQuoteText.textContent = cfg.headerQuote;
    }

    const holdInstructionText = document.getElementById('holdInstructionText');
    if (holdInstructionText && cfg.holdInstruction) {
        holdInstructionText.textContent = cfg.holdInstruction;
    }

    // Chapter 2 Config
    if (cfg.chapter2) {
        const ch2Title = document.getElementById('ch2Title');
        const ch2Subtitle = document.getElementById('ch2Subtitle');
        if (ch2Title && cfg.chapter2.title) ch2Title.textContent = cfg.chapter2.title;
        if (ch2Subtitle && cfg.chapter2.subtitle) ch2Subtitle.textContent = cfg.chapter2.subtitle;
    }

    // Chapter 3 Config (Hộp Bánh & Thư Tình)
    if (cfg.chapter3) {
        const ch3Title = document.getElementById('ch3Title');
        const ch3Subtitle = document.getElementById('ch3Subtitle');
        const boxPromptText = document.getElementById('boxPromptText');
        const letterTitleText = document.getElementById('letterTitleText');
        const letterSenderText = document.getElementById('letterSenderText');
        if (ch3Title && cfg.chapter3.title) ch3Title.textContent = cfg.chapter3.title;
        if (ch3Subtitle && cfg.chapter3.subtitle) ch3Subtitle.textContent = cfg.chapter3.subtitle;
        if (boxPromptText && cfg.chapter3.boxPrompt) boxPromptText.textContent = cfg.chapter3.boxPrompt;
        if (letterTitleText && cfg.chapter3.letterTitle) letterTitleText.textContent = cfg.chapter3.letterTitle;
        if (letterSenderText && cfg.chapter3.letterSender) letterSenderText.textContent = cfg.chapter3.letterSender;
    }

    // Chapter 4 Config (Thả Đèn Trời Nguyện Ước)
    if (cfg.chapter4) {
        const ch4Title = document.getElementById('ch4Title');
        const ch4Subtitle = document.getElementById('ch4Subtitle');
        const wishPromptText = document.getElementById('wishPromptText');
        const wishInput = document.getElementById('wishInput');
        const btnReleaseText = document.getElementById('btnReleaseText');
        const successTitleText = document.getElementById('successTitleText');
        const successDescText = document.getElementById('successDescText');
        const btnReplayText = document.getElementById('btnReplayText');
        
        if (ch4Title && cfg.chapter4.title) ch4Title.textContent = cfg.chapter4.title;
        if (ch4Subtitle && cfg.chapter4.subtitle) ch4Subtitle.textContent = cfg.chapter4.subtitle;
        if (wishPromptText && cfg.chapter4.prompt) wishPromptText.textContent = cfg.chapter4.prompt;
        if (wishInput && cfg.chapter4.placeholder) wishInput.placeholder = cfg.chapter4.placeholder;
        if (btnReleaseText && cfg.chapter4.sendButton) btnReleaseText.textContent = cfg.chapter4.sendButton;
        if (successTitleText && cfg.chapter4.afterWishSuccessTitle) successTitleText.textContent = cfg.chapter4.afterWishSuccessTitle;
        if (successDescText && cfg.chapter4.afterWishSuccessText) successDescText.textContent = cfg.chapter4.afterWishSuccessText;
        if (btnReplayText && cfg.chapter4.replayButton) btnReplayText.textContent = cfg.chapter4.replayButton;
    }

    // ----------------------------------------------------
    // 2. AUDIO & CELESTIAL SOUND SYNTHESIZER
    // ----------------------------------------------------
    const bgAudio = document.getElementById('bgAudio');
    const musicToggleBtn = document.getElementById('musicToggleBtn');
    const musicDisc = document.getElementById('musicDisc');
    let isMusicPlaying = false;
    let audioContext = null;

    if (cfg.music && cfg.music.src && bgAudio) {
        bgAudio.src = cfg.music.src;
    }

    function initAudioContext() {
        if (!audioContext) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) audioContext = new AudioCtx();
        }
        if (audioContext && audioContext.state === 'suspended') {
            audioContext.resume();
        }
    }

    // Play synthesized warm chime sound on hold/action
    function playChime(freq = 520, duration = 0.6, type = 'sine') {
        try {
            initAudioContext();
            if (!audioContext) return;
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, audioContext.currentTime);
            osc.frequency.exponentialRampToValueAtTime(freq * 1.5, audioContext.currentTime + duration);

            gain.gain.setValueAtTime(0.08, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);

            osc.connect(gain);
            gain.connect(audioContext.destination);

            osc.start();
            osc.stop(audioContext.currentTime + duration);
        } catch (e) {
            // Audio context not allowed or failed
        }
    }

    // Play celebration chord
    function playCelebrationChord() {
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
            setTimeout(() => playChime(freq, 1.2, 'triangle'), idx * 90);
        });
    }

    // Play warm flame ignition whoosh sound for lantern
    function playFlameIgniteSound() {
        try {
            initAudioContext();
            if (!audioContext) return;
            const now = audioContext.currentTime;

            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(75, now);
            osc.frequency.exponentialRampToValueAtTime(190, now + 0.6);
            osc.frequency.exponentialRampToValueAtTime(45, now + 1.2);

            gain.gain.setValueAtTime(0.01, now);
            gain.gain.linearRampToValueAtTime(0.45, now + 0.35);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 1.3);

            osc.connect(gain);
            gain.connect(audioContext.destination);
            osc.start(now);
            osc.stop(now + 1.35);

            [440, 554.37, 659.25, 880].forEach((f, i) => {
                setTimeout(() => playChime(f, 0.9, 'sine'), i * 110 + 100);
            });
        } catch (e) {}
    }

    // Play sparkling fairy stardust sound
    function playMagicSparkleSound() {
        try {
            initAudioContext();
            [784, 987.77, 1174.66, 1318.51, 1567.98].forEach((freq, idx) => {
                setTimeout(() => playChime(freq, 0.35, 'triangle'), idx * 55);
            });
        } catch (e) {}
    }

    function toggleMusic(forcePlay) {
        initAudioContext();
        if (!bgAudio) return;

        if (forcePlay === true || (!isMusicPlaying && forcePlay !== false)) {
            const playPromise = bgAudio.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    isMusicPlaying = true;
                    if (musicDisc) musicDisc.classList.add('playing');
                }).catch(() => {
                    isMusicPlaying = false;
                    if (musicDisc) musicDisc.classList.remove('playing');
                });
            }
        } else {
            bgAudio.pause();
            isMusicPlaying = false;
            if (musicDisc) musicDisc.classList.remove('playing');
        }
    }

    // Mobile-first audio unlock on first user tap/touch anywhere
    function unlockAudioOnFirstGesture() {
        initAudioContext();
        if (bgAudio) {
            bgAudio.load();
        }
        window.removeEventListener('touchstart', unlockAudioOnFirstGesture);
        window.removeEventListener('pointerdown', unlockAudioOnFirstGesture);
        window.removeEventListener('click', unlockAudioOnFirstGesture);
    }
    window.addEventListener('touchstart', unlockAudioOnFirstGesture, { once: true, passive: true });
    window.addEventListener('pointerdown', unlockAudioOnFirstGesture, { once: true, passive: true });
    window.addEventListener('click', unlockAudioOnFirstGesture, { once: true });

    if (musicToggleBtn) {
        musicToggleBtn.addEventListener('click', () => toggleMusic());
    }

    // ----------------------------------------------------
    // 3. CANVAS STARRY SKY & SHOOTING STARS (RETINA DPI OPTIMIZED)
    // ----------------------------------------------------
    const starCanvas = document.getElementById('star-canvas');
    const starCtx = starCanvas ? starCanvas.getContext('2d') : null;
    let stars = [];
    let shootingStars = [];

    function resizeStarCanvas() {
        if (!starCanvas) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        starCanvas.width = window.innerWidth * dpr;
        starCanvas.height = window.innerHeight * dpr;
        starCanvas.style.width = `${window.innerWidth}px`;
        starCanvas.style.height = `${window.innerHeight}px`;
        if (starCtx) starCtx.scale(dpr, dpr);
        initStars();
    }

    function initStars() {
        stars = [];
        const count = Math.min(120, Math.floor((starCanvas.width * starCanvas.height) / 8000));
        for (let i = 0; i < count; i++) {
            stars.push({
                x: Math.random() * starCanvas.width,
                y: Math.random() * starCanvas.height,
                radius: Math.random() * 1.5 + 0.5,
                alpha: Math.random(),
                speed: Math.random() * 0.02 + 0.005,
                color: Math.random() > 0.3 ? '#ffffff' : '#ffd56b'
            });
        }
    }

    function createShootingStar() {
        if (!starCanvas) return;
        if (Math.random() < 0.015 && shootingStars.length < 2) {
            shootingStars.push({
                x: Math.random() * starCanvas.width,
                y: Math.random() * (starCanvas.height * 0.4),
                length: Math.random() * 80 + 40,
                speed: Math.random() * 7 + 4,
                angle: (Math.PI / 4) + (Math.random() * 0.2 - 0.1),
                opacity: 1
            });
        }
    }

    function drawStars() {
        if (!starCtx) return;
        starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);

        // Draw twinkling stars
        for (let s of stars) {
            s.alpha += s.speed;
            const currentAlpha = 0.3 + Math.abs(Math.sin(s.alpha)) * 0.7;
            starCtx.beginPath();
            starCtx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
            starCtx.fillStyle = s.color;
            starCtx.globalAlpha = currentAlpha;
            starCtx.fill();
        }

        // Draw shooting stars
        createShootingStar();
        for (let i = shootingStars.length - 1; i >= 0; i--) {
            const ss = shootingStars[i];
            const tailX = ss.x - Math.cos(ss.angle) * ss.length;
            const tailY = ss.y - Math.sin(ss.angle) * ss.length;

            const grad = starCtx.createLinearGradient(ss.x, ss.y, tailX, tailY);
            grad.addColorStop(0, `rgba(255, 255, 255, ${ss.opacity})`);
            grad.addColorStop(0.4, `rgba(255, 215, 107, ${ss.opacity * 0.6})`);
            grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

            starCtx.strokeStyle = grad;
            starCtx.lineWidth = 2;
            starCtx.beginPath();
            starCtx.moveTo(ss.x, ss.y);
            starCtx.lineTo(tailX, tailY);
            starCtx.stroke();

            ss.x += Math.cos(ss.angle) * ss.speed;
            ss.y += Math.sin(ss.angle) * ss.speed;
            ss.opacity -= 0.02;

            if (ss.opacity <= 0 || ss.x > starCanvas.width || ss.y > starCanvas.height) {
                shootingStars.splice(i, 1);
            }
        }

        starCtx.globalAlpha = 1;
        requestAnimationFrame(drawStars);
    }

    if (starCanvas) {
        window.addEventListener('resize', resizeStarCanvas);
        resizeStarCanvas();
        drawStars();
    }

    // ----------------------------------------------------
    // 4. CANVAS FIREWORKS & SPARKLE SYSTEM
    // ----------------------------------------------------
    const fireworkCanvas = document.getElementById('firework-canvas');
    const fwCtx = fireworkCanvas ? fireworkCanvas.getContext('2d') : null;
    let fireworks = [];

    function resizeFireworkCanvas() {
        if (!fireworkCanvas) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        fireworkCanvas.width = window.innerWidth * dpr;
        fireworkCanvas.height = window.innerHeight * dpr;
        fireworkCanvas.style.width = `${window.innerWidth}px`;
        fireworkCanvas.style.height = `${window.innerHeight}px`;
        if (fwCtx) fwCtx.scale(dpr, dpr);
    }
    if (fireworkCanvas) {
        window.addEventListener('resize', resizeFireworkCanvas);
        resizeFireworkCanvas();
    }

    // ----------------------------------------------------
    // REALISTIC FIREWORK AUDIO SYNTHESIZER
    // Whistle launch + heavy bass boom + crackle sizzle
    // ----------------------------------------------------
    function playRealisticFireworkSound(intensity = 1) {
        try {
            initAudioContext();
            if (!audioContext) return;
            const now = audioContext.currentTime;

            // 1. Sub-bass boom & low frequency rumble
            const boomOsc = audioContext.createOscillator();
            const boomGain = audioContext.createGain();
            boomOsc.type = 'triangle';
            boomOsc.frequency.setValueAtTime(140 + Math.random() * 40, now);
            boomOsc.frequency.exponentialRampToValueAtTime(28, now + 0.65);
            boomGain.gain.setValueAtTime(0.6 * intensity, now);
            boomGain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

            boomOsc.connect(boomGain);
            boomGain.connect(audioContext.destination);
            boomOsc.start(now);
            boomOsc.stop(now + 0.75);

            // 2. White noise blast (the explosive crack & echo)
            const bufferSize = Math.floor(audioContext.sampleRate * 0.9);
            const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
            const output = noiseBuffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                output[i] = Math.random() * 2 - 1;
            }

            const whiteNoise = audioContext.createBufferSource();
            whiteNoise.buffer = noiseBuffer;

            const filter = audioContext.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(1400, now);
            filter.frequency.exponentialRampToValueAtTime(180, now + 0.85);

            const noiseGain = audioContext.createGain();
            noiseGain.gain.setValueAtTime(0.65 * intensity, now);
            noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

            whiteNoise.connect(filter);
            filter.connect(noiseGain);
            noiseGain.connect(audioContext.destination);

            whiteNoise.start(now);
            whiteNoise.stop(now + 0.9);

            // 3. Embers crackle & sparkle pops
            const crackleCount = Math.floor(Math.random() * 5) + 4;
            for (let c = 0; c < crackleCount; c++) {
                const crackleDelay = 0.18 + Math.random() * 0.65;
                setTimeout(() => {
                    if (!audioContext) return;
                    const t = audioContext.currentTime;
                    const popOsc = audioContext.createOscillator();
                    const popGain = audioContext.createGain();
                    popOsc.type = 'sawtooth';
                    popOsc.frequency.setValueAtTime(1600 + Math.random() * 1400, t);
                    popOsc.frequency.exponentialRampToValueAtTime(120, t + 0.035);
                    popGain.gain.setValueAtTime(0.12 * intensity, t);
                    popGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.035);

                    popOsc.connect(popGain);
                    popGain.connect(audioContext.destination);
                    popOsc.start(t);
                    popOsc.stop(t + 0.04);
                }, crackleDelay * 1000);
            }
        } catch (e) {
            // Audio context fallback
        }
    }

    let isFireworkLoopRunning = false;

    function createFirework(x, y, particleCount = 45) {
        const colors = ['#ffd56b', '#ff7a18', '#ee5253', '#00d2d3', '#ffffff', '#ff9ff3', '#f368e0'];
        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 6 + 1.8;
            fireworks.push({
                x,
                y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                color: colors[Math.floor(Math.random() * colors.length)],
                radius: Math.random() * 2.8 + 1,
                alpha: 1,
                decay: Math.random() * 0.018 + 0.012
            });
        }

        // Kích hoạt vòng lặp render pháo hoa chỉ khi có hạt (tiết kiệm pin tối đa cho điện thoại)
        if (!isFireworkLoopRunning && fireworkCanvas) {
            isFireworkLoopRunning = true;
            requestAnimationFrame(updateFireworks);
        }
    }

    function launchCelebrationFireworks() {
        const count = 5;
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const x = window.innerWidth * (0.2 + Math.random() * 0.6);
                const y = window.innerHeight * (0.2 + Math.random() * 0.35);
                createFirework(x, y, 65);
                playRealisticFireworkSound(0.85);
            }, i * 360);
        }
    }

    // Pháo hoa hình Trái Tim tình yêu lãng mạn
    function createHeartFirework(centerX, centerY, color = '#ff7675', scale = 4.2) {
        const pointCount = 38;
        for (let i = 0; i < pointCount; i++) {
            const t = (i / pointCount) * Math.PI * 2;
            const hx = 16 * Math.pow(Math.sin(t), 3);
            const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
            const vx = (hx * scale) / 22;
            const vy = (hy * scale) / 22;
            fireworks.push({
                x: centerX,
                y: centerY,
                vx: vx,
                vy: vy,
                color: color,
                radius: 2.8,
                alpha: 1,
                decay: 0.013
            });
        }
        if (!isFireworkLoopRunning && fireworkCanvas) {
            isFireworkLoopRunning = true;
            requestAnimationFrame(updateFireworks);
        }
    }

    // Pháo hoa dạng Liễu Rủ Hoàng Kim lấp lánh
    function createSparkleWillowFirework(centerX, centerY, color = '#ffd56b') {
        const count = 52;
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 4.8 + 1.2;
            fireworks.push({
                x: centerX,
                y: centerY,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                color: color,
                radius: Math.random() * 2.5 + 1.2,
                alpha: 1,
                decay: 0.009 // Rơi lâu hơn và phát sáng lấp lánh
            });
        }
        if (!isFireworkLoopRunning && fireworkCanvas) {
            isFireworkLoopRunning = true;
            requestAnimationFrame(updateFireworks);
        }
    }

    // Đại tiệc pháo hoa đa tầng chúc mừng thả đèn trời (đồng bộ nhịp bay chậm rãi 12s)
    function launchGrandLanternCelebration() {
        // Tầng 1: Đốm sáng bùng nổ êm ái chân lồng đèn
        setTimeout(() => {
            createFirework(window.innerWidth * 0.5, window.innerHeight * 0.45, 45);
            playRealisticFireworkSound(0.65);
        }, 800);

        // Tầng 2: Cặp pháo hoa Trái Tim đôi hai bên màn hình khi đèn lên tầng trung
        setTimeout(() => {
            createHeartFirework(window.innerWidth * 0.26, window.innerHeight * 0.32, '#ff7675', 4.5);
            playRealisticFireworkSound(0.85);
        }, 2400);

        setTimeout(() => {
            createHeartFirework(window.innerWidth * 0.74, window.innerHeight * 0.28, '#fd79a8', 4.5);
            playRealisticFireworkSound(0.85);
        }, 4200);

        // Tầng 3: Pháo hoa Liễu Rủ Hoàng Kim lộng lẫy chầm chậm buông rủ
        setTimeout(() => {
            createSparkleWillowFirework(window.innerWidth * 0.42, window.innerHeight * 0.25, '#ffd56b');
            playRealisticFireworkSound(1.0);
        }, 6000);

        setTimeout(() => {
            createSparkleWillowFirework(window.innerWidth * 0.68, window.innerHeight * 0.35, '#fff2a3');
            playRealisticFireworkSound(0.95);
        }, 7400);

        // Tầng 4: Đại kết cục bừng sáng toàn bầu trời khi đèn ước nguyện lên cao
        setTimeout(() => {
            createFirework(window.innerWidth * 0.32, window.innerHeight * 0.2, 70);
            createFirework(window.innerWidth * 0.52, window.innerHeight * 0.16, 75);
            createFirework(window.innerWidth * 0.76, window.innerHeight * 0.22, 70);
            playRealisticFireworkSound(1.3);
            playCelebrationChord();
        }, 9200);
    }

    function updateFireworks() {
        if (!fwCtx || !fireworkCanvas) {
            isFireworkLoopRunning = false;
            return;
        }

        fwCtx.clearRect(0, 0, fireworkCanvas.width, fireworkCanvas.height);

        for (let i = fireworks.length - 1; i >= 0; i--) {
            const p = fireworks[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.04;
            p.alpha -= p.decay;

            if (p.alpha <= 0) {
                fireworks.splice(i, 1);
                continue;
            }

            fwCtx.save();
            fwCtx.globalAlpha = p.alpha;
            fwCtx.fillStyle = p.color;
            fwCtx.shadowBlur = 8;
            fwCtx.shadowColor = p.color;
            fwCtx.beginPath();
            fwCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            fwCtx.fill();
            fwCtx.restore();
        }

        if (fireworks.length > 0) {
            requestAnimationFrame(updateFireworks);
        } else {
            // Đã tắt toàn bộ pháo hoa -> dừng vòng lặp để GPU điện thoại nghỉ ngơi
            fwCtx.clearRect(0, 0, fireworkCanvas.width, fireworkCanvas.height);
            isFireworkLoopRunning = false;
        }
    }

    // ----------------------------------------------------
    // 5. SCENE & STORY PROGRESSION CONTROLLER
    // ----------------------------------------------------
    let currentChapter = 1;
    const totalChapters = 4;
    const progressSteps = document.querySelectorAll('.progress-step');

    function updateProgressUI(chapterNum) {
        progressSteps.forEach((step, idx) => {
            if (idx + 1 <= chapterNum) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }

    function goToScene(chapterNum) {
        if (chapterNum < 1 || chapterNum > totalChapters) return;

        const currentSceneEl = document.getElementById(`scene-${currentChapter}`);
        const nextSceneEl = document.getElementById(`scene-${chapterNum}`);

        if (currentSceneEl) {
            currentSceneEl.classList.remove('scene-active');
            currentSceneEl.classList.add('scene-hidden');
        }

        currentChapter = chapterNum;
        updateProgressUI(currentChapter);

        setTimeout(() => {
            if (nextSceneEl) {
                nextSceneEl.classList.remove('scene-hidden');
                nextSceneEl.classList.add('scene-active');
            }
            onSceneEntered(currentChapter);
        }, 300);
    }

    // Hỗ trợ chạm vào từng vạch tiến trình trên màn hình điện thoại để xem lại
    progressSteps.forEach((step, idx) => {
        step.addEventListener('click', () => {
            const targetStep = idx + 1;
            if (targetStep !== currentChapter) {
                if (navigator.vibrate) navigator.vibrate(15);
                goToScene(targetStep);
            }
        });
    });

    // Xử lý tất cả nút "Quay lại" trên các chương
    document.querySelectorAll('.btn-scene-back').forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentChapter > 1) {
                if (navigator.vibrate) navigator.vibrate(15);
                goToScene(currentChapter - 1);
            }
        });
    });

    function onSceneEntered(chapterNum) {
        playChime(650, 0.4);

        if (chapterNum === 2) {
            launchCelebrationFireworks();
            initChapter2Lanterns();
        } else if (chapterNum === 3) {
            // Chapter 3: Hộp bánh Trung Thu & Bức thư tình - chờ người dùng chạm mở
        } else if (chapterNum === 4) {
            initChapter4Wish();
        }
    }

    // ----------------------------------------------------
    // 6. CHƯƠNG 1: TƯƠNG TÁC ẤN GIỮ MẶT TRĂNG (HOLD TO CHARGE)
    // ----------------------------------------------------
    const luminousMoon = document.getElementById('luminousMoon');
    const holdProgressBar = document.getElementById('holdProgressBar');
    const holdRipples = document.getElementById('holdRipples');
    const holdPrompt = document.getElementById('holdPrompt');
    const holdHintText = document.getElementById('holdHintText');
    const jadeRabbit = document.getElementById('jadeRabbit');

    const moonStageContainer = document.querySelector('.moon-stage-container');

    const totalCircumference = 421;
    const holdDuration = (cfg.chapter1 && cfg.chapter1.moonHoldDurationMs) || 1300;
    let holdTimer = null;
    let holdStartTime = 0;
    let isHolding = false;
    let chimeInterval = null;
    let quickTapCount = 0;
    let quickTapResetTimer = null;

    function startHolding(e) {
        if (currentChapter !== 1) return;
        if (isHolding) return;

        // Chặn cuộn trang ngoài ý muốn khi đang giữ trên điện thoại
        if (e && e.cancelable && e.type !== 'mousedown') {
            e.preventDefault();
        }

        try {
            initAudioContext();
        } catch (err) {}

        isHolding = true;
        holdStartTime = Date.now();

        // Hiệu ứng thị giác phản hồi tức thì
        if (luminousMoon) luminousMoon.classList.add('holding');
        if (holdPrompt) holdPrompt.classList.add('holding');
        if (holdInstructionText) holdInstructionText.textContent = "Đang nạp năng lượng... ✨";
        if (holdHintText) holdHintText.textContent = "Ánh trăng đang tụ năng lượng yêu thương... ✨";

        if (holdProgressBar) {
            holdProgressBar.style.transition = 'none';
        }

        if (navigator.vibrate) navigator.vibrate(35);
        playChime(440, 0.3);

        chimeInterval = setInterval(() => {
            playChime(500 + Math.random() * 200, 0.2, 'triangle');
            if (navigator.vibrate) navigator.vibrate(14);
        }, 200);

        createRipple();

        function chargeStep() {
            if (!isHolding) return;
            const elapsed = Date.now() - holdStartTime;
            const progress = Math.min(1, elapsed / holdDuration);
            const offset = totalCircumference * (1 - progress);

            if (holdProgressBar) {
                holdProgressBar.style.strokeDashoffset = offset;
            }

            if (progress >= 1) {
                completeHoldSuccess();
            } else {
                holdTimer = requestAnimationFrame(chargeStep);
            }
        }

        holdTimer = requestAnimationFrame(chargeStep);
    }

    function cancelHolding(e) {
        if (!isHolding) return;
        const heldDuration = Date.now() - holdStartTime;
        isHolding = false;

        if (holdTimer) cancelAnimationFrame(holdTimer);
        if (chimeInterval) clearInterval(chimeInterval);

        // Khôi phục trạng thái thị giác
        if (luminousMoon) luminousMoon.classList.remove('holding');
        if (holdPrompt) holdPrompt.classList.remove('holding');
        if (holdInstructionText && cfg.holdInstruction) {
            holdInstructionText.textContent = cfg.holdInstruction;
        }

        if (holdProgressBar) {
            holdProgressBar.style.transition = 'stroke-dashoffset 0.35s ease';
            holdProgressBar.style.strokeDashoffset = totalCircumference;
        }

        if (currentChapter === 1) {
            if (heldDuration > 100 && heldDuration < holdDuration) {
                if (holdHintText) holdHintText.textContent = "Giữ ngón tay trên trăng khoảng 1 giây để mở nhé em! ✨";
            }
        }
    }

    function createRipple() {
        if (!holdRipples) return;
        const wave = document.createElement('div');
        wave.className = 'hold-ripple-wave';
        holdRipples.appendChild(wave);
        setTimeout(() => wave.remove(), 1000);
    }

    function completeHoldSuccess() {
        isHolding = false;
        if (holdTimer) cancelAnimationFrame(holdTimer);
        if (chimeInterval) clearInterval(chimeInterval);

        if (luminousMoon) luminousMoon.classList.remove('holding');
        if (holdPrompt) holdPrompt.classList.remove('holding');

        if (navigator.vibrate) navigator.vibrate([60, 80, 160]);
        playCelebrationChord();
        playRealisticFireworkSound(1.2);

        if (cfg.music && cfg.music.autoplayOnHold !== false) {
            toggleMusic(true);
        }

        if (holdHintText) holdHintText.textContent = "Khai mở thành công! Trăng rằm tỏa sáng! 🌕✨";

        if (luminousMoon) {
            const rect = luminousMoon.getBoundingClientRect();
            createFirework(rect.left + rect.width / 2, rect.top + rect.height / 2, 70);
        }

        setTimeout(() => {
            goToScene(2);
        }, 550);
    }

    // Gắn sự kiện giữ cho cả Mặt Trăng và Nút "Ấn giữ vào mặt trăng"
    const interactiveHoldTargets = [luminousMoon, holdPrompt].filter(Boolean);

    interactiveHoldTargets.forEach(target => {
        // Pointer Events (hỗ trợ cả chạm di động và chuột máy tính)
        target.addEventListener('pointerdown', (e) => {
            startHolding(e);
        });

        // Touch events fallback cho điện thoại cũ
        target.addEventListener('touchstart', (e) => {
            startHolding(e);
        }, { passive: false });

        // Mouse events fallback cho máy tính
        target.addEventListener('mousedown', (e) => {
            if (e.button === 0) startHolding(e);
        });

        // Chống menu chuột phải / menu giữ ảnh
        target.addEventListener('contextmenu', (e) => e.preventDefault());

        // Hỗ trợ chạm 2 lần liên tiếp để mở ngay nếu người dùng không giữ đủ lâu
        target.addEventListener('click', (e) => {
            quickTapCount++;
            if (quickTapResetTimer) clearTimeout(quickTapResetTimer);
            quickTapResetTimer = setTimeout(() => { quickTapCount = 0; }, 700);

            if (quickTapCount >= 2 && currentChapter === 1) {
                completeHoldSuccess();
            } else if (currentChapter === 1) {
                createRipple();
                playChime(520, 0.2);
                if (holdHintText) holdHintText.textContent = "Hãy ấn và GIỮ ngón tay khoảng 1 giây để đón bất ngờ nhé! 🌕";
            }
        });
    });

    // Thả chuột hoặc nhấc ngón tay ở bất cứ đâu trên màn hình cũng giải phóng trạng thái giữ an toàn
    window.addEventListener('pointerup', cancelHolding);
    window.addEventListener('pointercancel', cancelHolding);
    window.addEventListener('touchend', cancelHolding);
    window.addEventListener('touchcancel', cancelHolding);
    window.addEventListener('mouseup', cancelHolding);

    // ----------------------------------------------------
    // HIỆU ỨNG CUNG TRĂNG & THỎ NGỌC LÃNG MẠN (SCENE 1)
    // ----------------------------------------------------
    function initMoonOrbitStardust() {
        const orbitContainer = document.getElementById('moonOrbitParticles');
        if (!orbitContainer) return;
        orbitContainer.innerHTML = '';
        const speckCount = 10;
        for (let i = 0; i < speckCount; i++) {
            const speck = document.createElement('div');
            speck.className = 'moon-orbit-speck';
            const angle = (i / speckCount) * Math.PI * 2;
            const radius = 78 + (i % 3) * 8;
            const x = 80 + Math.cos(angle) * radius;
            const y = 80 + Math.sin(angle) * radius;
            speck.style.left = `${x}px`;
            speck.style.top = `${y}px`;
            speck.style.animationDelay = `${(i * 0.22).toFixed(2)}s`;
            orbitContainer.appendChild(speck);
        }
    }

    function initOsmanthusShower() {
        const petalContainer = document.getElementById('osmanthusPetals');
        if (!petalContainer) return;
        petalContainer.innerHTML = '';
        const petalCount = 14;
        for (let i = 0; i < petalCount; i++) {
            const petal = document.createElement('div');
            petal.className = 'osmanthus-petal';
            const leftPercent = Math.random() * 95;
            const duration = 6.5 + Math.random() * 6;
            const delay = Math.random() * 6;
            const scale = 0.65 + Math.random() * 0.55;

            petal.style.left = `${leftPercent}%`;
            petal.style.animationDuration = `${duration}s`;
            petal.style.animationDelay = `${delay}s`;
            petal.style.transform = `scale(${scale})`;
            petalContainer.appendChild(petal);
        }
    }

    function initInteractiveJadeRabbit() {
        const rabbitTapZone = document.getElementById('rabbitTapZone');
        const rabbitBranchWrapper = document.getElementById('rabbitBranchWrapper');
        const rabbitSpeechBubble = document.getElementById('rabbitSpeechBubble');
        const rabbitBubbleText = document.getElementById('rabbitBubbleText');
        const rabbitHeartsContainer = document.getElementById('rabbitHeartsContainer');
        let bubbleTimer = null;
        let rabbitQuoteIdx = 0;

        const rabbitQuotes = [
            "🐰 Thỏ ngọc chúc em bé Trung Thu ngập tràn hạnh phúc! 🌸",
            "💕 Ở đây có chàng Cuội thương em nhất trần đời đó! ✨",
            "🌕 Trăng rằm sáng soi, nhưng nụ cười của em mới là đẹp nhất!",
            "✨ Tặng em túi bụi sao lấp lánh mang lại vạn điều ước! 💫",
            "🥮 Bánh dẻo bánh nướng cũng không ngọt ngào bằng em! 💕",
            "🐰 Thỏ ngọc gửi tặng em một triệu trái tim yêu thương nè! 💖",
            "🌸 Chúc công chúa nhỏ của anh luôn an yên và rạng rỡ! 🎀",
            "🌕 Mùa trăng này và mãi mãi sau này, anh đều muốn cùng em ngắm trăng! 🏮"
        ];

        function handleRabbitTouch(e) {
            if (e) {
                e.stopPropagation();
                if (e.cancelable && e.type !== 'mousedown') e.preventDefault();
            }
            if (navigator.vibrate) navigator.vibrate([25, 40, 20]);
            playMagicSparkleSound();
            playRealisticFireworkSound(0.4);

            // Hiệu ứng nhảy tung tăng đáng yêu
            if (rabbitBranchWrapper) {
                rabbitBranchWrapper.classList.remove('rabbit-hopping');
                void rabbitBranchWrapper.offsetWidth;
                rabbitBranchWrapper.classList.add('rabbit-hopping');
            }

            // Hiện bong bóng thoại lời chúc ngọt ngào
            if (rabbitSpeechBubble && rabbitBubbleText) {
                rabbitBubbleText.textContent = rabbitQuotes[rabbitQuoteIdx % rabbitQuotes.length];
                rabbitQuoteIdx++;
                rabbitSpeechBubble.classList.add('active');

                if (bubbleTimer) clearTimeout(bubbleTimer);
                bubbleTimer = setTimeout(() => {
                    rabbitSpeechBubble.classList.remove('active');
                }, 4500);
            }

            // Bắn tim và icon trung thu bay lên từ chú thỏ
            if (rabbitHeartsContainer) {
                const emojis = ['💖', '🌸', '🐰', '✨', '🥮', '💫', '💕'];
                const count = 7;
                for (let i = 0; i < count; i++) {
                    const heart = document.createElement('div');
                    heart.className = 'floating-heart-emoji';
                    heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];

                    const randX = (Math.random() * 120 - 40) + 'px';
                    const randRot = (Math.random() * 60 - 30) + 'deg';
                    heart.style.setProperty('--rand-x', randX);
                    heart.style.setProperty('--rand-rot', randRot);
                    heart.style.left = `${65 + Math.random() * 50}px`;
                    heart.style.bottom = `${120 + Math.random() * 30}px`;
                    heart.style.animationDelay = `${i * 0.08}s`;

                    rabbitHeartsContainer.appendChild(heart);
                    setTimeout(() => heart.remove(), 1600);
                }
            }

            if (holdHintText && currentChapter === 1) {
                holdHintText.textContent = "Thỏ ngọc đang lắng nghe tâm tư của em bé đó! 🐰✨";
            }
        }

        if (rabbitTapZone) {
            rabbitTapZone.addEventListener('click', handleRabbitTouch);
            rabbitTapZone.addEventListener('touchstart', (e) => {
                handleRabbitTouch(e);
            }, { passive: false });
        }
    }

    initMoonOrbitStardust();
    initOsmanthusShower();
    initInteractiveJadeRabbit();

    // ----------------------------------------------------
    // 7. CHƯƠNG 2: HỘI HOA ĐĂNG & LỜI CHÚC TRÊN TRỜI SAO
    // ----------------------------------------------------
    const lanternWishesList = document.getElementById('lanternWishesList');
    const ch2DynamicWish = document.getElementById('ch2DynamicWish');
    const lanternCountText = document.getElementById('lanternCountText');
    const btnGoToCh3 = document.getElementById('btnGoToCh3');
    const openedLanternsSet = new Set();

    const defaultWishes = [
        "Chúc em bé một mùa Trung Thu ngập tràn hạnh phúc 🌕",
        "Nụ cười của em là ánh sáng rạng rỡ nhất trần gian ✨",
        "Mỗi mùa Trung Thu sau này, đều mong có em cùng ngắm trăng 🏮",
        "Yêu em nhiều hơn cả triệu vì sao trên trời 💕",
        "Em là công chúa nhỏ đáng yêu nhất trong lòng anh 🐰",
        "Mong hai đứa mình mãi luôn bình yên và yêu thương đong đầy 🌸",
        "Ánh trăng rằm sáng soi cho tình yêu đôi ta ngàn năm vĩnh cửu 💫"
    ];

    const wishesArray = (cfg.chapter2 && cfg.chapter2.lanternWishes) || defaultWishes;

    function initChapter2Lanterns() {
        if (!lanternWishesList) return;
        lanternWishesList.innerHTML = '';
        openedLanternsSet.clear();
        if (lanternCountText) lanternCountText.textContent = "Chạm vào đèn trời để mở điều ước (0/7)";

        const realLanternTypes = [
            { img: 'assets/images/sky_lantern_screen_transparent.png', title: 'Đèn Trời Khổng Minh' },
            { img: 'assets/images/star_lantern_transparent.png', title: 'Đèn Ông Sao 5 Cánh' },
            { img: 'assets/images/carp_lantern_transparent.png', title: 'Đèn Cá Chép' },
            { img: 'assets/images/lotus_lantern_transparent.png', title: 'Đèn Hoa Đăng Sen' }
        ];

        for (let i = 0; i < 7; i++) {
            const lantern = document.createElement('div');
            lantern.className = 'sky-wish-lantern';
            const leftPos = 6 + (i * 13) + Math.random() * 4;
            const animDuration = 9 + Math.random() * 6;
            const animDelay = Math.random() * 4;

            lantern.style.left = `${leftPos}%`;
            lantern.style.animationDuration = `${animDuration}s`;
            lantern.style.animationDelay = `${animDelay}s`;

            const wishText = wishesArray[i % wishesArray.length];
            const lanternData = realLanternTypes[i % realLanternTypes.length];

            lantern.innerHTML = `
                <div class="lantern-core-real" title="${lanternData.title}">
                    <img src="${lanternData.img}" alt="${lanternData.title}">
                </div>
                <div class="lantern-tail-ribbon"></div>
            `;

            lantern.addEventListener('click', () => {
                if (navigator.vibrate) navigator.vibrate(22);
                playRealisticFireworkSound(0.75);

                openedLanternsSet.add(i);
                if (lanternCountText) {
                    lanternCountText.textContent = `Đã mở: ${openedLanternsSet.size}/7 lời chúc ✨`;
                }

                if (ch2DynamicWish) {
                    ch2DynamicWish.textContent = `"${wishText}"`;
                    ch2DynamicWish.style.animation = 'none';
                    ch2DynamicWish.offsetHeight;
                    ch2DynamicWish.style.animation = 'pulseGlow 1s ease';
                }
                const rect = lantern.getBoundingClientRect();
                createFirework(rect.left + rect.width / 2, rect.top + rect.height / 2, 35);
            });

            lanternWishesList.appendChild(lantern);
        }
    }

    if (btnGoToCh3) {
        btnGoToCh3.addEventListener('click', () => {
            if (navigator.vibrate) navigator.vibrate(15);
            goToScene(3);
        });
    }

    // ----------------------------------------------------
    // 8. CHƯƠNG 3: HỘP BÁNH TRUNG THU & THƯ TÌNH (TYPEWRITER)
    // ----------------------------------------------------
    const cakeBoxTrigger = document.getElementById('cakeBoxTrigger');
    const loveLetterModal = document.getElementById('loveLetterModal');
    const letterContentBody = document.getElementById('letterContentBody');
    const btnCloseLetter = document.getElementById('btnCloseLetter');
    const letterFastHint = document.getElementById('letterFastHint');
    const btnGoToCh4 = document.getElementById('btnGoToCh4');
    let hasTypedLetter = false;
    let isTypingLetter = false;
    let typewriterTimer = null;

    const defaultParagraphs = [
        "Gửi em bé yêu dấu của anh,",
        "Đêm nay trăng rằm tháng Tám sáng tỏ khắp nhân gian, người người rộn rã rước đèn ngắm trăng...",
        "Nhưng với anh, cảnh sắc đẹp nhất và lung linh nhất chính là được nhìn thấy nụ cười của em.",
        "Bánh trung thu có ngọt ngào đến mấy cũng không bằng sự ngọt ngào khi ở cạnh em. Vầng trăng trên cao có tròn đầy đến đâu cũng chẳng thể sánh bằng tình cảm chân thành anh dành trao cho em.",
        "Cảm ơn em vì đã là một điều thật kỳ diệu và ngọt ngào trong cuộc sống của anh. Mong rằng mọi mùa Trung Thu và những ngày tháng sau này, người luôn ở bên chăm sóc, cưng chiều em sẽ là anh.",
        "Chúc em bé một mùa Trung Thu thật ấm áp, rạng rỡ và luôn luôn là cô gái hạnh phúc nhất thế gian nhé! 💕🌕✨"
    ];

    const letterParagraphs = (cfg.chapter3 && cfg.chapter3.letterParagraphs) || defaultParagraphs;

    function openCakeBoxAndLetter() {
        if (!loveLetterModal) return;
        if (navigator.vibrate) navigator.vibrate([40, 50, 90]);
        playCelebrationChord();

        if (cakeBoxTrigger) {
            const rect = cakeBoxTrigger.getBoundingClientRect();
            createFirework(rect.left + rect.width / 2, rect.top + rect.height / 2, 40);
        }

        loveLetterModal.classList.add('active');

        if (!hasTypedLetter) {
            hasTypedLetter = true;
            typewriterLetter();
        }
    }

    // Tính năng đọc nhanh ngay lập tức khi chạm trên điện thoại
    function completeTypewriterImmediately() {
        if (!letterContentBody) return;
        if (typewriterTimer) clearTimeout(typewriterTimer);
        isTypingLetter = false;

        letterContentBody.innerHTML = '';
        letterParagraphs.forEach(text => {
            const p = document.createElement('p');
            p.textContent = text;
            letterContentBody.appendChild(p);
        });

        if (letterFastHint) {
            letterFastHint.style.display = 'none';
        }
        if (navigator.vibrate) navigator.vibrate(15);
    }

    function typewriterLetter() {
        if (!letterContentBody) return;
        letterContentBody.innerHTML = '';
        isTypingLetter = true;
        if (letterFastHint) letterFastHint.style.display = 'block';

        let currentParagraphIndex = 0;
        let currentCharIndex = 0;

        const pEl = document.createElement('p');
        letterContentBody.appendChild(pEl);

        function typeNext() {
            if (!isTypingLetter || currentParagraphIndex >= letterParagraphs.length) {
                isTypingLetter = false;
                if (letterFastHint) letterFastHint.style.display = 'none';
                return;
            }

            const targetText = letterParagraphs[currentParagraphIndex];

            if (currentCharIndex < targetText.length) {
                pEl.textContent += targetText[currentCharIndex];
                currentCharIndex++;
                typewriterTimer = setTimeout(typeNext, 20);
            } else {
                currentParagraphIndex++;
                currentCharIndex = 0;
                if (currentParagraphIndex < letterParagraphs.length) {
                    const nextP = document.createElement('p');
                    letterContentBody.appendChild(nextP);
                    typewriterTimer = setTimeout(() => {
                        typeNext();
                    }, 120);
                } else {
                    isTypingLetter = false;
                    if (letterFastHint) letterFastHint.style.display = 'none';
                }
            }
        }

        typeNext();
    }

    if (letterFastHint) {
        letterFastHint.addEventListener('click', completeTypewriterImmediately);
    }

    if (letterContentBody) {
        letterContentBody.addEventListener('click', () => {
            if (isTypingLetter) completeTypewriterImmediately();
        });
    }

    if (btnCloseLetter) {
        btnCloseLetter.addEventListener('click', () => {
            if (navigator.vibrate) navigator.vibrate(15);
            if (loveLetterModal) loveLetterModal.classList.remove('active');
        });
    }

    if (loveLetterModal) {
        loveLetterModal.addEventListener('click', (e) => {
            if (e.target === loveLetterModal) {
                loveLetterModal.classList.remove('active');
            }
        });
    }

    if (cakeBoxTrigger) {
        cakeBoxTrigger.addEventListener('click', openCakeBoxAndLetter);
        cakeBoxTrigger.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    if (btnGoToCh4) {
        btnGoToCh4.addEventListener('click', () => {
            if (navigator.vibrate) navigator.vibrate(15);
            if (loveLetterModal) loveLetterModal.classList.remove('active');
            goToScene(4);
        });
    }

    // ----------------------------------------------------
    // 9. CHƯƠNG 4: THẢ ĐÈN TRỜI NGUYỆN ƯỚC (VĨ THANH)
    // ----------------------------------------------------
    const wishInput = document.getElementById('wishInput');
    const wishPreviewText = document.getElementById('wishPreviewText');
    const btnReleaseWish = document.getElementById('btnReleaseWish');
    const giantWishLantern = document.getElementById('giantWishLantern');
    const wishInputCard = document.getElementById('wishInputCard');
    const wishSuccessBox = document.getElementById('wishSuccessBox');
    const btnReplayStory = document.getElementById('btnReplayStory');
    const scene4El = document.getElementById('scene-4');

    function initChapter4Wish() {
        if (wishPreviewText && cfg.chapter4 && cfg.chapter4.defaultWish) {
            wishPreviewText.textContent = `"${cfg.chapter4.defaultWish}"`;
        }
    }

    // Xử lý Quick-Wish Chips (Gợi ý điều ước tiện lợi trên màn hình cảm ứng)
    const quickWishChips = document.querySelectorAll('.wish-chip');
    quickWishChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const wishText = chip.getAttribute('data-wish');
            if (wishInput) {
                wishInput.value = wishText;
            }
            if (wishPreviewText) {
                wishPreviewText.textContent = `"${wishText}"`;
            }
            quickWishChips.forEach(c => c.classList.remove('chip-active'));
            chip.classList.add('chip-active');
            playChime(680, 0.25);
            if (navigator.vibrate) navigator.vibrate(20);
        });
    });

    // Thích ứng thông minh khi bàn phím ảo điện thoại mở ra
    if (wishInput && scene4El) {
        wishInput.addEventListener('focus', () => {
            scene4El.classList.add('keyboard-focused');
        });
        wishInput.addEventListener('blur', () => {
            scene4El.classList.remove('keyboard-focused');
        });
    }

    if (wishInput) {
        wishInput.addEventListener('input', (e) => {
            const val = e.target.value.trim();
            if (wishPreviewText) {
                wishPreviewText.textContent = val.length > 0 ? `"${val}"` : `"Mong hai đứa mình mãi hạnh phúc bên nhau ❤️"`;
            }
        });
    }

    // ----------------------------------------------------
    // HIỆU ỨNG THẢ LỒNG ĐÈN TRỜI ĐẶC SẮC (SCENE 4)
    // ----------------------------------------------------
    let emberTrailInterval = null;

    function spawnCompanionLanternFleet() {
        const fleetContainer = document.getElementById('lanternFleetContainer');
        if (!fleetContainer) return;
        fleetContainer.innerHTML = '';
        const count = 32; // 32 ngọn đèn trời đồng loạt bay lên tạo nên một biển hoa đăng
        for (let i = 0; i < count; i++) {
            const lantern = document.createElement('div');
            lantern.className = 'fleet-lantern';

            const leftPos = Math.random() * 94 + 3; // 3% to 97%
            const scale = 0.28 + Math.random() * 0.48; // Chiều sâu 3D xa gần
            const duration = 12.0 + Math.random() * 7.5; // 12s đến 19.5s bay lên chậm rãi, êm ái
            const delay = 0.2 + Math.random() * 4.5; // Phân tầng thời gian tự nhiên
            const driftX = (Math.random() * 70 - 35) + 'px';
            const opacity = 0.75 + Math.random() * 0.25;

            const width = Math.round(24 * scale * 2);
            const height = Math.round(32 * scale * 2);

            lantern.style.left = `${leftPos}%`;
            lantern.style.setProperty('--scale', scale.toFixed(2));
            lantern.style.setProperty('--drift-x', driftX);
            lantern.style.setProperty('--opacity', opacity.toFixed(2));
            lantern.style.animationDuration = `${duration}s`;
            lantern.style.animationDelay = `${delay}s`;

            lantern.innerHTML = `
                <div class="fleet-lantern-body" style="width: ${width}px; height: ${height}px;">
                    <div class="fleet-lantern-flame"></div>
                </div>
            `;
            fleetContainer.appendChild(lantern);
        }
    }

    function startEmberTrail() {
        const trailContainer = document.getElementById('lanternEmberTrail');
        const lanternEl = document.getElementById('giantWishLantern');
        if (!trailContainer || !lanternEl) return;
        trailContainer.innerHTML = '';

        if (emberTrailInterval) clearInterval(emberTrailInterval);

        const startTime = Date.now();
        emberTrailInterval = setInterval(() => {
            if (Date.now() - startTime > 9800) {
                clearInterval(emberTrailInterval);
                return;
            }

            const rect = lanternEl.getBoundingClientRect();
            const containerRect = trailContainer.getBoundingClientRect();

            const baseX = rect.left - containerRect.left + rect.width / 2;
            const baseY = rect.bottom - containerRect.top - 20;

            for (let i = 0; i < 3; i++) {
                const ember = document.createElement('div');
                ember.className = 'rising-ember';
                const spreadX = (Math.random() * 36 - 18);
                const driftX = (Math.random() * 40 - 20) + 'px';
                const driftY = (40 + Math.random() * 50) + 'px';

                ember.style.left = `${baseX + spreadX}px`;
                ember.style.top = `${baseY}px`;
                ember.style.setProperty('--ember-dx', driftX);
                ember.style.setProperty('--ember-dy', driftY);

                trailContainer.appendChild(ember);
                setTimeout(() => ember.remove(), 2400);
            }
        }, 140);
    }

    if (btnReleaseWish) {
        btnReleaseWish.addEventListener('click', () => {
            if (navigator.vibrate) navigator.vibrate([60, 80, 160]);
            playFlameIgniteSound();

            const wishReleaseContainer = document.getElementById('wishReleaseContainer');
            if (wishReleaseContainer) {
                wishReleaseContainer.classList.add('sky-illuminated');
            }

            // Thắp sáng ngọn lửa tâm nguyện bên trong đèn
            if (giantWishLantern) {
                giantWishLantern.classList.add('ignited');
            }

            // Thu gọn thẻ nhập liệu một cách êm ái
            if (wishInputCard) {
                wishInputCard.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                wishInputCard.style.opacity = '0';
                wishInputCard.style.transform = 'translateY(25px)';
                setTimeout(() => {
                    wishInputCard.style.display = 'none';
                }, 600);
            }

            // Bừng nở cả biển đèn trời bay lên cùng lúc chậm rãi
            spawnCompanionLanternFleet();

            // Đèn ước nguyện bắt đầu bay vút lên bầu trời êm ái cùng vệt than hồng lấp lánh
            setTimeout(() => {
                if (giantWishLantern) {
                    giantWishLantern.classList.add('floating-away-spectacular');
                }
                startEmberTrail();
            }, 600);

            // Bùng nổ đại tiệc pháo hoa 4 tầng (đồng bộ nhịp bay chậm rãi 12s)
            launchGrandLanternCelebration();

            // Hiển thị khung thông điệp chúc phúc sau khi chiêm ngưỡng trọn vẹn cảnh đèn bay lên trời
            setTimeout(() => {
                if (wishSuccessBox) {
                    wishSuccessBox.classList.add('active');
                }
                playCelebrationChord();
            }, 8800);
        });
    }

    // Tương tác chạm vào bầu trời Chương IV để tự do bắn pháo hoa
    const wishReleaseContainer = document.getElementById('wishReleaseContainer');
    if (wishReleaseContainer) {
        wishReleaseContainer.addEventListener('click', (e) => {
            if (e.target.closest('#wishInputCard') || e.target.closest('#wishSuccessBox')) return;
            const rect = wishReleaseContainer.getBoundingClientRect();
            const clickX = e.clientX || (rect.left + rect.width / 2);
            const clickY = e.clientY || (rect.top + rect.height / 2);
            createFirework(clickX, clickY, 35);
            playRealisticFireworkSound(0.6);
            if (navigator.vibrate) navigator.vibrate(18);
        });
    }

    if (btnReplayStory) {
        btnReplayStory.addEventListener('click', () => {
            if (navigator.vibrate) navigator.vibrate(20);
            playChime(520, 0.4);
            if (giantWishLantern) {
                giantWishLantern.classList.remove('floating-away-spectacular', 'floating-away', 'ignited');
            }
            const wishReleaseContainer = document.getElementById('wishReleaseContainer');
            if (wishReleaseContainer) wishReleaseContainer.classList.remove('sky-illuminated');

            const fleetContainer = document.getElementById('lanternFleetContainer');
            if (fleetContainer) fleetContainer.innerHTML = '';

            const trailContainer = document.getElementById('lanternEmberTrail');
            if (trailContainer) trailContainer.innerHTML = '';
            if (emberTrailInterval) clearInterval(emberTrailInterval);

            if (wishInputCard) {
                wishInputCard.style.display = 'block';
                wishInputCard.style.opacity = '1';
                wishInputCard.style.transform = 'none';
            }
            if (wishSuccessBox) wishSuccessBox.classList.remove('active');
            if (wishInput) wishInput.value = '';
            hasTypedLetter = false;
            quickWishChips.forEach(c => c.classList.remove('chip-active'));

            goToScene(1);
        });
    }
});
