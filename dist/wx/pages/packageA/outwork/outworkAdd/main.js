require("../../../../common/manifest.js")
require("../../../../common/vendor.js")
global.webpackJsonpMpvue([14],{

/***/ 404:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(405);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 405:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(407);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_47301e98_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(408);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(406)
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_47301e98_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\packageA\\outwork\\outworkAdd\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-47301e98", Component.options)
  } else {
    hotAPI.reload("data-v-47301e98", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 406:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 407:
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
            current: '新增外勤',

            addList: {
                customerpoolid: '',
                customerName: '',
                contactsid: '',
                contact: '',
                visitTime: '',
                endTime: '',
                remindTime: '',
                visitTheme: '',
                visitObjective: '',
                assistantsid: [],
                assistants: [],
                remarks: ''
            },
            nowDate: '',

            showContact: false,
            contactData: [],
            contactList: []
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
            var poolObj = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.outworkPoolName;
            this.addList.customerName = poolObj.poolName;
            this.addList.customerpoolid = poolObj.poolNameID;
            if (poolObj.poolNameID !== undefined && poolObj.poolNameID !== null) {
                this.loadContact();
            }

            var assisObj = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.outworkAssistants;
            if (assisObj) {
                this.addList.assistantsid = assisObj.id;
                this.addList.assistants = assisObj.name;
            }
        },
        loadList: function loadList() {
            this.addList = {
                customerpoolid: '',
                customerName: '',
                contactsid: '',
                contact: '',
                visitTime: '',
                endTime: '',
                remindTime: '',
                visitTheme: '',
                visitObjective: '',
                assistantsid: [],
                assistants: [],
                remarks: ''
            };
        },
        loadContact: function loadContact() {
            var _this = this;
            this.contactList = [];
            var data = {
                customerpool_id: this.addList.customerpoolid
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
                    _this.contactData = info;
                    info.forEach(function (el) {
                        _this.contactList.push({ id: el.id, name: el.name });
                    });
                }
            });
        },
        handleInput: function handleInput(e, val) {
            if (val == 1) {
                this.addList.visitTheme = e.mp.detail;
            } else if (val == 2) {
                this.addList.visitObjective = e.mp.detail;
            } else if (val == 3) {
                this.addList.remarks = e.mp.detail;
            }
        },
        cellFocus: function cellFocus(e, val) {
            if (val == 1) {
                var url = '../customers/main';
                global.mpvue.navigateTo({ url: url });
            } else if (val == 2) {
                this.showContact = true;
            } else if (val == 3) {
                var _url = '../assistants/main';
                global.mpvue.navigateTo({ url: _url });
            }
        },
        contactChange: function contactChange(e) {
            var _this2 = this;

            var index = e.mp.detail.index;
            this.contactData.forEach(function (el, i) {
                if (i == index) {
                    _this2.addList.contactsid = el.id;
                    _this2.addList.contact = el.name;
                    _this2.showContact = false;
                }
            });
        },
        dealChange: function dealChange(e, val) {
            console.log(e);
            if (val == 1) {
                this.addList.visitTime = e.mp.detail + ':00';
            } else if (val == 2) {
                this.addList.endTime = e.mp.detail + ':00';
            } else if (val == 3) {
                this.addList.remindTime = e.mp.detail + ':00';
            }
        },
        addOutwork: function addOutwork() {
            var _this = this;

            var data = {
                customerpoolid: this.addList.customerpoolid,
                customerName: this.addList.customerName,
                contactsid: this.addList.contactsid,
                visitTime: this.addList.visitTime,
                endTime: this.addList.endTime,
                remindTime: this.addList.remindTime,
                visitTheme: this.addList.visitTheme,
                visitObjective: this.addList.visitObjective,
                assistantsid: this.addList.assistantsid,
                remarks: this.addList.remarks,
                pId: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.pId,
                secondid: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.second_id,
                deptid: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.private_deptid
            };
            console.log(data);

            var flag = false;
            if (!data.visitObjective) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '请填写拜访目的',
                    type: 'warning'
                });
                flag = true;
            }
            if (!data.visitTheme) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '请填写拜访主题',
                    type: 'warning'
                });
                flag = true;
            }
            if (!data.contactsid) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '请选择拜访对象',
                    type: 'warning'
                });
                flag = true;
            }
            if (!data.remindTime) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '请选择提醒时间',
                    type: 'warning'
                });
                flag = true;
            }
            if (!data.endTime) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '请选择结束时间',
                    type: 'warning'
                });
                flag = true;
            }
            if (!data.visitTime) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '请填写拜访时间',
                    type: 'warning'
                });
                flag = true;
            }
            if (!data.customerpoolid) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '请选择拜访公司',
                    type: 'warning'
                });
                flag = true;
            }
            if (flag) return;

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'visit/insertVisit.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
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
                        _this.toOutwork();
                    } else {
                        Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Message"])({
                            content: res.data.msg,
                            type: 'error'
                        });
                    }
                }
            });
        },
        toOutwork: function toOutwork() {
            wx.navigateBack({
                delta: 1
            });
        }
    }
});

