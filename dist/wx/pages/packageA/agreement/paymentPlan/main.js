require("../../../../common/manifest.js")
require("../../../../common/vendor.js")
global.webpackJsonpMpvue([58],{

/***/ 179:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(180);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_2f618744_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(183);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(181)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-2f618744"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_2f618744_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\packageA\\agreement\\paymentPlan\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2f618744", Component.options)
  } else {
    hotAPI.reload("data-v-2f618744", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 181:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 182:
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




/* harmony default export */ __webpack_exports__["a"] = ({
    data: function data() {
        return {
            current: '回款计划',

            agreementData: {},
            totalAmount: '',
            surplusAmount: '',

            planList: {
                date: '',
                price: '',
                stage: '',
                remarks: '',
                remind_date: ''
            },
            nowDate: '',

            showStage: false,
            stageList: []
        };
    },
    mounted: function mounted() {
        this.loadData();
    },


    methods: {
        loadData: function loadData() {
            var info = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.agreementDetailData;
            var plan = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.payplanData;
            this.agreementData = info;
            this.totalAmount = info.amount;
            var surplus = new Number();
            plan.forEach(function (el) {
                surplus += el.price;
            });
            this.surplusAmount = this.totalAmount - surplus;

            if (!plan.length || plan.length == 0) {
                this.stageList = [{ name: '首笔款' }, { name: '阶段款' }, { name: '尾笔款' }];
            } else {
                this.stageList = [{ name: '阶段款' }, { name: '尾笔款' }];
            }

            this.planList = {
                date: '',
                price: '',
                stage: '',
                remarks: '',
                remind_date: ''
            };
        },
        handleInput: function handleInput(e, val) {
            if (val == 1) {
                this.planList.price = e.mp.detail;
            } else if (val == 2) {
                this.planList.date = e.target.value;
            } else if (val == 3) {
                this.planList.remind_date = e.mp.detail + ':00';
            } else if (val == 4) {
                this.planList.remarks = e.mp.detail;
            }
        },
        optionFocus: function optionFocus() {
            this.showStage = true;
        },
        stageChange: function stageChange(e) {
            var _this2 = this;

            var index = e.target.index;

            this.stageList.forEach(function (el, i) {
                if (i == index) {
                    _this2.planList.stage = el.name;
                }
            });
            this.showStage = false;
        },
        submitPayPlan: function submitPayPlan() {
            var _this = this;
            var data = {
                date: this.planList.date,
                price: this.planList.price,
                stage: this.planList.stage,
                contract_id: this.agreementData.contract_id,
                customerpool_id: this.agreementData.customerpool_id,
                remarks: this.planList.remarks,
                remind_date: this.planList.remind_date,
                pId: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.pId,
                secondid: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.second_id,
                deptid: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.private_deptid
            };
            var flag = false;
            if (!data.date) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '预计回款时间不能为空',
                    type: 'error'
                });
                flag = true;
            }
            if (!data.price) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '预计回款金额不能为空',
                    type: 'error'
                });
                flag = true;
            }
            if (!data.stage) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '回款阶段不能为空',
                    type: 'error'
                });
                flag = true;
            }
            if (data.price > this.surplusAmount) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '预计回款金额不能大于' + this.surplusAmount + '元',
                    type: 'error'
                });
                flag = true;
            }
            if (flag) return;

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'backPlan/saveOrUpdate.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    if (res.data.code && res.data.code == '200') {
                        Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Message"])({
                            content: '添加成功',
                            type: 'success'
                        });
                        _this.toAgreeDetail();
                    } else {
                        Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Message"])({
                            content: res.data.msg,
                            type: 'error'
                        });
                    }
                }
            });
        },
        toAgreeDetail: function toAgreeDetail() {
            wx.navigateBack({
                delta: 1
            });
        }
    }
});

/***/ }),

