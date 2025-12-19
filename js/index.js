/**
Asset => 
JS audio using howlerJS:
https://howlerjs.com/
Apple Font: 
https://sf.abarba.me/SF-UI-Text-UltrathinItalic.otf ===https://gist.github.com/AndrewBarba/2c0f6612ceef30f5f55d===
iPhone signal bar: https://icons8.com/icon/set/signal/all
iPhone framework: https://preview.ibb.co/dGjspw/Untitled_1.png
**/

// تاریخ و زمان فعلی
var d = new Date();
var dt = d.getDate();
var h = d.getHours();
var m = d.getMinutes();

// اضافه کردن صفر برای اعداد یک رقمی
function aZero(n) {
  return n.toString().length == 1 ? n = '0' + n : n;
}

// نام روزها و ماه‌ها
(function() {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    Date.prototype.getMonthName = function() {
        return months[this.getMonth()];
    };
    Date.prototype.getDayName = function() {
        return days[this.getDay()];
    };
})();

var day = d.getDayName();
var month = d.getMonthName();
var x = aZero(h) + ":" + aZero(m);
var y = day + ", " + month + " " + dt;
var o = "AT&T";

// به‌روزرسانی متن‌ها
document.getElementById("clock-text").innerHTML = x;
document.getElementById("date-text").innerHTML = y;
document.getElementById("temp-notch").innerHTML = o;

// متغیرهای اصلی
var message = document.getElementById('message-overlay');
var mw = document.getElementById('merrywrap');
var content = document.querySelector('.content');
var body = document.body;
var balloons = [];
var confetti = [];
var stars = [];

// لیست تصاویر پس‌زمینه تولد
var birthdayBackgrounds = [
    'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1532117182044-031e7cd916ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
];

// لیست موسیقی‌های تولد
var birthdaySongs = [
    'https://assets.mixkit.co/music/preview/mixkit-happy-birthday-to-you-443.mp3',
    'https://assets.mixkit.co/music/preview/mixkit-party-dance-521.mp3',
    'https://assets.mixkit.co/music/preview/mixkit-celebration-147.mp3',
    'https://assets.mixkit.co/music/preview/mixkit-happy-feeling-138.mp3',
    'https://assets.mixkit.co/music/preview/mixkit-birthday-party-dance-531.mp3'
];

// موسیقی‌های مختلف
var audio = new Howl({
    src: ['https://assets.mixkit.co/sfx/preview/mixkit-unlock-phone-notification-253.mp3'],
    volume: 0.7
});

var birthdaySong = new Howl({
    src: [birthdaySongs[0]],
    volume: 0.6,
    loop: true,
    onload: function() {
        console.log('Birthday song loaded successfully!');
    },
    onloaderror: function(id, error) {
        console.log('Error loading birthday song:', error);
    }
});

var backgroundMusic = new Howl({
    src: ['https://assets.mixkit.co/music/preview/mixkit-happy-feeling-138.mp3'],
    volume: 0.3,
    loop: true,
    autoplay: false
});

