/**
 * 黔灵山公园独立页面JavaScript库
 * QianlingShan Park Individual Page JavaScript Library
 * 
 * 功能特性：
 * - Tab切换系统
 * - 图片画廊模态框
 * - 滚动动画效果
 * - 响应式交互
 * - 视频播放器集成
 * - 平滑滚动导航
 */

class QianlingShanParkApp {
    constructor() {
        this.currentTab = 'overview';
        this.animationDuration = 600;
        this.init();
    }

    /**
     * 初始化应用
     */
    init() {
        this.initTabs();
        this.initScrollAnimations();
        this.initImageGallery();
        this.initVideoPlayer();
        this.initInteractiveElements();
        this.bindEvents();
        this.initAccessibility();
        
        // 页面加载完成后的初始化
        document.addEventListener('DOMContentLoaded', () => {
            this.onPageLoad();
        });
    }

    /**
     * 初始化Tab切换系统
     */
    initTabs() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.content-section');

        if (tabButtons.length === 0) return;

        // 为每个Tab按钮添加点击事件
        tabButtons.forEach((button, index) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetTab = button.getAttribute('data-tab');
                this.switchTab(targetTab);
            });

            // 添加键盘支持
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const targetTab = button.getAttribute('data-tab');
                    this.switchTab(targetTab);
                }
            });
        });

        // 设置默认活跃Tab
        this.switchTab(this.currentTab);
    }

    /**
     * 切换Tab内容
     * @param {string} targetTab - 目标Tab的ID
     */
    switchTab(targetTab) {
        // 更新Tab按钮状态
        const allTabButtons = document.querySelectorAll('.tab-button');
        const activeButton = document.querySelector(`[data-tab="${targetTab}"]`);

        allTabButtons.forEach(btn => btn.classList.remove('active'));
        if (activeButton) {
            activeButton.classList.add('active');
            activeButton.setAttribute('aria-selected', 'true');
        } else {
            allTabButtons.forEach(btn => btn.setAttribute('aria-selected', 'false'));
        }

        // 更新Tab内容显示
        const allTabContents = document.querySelectorAll('.content-section');
        allTabContents.forEach(content => {
            content.classList.remove('active');
            content.setAttribute('aria-hidden', 'true');
        });

        const targetContent = document.getElementById(targetTab);
        if (targetContent) {
            targetContent.classList.add('active');
            targetContent.setAttribute('aria-hidden', 'false');
            
            // 触发动画效果
            this.animateTabContent(targetContent);
            
            // 更新当前Tab
            this.currentTab = targetTab;
        }

        // 更新浏览器历史记录
        this.updateURLHash(targetTab);
    }

    /**
     * 为Tab内容添加动画效果
     * @param {HTMLElement} content - Tab内容元素
     */
    animateTabContent(content) {
        const animatedElements = content.querySelectorAll(
            '.highlight-item, .info-card, .food-item, .route-item, .tip-item'
        );

        animatedElements.forEach((element, index) => {
            // 重置初始状态
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = `all ${this.animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;

            // 延迟执行动画
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    /**
     * 初始化滚动动画
     */
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // 为子元素添加延迟动画
                    const children = entry.target.querySelectorAll(
                        '.info-card, .highlight-item, .food-item'
                    );
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animate-in');
                        }, index * 150);
                    });
                }
            });
        }, observerOptions);

        // 观察需要动画的元素
        const animateElements = document.querySelectorAll(
            '.attraction-overview, .highlights-container, .food-recommendations, .route-options, .tips-list'
        );

        animateElements.forEach(el => {
            observer.observe(el);
        });
    }

    /**
     * 初始化图片画廊功能
     */
    initImageGallery() {
        const images = document.querySelectorAll('.attraction-image img, .highlight-item img');
        
        images.forEach(img => {
            // 添加点击事件
            img.addEventListener('click', () => {
                this.openImageModal(img.src, img.alt);
            });

            // 添加悬停效果
            img.addEventListener('mouseenter', () => {
                img.style.transform = 'scale(1.05)';
                img.style.filter = 'brightness(1.1)';
            });

            img.addEventListener('mouseleave', () => {
                img.style.transform = 'scale(1)';
                img.style.filter = 'brightness(1)';
            });

            // 添加光标样式
            img.style.cursor = 'pointer';
        });
    }

    /**
     * 打开图片模态框
     * @param {string} src - 图片源地址
     * @param {string} alt - 图片alt文本
     */
    openImageModal(src, alt) {
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="this.parentElement.remove()">
                <div class="modal-content" onclick="event.stopPropagation()">
                    <button class="modal-close" aria-label="关闭图片" onclick="this.closest('.image-modal').remove()">
                        <i class="fas fa-times" aria-hidden="true"></i>
                    </button>
                    <div class="modal-image-container">
                        <img src="${src}" alt="${alt}" class="modal-image">
                    </div>
                    <div class="modal-info">
                        <h3>${alt}</h3>
                        <p>点击图片外区域或按ESC键关闭</p>
                    </div>
                </div>
            </div>
        `;

        // 添加到页面
        document.body.appendChild(modal);
        
        // 延迟显示动画
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);

        // 添加键盘事件监听
        this.bindModalEvents(modal);
    }

    /**
     * 绑定模态框事件
     * @param {HTMLElement} modal - 模态框元素
     */
    bindModalEvents(modal) {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                this.closeModal(modal);
                document.removeEventListener('keydown', handleEsc);
            }
        };

        const handleArrowKeys = (e) => {
            const images = Array.from(document.querySelectorAll('.attraction-image img, .highlight-item img'));
            const currentImg = modal.querySelector('.modal-image');
            const currentIndex = images.findIndex(img => img.src === currentImg.src);
            
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                this.updateModalImage(modal, images[currentIndex - 1]);
            } else if (e.key === 'ArrowRight' && currentIndex < images.length - 1) {
                this.updateModalImage(modal, images[currentIndex + 1]);
            }
        };

        document.addEventListener('keydown', handleEsc);
        document.addEventListener('keydown', handleArrowKeys);
    }

    /**
     * 更新模态框中的图片
     * @param {HTMLElement} modal - 模态框元素
     * @param {HTMLImageElement} img - 新图片元素
     */
    updateModalImage(modal, img) {
        const modalImage = modal.querySelector('.modal-image');
        const modalTitle = modal.querySelector('.modal-info h3');
        
        modalImage.style.opacity = '0';
        
        setTimeout(() => {
            modalImage.src = img.src;
            modalImage.alt = img.alt;
            modalTitle.textContent = img.alt;
            modalImage.style.opacity = '1';
        }, 150);
    }

    /**
     * 关闭模态框
     * @param {HTMLElement} modal - 模态框元素
     */
    closeModal(modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }

    /**
     * 初始化视频播放器
     */
    initVideoPlayer() {
        const videoElement = document.querySelector('video');
        if (!videoElement) return;

        // 如果有Video.js库，使用Video.js
        if (typeof videojs !== 'undefined') {
            this.initVideoJSPlayer(videoElement);
        } else {
            this.initNativeVideoPlayer(videoElement);
        }
    }

    /**
     * 初始化Video.js播放器
     * @param {HTMLVideoElement} videoElement - 视频元素
     */
    initVideoJSPlayer(videoElement) {
        try {
            this.player = videojs(videoElement, {
                controls: true,
                autoplay: false,
                preload: 'auto',
                fluid: true,
                responsive: true,
                playbackRates: [0.5, 1, 1.25, 1.5, 2],
                techOrder: ['html5'],
                html5: {
                    vhs: {
                        overrideNative: true
                    }
                }
            });

            // 播放器事件监听
            this.player.on('loadstart', () => {
                console.log('视频开始加载');
            });

            this.player.on('canplay', () => {
                console.log('视频可以播放');
            });

            this.player.on('error', (e) => {
                console.error('视频播放错误:', e);
                this.handleVideoError();
            });

        } catch (error) {
            console.warn('Video.js初始化失败，使用原生播放器:', error);
            this.initNativeVideoPlayer(videoElement);
        }
    }

    /**
     * 初始化原生视频播放器
     * @param {HTMLVideoElement} videoElement - 视频元素
     */
    initNativeVideoPlayer(videoElement) {
        // 添加错误处理
        videoElement.addEventListener('error', (e) => {
            console.error('原生视频播放错误:', e);
            this.handleVideoError();
        });

        // 添加加载完成事件
        videoElement.addEventListener('loadedmetadata', () => {
            console.log('视频元数据加载完成');
        });

        // 添加播放事件
        videoElement.addEventListener('play', () => {
            console.log('视频开始播放');
        });

        // 添加暂停事件
        videoElement.addEventListener('pause', () => {
            console.log('视频暂停');
        });
    }

    /**
     * 处理视频播放错误
     */
    handleVideoError() {
        const videoContainer = document.querySelector('.video-container') || 
                              document.querySelector('video')?.parentElement;
        if (videoContainer) {
            videoContainer.innerHTML = `
                <div class="video-error">
                    <div class="error-content">
                        <i class="fas fa-exclamation-triangle" aria-hidden="true"></i>
                        <h3>视频暂时无法播放</h3>
                        <p>请稍后重试或联系技术支持</p>
                        <button onclick="location.reload()" class="retry-btn">
                            <i class="fas fa-redo" aria-hidden="true"></i> 重新加载
                        </button>
                    </div>
                </div>
            `;
        }
    }

    /**
     * 初始化交互元素
     */
    initInteractiveElements() {
        // 路线项目点击效果
        const routeItems = document.querySelectorAll('.route-item');
        routeItems.forEach(item => {
            item.addEventListener('click', () => {
                this.highlightRouteSteps(item);
            });

            item.style.cursor = 'pointer';
            item.style.transition = 'all 0.3s ease';
        });

        // 提示项目展开/收起
        const tipItems = document.querySelectorAll('.tip-item');
        tipItems.forEach(item => {
            const title = item.querySelector('h4');
            if (title) {
                title.style.cursor = 'pointer';
                title.addEventListener('click', () => {
                    this.toggleTipItem(item);
                });
            }
        });

        // 美食项目悬停效果
        const foodItems = document.querySelectorAll('.food-item');
        foodItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-5px)';
                item.style.boxShadow = '0 8px 25px rgba(0, 123, 255, 0.15)';
            });

            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0)';
                item.style.boxShadow = 'none';
            });
        });
    }

    /**
     * 高亮路线步骤
     * @param {HTMLElement} routeItem - 路线项目元素
     */
    highlightRouteSteps(routeItem) {
        const text = routeItem.querySelector('p');
        if (!text) return;

        const originalText = text.textContent;
        const steps = originalText.split('→');
        
        // 创建步骤高亮效果
        const highlightedText = steps.map((step, index) => {
            return `<span class="route-step" data-step="${index + 1}">${step.trim()}</span>`;
        }).join('<span class="route-arrow">→</span>');

        text.innerHTML = highlightedText;

        // 添加动画效果
        const stepElements = routeItem.querySelectorAll('.route-step');
        stepElements.forEach((step, index) => {
            step.style.opacity = '0';
            step.style.transform = 'translateX(-10px)';
            
            setTimeout(() => {
                step.style.transition = 'all 0.3s ease';
                step.style.opacity = '1';
                step.style.transform = 'translateX(0)';
            }, index * 200);
        });

        // 3秒后恢复原始文本
        setTimeout(() => {
            text.textContent = originalText;
        }, 3000);
    }

    /**
     * 切换提示项目展开状态
     * @param {HTMLElement} item - 提示项目元素
     */
    toggleTipItem(item) {
        const content = item.querySelector('p') || item.querySelector('ul');
        if (!content) return;

        const isExpanded = content.style.maxHeight && content.style.maxHeight !== '0px';
        
        if (isExpanded) {
            content.style.maxHeight = '0px';
            content.style.opacity = '0';
            content.style.overflow = 'hidden';
            item.classList.remove('expanded');
        } else {
            content.style.maxHeight = content.scrollHeight + 'px';
            content.style.opacity = '1';
            content.style.overflow = 'visible';
            item.classList.add('expanded');
        }
    }

    /**
     * 绑定事件监听器
     */
    bindEvents() {
        // 页面滚动事件（防抖）
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.handleScroll();
            }, 16); // 约60fps
        });

        // 窗口大小改变事件
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // 页面可见性变化事件
        document.addEventListener('visibilitychange', () => {
            this.handleVisibilityChange();
        });
    }

    /**
     * 处理页面滚动
     */
    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 导航栏滚动效果
        const header = document.querySelector('.region-header');
        if (header) {
            if (scrollTop > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // 视差效果（如果有的话）
        const parallaxElements = document.querySelectorAll('.parallax');
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.dataset.speed) || 0.5;
            const yPos = -(scrollTop * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    /**
     * 处理窗口大小改变
     */
    handleResize() {
        // 重新初始化模态框大小
        const modal = document.querySelector('.image-modal');
        if (modal) {
            const modalContent = modal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.style.maxHeight = window.innerHeight * 0.9 + 'px';
            }
        }

        // 重新计算展开的tip项目高度
        const expandedTips = document.querySelectorAll('.tip-item.expanded');
        expandedTips.forEach(item => {
            const content = item.querySelector('p') || item.querySelector('ul');
            if (content) {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    }

    /**
     * 处理页面可见性变化
     */
    handleVisibilityChange() {
        if (document.hidden) {
            // 页面不可见时暂停视频
            if (this.player && typeof this.player.pause === 'function' && !this.player.paused()) {
                this.player.pause();
            }
        }
    }

    /**
     * 更新URL哈希
     * @param {string} tab - Tab名称
     */
    updateURLHash(tab) {
        if (history.pushState) {
            history.pushState(null, null, `#${tab}`);
        } else {
            location.hash = `#${tab}`;
        }
    }

    /**
     * 初始化无障碍功能
     */
    initAccessibility() {
        // 为Tab按钮添加ARIA属性
        const tabButtons = document.querySelectorAll('.tab-button');
        tabButtons.forEach((button, index) => {
            button.setAttribute('role', 'tab');
            button.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
            button.setAttribute('tabindex', index === 0 ? '0' : '-1');
        });

        // 为Tab内容添加ARIA属性
        const tabContents = document.querySelectorAll('.content-section');
        tabContents.forEach((content, index) => {
            content.setAttribute('role', 'tabpanel');
            content.setAttribute('aria-hidden', index === 0 ? 'false' : 'true');
        });
    }

    /**
     * 页面加载完成后的处理
     */
    onPageLoad() {
        // 检查URL哈希并切换到对应Tab
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            this.switchTab(hash);
        }

        // 添加加载完成的CSS类
        document.body.classList.add('loaded');

        // 触发一次滚动事件以设置初始状态
        this.handleScroll();
    }

    /**
     * 销毁实例
     */
    destroy() {
        // 清理Video.js播放器
        if (this.player && typeof this.player.dispose === 'function') {
            this.player.dispose();
        }

        // 清理事件监听器
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);

        // 清理模态框
        const modals = document.querySelectorAll('.image-modal');
        modals.forEach(modal => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        });
    }
}

// 自动初始化
document.addEventListener('DOMContentLoaded', () => {
    window.qianlingShanParkApp = new QianlingShanParkApp();
});

// 页面卸载时清理资源
window.addEventListener('beforeunload', () => {
    if (window.qianlingShanParkApp) {
        window.qianlingShanParkApp.destroy();
    }
});

// 导出类供外部使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QianlingShanParkApp;
}