/***/ 183:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('i-panel', {
    attrs: {
      "title": " ",
      "mpcomid": '0'
    }
  }), _vm._v(" "), _c('i-panel', {
    attrs: {
      "title": _vm.agreementData.contract_name,
      "mpcomid": '9'
    }
  }, [_c('i-input', {
    attrs: {
      "title": "总金额",
      "right": "",
      "maxlength": "50",
      "disabled": "",
      "eventid": '0',
      "mpcomid": '1'
    },
    model: {
      value: (_vm.totalAmount),
      callback: function($$v) {
        _vm.totalAmount = $$v
      },
      expression: "totalAmount"
    }
  }), _vm._v(" "), _c('i-input', {
    attrs: {
      "title": "剩余预计回款金额",
      "right": "",
      "maxlength": "50",
      "disabled": "",
      "eventid": '1',
      "mpcomid": '2'
    },
    model: {
      value: (_vm.surplusAmount),
      callback: function($$v) {
        _vm.surplusAmount = $$v
      },
      expression: "surplusAmount"
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "回款阶段",
      "value": _vm.planList.stage,
      "is-link": "",
      "request": "",
      "i-class": "simple_cell",
      "i-cell-text": "color_495060_text",
      "eventid": '2',
      "mpcomid": '3'
    },
    on: {
      "click": _vm.optionFocus
    }
  }), _vm._v(" "), _c('i-input', {
    attrs: {
      "title": "预计回款金额",
      "right": "",
      "request": "",
      "maxlength": "50",
      "eventid": '3',
      "mpcomid": '4'
    },
    on: {
      "input": function($event) {
        _vm.handleInput($event, 1)
      }
    },
    model: {
      value: (_vm.planList.price),
      callback: function($$v) {
        _vm.planList.price = $$v
      },
      expression: "planList.price"
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "预计回款时间",
      "request": "",
      "is-link": "",
      "i-class": "simple_cell",
      "i-cell-text": "color_495060_text",
      "mpcomid": '5'
    }
  }, [_c('picker', {
    attrs: {
      "mode": "date",
      "value": _vm.planList.date,
      "start": _vm.nowDate,
      "eventid": '4'
    },
    on: {
      "change": function($event) {
        _vm.handleInput($event, 2)
      }
    },
    slot: "footer"
  }, [_c('view', {
    staticClass: "picker cell_picker"
  }, [_vm._v("\n                " + _vm._s(_vm.planList.date) + "\n                ")])])], 1), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "提醒时间",
      "is-link": "",
      "i-class": "simple_cell",
      "i-cell-text": "color_495060_text",
      "mpcomid": '7'
    }
  }, [_c('i-datetime-picker', {
    staticClass: "cell_picker",
    attrs: {
      "value": _vm.planList.remind_date,
      "eventid": '5',
      "mpcomid": '6'
    },
    on: {
      "change": function($event) {
        _vm.handleInput($event, 3)
      }
    },
    slot: "footer"
  })], 1), _vm._v(" "), _c('i-input', {
    attrs: {
      "title": "备注",
      "right": "",
      "type": "textarea",
      "maxlength": "200",
      "eventid": '6',
      "mpcomid": '8'
    },
    on: {
      "input": function($event) {
        _vm.handleInput($event, 4)
      }
    },
    model: {
      value: (_vm.planList.remarks),
      callback: function($$v) {
        _vm.planList.remarks = $$v
      },
      expression: "planList.remarks"
    }
  })], 1), _vm._v(" "), _c('p', {
    staticClass: "request_tip"
  }, [_c('span', {
    staticStyle: {
      "color": "#f56c6c"
    }
  }, [_vm._v(" * ")]), _vm._v("为必填项")]), _vm._v(" "), _c('i-button', {
    staticClass: "bottom_btn",
    attrs: {
      "type": "ghost",
      "long": true,
      "eventid": '7',
      "mpcomid": '10'
    },
    on: {
      "click": _vm.submitPayPlan
    }
  }, [_vm._v("确定")]), _vm._v(" "), _c('i-action-sheet', {
    attrs: {
      "visible": _vm.showStage,
      "actions": _vm.stageList,
      "eventid": '8',
      "mpcomid": '11'
    },
    on: {
      "change": _vm.stageChange
    }
  }), _vm._v(" "), _c('i-toast', {
    attrs: {
      "id": "toast",
      "mpcomid": '12'
    }
  }), _vm._v(" "), _c('i-message', {
    attrs: {
      "id": "message",
      "mpcomid": '13'
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
     require("vue-hot-reload-api").rerender("data-v-2f618744", esExports)
  }
}

/***/ })

},[179]);