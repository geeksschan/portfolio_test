$(function() {
    var $window = $(window),
        $body = $("body"),
        $pf_header = $body.find(".pf-header"),
        $pf_header_height = $pf_header.height(),
        $is_dragged = false,
        $pf_portfolio = $("#pf-portfolio"),
        $pf_item = $pf_portfolio.find(".pf-item"),
        $sc_carousel = $(".sc-carousel"),
        $up_btn = $(".up-btn");

    if($pf_item.length > 0) {

        // mobile일 경우에 touch에 대한 클래서 넣기
        if ("ontouchstart" in document.documentElement) {

            // 드래가 유무 상태 정보 체크
            $body.on("touchmove",function() {
                $is_dragged = true;
            });
            $body.on("touchstart", function() {
                $is_dragged = false;
            });

            $pf_item.each(function() {
                $(this).addClass("is-touch");
            });

            $pf_item.on("touchend",function() {
                if(!$is_dragged) {
                    if($(this).hasClass("in")) {
                        $(this).removeClass("in");
                    } else {
                        $(this).addClass("in");
                    }
                }
            });
        }
        $sc_carousel.scCarousel({});
    }

    $up_btn.on("click", function() {
        $("html, body").animate({ scrollTop: "0" });
    });

    $window.scroll(function() {
        if(200 < $window.scrollTop()) {
            $up_btn.addClass("active");
        } else {
            $up_btn.removeClass("active");
        }
    });

});