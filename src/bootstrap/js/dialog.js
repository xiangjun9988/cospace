/**
 *
 * jquery|zepto插件，实现通用的提示框方法
 *
 * example:
 *           $.dialog('对话框内容', okcb, cancelcb); //后两个参数可以不传
 *              
 *           $.dialog({
 *               content : '对话框内容',
 *               ok : function() {
 *                   alert('我是确定按钮');
 *               },
 *               cancel : function() {
 *                   alert('我是取消按钮');
 *               }
 *           });
 */
require('../css/dialog.css');
;(function(window, undefined) {

    var win = $(window),
        doc = $(document),
        count = 1,
        isLock = false;

    var Dialog = function(options,okcb,cancelcb) {
        var _options = {};
        if(typeof options === 'string'){
            _options.content = options;
            _options.ok = okcb || function(){};

            if(cancelcb){
                if(typeof cancelcb === 'function'){
                    _options.cancel = cancelcb;
                }
                else{
                    _options.cancel = function(){};
                }
                //此情况下默认按钮顺序颠倒
                _options.reverse = true;
            }
        }
        else if(Object.prototype.toString.call(options) === '[object Object]'){
            _options = options;
        }

        this.settings = $.extend({}, Dialog.defaults, _options);

        this.init();

    };

    Dialog.prototype = {

        /**
         * 初始化
         */
        init : function() {

            this.create();

            if (this.settings.lock) {
                this.lock();
            }

            if (!isNaN(this.settings.time)&&this.settings.time!=null) {
                this.time();
            }

        },

        /**
         * 创建
         */
        create : function() {
            var _this = this;

            // HTML模板
            var templates = '<div class="g-dialog g-dialog-common">' +
                            '<p class="g-dl-title">' +(this.settings.isHideClose ? '' : '<i class="g-dl-close"></i>') + this.settings.title + '</p>' +
                            '<div class="g-dl-body'+ (this.settings.dialogBodyClass? ' ' + this.settings.dialogBodyClass: '') +'">'+ this.settings.content +'</div>' +
                            (this.settings.noFooter? '': '<div class="g-dl-footer"></div>') +
                            '</div>';

            // 追回到body
            this.dialog = $(templates).css({ zIndex : this.settings.zIndex + (count++) }).prependTo('body');
            
            // 设置ok按钮
            if ($.isFunction(this.settings.ok)) {
                this.ok();
            }

            // 设置cancel按钮
            if ($.isFunction(this.settings.cancel)) {
                this.cancel();
            }
            

            //设置关闭按钮
            $('.g-dl-close').on('click', function(){
                _this.close();
            })

            // 设置大小
            this.size();

            // 设置位置
            this.position();

            //初始化之后回调函数
            if($.isFunction(this.settings.initCB)){
                this.settings.initCB();
            }

        },

        /**
         * ok
         */
        ok : function() {
            var _this = this,
                footer = this.dialog.find('.g-dl-footer');

            $('<a>', {
                href : 'javascript:;',
                text : this.settings.okText
            }).on("click", function() {
                var okCallback = _this.settings.ok();
                if (okCallback == undefined || okCallback) {
                    _this.close();
                }

            }).addClass('btn-confirm').appendTo(footer);

        },

        /**
         * cancel
         */
        cancel : function() {

            var _this = this,
                footer = this.dialog.find('.g-dl-footer');

            var $cancel = $('<a>', {
                href : 'javascript:;',
                text : this.settings.cancelText
            }).on("click",function() {
                var cancelCallback = _this.settings.cancel();
                if (cancelCallback == undefined || cancelCallback) {
                    _this.close();
                }
            }).addClass('btn-cancel');
            //按钮顺序颠倒
            if(!this.settings.reverse){
                $cancel.prependTo(footer);
            }
            else{
                $cancel.appendTo(footer);
            }
        },

        /**
         * 设置大小
         */
        size : function() {
            var rDialog = this.dialog;

            rDialog.css({
                width : this.settings.width,
                height : this.settings.height
            });
        },

        /**
         * 设置位置
         */
        position : function() {

            var _this = this,
                winWidth = win.width(),
                winHeight = win.height(),
                scrollTop = 0;

            this.dialog.css({
                left : this.settings.left || (winWidth - _this.dialog.width()) / 2,
                top : this.settings.top || (winHeight - _this.dialog.height()) / 2 + scrollTop
            });

        },

        /**
         * 设置锁屏
         */
        lock : function() {

            if (isLock){
                this.lock = $('.g-dialog-mask');//兼容弹出多个窗口
                return;
            }

            this.lock = $('<div>').css({ zIndex : this.settings.zIndex }).addClass('g-dialog-mask');
            this.lock.appendTo('body');

            isLock = true;

        },

        /**
         * 关闭锁屏
         */
        unLock : function() {
            if (this.settings.lock) {
                if (isLock && $('.g-dialog-common').length == 0) {//兼容弹出多个窗口
                    this.lock.remove();
                    isLock = false;
                }
            }
        },

        /**
         * 关闭方法
         */
        close : function() {
            this.dialog.remove();
            this.unLock();
            // 执行传入的close函数
            if ($.isFunction(this.settings.close)) {
                this.settings.close();
            }
        },

        /**
         * 定时关闭
         */
        time : function() {

            var _this = this;

            this.closeTimer = setTimeout(function() {
                _this.close();
            }, this.settings.time);

        },
        /**
         * 更新操作
         */
        update : function(){

        }
    };

    /**
     * 默认配置
     */
    Dialog.defaults = {

        // 内容
        content: '',

        // 标题
        title: '提示',

        // 宽度
        width: '480px',

        // 高度
        height: 'auto',

        //初始化回调函数
        initCB:null,

        // 确定按钮回调函数
        ok: null,

        // 取消按钮回调函数
        cancel: null,

        // 关闭执行函数
        close: null,

        // 确定按钮文字
        okText: '确定',

        // 取消按钮文字
        cancelText: '取消',

        //颠倒ok和cancel按钮的顺序
        reverse: false,

        // 自动关闭时间(毫秒)
        time: null,

        // 是否锁屏
        lock: true,

        // z-index值
        zIndex: 9999

    };

    var rDialog = function(options,okcb,cancelcb) {
        var dialog;

        if(dialog) {
            dialog.remove();
        }

        if($('.g-dialog').length > 0) {
            $('.g-dialog').remove();
        }

        return dialog || new Dialog(options,okcb,cancelcb);
    };

    window.rDialog = $.rDialog = $.dialog = rDialog;

})(window);
