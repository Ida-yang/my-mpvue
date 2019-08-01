require("../../../common/manifest.js")
require("../../../common/vendor.js")
global.webpackJsonpMpvue([34],{

/***/ 125:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(126);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 126:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_cf1f3d4c_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(129);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(127)
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_cf1f3d4c_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\customer\\customerAdd\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-cf1f3d4c", Component.options)
  } else {
    hotAPI.reload("data-v-cf1f3d4c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 127:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 128:
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




/* harmony default export */ __webpack_exports__["a"] = ({
    data: function data() {
        return {
            current: '新增客户',
            existingList: [],

            addList: {
                cues: '大数据',
                customerStateid: '3001',
                levelsid: '',
                levels: '',
                poolName: '',
                contactsName: '',
                phone: '',
                telphone: '',
                address: '',
                remark: ''
            },
            cuesData: [],
            typeData: [],

            showcues: false,
            cueList: [],
            showtype: false,
            typeList: []
        };
    },
    mounted: function mounted() {
        this.loadData();
        this.loadType();
    },


    methods: {
        loadData: function loadData() {
            this.addList = {
                cues: '大数据',
                customerStateid: '3001',
                levelsid: '',
                levels: '',
                poolName: '',
                contactsName: '',
                phone: '',
                telphone: '',
                address: '',
                remark: ''
            };
        },
        loadType: function loadType() {
            var _this = this;
            _this.cueList = [];
            _this.typeList = [];

            wx.request({
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'typeInfo/getTypeInfoByType.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: {
                    type: '客户来源'
                },
                success: function success(res) {
                    _this.cuesData = res.data.name3001;
                    _this.typeData = res.data.name4001;
                    var info1 = res.data.name3001;
                    info1.forEach(function (el) {
                        _this.cueList.push({ name: el.typeName });
                    });
                    var info2 = res.data.name4001;
                    info2.forEach(function (el) {
                        _this.typeList.push({ name: el.typeName });
                    });
                }
            });
        },
        cueFocus: function cueFocus(e, val) {
            if (val == 1) {
                this.showcues = true;
            } else if (val == 2) {
                this.showtype = true;
            }
        },
        cueCancel: function cueCancel(val) {
            if (val == 1) {
                this.showcues = false;
            } else if (val == 2) {
                this.showtype = false;
            }
        },
        cueChange: function cueChange(val) {
            var _this2 = this;

            var key = val.mp.detail.index;
            this.cuesData.forEach(function (a, i) {
                if (i == key) {
                    _this2.addList.cues = a.typeName;
                    _this2.addList.customerStateid = a.id;
                }
            });
            this.showcues = false;
        },
        typeChange: function typeChange(val) {
            var _this3 = this;

            var key = val.mp.detail.index;
            this.typeData.forEach(function (a, i) {
                if (i == key) {
                    _this3.addList.levels = a.typeName;
                    _this3.addList.levelsid = a.id;
                }
            });
            this.showtype = false;
        },
        handleInput: function handleInput(e, val) {
            var value = e.mp.detail;
            if (val === 2) {
                this.addList.poolName = value;
            } else if (val === 3) {
                this.addList.contactsName = value;
            } else if (val === 4) {
                this.addList.phone = value;
            } else if (val === 5) {
                this.addList.telphone = value;
            } else if (val === 6) {
                this.addList.address = value;
            } else if (val === 7) {
                this.addList.remark = value;
            }
        },
        handleBlur: function handleBlur(e) {
            var val = e.target.detail.value;
            var data = {
                name: val
            };
            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'customerTwo/checkName.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    if (res.data.code && res.data.code == '20000') {
                        Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                            content: '该公司已存在于线索或客户中',
                            type: 'warning'
                        });
                    } else {
                        return;
                    }
                }
            });
        },
        addCustomer: function addCustomer() {
            var _this = this;
            var data = {
                customerStateid: this.addList.customerStateid,
                levelsid: this.addList.levelsid,
                poolName: this.addList.poolName,
                contactsName: this.addList.contactsName,
                phone: this.addList.phone,
                telphone: this.addList.telphone,
                address: this.addList.address,
                remark: this.addList.remark,
                pId: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.pId,
                secondid: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.second_id,
                deptid: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.private_deptid
            };

            var flag = false;
            if (!data.phone) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '请填写手机号码',
                    type: 'warning'
                });
                flag = true;
            }
            if (!data.contactsName) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '请填写联系人',
                    type: 'warning'
                });
                flag = true;
            }
            if (!data.poolName) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '请填写公司名称',
                    type: 'warning'
                });
                flag = true;
            }
            if (!data.levelsid) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '请选择客户分类',
                    type: 'warning'
                });
                flag = true;
            }
            if (flag) return;

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'customerpool/savePool.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
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
                        _this.toCustomer();
                    } else {
                        Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Message"])({
                            content: res.data.msg,
                            type: 'error'
                        });
                    }
                }
            });
        },
        toCustomer: function toCustomer() {
            // const url = '../main'
            // mpvue.navigateTo({ url })
            wx.navigateBack({
                delta: 1
            });
        }
    }
});

