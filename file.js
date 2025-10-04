
        // Переменная для отслеживания автоматического режима
        let autoTimeMode = true;
        let shootingStarTimer = null;
        
        // Функция для определения времени суток и применения соответствующего стиля
        function updateTimeOfDay(forceTimeOfDay = null) {
            const now = new Date();
            const hour = now.getHours();
            const minutes = now.getMinutes();
            const body = document.body;
            const notchTime = document.getElementById('notchTime');
            const heroBtn = document.querySelector('.hero-btn');
            
            // Форматируем время для отображения
            const timeString = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            notchTime.textContent = timeString;
            
            // Удаляем все классы времени суток
            body.classList.remove('morning', 'day', 'afternoon', 'evening', 'sunset', 'night', 'late-night');
            
            // Обновляем активную кнопку
            document.querySelectorAll('.time-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Определяем время суток и применяем соответствующий класс
            let timeOfDay;
            
            if (forceTimeOfDay) {
                timeOfDay = forceTimeOfDay;
                
                // Выделяем соответствующую кнопку
                document.querySelector(`.time-btn[data-time="${forceTimeOfDay}"]`).classList.add('active');
                
                if (forceTimeOfDay === 'auto') {
                    autoTimeMode = true;
                    document.querySelector('.time-btn[data-time="auto"]').classList.add('active');
                    // Если выбран автоматический режим, определяем время суток по часам
                    if (hour >= 5 && hour < 8) timeOfDay = 'morning';
                    else if (hour >= 8 && hour < 12) timeOfDay = 'day';
                    else if (hour >= 12 && hour < 16) timeOfDay = 'afternoon';
                    else if (hour >= 16 && hour < 18) timeOfDay = 'evening';
                    else if (hour >= 18 && hour < 20) timeOfDay = 'sunset';
                    else if (hour >= 20 && hour < 23) timeOfDay = 'night';
                    else timeOfDay = 'late-night';
                } else {
                    autoTimeMode = false;
                }
            } else if (autoTimeMode) {
                // Автоматический режим
                document.querySelector('.time-btn[data-time="auto"]').classList.add('active');
                
                if (hour >= 5 && hour < 8) timeOfDay = 'morning';
                else if (hour >= 8 && hour < 12) timeOfDay = 'day';
                else if (hour >= 12 && hour < 16) timeOfDay = 'afternoon';
                else if (hour >= 16 && hour < 18) timeOfDay = 'evening';
                else if (hour >= 18 && hour < 20) timeOfDay = 'sunset';
                else if (hour >= 20 && hour < 23) timeOfDay = 'night';
                else timeOfDay = 'late-night';
            }
            
            // Применяем класс времени суток
            body.classList.add(timeOfDay);
            
            // Обновляем иконку погоды в челке
            const weatherIcon = document.querySelector('.notch-weather i');
            if (timeOfDay === 'morning' || timeOfDay === 'day' || timeOfDay === 'afternoon') {
                weatherIcon.className = 'fas fa-sun';
            } else if (timeOfDay === 'evening' || timeOfDay === 'sunset') {
                weatherIcon.className = 'fas fa-cloud-sun';
            } else if (timeOfDay === 'night' || timeOfDay === 'late-night') {
                weatherIcon.className = 'fas fa-moon';
            }
            
            // Добавляем эффект звезд для ночи
            if (timeOfDay === 'night' || timeOfDay === 'late-night') {
                addStars();
                startShootingStars();
            } else {
                removeStars();
                stopShootingStars();
            }
        }
        
        // Функция для добавления звезд
        function addStars() {
            if (!document.querySelector('.stars-container')) {
                const starsContainer = document.createElement('div');
                starsContainer.className = 'stars-container';
                starsContainer.style.position = 'absolute';
                starsContainer.style.top = '0';
                starsContainer.style.left = '0';
                starsContainer.style.width = '100%';
                starsContainer.style.height = '100%';
                starsContainer.style.zIndex = '1';
                starsContainer.style.overflow = 'hidden';
                
                // Создаем звезды
                for (let i = 0; i < 200; i++) {
                    const star = document.createElement('div');
                    star.className = 'star';
                    star.style.position = 'absolute';
                    star.style.width = Math.random() * 3 + 'px';
                    star.style.height = star.style.width;
                    star.style.backgroundColor = '#ffffff';
                    star.style.borderRadius = '50%';
                    star.style.top = Math.random() * 100 + '%';
                    star.style.left = Math.random() * 100 + '%';
                    star.style.animation = `twinkle ${Math.random() * 5 + 2}s infinite alternate`;
                    star.style.opacity = Math.random() * 0.7 + 0.3;
                    
                    starsContainer.appendChild(star);
                }
                
                document.querySelector('.hero-header').prepend(starsContainer);
            }
        }
        


        // Функция запуска падающих звезд
        function startShootingStars() {
            // Сначала останавливаем предыдущий таймер, если есть
            if (shootingStarTimer) {
                clearInterval(shootingStarTimer);
            }
            
            // Запускаем падающие звезды каждые 15 секунд
            shootingStarTimer = setInterval(() => {
                createShootingStar();
            }, 15000);
            
            // Создадим первую звезду сразу
            createShootingStar();
        }
        
        // Функция создания падающей звезды
        function createShootingStar() {
            const container = document.getElementById('shootingStarContainer');
            if (!container) return;
            
            // Очищаем старые звезды
            container.innerHTML = '';
            
            // Создаем падающую звезду
            const shootingStar = document.createElement('div');
            shootingStar.className = 'shooting-star';
            
            // Создаем голову звезды (яркая точка)
            const starHead = document.createElement('div');
            starHead.className = 'star-head';
            starHead.style.animation = 'burnEffect 0.5s infinite alternate';
            
            // Создаем след звезды
            const starTrail = document.createElement('div');
            starTrail.className = 'star-trail';
            
            // Создаем свечение звезды
            const starGlow = document.createElement('div');
            starGlow.className = 'star-glow';
            starGlow.style.animation = 'glowPulse 0.5s infinite alternate';
            
            // Добавляем элементы к звезде
            shootingStar.appendChild(starTrail);
            shootingStar.appendChild(starHead);
            shootingStar.appendChild(starGlow);
            
            // Случайная позиция в верхней части экрана
            const startX = Math.random() * 80 + 10; // 10-90%
            const startY = Math.random() * 20; // 0-20%
            
            // Длина звезды (хвоста)
            const trailLength = Math.random() * 60 + 80; // 80-140px
            
            // Устанавливаем начальное положение и размеры
            shootingStar.style.top = startY + '%';
            shootingStar.style.left = startX + '%';
            starTrail.style.width = trailLength + 'px';
            
            // Случайная кривая траектория
            const curveType = Math.floor(Math.random() * 3); // 0, 1, 2 - разные типы траекторий
            
            // Добавляем звезду в контейнер
            container.appendChild(shootingStar);
            
            // Показываем звезду
            setTimeout(() => {
                shootingStar.style.opacity = '1';
                
                // Вычисляем конечную позицию (чтобы падала по диагонали вниз)
                const endX = startX - Math.random() * 30 - 20; // Влево от начальной позиции
                const endY = startY + Math.random() * 50 + 30; // Вниз от начальной позиции
                
                // Длительность анимации
                const duration = Math.random() * 2 + 2; // 2-4 секунды
                
                // Устанавливаем стили для анимации
                shootingStar.style.transition = `transform ${duration}s cubic-bezier(0.25, 0.1, 0.25, 1)`;
                
                // Разные типы траекторий
                switch(curveType) {
                    case 0: // Прямая диагональ
                        shootingStar.style.transform = `translate(${endX - startX}vw, ${endY - startY}vh)`;
                        break;
                    case 1: // Слегка изогнутая
                        shootingStar.style.transform = `translate(${endX - startX}vw, ${endY - startY}vh) rotate(-${Math.random() * 10 + 5}deg)`;
                        break;
                    case 2: // Сильно изогнутая
                        shootingStar.style.transform = `translate(${endX - startX}vw, ${endY - startY}vh) rotate(-${Math.random() * 20 + 10}deg)`;
                        break;
                }
                
                // Скрываем звезду в конце анимации
                setTimeout(() => {
                    shootingStar.style.opacity = '0';
                    
                    // Удаляем звезду после завершения
                    setTimeout(() => {
                        shootingStar.remove();
                    }, 1000);
                    
                }, duration * 1000 - 500);
                
            }, 100);
        }
        
        // Функция для остановки падающих звезд
        function stopShootingStars() {
            if (shootingStarTimer) {
                clearInterval(shootingStarTimer);
                shootingStarTimer = null;
            }
            
            const container = document.getElementById('shootingStarContainer');
            if (container) {
                container.innerHTML = '';
            }
        }
        
        // Функция для удаления звезд
        function removeStars() {
            const starsContainer = document.querySelector('.stars-container');
            if (starsContainer) {
                starsContainer.remove();
            }
        }

        // Анимация появления секций при скролле
        window.addEventListener('scroll', () => {
            document.querySelectorAll('.reveal-section').forEach(sec => {
                if (sec.getBoundingClientRect().top < window.innerHeight - 100) {
                    sec.classList.add('revealed');
                }
            });
        });

        // Обработка формы бронирования
        document.getElementById('booking-form').addEventListener('submit', e => {
            e.preventDefault();
            alert('Бронирование успешно отправлено! Мы свяжемся с вами в ближайшее время.');
        });

        // Плавная прокрутка к якорям
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({ 
                    behavior: 'smooth' 
                });
            });
        });
        
        // Обработка клика по кнопкам управления временем
        document.querySelectorAll('.time-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const timeOfDay = this.getAttribute('data-time');
                
                // Анимированный переход между временами суток
                document.body.style.transition = 'all 1s ease';
                document.querySelector('.celestial-container').style.transition = 'all 1s ease';
                document.querySelector('.iphone-notch').style.transition = 'background-color 1s ease';
                document.querySelector('.hero-btn').style.transition = 'background-color 1s ease';
                
                setTimeout(() => {
                    document.body.style.transition = 'all 1.5s ease-in-out';
                    document.querySelector('.celestial-container').style.transition = 'all 1.5s ease-in-out';
                    document.querySelector('.iphone-notch').style.transition = 'background-color 1.5s ease-in-out';
                    document.querySelector('.hero-btn').style.transition = 'background-color 1.5s ease-in-out';
                }, 1000);
                
                updateTimeOfDay(timeOfDay);
            });
        });
        
        // Управление мобильным меню
        document.getElementById('mobileMenuToggle').addEventListener('click', () => {
            document.getElementById('mobileMenu').classList.add('active');
        });
        
        document.getElementById('closeMenu').addEventListener('click', () => {
            document.getElementById('mobileMenu').classList.remove('active');
        });
        
        // Закрытие мобильного меню при клике на пункты меню
        document.querySelectorAll('#mobileMenu a').forEach(item => {
            item.addEventListener('click', () => {
                document.getElementById('mobileMenu').classList.remove('active');
            });
        });

        // Инициализация при загрузке
        document.addEventListener('DOMContentLoaded', () => {
            // Устанавливаем время суток
            updateTimeOfDay();
            
            // Обновляем каждую минуту
            setInterval(() => {
                if (autoTimeMode) {
                    updateTimeOfDay();
                }
            }, 60000);
            
            // Инициализация анимации для уже видимых секций
            document.querySelectorAll('.reveal-section').forEach(sec => {
                if (sec.getBoundingClientRect().top < window.innerHeight - 100) {
                    sec.classList.add('revealed');
                }
            });
        });
