require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([12],{

/***/ 319:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(320);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 320:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_9aaf55e6_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(323);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(321)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-9aaf55e6"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_9aaf55e6_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\outwork\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9aaf55e6", Component.options)
  } else {
    hotAPI.reload("data-v-9aaf55e6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 321:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 322:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(2);
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
    data: function data() {
        return {
            current: '外勤',

            init: true,
            noMore: false,
            tableData: [],

            searchList: {
                searchName: '',
                state: '',
                example: '',
                powerid: '12',
                page: 1,
                limit: 10
            }
        };
    },
    onShow: function onShow() {
        this.init = true;
        this.noMore = false;
        this.searchList.page = 1;
        this.loadData();
    },

    // 触底加载
    onReachBottom: function onReachBottom() {
        // console.log('碰到底部啦')
        this.searchList.page = this.searchList.page + 1;
        if (this.noMore == false) {
            this.loadData();
        }
    },

    // 下拉刷新
    onPullDownRefresh: function onPullDownRefresh() {
        this.init = true;
        this.noMore = false;
        this.searchList.page = 1;
        this.loadData();
    },


    methods: {
        loadData: function loadData() {
            var _this = this;
            var data = {
                searchName: this.searchList.searchName,
                state: this.searchList.state,
                example: this.searchList.example,
                page: this.searchList.page,
                limit: this.searchList.limit
            };
            if (this.searchList.powerid == '11') {
                data.pId = '';
            } else if (this.searchList.powerid == '12') {
                data.pId = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.pId;
            } else if (this.searchList.powerid == '13') {
                data.secondid = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.second_id;
            } else if (this.searchList.powerid == '14') {
                data.deptid = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.private_deptid;
            }
            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'isit/selectVisit.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    var info = res.data.map.success;
                    if (_this.init === true) {
                        _this.tableData = info;
                        _this.init = false;
                        // console.log('我的第一次加载')
                        wx.stopPullDownRefresh();
                    } else {
                        _this.tableData = _this.tableData.concat(info);
                        // console.log('我不是第一次加载了')
                        if (info.length < 10) {
                            _this.noMore = true;
                        }
                    }

                    _this.tableData.forEach(function (el) {
                        if (el.checkStatus == 0) {
                            el.auditStatus = '未审核';
                        } else if (el.checkStatus == 1) {
                            el.auditStatus = '审核中';
                        } else if (el.checkStatus == 2) {
                            el.auditStatus = '已审核';
                        } else if (el.checkStatus == 3) {
                            el.auditStatus = '未通过';
                        }
                    });
                }
            });
        }
    }
});

/***/ }),

/***/ 323:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('i-panel', {
    attrs: {
      "title": _vm.current,
      "mpcomid": '0'
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
     require("vue-hot-reload-api").rerender("data-v-9aaf55e6", esExports)
  }
}

/***/ })

},[319]);