// 六盘水市页面交互功能
class LiupanshuiTourismApp {
    constructor() {
        this.currentTab = 'natural';
        this.init();
    }

    init() {
        this.bindEvents();
        this.initAnimations();
        this.initScrollEffects();
    }

    // 绑定事件监听器
    bindEvents() {
        // 标签页切换事件
        const tabButtons = document.querySelectorAll('.tab-button');
        tabButtons.forEach(button => {
            button.addEventListener('click', this.handleTabClick.bind(this));
        });

        // 景点卡片悬停效果
        const attractionCards = document.querySelectorAll('.attraction-card');
        attractionCards.forEach(card => {
            card.addEventListener('mouseenter', this.handleAttractionHover.bind(this));
            card.addEventListener('mouseleave', this.handleAttractionLeave.bind(this));
        });

        // 美食卡片悬停效果
        const foodCards = document.querySelectorAll('.food-card');
        foodCards.forEach(card => {
            card.addEventListener('mouseenter', this.handleFoodHover.bind(this));
            card.addEventListener('mouseleave', this.handleFoodLeave.bind(this));
        });

        // 交通路线悬停效果
        const routeItems = document.querySelectorAll('.route-item');
        routeItems.forEach(item => {
            item.addEventListener('mouseenter', this.handleRouteHover.bind(this));
            item.addEventListener('mouseleave', this.handleRouteLeave.bind(this));
        });

        // 添加键盘导航支持
        document.addEventListener('keydown', this.handleKeyDown.bind(this));

        // 添加触摸设备支持
        if ('ontouchstart' in window) {
            this.initTouchSupport();
        }
    }

    // 标签页切换处理
    handleTabClick(event) {
        const tabButton = event.currentTarget;
        const targetTab = tabButton.getAttribute('data-tab');
        
        this.updateActiveTab(tabButton);
        this.switchContent(targetTab);
        this.animateTabClick(tabButton);
    }

    // 更新活动标签
    updateActiveTab(activeButton) {
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        activeButton.classList.add('active');
    }

    // 切换内容区域
    switchContent(targetTab) {
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        
        const targetSection = document.getElementById(targetTab);
        if (targetSection) {
            targetSection.classList.add('active');
            this.animateContentSwitch(targetSection);
        }
        
        this.currentTab = targetTab;
    }

    // 标签点击动画
    animateTabClick(button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }

    // 内容切换动画
    animateContentSwitch(section) {
        const cards = section.querySelectorAll('.attraction-card, .food-card, .transport-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // 景点卡片悬停处理
    handleAttractionHover(event) {
        const card = event.currentTarget;
        const image = card.querySelector('.attraction-image');
        
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
        
        if (image) {
            image.style.transform = 'scale(1.05)';
        }
    }

    handleAttractionLeave(event) {
        const card = event.currentTarget;
        const image = card.querySelector('.attraction-image');
        
        card.style.transform = '';
        card.style.boxShadow = '';
        
        if (image) {
            image.style.transform = '';
        }
    }

    // 美食卡片悬停处理
    handleFoodHover(event) {
        const card = event.currentTarget;
        const image = card.querySelector('.food-image');
        
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
        
        if (image) {
            image.style.transform = 'scale(1.05)';
        }
    }

    handleFoodLeave(event) {
        const card = event.currentTarget;
        const image = card.querySelector('.food-image');
        
        card.style.transform = '';
        card.style.boxShadow = '';
        
        if (image) {
            image.style.transform = '';
        }
    }

    // 交通路线悬停处理
    handleRouteHover(event) {
        const routeItem = event.currentTarget;
        routeItem.style.backgroundColor = 'var(--light-bg)';
        routeItem.style.transform = 'translateX(5px)';
    }

    handleRouteLeave(event) {
        const routeItem = event.currentTarget;
        routeItem.style.backgroundColor = '';
        routeItem.style.transform = '';
    }

    // 键盘导航支持
    handleKeyDown(event) {
        const tabs = ['natural', 'cultural', 'food', 'transport'];
        const currentIndex = tabs.indexOf(this.currentTab);
        
        // 左右箭头键切换标签
        if (event.key === 'ArrowRight' && currentIndex < tabs.length - 1) {
            const nextTab = document.querySelector(`.tab-button[data-tab="${tabs[currentIndex + 1]}"]`);
            if (nextTab) nextTab.click();
        } else if (event.key === 'ArrowLeft' && currentIndex > 0) {
            const prevTab = document.querySelector(`.tab-button[data-tab="${tabs[currentIndex - 1]}"]`);
            if (prevTab) prevTab.click();
        }
    }

    // 触摸设备支持
    initTouchSupport() {
        // 为标签添加触摸事件
        const tabButtons = document.querySelectorAll('.tab-button');
        tabButtons.forEach(button => {
            button.addEventListener('touchstart', this.handleTabClick.bind(this));
        });

        // 为卡片添加触摸效果
        const cards = document.querySelectorAll('.attraction-card, .food-card, .transport-card');
        cards.forEach(card => {
            card.addEventListener('touchstart', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
            });
            
            card.addEventListener('touchend', () => {
                setTimeout(() => {
                    card.style.transform = '';
                    card.style.boxShadow = '';
                }, 300);
            });
        });
    }

    // 初始化滚动效果
    initScrollEffects() {
        // 导航栏滚动效果
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.region-header');
            if (header) {
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }
        });

