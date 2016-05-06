(function($) {

    $.fn.scCarousel = function(options) {
        var settings = {},
            instance = null;

        settings = $.extend(settings, options);

        // 생성자
        function ScCarousel(wrap, settings) {
            this.wrap = wrap;
            this.settings = settings;

            this.init();
        }

        ScCarousel.prototype.init = function() {
            // 이벤트 추가
            this.browser.init(this);
            this.navigator.init(this);

        };

        ScCarousel.prototype.browser = {
            browser : "",
            isTransition: false,
            isTransform: false,
            checkBrowser: function() {
                this.browser = window.navigator.userAgent;
            },
            checkTransition : function () {
                var prefixes = 'transition WebkitTransition MozTransition OTransition msTransition'.split(' '),
                    div = document.createElement('div');
                for(var i = 0; i < prefixes.length; i++) {
                    if(div && div.style[prefixes[i]] !== undefined) {
                        this.isTransition = true;
                    }
                }
                div = null;
            },
            checkTransform: function() {
                var prefixes = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' '),
                    div = document.createElement('div');
                for(var i = 0; i < prefixes.length; i++) {
                    if(div && div.style[prefixes[i]] !== undefined) {
                        this.isTransform = true;
                    }
                }
                div = null;
            },
            init: function(context) {
                this.checkBrowser();
                this.checkTransition();
                this.checkTransform();
            }
        };

        ScCarousel.prototype.navigator = {
            addEvent : function() {
                var $window = $(window),
                    $wrap = $(this.wrap),
                    $item = $wrap.find(".sc-col-item"),
                    $next_btn = $wrap.find(".next-btn"),
                    $prev_btn = $wrap.find(".prev-btn"),
                    item_length = $item.length,
                    item_width = $item.width(),
                    current_index = 0,
                    is_prev = false,
                    is_next = false,
                    is_active = false,
                    is_transition = ScCarousel.prototype.browser.isTransition,
                    is_transform = ScCarousel.prototype.browser.isTransform,
                    click_count = 0;

                // 화면 크기에 따른 이동 넓이 값 조정
                $window.bind("resize", function() {
                    if($window.width() <= 767) {
                        item_width = $item.width();
                        if(is_prev) {
                            $item.eq(current_index).css({
                                "left": -item_width+"px",
                                "-webkit-transform": "translateX("+item_width+"px)",
                                "-moz-transform": "translateX("+item_width+"px)",
                                "-ms-transform": "translateX("+item_width+"px)",
                                "-o-transform": "translateX("+item_width+"px)",
                                "transform": "translateX("+item_width+"px)",
                                "transition": "all 1s ease-out"
                            });
                        }
                        if(is_next) {
                            $item.eq(current_index).css({
                                "left": item_width+"px",
                                "-webkit-transform": "translateX(-"+item_width+"px)",
                                "-moz-transform": "translateX(-"+item_width+"px)",
                                "-ms-transform": "translateX(-"+item_width+"px)",
                                "-o-transform": "translateX(-"+item_width+"px)",
                                "transform": "translateX(-"+item_width+"px)",
                                "transition": "all 1s ease-out"
                            });
                        }
                    }
                });

                // prev btn event
                if($prev_btn.length > 0) {
                    $prev_btn.on("click", function() {
                        click_count+=1;
                        var width = item_width;
                        if(click_count > 1) {
                            if(is_next) {
                                width = 0;
                            } else {
                                width *= 2;
                            }
                        }

                        if(is_active) {
                            return false;
                        }

                        is_active = true;
                        is_next = false;
                        is_prev = true;

                        if(is_transition) {
                            $item.eq(current_index).addClass("prev").css({
                                "left": function() {
                                    if(is_transform) {
                                        return false;
                                    } else {
                                        return width+"px";
                                    }
                                },
                                "-webkit-transform": "translateX("+width+"px)",
                                "-moz-transform": "translateX("+width+"px)",
                                "-ms-transform": "translateX("+width+"px)",
                                "-o-transform": "translateX("+width+"px)",
                                "transform": "translateX("+width+"px)",
                                "transition": "all 1s ease-out"
                            });

                            current_index = (current_index === 0) ? parseInt(item_length-1) : parseInt(current_index - 1);


                            $item.eq(current_index).css({
                                "left" : -item_width+"px"
                            });
                            $item.eq(current_index).addClass("current").css({
                                "left": function() {
                                    if(is_transform) {
                                        return false;
                                    } else {
                                        return 0;
                                    }
                                },
                                "-webkit-transform": function() {
                                    return "translateX("+item_width+"px)";
                                },
                                "-moz-transform": function() {
                                    return "translateX("+item_width+"px)";
                                },
                                "-ms-transform": function() {
                                    return "translateX("+item_width+"px)";
                                },
                                "-o-transform": function() {
                                    return "translateX("+item_width+"px)";
                                },
                                "transform": function() {
                                    return "translateX("+item_width+"px)";
                                }
                            });
                        } else {
                            $item.eq(current_index).removeClass("current");
                            current_index = (current_index === 0) ? parseInt(item_length-1) : parseInt(current_index - 1);
                            $item.eq(current_index).addClass("current");

                            is_active = false;
                        }

                    });
                }

                // next btn event
                if($next_btn.length > 0) {
                    $next_btn.on("click", function() {
                        click_count+=1;
                        var width = item_width;
                        if(click_count > 1) {
                            if(is_prev) {
                                width = 0;
                            } else {
                                width *= 2;
                            }
                        }

                        if(is_active) {
                            return false;
                        }

                        is_active = true;
                        is_prev = false;
                        is_next = true;

                        if(is_transition) {

                            $item.eq(current_index).addClass("prev").css({
                                "left": function() {
                                    if(is_transform) {
                                        return false;
                                    } else {
                                        return -width+"px";
                                    }
                                },
                                "-webkit-transform": "translateX(-"+width+"px)",
                                "-moz-transform": "translateX(-"+width+"px)",
                                "-ms-transform": "translateX(-"+width+"px)",
                                "-o-transform": "translateX(-"+width+"px)",
                                "transform": "translateX(-"+width+"px)",
                                "transition": "all 1s ease-out"
                            });
                            /**
                             * 신기한 상황 addClass("next").css("left", 0); 은 동작하지 않음
                             * css를 function 형식으로 변경 해줬더니 동작함.
                             * 이유를 찾아봐야 되겠음, 또안된다.
                             * => DOM을 랜더링 하는 방식에서의 문제로 파악된다 감추는 속성을 display:none과 display: block을 사용했더니 의도한 대로 동작함
                             */
                            current_index = (current_index === item_length - 1) ? 0 : parseInt(current_index + 1);

                            $item.eq(current_index).css({
                                "left" : item_width+"px"
                            });
                            $item.eq(current_index).addClass("current").css({
                                "left": function() {
                                    if(is_transform) {
                                        return false;
                                    } else {
                                        return 0;
                                    }
                                },
                                "-webkit-transform": function() {
                                    return "translateX(-"+item_width+"px)";
                                },
                                "-moz-transform": function() {
                                    return "translateX(-"+item_width+"px)";
                                },
                                "-ms-transform": function() {
                                    return "translateX(-"+item_width+"px)";
                                },
                                "-o-transform": function() {
                                    return "translateX(-"+item_width+"px)";
                                },
                                "transform": function() {
                                    return "translateX(-"+item_width+"px)";
                                }
                            });

                        } else {
                            $item.eq(current_index).removeClass("current");
                            current_index = (current_index === item_length - 1) ? 0 : parseInt(current_index + 1);
                            $item.eq(current_index).addClass("current");

                            is_active = false;
                        }
                    });
                }

                // transition end event
                $wrap.on("transitionend", ".current.prev", function(e) {
                    var $target = $(e.target);

                    if(is_prev) {

                        $target.removeClass("current prev").css({
                            "left": "",
                            "-webkit-transform": "",
                            "-moz-transform": "",
                            "-ms-transform": "",
                            "-o-transform": "",
                            "transform": "",
                            "transition": ""
                        });

                        is_active = false;
                    }

                    if(is_next) {
                        $target.removeClass("current prev").css({
                            "left": "",
                            "transform": "",
                            "-webkit-transform": "",
                            "-moz-transform": "",
                            "-ms-transform": "",
                            "-o-transform": "",
                            "transition": ""
                        });

                        is_active = false;
                    }
                });

            },
            init : function(context) {
                this.addEvent.call(context);
            }
        };


        return this.each(function(index, elem) {
            instance = new ScCarousel(elem, settings);
            return instance;
        });

    };
})(jQuery);

