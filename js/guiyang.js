// 贵阳市页面交互功能
class GuiyangTourismApp {
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
        
        // 更新活动标签
        this.updateActiveTab(tabButton);
        
        // 切换内容区域
        this.switchContent(targetTab);
        
        // 播放点击动画
        this.animateTabClick(tabButton);
    }

    // 更新活动标签
    updateActiveTab(activeButton) {
        // 移除所有活动状态
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // 添加活动状态到当前按钮
        activeButton.classList.add('active');
    }

    // 切换内容区域
    switchContent(targetTab) {
        // 隐藏所有内容区域
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // 显示目标内容区域
        const targetSection = document.getElementById(targetTab);
        if (targetSection) {
            targetSection.classList.add('active');
            
            // 播放切换动画
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
        
        // 图片放大效果
        image.style.transform = 'scale(1.05)';
        
        // 徽章发光效果
        if (badge) {
            badge.style.boxShadow = '0 0 20px rgba(243, 156, 18, 0.6)';
        }
        
        // 卡片阴影效果
        card.style.boxShadow = '0 15px 40px rgba(52, 152, 219, 0.2)';
    }

    // 景点卡片离开效果
    handleAttractionLeave(event) {
        const card = event.currentTarget;
        const image = card.querySelector('.attraction-image img');
        const badge = card.querySelector('.attraction-badge');
        
        // 恢复原始状态
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
        
        // 图片放大
        image.style.transform = 'scale(1.05)';
        
        // 标签动画效果
        tags.forEach((tag, index) => {
            setTimeout(() => {
                tag.style.transform = 'scale(1.1)';
                tag.style.boxShadow = '0 4px 15px rgba(231, 76, 60, 0.3)';
            }, index * 50);
        });
        
        // 卡片阴影
        card.style.boxShadow = '0 15px 40px rgba(231, 76, 60, 0.2)';
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
        
        // 路线项目高亮
        item.style.background = 'linear-gradient(135deg, #ecf0f1, #bdc3c7)';
        item.style.transform = 'translateX(10px)';
        item.style.boxShadow = '0 5px 20px rgba(52, 152, 219, 0.2)';
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
        // 默认显示自然景观
        this.switchContent('natural');
    }

    // 初始化动画
    initAnimations() {
        // 页面加载动画
        this.animateOnLoad();
        
        // 滚动动画
        this.initScrollAnimations();
    }

    // 页面加载动画
    animateOnLoad() {
        // 标题动画
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

        // 标签按钮动画
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

        // 观察所有卡片元素
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
        // 导航栏滚动效果
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

    // 工具方法：显示提示信息
    showTip(message, type = 'info') {
        const tip = document.createElement('div');
        tip.className = `tip tip-${type}`;
        tip.textContent = message;
        tip.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'info' ? '#3498db' : type === 'success' ? '#27ae60' : '#e74c3c'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(tip);
        
        // 显示动画
        setTimeout(() => {
            tip.style.opacity = '1';
            tip.style.transform = 'translateX(0)';
        }, 100);
        
        // 自动隐藏
        setTimeout(() => {
            tip.style.opacity = '0';
            tip.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(tip);
            }, 300);
        }, 3000);
    }

    // 工具方法：筛选功能
    filterContent(keyword, category) {
        const cards = document.querySelectorAll(`#${category} .attraction-card, #${category} .food-card`);
        
        cards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('.attraction-description, .food-description')?.textContent.toLowerCase() || '';
            
            if (title.includes(keyword.toLowerCase()) || description.includes(keyword.toLowerCase())) {
                card.style.display = 'block';
                card.style.opacity = '1';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // 切换黔灵山公园详细介绍
    toggleQianlingDetails() {
        const detail = document.getElementById('qianling-detail');
        const btn = document.querySelector('[onclick="toggleQianlingDetails()"]');
        
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

    // 切换花溪公园详细介绍
    toggleHuaxiDetails() {
        const detail = document.getElementById('huaxi-detail');
        const btn = document.querySelector('[onclick="toggleHuaxiDetails()"]');
        
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

    // 切换青岩古镇详细介绍
    toggleQingyanDetails() {
        const detail = document.getElementById('qingyan-detail');
        const btn = document.querySelector('[onclick="toggleQingyanDetails()"]');
        
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

    // 切换甲秀楼详细介绍
    toggleJiaxiuDetails() {
        const detail = document.getElementById('jiaxiu-detail');
        const btn = document.querySelector('[onclick="toggleJiaxiuDetails()"]');
        
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
function toggleQianlingDetails() {
    if (window.guiyangApp) {
        window.guiyangApp.toggleQianlingDetails();
    }
}

// 全局函数，供HTML中的onclick调用
function toggleHuaxiDetails() {
    if (window.guiyangApp) {
        window.guiyangApp.toggleHuaxiDetails();
    }
}

// 全局函数，供HTML中的onclick调用
function toggleQingyanDetails() {
    if (window.guiyangApp) {
        window.guiyangApp.toggleQingyanDetails();
    }
}

// 全局函数，供HTML中的onclick调用
function toggleJiaxiuDetails() {
    if (window.guiyangApp) {
        window.guiyangApp.toggleJiaxiuDetails();
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    window.guiyangApp = new GuiyangTourismApp();
    
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

    // 添加触摸设备支持
    if ('ontouchstart' in window) {
        const cards = document.querySelectorAll('.attraction-card, .food-card');
        cards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
    }

    // 控制台输出帮助信息
    console.log(`
    🏔️ 欢迎来到贵阳市！🏔️
    
    林城贵阳，避暑胜地
    
    快捷键：
    - Alt+1: 自然景观
    - Alt+2: 人文风景  
    - Alt+3: 美食推荐
    - Alt+4: 交通出行
    
    主要景点：
    - 黔灵山公园：城市喀斯特森林公园
    - 青岩古镇：明清军事屯堡
    - 丝娃娃：贵阳特色小吃
    
    祝您在贵阳玩得愉快！
    `);
});