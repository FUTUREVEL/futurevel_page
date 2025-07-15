// HERO 파티클 효과 (간단한 파티클)
const canvas = document.getElementById('particles');
let particles = [];
let w = window.innerWidth;
let h = window.innerHeight;

function initParticles() {
  particles = [];
  w = window.innerWidth;
  h = window.innerHeight;
  if (canvas) {
    canvas.width = w;
    canvas.height = h;
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        alpha: Math.random() * 0.5 + 0.3
      });
    }
  }
}

function drawParticles() {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, w, h);
  for (let p of particles) {
    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = '#00c6fb';
    ctx.shadowColor = '#00c6fb';
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.restore();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > w) p.dx *= -1;
    if (p.y < 0 || p.y > h) p.dy *= -1;
  }
  requestAnimationFrame(drawParticles);
}

if (canvas) {
  initParticles();
  drawParticles();
  window.addEventListener('resize', () => {
    initParticles();
  });
}

// HERO Parallax 효과
const heroContent = document.querySelector('.hero-content');
window.addEventListener('scroll', () => {
  if (heroContent) {
    const scrolled = window.scrollY;
    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

// MISSION 섹션 Fade-in & Slide-up
function handleMissionAnimation() {
  const items = document.querySelectorAll('.mission-item');
  const trigger = window.innerHeight * 0.85;
  items.forEach(item => {
    const rect = item.getBoundingClientRect();
    if (rect.top < trigger) {
      item.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', handleMissionAnimation);
window.addEventListener('load', handleMissionAnimation);

// WORKS 카드 슬라이더 (모바일 스크롤 지원)
const worksSlider = document.querySelector('.works-slider');
if (worksSlider) {
  let isDown = false;
  let startX, scrollLeft;
  worksSlider.addEventListener('mousedown', (e) => {
    isDown = true;
    worksSlider.classList.add('active');
    startX = e.pageX - worksSlider.offsetLeft;
    scrollLeft = worksSlider.scrollLeft;
  });
  worksSlider.addEventListener('mouseleave', () => {
    isDown = false;
    worksSlider.classList.remove('active');
  });
  worksSlider.addEventListener('mouseup', () => {
    isDown = false;
    worksSlider.classList.remove('active');
  });
  worksSlider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - worksSlider.offsetLeft;
    const walk = (x - startX) * 1.2;
    worksSlider.scrollLeft = scrollLeft - walk;
  });
}
// TEAM 프로필 오버레이 효과는 CSS로 처리
// JOIN 버튼 인터랙션은 CSS로 처리 

// 모바일 햄버거 메뉴 토글
const navbarToggle = document.getElementById('navbar-toggle');
const navbarMenu = document.getElementById('navbar-menu');
if (navbarToggle && navbarMenu) {
  navbarToggle.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
  });
  // 메뉴 클릭 시 자동 닫힘
  navbarMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navbarMenu.classList.remove('open');
    });
  });
} 

// 네비게이션 메뉴 클릭 시 부드럽게 스크롤 이동 (로고 포함)
const navLinks = document.querySelectorAll('.navbar-menu a[href^="#"], .navbar-logo a[href^="#"]');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const yOffset = -64; // 네비게이션 높이만큼 보정
        const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  });
}); 

// 스크롤 시 섹션 페이드업 애니메이션
function handleSectionAnimation() {
  const sections = document.querySelectorAll('.section-animate');
  const trigger = window.innerHeight * 0.85;
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < trigger) {
      section.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', handleSectionAnimation);
window.addEventListener('load', handleSectionAnimation); 

// 페이지 로드 시 전체 페이드인 애니메이션
window.addEventListener('DOMContentLoaded', function () {
  document.body.classList.add('page-fadein');
}); 