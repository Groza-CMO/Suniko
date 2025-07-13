document.addEventListener('DOMContentLoaded', function () {
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

  // === CTA CIRCLE ANIMATION ===
function updateCtaCircle() {
  const cta = document.querySelector('.cta');
  const circle = document.querySelector('.cta-circle');
  if (!cta || !circle) return;

  const ctaSectionHeight = 1700;  

  const rect = cta.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const isOnScreen = rect.top < windowHeight && rect.bottom > 0;

  if (!isOnScreen) {
    // Круглый старт
    circle.style.width = '590px';
    circle.style.height = '590px';
    circle.style.borderTopLeftRadius = '295px 295px';
    circle.style.borderTopRightRadius = '295px 295px';
    circle.style.borderBottomLeftRadius = '295px 295px';
    circle.style.borderBottomRightRadius = '295px 295px';
    return;
  }

  // Анимация начинается только когда секция появляется
  const visible = Math.max(0, windowHeight - rect.top);
  const maxAnim = Math.min(rect.height, windowHeight);
  const progress = Math.min(visible / maxAnim, 1);

  // Рост круга: высота до конца секции, ширина до ширины окна (или чуть больше)
  const startSize = 590;
  const endWidth = Math.max(window.innerWidth * 1.15, 1900); // шире окна — чтобы перекрыть всё
  const endHeight = ctaSectionHeight; // вот теперь круг точно до самого низа

  const newWidth = startSize + (endWidth - startSize) * progress;
  const newHeight = startSize + (endHeight - startSize) * progress;

  circle.style.width = `${newWidth}px`;
  circle.style.height = `${newHeight}px`;

  // Верх — идеальная полусфера (всегда половина ширины и высоты)
  const topX = newWidth / 2;
  const topY = newHeight / 2;
  circle.style.borderTopLeftRadius = `${topX}px ${topY}px`;
  circle.style.borderTopRightRadius = `${topX}px ${topY}px`;

  // Нижние радиусы — плавно уходят в 0 на последних 10% раскрытия
  if (progress >= 0.9) {
    const t = (progress - 0.9) / 0.1;
    const bottomRadiusX = (1 - t) * (newWidth / 2);
    const bottomRadiusY = (1 - t) * (newHeight / 2);
    circle.style.borderBottomLeftRadius = `${bottomRadiusX}px ${bottomRadiusY}px`;
    circle.style.borderBottomRightRadius = `${bottomRadiusX}px ${bottomRadiusY}px`;
  } else {
    // До 90% — овал снизу (всегда пропорциональный кругу)
    circle.style.borderBottomLeftRadius = `${newWidth / 2}px ${newHeight / 2}px`;
    circle.style.borderBottomRightRadius = `${newWidth / 2}px ${newHeight / 2}px`;
  }
}

window.addEventListener('scroll', updateCtaCircle);
window.addEventListener('resize', updateCtaCircle);
updateCtaCircle();


});
