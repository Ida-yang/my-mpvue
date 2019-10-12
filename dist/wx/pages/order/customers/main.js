require("../../../common/manifest.js")
require("../../../common/vendor.js")
global.webpackJsonpMpvue([73],{

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(105);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_1062a342_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(108);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(106)
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_1062a342_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\order\\customers\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1062a342", Component.options)
  } else {
    hotAPI.reload("data-v-1062a342", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 106:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 107:
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




/* harmony default export */ __webpack_exports__["a"] = ({
    data: function data() {
        return {
            current: '选择客户',

            poolName: '',
            page: 1,
            limit: 15,
            init: true,
            noMore: false,

            cheakItem: '',
            poolNameID: '',
            ascriptionId: '',
            itemList: [],

            poolNameData: [],

            taxRate: '',
            discount: ''
        };
    },
    mounted: function mounted() {
        this.init = true;
        this.noMore = false;
        this.page = 1;
        this.itemList = [];
        this.cheakItem = '';
        this.poolNameID = '';
        this.ascriptionId = '';
        this.loadData();
    },

    // 触底加载
    onReachBottom: function onReachBottom() {
        // console.log('碰到底部啦')
        this.page += 1;
        if (this.noMore == false) {
            this.loadData();
        } else {
            return;
        }
    },


    methods: {
        loadData: function loadData() {
            var _this = this;
            var newArr = new Array();
            var data = {
                page: this.page,
                limit: 15,
                searchName: this.poolName
            };

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'customerpool/query.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    var info = res.data.map.success;
                    if (_this.init === true) {
                        _this.poolNameData = info;
                        _this.init = false;
                        // console.log('我的第一次加载')
                    } else {
                        _this.poolNameData = _this.poolNameData.concat(info);
                        // console.log('我不是第一次加载了')
                        if (info.length < 15) {
                            _this.noMore = true;
                        }
                    }

                    info.forEach(function (el) {
                        newArr.push({ id: el.id, name: el.pName });
                    });

                    _this.itemList = _this.itemList.concat(newArr);
                }
            });
        },
        search: function search(e) {
            this.init = true;
            this.noMore = false;
            this.page = 1;
            this.itemList = [];
            this.cheakItem = '';
            this.poolNameID = '';
            this.ascriptionId = '';
            this.poolName = e.mp.detail;
            this.loadData();
        },
        changeItem: function changeItem(e) {
            var _this2 = this;

            var label = e.target.label;
            this.cheakItem = e.target.value;
            this.poolNameData.forEach(function (a) {
                if (label == a.id) {
                    _this2.poolNameID = label;
                    _this2.ascriptionId = a.privateUser[0].private_id;
                    if (a.discount) {
                        _this2.discount = a.discount;
                    } else {
                        _this2.discount = '100';
                    }
                    if (a.taxRate) {
                        _this2.taxRate = a.taxRate;
                    } else {
                        _this2.taxRate = '0';
                    }
                }
            });
        },
        clickpoolName: function clickpoolName() {
            __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.orderPoolNameData = {
                poolName: this.cheakItem,
                poolNameID: this.poolNameID,
                ascriptionId: this.ascriptionId,
                taxRate: this.taxRate,
                discount: this.discount
            };

            wx.navigateBack({
                delta: 1
            });
        }
    }
});

/***/ }),

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "add_or_update_wrap"
  }, [_c('i-input', {
    attrs: {
      "value": _vm.poolName,
      "type": "text",
      "maxlength": "50",
      "placeholder": "输入公司名称查询",
      "eventid": '0',
      "mpcomid": '0'
    },
    on: {
      "input": _vm.search
    }
  }), _vm._v(" "), _c('i-radio-group', {
    attrs: {
      "current": _vm.cheakItem,
      "eventid": '1',
      "mpcomid": '2'
    },
    on: {
      "change": _vm.changeItem
    }
  }, _vm._l((_vm.itemList), function(item, index) {
    return _c('i-radio', {
      key: item.id,
      attrs: {
        "position": "right",
        "value": item.name,
        "label": item.id,
        "mpcomid": '1_' + index
      }
    })
  })), _vm._v(" "), _c('i-button', {
    staticClass: "bottom_btn",
    attrs: {
      "type": "ghost",
      "long": true,
      "eventid": '2',
      "mpcomid": '3'
    },
    on: {
      "click": _vm.clickpoolName
    }
  }, [_vm._v("确定")]), _vm._v(" "), _c('i-toast', {
    attrs: {
      "id": "toast",
      "mpcomid": '4'
    }
  }), _vm._v(" "), _c('i-message', {
    attrs: {
      "id": "message",
      "mpcomid": '5'
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
     require("vue-hot-reload-api").rerender("data-v-1062a342", esExports)
  }
}

/***/ })

},[104]);