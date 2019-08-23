require("../../../../common/manifest.js")
require("../../../../common/vendor.js")
global.webpackJsonpMpvue([6],{

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_62bafed4_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(408);
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_62bafed4_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\packageA\\task\\taskAdd\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-62bafed4", Component.options)
  } else {
    hotAPI.reload("data-v-62bafed4", Component.options)
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




/* harmony default export */ __webpack_exports__["a"] = ({
    data: function data() {
        return {
            current: '新增任务',

            addList: {
                customerId: '',
                customerName: '',
                startTime: '',
                endTime: '',
                remindTime: '',
                planningTheme: '',
                describe: ''
            },
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
            var poolObj = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.taskPoolName;
            this.addList.customerName = poolObj.poolName;
            this.addList.customerId = poolObj.poolNameID;
        },
        loadList: function loadList() {
            this.addList = {
                customerId: '',
                customerName: '',
                startTime: '',
                endTime: '',
                remindTime: '',
                planningTheme: '',
                describe: ''
            };
        },
        handleInput: function handleInput(e, val) {
            if (val == 1) {
                this.addList.planningTheme = e.mp.detail;
            } else if (val == 2) {
                this.addList.describe = e.mp.detail;
            }
        },
        cellFocus: function cellFocus(e, val) {
            if (val == 1) {
                var url = '../customers/main';
                global.mpvue.navigateTo({ url: url });
            }
        },
        dealChange: function dealChange(e, val) {
            console.log(e);
            if (val == 1) {
                this.addList.startTime = e.mp.detail + ':00';
            } else if (val == 2) {
                this.addList.endTime = e.mp.detail + ':00';
            } else if (val == 3) {
                this.addList.remindTime = e.mp.detail + ':00';
            }
        },
        addTask: function addTask() {
            var _this = this;

            var data = {
                customerId: this.addList.customerId,
                customerName: this.addList.customerName,
                startTime: this.addList.startTime,
                endTime: this.addList.endTime,
                remindTime: this.addList.remindTime,
                planningTheme: this.addList.planningTheme,
                describe: this.addList.describe,
                pId: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.pId,
                secondid: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.second_id,
                deptid: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.private_deptid
            };
            console.log(data);

            var flag = false;
            if (!data.describe) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '请填写描述',
                    type: 'warning'
                });
                flag = true;
            }
            if (!data.planningTheme) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '请填写任务主题',
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
            if (!data.startTime) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '请填写开始时间',
                    type: 'warning'
                });
                flag = true;
            }
            if (!data.customerId) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '请选择关联客户',
                    type: 'warning'
                });
                flag = true;
            }
            if (flag) return;

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'workPlan/insertWorkPlan.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
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
                        _this.toTask();
                    } else {
                        Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Message"])({
                            content: res.data.msg,
                            type: 'error'
                        });
                    }
                }
            });
        },
        toTask: function toTask() {
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
      "mpcomid": '10'
    }
  }, [_c('i-cell', {
    attrs: {
      "title": "关联客户",
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
      "title": "开始时间",
      "request": "",
      "is-link": "",
      "i-class": "simple_cell",
      "i-cell-text": "color_495060_text",
      "mpcomid": '3'
    }
  }, [_c('i-datetime-picker', {
    staticClass: "cell_picker",
    attrs: {
      "value": _vm.addList.startTime,
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
  })], 1), _vm._v(" "), _c('i-input', {
    attrs: {
      "title": "任务主题",
      "right": "",
      "request": "",
      "maxlength": "50",
      "eventid": '4',
      "mpcomid": '8'
    },
    on: {
      "input": function($event) {
        _vm.handleInput($event, 1)
      }
    },
    model: {
      value: (_vm.addList.planningTheme),
      callback: function($$v) {
        _vm.addList.planningTheme = $$v
      },
      expression: "addList.planningTheme"
    }
  }), _vm._v(" "), _c('i-input', {
    attrs: {
      "title": "描述",
      "right": "",
      "request": "",
      "type": "textarea",
      "maxlength": "200",
      "eventid": '5',
      "mpcomid": '9'
    },
    on: {
      "input": function($event) {
        _vm.handleInput($event, 2)
      }
    },
    model: {
      value: (_vm.addList.describe),
      callback: function($$v) {
        _vm.addList.describe = $$v
      },
      expression: "addList.describe"
    }
  })], 1), _vm._v(" "), _c('i-button', {
    staticClass: "bottom_btn",
    attrs: {
      "type": "ghost",
      "long": true,
      "eventid": '6',
      "mpcomid": '11'
    },
    on: {
      "click": _vm.addTask
    }
  }, [_vm._v("确定")]), _vm._v(" "), _c('i-message', {
    attrs: {
      "id": "message",
      "mpcomid": '12'
    }
  }), _vm._v(" "), _c('i-toast', {
    attrs: {
      "id": "toast",
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
     require("vue-hot-reload-api").rerender("data-v-62bafed4", esExports)
  }
}

/***/ })

},[404]);