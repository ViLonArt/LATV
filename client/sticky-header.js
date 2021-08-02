/**
 * Sticky header
 * When the user scrolls the page, execute sticky()
 */
window.onscroll = function() { stickyscroll() };
var header = document.getElementById("scroll_header");
var sticky = header.offsetTop;
// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function stickyscroll() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}
