require("../../../../common/manifest.js")
require("../../../../common/vendor.js")
global.webpackJsonpMpvue([17],{

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(344);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_fbe9f158_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(347);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(345)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-fbe9f158"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_fbe9f158_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\packageA\\opportunity\\opportunityUpdate\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-fbe9f158", Component.options)
  } else {
    hotAPI.reload("data-v-fbe9f158", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 345:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 346:
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




/* harmony default export */ __webpack_exports__["a"] = ({
    data: function data() {
        return {
            current: '编辑商机',
            opportunityName: '',

            updateList: {
                opportunity_id: '',
                opportunity_name: '',
                customerpool_id: '',
                poolName: '',
                contacts_id: '',
                contact: '',
                opportunity_achievement: '',
                opportunity_deal: '',
                opportunity_remarks: ''
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
            var poolObj = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.opportunityPoolNameData;
            this.updateList.poolName = poolObj.poolName;
            this.updateList.customerpool_id = poolObj.poolNameID;
            if (poolObj.poolNameID !== undefined && poolObj.poolNameID !== null) {
                this.loadContact();
            }
        },
        loadList: function loadList() {
            var opportunityData = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.opportunityupdateData;
            this.opportunityName = opportunityData.opportunity_name;
            this.updateList = {
                opportunity_id: opportunityData.opportunity_id,
                opportunity_name: opportunityData.opportunity_name,
                customerpool_id: opportunityData.customerpool_id,
                poolName: opportunityData.customerpool[0].name,
                contacts_id: opportunityData.contacts_id,
                contact: opportunityData.contacts[0].coName,
                opportunity_achievement: opportunityData.opportunity_achievement,
                opportunity_deal: opportunityData.opportunity_deal,
                opportunity_remarks: opportunityData.opportunity_remarks
            };
        },
        loadContact: function loadContact() {
            var _this = this;
            var data = {
                customerpool_id: this.updateList.customerpool_id
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
                this.updateList.opportunity_name = e.mp.detail;
            } else if (val == 2) {
                this.updateList.opportunity_achievement = e.mp.detail;
            } else if (val == 3) {
                this.updateList.opportunity_remarks = e.mp.detail;
            }
        },
        cellFocus: function cellFocus(e, val) {
            if (val == 1) {
                var url = '../customers/main';
                global.mpvue.navigateTo({ url: url });
            } else if (val == 2) {
                this.showContact = true;
            }
        },
        contactChange: function contactChange(e) {
            var _this2 = this;

            var index = e.mp.detail.index;
            this.contactData.forEach(function (el, i) {
                if (i == index) {
                    _this2.updateList.contacts_id = el.id;
                    _this2.updateList.contact = el.name;
                    _this2.showContact = false;
                }
            });
        },
        dealChange: function dealChange(e) {
            this.updateList.opportunity_deal = e.target.value;
        },
        addOpportunity: function addOpportunity() {
            var _this = this;

            var data = {
                opportunity_id: this.updateList.opportunity_id,
                opportunity_name: this.updateList.opportunity_name,
                customerpool_id: this.updateList.customerpool_id,
                contacts_id: this.updateList.contacts_id,
                opportunity_achievement: this.updateList.opportunity_achievement,
                opportunity_deal: this.updateList.opportunity_deal,
                opportunity_remarks: this.updateList.opportunity_remarks,
                user_id: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.pId,
                secondid: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.second_id,
                deptid: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.private_deptid
            };

            var flag = false;
            if (!data.opportunity_deal) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '请选择预计成交时间',
                    type: 'warning'
                });
                flag = true;
            }
            if (!data.opportunity_achievement) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '请填写预计成交金额',
                    type: 'warning'
                });
                flag = true;
            }
            if (!data.contacts_id) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '请选择客户决策人',
                    type: 'warning'
                });
                flag = true;
            }
            if (!data.customerpool_id) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '请选择公司名称',
                    type: 'warning'
                });
                flag = true;
            }
            if (!data.opportunity_name) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '请填写商机名称',
                    type: 'warning'
                });
                flag = true;
            }
            if (flag) return;

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'opportunity/saveOrUpdate.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    if (res.data.code && res.data.code == "200") {
                        Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Message"])({
                            content: '编辑成功',
                            type: 'success'
                        });
                        _this.toOpportunity();
                    } else {
                        Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Message"])({
                            content: res.data.msg,
                            type: 'error'
                        });
                    }
                }
            });
        },
        toOpportunity: function toOpportunity() {
            wx.navigateBack({
                delta: 1
            });
        }
    }
});

