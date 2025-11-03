// 슬라이더 기능
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

// 슬라이드 표시 함수
function showSlide(index) {
    // 인덱스 범위 조정
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }

    // 모든 슬라이드 숨기기
    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    // 모든 dot 비활성화
    dots.forEach(dot => {
        dot.classList.remove('active');
    });

    // 현재 슬라이드와 dot 활성화
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// 다음 슬라이드
function nextSlide() {
    showSlide(currentSlide + 1);
}

// 이전 슬라이드
function prevSlide() {
    showSlide(currentSlide - 1);
}

// 이벤트 리스너 등록
document.querySelector('.slider-btn.next').addEventListener('click', () => {
    nextSlide();
    stopAutoSlide();
    startAutoSlide();
});

document.querySelector('.slider-btn.prev').addEventListener('click', () => {
    prevSlide();
    stopAutoSlide();
    startAutoSlide();
});

// Dot 클릭 이벤트
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
        stopAutoSlide();
        startAutoSlide();
    });
});

// 키보드 네비게이션
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
    }
});

// 자동 슬라이드 (3초마다)
let autoSlideInterval;

function startAutoSlide() {
    // 기존 인터벌이 있으면 제거
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
    autoSlideInterval = setInterval(() => {
        nextSlide();
    }, 3000);
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
}

// 자동 슬라이드 시작
startAutoSlide();

// 슬라이더에 마우스 올리면 자동 슬라이드 중지 (PC)
const sliderContainer = document.querySelector('.slider-container');
sliderContainer.addEventListener('mouseenter', stopAutoSlide);
sliderContainer.addEventListener('mouseleave', startAutoSlide);

// 터치 스와이프 지원
let touchStartX = 0;
let touchEndX = 0;

sliderContainer.addEventListener('touchstart', (e) => {
    stopAutoSlide();
    touchStartX = e.changedTouches[0].screenX;
});

sliderContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    // 터치 끝나고 1초 후 자동 슬라이드 재시작
    setTimeout(startAutoSlide, 1000);
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // 왼쪽으로 스와이프 - 다음 슬라이드
        nextSlide();
    }
    if (touchEndX > touchStartX + 50) {
        // 오른쪽으로 스와이프 - 이전 슬라이드
        prevSlide();
    }
}

// 모바일 메뉴 토글
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    nav.classList.toggle('active');
});

// 메뉴 링크 클릭시 메뉴 닫기
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        nav.classList.remove('active');
    });
});

// 부드러운 스크롤 네비게이션
document.querySelectorAll('.nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

