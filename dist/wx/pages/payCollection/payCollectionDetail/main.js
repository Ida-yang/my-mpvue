require("../../../common/manifest.js")
require("../../../common/vendor.js")
global.webpackJsonpMpvue([7],{

/***/ 329:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(330);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 330:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_a9c26748_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(333);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(331)
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_a9c26748_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\payCollection\\payCollectionDetail\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a9c26748", Component.options)
  } else {
    hotAPI.reload("data-v-a9c26748", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 331:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 332:
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
            current: '回款详情',

            payCollectionDetail: {},
            authority: false,

            activeName: 'first',

            stepIndex: -1,
            auditLog: [],
            payInfoData: [],

            showSure: false,
            showRefuse: false,
            remarks: ''
        };
    },
    mounted: function mounted() {
        this.loadData();
    },


    methods: {
        loadData: function loadData() {
            this.payCollectionDetail = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.payCollectionDetailData;

            this.loadState();
            this.loadAudit();
            this.loadMoneyBack();
        },
        loadState: function loadState() {
            var _this = this;

            var data = {
                recordId: this.payCollectionDetail.examineRecordId,
                pId: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.pId
            };

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'examineRecord/queryExamineRecordList.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    var info = res.data;

                    if (info.isCheck == 1 && _this.checkStatus !== 2) {
                        _this.authority = true;
                    } else {
                        _this.authority = false;
                    }
                }
            });
        },
        loadAudit: function loadAudit() {
            var _this = this;
            var data = {
                recordId: this.payCollectionDetail.examineRecordId
            };

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'examineLog/queryExamineLogList.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    var info = res.data;
                    info.forEach(function (el) {
                        if (el.examineStatus == 1) {
                            el.auditState = '审核通过';
                            el.stepStatus = 'finish';
                            el.stepIcon = 'right';
                        } else if (el.examineStatus == 2) {
                            el.auditState = '审核未通过';
                            el.stepStatus = 'error';
                            el.stepIcon = 'close';
                        }
                        if (el.img) {
                            el.portrait = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].sourcehost + 'upload/' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId + '/' + el.img;
                        } else {
                            el.portrait = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].sourcehost + 'upload/staticImg/avatar.jpg';
                        }
                    });

                    _this.auditLog = info;
                }
            });
        },
        loadMoneyBack: function loadMoneyBack() {
            var _this = this;
            var data = {
                contract_id: this.payCollectionDetail.contract_id
            };

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'back/selectBackByContactId.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    _this.payInfoData = res.data;
                }
            });
        },
        handleClick: function handleClick(e, val) {
            if (val == 1) {
                this.showSure = true;
            } else if (val == 2) {
                this.showRefuse = true;
            }
        },
        cancelClick: function cancelClick(e, val) {
            if (val == 1) {
                this.showSure = false;
            } else if (val == 2) {
                this.showRefuse = false;
            }
        },
        handleInput: function handleInput(e) {
            this.remarks = e.mp.detail;
        },
        adopt: function adopt() {
            var _this = this;
            var data = {
                id: this.payCollectionDetail.id,
                recordId: this.payCollectionDetail.examineRecordId,
                status: 1,
                remarks: this.remarks,
                pId: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.pId
            };

            var flag = false;
            if (!data.remarks) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '审批意见不能为空',
                    type: 'error'
                });
                flag = true;
            }
            if (flag) return;

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'examineRecord/auditExamine.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    if (res.data.code && res.data.code == '200') {
                        Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Message"])({
                            content: '审批成功',
                            type: 'success'
                        });
                        _this.remarks = '';
                        _this.showSure = false;
                        _this.loadData();
                    } else {
                        Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Message"])({
                            content: res.data.msg,
                            type: 'error'
                        });
                    }
                }
            });
        },
        refuse: function refuse() {
            var _this = this;
            var data = {
                id: this.payCollectionDetail.id,
                recordId: this.payCollectionDetail.examineRecordId,
                status: 2,
                remarks: this.remarks,
                pId: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.pId
            };

            var flag = false;
            if (!data.remarks) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '审批意见不能为空',
                    type: 'error'
                });
                flag = true;
            }
            if (flag) return;

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'examineRecord/auditExamine.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    if (res.data.code && res.data.code == '200') {
                        Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Message"])({
                            content: '审批成功',
                            type: 'success'
                        });
                        _this.remarks = '';
                        _this.showRefuse = false;
                        _this.loadData();
                    } else {
                        Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Message"])({
                            content: res.data.msg,
                            type: 'error'
                        });
                    }
                }
            });
        },
        toPayState: function toPayState() {},
        tabClick: function tabClick(e) {
            this.activeName = e.target.key;
        }
    }
});

