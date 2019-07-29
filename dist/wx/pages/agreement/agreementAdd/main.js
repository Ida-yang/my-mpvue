require("../../../common/manifest.js")
require("../../../common/vendor.js")
global.webpackJsonpMpvue([56],{

/***/ 10:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(11);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 11:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_c103f6f8_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(356);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(355)
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_c103f6f8_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\agreement\\agreementAdd\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c103f6f8", Component.options)
  } else {
    hotAPI.reload("data-v-c103f6f8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 13:
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




/* harmony default export */ __webpack_exports__["a"] = ({
    data: function data() {
        return {
            current: '新增合同',

            addList: {
                orderId: '',
                contract_type: '',
                contract_name: '',
                customerpool_id: '',
                customerpoolName: '',
                opportunity_id: '',
                opportunityName: '',
                amount: '',
                start_date: '',
                end_date: '',
                signatories: '',
                signatorieName: '',
                our_signatorieName: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.name,
                remarks: ''
            },

            showType: false,
            typeList: [{ name: '服务合同' }, { name: '销售合同' }, { name: '代理合同' }, { name: '其他' }],
            showOppo: false,
            oppoList: [],
            showsignator: false,
            signatorList: [],

            nowDate: ''
        };
    },
    onShow: function onShow() {
        this.loadData();
    },
    mounted: function mounted() {
        this.loadList();
    },


    methods: {
        loadData: function loadData() {
            var poolObj = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.agreementPoolNameData;
            this.addList.customerpoolName = poolObj.poolName;
            this.addList.customerpool_id = poolObj.poolNameID;
            if (poolObj.poolNameID !== undefined && poolObj.poolNameID !== null) {
                this.loadContact();
                this.loadOppo();
            }
        },
        loadList: function loadList() {
            this.addList = {
                orderId: '',
                contract_type: '',
                contract_name: '',
                customerpool_id: '',
                customerpoolName: '',
                opportunity_id: '',
                opportunityName: '',
                amount: '',
                start_date: '',
                end_date: '',
                signatories: '',
                signatorieName: '',
                our_signatorieName: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.name,
                remarks: ''
            };
        },
        loadContact: function loadContact() {
            var _this = this;
            var data = {
                customerpool_id: this.addList.customerpool_id
            };

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'getPoolContactsName.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    var info = res.data.map.success;
                    info.forEach(function (el) {
                        _this.signatorList.push({ id: el.id, name: el.name });
                    });
                }
            });
        },
        loadOppo: function loadOppo() {
            var _this = this;
            var data = {
                customerpool_id: this.addList.customerpool_id
            };

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'opportunity/getOpportunityAll.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    var info = res.data;
                    info.forEach(function (el) {
                        _this.oppoList.push({
                            id: el.opportunity_id,
                            name: el.opportunity_name,
                            number: el.opportunity_number,
                            amount: el.opportunity_achievement,
                            orderId: el.orderId
                        });
                    });
                }
            });
        },
        cellFocus: function cellFocus(e, val) {
            if (val == 1) {
                this.showType = true;
            } else if (val == 2) {
                var url = '../customers/main';
                global.mpvue.navigateTo({ url: url });
            } else if (val == 3) {
                this.showOppo = true;
            } else if (val == 4) {
                this.showsignator = true;
            }
        },
        handleInput: function handleInput(e, val) {
            if (val == 1) {
                this.addList.contract_name = e.mp.detail;
            } else if (val == 2) {
                this.addList.amount = e.mp.detail;
            } else if (val == 3) {
                this.addList.remarks = e.mp.detail;
            }
        },
        dealChange: function dealChange(e, val) {
            if (val == 1) {
                var value = e.target.value;
                this.addList.start_date = value;
                var valArr = value.split('-');
                var y = parseInt(valArr[0]) + 1;
                this.addList.end_date = y + '-' + valArr[1] + '-' + valArr[2];
            } else if (val == 2) {
                this.addList.end_date = e.target.value;
            }
        },
        sheetCancel: function sheetCancel(e, val) {
            if (val == 2) {
                this.showOppo = false;
            }
        },
        sheetChange: function sheetChange(e, val) {
            var _this = this;
            var index = e.target.index;
            if (val == 1) {
                this.typeList.forEach(function (a, i) {
                    if (i == index) {
                        _this.addList.contract_type = a.name;
                        _this.showType = false;
                    }
                });
            } else if (val == 2) {
                this.oppoList.forEach(function (b, j) {
                    if (j == index) {
                        _this.addList.opportunityName = b.name;
                        _this.addList.opportunity_id = b.id;
                        _this.addList.amount = b.amount;
                        if (b.orderId) {
                            _this.addList.orderId = b.orderId;
                        }
                        _this.showOppo = false;
                    }
                });
            } else if (val == 3) {
                this.signatorList.forEach(function (c, k) {
                    if (k == index) {
                        _this.addList.signatorieName = c.name;
                        _this.addList.signatories = c.id;
                        _this.showsignator = false;
                    }
                });
            }
        },
        addAgreement: function addAgreement() {
            var _this = this;
            var data = {
                orderId: this.addList.orderId,
                contract_type: this.addList.contract_type,
                contract_name: this.addList.contract_name,
                customerpool_id: this.addList.customerpool_id,
                opportunity_id: this.addList.opportunity_id,
                amount: this.addList.amount,
                start_date: this.addList.start_date,
                end_date: this.addList.end_date,
                signatories: this.addList.signatories,
                our_signatories: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.pId,
                remarks: this.addList.remarks,
                pId: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.pId,
                secondid: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.second_id,
                deptid: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.private_deptid
            };

            var flag = false;
            if (!data.signatories) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '请选择客户签约人',
                    type: 'warning'
                });
                flag = true;
            }
            if (!data.start_date) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '请选择合同开始时间',
                    type: 'warning'
                });
                flag = true;
            }
            if (!data.amount) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '请填写合同金额',
                    type: 'warning'
                });
                flag = true;
            }
            if (!data.customerpool_id) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '请选择客户名称',
                    type: 'warning'
                });
                flag = true;
            }
            if (!data.contract_name) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '请填写合同名称',
                    type: 'warning'
                });
                flag = true;
            }
            if (!data.contract_type) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '请选择合同类型',
                    type: 'warning'
                });
                flag = true;
            }
            if (flag) return;

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'insertContract.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    if (res.data.code && res.data.code == "200") {
                        Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Message"])({
                            content: '新增成功',
                            type: 'success'
                        });
                        _this.toAgreement();
                    } else {
                        Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Message"])({
                            content: res.data.msg,
                            type: 'error'
                        });
                    }
                }
            });
        },
        toAgreement: function toAgreement() {
            wx.navigateBack({
                delta: 1
            });
        }
    }
});

