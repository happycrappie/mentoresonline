const header = document.getElementById('header');
const headerTop = header.offsetTop;

/**
 * Fix Navigation Bar if scrolled more than 100px
 */
const fixNav = () => {
  if (window.scrollY >= (headerTop + 100)) {
    addClass(header, '--scrolled');
  } else {
    removeClass(header, '--scrolled');
  }
}

domReady(function(e) {
  window.addEventListener('scroll', fixNav);
});

const openNavButton = document.getElementById('openNav');

const toggleMobileNav = () => {
  if ( hasClass(header, 'active') ) {
    removeClass(header, 'active');
  } else {
    addClass(header, 'active');
  }
}

openNavButton.addEventListener('click', toggleMobileNav);