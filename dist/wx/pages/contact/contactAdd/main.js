require("../../../common/manifest.js")
require("../../../common/vendor.js")
global.webpackJsonpMpvue([37],{

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(81);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 81:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_070c9198_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(84);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(82)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-070c9198"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_070c9198_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\contact\\contactAdd\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-070c9198", Component.options)
  } else {
    hotAPI.reload("data-v-070c9198", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 82:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 83:
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
            current: '新增联系人',

            addList: {
                name: '',
                poolName: '',
                phone: '',
                telephone: '',
                qq: '',
                email: '',
                wechat: '',
                sex: '',
                customerpool_id: '',
                customeroneId: '',
                remark: ''
            },

            showSex: false,
            sexList: [{ name: '男' }, { name: '女' }]
        };
    },
    onShow: function onShow() {
        if (__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.contactPoolNameData) {
            console.log(__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.contactPoolNameData);
            this.loadData();
        }
    },


    methods: {
        loadData: function loadData() {
            var poolObj = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.contactPoolNameData;
            this.addList.poolName = poolObj.poolName;
            this.addList.customeroneId = poolObj.customeroneId;
            this.addList.customerpool_id = poolObj.customerpool_id;
        },
        handleInput: function handleInput(e, val) {
            if (val == 1) {
                this.addList.name = e.mp.detail;
            } else if (val == 2) {
                this.addList.phone = e.mp.detail;
            } else if (val == 3) {
                this.addList.telphone = e.mp.detail;
            } else if (val == 4) {
                this.addList.qq = e.mp.detail;
            } else if (val == 5) {
                this.addList.email = e.mp.detail;
            } else if (val == 6) {
                this.addList.wechat = e.mp.detail;
            } else if (val == 7) {
                this.addList.remark = e.mp.detail;
            }
        },
        cellFocus: function cellFocus(e, val) {
            if (val == 1) {
                var url = '../clueandCustomer/main';
                global.mpvue.navigateTo({ url: url });
            } else if (val == 2) {
                this.showSex = true;
            }
        },
        sexChange: function sexChange(e) {
            var index = e.mp.detail.index;
            if (index == 0) {
                this.addList.sex = '男';
            } else if (index == 1) {
                this.addList.sex = '女';
            }
            this.showSex = false;
        },
        sexCancel: function sexCancel() {
            this.showSex = false;
        },
        addContact: function addContact() {
            var _this = this;
            console.log(this.addList);
            var data = {
                name: this.addList.name,
                poolName: this.addList.poolName,
                phone: this.addList.phone,
                telephone: this.addList.telephone,
                qq: this.addList.qq,
                email: this.addList.email,
                wechat: this.addList.wechat,
                sex: this.addList.sex,
                customerpool_id: this.addList.customerpool_id,
                customeroneId: this.addList.customeroneId,
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
            if (!data.poolName) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '请选择公司',
                    type: 'warning'
                });
                flag = true;
            }
            if (!data.name) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '请填写联系人',
                    type: 'warning'
                });
                flag = true;
            }
            if (flag) return;

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'insertContacts.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
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
                        _this.toContact();
                    } else {
                        Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Message"])({
                            content: res.data.msg,
                            type: 'error'
                        });
                    }
                }
            });
        },
        toContact: function toContact() {
            wx.navigateBack({
                delta: 1
            });
        }
    }
});

/***/ }),

/***/ 84:
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
      "mpcomid": '10'
    }
  }, [_c('i-input', {
    attrs: {
      "title": "联系人",
      "right": "",
      "request": "",
      "maxlength": "20",
      "eventid": '0',
      "mpcomid": '1'
    },
    on: {
      "input": function($event) {
        _vm.handleInput($event, 1)
      }
    },
    model: {
      value: (_vm.addList.name),
      callback: function($$v) {
        _vm.addList.name = $$v
      },
      expression: "addList.name"
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "公司名称",
      "value": _vm.addList.poolName,
      "is-link": "",
      "i-class": "simple_cell",
      "request": "",
      "eventid": '1',
      "mpcomid": '2'
    },
    on: {
      "click": function($event) {
        _vm.cellFocus($event, 1)
      }
    }
  }), _vm._v(" "), _c('i-input', {
    attrs: {
      "title": "手机号码",
      "right": "",
      "request": "",
      "type": "number",
      "maxlength": "11",
      "eventid": '2',
      "mpcomid": '3'
    },
    on: {
      "input": function($event) {
        _vm.handleInput($event, 2)
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
      "eventid": '3',
      "mpcomid": '4'
    },
    on: {
      "input": function($event) {
        _vm.handleInput($event, 3)
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
      "title": "QQ",
      "right": "",
      "maxlength": "50",
      "eventid": '4',
      "mpcomid": '5'
    },
    on: {
      "input": function($event) {
        _vm.handleInput($event, 4)
      }
    },
    model: {
      value: (_vm.addList.qq),
      callback: function($$v) {
        _vm.addList.qq = $$v
      },
      expression: "addList.qq"
    }
  }), _vm._v(" "), _c('i-input', {
    attrs: {
      "title": "邮箱",
      "right": "",
      "maxlength": "50",
      "eventid": '5',
      "mpcomid": '6'
    },
    on: {
      "input": function($event) {
        _vm.handleInput($event, 5)
      }
    },
    model: {
      value: (_vm.addList.email),
      callback: function($$v) {
        _vm.addList.email = $$v
      },
      expression: "addList.email"
    }
  }), _vm._v(" "), _c('i-input', {
    attrs: {
      "title": "微信",
      "right": "",
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
      value: (_vm.addList.wechat),
      callback: function($$v) {
        _vm.addList.wechat = $$v
      },
      expression: "addList.wechat"
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "性别",
      "value": _vm.addList.sex,
      "is-link": "",
      "i-class": "simple_cell",
      "eventid": '7',
      "mpcomid": '8'
    },
    on: {
      "click": function($event) {
        _vm.cellFocus($event, 2)
      }
    }
  }), _vm._v(" "), _c('i-input', {
    attrs: {
      "title": "备注",
      "right": "",
      "type": "textarea",
      "maxlength": "200",
      "eventid": '8',
      "mpcomid": '9'
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
      "color": "#ed3f14"
    }
  }, [_vm._v(" * ")]), _vm._v("为必填项")]), _vm._v(" "), _c('i-button', {
    staticClass: "bottom_btn",
    attrs: {
      "type": "ghost",
      "long": true,
      "eventid": '9',
      "mpcomid": '11'
    },
    on: {
      "click": _vm.addContact
    }
  }, [_vm._v("确定")]), _vm._v(" "), _c('i-action-sheet', {
    attrs: {
      "visible": _vm.showSex,
      "actions": _vm.sexList,
      "show-cancel": "",
      "eventid": '10',
      "mpcomid": '12'
    },
    on: {
      "cancel": _vm.sexCancel,
      "change": _vm.sexChange
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
     require("vue-hot-reload-api").rerender("data-v-070c9198", esExports)
  }
}

/***/ })

},[80]);