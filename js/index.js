// 贵州旅游网站首页交互功能
class GuizhouTourismApp {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.initAnimations();
        this.initSmoothScroll();
        this.initParallax();
    }

    // 绑定事件监听器
    bindEvents() {
        // 地州卡片点击事件
        const regionCards = document.querySelectorAll('.region-card');
        regionCards.forEach(card => {
            card.addEventListener('click', this.handleRegionClick.bind(this));
            card.addEventListener('mouseenter', this.handleCardHover.bind(this));
            card.addEventListener('mouseleave', this.handleCardLeave.bind(this));
        });

        // 导航分类点击事件（已移除）
        // const navItems = document.querySelectorAll('.nav-item');
        // navItems.forEach(item => {
        //     item.addEventListener('click', this.handleCategoryClick.bind(this));
        // });

        // 页脚链接点击事件
        const footerLinks = document.querySelectorAll('.footer-section a');
        footerLinks.forEach(link => {
            link.addEventListener('click', this.handleFooterClick.bind(this));
        });
    }

    // 地州卡片点击处理
    handleRegionClick(event) {
        const card = event.currentTarget;
        const region = card.getAttribute('data-region');
        
        // 添加点击动画效果
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);

        // 跳转到对应地州页面
        setTimeout(() => {
            window.location.href = `${region}.html`;
        }, 200);
    }

    // 卡片悬停效果
    handleCardHover(event) {
        const card = event.currentTarget;
        const overlay = card.querySelector('.region-overlay');
        
        // 添加悬停时的发光效果
        card.style.boxShadow = '0 20px 50px rgba(102, 126, 234, 0.3)';
        
        // 标签动画
        const tags = overlay.querySelectorAll('.tag');
        tags.forEach((tag, index) => {
            setTimeout(() => {
                tag.style.transform = 'scale(1.05)';
                tag.style.background = 'rgba(255, 255, 255, 0.3)';
            }, index * 100);
        });
    }

    // 卡片离开效果
    handleCardLeave(event) {
        const card = event.currentTarget;
        const overlay = card.querySelector('.region-overlay');
        
        // 恢复原始状态
        card.style.boxShadow = '';
        
        const tags = overlay.querySelectorAll('.tag');
        tags.forEach(tag => {
            tag.style.transform = '';
            tag.style.background = 'rgba(255, 255, 255, 0.2)';
        });
    }

    // 分类导航点击处理
    handleCategoryClick(event) {
        event.preventDefault();
        const category = event.currentTarget.getAttribute('data-category');
        
        // 导航项动画效果
        const navItem = event.currentTarget;
        navItem.style.transform = 'scale(0.95)';
        setTimeout(() => {
            navItem.style.transform = '';
        }, 150);

        // 根据分类筛选地州卡片
        this.filterRegionsByCategory(category);
    }

    // 根据分类筛选地州
    filterRegionsByCategory(category) {
        const regionCards = document.querySelectorAll('.region-card');
        
        regionCards.forEach((card, index) => {
            const tags = card.querySelectorAll('.tag');
            const hasCategory = Array.from(tags).some(tag => 
                tag.textContent.includes(this.getCategoryName(category))
            );

            if (hasCategory) {
                // 显示匹配的卡片
                card.style.display = 'block';
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.transition = 'all 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            } else {
                // 隐藏不匹配的卡片
                card.style.transition = 'all 0.3s ease';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    // 获取分类中文名称
    getCategoryName(category) {
        const categoryMap = {
            'natural': '自然景观',
            'cultural': '人文风景',
            'food': '美食推荐',
            'transport': '交通出行'
        };
        return categoryMap[category] || '';
    }

    // 页脚链接点击处理
    handleFooterClick(event) {
        const href = event.currentTarget.getAttribute('href');
        
        if (href.startsWith('#')) {
            event.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
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
        const cards = document.querySelectorAll('.region-card');
        
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);
        });

        // 标题字符动画
        const titleChars = document.querySelectorAll('.title-char');
        titleChars.forEach((char, index) => {
            char.style.opacity = '0';
            char.style.transform = 'translateY(50px) rotate(10deg)';
            
            setTimeout(() => {
                char.style.transition = 'all 0.8s ease';
                char.style.opacity = '1';
                char.style.transform = 'translateY(0) rotate(0deg)';
            }, 500 + index * 200);
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
                    entry.target.classList.add('loading');
                }
            });
        }, observerOptions);

        // 观察所有需要动画的元素
        const animateElements = document.querySelectorAll('.region-card, .section-title');
        animateElements.forEach(el => observer.observe(el));
    }

    // 初始化平滑滚动
    initSmoothScroll() {
        // 为所有内部链接添加平滑滚动
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // 初始化视差效果
    initParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const header = document.querySelector('.header');
            
            if (header) {
                const rate = scrolled * -0.5;
                header.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    // 添加动态背景效果
    addDynamicBackground() {
        const header = document.querySelector('.header');
        if (!header) return;

        // 创建浮动粒子效果
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
                pointer-events: none;
            `;
            header.appendChild(particle);
        }

        // 添加浮动动画CSS
        if (!document.querySelector('#particle-styles')) {
            const style = document.createElement('style');
            style.id = 'particle-styles';
            style.textContent = `
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px) translateX(0px);
                        opacity: 0.6;
                    }
                    50% {
                        transform: translateY(-20px) translateX(10px);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // 工具函数：防抖
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // 工具函数：节流
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
}

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    const app = new GuizhouTourismApp();
    
    // 添加动态背景效果
    app.addDynamicBackground();
    
    // 添加键盘导航支持
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // 重置所有筛选，显示所有地州
            const regionCards = document.querySelectorAll('.region-card');
            regionCards.forEach((card, index) => {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 50);
            });
        }
    });

    // 添加触摸设备支持
    if ('ontouchstart' in window) {
        const cards = document.querySelectorAll('.region-card');
        cards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
    }

    // 控制台输出欢迎信息
    console.log(`
    🌟 欢迎来到夜郎古国，美酒之乡！🌟
    
    走遍大地神州，醉美多彩贵州！
    
    快捷键：
    - ESC: 重置筛选显示所有地州
    - 点击地州卡片: 跳转详情页
    
    享受您的贵州之旅！
    `);
});