/***/ }),

/***/ 129:
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
      "title": " ",
      "mpcomid": '9'
    }
  }, [_c('i-cell', {
    attrs: {
      "title": "客户来源",
      "value": _vm.addList.cues,
      "is-link": "",
      "i-class": "simple_cell",
      "request": "",
      "eventid": '0',
      "mpcomid": '1'
    },
    on: {
      "click": function($event) {
        _vm.cueFocus($event, 1)
      }
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "客户分类",
      "value": _vm.addList.levels,
      "is-link": "",
      "i-class": "simple_cell",
      "request": "",
      "eventid": '1',
      "mpcomid": '2'
    },
    on: {
      "click": function($event) {
        _vm.cueFocus($event, 2)
      }
    }
  }), _vm._v(" "), _c('i-input', {
    attrs: {
      "title": "公司名称",
      "right": "",
      "request": "",
      "maxlength": "50",
      "eventid": '2',
      "mpcomid": '3'
    },
    on: {
      "input": function($event) {
        _vm.handleInput($event, 2)
      },
      "blur": _vm.handleBlur
    },
    model: {
      value: (_vm.addList.poolName),
      callback: function($$v) {
        _vm.addList.poolName = $$v
      },
      expression: "addList.poolName"
    }
  }), _vm._v(" "), _c('i-input', {
    attrs: {
      "title": "联系人",
      "right": "",
      "request": "",
      "maxlength": "20",
      "eventid": '3',
      "mpcomid": '4'
    },
    on: {
      "input": function($event) {
        _vm.handleInput($event, 3)
      }
    },
    model: {
      value: (_vm.addList.contactsName),
      callback: function($$v) {
        _vm.addList.contactsName = $$v
      },
      expression: "addList.contactsName"
    }
  }), _vm._v(" "), _c('i-input', {
    attrs: {
      "title": "手机号码",
      "right": "",
      "request": "",
      "type": "number",
      "maxlength": "11",
      "eventid": '4',
      "mpcomid": '5'
    },
    on: {
      "input": function($event) {
        _vm.handleInput($event, 4)
      }
    },
    model: {
      value: (_vm.addList.phone),
      callback: function($$v) {
        _vm.addList.phone = $$v
      },
      expression: "addList.phone"
    }
  }), _vm._v(" "), _c('i-input', {
    attrs: {
      "title": "电话",
      "right": "",
      "type": "number",
      "maxlength": "21",
      "eventid": '5',
      "mpcomid": '6'
    },
    on: {
      "input": function($event) {
        _vm.handleInput($event, 5)
      }
    },
    model: {
      value: (_vm.addList.telphone),
      callback: function($$v) {
        _vm.addList.telphone = $$v
      },
      expression: "addList.telphone"
    }
  }), _vm._v(" "), _c('i-input', {
    attrs: {
      "title": "详细地址",
      "right": "",
      "placeholder": "(最多50字)",
      "maxlength": "50",
      "eventid": '6',
      "mpcomid": '7'
    },
    on: {
      "input": function($event) {
        _vm.handleInput($event, 6)
      }
    },
    model: {
      value: (_vm.addList.address),
      callback: function($$v) {
        _vm.addList.address = $$v
      },
      expression: "addList.address"
    }
  }), _vm._v(" "), _c('i-input', {
    attrs: {
      "title": "备注",
      "right": "",
      "type": "textarea",
      "maxlength": "200",
      "eventid": '7',
      "mpcomid": '8'
    },
    on: {
      "input": function($event) {
        _vm.handleInput($event, 7)
      }
    },
    model: {
      value: (_vm.addList.remark),
      callback: function($$v) {
        _vm.addList.remark = $$v
      },
      expression: "addList.remark"
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
      "eventid": '8',
      "mpcomid": '10'
    },
    on: {
      "click": _vm.addCustomer
    }
  }, [_vm._v("确定")]), _vm._v(" "), _c('i-action-sheet', {
    attrs: {
      "visible": _vm.showcues,
      "actions": _vm.cueList,
      "show-cancel": "",
      "eventid": '9',
      "mpcomid": '11'
    },
    on: {
      "cancel": function($event) {
        _vm.cueCancel(1)
      },
      "change": _vm.cueChange
    }
  }), _vm._v(" "), _c('i-action-sheet', {
    attrs: {
      "visible": _vm.showtype,
      "actions": _vm.typeList,
      "show-cancel": "",
      "eventid": '10',
      "mpcomid": '12'
    },
    on: {
      "cancel": function($event) {
        _vm.cueCancel(2)
      },
      "change": _vm.typeChange
    }
  }), _vm._v(" "), _c('i-message', {
    attrs: {
      "id": "message",
      "mpcomid": '13'
    }
  }), _vm._v(" "), _c('i-toast', {
    attrs: {
      "id": "toast",
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
     require("vue-hot-reload-api").rerender("data-v-cf1f3d4c", esExports)
  }
}

/***/ })

},[125]);