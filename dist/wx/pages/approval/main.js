require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([81],{

/***/ 22:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(23);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 23:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_6e9206ab_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(26);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(24)
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_6e9206ab_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\approval\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6e9206ab", Component.options)
  } else {
    hotAPI.reload("data-v-6e9206ab", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 24:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 25:
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




/* harmony default export */ __webpack_exports__["a"] = ({
    data: function data() {
        return {
            msg: '消息'
        };
    },


    methods: {
        tolink: function tolink(val) {
            var url = '';
            if (val == 1) {
                url = '../packageA/call-item/main';
                global.mpvue.navigateTo({ url: url });
            } else if (val == 2) {
                url = '../packageA/clue-item/main';
                global.mpvue.navigateTo({ url: url });
            } else if (val == 3) {
                url = '../packageA/customer-item/main';
                global.mpvue.navigateTo({ url: url });
            } else if (val == 4) {
                url = '../packageA/opportunity-item/main';
                global.mpvue.navigateTo({ url: url });
            } else if (val == 5) {
                url = '../packageA/agreement-item/main';
                global.mpvue.navigateTo({ url: url });
            } else if (val == 6) {
                url = '../packageA/payback-item/main';
                global.mpvue.navigateTo({ url: url });
            }
        }
    }
});

/***/ }),

/***/ 26:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "approval_wrap"
  }, [_c('i-cell-group', {
    attrs: {
      "mpcomid": '6'
    }
  }, [_c('i-cell', {
    attrs: {
      "title": " 今日需联系",
      "is-link": "",
      "eventid": '0',
      "mpcomid": '0'
    },
    on: {
      "click": function($event) {
        _vm.tolink(1)
      }
    }
  }, [_c('view', {
    staticClass: "meaasge_icon_span",
    staticStyle: {
      "background-color": "rgb(104,150,245)"
    },
    slot: "icon"
  }, [_c('image', {
    staticClass: "message_image",
    attrs: {
      "src": "../../static/images/jrxlx.png"
    }
  })])]), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": " 分配给我的线索",
      "is-link": "",
      "eventid": '1',
      "mpcomid": '1'
    },
    on: {
      "click": function($event) {
        _vm.tolink(2)
      }
    }
  }, [_c('view', {
    staticClass: "meaasge_icon_span",
    staticStyle: {
      "background-color": "rgb(255,156,46)"
    },
    slot: "icon"
  }, [_c('image', {
    staticClass: "message_image",
    attrs: {
      "src": "../../static/images/xs.png"
    }
  })])]), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": " 分配给我的客户",
      "is-link": "",
      "eventid": '2',
      "mpcomid": '2'
    },
    on: {
      "click": function($event) {
        _vm.tolink(3)
      }
    }
  }, [_c('view', {
    staticClass: "meaasge_icon_span",
    staticStyle: {
      "background-color": "rgb(37,199,120)"
    },
    slot: "icon"
  }, [_c('image', {
    staticClass: "message_image",
    attrs: {
      "src": "../../static/images/kh.png"
    }
  })])]), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": " 异常商机信息",
      "is-link": "",
      "eventid": '3',
      "mpcomid": '3'
    },
    on: {
      "click": function($event) {
        _vm.tolink(4)
      }
    }
  }, [_c('view', {
    staticClass: "meaasge_icon_span",
    staticStyle: {
      "background-color": "rgb(152,108,245)"
    },
    slot: "icon"
  }, [_c('image', {
    staticClass: "message_image",
    attrs: {
      "src": "../../static/images/sj.png"
    }
  })])]), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": " 待审核合同",
      "is-link": "",
      "eventid": '4',
      "mpcomid": '4'
    },
    on: {
      "click": function($event) {
        _vm.tolink(5)
      }
    }
  }, [_c('view', {
    staticClass: "meaasge_icon_span",
    staticStyle: {
      "background-color": "rgb(102,150,246)"
    },
    slot: "icon"
  }, [_c('image', {
    staticClass: "message_image",
    attrs: {
      "src": "../../static/images/ht.png"
    }
  })])]), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": " 待审核回款",
      "is-link": "",
      "eventid": '5',
      "mpcomid": '5'
    },
    on: {
      "click": function($event) {
        _vm.tolink(6)
      }
    }
  }, [_c('view', {
    staticClass: "meaasge_icon_span",
    staticStyle: {
      "background-color": "rgb(253,172,80)"
    },
    slot: "icon"
  }, [_c('image', {
    staticClass: "message_image",
    attrs: {
      "src": "../../static/images/hk.png"
    }
  })])])], 1)], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6e9206ab", esExports)
  }
}

/***/ })

},[22]);