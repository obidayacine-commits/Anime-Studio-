// ========== دوال المودال ==========
function openImage(src, caption) { 
    console.log('فتح صورة:', src, caption);
    const modal = document.getElementById('imageModal'); 
    const modalImg = document.getElementById('modalImage'); 
    const captionDiv = document.getElementById('caption'); 
    const downloadBtn = document.getElementById('downloadImageBtn'); 
    
    if (!modal || !modalImg || !captionDiv) return console.error('عناصر المودال ناقصة');
    
    modal.style.display = 'block'; 
    modalImg.src = src; 
    captionDiv.textContent = caption || 'لا يوجد تعليق'; 
    
    if(downloadBtn) { 
        const originalSrc = src.includes('cloudinary') ? src.replace(/\/upload\/.*?\/v/, '/upload/v') : src; 
        downloadBtn.href = originalSrc; 
        downloadBtn.setAttribute('download', (caption || 'image').replace(/[#\s]/g, '_')); 
    } 
    
    document.body.style.overflow = 'hidden'; 
    document.getElementById('themeSwitcher')?.classList.add('hide');
} 

function closeImage() { 
    document.getElementById('imageModal').style.display = 'none'; 
    document.body.style.overflow = 'auto'; 
    document.getElementById('themeSwitcher')?.classList.remove('hide');
} 

function openVideo(src, caption) { 
    console.log('فتح فيديو:', src, caption);
    const modal = document.getElementById('videoModal'); 
    const modalVideo = document.getElementById('modalVideo'); 
    const captionDiv = document.getElementById('videoCaption'); 
    const downloadBtn = document.getElementById('downloadVideoBtn'); 
    
    if (!modal || !modalVideo || !captionDiv) return console.error('عناصر المودال ناقصة');
    
    modal.style.display = 'block'; 
    captionDiv.textContent = caption || 'لا يوجد تعليق';
    
    modalVideo.innerHTML = '';
    const source = document.createElement('source');
    source.src = src;
    source.type = 'video/mp4';
    modalVideo.appendChild(source);
    
    modalVideo.load();
    
    modalVideo.addEventListener('loadeddata', function playVideo() {
        modalVideo.play().catch(err => {
            console.log('المتصفح منع التشغيل التلقائي');
        });
        modalVideo.removeEventListener('loadeddata', playVideo);
    }, { once: true });
    
    if(downloadBtn) { 
        const originalSrc = src.includes('cloudinary') ? src.replace(/\/upload\/.*?\/v/, '/upload/v') : src; 
        downloadBtn.href = originalSrc; 
        downloadBtn.setAttribute('download', (caption || 'video').replace(/[#\s]/g, '_')); 
    } 
    
    document.body.style.overflow = 'hidden'; 
    document.getElementById('themeSwitcher')?.classList.add('hide');
} 

function closeVideo() { 
    const modal = document.getElementById('videoModal'); 
    const modalVideo = document.getElementById('modalVideo'); 
    modal.style.display = 'none'; 
    modalVideo.pause(); 
    modalVideo.currentTime = 0;
    modalVideo.innerHTML = '';
    document.body.style.overflow = 'auto'; 
    document.getElementById('themeSwitcher')?.classList.remove('hide');
}

// ========== باقي الكود ==========
document.addEventListener('DOMContentLoaded', function() {
    const allImages = [
        { "id": "img1", "src": "https://res.cloudinary.com/dzddi3r56/image/upload/v1778677140/AnimeX_1008715_a3i0n0.jpg", "caption": "غوجو ساتورو ", "tags": ["gojo"] },
        { "id": "img2", "src": "https://res.cloudinary.com/dzddi3r56/image/upload/v1778852936/g4x0jt8efqnuhwau0xmu.jpg", "caption": "Google :مصدر الصورة", "tags": ["sukuna"] },
        { "id": "img3", "src": "https://res.cloudinary.com/dzddi3r56/image/upload/v1778853198/oykam5uvrtp3d4sa5ox7.jpg", "caption": "مصدر الصورة : Google ", "tags": ["toji"] },
        { "id": "img4", "src": "Screenshot_20250607_221633_Chrome.jpg", "caption": "ميغومي ", "tags": ["megumi"] }
    ];

    const allVideos = [
        { "id": "vid1", "src": "https://player.cloudinary.com/embed/?cloud_name=dzddi3r56&public_id=zbggz0gpho044orfe0rx", "caption": "فوشيغورو ميغومي ", "tags": ["megumi"] },
        { "id": "vid2", "src": "facebook_17756688527978777i.mp4", "poster": "Screenshot_20260416_091106_Video Player.jpg", "caption": " #gojo #toji", "tags": ["gojo", "toji"] },
        { "id": "vid3", "src": "facebook_1775668852797.mp4", "poster": "VideoCapture_20260416-080255.jpg", "caption": "تشوسو #choso", "tags": ["choso"] }
    ];

    let currentCategory = 'all';
    let currentTab = 'Pictures';
    let itemsToShow = 20;

    // ========== نافذة الترحيب ==========
    const welcomeModal = document.getElementById('welcomeModal');
    const messageModal = document.getElementById('messageModal');
    const usernameInput = document.getElementById('usernameInput');
    const savedName = localStorage.getItem('username');

    if (savedName) {
        if(welcomeModal) welcomeModal.style.display = 'none';
        updateProfileName(savedName);
    } else {
        setTimeout(() => {
            if(welcomeModal) welcomeModal.style.display = 'block';
            usernameInput?.focus();
        }, 300);
    }

    window.submitUsername = function() {
        const username = usernameInput.value.trim();
        if (username === '') {
            usernameInput.style.borderColor = 'red';
            usernameInput.placeholder = 'الرجاء كتابة اسمك';
            return;
        }
        welcomeModal.style.display = 'none';
        showWelcomeMessage(username);
        localStorage.setItem('username', username);
        updateProfileName(username);
    }

    function showWelcomeMessage(name) {
  const messageText = document.getElementById('messageText');
  if (!messageText) return;

  messageText.innerHTML = `أهلاً بك يا ${name}<br><br>
  أرجو أن يعجبك الموقع<br>
  لا تنسى التواصل معنا إذا اردت إضافة فكرة للموقع أو واجهة مشكلة ما`;
  
  messageModal.style.display = 'block';
}
    window.closeMessageModal = function() {
        messageModal.style.display = 'none';
    }

    function updateProfileName(name) {
        const p1 = document.getElementById('profileName');
        const p2 = document.getElementById('sidebarUsername');
        if(p1) p1.textContent = name;
        if(p2) p2.textContent = name;
    }

    if(usernameInput) {
        usernameInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') submitUsername();
        });
    }

    // ========== القائمة الجانبية ==========
    const toggleBtn = document.querySelector('.sidebar-toggle');
    const sideNav = document.querySelector('.sidebar');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');

    if(toggleBtn) {
        toggleBtn.addEventListener('click', () => sideNav.classList.toggle('show'));
    }

    document.addEventListener('click', function(e) {
        if (sideNav && !sideNav.contains(e.target) && toggleBtn && !toggleBtn.contains(e.target)) {
            sideNav.classList.remove('show');
        }
    });

    // ========== التنقل بين الصفحات ==========
    window.showPage = function(pageId) {
        document.getElementById('imageModal').style.display = 'none';
        document.getElementById('videoModal').style.display = 'none';
        document.getElementById('modalVideo')?.pause();
        document.body.style.overflow = 'auto';
        document.getElementById('themeSwitcher')?.classList.remove('hide');

        const mainPages = ['Home', 'About', 'Contact', 'Profile'];
        mainPages.forEach(id => {
            const page = document.getElementById(id);
            if(page) page.style.display = "none";
        });

        const targetPage = document.getElementById(pageId);
        if(targetPage) targetPage.style.display = "block";

        sidebarLinks.forEach(link => {
            link.classList.remove("active");
            if(link.dataset.tab === pageId) link.classList.add("active");
        });

        if(pageId === 'Profile') loadFavorites();
        if(pageId === 'Home') openTab(null, 'Pictures');
        if(sideNav) sideNav.classList.remove('show');
    }

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showPage(this.dataset.tab);
        });
    });

    // ========== التصنيفات ==========
    function initCategoryButtons() {
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                currentCategory = this.dataset.tag;
                itemsToShow = 20;
                filterContent();
            });
        });
    }

    function filterContent() {
        const items = currentTab === 'Pictures' ? allImages : allVideos;
        const gallery = document.querySelector(`#${currentTab} .gallery`);
        if(!gallery) return;

        const filtered = currentCategory === 'all' ? items : items.filter(item => item.tags && item.tags.includes(currentCategory));
        const itemsToRender = filtered.slice(0, itemsToShow);
        gallery.innerHTML = '';

        if(filtered.length === 0) {
            gallery.innerHTML = '<p style="color: white; text-align: center; padding: 40px; grid-column: 1 / -1;">لا توجد عناصر في هذا التصنيف</p>';
            return;
        }

        itemsToRender.forEach(item => {
            const favClass = isFavorite(item.id) ? 'active' : '';
            
            if(currentTab === 'Pictures') {
                const div = document.createElement('div');
                div.className = 'image';
                div.dataset.id = item.id;
                div.innerHTML = `
                    <button class="fav-btn ${favClass}"></button>
                    <img src="${item.src}" alt="${item.id}" loading="lazy">
                    <div class="caption">${item.caption}</div>
                `;
                div.querySelector('.fav-btn').addEventListener('click', (e) => {
                    e.stopPropagation();
                    toggleFavorite(item.id, 'img', item.src, '', e);
                });
                div.querySelector('img').addEventListener('click', () => {
                    openImage(item.src, item.caption);
                });
                gallery.appendChild(div);
            } else {
                const div = document.createElement('div');
                div.className = 'video';
                div.dataset.id = item.id;
                div.innerHTML = `
                    <button class="fav-btn ${favClass}"></button>
                    <div class="video-wrapper" style="position:relative;cursor:pointer;">
                        <video poster="${item.poster}" playsinline preload="metadata">
                            <source src="${item.src}" type="video/mp4">
                        </video>
                        <div class="play-overlay" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:50px;color:white;text-shadow:0 0 10px black;pointer-events:none;">▶</div>
                    </div>
                    <div class="caption">${item.caption}</div>
                `;
                div.querySelector('.fav-btn').addEventListener('click', (e) => {
                    e.stopPropagation();
                    toggleFavorite(item.id, 'video', item.src, item.poster, e);
                });
                div.querySelector('.video-wrapper').addEventListener('click', () => {
                    openVideo(item.src, item.caption);
                });
                gallery.appendChild(div);
            }
        });

        if(filtered.length > itemsToShow) {
            const btn = document.createElement('button');
            btn.id = 'loadMoreBtn';
            btn.textContent = 'تحميل المزيد';
            btn.style.cssText = 'grid-column: 1 / -1; padding: 15px; margin: 20px; background: #5813AF; color: white; border: none; border-radius: 8px; cursor: pointer;';
            btn.onclick = () => {
                itemsToShow += 20;
                filterContent();
            };
            gallery.appendChild(btn);
        }
    }

    // ========== المفضلة ==========
    function isFavorite(id) {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        return favorites.some(fav => fav.id === id);
    }

    window.toggleFavorite = function(id, type, src, poster, event) {
        if(event) event.stopPropagation();
        let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const btn = event.target.closest('.fav-btn');
        const index = favorites.findIndex(fav => fav.id === id);

        if (index > -1) {
            favorites.splice(index, 1);
            btn.classList.remove('active');
        } else {
            favorites.push({ id, type, src, poster });
            btn.classList.add('active');
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
        if(document.getElementById('Profile').style.display === 'block') {
            loadFavorites();
        }
    }

    function loadFavorites() {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const gallery = document.getElementById('favoritesGallery');
        if(!gallery) return;
        gallery.innerHTML = '';

        if (favorites.length === 0) {
            gallery.innerHTML = '<p style="color: white; text-align: center; padding: 40px; grid-column: 1 / -1;">لا توجد عناصر في المفضلة</p>';
            return;
        }

        favorites.forEach(fav => {
            let caption = '';
            const imgItem = allImages.find(item => item.id === fav.id);
            const vidItem = allVideos.find(item => item.id === fav.id);
            if(imgItem) caption = imgItem.caption;
            if(vidItem) caption = vidItem.caption;

            if (fav.type === 'img') {
                const div = document.createElement('div');
                div.className = 'image';
                div.dataset.id = fav.id;
                div.innerHTML = `
                    <button class="fav-btn active"></button>
                    <img src="${fav.src}" alt="Favorite" loading="lazy">
                    <div class="caption">${caption}</div>
                `;
                div.querySelector('.fav-btn').addEventListener('click', (e) => {
                    e.stopPropagation();
                    toggleFavorite(fav.id, 'img', fav.src, '', e);
                });
                div.querySelector('img').addEventListener('click', () => {
                    openImage(fav.src, caption);
                });
                gallery.appendChild(div);
            } else {
                const div = document.createElement('div');
                div.className = 'video';
                div.dataset.id = fav.id;
                div.innerHTML = `
                    <button class="fav-btn active"></button>
                    <div class="video-wrapper" style="position:relative;cursor:pointer;">
                        <video poster="${fav.poster}" playsinline preload="metadata">
                            <source src="${fav.src}" type="video/mp4">
                        </video>
                        <div class="play-overlay" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:50px;color:white;text-shadow:0 0 10px black;pointer-events:none;">▶</div>
                    </div>
                    <div class="caption">${caption}</div>
                `;
                div.querySelector('.fav-btn').addEventListener('click', (e) => {
                    e.stopPropagation();
                    toggleFavorite(fav.id, 'video', fav.src, fav.poster, e);
                });
                div.querySelector('.video-wrapper').addEventListener('click', () => {
                    openVideo(fav.src, caption);
                });
                gallery.appendChild(div);
            }
        });
    }

    function loadFavoritesState() {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        favorites.forEach(fav => {
            const btn = document.querySelector(`[data-id="${fav.id}"] .fav-btn`);
            if (btn) btn.classList.add('active');
        });
    }

    // إخفاء الزر في fullscreen
    
    document.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement) {
            document.getElementById('themeSwitcher')?.classList.add('hide');
        } else {
            const imageModal = document.getElementById('imageModal');
            const videoModal = document.getElementById('videoModal');
            if (imageModal.style.display !== 'block' && videoModal.style.display !== 'block') {
                document.getElementById('themeSwitcher')?.classList.remove('hide');
            }
        }
    });

    // قفل بالـ Esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (document.getElementById('imageModal').style.display === 'block') closeImage();
            if (document.getElementById('videoModal').style.display === 'block') closeVideo();
        }
    });

    // ========== التابات ==========
    window.openTab = function(evt, tabName) {
        const homeDiv = document.getElementById('Home');
        const tabcontent = homeDiv.querySelectorAll("#Pictures, #Videos");
        tabcontent.forEach(tab => tab.style.display = "none");
        const tablinks = homeDiv.getElementsByClassName("tablinks");
        Array.from(tablinks).forEach(link => link.classList.remove("active"));
        document.getElementById(tabName).style.display = "block";
        
        if(evt && evt.currentTarget) {
            evt.currentTarget.classList.add("active");
        } else {
            const btn = homeDiv.querySelector(`.tablinks[data-tab="${tabName}"]`);
            if(btn) btn.classList.add("active");
        }
        
        currentTab = tabName;
        itemsToShow = 20;
        filterContent();
    }

    document.querySelectorAll('.tablinks').forEach(btn => {
        btn.addEventListener('click', function() {
            openTab(null, this.dataset.tab);
        });
    });

    // ========== تشغيل الموقع ==========
    showPage('Home');
    initCategoryButtons();
    loadFavoritesState();
});

