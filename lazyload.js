/**
 * @file m-content.js
 * author huangzongzhe
 * 2016.4
 */
/* globals Zepto */
var $hzz = $('#hzzlove');

var lazyLoad = (function () {
    var HEIGHT = window.innerHeight; // 浏览器高度
    var conWIDTH = $('.mth-editor-content').width(); // 容器宽度
    var lazyImg = $('.mth-editor-content img');

    var setConfig = function (conWIDTHVal, lazyImgVal) {
        conWIDTH = conWIDTHVal;
        lazyImg = lazyImgVal;
    };

    var methods = {
        // 图片占位
        setImg: function () {
            $.each(lazyImg, function (index, el) {
                console.log(el);
                $(el).attr({
                    width: conWIDTH,
                    height: $(el).data('h') / $(el).data('w') * conWIDTH
                });
            });
        },
        setOffsetTop: function () {
            $.each(lazyImg, function (index, el) {
                console.log(el);
                $(el).attr({
                    top: el.offsetTop - HEIGHT,
                    status: 'wait'
                });
            });
        },
        isShow: function () {
            var scrollTop = $(window).scrollTop();
            $.each(lazyImg, function (index, el) {
                var $el = $(el);
                // console.log($el.attr('top') + ' |||| ' + scrollTop);
                // console.log($el.attr('src'));
                // console.log($el.data('src'));
                if ($el.attr('status') === 'done') {
                    return;
                };
                if ($el.attr('top') <= scrollTop) {
                    if ($el.data('src')) {
                        $el.attr('src', $el.data('src'));
                        $el.attr('status', 'done');
                    }
                }
            });
        },
        scroll: function () {
            window.onscroll = function () {
                methods.isShow();
            };
        },
        loadFirstImg: function () {
            var scrollTop = $(window).scrollTop();
            var $img = $($('.mth-editor-content img')[0]);
            if ($img.attr('top') <= scrollTop) {
                if ($img.data('src')) {
                    $img.attr('src', $img.data('src'));
                    $img.attr('status', 'done');
                }
            }
        }
    };
    var init = function () {
        methods.loadFirstImg();
        methods.setImg();
        methods.setOffsetTop();
        methods.scroll();
    };
    return {
        init: init,
        methods: methods,
        setConfig: setConfig
    };
})();
/* eslint-disable */
Zepto(function ($) {
    console.log($hzz);
    lazyLoad.init();
});
/* eslint-enable */