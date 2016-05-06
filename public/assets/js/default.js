$(function() {
    var $sc_drawer_btn = $(".sc-drawer-btn"),
        $sc_drawer = $(".sc-drawer"),
        $sc_drawer_toggle = $sc_drawer.find(".sc-drawer-toggle"),
        $layout_content = $(".layout-content"),
        $sc_backdrop = $("#sc-backdrop"),
        $file_load = $(".file-load");



    /**
     * 메모이제이션 패턴 적용(scrollTop 정보 저장)
     */
    function drawerOpen() {
        if(drawerOpen.cache["scrollTop"] === undefined) {
            drawerOpen.cache["scrollTop"] = $(window).scrollTop();
        }

        var scroll_top = 0;

        if($sc_drawer.hasClass("open")) {
            scroll_top = drawerOpen.cache["scrollTop"];
            $sc_drawer_btn.removeClass("open");
            $sc_drawer.removeClass("open");
            $sc_backdrop.removeClass("open");

            $layout_content.css({
                "position": "relative",
                "top": "inherit"
            });

            $(window).scrollTop(scroll_top);

        } else {
            drawerOpen.cache["scrollTop"] = $(window).scrollTop();
            $sc_drawer_btn.addClass("open");
            $sc_drawer.addClass("open");
            $sc_backdrop.addClass("open");

            $layout_content.css({
                "position": "fixed",
                "top": -drawerOpen.cache["scrollTop"]+"px"
            });
        }
    }
    drawerOpen.cache = {};

    $sc_drawer_btn.on("click", function() {
        drawerOpen();
    });

    $sc_backdrop.on("click", function() {
        drawerOpen();
    });

    $sc_drawer_toggle.on("click", function() {
        var $closet_li = $(this).closest("li"),
            $ic_toggle = $(this).find(".ic-toggle");

        if($ic_toggle.hasClass("open")) {
            $ic_toggle.removeClass("open");
            $closet_li.find("ul").removeClass("open");
        } else {
            $ic_toggle.addClass("open");
            $closet_li.find("ul").addClass("open");
        }
    });

    $file_load.on("click", function() {
        var test_image = document.getElementById("test-image"),
            img = document.createElement("img");
        img.src = "http://practice.geeekdev.com/assets/img/drawing.jpg";

        $(test_image).css({
            "background-image": "url('"+img.src+"')",
            "display": "block"
        });

    });

});