require("../../../common/manifest.js")
require("../../../common/vendor.js")
global.webpackJsonpMpvue([59],{

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(58);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_99937886_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(61);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(59)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-99937886"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_99937886_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\agreement\\paymentInfo\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-99937886", Component.options)
  } else {
    hotAPI.reload("data-v-99937886", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 59:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 60:
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




/* harmony default export */ __webpack_exports__["a"] = ({
    data: function data() {
        return {
            current: '回款信息',

            agreementData: {},
            totalAmount: '',
            surplusAmount: '',

            backList: {
                createTime: '',
                price: '',
                back_plan_id: '',
                back_plan_name: '',
                pay_type_id: '',
                pay_type_name: '',
                remarks: ''
            },
            nowDate: '',

            showStage: false,
            stageList: [],
            showPayType: false,
            payTypeList: []
        };
    },
    mounted: function mounted() {
        this.loadData();
        this.loadPayType();
    },


    methods: {
        loadData: function loadData() {
            var _this2 = this;

            var info = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.agreementDetailData;
            var back = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.payinfoData;
            this.agreementData = info;
            this.totalAmount = info.amount;

            var surplus = new Number();
            back.forEach(function (el) {
                surplus += el.price;
            });
            this.surplusAmount = this.totalAmount - surplus;

            var plan = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.payplanData;
            this.stageList = [];
            plan.forEach(function (el) {
                _this2.stageList.push({ id: el.id, name: el.stage });
            });

            this.backList = {
                createTime: '',
                price: '',
                back_plan_id: '',
                back_plan_name: '',
                remarks: '',
                pay_type_id: '',
                pay_type_name: ''
            };
        },
        loadPayType: function loadPayType() {
            var _this = this;
            this.payTypeList = [];
            var data = {
                type: '收款方式'
            };

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'typeInfo/getTypeInfoGroupByType.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    var info = res.data;
                    info.forEach(function (el) {
                        _this.payTypeList.push({ id: el.id, name: el.typeName });
                    });
                }
            });
        },
        optionFocus: function optionFocus(e, val) {
            console.log(e, val);
            if (val == 1) {
                this.showStage = true;
            } else if (val == 2) {
                this.showPayType = true;
            }
        },
        handleInput: function handleInput(e, val) {
            console.log(e, val);
            if (val == 1) {
                this.backList.price = e.mp.detail;
            } else if (val == 2) {
                this.backList.createTime = e.target.value;
            } else if (val == 3) {
                this.backList.remarks = e.mp.detail;
            }
        },
        itemChange: function itemChange(e, val) {
            console.log(e, val);
            var _this = this;
            var index = e.target.index;
            if (val == 1) {
                this.stageList.forEach(function (a, i) {
                    if (i == index) {
                        _this.backList.back_plan_id = a.id;
                        _this.backList.back_plan_name = a.name;
                    }
                });
                this.showStage = false;
            } else if (val == 2) {
                this.payTypeList.forEach(function (b, j) {
                    if (j == index) {
                        _this.backList.pay_type_id = b.id;
                        _this.backList.pay_type_name = b.name;
                    }
                });
                this.showPayType = false;
            }
        },
        submitPayInfo: function submitPayInfo() {
            var _this = this;
            var data = {
                createTime: this.backList.createTime,
                price: this.backList.price,
                back_plan_id: this.backList.back_plan_id,
                contract_id: this.agreementData.contract_id,
                customerpool_id: this.agreementData.customerpool_id,
                remarks: this.backList.remarks,
                pay_type_id: this.backList.pay_type_id,
                pId: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.pId,
                secondid: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.second_id,
                deptid: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.private_deptid,
                type: '合同'
            };

            var flag = false;
            if (!data.pay_type_id) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '收款方式不能为空',
                    type: 'error'
                });
                flag = true;
            }
            if (!data.createTime) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '回款时间不能为空',
                    type: 'error'
                });
                flag = true;
            }
            if (!data.price) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '回款金额不能为空',
                    type: 'error'
                });
                flag = true;
            }
            if (!data.back_plan_id) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '回款阶段不能为空',
                    type: 'error'
                });
                flag = true;
            }
            if (data.price > this.surplusAmount) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '回款金额不能大于' + this.surplusAmount + '元',
                    type: 'error'
                });
                flag = true;
            }
            if (flag) return;

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'back/saveOrUpdate.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
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

/***/ 61:
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
      "mpcomid": '8'
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
      "value": _vm.backList.back_plan_name,
      "is-link": "",
      "request": "",
      "i-class": "simple_cell",
      "eventid": '2',
      "mpcomid": '3'
    },
    on: {
      "click": function($event) {
        _vm.optionFocus($event, 1)
      }
    }
  }), _vm._v(" "), _c('i-input', {
    attrs: {
      "title": "回款金额",
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
      value: (_vm.backList.price),
      callback: function($$v) {
        _vm.backList.price = $$v
      },
      expression: "backList.price"
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "回款时间",
      "request": "",
      "is-link": "",
      "i-class": "simple_cell",
      "mpcomid": '5'
    }
  }, [_c('picker', {
    attrs: {
      "mode": "date",
      "value": _vm.backList.createTime,
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
  }, [_vm._v("\n                    " + _vm._s(_vm.backList.createTime) + "\n                ")])])], 1), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "回款方式",
      "value": _vm.backList.pay_type_name,
      "is-link": "",
      "request": "",
      "i-class": "simple_cell",
      "eventid": '5',
      "mpcomid": '6'
    },
    on: {
      "click": function($event) {
        _vm.optionFocus($event, 2)
      }
    }
  }), _vm._v(" "), _c('i-input', {
    attrs: {
      "title": "备注",
      "right": "",
      "type": "textarea",
      "maxlength": "200",
      "eventid": '6',
      "mpcomid": '7'
    },
    on: {
      "input": function($event) {
        _vm.handleInput($event, 3)
      }
    },
    model: {
      value: (_vm.backList.remarks),
      callback: function($$v) {
        _vm.backList.remarks = $$v
      },
      expression: "backList.remarks"
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
      "mpcomid": '9'
    },
    on: {
      "click": _vm.submitPayInfo
    }
  }, [_vm._v("确定")]), _vm._v(" "), _c('i-action-sheet', {
    attrs: {
      "visible": _vm.showStage,
      "actions": _vm.stageList,
      "eventid": '8',
      "mpcomid": '10'
    },
    on: {
      "change": function($event) {
        _vm.itemChange($event, 1)
      }
    }
  }), _vm._v(" "), _c('i-action-sheet', {
    attrs: {
      "visible": _vm.showPayType,
      "actions": _vm.payTypeList,
      "eventid": '9',
      "mpcomid": '11'
    },
    on: {
      "change": function($event) {
        _vm.itemChange($event, 2)
      }
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
     require("vue-hot-reload-api").rerender("data-v-99937886", esExports)
  }
}

/***/ })

},[57]);