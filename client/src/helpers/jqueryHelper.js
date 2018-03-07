/**
 * Initialize the plugins
 *
 * @returns {undefined}
 */
export function pluginsInit() {
  $('.button-collapse').sideNav();
  $('.parallax').parallax();
  $('.dropdown-button').dropdown();
  $('ul.tabs').tabs();
  $('.modal').modal();
}

/**
 * Jquery
 *
 * @returns {undefined}
 */
export function transformNavBar() {
  $(window).scroll(() => {
    if ($(window).scrollTop() > 100) {
      $('#search-nav').removeClass('hide');
      $('#catalog-nav').addClass('red darken-2');
      $('#catalog-nav').removeClass('transparent z-depth-0');
    } else {
      $('#search-nav').addClass('hide');
      $('#catalog-nav').removeClass('red darken-2');
      $('#catalog-nav').addClass('transparent z-depth-0');
    }
  });
}
