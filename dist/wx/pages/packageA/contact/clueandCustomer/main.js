require("../../../../common/manifest.js")
require("../../../../common/vendor.js")
global.webpackJsonpMpvue([44],{

/***/ 254:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(255);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 255:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_7ff0b121_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(258);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(256)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-7ff0b121"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_7ff0b121_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\packageA\\contact\\clueandCustomer\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7ff0b121", Component.options)
  } else {
    hotAPI.reload("data-v-7ff0b121", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 256:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 257:
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




/* harmony default export */ __webpack_exports__["a"] = ({
    data: function data() {
        return {
            current: '新增联系人',

            poolName: '',
            itemData: [],

            cheakItem: '',
            customerTwosID: '',
            customerpoolsID: '',
            itemList: [],

            customerTwos: [],
            customerpools: []
        };
    },
    mounted: function mounted() {
        this.loadData();
    },


    methods: {
        loadData: function loadData() {
            var _this = this;
            this.itemList = [];
            var data = {
                page: 1,
                limit: 10,
                pId: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.pId,
                searchName: this.poolName
            };

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'rightPoolName.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    var info = res.data.map.success;
                    var datas = info.customerTwos.concat(info.customerpools);
                    _this.customerTwos = info.customerTwos;
                    _this.customerpools = info.customerpools;
                    datas.forEach(function (el) {
                        _this.itemList.push({ id: el.id, name: el.name });
                    });
                }
            });
        },
        search: function search(e) {
            this.poolName = e.mp.detail;
            this.loadData();
        },
        changeItem: function changeItem(e) {
            var _this2 = this;

            var label = e.target.label;
            this.cheakItem = e.target.value;
            this.customerTwos.forEach(function (a) {
                if (label == a.id) {
                    console.log('线索的');
                    _this2.customerTwosID = label;
                    _this2.customerpoolsID = '';
                }
            });
            this.customerpools.forEach(function (b) {
                if (label == b.id) {
                    console.log('客户的');
                    _this2.customerpoolsID = label;
                    _this2.customerTwosID = '';
                }
            });
        },
        clickpoolName: function clickpoolName() {
            __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.contactPoolNameData = {
                poolName: this.cheakItem,
                customeroneId: this.customerTwosID,
                customerpool_id: this.customerpoolsID
            };

            wx.navigateBack({
                delta: 1
            });
        }
    }
});

/***/ }),

/***/ 258:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('i-input', {
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
     require("vue-hot-reload-api").rerender("data-v-7ff0b121", esExports)
  }
}

/***/ })

},[254]);