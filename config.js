// ====================================================================
// CẤU HÌNH DỰ ÁN WEB QUÀ TẶNG TRUNG THU
// Bạn có thể dễ dàng chỉnh sửa tên, ảnh, lời chúc, bài hát tại đây!
// ====================================================================

const TRUNG_THU_CONFIG = {
    // 1. Thông tin chung
    senderName: "Anh",
    receiverName: "Em Bé",
    headerQuote: "👱‍♂️: em sẽ mãi là em bé của đời anh 💕",
    holdInstruction: "Ấn giữ vào mặt trăng",
    
    // 2. Nhạc nền
    // Bạn có thể thay bằng file mp3 của bạn trong thư mục assets/audio/ (vd: "assets/audio/nhac_tinh_yeu.mp3")
    // Hoặc giữ link nhạc nền lofi du dương lãng mạn dưới đây:
    music: {
        src: "https://files.catbox.moe/u8g5r6.mp3", // Bản nhạc piano acoustic Trung Thu lãng mạn
        title: "Ánh Trăng Tình Yêu (Romantic Acoustic Lofi)",
        autoplayOnHold: true
    },

    // 3. Chương 1: Đêm Rằm Huyền Ảo
    chapter1: {
        subtitle: "Mùa trăng rằm này, anh có một điều bất ngờ dành tặng riêng em...",
        moonHoldDurationMs: 1300 // Thời gian ấn giữ nhạy hơn (1.3 giây)
    },

    // 4. Chương 2: Thư Tình Cung Trăng
    chapter2: {
        title: "Thư Tình Cung Trăng",
        subtitle: "Những lời chân thành từ tận đáy lòng gửi trao em",
        letterTitle: "Bức Thư Tình Gửi Em Bé Dưới Ánh Trăng",
        letterSender: "Chàng Chú Cuội ngốc nghếch yêu em nhất đời 💖",
        letterParagraphs: [
            "Gửi em bé yêu dấu của anh,",
            "Đêm nay trăng rằm tháng Tám sáng tỏ khắp nhân gian, người người rộn rã rước đèn ngắm trăng...",
            "Nhưng với anh, cảnh sắc đẹp nhất và lung linh nhất chính là được nhìn thấy nụ cười của em.",
            "Trăng rằm có sáng tỏ đến đâu cũng không bằng ánh mắt rạng ngời của em. Giữa vạn người tưng bừng hội ngộ, điều may mắn nhất của anh chính là có em kề bên.",
            "Cảm ơn em vì đã là một điều thật kỳ diệu và ngọt ngào trong cuộc sống của anh. Mong rằng mọi mùa Trung Thu và những ngày tháng sau này, người luôn ở bên chăm sóc, cưng chiều em sẽ là anh.",
            "Chúc em bé một mùa Trung Thu thật ấm áp, rạng rỡ và luôn luôn là cô gái hạnh phúc nhất thế gian nhé! 💕🌕✨"
        ]
    },

    // 5. Chương 3: Thả Đèn Trời Nguyện Ước
    chapter3: {
        title: "Thả Đèn Trời Nguyện Ước",
        prompt: "Hãy nhắm mắt lại, nghĩ về tương lai của hai đứa và viết điều ước của em gửi lên cung trăng nhé... ✨",
        placeholder: "Ví dụ: Mong cho hai đứa mình mãi luôn hạnh phúc bên nhau...",
        sendButton: "Thả Đèn Lên Cung Trăng 🏮✨",
        afterWishSuccessTitle: "Chiếc Đèn Của Em Đã Chạm Tới Cung Trăng 🌕💫",
        afterWishSuccessText: "Nguyện ước của em đã được gửi gắm vào ngàn vì sao. Anh hứa sẽ luôn ở bên, che chở và cùng em biến mọi ước mơ thành hiện thực!",
        replayButton: "Xem Lại Hành Trình Yêu Thương 🔄",
        goToGalaxyButton: "Khám Phá Vũ Trụ Yêu Thương 🌌✨"
    },

    // 6. Chương 4: Vũ Trụ Tình Yêu (3D Love Galaxy - Trend TikTok Siêu Lãng Mạn)
    chapter4: {
        title: "Vũ Trụ Tình Yêu",
        centerStickerTop: "Quà trung thu bất ngờ",
        centerStickerBottom: "của ảnh 🌸",
        lyricHighlight: "THẤY EM ĐI LẠC TRONG KHU RỪNG NHỎ",
        loveWords: [
            "Trung Thu vui vẻ bên anh",
            "Yêu em thật nhiều",
            "LONG ANH ♡ HẠ PHƯƠNG",
            "Chúc bé Lí trung Thu vui vẻ",
            "Yêu em thật nhiều",
            "Trung Thu vui vẻ bên anh",
            "Bên anh thật lâu nhé",
            "Em là món quà tuyệt nhất",
            "Cùng anh đón ngàn mùa trăng",
            "Thương em nhất trần đời 💕",
            "Mãi yêu công chúa của anh",
            "Nụ cười của em là ánh sáng đời anh",
            "Harumi gift box",
            "Em bé đáng yêu nhất quả đất",
            "Yêu em 3000 ✨",
            "Trung Thu ngọt ngào bên nhau"
        ]
    }
};
