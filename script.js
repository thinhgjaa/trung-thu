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

    // Chapter 2 Config (Thư Tình Cung Trăng)
    if (cfg.chapter2) {
        const ch2Title = document.getElementById('ch2Title');
        const ch2Subtitle = document.getElementById('ch2Subtitle');
        const letterTitleText = document.getElementById('letterTitleText');
        const letterSenderText = document.getElementById('letterSenderText');
        if (ch2Title && cfg.chapter2.title) ch2Title.textContent = cfg.chapter2.title;
        if (ch2Subtitle && cfg.chapter2.subtitle) ch2Subtitle.textContent = cfg.chapter2.subtitle;
        if (letterTitleText && cfg.chapter2.letterTitle) letterTitleText.textContent = cfg.chapter2.letterTitle;
        if (letterSenderText && cfg.chapter2.letterSender) letterSenderText.textContent = cfg.chapter2.letterSender;
    }

    // Chapter 3 Config (Thả Đèn Trời Nguyện Ước)
    if (cfg.chapter3) {
        const ch3Title = document.getElementById('ch3Title');
        const ch3Subtitle = document.getElementById('ch3Subtitle');
        const wishPromptText = document.getElementById('wishPromptText');
        const wishInput = document.getElementById('wishInput');
        const btnReleaseText = document.getElementById('btnReleaseText');
        const successTitleText = document.getElementById('successTitleText');
        const successDescText = document.getElementById('successDescText');
        const btnReplayText = document.getElementById('btnReplayText');

        if (ch3Title && cfg.chapter3.title) ch3Title.textContent = cfg.chapter3.title;
        if (ch3Subtitle && cfg.chapter3.subtitle) ch3Subtitle.textContent = cfg.chapter3.subtitle;
        if (wishPromptText && cfg.chapter3.prompt) wishPromptText.textContent = cfg.chapter3.prompt;
        if (wishInput && cfg.chapter3.placeholder) wishInput.placeholder = cfg.chapter3.placeholder;
        if (btnReleaseText && cfg.chapter3.sendButton) btnReleaseText.textContent = cfg.chapter3.sendButton;
        if (successTitleText && cfg.chapter3.afterWishSuccessTitle) successTitleText.textContent = cfg.chapter3.afterWishSuccessTitle;
        if (successDescText && cfg.chapter3.afterWishSuccessText) successDescText.textContent = cfg.chapter3.afterWishSuccessText;
        if (btnReplayText && cfg.chapter3.replayButton) btnReplayText.textContent = cfg.chapter3.replayButton;
    }

    // Chapter 4 Config (Vũ Trụ Tình Yêu - Trend TikTok)
    if (cfg.chapter4) {
        const galaxyLyricBanner = document.getElementById('galaxyLyricBanner');
        const stickerTopText = document.getElementById('stickerTopText');
        const stickerBotText = document.getElementById('stickerBotText');
        const btnGoToGalaxyText = document.getElementById('btnGoToGalaxyText');
        if (galaxyLyricBanner && cfg.chapter4.lyricHighlight) galaxyLyricBanner.textContent = cfg.chapter4.lyricHighlight;
        if (stickerTopText && cfg.chapter4.centerStickerTop) stickerTopText.textContent = cfg.chapter4.centerStickerTop;
        if (stickerBotText && cfg.chapter4.centerStickerBottom) stickerBotText.textContent = cfg.chapter4.centerStickerBottom;
        if (btnGoToGalaxyText && cfg.chapter3 && cfg.chapter3.goToGalaxyButton) btnGoToGalaxyText.textContent = cfg.chapter3.goToGalaxyButton;
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
        } catch (e) { }
    }

    // Play sparkling fairy stardust sound
    function playMagicSparkleSound() {
        try {
            initAudioContext();
            [784, 987.77, 1174.66, 1318.51, 1567.98].forEach((freq, idx) => {
                setTimeout(() => playChime(freq, 0.35, 'triangle'), idx * 55);
            });
        } catch (e) { }
    }

    // Tiếng giọt nước pha lê rơi thánh thót trên mặt hồ tiên cảnh
    function playWaterDropSound() {
        try {
            initAudioContext();
            if (!audioContext) return;
            const now = audioContext.currentTime;
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(680 + Math.random() * 80, now);
            osc.frequency.exponentialRampToValueAtTime(1480 + Math.random() * 150, now + 0.08);
            gain.gain.setValueAtTime(0.001, now);
            gain.gain.linearRampToValueAtTime(0.24, now + 0.015);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.36);
            osc.connect(gain);
            gain.connect(audioContext.destination);
            osc.start(now);
            osc.stop(now + 0.38);
        } catch (e) { }
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
        starCanvas.width = Math.floor(window.innerWidth * dpr);
        starCanvas.height = Math.floor(window.innerHeight * dpr);
        starCanvas.style.width = `${window.innerWidth}px`;
        starCanvas.style.height = `${window.innerHeight}px`;
        if (starCtx) starCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
        initStars();
    }

    function initStars() {
        stars = [];
        const w = window.innerWidth;
        const h = window.innerHeight;
        const count = Math.min(120, Math.floor((w * h) / 4000));
        for (let i = 0; i < count; i++) {
            stars.push({
                x: Math.random() * w,
                y: Math.random() * h,
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

    let isStarCanvasPaused = false;

    function drawStars() {
        if (!starCtx) return;
        if (isStarCanvasPaused) {
            requestAnimationFrame(drawStars);
            return;
        }
        starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);

        // Draw twinkling stars with soft ethereal depth bloom
        for (let s of stars) {
            s.alpha += s.speed;
            const currentAlpha = 0.3 + Math.abs(Math.sin(s.alpha)) * 0.7;

            // Halo bloom for larger stars
            if (s.radius > 1.1) {
                starCtx.beginPath();
                starCtx.arc(s.x, s.y, s.radius * 3.8, 0, Math.PI * 2);
                starCtx.fillStyle = s.color;
                starCtx.globalAlpha = currentAlpha * 0.22;
                starCtx.fill();
            }

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
        fireworkCanvas.width = Math.floor(window.innerWidth * dpr);
        fireworkCanvas.height = Math.floor(window.innerHeight * dpr);
        fireworkCanvas.style.width = `${window.innerWidth}px`;
        fireworkCanvas.style.height = `${window.innerHeight}px`;
        if (fwCtx) fwCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    if (fireworkCanvas) {
        window.addEventListener('resize', resizeFireworkCanvas);
        resizeFireworkCanvas();
    }

    // ----------------------------------------------------
    // FIREWORK AUDIO SYSTEM - Real MP3 Files + Fallback Synthesizer
    // Sử dụng file âm thanh pháo hoa thực từ thư mục assets/audios/
    // ----------------------------------------------------

    // Preload all 4 firework audio files
    const fwAudioFiles = {
        cluster: 'assets/audios/freesound_community-firework-cluster-90480.mp3',
        blast: 'assets/audios/freesound_community-fireworkblast-106275.mp3',
        single: 'assets/audios/freesound_community-single-firework-79814.mp3',
        rocket: 'assets/audios/freesound_community-tiny_rocketwav-14647.mp3'
    };

    // Audio pool: mỗi loại có pool 3 instances để tránh cut-off khi nhiều pháo hoa nổ cùng lúc
    const fwAudioPool = {};
    const FW_POOL_SIZE = 3;

    function buildAudioPool() {
        Object.entries(fwAudioFiles).forEach(([key, src]) => {
            fwAudioPool[key] = [];
            for (let i = 0; i < FW_POOL_SIZE; i++) {
                try {
                    const audio = new Audio(src);
                    audio.preload = 'auto';
                    audio.volume = 0.72;
                    fwAudioPool[key].push({ el: audio, busy: false });
                } catch (e) { /* ignore */ }
            }
        });
    }
    buildAudioPool();

    // Lấy instance rảnh trong pool, nếu không có thì dùng instance đầu tiên (giật sang)
    function getPooledAudio(key) {
        const pool = fwAudioPool[key];
        if (!pool || pool.length === 0) return null;
        const free = pool.find(a => !a.busy);
        return free || pool[0];
    }

    function playPooledAudio(key, volume = 0.72) {
        const item = getPooledAudio(key);
        if (!item) return;
        try {
            item.el.volume = Math.min(1, Math.max(0, volume));
            item.el.currentTime = 0;
            item.busy = true;
            const playPromise = item.el.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        item.el.onended = () => { item.busy = false; };
                    })
                    .catch(() => { item.busy = false; });
            }
        } catch (e) {
            item.busy = false;
        }
    }

    // Map cường độ pháo hoa (intensity) sang loại âm thanh phù hợp
    // intensity < 0.6  → single firework   (nhẹ, đơn giản)
    // intensity 0.6-1  → blast / cluster    (trung bình)
    // intensity > 1    → cluster + blast    (đại tiệc to)
    function playRealisticFireworkSound(intensity = 1) {
        initAudioContext();

        try {
            if (intensity < 0.6) {
                // Tiếng pháo đơn nhỏ nhẹ
                playPooledAudio('single', intensity * 0.9);
            } else if (intensity < 0.9) {
                // Tiếng nổ vừa + hơi whistle rocket
                const r = Math.random();
                if (r < 0.4) {
                    playPooledAudio('blast', intensity * 0.78);
                } else if (r < 0.7) {
                    playPooledAudio('single', intensity * 0.85);
                    setTimeout(() => playPooledAudio('blast', intensity * 0.6), 180);
                } else {
                    playPooledAudio('blast', intensity * 0.82);
                }
            } else if (intensity < 1.2) {
                // Tiếng nổ blast chính
                playPooledAudio('blast', Math.min(1, intensity * 0.88));
                // Kèm theo tiếng rocket nhỏ bay lên trước
                setTimeout(() => playPooledAudio('rocket', 0.45), -50); // ngay lập tức
            } else {
                // Đại kết cục: cluster + blast kết hợp
                playPooledAudio('cluster', Math.min(1, intensity * 0.78));
                setTimeout(() => playPooledAudio('blast', 0.65), 220);
                setTimeout(() => playPooledAudio('single', 0.5), 480);
            }
        } catch (e) {
            // Fallback về Web Audio Synthesizer nếu file MP3 không load được
            _fallbackSynthFirework(intensity);
        }
    }

    // Fallback synthesizer (giữ nguyên phòng khi file không load hoặc browser block)
    function _fallbackSynthFirework(intensity = 1) {
        try {
            initAudioContext();
            if (!audioContext) return;
            const now = audioContext.currentTime;

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

            const bufferSize = Math.floor(audioContext.sampleRate * 0.9);
            const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
            const output = noiseBuffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) output[i] = Math.random() * 2 - 1;
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
        } catch (e) { /* silent fail */ }
    }

    // Helper: phát tiếng rocket bay lên trước khi nổ (cho launchGrandLanternCelebration)
    function playRocketLaunchSound(volume = 0.55) {
        playPooledAudio('rocket', volume);
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
        // Tầng 1: Rocket nhỏ bay lên → Đốm sáng bùng nổ êm ái chân lồng đèn
        setTimeout(() => { playRocketLaunchSound(0.5); }, 400);
        setTimeout(() => {
            createFirework(window.innerWidth * 0.5, window.innerHeight * 0.45, 45);
            playRealisticFireworkSound(0.65);
        }, 800);

        // Tầng 2: Cặp pháo hoa Trái Tim đôi hai bên màn hình khi đèn lên tầng trung
        setTimeout(() => { playRocketLaunchSound(0.55); }, 2100);
        setTimeout(() => {
            createHeartFirework(window.innerWidth * 0.26, window.innerHeight * 0.32, '#ff7675', 4.5);
            playRealisticFireworkSound(0.85);
        }, 2400);

        setTimeout(() => { playRocketLaunchSound(0.5); }, 3900);
        setTimeout(() => {
            createHeartFirework(window.innerWidth * 0.74, window.innerHeight * 0.28, '#fd79a8', 4.5);
            playRealisticFireworkSound(0.85);
        }, 4200);

        // Tầng 3: Pháo hoa Liễu Rủ Hoàng Kim lộng lẫy chầm chậm buông rủ
        setTimeout(() => { playRocketLaunchSound(0.62); }, 5650);
        setTimeout(() => {
            createSparkleWillowFirework(window.innerWidth * 0.42, window.innerHeight * 0.25, '#ffd56b');
            playRealisticFireworkSound(1.0);
        }, 6000);

        setTimeout(() => { playRocketLaunchSound(0.58); }, 7050);
        setTimeout(() => {
            createSparkleWillowFirework(window.innerWidth * 0.68, window.innerHeight * 0.35, '#fff2a3');
            playRealisticFireworkSound(0.95);
        }, 7400);

        // Tầng 4: Đại kết cục bừng sáng toàn bầu trời - Cluster + Blast + Chord
        setTimeout(() => { playRocketLaunchSound(0.72); }, 8700);
        setTimeout(() => { playRocketLaunchSound(0.68); }, 8900);
        setTimeout(() => {
            createFirework(window.innerWidth * 0.32, window.innerHeight * 0.2, 70);
            createFirework(window.innerWidth * 0.52, window.innerHeight * 0.16, 75);
            createFirework(window.innerWidth * 0.76, window.innerHeight * 0.22, 70);
            playRealisticFireworkSound(1.3); // → cluster + blast (đại tiệc)
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
    // 5. SCENE & STORY PROGRESSION CONTROLLER (3 CHƯƠNG TÌNH YÊU)
    // ----------------------------------------------------
    let currentChapter = 1;
    const totalChapters = 3;
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

        if (currentChapter === 2 && chapterNum !== 2) {
            stop3DLoveGalaxy();
            isStarCanvasPaused = false;
            document.body.classList.remove('in-galaxy');
        } else if (chapterNum === 2) {
            isStarCanvasPaused = true;
            document.body.classList.add('in-galaxy');
        }

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
            start3DLoveGalaxy();
        } else if (chapterNum === 3) {
            initChapter3Wish();
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
    let moonHoldStage = 0; // 0: Super Moon, 1: Girlfriend Photo (tvy.jpg)

    function startHolding(e) {
        if (currentChapter !== 1) return;
        if (isHolding) return;

        // Chặn cuộn trang ngoài ý muốn khi đang giữ trên điện thoại
        if (e && e.cancelable && e.type !== 'mousedown') {
            e.preventDefault();
        }

        try {
            initAudioContext();
        } catch (err) { }

        isHolding = true;
        holdStartTime = Date.now();

        // Hiệu ứng thị giác phản hồi tức thì
        if (luminousMoon) luminousMoon.classList.add('holding');
        if (holdPrompt) holdPrompt.classList.add('holding');

        if (moonHoldStage === 0) {
            if (holdInstructionText) holdInstructionText.textContent = "Đang tụ năng lượng ánh trăng... ✨";
            if (holdHintText) holdHintText.textContent = "Giữ để khám phá điều ước bất ngờ... 🌸";
        } else {
            if (holdInstructionText) holdInstructionText.textContent = "Đang tụ năng lượng yêu thương... 💖";
            if (holdHintText) holdHintText.textContent = "Giữ thêm lần nữa để mở cánh cửa Vũ Trụ Yêu... 🌌✨";
        }

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

        if (holdInstructionText) {
            if (moonHoldStage === 0) {
                holdInstructionText.textContent = cfg.holdInstruction || "Ấn giữ vào mặt trăng";
            } else {
                holdInstructionText.textContent = "Ấn giữ lần nữa để mở Vũ Trụ Yêu 🌌✨";
            }
        }

        if (holdProgressBar) {
            holdProgressBar.style.transition = 'stroke-dashoffset 0.35s ease';
            holdProgressBar.style.strokeDashoffset = totalCircumference;
        }

        if (currentChapter === 1) {
            if (heldDuration > 100 && heldDuration < holdDuration) {
                if (holdHintText) {
                    if (moonHoldStage === 0) {
                        holdHintText.textContent = "Giữ ngón tay trên trăng khoảng 1 giây để mở điều bất ngờ nhé em! ✨";
                    } else {
                        holdHintText.textContent = "Giữ tiếp 1 giây để bước vào Vũ Trụ Yêu nào! 💖";
                    }
                }
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

    let stage1TransformTime = 0;

    function completeHoldSuccess() {
        isHolding = false;
        if (holdTimer) cancelAnimationFrame(holdTimer);
        if (chimeInterval) clearInterval(chimeInterval);

        if (luminousMoon) luminousMoon.classList.remove('holding');
        if (holdPrompt) holdPrompt.classList.remove('holding');

        if (holdProgressBar) {
            holdProgressBar.style.transition = 'stroke-dashoffset 0.35s ease';
            holdProgressBar.style.strokeDashoffset = totalCircumference;
        }

        if (cfg.music && cfg.music.autoplayOnHold !== false) {
            toggleMusic(true);
        }

        if (moonHoldStage === 0) {
            // Lần giữ 1 thành công: Biến hình Mặt Trăng ➔ Ảnh Bạn Gái (tvy.jpg)
            moonHoldStage = 1;
            stage1TransformTime = Date.now();
            quickTapCount = 0;

            if (navigator.vibrate) navigator.vibrate([50, 70, 150]);
            playCelebrationChord();
            playMagicSparkleSound();

            const moonSphereContainer = document.getElementById('moonSphereContainer');
            const moonSphereImg = document.getElementById('moonSphereImg');
            const moonGfBadge = document.getElementById('moonGfBadge');

            if (moonSphereImg) {
                moonSphereImg.src = 'assets/images/tvy.jpg';
            }

            if (moonSphereContainer) {
                moonSphereContainer.classList.add('transformed-gf');
            }

            if (moonGfBadge) {
                moonGfBadge.style.display = 'block';
            }

            document.body.classList.add('gf-moon-active');
            if (luminousMoon) {
                luminousMoon.classList.add('transformed-active');
                const rect = luminousMoon.getBoundingClientRect();
                burstGalaxyHearts(rect.left + rect.width / 2, rect.top + rect.height / 2, 18);
                createFirework(rect.left + rect.width / 2, rect.top + rect.height / 2, 50);
            }

            if (holdInstructionText) holdInstructionText.textContent = "Ấn giữ lần nữa để mở Vũ Trụ Yêu 🌌✨";
            if (holdHintText) holdHintText.textContent = "Nụ cười của em thắp sáng cả Cung Trăng 💖 Giữ tiếp lần nữa nào!";

        } else {
            // Khóa an toàn 800ms để tránh việc nhấp đúp vô tình nhảy luôn sang màn 2
            if (Date.now() - stage1TransformTime < 800) {
                return;
            }

            // Lần giữ 2 thành công: Mở cánh cửa bước vào Chương II (3D Galaxy Universe)!
            if (navigator.vibrate) navigator.vibrate([60, 80, 180]);
            playCelebrationChord();
            playRealisticFireworkSound(1.2);

            if (holdHintText) holdHintText.textContent = "Khai mở thành công cánh cửa Vũ Trụ Yêu! 🌌✨";

            if (luminousMoon) {
                const rect = luminousMoon.getBoundingClientRect();
                createFirework(rect.left + rect.width / 2, rect.top + rect.height / 2, 70);
            }

            setTimeout(() => {
                goToScene(2);
            }, 550);
        }
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

        // Hỗ trợ bấm/chạm vào Mặt Trăng để bắn pháo hoa rực rỡ & giữ để nạp năng lượng
        target.addEventListener('click', (e) => {
            if (currentChapter === 1) {
                const rect = luminousMoon ? luminousMoon.getBoundingClientRect() : target.getBoundingClientRect();
                const clickX = (e.clientX && e.clientX > 0) ? e.clientX : (rect.left + rect.width / 2);
                const clickY = (e.clientY && e.clientY > 0) ? e.clientY : (rect.top + rect.height / 2);

                // Bắn pháo hoa rực rỡ & pháo hoa trái tim ngay tại vị trí bấm vào Mặt Trăng
                createFirework(clickX, clickY, 42);
                if (Math.random() > 0.35) {
                    createHeartFirework(clickX, clickY, '#ff7675', 3.8);
                } else {
                    createSparkleWillowFirework(clickX, clickY, '#ffd56b');
                }

                playRealisticFireworkSound(0.75);
                if (navigator.vibrate) navigator.vibrate(25);
                createRipple();

                quickTapCount++;
                if (quickTapResetTimer) clearTimeout(quickTapResetTimer);
                quickTapResetTimer = setTimeout(() => { quickTapCount = 0; }, 700);

                if (quickTapCount >= 2) {
                    completeHoldSuccess();
                } else {
                    if (holdHintText) {
                        if (moonHoldStage === 0) {
                            holdHintText.textContent = "Ấn và GIỮ ngón tay trên trăng 1 giây để mở bất ngờ nhé! 🌕✨";
                        } else {
                            holdHintText.textContent = "Ấn và GIỮ ngón tay lần nữa để bước vào Vũ Trụ Yêu! 💖";
                        }
                    }
                }
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

    // ----------------------------------------------------
    // BỨC TRANH TIÊN CẢNH: MẶT HỒ SOI TRĂNG & ĐOM ĐÓM DẠ QUANG
    // ----------------------------------------------------
    function initFairytaleLakeScene() {
        const mysticLake = document.getElementById('mysticLakeContainer');
        const firefliesContainer = document.getElementById('firefliesContainer');
        const lakeTouchOverlay = document.getElementById('lakeTouchOverlay');
        const heroLotus = document.getElementById('heroLotus');
        const companionLotus = document.getElementById('companionLotus');

        if (!mysticLake) return;

        // 1. ĐÀN ĐOM ĐÓM DẠ QUANG BAY LẬP LÒE QUANH MẶT HỒ & THỎ NGỌC
        if (firefliesContainer) {
            firefliesContainer.innerHTML = '';
            const fireflyCount = 14;
            const fireflies = [];

            for (let i = 0; i < fireflyCount; i++) {
                const fly = document.createElement('div');
                fly.className = 'fairy-firefly';
                const size = 3 + Math.random() * 4;
                const isGreen = Math.random() > 0.45;
                const glow = isGreen ? '#55efc4' : '#ffeaa7';
                const bg = isGreen
                    ? 'radial-gradient(circle, #ffffff 15%, #55efc4 65%, transparent 100%)'
                    : 'radial-gradient(circle, #ffffff 15%, #ffd56b 65%, transparent 100%)';

                fly.style.width = `${size}px`;
                fly.style.height = `${size}px`;
                fly.style.background = bg;
                fly.style.setProperty('--glow-color', glow);
                fly.style.setProperty('--flicker-dur', `${1.6 + Math.random() * 2.2}s`);
                firefliesContainer.appendChild(fly);

                fireflies.push({
                    el: fly,
                    x: Math.random() * 320,
                    y: 15 + Math.random() * 125,
                    vx: (Math.random() - 0.5) * 0.35,
                    vy: (Math.random() - 0.5) * 0.25,
                    baseY: 15 + Math.random() * 125,
                    phase: Math.random() * Math.PI * 2,
                    speed: 0.015 + Math.random() * 0.02,
                    amplitude: 8 + Math.random() * 12
                });
            }

            function updateFireflies() {
                if (currentChapter === 1) {
                    fireflies.forEach(f => {
                        f.phase += f.speed;
                        f.x += f.vx;
                        f.y = f.baseY + Math.sin(f.phase) * f.amplitude;

                        // Giới hạn biên màn hình mềm mại
                        if (f.x < -10) f.x = 330;
                        if (f.x > 330) f.x = -10;

                        f.el.style.transform = `translate3d(${f.x}px, ${f.y}px, 0)`;
                    });
                }
                requestAnimationFrame(updateFireflies);
            }

            requestAnimationFrame(updateFireflies);
        }

        // 2. TƯƠNG TÁC CHẠM TẠO SÓNG NƯỚC TRÊN MẶT HỒ
        function triggerLakeRipple(e) {
            if (currentChapter !== 1) return;
            if (e && e.cancelable && e.type !== 'mousedown') e.preventDefault();

            playWaterDropSound();
            if (navigator.vibrate) navigator.vibrate(15);

            const rect = mysticLake.getBoundingClientRect();
            let clientX = e.clientX;
            let clientY = e.clientY;

            if (e.touches && e.touches.length > 0) {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else if (e.changedTouches && e.changedTouches.length > 0) {
                clientX = e.changedTouches[0].clientX;
                clientY = e.changedTouches[0].clientY;
            }

            if (clientX === undefined) {
                clientX = rect.left + rect.width * 0.5;
                clientY = rect.top + rect.height * 0.6;
            }

            const relX = clientX - rect.left;
            const relY = clientY - rect.top;

            // Tạo vòng sóng nước tròn lan tỏa
            const ripple = document.createElement('div');
            ripple.className = 'water-ripple-ring';
            ripple.style.left = `${relX}px`;
            ripple.style.top = `${relY}px`;
            mysticLake.appendChild(ripple);
            setTimeout(() => ripple.remove(), 1400);

            // Bắn ra 4 hạt bọt nước phát sáng li ti
            for (let i = 0; i < 4; i++) {
                const bubble = document.createElement('div');
                bubble.className = 'fairy-firefly';
                bubble.style.width = '4px';
                bubble.style.height = '4px';
                bubble.style.background = 'radial-gradient(circle, #fff 20%, #81ecec 80%, transparent)';
                bubble.style.left = `${relX + (Math.random() * 20 - 10)}px`;
                bubble.style.top = `${relY + (Math.random() * 10 - 5)}px`;
                bubble.style.transition = 'all 0.8s cubic-bezier(0.2, 0.8, 0.4, 1)';
                mysticLake.appendChild(bubble);

                requestAnimationFrame(() => {
                    bubble.style.transform = `translate(${(Math.random() - 0.5) * 40}px, -${20 + Math.random() * 30}px) scale(0)`;
                    bubble.style.opacity = '0';
                });
                setTimeout(() => bubble.remove(), 850);
            }
        }

        if (lakeTouchOverlay) {
            lakeTouchOverlay.addEventListener('click', triggerLakeRipple);
            lakeTouchOverlay.addEventListener('touchstart', triggerLakeRipple, { passive: false });
        }

        // 3. TƯƠNG TÁC VỚI HOA ĐĂNG SEN NỔI
        [heroLotus, companionLotus].forEach(lotus => {
            if (!lotus) return;
            lotus.addEventListener('click', (e) => {
                if (e) e.stopPropagation();
                playWaterDropSound();
                playMagicSparkleSound();
                if (navigator.vibrate) navigator.vibrate([20, 30]);

                lotus.style.transform = 'scale(0.88)';
                setTimeout(() => {
                    lotus.style.transform = '';
                }, 220);

                const ripple = document.createElement('div');
                ripple.className = 'water-ripple-ring';
                ripple.style.left = '50%';
                ripple.style.top = '70%';
                lotus.appendChild(ripple);
                setTimeout(() => ripple.remove(), 1400);
            });
        });

        // 4. Nhịp hoa quế rơi chạm mặt nước tạo sóng ngẫu nhiên
        setInterval(() => {
            if (currentChapter !== 1) return;
            const randX = 60 + Math.random() * 200;
            const randY = 15 + Math.random() * 40;
            const ripple = document.createElement('div');
            ripple.className = 'water-ripple-ring';
            ripple.style.left = `${randX}px`;
            ripple.style.top = `${randY}px`;
            ripple.style.opacity = '0.55';
            mysticLake.appendChild(ripple);
            setTimeout(() => ripple.remove(), 1400);
        }, 3400);
    }

    initMoonOrbitStardust();
    initOsmanthusShower();
    initInteractiveJadeRabbit();
    initFairytaleLakeScene();

    // ----------------------------------------------------
    // 7. CHƯƠNG 2: BỨC THƯ TÌNH CUNG TRĂNG (ROYAL SCROLL TYPEWRITER)
    // ----------------------------------------------------
    const royalScrollWrapper = document.getElementById('royalScrollWrapper');
    const letterContentBody = document.getElementById('letterContentBody');
    const letterFastHint = document.getElementById('letterFastHint');
    const btnGoToCh3 = document.getElementById('btnGoToCh3');
    let hasTypedLetter = false;
    let isTypingLetter = false;
    let typewriterTimer = null;

    const defaultParagraphs = [
        "Gửi em bé yêu dấu của anh,",
        "Đêm nay trăng rằm tháng Tám sáng tỏ khắp nhân gian, người người rộn rã rước đèn ngắm trăng...",
        "Nhưng với anh, cảnh sắc đẹp nhất và lung linh nhất chính là được nhìn thấy nụ cười của em.",
        "Trăng rằm có sáng tỏ đến đâu cũng không bằng ánh mắt rạng ngời của em. Giữa vạn người tưng bừng hội ngộ, điều may mắn nhất của anh chính là có em kề bên.",
        "Cảm ơn em vì đã là một điều thật kỳ diệu và ngọt ngào trong cuộc sống của anh. Mong rằng mọi mùa Trung Thu và những ngày tháng sau này, người luôn ở bên chăm sóc, cưng chiều em sẽ là anh.",
        "Chúc em bé một mùa Trung Thu thật ấm áp, rạng rỡ và luôn luôn là cô gái hạnh phúc nhất thế gian nhé! 💕🌕✨"
    ];

    const letterParagraphs = (cfg.chapter2 && cfg.chapter2.letterParagraphs) || defaultParagraphs;

    function startRoyalLoveLetter() {
        if (!hasTypedLetter) {
            hasTypedLetter = true;
            if (navigator.vibrate) navigator.vibrate([30, 40, 60]);
            playCelebrationChord();

            // Nhẹ nhàng bắn pháo hoa lấp lánh khi mở bức thư
            setTimeout(() => {
                createFirework(window.innerWidth * 0.5, window.innerHeight * 0.3, 35);
            }, 300);

            setTimeout(() => {
                typewriterLetter();
            }, 500);
        }
    }

    // Tính năng đọc nhanh ngay lập tức khi chạm trên màn hình
    function completeTypewriterImmediately() {
        if (!letterContentBody) return;
        if (typewriterTimer) clearTimeout(typewriterTimer);
        isTypingLetter = false;

        letterContentBody.innerHTML = '';
        letterParagraphs.forEach((text, idx) => {
            const p = document.createElement('p');
            p.className = 'scroll-paragraph';
            if (idx === 0) p.classList.add('salutation');
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

        let activeP = document.createElement('p');
        activeP.className = 'scroll-paragraph';
        if (currentParagraphIndex === 0) activeP.classList.add('salutation');
        letterContentBody.appendChild(activeP);

        function typeNext() {
            if (!isTypingLetter || currentParagraphIndex >= letterParagraphs.length) {
                isTypingLetter = false;
                if (letterFastHint) letterFastHint.style.display = 'none';
                return;
            }

            const targetText = letterParagraphs[currentParagraphIndex];

            if (currentCharIndex < targetText.length) {
                activeP.textContent += targetText[currentCharIndex];
                currentCharIndex++;
                typewriterTimer = setTimeout(typeNext, 20);
            } else {
                currentParagraphIndex++;
                currentCharIndex = 0;
                if (currentParagraphIndex < letterParagraphs.length) {
                    activeP = document.createElement('p');
                    activeP.className = 'scroll-paragraph';
                    letterContentBody.appendChild(activeP);
                    typewriterTimer = setTimeout(() => {
                        typeNext();
                    }, 140);
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

    if (btnGoToCh3) {
        btnGoToCh3.addEventListener('click', () => {
            if (navigator.vibrate) navigator.vibrate(15);
            goToScene(3);
        });
    }

    // ----------------------------------------------------
    // 8. CHƯƠNG 3: THẢ ĐÈN TRỜI NGUYỆN ƯỚC (VĨ THANH)
    // ----------------------------------------------------
    const wishInput = document.getElementById('wishInput');
    const wishPreviewText = document.getElementById('wishPreviewText');
    const btnReleaseWish = document.getElementById('btnReleaseWish');
    const giantWishLantern = document.getElementById('giantWishLantern');
    const wishInputCard = document.getElementById('wishInputCard');
    const wishSuccessBox = document.getElementById('wishSuccessBox');
    const btnReplayStory = document.getElementById('btnReplayStory');
    const scene3El = document.getElementById('scene-2');

    function initChapter3Wish() {
        if (wishPreviewText && cfg.chapter3 && cfg.chapter3.defaultWish) {
            wishPreviewText.textContent = `"${cfg.chapter3.defaultWish}"`;
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
    if (wishInput && scene3El) {
        wishInput.addEventListener('focus', () => {
            scene3El.classList.add('keyboard-focused');
        });
        wishInput.addEventListener('blur', () => {
            scene3El.classList.remove('keyboard-focused');
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

    // Nút khám phá Vũ Trụ Tình Yêu (từ Chương 3)
    const btnGoToGalaxy = document.getElementById('btnGoToGalaxy');
    if (btnGoToGalaxy) {
        btnGoToGalaxy.addEventListener('click', () => {
            if (navigator.vibrate) navigator.vibrate([40, 60, 100]);
            playCelebrationChord();
            goToScene(2);
        });
    }

    const btnGalaxyBack = document.getElementById('btnGalaxyBack');
    if (btnGalaxyBack) {
        btnGalaxyBack.addEventListener('click', () => {
            if (navigator.vibrate) navigator.vibrate(15);
            goToScene(1);
        });
    }

    const btnGalaxyAddHeart = document.getElementById('btnGalaxyAddHeart');
    if (btnGalaxyAddHeart) {
        btnGalaxyAddHeart.addEventListener('click', (e) => {
            e.stopPropagation();
            if (navigator.vibrate) navigator.vibrate([25, 45]);
            burstGalaxyHearts(window.innerWidth / 2, window.innerHeight * 0.6, 12);
            playMagicSparkleSound();
        });
    }

    // ----------------------------------------------------
    // 9. CHƯƠNG 4: 3D LOVE GALAXY ENGINE (HIGH PERFORMANCE CACHED SPRITES)
    // ----------------------------------------------------
    const galaxyCanvas = document.getElementById('galaxyCanvas');
    let galaxyCtx = galaxyCanvas ? galaxyCanvas.getContext('2d') : null;
    let isGalaxyRunning = false;
    let galaxyAnimId = null;

    // 3D Camera & Rotation Variables
    let galaxyRotX = 0, galaxyRotY = 0;
    let galaxyVelRotX = 0, galaxyVelRotY = 0.0022;
    let isGalaxyDragging = false;
    let galaxyLastX = 0, galaxyLastY = 0;
    const galaxyFov = 460;
    let galaxyWarpStartTime = 0;
    const galaxyWarpDuration = 3800; // 3.8 seconds cinematic hyperspace zoom intro

    // 3D Entities
    let gStars = [];
    let gWords = [];
    let gHearts = [];
    let gBursts = [];
    let gSpecialLetters = [];
    let galaxyPointerDownX = 0, galaxyPointerDownY = 0;

    // Pre-rendered Sprites Cache (Triệt tiêu 100% hiện tượng giật lag do shadowBlur)
    let cachedHeartCanvas = null;
    const cachedWordSprites = new Map();

    // Tạo sprite trái tim 3D đỏ rực phát sáng (Chỉ render 1 lần duy nhất trên offscreen canvas)
    function getOrCreateCachedHeartSprite() {
        if (cachedHeartCanvas) return cachedHeartCanvas;
        const size = 64;
        const c = document.createElement('canvas');
        c.width = size;
        c.height = size;
        const ctx = c.getContext('2d');

        ctx.translate(size / 2, size / 2 - 4);
        ctx.scale(1.15, 1.15);

        ctx.shadowColor = '#ff1744';
        ctx.shadowBlur = 14;

        const grad = ctx.createRadialGradient(-3, -4, 2, 0, 3, 24);
        grad.addColorStop(0, '#ff758c');
        grad.addColorStop(0.3, '#ff1744');
        grad.addColorStop(0.75, '#d50000');
        grad.addColorStop(1, '#8b0000');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(0, 7);
        ctx.bezierCurveTo(-14, -10, -26, 6, 0, 26);
        ctx.bezierCurveTo(26, 6, 14, -10, 0, 7);
        ctx.fill();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.beginPath();
        ctx.ellipse(-6, 2, 5, 2.5, -Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();

        cachedHeartCanvas = c;
        return cachedHeartCanvas;
    }

    // Pre-render chữ neon tình yêu vào offscreen sprite để GPU vẽ cực nhanh
    function getCachedWordSprite(text, style) {
        const key = text + '_' + style.color + '_' + style.glow + '_' + style.size + '_' + style.fontType;
        if (cachedWordSprites.has(key)) return cachedWordSprites.get(key);

        const fontName = style.fontType === 'dancing' ? '"Dancing Script", cursive' : '"Quicksand", sans-serif';
        const weight = style.bold ? '700' : '600';
        const fontSize = style.size * 2;
        const fontStr = `${weight} ${fontSize}px ${fontName}`;

        const measureC = document.createElement('canvas');
        const mCtx = measureC.getContext('2d');
        mCtx.font = fontStr;
        const metrics = mCtx.measureText(text);
        const textW = Math.ceil(metrics.width);
        const textH = Math.ceil(style.size * 2.8);
        const pad = 32;

        const c = document.createElement('canvas');
        c.width = textW + pad * 2;
        c.height = textH + pad * 2;
        const ctx = c.getContext('2d');

        ctx.font = fontStr;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const cx = c.width / 2;
        const cy = c.height / 2;

        // Render quầng sáng neon 2 lớp
        ctx.shadowColor = style.glow;
        ctx.shadowBlur = 18;
        ctx.fillStyle = style.color;
        ctx.fillText(text, cx, cy);

        ctx.shadowBlur = 30;
        ctx.fillText(text, cx, cy);

        // Lớp lõi sắc nét
        ctx.shadowBlur = 0;
        ctx.fillStyle = style.color;
        ctx.fillText(text, cx, cy);

        const spriteObj = {
            canvas: c,
            width: c.width / 2,
            height: c.height / 2
        };
        cachedWordSprites.set(key, spriteObj);
        return spriteObj;
    }

    // Tạo sprite nổi bật cho Lá Thư Tình 3D bồng bềnh trong vũ trụ (dạng thẻ neon phát sáng sang trọng)
    function getOrCreateSpecialLetterSprite(title, badgeText) {
        const key = `special_letter_${title}_${badgeText}`;
        if (cachedWordSprites.has(key)) return cachedWordSprites.get(key);

        const scale = 2; // high-dpi cho chữ cực nét
        const testC = document.createElement('canvas');
        const testCtx = testC.getContext('2d');

        testCtx.font = `bold ${24 * scale}px "Dancing Script", cursive`;
        const titleW = testCtx.measureText(title).width;

        testCtx.font = `bold ${12 * scale}px "Quicksand", sans-serif`;
        const badgeW = testCtx.measureText(badgeText).width;

        const maxContentW = Math.max(titleW, badgeW);
        const padX = 26 * scale;
        const pillW = Math.ceil(maxContentW + padX * 2);
        const pillH = Math.ceil(68 * scale);

        const canvasW = pillW + 36 * scale;
        const canvasH = pillH + 36 * scale;

        const c = document.createElement('canvas');
        c.width = canvasW;
        c.height = canvasH;
        const ctx = c.getContext('2d');

        const ox = (canvasW - pillW) / 2;
        const oy = (canvasH - pillH) / 2;
        const radius = 18 * scale;

        // 1. Quầng hào quang phát sáng vàng kim & hồng ngọc
        ctx.shadowColor = '#ffd56b';
        ctx.shadowBlur = 18 * scale;

        // 2. Khung thẻ bo tròn mờ ảo
        ctx.fillStyle = 'rgba(255, 30, 110, 0.32)';
        ctx.strokeStyle = 'rgba(255, 220, 140, 0.95)';
        ctx.lineWidth = 1.8 * scale;

        ctx.beginPath();
        if (ctx.roundRect) {
            ctx.roundRect(ox, oy, pillW, pillH, radius);
        } else {
            ctx.rect(ox, oy, pillW, pillH);
        }
        ctx.fill();
        ctx.stroke();

        // Lớp viền thứ 2 phản quang
        ctx.shadowColor = '#ff2a8d';
        ctx.shadowBlur = 10 * scale;
        ctx.strokeStyle = 'rgba(255, 120, 190, 0.65)';
        ctx.lineWidth = 1 * scale;
        ctx.stroke();

        // 3. Tiêu đề lá thư tình (Dancing Script mềm mại)
        ctx.shadowColor = '#ff79c6';
        ctx.shadowBlur = 14 * scale;
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${24 * scale}px "Dancing Script", cursive`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(title, canvasW / 2, oy + 26 * scale);

        // 4. Tag kêu gọi hành động
        ctx.shadowColor = '#ffd56b';
        ctx.shadowBlur = 8 * scale;
        ctx.fillStyle = '#ffd56b';
        ctx.font = `bold ${12 * scale}px "Quicksand", sans-serif`;
        ctx.fillText(badgeText, canvasW / 2, oy + 49 * scale);

        const spriteObj = {
            canvas: c,
            width: c.width / scale,
            height: c.height / scale,
            isSpecialLetter: true
        };
        cachedWordSprites.set(key, spriteObj);
        return spriteObj;
    }

    // Neon Styling Palettes
    const neonStyles = [
        { color: '#ffffff', glow: '#ff79c6', fontType: 'dancing', size: 23, bold: true },
        { color: '#ffb8e6', glow: '#ff2a8d', fontType: 'dancing', size: 26, bold: true },
        { color: '#ffffff', glow: '#ff4d94', fontType: 'quicksand', size: 17, bold: true },
        { color: '#ffd56b', glow: '#ff9f43', fontType: 'quicksand', size: 16, bold: true },
        { color: '#ffffff', glow: '#ffd56b', fontType: 'quicksand', size: 15, bold: false }
    ];

    const midAutumnDecorIcons = ['🌙', '⭐', '🥮', '🌸', '✨', '💖'];

    function resizeGalaxyCanvas() {
        if (!galaxyCanvas) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        galaxyCanvas.width = Math.floor(window.innerWidth * dpr);
        galaxyCanvas.height = Math.floor(window.innerHeight * dpr);
        galaxyCanvas.style.width = `${window.innerWidth}px`;
        galaxyCanvas.style.height = `${window.innerHeight}px`;
        if (galaxyCtx) {
            galaxyCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }
    }

    function init3DGalaxyEntities() {
        gStars = [];
        gWords = [];
        gHearts = [];
        gBursts = [];

        getOrCreateCachedHeartSprite();

        // 1. Vũ trụ vì sao nền (150 vì sao tối ưu hiệu năng và độ mượt)
        const starCount = 150;
        for (let i = 0; i < starCount; i++) {
            const r = 220 + Math.random() * 560;
            const theta = Math.random() * Math.PI * 2;
            const phi = (Math.random() - 0.5) * Math.PI;
            const baseX = r * Math.cos(theta) * Math.cos(phi);
            const baseY = r * Math.sin(phi);
            const baseZ = r * Math.sin(theta) * Math.cos(phi);

            gStars.push({
                baseX: baseX,
                baseY: baseY,
                baseZ: baseZ,
                size: Math.random() * 1.5 + 0.6,
                color: Math.random() > 0.35 ? '#ffffff' : (Math.random() > 0.5 ? '#ffb8e6' : '#ffd56b'),
                twinklePhase: Math.random() * Math.PI * 2,
                twinkleSpeed: 0.02 + Math.random() * 0.03
            });
        }

        // 2. Chữ yêu thương neon 3D (Floating Love Words)
        const wordsSource = (cfg.chapter4 && cfg.chapter4.loveWords && cfg.chapter4.loveWords.length > 0)
            ? cfg.chapter4.loveWords
            : [
                "Trung Thu vui vẻ bên anh",
                "Yêu em thật nhiều",
                `${cfg.senderName || 'Anh'} ♡ ${cfg.receiverName || 'Em Bé'}`,
                `Chúc ${cfg.receiverName || 'em bé'} Trung Thu vui vẻ`,
                "Bên anh thật lâu nhé",
                "Em là món quà tuyệt nhất",
                "Cùng anh đón ngàn mùa trăng",
                "Thương em nhất trần đời 💕",
                "Mãi yêu công chúa của anh",
                "Harumi gift box",
                "Yêu em 3000 ✨",
                "Trung Thu ngọt ngào bên nhau"
            ];

        const totalWordSlots = 32;
        for (let i = 0; i < totalWordSlots; i++) {
            const text = wordsSource[i % wordsSource.length];
            const style = neonStyles[i % neonStyles.length];
            const theta = (i / totalWordSlots) * Math.PI * 2 + (Math.random() - 0.5) * 0.25;
            const phi = ((i % 5) - 2) * 0.32 + (Math.random() - 0.5) * 0.16;
            const radius = 230 + Math.random() * 220;

            const sprite = getCachedWordSprite(text, style);

            const baseX = radius * Math.cos(theta) * Math.cos(phi);
            const baseY = radius * Math.sin(phi) + (Math.random() - 0.5) * 60;
            const baseZ = radius * Math.sin(theta) * Math.cos(phi);

            // Độ trễ chiều sâu Z tạo cảm giác các câu chữ lướt bay vào màn hình ấn tượng
            const staggerZ = (1 - (i / totalWordSlots)) * 500 + Math.random() * 120;

            gWords.push({
                sprite: sprite,
                baseX: baseX,
                baseY: baseY,
                baseZ: baseZ,
                staggerZ: staggerZ,
                floatPhase: Math.random() * Math.PI * 2,
                floatSpeed: 0.012 + Math.random() * 0.016
            });
        }

        // Xen kẽ các icon neon Trung Thu (Trăng khuyết, ngôi sao, bánh trung thu)
        for (let i = 0; i < 14; i++) {
            const icon = midAutumnDecorIcons[i % midAutumnDecorIcons.length];
            const theta = Math.random() * Math.PI * 2;
            const phi = (Math.random() - 0.5) * Math.PI * 0.75;
            const radius = 220 + Math.random() * 240;
            const style = { color: '#ff79c6', glow: '#ff2a8d', fontType: 'quicksand', size: 24, bold: true };
            const sprite = getCachedWordSprite(icon, style);

            const baseX = radius * Math.cos(theta) * Math.cos(phi);
            const baseY = radius * Math.sin(phi);
            const baseZ = radius * Math.sin(theta) * Math.cos(phi);

            const staggerZ = (1 - (i / 14)) * 600 + Math.random() * 150;

            gWords.push({
                sprite: sprite,
                baseX: baseX,
                baseY: baseY,
                baseZ: baseZ,
                staggerZ: staggerZ,
                floatPhase: Math.random() * Math.PI * 2,
                floatSpeed: 0.015 + Math.random() * 0.02
            });
        }

        // 2.1 THÊM LÁ THƯ TÌNH 3D NỔI BẬT XOAY QUANH VŨ TRỤ (Có thể click để mở)
        gSpecialLetters = [];
        const specialLetterConfigs = [
            {
                title: "💌 Có thư nèee 🌸",
                badge: "✨ Chạm để mở ✨",
                theta: -Math.PI / 2,
                phi: 0,
                radius: 200,
                y: -18
            }
        ];

        specialLetterConfigs.forEach(sCfg => {
            const sprite = getOrCreateSpecialLetterSprite(sCfg.title, sCfg.badge);
            const baseX = sCfg.radius * Math.cos(sCfg.theta) * Math.cos(sCfg.phi);
            const baseY = sCfg.y;
            const baseZ = sCfg.radius * Math.sin(sCfg.theta) * Math.cos(sCfg.phi);

            const letterObj = {
                sprite: sprite,
                isSpecialLetter: true,
                baseX: baseX,
                baseY: baseY,
                baseZ: baseZ,
                staggerZ: 200,
                floatPhase: Math.random() * Math.PI * 2,
                floatSpeed: 0.014
            };
            gWords.push(letterObj);
            gSpecialLetters.push(letterObj);
        });

        // 3. Quả cầu tim 3D đỏ rực phát sáng (Floating Red Hearts)
        const heartCount = 18;
        for (let i = 0; i < heartCount; i++) {
            spawnHeartObject(true);
        }
    }

    function spawnHeartObject(initialRandomY = false) {
        const theta = Math.random() * Math.PI * 2;
        const radius = 150 + Math.random() * 260;
        const y = initialRandomY ? (Math.random() * 650 - 325) : 360;

        gHearts.push({
            baseX: radius * Math.cos(theta),
            y: y,
            baseZ: radius * Math.sin(theta),
            size: 20 + Math.random() * 18,
            vy: -(0.6 + Math.random() * 0.8),
            swayPhase: Math.random() * Math.PI * 2,
            swaySpeed: 0.018 + Math.random() * 0.02,
            swayAmp: 14 + Math.random() * 22,
            rot: (Math.random() - 0.5) * 0.35
        });
    }

    // Bắn chùm tim & bụi sao khi người dùng chạm vào màn hình
    function burstGalaxyHearts(screenX, screenY, count = 8) {
        const emojis = ['❤️', '💖', '✨', '🌸', '💕'];
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2.5 + Math.random() * 4;
            gBursts.push({
                x: screenX,
                y: screenY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 1.2,
                text: emojis[Math.floor(Math.random() * emojis.length)],
                size: 16 + Math.random() * 12,
                alpha: 1,
                decay: 0.022 + Math.random() * 0.015,
                rot: (Math.random() - 0.5) * 0.4,
                rotSpeed: (Math.random() - 0.5) * 0.08
            });
        }
    }

    function render3DLoveGalaxy() {
        if (!isGalaxyRunning || !galaxyCtx || !galaxyCanvas) return;

        try {
            const w = window.innerWidth;
            const h = window.innerHeight;
            const cx = w / 2;
            const cy = h / 2;

            galaxyCtx.clearRect(0, 0, w, h);

            // 1. Hyperspace Warp Speed Intro Calculation (Phóng nhanh như phim viễn tưởng rồi chậm dần sau 3.8s)
            let warpFactor = 0;
            if (galaxyWarpStartTime > 0) {
                const elapsed = Date.now() - galaxyWarpStartTime;
                if (elapsed < galaxyWarpDuration) {
                    const progress = elapsed / galaxyWarpDuration;
                    // Exponential deceleration curve: swooshes in super fast and eases smoothly
                    warpFactor = Math.pow(1 - progress, 2.4);
                } else {
                    galaxyWarpStartTime = 0;
                }
            }

            // 1.1 Quán tính xoay vũ trụ & hiệu ứng xoay nhanh khi phóng vào
            if (!isGalaxyDragging) {
                const warpSpin = warpFactor * 0.032;
                galaxyRotY += galaxyVelRotY + warpSpin;
                galaxyRotX += galaxyVelRotX + (warpSpin * 0.15);
                galaxyVelRotY = galaxyVelRotY * 0.96 + 0.0018 * 0.04;
                galaxyVelRotX *= 0.94;
            }

            const cosY = Math.cos(galaxyRotY), sinY = Math.sin(galaxyRotY);
            const cosX = Math.cos(galaxyRotX), sinX = Math.sin(galaxyRotX);

            // 2. Render vì sao nền vũ trụ (có đuôi tia sáng radial khi đang lướt nhanh)
            galaxyCtx.save();
            for (let i = 0; i < gStars.length; i++) {
                const s = gStars[i];
                s.twinklePhase += s.twinkleSpeed;
                const twinkle = 0.4 + 0.6 * Math.abs(Math.sin(s.twinklePhase));

                const x1 = s.baseX * cosY - s.baseZ * sinY;
                const z1 = s.baseX * sinY + s.baseZ * cosY;
                const y1 = s.baseY * cosX - z1 * sinX;
                const z2 = s.baseY * sinX + z1 * cosX;

                // Safe camera depth calculation
                const zView = Math.max(120, z2 + 650 + (warpFactor * 600));
                const scale = Math.min(2.0, Math.max(0.04, galaxyFov / zView));
                const px = cx + x1 * scale;
                const py = cy + y1 * scale;

                if (!Number.isFinite(px) || !Number.isFinite(py)) continue;

                const alpha = Math.min(1, Math.max(0.12, (scale * 1.05) * twinkle));

                if (warpFactor > 0.06) {
                    // Radial hyperspace star streaks
                    const dirX = (px - cx) * 0.16 * warpFactor;
                    const dirY = (py - cy) * 0.16 * warpFactor;
                    const streakStartX = px - dirX;
                    const streakStartY = py - dirY;

                    galaxyCtx.strokeStyle = s.color;
                    galaxyCtx.globalAlpha = Math.min(1, alpha * 1.2);
                    galaxyCtx.lineWidth = Math.min(2.6, Math.max(0.8, s.size * scale));
                    galaxyCtx.beginPath();
                    galaxyCtx.moveTo(streakStartX, streakStartY);
                    galaxyCtx.lineTo(px, py);
                    galaxyCtx.stroke();
                } else {
                    galaxyCtx.fillStyle = s.color;
                    galaxyCtx.globalAlpha = alpha;
                    galaxyCtx.beginPath();
                    galaxyCtx.arc(px, py, Math.max(0.6, s.size * scale), 0, Math.PI * 2);
                    galaxyCtx.fill();
                }
            }
            galaxyCtx.restore();

            // 3. Sắp xếp thứ tự Z của Chữ, Icon, Thư 3D và Trái Tim
            const renderQueue = [];

            // 3.1 Chữ tình yêu & Icon & Thư 3D
            for (let i = 0; i < gWords.length; i++) {
                const wObj = gWords[i];
                wObj.floatPhase += wObj.floatSpeed;
                const floatY = Math.sin(wObj.floatPhase) * 7;

                const currY = wObj.baseY + floatY;
                const x1 = wObj.baseX * cosY - wObj.baseZ * sinY;
                const z1 = wObj.baseX * sinY + wObj.baseZ * cosY;
                const y1 = currY * cosX - z1 * sinX;
                const z2 = currY * sinX + z1 * cosX;

                // Safe camera depth with staggered entrance
                const itemStagger = (wObj.staggerZ || 0) * warpFactor;
                const zView = Math.max(100, z2 + 650 + (warpFactor * 750) + itemStagger);

                renderQueue.push({
                    type: 'word',
                    data: wObj,
                    x: x1,
                    y: y1,
                    z: z2 - itemStagger,
                    zView: zView
                });
            }

            // 3.2 Quả cầu tim 3D đỏ rực
            const heartSprite = getOrCreateCachedHeartSprite();
            for (let i = gHearts.length - 1; i >= 0; i--) {
                const hObj = gHearts[i];
                hObj.y += hObj.vy;
                hObj.swayPhase += hObj.swaySpeed;
                const swayX = Math.sin(hObj.swayPhase) * hObj.swayAmp;

                if (hObj.y < -380) {
                    hObj.y = 380;
                }

                const currX = hObj.baseX + swayX;
                const x1 = currX * cosY - hObj.baseZ * sinY;
                const z1 = currX * sinY + hObj.baseZ * cosY;
                const y1 = hObj.y * cosX - z1 * sinX;
                const z2 = hObj.y * sinX + z1 * cosX;

                const zView = Math.max(90, z2 + 650 + (warpFactor * 650));

                renderQueue.push({
                    type: 'heart',
                    data: hObj,
                    x: x1,
                    y: y1,
                    z: z2,
                    zView: zView
                });
            }

            // Sắp xếp đối tượng từ xa tới gần (Painters Algorithm)
            renderQueue.sort((a, b) => b.z - a.z);

            // 4. Render các đối tượng GPU Blitting
            for (let i = 0; i < renderQueue.length; i++) {
                const item = renderQueue[i];
                const scale = Math.min(2.2, Math.max(0.04, galaxyFov / item.zView));
                const px = cx + item.x * scale;
                const py = cy + item.y * scale;

                if (!Number.isFinite(px) || !Number.isFinite(py) || scale <= 0) continue;

                if (item.type === 'word') {
                    const sprite = item.data.sprite;
                    if (!sprite || !sprite.canvas) continue;
                    const alpha = Math.min(1, Math.max(0.18, scale * 1.25));
                    const pulse = item.data.isSpecialLetter ? (1 + Math.sin(Date.now() * 0.0035) * 0.05) : 1;
                    const drawW = sprite.width * scale * pulse;
                    const drawH = sprite.height * scale * pulse;

                    // Lưu tọa độ chiếu màn hình để bắt click vào thư 3D
                    if (item.data.isSpecialLetter) {
                        item.data.screenX = px;
                        item.data.screenY = py;
                        item.data.drawW = drawW;
                        item.data.drawH = drawH;
                        item.data.alpha = alpha;
                    }

                    galaxyCtx.globalAlpha = alpha;
                    galaxyCtx.drawImage(sprite.canvas, px - drawW / 2, py - drawH / 2, drawW, drawH);
                } else if (item.type === 'heart') {
                    const hObj = item.data;
                    const alpha = Math.min(1, Math.max(0.22, scale * 1.2));
                    const hSize = hObj.size * scale * 1.25;

                    galaxyCtx.save();
                    galaxyCtx.translate(px, py);
                    galaxyCtx.rotate(hObj.rot);
                    galaxyCtx.globalAlpha = alpha;
                    galaxyCtx.drawImage(heartSprite, -hSize / 2, -hSize / 2, hSize, hSize);
                    galaxyCtx.restore();
                }
            }

            // 5. Render các hạt tim bùng nổ khi chạm màn hình
            for (let i = gBursts.length - 1; i >= 0; i--) {
                const b = gBursts[i];
                b.x += b.vx;
                b.y += b.vy;
                b.vy += 0.08;
                b.alpha -= b.decay;
                b.rot += b.rotSpeed;

                if (b.alpha <= 0) {
                    gBursts.splice(i, 1);
                    continue;
                }

                galaxyCtx.save();
                galaxyCtx.translate(b.x, b.y);
                galaxyCtx.rotate(b.rot);
                galaxyCtx.globalAlpha = Math.max(0, Math.min(1, b.alpha));
                galaxyCtx.font = `${b.size}px sans-serif`;
                galaxyCtx.textAlign = 'center';
                galaxyCtx.textBaseline = 'middle';
                galaxyCtx.fillText(b.text, 0, 0);
                galaxyCtx.restore();
            }
        } catch (err) {
            console.error("Galaxy render error handled:", err);
        }

        if (isGalaxyRunning) {
            galaxyAnimId = requestAnimationFrame(render3DLoveGalaxy);
        }
    }

    function start3DLoveGalaxy() {
        if (isGalaxyRunning) return;
        isGalaxyRunning = true;
        galaxyWarpStartTime = Date.now(); // Trigger 3.8s hyperspace warp zoom intro
        resizeGalaxyCanvas();
        init3DGalaxyEntities();
        galaxyAnimId = requestAnimationFrame(render3DLoveGalaxy);

        setTimeout(() => {
            burstGalaxyHearts(window.innerWidth / 2, window.innerHeight * 0.45, 10);
            playMagicSparkleSound();
        }, 400);
    }

    function stop3DLoveGalaxy() {
        isGalaxyRunning = false;
        if (galaxyAnimId) {
            cancelAnimationFrame(galaxyAnimId);
            galaxyAnimId = null;
        }
    }

    // ----------------------------------------------------
    // BỨC THƯ TÌNH TRONG VŨ TRỤ (EMBEDDED GALAXY LOVE LETTER)
    // ----------------------------------------------------
    const galaxyEnvelopeWrapper = document.getElementById('galaxyEnvelopeWrapper');
    const romanticEnvelope = document.getElementById('romanticEnvelope');
    const galaxyLetterModal = document.getElementById('galaxyLetterModal');
    const galaxyLetterBody = document.getElementById('galaxyLetterBody');
    const galaxyLetterFastHint = document.getElementById('galaxyLetterFastHint');
    const galaxyLetterTitleText = document.getElementById('galaxyLetterTitleText');
    const galaxyLetterSenderText = document.getElementById('galaxyLetterSenderText');
    const galaxyStickerCard = document.getElementById('galaxyStickerCard');
    const btnToggleGalaxyLetter = document.getElementById('btnToggleGalaxyLetter');
    const btnCloseGalaxyLetter = document.getElementById('btnCloseGalaxyLetter');
    const galaxyLetterBackdrop = document.getElementById('galaxyLetterBackdrop');
    const btnLetterExploreGalaxy = document.getElementById('btnLetterExploreGalaxy');
    const btnGalaxyGoToCh3 = document.getElementById('btnGalaxyGoToCh3');

    let isGalaxyLetterOpen = false;
    let isGalaxyLetterTyping = false;
    let isEnvelopeOpening = false;
    let galaxyTypewriterTimer = null;
    let hasGalaxyLetterTypedOnce = false;

    // Khởi tạo thông tin người gửi/tiêu đề thư trong vũ trụ
    if (cfg.chapter2) {
        if (galaxyLetterTitleText && cfg.chapter2.letterTitle) galaxyLetterTitleText.textContent = cfg.chapter2.letterTitle;
        if (galaxyLetterSenderText && cfg.chapter2.letterSender) galaxyLetterSenderText.textContent = cfg.chapter2.letterSender;
    }

    function triggerEnvelopeOpen() {
        if (isGalaxyLetterOpen || isEnvelopeOpening) return;
        isEnvelopeOpening = true;

        if (romanticEnvelope) {
            romanticEnvelope.classList.remove('open');
            romanticEnvelope.classList.add('opening');
        }

        if (navigator.vibrate) navigator.vibrate([40, 60, 90]);
        playFlameIgniteSound();
        playMagicSparkleSound();

        const envelopeEl = romanticEnvelope || galaxyEnvelopeWrapper;
        if (envelopeEl) {
            const rect = envelopeEl.getBoundingClientRect();
            burstGalaxyHearts(rect.left + rect.width / 2, rect.top + rect.height / 2, 10);
        }

        setTimeout(() => {
            if (romanticEnvelope) {
                romanticEnvelope.classList.add('open');
            }
            openGalaxyLoveLetter();
            isEnvelopeOpening = false;
        }, 400);
    }

    function openGalaxyLoveLetter() {
        if (!galaxyLetterModal) return;
        isGalaxyLetterOpen = true;
        galaxyLetterModal.classList.add('active');
        galaxyLetterModal.setAttribute('aria-hidden', 'false');
        const wrapper = document.getElementById('galaxyUniverseWrapper');
        if (wrapper) wrapper.classList.add('letter-open');
        if (navigator.vibrate) navigator.vibrate([30, 45]);
        playCelebrationChord();

        if (!hasGalaxyLetterTypedOnce) {
            hasGalaxyLetterTypedOnce = true;
            typewriterGalaxyLetter();
        }
    }

    function closeGalaxyLoveLetter() {
        if (!galaxyLetterModal) return;
        isGalaxyLetterOpen = false;
        isEnvelopeOpening = false;
        galaxyLetterModal.classList.remove('active');
        galaxyLetterModal.setAttribute('aria-hidden', 'true');
        const wrapper = document.getElementById('galaxyUniverseWrapper');
        if (wrapper) wrapper.classList.remove('letter-open');
        if (romanticEnvelope) {
            romanticEnvelope.classList.remove('opening', 'open');
        }
        if (navigator.vibrate) navigator.vibrate(15);
        playChime(540, 0.25);
    }

    function typewriterGalaxyLetter() {
        if (!galaxyLetterBody) return;
        galaxyLetterBody.innerHTML = '';
        isGalaxyLetterTyping = true;
        if (galaxyLetterFastHint) galaxyLetterFastHint.style.display = 'block';

        let pIdx = 0;
        let cIdx = 0;
        let activeP = document.createElement('p');
        activeP.className = 'scroll-paragraph salutation';
        galaxyLetterBody.appendChild(activeP);

        function typeNext() {
            if (!isGalaxyLetterTyping || pIdx >= letterParagraphs.length) {
                isGalaxyLetterTyping = false;
                if (galaxyLetterFastHint) galaxyLetterFastHint.style.display = 'none';
                return;
            }

            const target = letterParagraphs[pIdx];
            if (cIdx < target.length) {
                activeP.textContent += target[cIdx];
                cIdx++;
                galaxyTypewriterTimer = setTimeout(typeNext, 20);
            } else {
                pIdx++;
                cIdx = 0;
                if (pIdx < letterParagraphs.length) {
                    activeP = document.createElement('p');
                    activeP.className = 'scroll-paragraph';
                    galaxyLetterBody.appendChild(activeP);
                    galaxyTypewriterTimer = setTimeout(typeNext, 130);
                } else {
                    isGalaxyLetterTyping = false;
                    if (galaxyLetterFastHint) galaxyLetterFastHint.style.display = 'none';
                }
            }
        }

        typeNext();
    }

    function completeGalaxyTypewriterImmediately() {
        if (!galaxyLetterBody) return;
        if (galaxyTypewriterTimer) clearTimeout(galaxyTypewriterTimer);
        isGalaxyLetterTyping = false;

        galaxyLetterBody.innerHTML = '';
        letterParagraphs.forEach((text, idx) => {
            const p = document.createElement('p');
            p.className = 'scroll-paragraph';
            if (idx === 0) p.classList.add('salutation');
            p.textContent = text;
            galaxyLetterBody.appendChild(p);
        });

        if (galaxyLetterFastHint) galaxyLetterFastHint.style.display = 'none';
        if (navigator.vibrate) navigator.vibrate(15);
    }

    if (galaxyLetterFastHint) {
        galaxyLetterFastHint.addEventListener('click', completeGalaxyTypewriterImmediately);
    }
    if (galaxyLetterBody) {
        galaxyLetterBody.addEventListener('click', () => {
            if (isGalaxyLetterTyping) completeGalaxyTypewriterImmediately();
        });
    }



    // Nút đóng thư
    const closeLetterTriggers = [btnCloseGalaxyLetter, galaxyLetterBackdrop, btnLetterExploreGalaxy].filter(Boolean);
    closeLetterTriggers.forEach(el => {
        el.addEventListener('click', (e) => {
            e.stopPropagation();
            closeGalaxyLoveLetter();
        });
    });

    // Nút tiếp tục đến Thả Đèn Trời Nguyện Ước từ bức thư trong Vũ Trụ
    if (btnGalaxyGoToCh3) {
        btnGalaxyGoToCh3.addEventListener('click', () => {
            closeGalaxyLoveLetter();
            goToScene(3);
        });
    }

    // Tương tác chạm & vuốt xoay 3D Galaxy (Pointer / Touch events)
    if (galaxyCanvas) {
        galaxyCanvas.addEventListener('pointerdown', (e) => {
            isGalaxyDragging = true;
            galaxyLastX = e.clientX;
            galaxyLastY = e.clientY;
            galaxyPointerDownX = e.clientX;
            galaxyPointerDownY = e.clientY;
        });

        window.addEventListener('pointermove', (e) => {
            if (!isGalaxyDragging || !isGalaxyRunning) return;
            const dx = (e.clientX - galaxyLastX) * 0.0055;
            const dy = (e.clientY - galaxyLastY) * 0.0055;
            galaxyRotY += dx;
            galaxyRotX -= dy;
            galaxyVelRotY = dx * 0.6;
            galaxyVelRotX = -dy * 0.6;
            galaxyLastX = e.clientX;
            galaxyLastY = e.clientY;
        });

        window.addEventListener('pointerup', () => {
            isGalaxyDragging = false;
        });

        // Hiệu ứng rê chuột trên Desktop: đổi thành bàn tay click khi lướt qua lá thư 3D
        galaxyCanvas.addEventListener('pointermove', (e) => {
            if (isGalaxyDragging || isGalaxyLetterOpen) return;
            let isOverLetter = false;
            for (let i = 0; i < gSpecialLetters.length; i++) {
                const sObj = gSpecialLetters[i];
                if (sObj.screenX !== undefined && sObj.alpha > 0.22) {
                    const padX = (sObj.drawW / 2) + 16;
                    const padY = (sObj.drawH / 2) + 14;
                    if (Math.abs(e.clientX - sObj.screenX) <= padX && Math.abs(e.clientY - sObj.screenY) <= padY) {
                        isOverLetter = true;
                        break;
                    }
                }
            }
            galaxyCanvas.style.cursor = isOverLetter ? 'pointer' : 'grab';
        });

        // Chạm vào màn hình: nếu chạm trúng lá thư tình 3D thì mở thư, nếu chạm vùng khác thì bắn tim
        galaxyCanvas.addEventListener('click', (e) => {
            if (isGalaxyLetterOpen) return;

            const dragDist = Math.hypot(e.clientX - galaxyPointerDownX, e.clientY - galaxyPointerDownY);
            if (dragDist > 10) return; // Đang vuốt xoay màn hình, không kích hoạt click

            let clickedLetter = false;
            for (let i = 0; i < gSpecialLetters.length; i++) {
                const sObj = gSpecialLetters[i];
                if (sObj.screenX !== undefined && sObj.alpha > 0.22) {
                    const padX = (sObj.drawW / 2) + 24;
                    const padY = (sObj.drawH / 2) + 18;
                    if (Math.abs(e.clientX - sObj.screenX) <= padX && Math.abs(e.clientY - sObj.screenY) <= padY) {
                        clickedLetter = true;
                        if (navigator.vibrate) navigator.vibrate([40, 60, 100]);
                        burstGalaxyHearts(e.clientX, e.clientY, 15);
                        playCelebrationChord();
                        playMagicSparkleSound();
                        openGalaxyLoveLetter();
                        break;
                    }
                }
            }

            if (!clickedLetter) {
                if (navigator.vibrate) navigator.vibrate(18);
                playChime(640, 0.25);
                burstGalaxyHearts(e.clientX, e.clientY, 6);
            }
        });
    }

    window.addEventListener('resize', () => {
        if (isGalaxyRunning) {
            resizeGalaxyCanvas();
        }
    });

    // ----------------------------------------------------
    // 13. CINEMATIC 3D PARALLAX DEPTH SYSTEM (MOUSE & GYRO)
    // ----------------------------------------------------
    let parallaxTargetX = 0, parallaxTargetY = 0;
    let parallaxCurrentX = 0, parallaxCurrentY = 0;

    window.addEventListener('mousemove', (e) => {
        parallaxTargetX = (e.clientX / window.innerWidth - 0.5) * 2;
        parallaxTargetY = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    // Gyroscope tilt on mobile if available
    if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission !== 'function') {
        window.addEventListener('deviceorientation', (e) => {
            if (e.gamma !== null && e.beta !== null) {
                parallaxTargetX = Math.min(Math.max(e.gamma / 30, -1), 1);
                parallaxTargetY = Math.min(Math.max((e.beta - 45) / 30, -1), 1);
            }
        }, { passive: true });
    }

    const farMount = document.querySelector('.mountain-layer-far');
    const midMount = document.querySelector('.mountain-layer-mid');
    const nearMount = document.querySelector('.mountain-layer-near');
    const grandHalo = document.querySelector('.backdrop-grand-moon-halo');
    const clusterLanterns = document.getElementById('backdropLanterns');
    const clusterFireflies = document.getElementById('backdropFireflies');
    const clusterFolklore = document.getElementById('backdropFolklore');

    function renderParallax() {
        if (currentChapter !== 1) {
            requestAnimationFrame(renderParallax);
            return;
        }

        parallaxCurrentX += (parallaxTargetX - parallaxCurrentX) * 0.045;
        parallaxCurrentY += (parallaxTargetY - parallaxCurrentY) * 0.045;

        const px = parallaxCurrentX;
        const py = parallaxCurrentY;

        if (farMount) farMount.style.transform = `translate3d(${px * 14}px, ${py * 7}px, 0)`;
        if (midMount) midMount.style.transform = `translate3d(${px * 26}px, ${py * 13}px, 0)`;
        if (nearMount) nearMount.style.transform = `translate3d(${px * 40}px, ${py * 18}px, 0)`;
        if (grandHalo) grandHalo.style.transform = `translate(-50%, -50%) translate3d(${px * 16}px, ${py * 10}px, 0)`;
        if (clusterLanterns) clusterLanterns.style.transform = `translate3d(${px * -22}px, ${py * -12}px, 0)`;
        if (clusterFireflies) clusterFireflies.style.transform = `translate3d(${px * -32}px, ${py * -18}px, 0)`;
        if (clusterFolklore) clusterFolklore.style.transform = `translate3d(${px * -18}px, ${py * -9}px, 0)`;

        requestAnimationFrame(renderParallax);
    }

    // Girlfriend Photo Cameo Modal Handler
    const gfCameoBtn = document.getElementById('gfCameoBtn');
    const gfPhotoModal = document.getElementById('gfPhotoModal');
    const gfModalClose = document.getElementById('gfModalClose');
    const gfModalBackdrop = document.getElementById('gfModalBackdrop');

    function openGfModal() {
        if (!gfPhotoModal) return;
        gfPhotoModal.classList.add('active');
        gfPhotoModal.setAttribute('aria-hidden', 'false');
    }

    function closeGfModal() {
        if (!gfPhotoModal) return;
        gfPhotoModal.classList.remove('active');
        gfPhotoModal.setAttribute('aria-hidden', 'true');
    }

    if (gfCameoBtn) gfCameoBtn.addEventListener('click', openGfModal);
    if (gfModalClose) gfModalClose.addEventListener('click', closeGfModal);
    if (gfModalBackdrop) gfModalBackdrop.addEventListener('click', closeGfModal);

    // ----------------------------------------------------
    // CLEAN & ROBUST RESOURCE PRELOADER
    // ----------------------------------------------------
    const appPreloader = document.getElementById('appPreloader');
    const preloaderBarFill = document.getElementById('preloaderBarFill');
    const preloaderPercentText = document.getElementById('preloaderPercentText');
    const preloaderStatusArea = document.getElementById('preloaderStatusArea');
    const preloaderEnterArea = document.getElementById('preloaderEnterArea');
    const btnEnterApp = document.getElementById('btnEnterApp');

    const essentialAssets = [
        'assets/images/luminous_super_moon.jpg',
        'assets/images/tvy.jpg',
        'assets/images/sky_lantern_screen_transparent.png',
        'assets/images/lotus_pure.png',
        'assets/images/rabbit_branch_transparent.png'
    ];

    let loadedCount = 0;
    const totalAssets = essentialAssets.length;
    let isPreloadDone = false;

    function updatePreloaderProgress(pct) {
        if (preloaderBarFill) preloaderBarFill.style.width = `${pct}%`;
        if (preloaderPercentText) preloaderPercentText.textContent = `${pct}%`;
    }

    function onPreloadComplete() {
        if (isPreloadDone) return;
        isPreloadDone = true;
        updatePreloaderProgress(100);

        setTimeout(() => {
            if (preloaderStatusArea) preloaderStatusArea.style.display = 'none';
            if (preloaderEnterArea) preloaderEnterArea.style.display = 'block';
        }, 200);
    }

    essentialAssets.forEach(src => {
        const img = new Image();
        img.onload = img.onerror = () => {
            loadedCount++;
            const pct = Math.round((loadedCount / totalAssets) * 100);
            updatePreloaderProgress(pct);
            if (loadedCount >= totalAssets) {
                onPreloadComplete();
            }
        };
        img.src = src;
    });

    // Safety timeout (max 1.6s) so it never gets stuck
    setTimeout(onPreloadComplete, 1600);

    if (btnEnterApp) {
        btnEnterApp.addEventListener('click', () => {
            initAudioContext();
            toggleMusic(true);
            playChime(700, 0.6);
            if (navigator.vibrate) navigator.vibrate([30, 40]);

            document.body.classList.add('painting-reveal-active');

            if (appPreloader) {
                appPreloader.classList.add('loaded-fade-out');
                setTimeout(() => {
                    appPreloader.style.display = 'none';
                }, 500);
            }
        });
    }

    requestAnimationFrame(renderParallax);
});



