// Add any functions either here, or make a new file
//Generally try to have one file per usecase
//EX:
 
// Navbar function, call this so we don't have to copy paste the navbar code into every page
function loadNavbar() {
    const navbarHTML = `
     <nav class="navbar">
        <button class="buttonStyle" onclick="location.href='/index.html'">Home</button>
        <button class="buttonStyle" onclick="location.href='/scenes/page2.html'">Financial Support</button>
        <button class="buttonStyle" onclick="location.href='/scenes/page3.html'">Community Events</button>
        <button class="buttonStyle" onclick="location.href='/scenes/page4.html'">Wellness Tips</button>
        <button class="buttonStyle" onclick="location.href='/scenes/page5.html'">About Us</button>
    </nav>
    `;
   
    // Inserts the HTML inside the placeholder element
    document.getElementById('navbarHolder').innerHTML = navbarHTML;
}
 
// call the function when page loads
window.onload = loadNavbar;