/***/ }),

/***/ 355:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 356:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "add_or_update_wrap"
  }, [_c('i-panel', {
    attrs: {
      "title": " ",
      "mpcomid": '0'
    }
  }), _vm._v(" "), _c('i-panel', {
    attrs: {
      "title": " ",
      "mpcomid": '11'
    }
  }, [_c('i-cell', {
    attrs: {
      "title": "合同类型",
      "value": _vm.addList.contract_type,
      "request": "",
      "is-link": "",
      "i-class": "simple_cell",
      "eventid": '0',
      "mpcomid": '1'
    },
    on: {
      "click": function($event) {
        _vm.cellFocus($event, 1)
      }
    }
  }), _vm._v(" "), _c('i-input', {
    attrs: {
      "title": "合同名称",
      "right": "",
      "request": "",
      "maxlength": "20",
      "eventid": '1',
      "mpcomid": '2'
    },
    on: {
      "input": function($event) {
        _vm.handleInput($event, 1)
      }
    },
    model: {
      value: (_vm.addList.contract_name),
      callback: function($$v) {
        _vm.addList.contract_name = $$v
      },
      expression: "addList.contract_name"
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "客户名称",
      "value": _vm.addList.customerpoolName,
      "request": "",
      "is-link": "",
      "i-class": "simple_cell",
      "eventid": '2',
      "mpcomid": '3'
    },
    on: {
      "click": function($event) {
        _vm.cellFocus($event, 2)
      }
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "对应商机",
      "value": _vm.addList.opportunityName,
      "is-link": "",
      "i-class": "simple_cell",
      "eventid": '3',
      "mpcomid": '4'
    },
    on: {
      "click": function($event) {
        _vm.cellFocus($event, 3)
      }
    }
  }), _vm._v(" "), _c('i-input', {
    attrs: {
      "title": "合同金额",
      "right": "",
      "request": "",
      "type": "number",
      "maxlength": "50",
      "eventid": '4',
      "mpcomid": '5'
    },
    on: {
      "input": function($event) {
        _vm.handleInput($event, 2)
      }
    },
    model: {
      value: (_vm.addList.amount),
      callback: function($$v) {
        _vm.addList.amount = $$v
      },
      expression: "addList.amount"
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "开始时间",
      "request": "",
      "is-link": "",
      "i-class": "simple_cell",
      "mpcomid": '6'
    }
  }, [_c('picker', {
    attrs: {
      "mode": "date",
      "value": _vm.addList.start_date,
      "start": _vm.nowDate,
      "eventid": '5'
    },
    on: {
      "change": function($event) {
        _vm.dealChange($event, 1)
      }
    },
    slot: "footer"
  }, [_c('view', {
    staticClass: "picker cell_picker"
  }, [_vm._v("\n                " + _vm._s(_vm.addList.start_date) + "\n                ")])])], 1), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "结束时间",
      "request": "",
      "is-link": "",
      "i-class": "simple_cell",
      "mpcomid": '7'
    }
  }, [_c('picker', {
    attrs: {
      "mode": "date",
      "value": _vm.addList.end_date,
      "start": _vm.nowDate,
      "eventid": '6'
    },
    on: {
      "change": function($event) {
        _vm.dealChange($event, 2)
      }
    },
    slot: "footer"
  }, [_c('view', {
    staticClass: "picker cell_picker"
  }, [_vm._v("\n                " + _vm._s(_vm.addList.end_date) + "\n                ")])])], 1), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "客户签约人",
      "value": _vm.addList.signatorieName,
      "request": "",
      "is-link": "",
      "i-class": "simple_cell",
      "eventid": '7',
      "mpcomid": '8'
    },
    on: {
      "click": function($event) {
        _vm.cellFocus($event, 4)
      }
    }
  }), _vm._v(" "), _c('i-input', {
    attrs: {
      "title": "我方签约人",
      "right": "",
      "maxlength": "50",
      "disabled": "",
      "eventid": '8',
      "mpcomid": '9'
    },
    model: {
      value: (_vm.addList.our_signatorieName),
      callback: function($$v) {
        _vm.addList.our_signatorieName = $$v
      },
      expression: "addList.our_signatorieName"
    }
  }), _vm._v(" "), _c('i-input', {
    attrs: {
      "title": "备注",
      "right": "",
      "type": "textarea",
      "maxlength": "200",
      "eventid": '9',
      "mpcomid": '10'
    },
    on: {
      "input": function($event) {
        _vm.handleInput($event, 3)
      }
    },
    model: {
      value: (_vm.addList.remarks),
      callback: function($$v) {
        _vm.addList.remarks = $$v
      },
      expression: "addList.remarks"
    }
  })], 1), _vm._v(" "), _c('p', {
    staticClass: "request_tip"
  }, [_c('span', {
    staticStyle: {
      "color": "#ed3f14"
    }
  }, [_vm._v(" * ")]), _vm._v("为必填项")]), _vm._v(" "), _c('i-button', {
    staticClass: "bottom_btn",
    attrs: {
      "type": "ghost",
      "long": true,
      "eventid": '10',
      "mpcomid": '12'
    },
    on: {
      "click": _vm.addAgreement
    }
  }, [_vm._v("确定")]), _vm._v(" "), _c('i-action-sheet', {
    attrs: {
      "visible": _vm.showType,
      "actions": _vm.typeList,
      "eventid": '11',
      "mpcomid": '13'
    },
    on: {
      "change": function($event) {
        _vm.sheetChange($event, 1)
      }
    }
  }), _vm._v(" "), _c('i-action-sheet', {
    attrs: {
      "visible": _vm.showOppo,
      "actions": _vm.oppoList,
      "show-cancel": "",
      "eventid": '12',
      "mpcomid": '14'
    },
    on: {
      "cancel": function($event) {
        _vm.sheetCancel($event, 2)
      },
      "change": function($event) {
        _vm.sheetChange($event, 2)
      }
    }
  }), _vm._v(" "), _c('i-action-sheet', {
    attrs: {
      "visible": _vm.showsignator,
      "actions": _vm.signatorList,
      "eventid": '13',
      "mpcomid": '15'
    },
    on: {
      "change": function($event) {
        _vm.sheetChange($event, 3)
      }
    }
  }), _vm._v(" "), _c('i-message', {
    attrs: {
      "id": "message",
      "mpcomid": '16'
    }
  }), _vm._v(" "), _c('i-toast', {
    attrs: {
      "id": "toast",
      "mpcomid": '17'
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
     require("vue-hot-reload-api").rerender("data-v-c103f6f8", esExports)
  }
}

/***/ })

},[10]);