// تابع ایجاد بادکنک‌ها
function createBalloons() {
    var colors = ['#FF6B6B', '#4ECDC4', '#FFD166', '#06D6A0', '#118AB2', '#EF476F', '#073B4C'];
    
    for (var i = 0; i < 20; i++) {
        var balloon = document.createElement('div');
        balloon.className = 'balloon';
        
        // موقعیت تصادفی
        var left = Math.random() * 100;
        var size = 30 + Math.random() * 40;
        var color = colors[Math.floor(Math.random() * colors.length)];
        var duration = 8 + Math.random() * 12;
        var delay = Math.random() * 5;
        
        // استایل بادکنک
        balloon.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size * 1.3}px;
            background: ${color};
            border-radius: 50%;
            left: ${left}%;
            bottom: -100px;
            z-index: 9998;
            opacity: 0.8;
            animation: floatUp ${duration}s ease-in ${delay}s infinite;
            box-shadow: inset -10px -10px 0 rgba(0,0,0,0.1);
        `;
        
        // رشته بادکنک
        var string = document.createElement('div');
        string.style.cssText = `
            position: absolute;
            width: 2px;
            height: ${size * 2}px;
            background: rgba(255,255,255,0.5);
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
        `;
        
        balloon.appendChild(string);
        document.body.appendChild(balloon);
        balloons.push(balloon);
    }
    
    // اضافه کردن استایل انیمیشن
    var style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0.8;
            }
            100% {
                transform: translateY(-100vh) rotate(20deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// تابع ایجاد کانفتی
function createConfetti() {
    var colors = ['#FF6B6B', '#4ECDC4', '#FFD166', '#06D6A0', '#118AB2', '#EF476F', '#FFFFFF'];
    
    setInterval(function() {
        for (var i = 0; i < 15; i++) {
            var confettiPiece = document.createElement('div');
            confettiPiece.className = 'confetti';
            
            var color = colors[Math.floor(Math.random() * colors.length)];
            var left = Math.random() * 100;
            var size = 5 + Math.random() * 10;
            var rotation = Math.random() * 360;
            var duration = 3 + Math.random() * 4;
            var delay = Math.random() * 2;
            
            confettiPiece.style.cssText = `
                position: fixed;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                left: ${left}%;
                top: -50px;
                z-index: 9999;
                opacity: 0.9;
                animation: fallConfetti ${duration}s linear ${delay}s infinite;
                transform: rotate(${rotation}deg);
            `;
            
            if (Math.random() > 0.5) {
                confettiPiece.style.borderRadius = '50%';
            } else {
                confettiPiece.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
            }
            
            document.body.appendChild(confettiPiece);
            confetti.push(confettiPiece);
            
            // حذف بعد از اتمام انیمیشن
            setTimeout(function() {
                if (confettiPiece.parentNode) {
                    confettiPiece.parentNode.removeChild(confettiPiece);
                }
            }, (duration + delay) * 1000);
        }
    }, 300);
    
    // اضافه کردن استایل انیمیشن
    var style = document.createElement('style');
    style.textContent = `
        @keyframes fallConfetti {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0.9;
            }
            100% {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// تابع ایجاد ستاره‌های درخشان
function createTwinklingStars() {
    for (var i = 0; i < 50; i++) {
        var star = document.createElement('div');
        star.className = 'star';
        
        var left = Math.random() * 100;
        var top = Math.random() * 100;
        var size = 1 + Math.random() * 3;
        var duration = 1 + Math.random() * 3;
        var delay = Math.random() * 5;
        
        star.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: white;
            border-radius: 50%;
            left: ${left}%;
            top: ${top}%;
            z-index: 9997;
            opacity: ${0.3 + Math.random() * 0.7};
            animation: twinkle ${duration}s ease-in-out ${delay}s infinite alternate;
            box-shadow: 0 0 ${size * 2}px white;
        `;
        
        document.body.appendChild(star);
        stars.push(star);
    }
    
    // اضافه کردن استایل انیمیشن
    var style = document.createElement('style');
    style.textContent = `
        @keyframes twinkle {
            0%, 100% {
                opacity: 0.3;
                transform: scale(1);
            }
            50% {
                opacity: 1;
                transform: scale(1.2);
            }
        }
    `;
    document.head.appendChild(style);
}

// تابع تغییر پس‌زمینه بدن
function changeBodyBackground() {
    var gradientColors = [
        'linear-gradient(45deg, #FF6B6B, #4ECDC4, #FFD166)',
        'linear-gradient(45deg, #06D6A0, #118AB2, #EF476F)',
        'linear-gradient(45deg, #073B4C, #118AB2, #06D6A0)',
        'linear-gradient(45deg, #FF6B6B, #FFD166, #EF476F)',
        'linear-gradient(45deg, #4ECDC4, #118AB2, #073B4C)'
    ];
    
    var currentIndex = 0;
    
    // تغییر هر 10 ثانیه
    setInterval(function() {
        body.style.background = gradientColors[currentIndex];
        body.style.transition = 'background 2s ease-in-out';
        currentIndex = (currentIndex + 1) % gradientColors.length;
    }, 10000);
    
    // شروع با اولین گرادینت
    body.style.background = gradientColors[0];
}

// تابع نمایش پیام تبریک
function showBirthdayMessage() {
    var messageContainer = document.createElement('div');
    messageContainer.id = 'birthday-message';
    messageContainer.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 30px 50px;
        border-radius: 20px;
        text-align: center;
        z-index: 10000;
        font-family: 'Arial', sans-serif;
        border: 3px solid #FFD166;
        box-shadow: 0 0 50px rgba(255, 209, 102, 0.5);
        animation: popIn 0.8s ease-out;
    `;
    
    messageContainer.innerHTML = `
        <h1 style="font-size: 2.5em; margin-bottom: 20px; color: #FFD166;">🎉 Happy Birthday! 🎂</h1>
        <p style="font-size: 1.2em; margin-bottom: 15px;">Wishing you a day filled with happiness and joy!</p>
        <p style="font-size: 1.2em; margin-bottom: 25px;">May all your dreams come true! ✨</p>
        <button id="close-message" style="
            background: #FF6B6B;
            color: white;
            border: none;
            padding: 10px 30px;
            border-radius: 25px;
            font-size: 1em;
            cursor: pointer;
            transition: all 0.3s;
        ">Continue Celebration 🎊</button>
    `;
    
    document.body.appendChild(messageContainer);
    
    // اضافه کردن انیمیشن
    var style = document.createElement('style');
    style.textContent = `
        @keyframes popIn {
            0% {
                transform: translate(-50%, -50%) scale(0.5);
                opacity: 0;
            }
            70% {
                transform: translate(-50%, -50%) scale(1.1);
            }
            100% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    // دکمه بستن پیام
    document.getElementById('close-message').addEventListener('click', function() {
        messageContainer.style.animation = 'popOut 0.5s ease-in forwards';
        
        setTimeout(function() {
            if (messageContainer.parentNode) {
                messageContainer.parentNode.removeChild(messageContainer);
            }
        }, 500);
    });
    
    // اضافه کردن انیمیشن خروج
    var outStyle = document.createElement('style');
    outStyle.textContent = `
        @keyframes popOut {
            0% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(0.5);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(outStyle);
}

// تابع ایجاد کیک تولد
function createBirthdayCake() {
    var cakeContainer = document.createElement('div');
    cakeContainer.id = 'birthday-cake';
    cakeContainer.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 9996;
        text-align: center;
    `;
    
    cakeContainer.innerHTML = `
        <div style="
            width: 80px;
            height: 40px;
            background: linear-gradient(to right, #8B4513, #A0522D);
            border-radius: 10px 10px 0 0;
            position: relative;
            margin: 0 auto;
        ">
            <div style="
                width: 90px;
                height: 30px;
                background: linear-gradient(to right, #FFB6C1, #FF69B4);
                border-radius: 15px;
                position: absolute;
                top: -15px;
                left: -5px;
            "></div>
        </div>
        <div style="
            width: 100px;
            height: 10px;
            background: #FFD700;
            margin: 0 auto;
        "></div>
        <div style="
            margin-top: 5px;
            font-size: 12px;
            color: white;
            text-shadow: 1px 1px 2px black;
        ">🎂 Birthday Cake</div>
    `;
    
    document.body.appendChild(cakeContainer);
}

// تابع ایجاد شمع‌های چشمک‌زن
function createCandles() {
    var candlesContainer = document.createElement('div');
    candlesContainer.id = 'candles';
    candlesContainer.style.cssText = `
        position: fixed;
        top: 50px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9996;
        display: flex;
        gap: 10px;
    `;
    
    for (var i = 0; i < 5; i++) {
        var candle = document.createElement('div');
        candle.style.cssText = `
            width: 8px;
            height: 30px;
            background: linear-gradient(to bottom, white, #FFD700);
            border-radius: 4px;
            position: relative;
        `;
        
        var flame = document.createElement('div');
        flame.style.cssText = `
            width: 15px;
            height: 20px;
            background: radial-gradient(circle, #FFD700, #FF4500, transparent 70%);
            border-radius: 50% 50% 20% 20%;
            position: absolute;
            top: -25px;
            left: -3.5px;
            animation: flicker ${0.5 + Math.random() * 0.5}s infinite alternate;
        `;
        
        candle.appendChild(flame);
        candlesContainer.appendChild(candle);
    }
    
    document.body.appendChild(candlesContainer);
    
    // اضافه کردن انیمیشن
    var style = document.createElement('style');
    style.textContent = `
        @keyframes flicker {
            0%, 100% {
                transform: scale(1);
                opacity: 0.9;
            }
            50% {
                transform: scale(1.1);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

// تابع شروع جشن تولد
function startBirthdayCelebration() {
    // تغییر پس‌زمینه
    var randomBackground = birthdayBackgrounds[Math.floor(Math.random() * birthdayBackgrounds.length)];
    content.style.backgroundImage = `url(${randomBackground})`;
    content.style.backgroundSize = 'cover';
    content.style.backgroundPosition = 'center';
    content.style.transition = 'background-image 1s ease-in-out';
    
    // تغییر موسیقی
    var randomSong = birthdaySongs[Math.floor(Math.random() * birthdaySongs.length)];
    birthdaySong.stop();
    birthdaySong = new Howl({
        src: [randomSong],
        volume: 0.6,
        loop: true
    });
    birthdaySong.play();
    
    // شروع انیمیشن‌ها
    createBalloons();
    createConfetti();
    createTwinklingStars();
    createBirthdayCake();
    createCandles();
    changeBodyBackground();
    
    // نمایش پیام تبریک پس از 2 ثانیه
    setTimeout(showBirthdayMessage, 2000);
    
    // تغییر تصویر پس‌زمینه هر 15 ثانیه
    setInterval(function() {
        var newBackground = birthdayBackgrounds[Math.floor(Math.random() * birthdayBackgrounds.length)];
        content.style.backgroundImage = `url(${newBackground})`;
    }, 15000);
    
    // تغییر موسیقی هر 30 ثانیه
    setInterval(function() {
        var newSong = birthdaySongs[Math.floor(Math.random() * birthdaySongs.length)];
        birthdaySong.fade(0.6, 0, 1000);
        setTimeout(function() {
            birthdaySong.stop();
            birthdaySong = new Howl({
                src: [newSong],
                volume: 0.6,
                loop: true
            });
            birthdaySong.play();
        }, 1000);
    }, 30000);
}

// تابع پاکسازی انیمیشن‌ها
function cleanupAnimations() {
    balloons.forEach(function(balloon) {
        if (balloon.parentNode) {
            balloon.parentNode.removeChild(balloon);
        }
    });
    
    confetti.forEach(function(confettiPiece) {
        if (confettiPiece.parentNode) {
            confettiPiece.parentNode.removeChild(confettiPiece);
        }
    });
    
    stars.forEach(function(star) {
        if (star.parentNode) {
            star.parentNode.removeChild(star);
        }
    });
    
    var cake = document.getElementById('birthday-cake');
    if (cake) cake.parentNode.removeChild(cake);
    
    var candles = document.getElementById('candles');
    if (candles) candles.parentNode.removeChild(candles);
    
    var message = document.getElementById('birthday-message');
    if (message) message.parentNode.removeChild(message);
    
    balloons = [];
    confetti = [];
    stars = [];
}

// GIFT BOX SOURCE CODE: https://tympanus.net/codrops/2013/12/24/merry-christmas-with-a-bursting-gift-box/
function giftAnimation() {
    var merrywrap = document.getElementById("merrywrap");
    var box = merrywrap.getElementsByClassName("giftbox")[0];
    var step = 1;
    var stepMinutes = [2000, 2000, 1000, 1000];
    
    function init() {
        box.addEventListener("click", openBox, false);
    }
    
    function stepClass(step) {
        merrywrap.className = 'merrywrap';
        merrywrap.className = 'merrywrap step-' + step;
    }
    
    function openBox() {
        if (step === 1) {
            box.removeEventListener("click", openBox, false);
        }
        
        stepClass(step);
        
        if (step === 3) {
            // شروع جشن تولد هنگام باز شدن کامل هدیه
            startBirthdayCelebration();
        }
        
        if (step === 4) {
            return;
        }
        
        setTimeout(openBox, stepMinutes[step - 1]);
        step++;
    }
    
    init();
}

// =====================
// شروع اجرای کد
// =====================

$(document).ready(function() {
    // پخش صدای نوتیفیکیشن پس از 2 ثانیه
    setTimeout(function() {
        audio.play();
        message.className += ' animated zoomIn';
        message.style.visibility = "visible";
    }, 2000);
    
    // کلیک بر روی پیام
    $("#message-overlay").click(function() {
        // حذف المان‌های اصلی
        $("#lock-icon").remove();
        $("#clock-text-overlay").remove();
        $("#date-overlay").remove();
        $("#message-overlay").remove();
        $("#touch-overlay").remove();
        
        // پخش موسیقی تولد
        birthdaySong.play();
        
        // تغییر پس‌زمینه اولیه
        content.style.backgroundImage = 'url(https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)';
        content.style.backgroundSize = 'cover';
        content.style.backgroundPosition = 'center';
        
        // به‌روزرسانی متن
        document.getElementById("temp-notch").innerHTML = "🎉 Happy Birthday!";
        
        
