document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM полностью загружен');
    const navLinks = document.querySelectorAll('a[href^="#"]');
    console.log('Найдено ссылок для прокрутки:', navLinks.length);
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    const counters = document.querySelectorAll('.counter');
    const counterSpeed = 200;
    console.log('Найдено счётчиков:', counters.length);

    counters.forEach(counter => {
        const animateCounter = () => {
            const target = parseInt(counter.getAttribute('data-target'));
            let count = parseInt(counter.innerText);
            const increment = target / counterSpeed;

            if (count < target) {
                count += increment;
                counter.innerText = Math.ceil(count);
                requestAnimationFrame(animateCounter);
            } else {
                counter.innerText = target;
            }
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounter();
                observer.disconnect();
            }
        }, { threshold: 0.5 });
        observer.observe(counter);
    });

    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        console.log('Таймер обратного отсчёта найден');
        const endOfWeek = new Date();
        endOfWeek.setDate(endOfWeek.getDate() + (7 - endOfWeek.getDay()));
        endOfWeek.setHours(23, 59, 59, 999);

        const updateCountdown = () => {
            const now = new Date();
            const timeLeft = endOfWeek - now;

            if (timeLeft <= 0) {
                countdownElement.innerText = 'Предложение истекло!';
                return;
            }

            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            countdownElement.innerText = `${days}д ${hours}ч ${minutes}м ${seconds}с`;
        };

        setInterval(updateCountdown, 1000);
        updateCountdown();
    } else {
        console.log('Таймер обратного отсчёта не найден');
    }

    const modal = document.getElementById('modal');
    const ctaButtons = document.querySelectorAll('.cta-button');
    const closeButton = document.querySelector('.close'); // Добавляем выбор крестика

    console.log('Найдено CTA-кнопок:', ctaButtons.length);
    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            openModal();
        });
    });

    if (closeButton) {
        console.log('Крестик для модального окна найден');
        closeButton.addEventListener('click', () => {
            closeModal();
        });
    } else {
        console.log('Крестик для модального окна не найден');
    }

    window.onclick = function (event) {
        if (event.target === modal) {
            closeModal();
        }
    };

    const subscribeForm = document.getElementById('subscribe-form');
    if (subscribeForm) {
        console.log('Форма подписки найдена');
        subscribeForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const emailValue = emailInput.value.trim();

            if (!emailValue) {
                alert('Пожалуйста, введите ваш email.');
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
                alert('Пожалуйста, введите корректный email.');
            } else {
                alert('Спасибо за подписку! Проверьте ваш email для получения гайда.');
                emailInput.value = '';
                logEvent('Подписка на рассылку');
            }
        });
    } else {
        console.log('Форма подписки не найдена');
    }

    const enrollForm = document.getElementById('enroll-form');
    if (enrollForm) {
        console.log('Форма записи на курс найдена');
        enrollForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const nameInput = this.querySelector('input[type="text"]');
            const emailInput = this.querySelector('input[type="email"]');
            const nameValue = nameInput.value.trim();
            const emailValue = emailInput.value.trim();

            if (!nameValue || !emailValue) {
                alert('Пожалуйста, заполните все поля.');
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
                alert('Пожалуйста, введите корректный email.');
            } else {
                alert(`Спасибо, ${nameValue}! Ваша заявка отправлена.`);
                nameInput.value = '';
                emailInput.value = '';
                closeModal();
                logEvent('Отправка заявки на курс');
            }
        });
    } else {
        console.log('Форма записи на курс не найдена');
    }

    const faqButtons = document.querySelectorAll('.faq-question');
    console.log('Найдено FAQ кнопок:', faqButtons.length);
    faqButtons.forEach(button => {
        const answer = button.nextElementSibling;
        if (answer) {
            answer.style.display = 'none';
        }
        button.addEventListener('click', function () {
            console.log('Клик по FAQ кнопке:', this.textContent);
            const isVisible = answer.style.display === 'block';
            answer.style.display = isVisible ? 'none' : 'block';
            this.textContent = isVisible ? this.textContent.replace('−', '+') : this.textContent.replace('+', '−');
            logEvent(`FAQ: ${this.textContent}`);
        });
    });

    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        console.log('Кнопка "Наверх" найдена');
        window.addEventListener('scroll', function () {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });

        backToTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            logEvent('Клик на кнопку "Наверх"');
        });
    } else {
        console.log('Кнопка "Наверх" не найдена');
    }

    const header = document.getElementById('header');
    const headerOffset = header ? header.offsetTop : 0;
    if (header) {
        console.log('Header найден');
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > headerOffset) {
                header.classList.add('sticky');
                document.body.style.paddingTop = `${header.offsetHeight}px`;
            } else {
                header.classList.remove('sticky');
                document.body.style.paddingTop = '0';
            }
        });
    } else {
        console.log('Header не найден');
    }

    const scrollElements = document.querySelectorAll('.animate-on-scroll');
    const observerOptions = { threshold: 0.2 };
    console.log('Найдено элементов для анимации при скролле:', scrollElements.length);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                logEvent(`Анимация секции: ${entry.target.id}`);
            }
        });
    }, observerOptions);

    scrollElements.forEach(element => observer.observe(element));

    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (menuToggle && navMenu) {
        console.log('Бургер-меню и навигационное меню найдены');
        menuToggle.addEventListener('click', () => {
            console.log('Клик по бургер-меню');
            navMenu.classList.toggle('active');
            menuToggle.textContent = navMenu.classList.contains('active') ? '✖' : '☰';
            logEvent('Переключение мобильного меню');
        });
    } else {
        console.log('Бургер-меню или навигационное меню не найдены');
    }

    const galleryImages = document.querySelectorAll('.gallery-img');
    console.log('Найдено изображений в галерее:', galleryImages.length);
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            logEvent(`Клик по изображению: ${img.alt}`);
            img.style.transform = 'scale(1.1)';
            setTimeout(() => img.style.transform = 'scale(1)', 300);
        });
    });

    const trackSectionVisibility = () => {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                logEvent(`Секция видима: ${section.id}`);
            }
        });
    };

    window.addEventListener('scroll', trackSectionVisibility);

    const initializePage = () => {
        try {
            logEvent('Инициализация страницы');
            fetchCourseData().then(data => console.log('Данные курса:', data));
            faqButtons.forEach(button => {
                if (!button.textContent.includes('+') && !button.textContent.includes('−')) {
                    button.textContent += ' +';
                }
            });
        } catch (error) {
            handleError(error);
        }
    };

    initializePage();
});

const modal = document.getElementById('modal');
function openModal() {
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        logEvent('Открытие модального окна');
    } else {
        console.log('Модальное окно не найдено');
    }
}

function closeModal() {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        logEvent('Закрытие модального окна');
    }
}

const logEvent = (eventName) => {
    console.log(`Событие: ${eventName}`);
};

const getElementHeight = (elementId) => {
    const element = document.getElementById(elementId);
    return element ? element.offsetHeight : 0;
};

const handleError = (error) => {
    console.error('Ошибка:', error.message);
    alert('Произошла ошибка. Попробуйте снова.');
};

const fetchCourseData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ title: 'Курс по криптоинвестициям', duration: '6 недель' });
        }, 1000);
    });
};

const measurePerformance = () => {
    const start = performance.now();
    for (let i = 0; i < 1000; i++) {
        Math.random();
    }
    const end = performance.now();
    console.log(`Время выполнения: ${(end - start).toFixed(2)} мс`);
};

measurePerformance();