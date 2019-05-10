var scrolltotop = {
    setting: {startline: 100, scrollto: 0, scrollduration: 1000, fadeduration: [500, 100]},
    controlHTML: '<i class="fa fa-arrow-up scrolltop"></i>',
    controlattrs: {offsetx: 5, offsety: 5},
    anchorkeyword: "#top",
    state: {isvisible: false, shouldvisible: false},
    scrollup: function () {
        if (!this.cssfixedsupport) {
            this.$control.css({opacity: 0})
        }
        var a = isNaN(this.setting.scrollto) ? this.setting.scrollto : parseInt(this.setting.scrollto);
        if (typeof a == "string" && jQuery("#" + a).length == 1) {
            a = jQuery("#" + a).offset().top
        } else {
            a = 0
        }
        this.$body.animate({scrollTop: a}, this.setting.scrollduration)
    },
    keepfixed: function () {
        var a = jQuery(window);
        var b = a.scrollLeft() + a.width() - this.$control.width() - this.controlattrs.offsetx;
        var c = a.scrollTop() + a.height() - this.$control.height() - this.controlattrs.offsety;
        this.$control.css({left: b + "px", top: c + "px"})
    },
    togglecontrol: function () {
        var a = jQuery(window).scrollTop();
        if (!this.cssfixedsupport) {
            this.keepfixed()
        }
        this.state.shouldvisible = (a >= this.setting.startline) ? true : false;
        if (this.state.shouldvisible && !this.state.isvisible) {
            this.$control.stop().animate({opacity: 1}, this.setting.fadeduration[0]);
            this.state.isvisible = true
        } else {
            if (this.state.shouldvisible == false && this.state.isvisible) {
                this.$control.stop().animate({opacity: 0}, this.setting.fadeduration[1]);
                this.state.isvisible = false
            }
        }
    },
    init: function () {
        jQuery(document).ready(function (a) {
            var c = scrolltotop;
            var b = document.all;
            c.cssfixedsupport = !b || b && document.compatMode == "CSS1Compat" && window.XMLHttpRequest;
            c.$body = (window.opera) ? (document.compatMode == "CSS1Compat" ? a("html") : a("body")) : a("html,body");
            c.$control = a('<div id="topcontrol" class="topcontrol">' + c.controlHTML + "</div>").css({
                position: c.cssfixedsupport ? "fixed" : "absolute",
                bottom: c.controlattrs.offsety,
                right: c.controlattrs.offsetx,
                opacity: 0,
                cursor: "pointer"
            }).attr({title: ""}).click(function () {
                c.scrollup();
                return false
            }).appendTo("body");
            if (document.all && !window.XMLHttpRequest && c.$control.text() != "") {
                c.$control.css({width: c.$control.width()})
            }
            c.togglecontrol();
            a('a[href="' + c.anchorkeyword + '"]').click(function () {
                c.scrollup();
                return false
            });
            a(window).bind("scroll resize", function (d) {
                c.togglecontrol()
            })
        })
    }
};
scrolltotop.init();