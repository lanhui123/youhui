(function (a) {
    jQuery(document).on("ready", function () {
        a(window).on("load", function () {
            a(".status").fadeOut();
            a(".preloader").delay(350).fadeOut("slow")
        });
        a("a.page-scroll").on("click", function (c) {
            var b = a(this);
            a("html, body").stop().animate({scrollTop: a(b.attr("href")).offset().top - 50}, 1500);
            c.preventDefault()
        });
        a(window).scroll(function () {
            if (a(this).scrollTop() > 100) {
                a(".menu-top").addClass("menu-shrink")
            } else {
                a(".menu-top").removeClass("menu-shrink")
            }
        });
        a(document).on("click", ".navbar-collapse.in", function (b) {
            if (a(b.target).is("a") && a(b.target).attr("class") != "dropdown-toggle") {
                a(this).collapse("hide")
            }
        });
        a(".video-play").magnificPopup({type: "iframe"})
    });
    a("#testimonial-slider").owlCarousel({
        items: 4,
        itemsDesktop: [1199, 2],
        itemsDesktopSmall: [979, 2],
        itemsTablet: [768, 2],
        itemsMobile: [600, 1],
        pagination: false,
        navigation: true,
        navigationText: ["", ""],
        slideSpeed: 1000,
        autoPlay: false
    })
})(jQuery);