/***/ }),

/***/ 347:
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
      "title": _vm.opportunityName,
      "mpcomid": '7'
    }
  }, [_c('i-input', {
    attrs: {
      "title": "商机名称",
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
      value: (_vm.updateList.opportunity_name),
      callback: function($$v) {
        _vm.updateList.opportunity_name = $$v
      },
      expression: "updateList.opportunity_name"
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "公司名称",
      "value": _vm.updateList.poolName,
      "request": "",
      "is-link": "",
      "i-class": "simple_cell",
      "i-cell-text": "color_495060_text",
      "eventid": '1',
      "mpcomid": '2'
    },
    on: {
      "click": function($event) {
        _vm.cellFocus($event, 1)
      }
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "客户决策人",
      "value": _vm.updateList.contact,
      "request": "",
      "is-link": "",
      "i-class": "simple_cell",
      "i-cell-text": "color_495060_text",
      "eventid": '2',
      "mpcomid": '3'
    },
    on: {
      "click": function($event) {
        _vm.cellFocus($event, 2)
      }
    }
  }), _vm._v(" "), _c('i-input', {
    attrs: {
      "title": "预计成交金额",
      "right": "",
      "request": "",
      "type": "number",
      "maxlength": "50",
      "eventid": '3',
      "mpcomid": '4'
    },
    on: {
      "input": function($event) {
        _vm.handleInput($event, 2)
      }
    },
    model: {
      value: (_vm.updateList.opportunity_achievement),
      callback: function($$v) {
        _vm.updateList.opportunity_achievement = $$v
      },
      expression: "updateList.opportunity_achievement"
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "预计成交时间",
      "request": "",
      "is-link": "",
      "i-class": "simple_cell",
      "i-cell-text": "color_495060_text",
      "mpcomid": '5'
    }
  }, [_c('picker', {
    attrs: {
      "mode": "date",
      "value": _vm.updateList.opportunity_deal,
      "start": _vm.nowDate,
      "eventid": '4'
    },
    on: {
      "change": _vm.dealChange
    },
    slot: "footer"
  }, [_c('view', {
    staticClass: "picker cell_picker"
  }, [_vm._v("\n                " + _vm._s(_vm.updateList.opportunity_deal) + "\n                ")])])], 1), _vm._v(" "), _c('i-input', {
    attrs: {
      "title": "备注",
      "right": "",
      "type": "textarea",
      "maxlength": "200",
      "eventid": '5',
      "mpcomid": '6'
    },
    on: {
      "input": function($event) {
        _vm.handleInput($event, 3)
      }
    },
    model: {
      value: (_vm.updateList.opportunity_remarks),
      callback: function($$v) {
        _vm.updateList.opportunity_remarks = $$v
      },
      expression: "updateList.opportunity_remarks"
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
      "eventid": '6',
      "mpcomid": '8'
    },
    on: {
      "click": _vm.addOpportunity
    }
  }, [_vm._v("确定")]), _vm._v(" "), _c('i-action-sheet', {
    attrs: {
      "visible": _vm.showContact,
      "actions": _vm.contactList,
      "eventid": '7',
      "mpcomid": '9'
    },
    on: {
      "change": _vm.contactChange
    }
  }), _vm._v(" "), _c('i-message', {
    attrs: {
      "id": "message",
      "mpcomid": '10'
    }
  }), _vm._v(" "), _c('i-toast', {
    attrs: {
      "id": "toast",
      "mpcomid": '11'
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
     require("vue-hot-reload-api").rerender("data-v-fbe9f158", esExports)
  }
}

/***/ })

},[343]);