//$(function() {

    //var $wrap = $(".sc-carousel"),
    //    $item = $wrap.find(".sc-col-item"),
    //    $next_btn = $(".next-btn"),
    //    $prev_btn = $(".prev-btn"),
    //    item_length = $item.length,
    //    item_width = $item.width(),
    //    current_index = 0,
    //    is_prev = false,
    //    is_next = false,
    //    is_active = false;
    //
    //$prev_btn.on("click", function() {
    //    if(is_active) {
    //        return false;
    //    }
    //
    //    is_active = true;
    //    is_prev = true;
    //
    //    $item.eq(current_index).css({
    //        "left": item_width+"px",
    //        "transition": "left 1s ease-out transform 1s"
    //    });
    //
    //    current_index = (current_index === 0) ? parseInt(item_length-1) : parseInt(current_index - 1);
    //
    //    $item.eq(current_index).css("left", -item_width+"px").addClass("prev").css({
    //        "left": function(index, value) {
    //            return 0;
    //        }
    //    });
    //
    //});
    //
    //$next_btn.on("click", function() {
    //    if(is_active) {
    //        return false;
    //    }
    //
    //    is_active = true;
    //    is_next = true;
    //
    //    $item.eq(current_index).css({
    //        "left": -item_width+"px",
    //        "transition": "left 1s ease-out transform 1s"
    //    });
    //    /**
    //     * 신기한 상황 addClass("next").css("left", 0); 은 동작하지 않음
    //     * css를 function 형식으로 변경 해줬더니 동작함.
    //     * 이유를 찾아봐야 되겠음, 또안된다.
    //     * => DOM을 랜더링 하는 방식에서의 문제로 파악된다 감추는 속성을 display:none과 display: block을 사용했더니 의도한 대로 동작함
    //     */
    //    current_index = (current_index === item_length - 1) ? 0 : parseInt(current_index + 1);
    //
    //    $item.eq(current_index).css("left", item_width+"px").addClass("next").css({
    //        "left": function(index, value) {
    //            return 0;
    //        }
    //    });
    //
    //});
    //
    //$wrap.on("transitionend", ".current",function(e) {
    //    var $target = $(e.target);
    //
    //    if(is_prev) {
    //
    //        $target.removeClass("current").css({
    //            "left": "",
    //            "transition": ""
    //        });
    //        $item.eq(current_index).removeClass("prev").addClass("current").css({
    //            "left": "",
    //            "transition": ""
    //        });
    //
    //        is_prev = false;
    //        is_active = false;
    //    }
    //
    //    if(is_next) {
    //        $target.removeClass("current").css({
    //            "left": "",
    //            "transition": ""
    //        });
    //        $item.eq(current_index).removeClass("next").addClass("current").css({
    //            "left": "",
    //            "transition": ""
    //        });
    //        is_next = false;
    //        is_active = false;
    //    }
    //});

//});