function loadFooter() {
    const isInsideScenes = window.location.pathname.includes('/scenes/');
    const pathToRoot = isInsideScenes ? '../' : './';

    fetch(pathToRoot + 'footer.html')
        .then(response => response.text())
        .then(data => {
            const holder = document.getElementById('footerHolder');
            if (!holder) return;

            holder.innerHTML = data;

            if (isInsideScenes) {
                const links = holder.querySelectorAll('.footer-nav a');
                links.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href && !href.startsWith('http')) {
                        link.setAttribute('href', pathToRoot + href);
                    }
                });

                const logoImg = holder.querySelector('.footer-logo');
                if (logoImg) {
                    logoImg.setAttribute('src', pathToRoot + 'assets/LogoNoBG.png');
                }
            }
        })
        .catch(error => console.error('Error loading footer:', error));
}

document.addEventListener("DOMContentLoaded", loadFooter);