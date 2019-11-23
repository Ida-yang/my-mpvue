require("../../../common/manifest.js")
require("../../../common/vendor.js")
global.webpackJsonpMpvue([80],{

/***/ 32:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(33);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_644f0d03_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(36);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(34)
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_644f0d03_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\approval\\clue-item\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-644f0d03", Component.options)
  } else {
    hotAPI.reload("data-v-644f0d03", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 34:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 35:
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




/* harmony default export */ __webpack_exports__["a"] = ({
    data: function data() {
        return {
            msg: '分配给我的线索',

            tableData: [],
            totalAmount: '',

            searchList: {
                example: '1',
                powerid: '12'
            },
            timeList: [{ label: '0', name: '全部' }, { label: '1', name: '待跟进' }, { label: '2', name: '已跟进' }],
            timeActive: '1',
            powerList: [{ label: '12', name: '我的' }, { label: '13', name: '本组' }, { label: '14', name: '本机构' }],
            powerActive: '12',

            firstItem: '待跟进',
            secondItem: '我的',

            showFirst: false,
            showSecond: false
        };
    },
    onShow: function onShow() {
        this.loadData();
    },

    // 下拉刷新
    onPullDownRefresh: function onPullDownRefresh() {
        this.loadData();
    },


    methods: {
        loadData: function loadData() {
            var _this = this;
            var data = {
                example: this.searchList.example
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
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'customerTwo/selectDistributionClue.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    var info = res.data;

                    info.forEach(function (el) {
                        if (el.followTime) {
                            el.last_time = el.followTime.substring(0, 10);
                        } else {
                            el.last_time = '';
                        }
                    });
                    _this.tableData = info;
                    wx.stopPullDownRefresh();
                }
            });
        },
        changeBar: function changeBar(e) {
            var key = e.target.key;
            if (key == 'first') {
                this.showFirst = !this.showFirst;
                this.showSecond = false;
            } else if (key == 'second') {
                this.showSecond = !this.showSecond;
                this.showFirst = false;
            }
        },
        changeItem: function changeItem(e, item, val) {
            if (val == 1) {
                this.searchList.example = item.label;
                this.timeActive = item.label;
                this.firstItem = item.name;
                this.showFirst = false;
            } else if (val == 2) {
                this.searchList.powerid = item.label;
                this.powerActive = item.label;
                this.secondItem = item.name;
                this.showSecond = false;
            }

            this.loadData();
        },
        toClue: function toClue(val) {
            var url = '../../packageA/clue/clueDetail/main';
            __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.clueDetailData = { id: val.id, name: val.name };
            global.mpvue.navigateTo({ url: url });
        }
    }
});

/***/ }),

/***/ 36:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "message_wrap"
  }, [_c('i-tabs', {
    attrs: {
      "i-class": "order_tabs",
      "eventid": '0',
      "mpcomid": '6'
    },
    on: {
      "change": _vm.changeBar
    }
  }, [_c('i-tab', {
    key: "first",
    attrs: {
      "title": _vm.firstItem,
      "mpcomid": '2'
    }
  }, [_vm._v("\n             \n            "), (_vm.showFirst) ? _c('i-icon', {
    attrs: {
      "type": "packup",
      "mpcomid": '1'
    }
  }) : _c('i-icon', {
    attrs: {
      "type": "unfold",
      "mpcomid": '0'
    }
  })], 1), _vm._v(" "), _c('i-tab', {
    key: "second",
    attrs: {
      "title": _vm.secondItem,
      "mpcomid": '5'
    }
  }, [_vm._v("\n             \n            "), (_vm.showSecond) ? _c('i-icon', {
    attrs: {
      "type": "packup",
      "mpcomid": '4'
    }
  }) : _c('i-icon', {
    attrs: {
      "type": "unfold",
      "mpcomid": '3'
    }
  })], 1)], 1), _vm._v(" "), (_vm.showFirst) ? _c('view', {
    staticClass: "bar_option"
  }, _vm._l((_vm.timeList), function(item, index) {
    return _c('p', {
      key: item.label,
      staticClass: "option_p",
      class: _vm.timeActive == item.label ? 'theme_color_text' : '',
      attrs: {
        "eventid": '1_' + index
      },
      on: {
        "click": function($event) {
          _vm.changeItem($event, item, 1)
        }
      }
    }, [_vm._v(_vm._s(item.name))])
  })) : _vm._e(), _vm._v(" "), (_vm.showSecond) ? _c('view', {
    staticClass: "bar_option"
  }, _vm._l((_vm.powerList), function(item, index) {
    return _c('p', {
      key: item.label,
      staticClass: "option_p",
      class: _vm.powerActive == item.label ? 'theme_color_text' : '',
      attrs: {
        "eventid": '2_' + index
      },
      on: {
        "click": function($event) {
          _vm.changeItem($event, item, 2)
        }
      }
    }, [_vm._v(_vm._s(item.name))])
  })) : _vm._e(), _vm._v(" "), _c('view', {
    staticClass: "detail_module"
  }), _vm._v(" "), _c('i-cell-group', {
    attrs: {
      "mpcomid": '8'
    }
  }, _vm._l((_vm.tableData), function(item, index) {
    return _c('i-cell', {
      key: item.id,
      attrs: {
        "title": item.name,
        "label": '上次：' + item.last_time,
        "i-class": "group_cell_content",
        "eventid": '3_' + index,
        "mpcomid": '7_' + index
      },
      on: {
        "click": function($event) {
          _vm.toClue(item)
        }
      }
    }, [_c('view', {
      staticClass: "group_cell_footer",
      slot: "footer"
    }, [_c('p', [_vm._v(_vm._s(item.distributionUser))]), _vm._v(" "), _c('p', [_vm._v(_vm._s('分配人员：' + item.preUser))])], 1)])
  }))], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-644f0d03", esExports)
  }
}

/***/ })

},[32]);