/***/ }),

/***/ 333:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "pay_detail_wrap"
  }, [_c('i-cell', {
    attrs: {
      "title": _vm.payCollectionDetail.customerName,
      "mpcomid": '3'
    }
  }, [_c('p', {
    staticClass: "cell_info"
  }, [_vm._v("回款金额：  " + _vm._s(_vm.payCollectionDetail.price + '元'))]), _vm._v(" "), _c('p', {
    staticClass: "cell_info"
  }, [_vm._v("收款方式：  " + _vm._s(_vm.payCollectionDetail.pay_type))]), _vm._v(" "), _c('p', {
    staticClass: "cell_info"
  }, [_vm._v("单号：  " + _vm._s(_vm.payCollectionDetail.backNo))]), _vm._v(" "), (_vm.authority) ? _c('view', {
    staticClass: "btn_group"
  }, [_c('i-button', {
    staticClass: "flex_btn",
    attrs: {
      "type": "subject",
      "size": "small",
      "eventid": '0',
      "mpcomid": '0'
    },
    on: {
      "click": function($event) {
        _vm.handleClick($event, 1)
      }
    }
  }, [_vm._v("通过")]), _vm._v(" "), _c('i-button', {
    staticClass: "flex_btn",
    attrs: {
      "type": "ghost",
      "size": "small",
      "eventid": '1',
      "mpcomid": '1'
    },
    on: {
      "click": function($event) {
        _vm.handleClick($event, 2)
      }
    }
  }, [_vm._v("拒绝")])], 1) : _vm._e(), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": '审核状态：' + _vm.payCollectionDetail.checkState,
      "is-link": "",
      "i-class": "cell_link",
      "eventid": '2',
      "mpcomid": '2'
    },
    on: {
      "click": _vm.toPayState
    }
  })], 1), _vm._v(" "), _c('i-panel', {
    attrs: {
      "title": " ",
      "mpcomid": '8'
    }
  }, [_c('i-tabs', {
    attrs: {
      "current": _vm.activeName,
      "eventid": '3',
      "mpcomid": '7'
    },
    on: {
      "change": _vm.tabClick
    }
  }, [_c('i-tab', {
    key: "first",
    attrs: {
      "title": "审批历史",
      "mpcomid": '4'
    }
  }), _vm._v(" "), _c('i-tab', {
    key: "second",
    attrs: {
      "title": "基本信息",
      "mpcomid": '5'
    }
  }), _vm._v(" "), _c('i-tab', {
    key: "third",
    attrs: {
      "title": "相关信息",
      "mpcomid": '6'
    }
  })], 1)], 1), _vm._v(" "), (_vm.activeName == 'first') ? _c('view', {
    staticClass: "white_bg font_size_12"
  }, [_c('view', {
    staticClass: "detail_module"
  }), _vm._v(" "), _c('i-steps', {
    attrs: {
      "current": _vm.stepIndex,
      "direction": "vertical",
      "i-class": "stage_steps",
      "mpcomid": '11'
    }
  }, _vm._l((_vm.auditLog), function(item, index) {
    return _c('i-step', {
      key: item.orderId,
      attrs: {
        "status": item.stepStatus,
        "icon": item.stepIcon,
        "mpcomid": '10_' + index
      }
    }, [_c('i-fiche', {
      attrs: {
        "isContent": "",
        "isFooter": "",
        "title": item.realname,
        "extra": item.auditState,
        "thumb": item.portrait,
        "mpcomid": '9_' + index
      },
      slot: "title"
    }, [_c('view', {
      slot: "content"
    }, [_vm._v(_vm._s(item.remarks))]), _vm._v(" "), _c('view', {
      slot: "footer"
    }, [_vm._v(_vm._s(item.examineTime))])])], 1)
  }))], 1) : _vm._e(), _vm._v(" "), (_vm.activeName == 'second') ? _c('view', {
    staticClass: "font_size_12"
  }, [_c('i-cell-group', {
    attrs: {
      "mpcomid": '23'
    }
  }, [_c('i-cell', {
    attrs: {
      "title": "回款单号",
      "value": _vm.payCollectionDetail.backNo,
      "mpcomid": '12'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "客户名称",
      "value": _vm.payCollectionDetail.customerName,
      "mpcomid": '13'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "回款阶段",
      "value": _vm.payCollectionDetail.back_plan,
      "mpcomid": '14'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "回款金额",
      "value": _vm.payCollectionDetail.price + '元',
      "mpcomid": '15'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "收款方式",
      "value": _vm.payCollectionDetail.pay_type,
      "mpcomid": '16'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "原单号",
      "value": _vm.payCollectionDetail.contract_number,
      "mpcomid": '17'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "原单类型",
      "value": _vm.payCollectionDetail.type,
      "mpcomid": '18'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "创建时间",
      "value": _vm.payCollectionDetail.createTime,
      "mpcomid": '19'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "我方签约人",
      "value": _vm.payCollectionDetail.private_employee,
      "mpcomid": '20'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "部门",
      "value": _vm.payCollectionDetail.deptname,
      "mpcomid": '21'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "机构",
      "value": _vm.payCollectionDetail.parentname,
      "mpcomid": '22'
    }
  })], 1)], 1) : _vm._e(), _vm._v(" "), (_vm.activeName == 'third') ? _c('view', {
    staticClass: "font_size_12"
  }, [_c('i-card', {
    attrs: {
      "full": "",
      "title": "已回款信息",
      "mpcomid": '25'
    }
  }, _vm._l((_vm.payInfoData), function(item, index) {
    return _c('i-cell', {
      key: item.id,
      attrs: {
        "i-class": "card_cell",
        "title": item.back_plan,
        "label": '回款日期：' + item.createTime,
        "mpcomid": '24_' + index
      },
      slot: "content"
    }, [_c('view', {
      slot: "footer"
    }, [_c('p', [_vm._v(_vm._s(item.price + '元'))]), _vm._v(" "), _c('p', {
      staticClass: "gray_12"
    }, [_vm._v(_vm._s(item.pay_type))])], 1)])
  }))], 1) : _vm._e(), _vm._v(" "), _c('i-modal', {
    attrs: {
      "title": "请填写审核意见",
      "visible": _vm.showSure,
      "eventid": '5',
      "mpcomid": '27'
    },
    on: {
      "ok": _vm.adopt,
      "cancel": function($event) {
        _vm.cancelClick($event, 1)
      }
    }
  }, [_c('i-input', {
    attrs: {
      "right": "",
      "type": "textarea",
      "request": "",
      "maxlength": "200",
      "eventid": '4',
      "mpcomid": '26'
    },
    on: {
      "input": _vm.handleInput
    },
    model: {
      value: (_vm.remarks),
      callback: function($$v) {
        _vm.remarks = $$v
      },
      expression: "remarks"
    }
  })], 1), _vm._v(" "), _c('i-modal', {
    attrs: {
      "title": "请填写审核意见",
      "visible": _vm.showRefuse,
      "eventid": '7',
      "mpcomid": '29'
    },
    on: {
      "ok": _vm.refuse,
      "cancel": function($event) {
        _vm.cancelClick($event, 2)
      }
    }
  }, [_c('i-input', {
    attrs: {
      "right": "",
      "type": "textarea",
      "request": "",
      "maxlength": "200",
      "eventid": '6',
      "mpcomid": '28'
    },
    on: {
      "input": _vm.handleInput
    },
    model: {
      value: (_vm.remarks),
      callback: function($$v) {
        _vm.remarks = $$v
      },
      expression: "remarks"
    }
  })], 1), _vm._v(" "), _c('i-toast', {
    attrs: {
      "id": "toast",
      "mpcomid": '30'
    }
  }), _vm._v(" "), _c('i-message', {
    attrs: {
      "id": "message",
      "mpcomid": '31'
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
     require("vue-hot-reload-api").rerender("data-v-a9c26748", esExports)
  }
}

/***/ })

},[329]);