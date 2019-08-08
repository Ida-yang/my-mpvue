require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([32],{

/***/ 228:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(229);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 229:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_5bd85957_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(232);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(230)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_5bd85957_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\login\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5bd85957", Component.options)
  } else {
    hotAPI.reload("data-v-5bd85957", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 230:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 231:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["a"] = ({
    data: function data() {
        return {
            current: '云纵CRM系统管理平台',
            account: '',
            password: ''
        };
    },


    methods: {
        handinput: function handinput(e, val) {
            if (val === 1) {
                this.account = e.mp.detail;
            } else if (val === 2) {
                this.password = e.mp.detail;
            }
        },
        toLogin: function toLogin() {
            var _this = this;
            var data = {
                public_username: this.account,
                public_password: this.password
            };

            var flag = false;
            if (!data.public_password) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '登录密码不能为空',
                    type: 'error'
                });
                flag = true;
            }
            if (!data.public_username) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '登录账号不能为空',
                    type: 'error'
                });
                flag = true;
            }
            if (flag) return;

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'tologin.do', //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                success: function success(res) {
                    if (res.data.code && res.data.code == "200") {
                        Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Message"])({
                            content: '登录成功',
                            type: 'success'
                        });
                        var info = res.data.map.success;
                        if (info.imgUrl) {
                            info.portrait = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].sourcehost + 'upload/' + info.cId + '/' + info.imgUrl;
                        } else {
                            info.portrait = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].sourcehost + 'upload/staticImg/avatar.jpg';
                        }
                        __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData = info;
                        var cookie = res.header["Set-Cookie"];
                        var sessionPos = cookie.indexOf(",");
                        var JSESSIONID = cookie.substring(0, sessionPos);
                        var rememberMe = cookie.substring(sessionPos + 1);
                        if (JSESSIONID !== undefined && JSESSIONID !== null) {
                            var startPos = JSESSIONID.indexOf("JSESSIONID=");
                            var endPos = JSESSIONID.indexOf(";");
                            if (startPos != -1) {
                                __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID = JSESSIONID.substring(startPos, endPos);
                            }
                        }
                        if (rememberMe !== undefined && rememberMe !== null) {
                            var sessionRem = rememberMe.indexOf("rememberMe=");
                            if (sessionRem != -1) {
                                __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].rememberMe = rememberMe;
                            }
                        }
                        _this.setLocalStorage();
                        _this.toIndex();
                    } else {
                        Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Message"])({
                            content: res.data.msg,
                            type: 'error'
                        });
                    }
                }
            });
        },
        toExperience: function toExperience() {
            var _this = this;
            var data = {
                public_username: '18933916278',
                public_password: '123456'
            };

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'tologin.do', //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                success: function success(res) {
                    if (res.data.code && res.data.code == "200") {
                        Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Message"])({
                            content: '登录成功',
                            type: 'success'
                        });
                        var info = res.data.map.success;
                        if (info.imgUrl) {
                            info.portrait = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].sourcehost + 'upload/' + info.cId + '/' + info.imgUrl;
                        } else {
                            info.portrait = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].sourcehost + 'upload/staticImg/avatar.jpg';
                        }
                        __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData = info;
                        var cookie = res.header["Set-Cookie"];
                        var sessionPos = cookie.indexOf(",");
                        var JSESSIONID = cookie.substring(0, sessionPos);
                        var rememberMe = cookie.substring(sessionPos + 1);
                        if (JSESSIONID !== undefined && JSESSIONID !== null) {
                            var startPos = JSESSIONID.indexOf("JSESSIONID=");
                            var endPos = JSESSIONID.indexOf(";");
                            if (startPos != -1) {
                                __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID = JSESSIONID.substring(startPos, endPos);
                            }
                        }
                        if (rememberMe !== undefined && rememberMe !== null) {
                            var sessionRem = rememberMe.indexOf("rememberMe=");
                            if (sessionRem != -1) {
                                __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].rememberMe = rememberMe;
                            }
                        }
                        _this.toIndex();
                    } else {
                        Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Message"])({
                            content: res.data.msg,
                            type: 'error'
                        });
                    }
                }
            });
        },
        setLocalStorage: function setLocalStorage() {
            wx.setStorage({
                key: "yzCRMaccount",
                data: [this.account, this.password]
            });
        },
        getLocalStorage: function getLocalStorage() {
            var _this = this;
            wx.getStorage({
                key: 'yzCRMaccount',
                success: function success(res) {
                    _this.account = res.data[0];
                    _this.password = res.data[1];
                }
            });
        },
        toIndex: function toIndex() {
            var url = '../index/main';
            if (global.mpvuePlatform === 'wx') {
                global.mpvue.switchTab({ url: url });
            } else {
                global.mpvue.navigateTo({ url: url });
            }
        }
    },
    created: function created() {
        // console.log('page index created', this)
    },
    mounted: function mounted() {
        // console.log('mounted', this)
    },
    onLoad: function onLoad() {
        // console.log('page index onLoad', this)
    },
    onReady: function onReady() {
        // console.log('page index onReady', this)
    },
    onShow: function onShow() {
        // console.log('onShow', this)
        this.getLocalStorage();
    },
    onUnload: function onUnload() {
        // console.log('onUnload', this)
    },
    onHide: function onHide() {
        // console.log('onHide', this)
    }
});

/***/ }),

/***/ 232:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('view', {
    staticClass: "login_content"
  }, [_c('view', {
    staticClass: "login_view"
  }, [_c('image', {
    staticClass: "login_logo",
    staticStyle: {
      "width": "80px",
      "height": "80px"
    },
    attrs: {
      "src": "../../static/images/logo.png"
    }
  }), _vm._v(" "), _c('i-input', {
    attrs: {
      "value": _vm.account,
      "type": "text",
      "maxlength": "11",
      "right": "",
      "title": "登录账号",
      "mode": "wrapped",
      "i-class": "login_input",
      "eventid": '0',
      "mpcomid": '0'
    },
    on: {
      "input": function($event) {
        _vm.handinput($event, 1)
      }
    }
  }), _vm._v(" "), _c('i-input', {
    attrs: {
      "value": _vm.password,
      "type": "password",
      "maxlength": "16",
      "right": "",
      "title": "登录密码",
      "mode": "wrapped",
      "i-class": "login_input",
      "eventid": '1',
      "mpcomid": '1'
    },
    on: {
      "input": function($event) {
        _vm.handinput($event, 2)
      }
    }
  }), _vm._v(" "), _c('view', {
    staticClass: "login_submit"
  }, [_c('i-button', {
    attrs: {
      "type": "ghost",
      "i-class": "login_btn",
      "eventid": '2',
      "mpcomid": '2'
    },
    on: {
      "click": _vm.toLogin
    }
  }, [_vm._v("登录")]), _vm._v(" "), _c('i-button', {
    attrs: {
      "type": "ghost",
      "i-class": "experience_btn",
      "eventid": '3',
      "mpcomid": '3'
    },
    on: {
      "click": _vm.toExperience
    }
  }, [_vm._v("体验")])], 1), _vm._v(" "), _c('i-message', {
    attrs: {
      "id": "message",
      "mpcomid": '4'
    }
  }), _vm._v(" "), _c('i-toast', {
    attrs: {
      "id": "toast",
      "mpcomid": '5'
    }
  })], 1)])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5bd85957", esExports)
  }
}

/***/ })

},[228]);