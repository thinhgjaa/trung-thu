// ====================================================================
// CẤU HÌNH DỰ ÁN WEB QUÀ TẶNG TRUNG THU
// ====================================================================

const TRUNG_THU_CONFIG = {
    // 1. Thông tin chung
    senderName: "Anh",
    receiverName: "Em Bé",
    headerQuote: "👱‍♂️: em sẽ mãi là em bé của đời anh 💕",
    holdInstruction: "Ấn giữ để mở quà ✨",

    // 2. Nhạc nền
    music: {
        src: "https://files.catbox.moe/u8g5r6.mp3",
        title: "Ánh Trăng Tình Yêu",
        autoplayOnHold: true
    },

    // 3. Chương 1: Đêm Rằm Huyền Ảo
    chapter1: {
        subtitle: "Mùa trăng rằm này, anh có một điều bất ngờ dành tặng riêng em...",
        moonHoldDurationMs: 2200 // 2.2 giây ấn giữ để tăng cảm xúc hồi hộp
    },

    // 4. Chương 2: Thư Tình Cung Trăng
    chapter2: {
        title: "Thư Tình Cung Trăng",
        subtitle: "Những lời chân thành từ tận đáy lòng gửi trao em",
        letterTitle: "Bức Thư Tình Gửi Em Bé Dưới Ánh Trăng",
        letterSender: "Chàng Chú Cuội ngốc nghếch yêu em nhất đời 💖",
        letterParagraphs: [
            "Gửi ngừi anh iuuu !!!",
            "Đây là lễ Trung Thu đầu tiên mờ anh được đón cùng dí em, cảm ơn em vì đã đến bên anh.",
            "Đêm nay trăng rằm tháng Tám sáng tỏ khắp nhân gian, người người rộn rã rước đèn ngắm trăng...",
            "Nhưng với anh, cảnh sắc đẹp nhất và lung linh nhất chính là được nhìn thấy nụ cười của em.",
            "Trăng rằm có sáng tỏ đến đâu cũng không bằng ánh mắt rạng ngời của em. Giữa vạn người tưng bừng hội ngộ, điều may mắn nhất của anh chính là có em kề bên.",
            "Cảm ơn em vì đã là một điều thật kỳ diệu và ngọt ngào trong cuộc sống của anh. Mong rằng mọi mùa Trung Thu và những ngày tháng sau này, người luôn ở bên chăm sóc, cưng chiều em sẽ là anh.",
            "Chúc em bé một mùa Trung Thu thật ấm áp, rạng rỡ và luôn luôn là cô gái hạnh phúc nhất thế gian nhé!"
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
        goToGalaxyButton: "Mở Hộp Quà Bí Mật 🎁✨"
    },

    // 6. Chương 4: Hộp Quà Bí Mật
    chapter4: {
        title: "Hộp Quà Bí Mật",
        centerStickerTop: "Quà trung thu bất ngờ",
        centerStickerBottom: "của ảnh 🌸",
        loveWords: [
            "Trung Thu vui vẻ bên anh",
            "Yêu em thật nhiều",
            "Xuân Thịnh ♡ Thanh Vy",
            "Chúc em iuu trung Thu vui vẻ",
            "Yêu em thật nhiều",
            "Trung Thu vui vẻ bên anh",
            "Bên anh thật lâu nhé",
            "Em là món quà tuyệt nhất",
            "Thương em nhất trần đời 💕",
            "Mãi yêu epes của anh",
            "Nụ cười của em là đẹp nhất",
            "Em là ngừi dệ thưn nhất quả đất",
            "Yêu em 3000 ✨"
        ]
    }
};
