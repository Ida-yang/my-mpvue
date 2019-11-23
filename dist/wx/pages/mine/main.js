require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([71],{

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(120);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_47a9ff3b_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(123);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(121)
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_47a9ff3b_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\mine\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-47a9ff3b", Component.options)
  } else {
    hotAPI.reload("data-v-47a9ff3b", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 121:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 122:
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
            current: '我的',

            mineData: {},

            phoneVisible: false
        };
    },
    onShow: function onShow() {
        this.loadData();
    },


    methods: {
        loadData: function loadData() {
            var info = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData;
            this.mineData = info;
        },
        showPhone: function showPhone() {
            this.phoneVisible = true;
        },
        closePhone: function closePhone() {
            this.phoneVisible = false;
        },
        serviceCall: function serviceCall() {
            var phoneNum = '020-38880730';
            wx.makePhoneCall({
                phoneNumber: phoneNum
            });
        },
        toOpen: function toOpen() {
            Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                content: '付费另外开通',
                type: 'warning'
            });
        },
        toAddressBook: function toAddressBook() {
            var url = 'addressbook/main';
            global.mpvue.navigateTo({ url: url });
        },
        toPassword: function toPassword() {
            var url = 'password/main';
            global.mpvue.navigateTo({ url: url });
        },
        toEdition: function toEdition() {
            var url = 'edition/main';
            global.mpvue.navigateTo({ url: url });
        }
    }
});

/***/ }),

/***/ 123:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "mine_wrap"
  }, [_c('view', {
    staticClass: "mine_user_data"
  }, [_c('view', {
    staticClass: "mine_info"
  }, [_c('image', {
    staticClass: "mine_portrait",
    attrs: {
      "src": _vm.mineData.portrait
    }
  }), _vm._v(" "), _c('view', {
    staticClass: "mine_data"
  }, [_c('p', [_vm._v(_vm._s(_vm.mineData.name)), _c('span', {
    staticStyle: {
      "margin-left": "50px"
    }
  }, [_vm._v(_vm._s(_vm.mineData.role_name))])]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.mineData.corporate_name))]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.mineData.private_phone))])], 1)]), _vm._v(" "), _c('view', {
    staticClass: "mine_communicate"
  }, [_c('view', {
    staticClass: "mine_card",
    attrs: {
      "eventid": '0'
    },
    on: {
      "click": _vm.toAddressBook
    }
  }, [_c('i-icon', {
    attrs: {
      "type": "addressbook",
      "size": "26",
      "color": "#8a8a8a",
      "mpcomid": '0'
    }
  }), _vm._v(" "), _c('p', [_vm._v("通讯录")])], 1), _vm._v(" "), _c('view', {
    staticClass: "mine_card",
    attrs: {
      "eventid": '1'
    },
    on: {
      "click": _vm.toOpen
    }
  }, [_c('i-icon', {
    attrs: {
      "type": "group",
      "size": "26",
      "color": "#707070",
      "mpcomid": '1'
    }
  }), _vm._v(" "), _c('p', [_vm._v("人脉")])], 1), _vm._v(" "), _c('view', {
    staticClass: "mine_card",
    attrs: {
      "eventid": '2'
    },
    on: {
      "click": _vm.toOpen
    }
  }, [_c('i-icon', {
    attrs: {
      "type": "businesscard",
      "size": "26",
      "color": "#8a8a8a",
      "mpcomid": '2'
    }
  }), _vm._v(" "), _c('p', [_vm._v("名片")])], 1)])]), _vm._v(" "), _c('view', {
    staticClass: "detail_module"
  }), _vm._v(" "), _c('i-cell-group', {
    attrs: {
      "mpcomid": '11'
    }
  }, [_c('i-cell', {
    attrs: {
      "title": "个人资料",
      "is-link": "",
      "mpcomid": '4'
    }
  }, [_c('i-icon', {
    attrs: {
      "type": "mine",
      "size": "20",
      "color": "#8a8a8a",
      "mpcomid": '3'
    },
    slot: "icon"
  })], 1), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "修改密码",
      "is-link": "",
      "eventid": '3',
      "mpcomid": '6'
    },
    on: {
      "click": _vm.toPassword
    }
  }, [_c('i-icon', {
    attrs: {
      "type": "lock",
      "size": "20",
      "color": "#707070",
      "mpcomid": '5'
    },
    slot: "icon"
  })], 1), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "技术支持",
      "eventid": '4',
      "mpcomid": '8'
    },
    on: {
      "click": _vm.showPhone
    }
  }, [_c('i-icon', {
    attrs: {
      "type": "mail",
      "size": "20",
      "color": "#8a8a8a",
      "mpcomid": '7'
    },
    slot: "icon"
  })], 1), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "版本信息",
      "is-link": "",
      "eventid": '5',
      "mpcomid": '10'
    },
    on: {
      "click": _vm.toEdition
    }
  }, [_c('i-icon', {
    attrs: {
      "type": "prompt",
      "size": "20",
      "color": "#707070",
      "mpcomid": '9'
    },
    slot: "icon"
  })], 1)], 1), _vm._v(" "), _c('i-modal', {
    attrs: {
      "visible": _vm.phoneVisible,
      "eventid": '6',
      "mpcomid": '12'
    },
    on: {
      "ok": _vm.serviceCall,
      "cancel": _vm.closePhone
    }
  }, [_c('view', [_c('p', [_vm._v("客户服务热线")]), _vm._v(" "), _c('p', [_vm._v("020-38880730")])], 1)]), _vm._v(" "), _c('i-toast', {
    attrs: {
      "id": "toast",
      "mpcomid": '13'
    }
  }), _vm._v(" "), _c('i-message', {
    attrs: {
      "id": "message",
      "mpcomid": '14'
    }
  })], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-47a9ff3b", esExports)
  }
}

/***/ })

},[119]);