/***/ }),

/***/ 408:
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
      "mpcomid": '13'
    }
  }, [_c('i-cell', {
    attrs: {
      "title": "拜访公司",
      "value": _vm.addList.customerName,
      "request": "",
      "is-link": "",
      "i-class": "simple_cell",
      "i-cell-text": "color_495060_text",
      "eventid": '0',
      "mpcomid": '1'
    },
    on: {
      "click": function($event) {
        _vm.cellFocus($event, 1)
      }
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "拜访时间",
      "request": "",
      "is-link": "",
      "i-class": "simple_cell",
      "i-cell-text": "color_495060_text",
      "mpcomid": '3'
    }
  }, [_c('i-datetime-picker', {
    staticClass: "cell_picker",
    attrs: {
      "value": _vm.addList.visitTime,
      "eventid": '1',
      "mpcomid": '2'
    },
    on: {
      "change": function($event) {
        _vm.dealChange($event, 1)
      }
    },
    slot: "footer"
  })], 1), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "结束时间",
      "request": "",
      "is-link": "",
      "i-class": "simple_cell",
      "i-cell-text": "color_495060_text",
      "mpcomid": '5'
    }
  }, [_c('i-datetime-picker', {
    staticClass: "cell_picker",
    attrs: {
      "value": _vm.addList.endTime,
      "eventid": '2',
      "mpcomid": '4'
    },
    on: {
      "change": function($event) {
        _vm.dealChange($event, 2)
      }
    },
    slot: "footer"
  })], 1), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "提醒时间",
      "request": "",
      "is-link": "",
      "i-class": "simple_cell",
      "i-cell-text": "color_495060_text",
      "mpcomid": '7'
    }
  }, [_c('i-datetime-picker', {
    staticClass: "cell_picker",
    attrs: {
      "value": _vm.addList.remindTime,
      "eventid": '3',
      "mpcomid": '6'
    },
    on: {
      "change": function($event) {
        _vm.dealChange($event, 3)
      }
    },
    slot: "footer"
  })], 1), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "拜访对象",
      "value": _vm.addList.contact,
      "request": "",
      "is-link": "",
      "i-class": "simple_cell",
      "i-cell-text": "color_495060_text",
      "eventid": '4',
      "mpcomid": '8'
    },
    on: {
      "click": function($event) {
        _vm.cellFocus($event, 2)
      }
    }
  }), _vm._v(" "), _c('i-input', {
    attrs: {
      "title": "拜访主题",
      "right": "",
      "request": "",
      "maxlength": "50",
      "eventid": '5',
      "mpcomid": '9'
    },
    on: {
      "input": function($event) {
        _vm.handleInput($event, 1)
      }
    },
    model: {
      value: (_vm.addList.visitTheme),
      callback: function($$v) {
        _vm.addList.visitTheme = $$v
      },
      expression: "addList.visitTheme"
    }
  }), _vm._v(" "), _c('i-input', {
    attrs: {
      "title": "拜访目的",
      "right": "",
      "request": "",
      "type": "textarea",
      "maxlength": "200",
      "eventid": '6',
      "mpcomid": '10'
    },
    on: {
      "input": function($event) {
        _vm.handleInput($event, 2)
      }
    },
    model: {
      value: (_vm.addList.visitObjective),
      callback: function($$v) {
        _vm.addList.visitObjective = $$v
      },
      expression: "addList.visitObjective"
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "协助人员",
      "value": _vm.addList.assistants,
      "is-link": "",
      "i-class": "simple_cell",
      "i-cell-text": "color_495060_text",
      "eventid": '7',
      "mpcomid": '11'
    },
    on: {
      "click": function($event) {
        _vm.cellFocus($event, 3)
      }
    }
  }), _vm._v(" "), _c('i-input', {
    attrs: {
      "title": "备注",
      "right": "",
      "type": "textarea",
      "maxlength": "200",
      "eventid": '8',
      "mpcomid": '12'
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
  })], 1), _vm._v(" "), _c('i-button', {
    staticClass: "bottom_btn",
    attrs: {
      "type": "ghost",
      "long": true,
      "eventid": '9',
      "mpcomid": '14'
    },
    on: {
      "click": _vm.addOutwork
    }
  }, [_vm._v("确定")]), _vm._v(" "), _c('i-action-sheet', {
    attrs: {
      "visible": _vm.showContact,
      "actions": _vm.contactList,
      "eventid": '10',
      "mpcomid": '15'
    },
    on: {
      "change": _vm.contactChange
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
     require("vue-hot-reload-api").rerender("data-v-47301e98", esExports)
  }
}

/***/ })

},[404]);