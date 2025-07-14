document.addEventListener('DOMContentLoaded', function () {
  // === MOBILE MENU ===
  const burger = document.querySelector('.burger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeBtn = document.querySelector('.mobile-menu__close');
  const menuLinks = document.querySelectorAll('.mobile-menu__list a');

  burger.addEventListener('click', () => {
    mobileMenu.style.display = 'flex';
    document.body.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
  });
  closeBtn.addEventListener('click', () => {
    mobileMenu.style.display = 'none';
    document.body.classList.remove('menu-open');
    document.body.style.overflow = '';
  });
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.style.display = 'none';
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
    });
  });

  // === HERO АНИМАЦИИ ===
  document.querySelector('.hero__logo-img')?.classList.add('_visible');
  document.querySelector('.hero__img-layer')?.classList.add('_visible');
  setTimeout(() => {
    document.querySelector('.hero__badges')?.classList.add('_visible');
  }, 400);

  setTimeout(() => {
    document.querySelector('.hero__cta')?.classList.add('_visible');
  }, 450);
  setTimeout(() => {
    document.querySelector('.hero__dots')?.classList.add('_visible');
  }, 800);

  // === ABOUT АНИМАЦИЯ ===
  function revealAboutOnScroll() {
    const about = document.querySelector('.about__container');
    if (!about) return;

    const rect = about.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (rect.top < windowHeight * 0.85) {
      about.classList.add('_visible');
      window.removeEventListener('scroll', revealAboutOnScroll);
    }
  }
  window.addEventListener('scroll', revealAboutOnScroll);
  revealAboutOnScroll();

  // === CTA CIRCLE ANIMATION ===
  function updateCtaCircle() {
    const cta = document.querySelector('.cta');
    const circle = document.querySelector('.cta-circle');
    if (!cta || !circle) return;

    const ctaSectionHeight = 1700;  // или твоя финальная высота секции

    const rect = cta.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const isOnScreen = rect.top < windowHeight && rect.bottom > 0;

    if (!isOnScreen) {
      // Круглый старт
      circle.style.width = '590px';
      circle.style.height = '590px';
      circle.style.borderTopLeftRadius = '1000px 1000px';
      circle.style.borderTopRightRadius = '1000px 1000px';
      circle.style.borderBottomLeftRadius = '1000px 1000px';
      circle.style.borderBottomRightRadius = '1000px 1000px';
      return;
    }

    const visible = Math.max(0, windowHeight - rect.top);
    const maxAnim = Math.min(rect.height, windowHeight);
    const progress = Math.min(visible / maxAnim, 1);

    // Рост круга: ширина и высота
    const startSize = 590;
    const endSize = 2833;
    const newSize = startSize + (endSize - startSize) * progress;

    circle.style.width = `${newSize}px`;
    circle.style.height = `${newSize}px`;
    circle.style.borderRadius = '50%';
  }

  // === ПАРАЛЛАКС КАРТОЧЕК WHAT-WE-DO ===
  function parallaxWhatWeDo() {
    const section = document.querySelector('.what-we-do');
    const cards = document.querySelectorAll('.service-card');
    if (!section || !cards.length) return;

    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Если секция не на экране — не делаем параллакс
    if (rect.bottom < 0 || rect.top > windowHeight) {
      cards.forEach(card => card.style.setProperty('--parallax', '0px'));
      return;
    }

    // Прогресс прокрутки секции (от 0 до 1)
    const progress = Math.min(Math.max((windowHeight - rect.top) / (rect.height + windowHeight), 0), 1);

    // Смещение (можно кастомизировать под каждую карточку)
    const maxShifts = [80, 150, 220, 100];
    cards.forEach((card, i) => {
      const shift = -maxShifts[i % maxShifts.length] * progress;
      card.style.setProperty('--parallax', `${shift}px`);
    });
  }

  // === ЕДИНЫЙ ОБРАБОТЧИК ===
  function onScrollResize() {
    updateCtaCircle();
    parallaxWhatWeDo();
  }

  window.addEventListener('scroll', onScrollResize);
  window.addEventListener('resize', onScrollResize);
  onScrollResize();
});
