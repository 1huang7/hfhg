// 安顺市页面交互功能
class AnshunTourismApp {
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
            badge.style.boxShadow = '0 0 20px rgba(46, 204, 113, 0.6)';
        }
        card.style.boxShadow = '0 15px 40px rgba(46, 204, 113, 0.2)';
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
                tag.style.boxShadow = '0 4px 15px rgba(155, 89, 182, 0.3)';
            }, index * 50);
        });
        card.style.boxShadow = '0 15px 40px rgba(155, 89, 182, 0.2)';
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
        item.style.boxShadow = '0 5px 20px rgba(46, 204, 113, 0.2)';
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

    // 切换黄果树瀑布详细介绍
    toggleHuangguoshuDetails() {
        const detail = document.getElementById('huangguoshu-detail');
        const btn = document.querySelector('[onclick="toggleHuangguoshuDetails()"]');
        
        if (detail.style.display === 'none' || !detail.style.display) {
            // 显示详情
            detail.style.display = 'block';
            btn.innerHTML = '<i class="fas fa-times"></i>收起详情';
            btn.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
            
            // 滚动到详情区域
            setTimeout(() => {
                detail.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }, 100);
            
            // 播放展开动画
            this.animateDetailExpand(detail);
            
        } else {
            // 隐藏详情
            this.animateDetailCollapse(detail);
            
            setTimeout(() => {
                detail.style.display = 'none';
                btn.innerHTML = '<i class="fas fa-info-circle"></i>查看详细介绍';
                btn.style.background = 'linear-gradient(135deg, #3498db, #2980b9)';
            }, 300);
        }
    }

    // 切换龙宫景区详细介绍
    toggleLonggongDetails() {
        const detail = document.getElementById('longgong-detail');
        const btn = document.querySelector('[onclick="toggleLonggongDetails()"]');
        
        if (detail.style.display === 'none' || !detail.style.display) {
            // 显示详情
            detail.style.display = 'block';
            btn.innerHTML = '<i class="fas fa-times"></i>收起详情';
            btn.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
            
            // 滚动到详情区域
            setTimeout(() => {
                detail.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }, 100);
            
            // 播放展开动画
            this.animateDetailExpand(detail);
            
        } else {
            // 隐藏详情
            this.animateDetailCollapse(detail);
            
            setTimeout(() => {
                detail.style.display = 'none';
                btn.innerHTML = '<i class="fas fa-info-circle"></i>查看详细介绍';
                btn.style.background = 'linear-gradient(135deg, #3498db, #2980b9)';
            }, 300);
        }
    }

    // 切换天龙屯堡详细介绍
    toggleTianlongDetails() {
        const detail = document.getElementById('tianlong-detail');
        const btn = document.querySelector('[onclick="toggleTianlongDetails()"]');
        
        if (detail.style.display === 'none' || !detail.style.display) {
            // 显示详情
            detail.style.display = 'block';
            btn.innerHTML = '<i class="fas fa-times"></i>收起详情';
            btn.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
            
            // 滚动到详情区域
            setTimeout(() => {
                detail.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }, 100);
            
            // 播放展开动画
            this.animateDetailExpand(detail);
            
        } else {
            // 隐藏详情
            this.animateDetailCollapse(detail);
            
            setTimeout(() => {
                detail.style.display = 'none';
                btn.innerHTML = '<i class="fas fa-info-circle"></i>查看详细介绍';
                btn.style.background = 'linear-gradient(135deg, #3498db, #2980b9)';
            }, 300);
        }
    }

    // 切换贵州省桥梁科普教育博物馆详细介绍
    toggleBridgeMuseumDetails() {
        const detail = document.getElementById('bridge-museum-detail');
        const btn = document.querySelector('[onclick="toggleBridgeMuseumDetails()"]');
        
        if (detail.style.display === 'none' || !detail.style.display) {
            // 显示详情
            detail.style.display = 'block';
            btn.innerHTML = '<i class="fas fa-times"></i>收起详情';
            btn.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
            
            // 滚动到详情区域
            setTimeout(() => {
                detail.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }, 100);
            
            // 播放展开动画
            this.animateDetailExpand(detail);
            
        } else {
            // 隐藏详情
            this.animateDetailCollapse(detail);
            
            setTimeout(() => {
                detail.style.display = 'none';
                btn.innerHTML = '<i class="fas fa-info-circle"></i>查看详细介绍';
                btn.style.background = 'linear-gradient(135deg, #3498db, #2980b9)';
            }, 300);
        }
    }

    // 详情展开动画
    animateDetailExpand(detail) {
        detail.style.opacity = '0';
        detail.style.transform = 'translateY(-20px) scale(0.95)';
        
        setTimeout(() => {
            detail.style.transition = 'all 0.4s ease-out';
            detail.style.opacity = '1';
            detail.style.transform = 'translateY(0) scale(1)';
        }, 50);
    }

    // 详情收起动画
    animateDetailCollapse(detail) {
        detail.style.transition = 'all 0.3s ease-in';
        detail.style.opacity = '0';
        detail.style.transform = 'translateY(-20px) scale(0.95)';
    }
}

// 全局函数，供HTML中的onclick调用
function toggleHuangguoshuDetails() {
    if (window.anshunApp) {
        window.anshunApp.toggleHuangguoshuDetails();
    }
}

// 全局函数，供HTML中的onclick调用
function toggleLonggongDetails() {
    if (window.anshunApp) {
        window.anshunApp.toggleLonggongDetails();
    }
}

// 全局函数，供HTML中的onclick调用
function toggleTianlongDetails() {
    if (window.anshunApp) {
        window.anshunApp.toggleTianlongDetails();
    }
}

// 全局函数，供HTML中的onclick调用
function toggleBridgeMuseumDetails() {
    if (window.anshunApp) {
        window.anshunApp.toggleBridgeMuseumDetails();
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    window.anshunApp = new AnshunTourismApp();
    
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
    🌊 欢迎来到安顺市！🌊
    
    瀑乡安顺，溶洞奇观
    
    快捷键：
    - Alt+1: 自然景观
    - Alt+2: 人文风景  
    - Alt+3: 美食推荐
    - Alt+4: 交通出行
    
    主要景点：
    - 黄果树瀑布：亚洲最大瀑布
    - 龙宫景区：喀斯特水溶洞
    - 天龙屯堡：明代军屯文化
    
    美食推荐：
    - 安顺裹卷：酸辣爽口
    - 夺夺粉：市井烟火味
    
    祝您在安顺玩得愉快！
    `);
});