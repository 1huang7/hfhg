// 花溪公园景点页面交互脚本
(function() {
    'use strict';

    // DOM元素
    const heroVideo = document.getElementById('heroVideo');
    const videoControl = document.getElementById('videoControl');
    const nav = document.querySelector('.attraction-nav');
    const galleryMain = document.querySelector('.gallery-main');
    const galleryThumbnails = document.querySelectorAll('.gallery-thumbnails img');

    // 视频播放控制
    if (heroVideo && videoControl) {
        // 视频播放/暂停控制
        videoControl.addEventListener('click', function() {
            if (heroVideo.paused) {
                heroVideo.play();
                videoControl.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                heroVideo.pause();
                videoControl.innerHTML = '<i class="fas fa-play"></i>';
            }
        });

        // 视频加载完成后显示控制按钮
        heroVideo.addEventListener('loadeddata', function() {
            videoControl.style.opacity = '1';
        });

        // 视频错误处理
        heroVideo.addEventListener('error', function() {
            console.warn('视频加载失败，显示静态背景');
            heroVideo.style.display = 'none';
            const overlay = document.querySelector('.video-overlay');
            if (overlay) {
                overlay.style.background = 'linear-gradient(135deg, rgba(44, 85, 48, 0.8), rgba(74, 124, 89, 0.8))';
            }
        });
    }

    // 导航栏滚动效果
    if (nav) {
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                nav.style.background = 'rgba(255, 255, 255, 0.98)';
                nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                nav.style.background = 'rgba(255, 255, 255, 0.95)';
                nav.style.boxShadow = 'none';
            }

            // 滚动方向检测
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                nav.style.transform = 'translateY(-100%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
    }

    // 图片画廊切换功能
    if (galleryMain && galleryThumbnails.length > 0) {
        galleryThumbnails.forEach(function(thumbnail, index) {
            thumbnail.addEventListener('click', function() {
                // 更新主图
                galleryMain.src = this.src;
                galleryMain.alt = this.alt;
                
                // 更新缩略图激活状态
                galleryThumbnails.forEach(function(img) {
                    img.classList.remove('active');
                });
                this.classList.add('active');
                
                // 添加切换动画
                galleryMain.style.opacity = '0.5';
                setTimeout(function() {
                    galleryMain.style.opacity = '1';
                }, 150);
            });
        });

        // 默认激活第一张图
        if (galleryThumbnails[0]) {
            galleryThumbnails[0].classList.add('active');
        }
    }

    // 景点亮点悬停效果
    const highlightItems = document.querySelectorAll('.highlight-item');
    highlightItems.forEach(function(item) {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 美食卡片悬停效果
    const foodItems = document.querySelectorAll('.food-item');
    foodItems.forEach(function(item) {
        item.addEventListener('mouseenter', function() {
            const img = this.querySelector('.food-image img');
            if (img) {
                img.style.transform = 'scale(1.1)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const img = this.querySelector('.food-image img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });

    // 交通指南项交互
    const transportItems = document.querySelectorAll('.transport-item');
    transportItems.forEach(function(item) {
        item.addEventListener('click', function() {
            // 移除其他项的激活状态
            transportItems.forEach(function(transport) {
                transport.classList.remove('active');
            });
            
            // 激活当前项
            this.classList.add('active');
            
            // 添加点击反馈动画
            this.style.transform = 'scale(0.98)';
            setTimeout(function() {
                item.style.transform = 'translateY(-5px) scale(1)';
            }, 150);
        });
    });

    // 相关景点卡片交互
    const relatedCards = document.querySelectorAll('.related-card');
    relatedCards.forEach(function(card) {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 添加点击动画
            this.style.transform = 'scale(0.95)';
            setTimeout(function() {
                card.style.transform = 'scale(1)';
                // 延迟跳转，提供视觉反馈
                setTimeout(function() {
                    window.location.href = card.href;
                }, 200);
            }, 100);
        });
    });

    // 平滑滚动到指定区域
    function smoothScrollTo(element, offset = 0) {
        if (element) {
            const targetPosition = element.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    // 页面加载完成后的初始化
    function init() {
        // 初始化AOS动画（如果存在）
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                offset: 100
            });
        }

        // 添加页面加载动画
        document.body.style.opacity = '0';
        document.body.style.transform = 'translateY(20px)';
        
        setTimeout(function() {
            document.body.style.transition = 'all 0.6s ease';
            document.body.style.opacity = '1';
            document.body.style.transform = 'translateY(0)';
        }, 100);

        // 预加载关键图片
        const criticalImages = [
            '../images/huaxi/overview.jpg',
            '../images/huaxi/baibuqiao.jpg'
        ];
        
        criticalImages.forEach(function(src) {
            const img = new Image();
            img.src = src;
        });

        console.log('花溪公园页面初始化完成');
    }

    // 页面可见性变化处理
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // 页面不可见时暂停视频
            if (heroVideo && !heroVideo.paused) {
                heroVideo.pause();
                videoControl.innerHTML = '<i class="fas fa-play"></i>';
            }
        } else {
            // 页面可见时恢复视频
            if (heroVideo && videoControl && !heroVideo.paused) {
                heroVideo.play();
                videoControl.innerHTML = '<i class="fas fa-pause"></i>';
            }
        }
    });

    // 键盘导航支持
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case ' ':
                // 空格键控制视频播放
                if (e.target === document.body) {
                    e.preventDefault();
                    if (heroVideo && videoControl) {
                        videoControl.click();
                    }
                }
                break;
            case 'ArrowLeft':
                // 左箭头切换到上一张图片
                if (e.target === document.body) {
                    e.preventDefault();
                    let currentIndex = Array.from(galleryThumbnails).findIndex(img => img.classList.contains('active'));
                    if (currentIndex > 0) {
                        galleryThumbnails[currentIndex - 1].click();
                    }
                }
                break;
            case 'ArrowRight':
                // 右箭头切换到下一张图片
                if (e.target === document.body) {
                    e.preventDefault();
                    let currentIndex = Array.from(galleryThumbnails).findIndex(img => img.classList.contains('active'));
                    if (currentIndex < galleryThumbnails.length - 1) {
                        galleryThumbnails[currentIndex + 1].click();
                    }
                }
                break;
        }
    });

    // 触摸设备支持
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    });

    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // 向上滑动，可以添加向上导航逻辑
                console.log('向上滑动');
            } else {
                // 向下滑动，可以添加向下导航逻辑
                console.log('向下滑动');
            }
        }
    }

    // 错误处理
    window.addEventListener('error', function(e) {
        console.warn('页面发生错误:', e.error);
    });

    // 页面卸载时清理
    window.addEventListener('beforeunload', function() {
        if (heroVideo) {
            heroVideo.pause();
        }
    });

    // 等待DOM加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // 导出一些实用函数供其他脚本使用
    window.HuaxiPark = {
        smoothScrollTo: smoothScrollTo,
        playVideo: function() {
            if (heroVideo) {
                heroVideo.play();
                videoControl.innerHTML = '<i class="fas fa-pause"></i>';
            }
        },
        pauseVideo: function() {
            if (heroVideo) {
                heroVideo.pause();
                videoControl.innerHTML = '<i class="fas fa-play"></i>';
            }
        }
    };

})();