$(function() {
    var $wrap = $(".sc-carousel"),
        $item = $wrap.find(".item"),
        $next_item = $(".item.next"),
        $current_item = $wrap.find(".item.current"),
        $next_btn = $(".next-btn"),
        $prev_btn = $(".prev-btn"),
        item_length = $item.length,
        current_index = 0,
        is_prev = false,
        is_next = false,
        is_active = false;

    $prev_btn.on("click", function() {
        if(is_active) {
            return false;
        }

        is_active = true;
        is_prev = true;

        $item.eq(current_index).css({
            "left": "100px",
            "transition": "left 1s ease-out"
        });

        current_index = (current_index === 0) ? parseInt(item_length-1) : parseInt(current_index - 1);

        $item.eq(current_index).addClass("prev").css({
            "left": function(index, value) {
                return 0;
            }
        });

    });

    $next_btn.on("click", function() {
        if(is_active) {
            return false;
        }

        is_active = true;
        is_next = true;

        $item.eq(current_index).css({
            "left": "-100px",
            "transition": "left 1s ease-out"
        });
        /**
         * 신기한 상황 addClass("next").css("left", 0); 은 동작하지 않음
         * css를 function 형식으로 변경 해줬더니 동작함.
         * 이유를 찾아봐야 되겠음
         */
        current_index = (current_index === item_length - 1) ? 0 : parseInt(current_index + 1);
        $item.eq(current_index).addClass("next").css({
            "left": function(index, value) {
                return 0;
            }
        });

    });

    $wrap.on("transitionend", ".current",function(e) {
        var $target = $(e.target),
            target_index = $target.index();

        if(is_prev) {

            $target.removeClass("current").css({
                "left": "",
                "transition": ""
            });
            $item.eq(current_index).removeClass("prev").addClass("current").css({
                "left": "",
                "transition": ""
            });

            is_prev = false;
            is_active = false;
        }

        if(is_next) {
            $target.removeClass("current").css({
                "left": "",
                "transition": ""
            });
            $item.eq(current_index).removeClass("next").addClass("current").css({
                "left": "",
                "transition": ""
            });
            is_next = false;
            is_active = false;
        }



    });

});