        // 元素进入视口动画
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // 观察所有卡片元素
        const cardsToObserve = document.querySelectorAll('.attraction-card, .food-card, .transport-card');
        cardsToObserve.forEach(card => {
            observer.observe(card);
        });
    }

    // 初始化动画
    initAnimations() {
        // 页面加载时显示第一个标签页的动画
        const firstTabContent = document.querySelector('.content-section.active');
        if (firstTabContent) {
            const cards = firstTabContent.querySelectorAll('.attraction-card, .food-card, .transport-card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    card.style.transition = 'all 0.6s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    }

    // 详细介绍切换方法
    toggleWumengDetails() {
        this.toggleDetails('wumengDetail', 'wumengButton');
    }

    toggleMeihuashanDetails() {
        this.toggleDetails('meihuashanDetail', 'meihuashanButton');
    }

    toggleShuichengDetails() {
        this.toggleDetails('shuichengDetail', 'shuichengButton');
    }

    toggleTuoleDetails() {
        this.toggleDetails('tuoleDetail', 'tuoleButton');
    }

    // 通用详细介绍切换方法
    toggleDetails(detailId, buttonId) {
        const detailElement = document.getElementById(detailId);
        const buttonElement = document.getElementById(buttonId);
        if (!detailElement || !buttonElement) return;

        if (detailElement.style.display === 'none' || detailElement.style.display === '') {
            this.animateDetailExpand(detailElement);
            // 切换按钮为"收起详情"
            buttonElement.innerHTML = '<i class="fas fa-times"></i> 收起详情';
            buttonElement.classList.remove('detail-btn');
            buttonElement.classList.add('close-detail-btn');
        } else {
            this.animateDetailCollapse(detailElement);
            // 切换按钮为"查看详细介绍"
            setTimeout(() => {
                buttonElement.innerHTML = '<i class="fas fa-info-circle"></i> 查看详细介绍';
                buttonElement.classList.remove('close-detail-btn');
                buttonElement.classList.add('detail-btn');
            }, 500);
        }
    }

    // 展开详细介绍动画
    animateDetailExpand(element) {
        element.style.display = 'block';
        element.style.opacity = '0';
        element.style.maxHeight = '0';
        element.style.overflow = 'hidden';
        element.style.transition = 'all 0.5s ease';

        setTimeout(() => {
            element.style.opacity = '1';
            element.style.maxHeight = element.scrollHeight + 'px';
        }, 10);
    }

    // 收起详细介绍动画
    animateDetailCollapse(element) {
        element.style.opacity = '0';
        element.style.maxHeight = '0';

        setTimeout(() => {
            element.style.display = 'none';
        }, 500);
    }
}

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    const liupanshuiApp = new LiupanshuiTourismApp();
    
    // 平滑滚动到顶部功能
    const backToTopButton = document.querySelector('a[href="#top"]');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // 全局函数，供HTML中的onclick事件调用
    window.toggleWumengDetails = () => liupanshuiApp.toggleWumengDetails();
    window.toggleMeihuashanDetails = () => liupanshuiApp.toggleMeihuashanDetails();
    window.toggleShuichengDetails = () => liupanshuiApp.toggleShuichengDetails();
    window.toggleTuoleDetails = () => liupanshuiApp.toggleTuoleDetails();
});