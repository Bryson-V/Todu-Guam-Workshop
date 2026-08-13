function loadNavbar() {
    const isInsideScenes = window.location.pathname.includes('/scenes/');
    const pathToRoot = isInsideScenes ? '../' : './';
    const currentPath = window.location.pathname;

    // For persistent bar under current page tab
    const isActive = (pageName) => {
        if (pageName === 'index.html' && (currentPath.endsWith('/') || currentPath.endsWith('index.html'))) {
            return 'active';
        }
        return currentPath.includes(pageName) ? 'active' : '';
    };

    const navbarHTML = `
    <nav class="site-navbar">
        <div class="nav-container">
            <!-- Logo Section -->
            <a href="${pathToRoot}index.html" class="nav-brand">
                <img src="${pathToRoot}assets/Logo1.png" alt="OneCare Guam Logo" class="nav-logo-img">
                <span class="nav-brand-title">OneCare Guam</span>
            </a>

            <!-- Navigation Links with Active Check -->
            <ul class="nav-links">
                <li><a href="${pathToRoot}index.html" class="${isActive('index.html')}">Home</a></li>
                <li><a href="${pathToRoot}scenes/page2.html" class="${isActive('page2.html')}">Financial Support</a></li>
                <li><a href="${pathToRoot}scenes/page3.html" class="${isActive('page3.html')}">Community Events</a></li>
                <li><a href="${pathToRoot}scenes/page4.html" class="${isActive('page4.html')}">Wellness Tips</a></li>
                <li><a href="${pathToRoot}scenes/page5.html" class="${isActive('page5.html')}">About Us</a></li>
            </ul>
        </div>
    </nav>
    `;

    const holder = document.getElementById('navbarHolder');
    if (holder) {
        holder.innerHTML = navbarHTML;
    }
}

document.addEventListener("DOMContentLoaded", loadNavbar);