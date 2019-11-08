require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([77],{

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(43);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_6e9206ab_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(46);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(44)
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

/***/ 44:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 45:
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




/* harmony default export */ __webpack_exports__["a"] = ({
    data: function data() {
        return {
            msg: '待办',

            agreeLength: 0,
            callLength: 0,
            clueLength: 0,
            customerLength: 0,
            opportunityLength: 0,
            paybackLength: 0
        };
    },
    mounted: function mounted() {
        this.loadData();
    },


    methods: {
        loadData: function loadData() {
            var _this = this;
            var data1 = {
                example: '2',
                pId: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.pId
            };
            var data2 = {
                example: '1',
                pId: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.pId
            };
            var data3 = {
                example: '5',
                page: 1,
                limit: 99999999,
                pId: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.pId
            };

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'contract/examineInfo.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data1,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    _this.agreeLength = res.data.length;
                }
            });
            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'customerpool/selectCustomerpoolAndClue.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data2,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    _this.callLength = res.data.length;
                }
            });
            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'customerTwo/selectDistributionClue.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data2,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    _this.clueLength = res.data.length;
                }
            });
            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'customerpool/selectDistributionCspool.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data2,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    _this.customerLength = res.data.length;
                }
            });
            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'opportunity/query.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data3,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    _this.opportunityLength = res.data.length;
                }
            });
            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'back/examineInfo.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data1,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    _this.paybackLength = res.data.length;
                }
            });
        },
        tolink: function tolink(val) {
            var url = '';
            if (val == 1) {
                url = 'call-item/main';
                // url = '../packageA/call-item/main'
                global.mpvue.navigateTo({ url: url });
            } else if (val == 2) {
                url = 'clue-item/main';
                global.mpvue.navigateTo({ url: url });
            } else if (val == 3) {
                url = 'customer-item/main';
                global.mpvue.navigateTo({ url: url });
            } else if (val == 4) {
                url = 'opportunity-item/main';
                global.mpvue.navigateTo({ url: url });
            } else if (val == 5) {
                url = 'agreement-item/main';
                global.mpvue.navigateTo({ url: url });
            } else if (val == 6) {
                url = 'payback-item/main';
                global.mpvue.navigateTo({ url: url });
            }
        }
    }
});

/***/ }),

/***/ 46:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "approval_wrap"
  }, [_c('i-cell-group', {
    attrs: {
      "mpcomid": '12'
    }
  }, [_c('i-cell', {
    attrs: {
      "title": " 今日需联系",
      "is-link": "",
      "eventid": '0',
      "mpcomid": '1'
    },
    on: {
      "click": function($event) {
        _vm.tolink(1)
      }
    }
  }, [_c('i-badge', {
    attrs: {
      "count": _vm.callLength,
      "overflow-count": "99",
      "mpcomid": '0'
    },
    slot: "icon"
  }, [_c('view', {
    staticClass: "meaasge_icon_span",
    staticStyle: {
      "background-color": "rgb(104,150,245)"
    }
  }, [_c('image', {
    staticClass: "message_image",
    attrs: {
      "src": "../../static/images/jrxlx.png"
    }
  })])])], 1), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": " 分配给我的线索",
      "is-link": "",
      "eventid": '1',
      "mpcomid": '3'
    },
    on: {
      "click": function($event) {
        _vm.tolink(2)
      }
    }
  }, [_c('i-badge', {
    attrs: {
      "count": _vm.clueLength,
      "overflow-count": "99",
      "mpcomid": '2'
    },
    slot: "icon"
  }, [_c('view', {
    staticClass: "meaasge_icon_span",
    staticStyle: {
      "background-color": "rgb(255,156,46)"
    }
  }, [_c('image', {
    staticClass: "message_image",
    attrs: {
      "src": "../../static/images/xs.png"
    }
  })])])], 1), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": " 分配给我的客户",
      "is-link": "",
      "eventid": '2',
      "mpcomid": '5'
    },
    on: {
      "click": function($event) {
        _vm.tolink(3)
      }
    }
  }, [_c('i-badge', {
    attrs: {
      "count": _vm.customerLength,
      "overflow-count": "99",
      "mpcomid": '4'
    },
    slot: "icon"
  }, [_c('view', {
    staticClass: "meaasge_icon_span",
    staticStyle: {
      "background-color": "rgb(37,199,120)"
    }
  }, [_c('image', {
    staticClass: "message_image",
    attrs: {
      "src": "../../static/images/kh.png"
    }
  })])])], 1), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": " 异常商机信息",
      "is-link": "",
      "eventid": '3',
      "mpcomid": '7'
    },
    on: {
      "click": function($event) {
        _vm.tolink(4)
      }
    }
  }, [_c('i-badge', {
    attrs: {
      "count": _vm.opportunityLength,
      "overflow-count": "99",
      "mpcomid": '6'
    },
    slot: "icon"
  }, [_c('view', {
    staticClass: "meaasge_icon_span",
    staticStyle: {
      "background-color": "rgb(152,108,245)"
    }
  }, [_c('image', {
    staticClass: "message_image",
    attrs: {
      "src": "../../static/images/sj.png"
    }
  })])])], 1), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": " 待审核合同",
      "is-link": "",
      "eventid": '4',
      "mpcomid": '9'
    },
    on: {
      "click": function($event) {
        _vm.tolink(5)
      }
    }
  }, [_c('i-badge', {
    attrs: {
      "count": _vm.agreeLength,
      "overflow-count": "99",
      "mpcomid": '8'
    },
    slot: "icon"
  }, [_c('view', {
    staticClass: "meaasge_icon_span",
    staticStyle: {
      "background-color": "rgb(102,150,246)"
    }
  }, [_c('image', {
    staticClass: "message_image",
    attrs: {
      "src": "../../static/images/ht.png"
    }
  })])])], 1), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": " 待审核回款",
      "is-link": "",
      "eventid": '5',
      "mpcomid": '11'
    },
    on: {
      "click": function($event) {
        _vm.tolink(6)
      }
    }
  }, [_c('i-badge', {
    attrs: {
      "count": _vm.paybackLength,
      "overflow-count": "99",
      "mpcomid": '10'
    },
    slot: "icon"
  }, [_c('view', {
    staticClass: "meaasge_icon_span",
    staticStyle: {
      "background-color": "rgb(253,172,80)"
    }
  }, [_c('image', {
    staticClass: "message_image",
    attrs: {
      "src": "../../static/images/hk.png"
    }
  })])])], 1)], 1)], 1)
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

},[42]);