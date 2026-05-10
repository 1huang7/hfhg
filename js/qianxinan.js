// 黔西南州页面交互功能
class QianxinanTourismApp {
    constructor() {
        this.currentTab = 'natural';
        this.init();
    }

    init() {
        this.bindEvents();
        this.initAnimations();
        this.initTabSwitching();
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

    // 景点卡片悬停效果
    handleAttractionHover(event) {
        const card = event.currentTarget;
        const image = card.querySelector('.attraction-image img');
        const badge = card.querySelector('.attraction-badge');
        
        image.style.transform = 'scale(1.05)';
        if (badge) {
            badge.style.boxShadow = '0 0 20px rgba(142, 68, 173, 0.6)';
        }
        card.style.boxShadow = '0 15px 40px rgba(142, 68, 173, 0.2)';
    }

    // 景点卡片离开效果
    handleAttractionLeave(event) {
        const card = event.currentTarget;
        const image = card.querySelector('.attraction-image img');
        const badge = card.querySelector('.attraction-badge');
        
        image.style.transform = '';
        if (badge) {
            badge.style.boxShadow = '';
        }
        card.style.boxShadow = '';
    }

    // 美食卡片悬停效果
    handleFoodHover(event) {
        const card = event.currentTarget;
        const image = card.querySelector('.food-image img');
        const tags = card.querySelectorAll('.food-tag');
        
        image.style.transform = 'scale(1.05)';
        tags.forEach((tag, index) => {
            setTimeout(() => {
                tag.style.transform = 'scale(1.1)';
                tag.style.boxShadow = '0 4px 15px rgba(230, 126, 34, 0.3)';
            }, index * 50);
        });
        card.style.boxShadow = '0 15px 40px rgba(230, 126, 34, 0.2)';
    }

    // 美食卡片离开效果
    handleFoodLeave(event) {
        const card = event.currentTarget;
        const image = card.querySelector('.food-image img');
        const tags = card.querySelectorAll('.food-tag');
        
        image.style.transform = '';
        tags.forEach(tag => {
            tag.style.transform = '';
            tag.style.boxShadow = '';
        });
        card.style.boxShadow = '';
    }

    // 交通路线悬停效果
    handleRouteHover(event) {
        const item = event.currentTarget;
        item.style.background = 'linear-gradient(135deg, #ecf0f1, #bdc3c7)';
        item.style.transform = 'translateX(10px)';
        item.style.boxShadow = '0 5px 20px rgba(142, 68, 173, 0.2)';
    }

    // 交通路线离开效果
    handleRouteLeave(event) {
        const item = event.currentTarget;
        item.style.background = '';
        item.style.transform = '';
        item.style.boxShadow = '';
    }

    // 初始化标签页切换
    initTabSwitching() {
        this.switchContent('natural');
    }

    // 初始化动画
    initAnimations() {
        this.animateOnLoad();
        this.initScrollAnimations();
    }

    // 页面加载动画
    animateOnLoad() {
        const title = document.querySelector('.region-title');
        if (title) {
            title.style.opacity = '0';
            title.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                title.style.transition = 'all 1s ease';
                title.style.opacity = '1';
                title.style.transform = 'translateY(0)';
            }, 200);
        }

        const tabButtons = document.querySelectorAll('.tab-button');
        tabButtons.forEach((button, index) => {
            button.style.opacity = '0';
            button.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                button.style.transition = 'all 0.6s ease';
                button.style.opacity = '1';
                button.style.transform = 'translateY(0)';
            }, 400 + index * 100);
        });
    }

    // 滚动动画
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        const animateElements = document.querySelectorAll('.attraction-card, .food-card, .transport-card');
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.8s ease';
            observer.observe(el);
        });
    }

    // 初始化滚动效果
    initScrollEffects() {
        const navigation = document.querySelector('.region-navigation');
        let lastScrollTop = 0;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                navigation.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
                navigation.style.background = 'rgba(255, 255, 255, 0.95)';
                navigation.style.backdropFilter = 'blur(10px)';
            } else {
                navigation.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                navigation.style.background = 'white';
                navigation.style.backdropFilter = 'none';
            }
            
            lastScrollTop = scrollTop;
        });
    }

    // 详细介绍切换方法
    toggleWanfenglinDetails() {
        this.toggleDetails('wanfenglinDetail');
    }

    toggleMalingheDetails() {
        this.toggleDetails('malingheDetail');
    }

    toggleShuangruDetails() {
        this.toggleDetails('shuangruDetail');
    }



    toggleNanmingDetails() {
        this.toggleDetails('nanmingDetail');
    }

    toggleErshisiDetails() {
        this.toggleDetails('ershisiDetail');
    }

    // 通用详细介绍切换方法
    toggleDetails(detailId) {
        const detailElement = document.getElementById(detailId);
        if (!detailElement) return;

        if (detailElement.style.display === 'none' || detailElement.style.display === '') {
            this.animateDetailExpand(detailElement);
        } else {
            this.animateDetailCollapse(detailElement);
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

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    const app = new QianxinanTourismApp();
    
    // 添加键盘快捷键支持
    document.addEventListener('keydown', (e) => {
        if (e.altKey) {
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    document.querySelector('[data-tab="natural"]').click();
                    break;
                case '2':
                    e.preventDefault();
                    document.querySelector('[data-tab="cultural"]').click();
                    break;
                case '3':
                    e.preventDefault();
                    document.querySelector('[data-tab="food"]').click();
                    break;
                case '4':
                    e.preventDefault();
                    document.querySelector('[data-tab="transport"]').click();
                    break;
            }
        }
    });

    // 控制台输出帮助信息
    console.log(`
    🏔️ 欢迎来到黔西南州！🏔️
    
    金州万峰林，奇石甲天下
    
    快捷键：
    - Alt+1: 自然景观
    - Alt+2: 人文风景  
    - Alt+3: 美食推荐
    - Alt+4: 交通出行
    
    主要景点：
    - 万峰林：八卦田景观，万峰成林
    - 马岭河峡谷：地球裂缝，瀑布群景观
    - 双乳峰：奇石地貌，酷似双乳
    
    体验奇石地貌，欣赏万峰林海！
    `);
    
    // 全局函数，供HTML中的onclick事件调用
    window.toggleWanfenglinDetails = () => app.toggleWanfenglinDetails();
    window.toggleMalingheDetails = () => app.toggleMalingheDetails();
    window.toggleShuangruDetails = () => app.toggleShuangruDetails();
    window.toggleNanmingDetails = () => app.toggleNanmingDetails();
    window.toggleErshisiDetails = () => app.toggleErshisiDetails();
});