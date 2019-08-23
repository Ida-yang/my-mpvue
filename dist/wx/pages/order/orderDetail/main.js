require("../../../common/manifest.js")
require("../../../common/vendor.js")
global.webpackJsonpMpvue([63],{

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(110);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_6fbeb1a8_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(113);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(111)
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_6fbeb1a8_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\order\\orderDetail\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6fbeb1a8", Component.options)
  } else {
    hotAPI.reload("data-v-6fbeb1a8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 111:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 112:
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
            current: '订单详情页',

            infoData: {},

            orderDetail: {},
            productsData: [],
            authority: false,

            activeName: 'first',

            stepIndex: -1,
            auditLog: [],

            showSure: false,
            showRefuse: false,
            remarks: ''
        };
    },
    onShow: function onShow() {
        this.loadData();
    },


    methods: {
        loadData: function loadData() {
            var info = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.orderDetailData;
            this.infoData = info;

            var _this = this;
            var data = {
                id: info.id
            };

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'order/selectById.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    var info = res.data;
                    if (info.checkStatus == 0) {
                        info.auditStatus = '未审核';
                    } else if (info.checkStatus == 1) {
                        info.auditStatus = '审核中';
                    } else if (info.checkStatus == 2) {
                        info.auditStatus = '已审核';
                    } else if (info.checkStatus == 3) {
                        info.auditStatus = '未通过';
                    }
                    _this.orderDetail = info;

                    _this.productsData = info.orderDetails;

                    var a = 0;
                    var b = 0;
                    var c = 0;
                    var d = 0;
                    var e = 0;

                    _this.productsData.forEach(function (el) {
                        if (el.image) {
                            el.proImage = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].sourcehost + 'product/' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId + '/' + el.image;
                        } else {
                            el.proImage = '../../../static/images/noProduct.png';
                        }
                        a += el.amountOfMoney;
                        b += el.discountAmount;
                        c += el.discountAfter;
                        d += el.taxAmount;
                        e += el.taxAfter;
                    });

                    _this.orderDetail.amountOfMoney = a.toFixed(2);
                    _this.orderDetail.discountAmount = b.toFixed(2);
                    _this.orderDetail.discountAfter = c.toFixed(2);
                    _this.orderDetail.taxAmount = d.toFixed(2);
                    _this.orderDetail.taxAfter = e.toFixed(2);

                    _this.loadState();
                    _this.loadLog();
                }
            });
        },
        loadState: function loadState() {
            var _this = this;

            var data = {
                checkStatus: this.orderDetail.checkStatus,
                recordId: this.orderDetail.examineRecordId,
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

                    if (info.isCheck == 1 && _this.orderDetail.checkStatus !== 2) {
                        _this.authority = true;
                    } else {
                        _this.authority = false;
                    }
                }
            });
        },
        loadLog: function loadLog() {
            var _this = this;

            var data = {
                recordId: this.orderDetail.examineRecordId
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
                id: this.orderDetail.id,
                recordId: this.orderDetail.examineRecordId,
                status: 1,
                remarks: this.remarks,
                pId: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.pId
            };

            var flag = false;
            if (!data.remarks) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '审批意见不能为空',
                    type: 'warning'
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
                id: this.orderDetail.id,
                recordId: this.orderDetail.examineRecordId,
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
        tabClick: function tabClick(e) {
            this.activeName = e.target.key;
        }
    }
});

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "order_detail_wrap"
  }, [_c('i-cell', {
    attrs: {
      "title": _vm.orderDetail.customerName,
      "mpcomid": '3'
    }
  }, [_c('p', {
    staticClass: "cell_info"
  }, [_vm._v("订单编号：  " + _vm._s(_vm.orderDetail.orderNo))]), _vm._v(" "), _c('p', {
    staticClass: "cell_info"
  }, [_vm._v("负责人：  " + _vm._s(_vm.orderDetail.ascription) + "   |   订单时间：  " + _vm._s(_vm.orderDetail.orderTime))]), _vm._v(" "), (_vm.authority) ? _c('view', {
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
      "title": '审核状态：' + _vm.orderDetail.auditStatus,
      "i-class": "cell_link",
      "mpcomid": '2'
    }
  })], 1), _vm._v(" "), _c('i-panel', {
    attrs: {
      "title": " ",
      "mpcomid": '8'
    }
  }, [_c('i-tabs', {
    attrs: {
      "current": _vm.activeName,
      "eventid": '2',
      "mpcomid": '7'
    },
    on: {
      "change": _vm.tabClick
    }
  }, [_c('i-tab', {
    key: "first",
    attrs: {
      "title": "订单详情",
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
      "title": "审核信息",
      "mpcomid": '6'
    }
  })], 1)], 1), _vm._v(" "), (_vm.activeName == 'first') ? _c('view', [_vm._l((_vm.productsData), function(item, index) {
    return _c('view', {
      key: item.id,
      staticClass: "order_pro"
    }, [_c('view', {
      staticClass: "pro_head"
    }, [_c('image', {
      staticClass: "pro_image",
      attrs: {
        "src": item.proImage,
        "aspectFit": ""
      }
    })]), _vm._v(" "), _c('view', {
      staticClass: "pro_content"
    }, [_c('view', {
      staticClass: "detail_module"
    }), _vm._v(" "), _c('view', {
      staticClass: "pro_title"
    }, [_vm._v(_vm._s(item.goodsName))]), _vm._v(" "), (item.title !== item.goodsName) ? _c('view', {
      staticClass: "pro_spec"
    }, [_vm._v(_vm._s(item.title))]) : _vm._e(), _vm._v(" "), _c('view', {
      staticClass: "pro_desc"
    }, [_vm._v(_vm._s(item.describe))]), _vm._v(" "), _c('view', {
      staticClass: "pro_foot"
    }, [_vm._v("数量：" + _vm._s(item.num) + "    单价：" + _vm._s(item.price) + "   金额：" + _vm._s(item.amountOfMoney))])])])
  }), _vm._v(" "), _c('view', {
    staticClass: "detail_module"
  }), _vm._v(" "), _c('i-card', {
    attrs: {
      "full": "",
      "desc": "",
      "title": "金额信息",
      "mpcomid": '14'
    }
  }, [_c('i-cell', {
    attrs: {
      "i-class": "card_cell",
      "title": "销售金额",
      "value": _vm.orderDetail.amountOfMoney,
      "mpcomid": '9'
    },
    slot: "content"
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "i-class": "card_cell",
      "title": "折扣额",
      "value": _vm.orderDetail.discountAmount,
      "mpcomid": '10'
    },
    slot: "content"
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "i-class": "card_cell",
      "title": "折后金额",
      "value": _vm.orderDetail.discountAfter,
      "mpcomid": '11'
    },
    slot: "content"
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "i-class": "card_cell",
      "title": "税额",
      "value": _vm.orderDetail.taxAmount,
      "mpcomid": '12'
    },
    slot: "content"
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "i-class": "card_cell",
      "title": "税后金额",
      "value": _vm.orderDetail.taxAfter,
      "mpcomid": '13'
    },
    slot: "content"
  })], 1)], 2) : _vm._e(), _vm._v(" "), (_vm.activeName == 'second') ? _c('view', [_c('i-cell-group', {
    attrs: {
      "mpcomid": '25'
    }
  }, [_c('i-cell', {
    attrs: {
      "title": "总金额",
      "value": _vm.orderDetail.totalSum,
      "mpcomid": '15'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "联系人",
      "value": _vm.orderDetail.contactsName,
      "mpcomid": '16'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "结算方式",
      "value": _vm.orderDetail.settlement,
      "mpcomid": '17'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "交货方式",
      "value": _vm.orderDetail.delivery,
      "mpcomid": '18'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "交货地址",
      "value": _vm.orderDetail.deliveryAddress,
      "mpcomid": '19'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "创建时间",
      "value": _vm.orderDetail.createTime,
      "mpcomid": '20'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "制单人",
      "value": _vm.orderDetail.private_employee,
      "mpcomid": '21'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "业务员",
      "value": _vm.orderDetail.ascription,
      "mpcomid": '22'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "部门",
      "value": _vm.orderDetail.deptname,
      "mpcomid": '23'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "机构",
      "value": _vm.orderDetail.parentname,
      "mpcomid": '24'
    }
  })], 1)], 1) : _vm._e(), _vm._v(" "), (_vm.activeName == 'third') ? _c('view', {
    staticClass: "white_bg"
  }, [_c('view', {
    staticClass: "detail_module"
  }), _vm._v(" "), _c('i-steps', {
    attrs: {
      "current": _vm.stepIndex,
      "direction": "vertical",
      "i-class": "stage_steps",
      "mpcomid": '28'
    }
  }, _vm._l((_vm.auditLog), function(item, index) {
    return _c('i-step', {
      key: item.orderId,
      attrs: {
        "status": item.stepStatus,
        "icon": item.stepIcon,
        "mpcomid": '27_' + index
      }
    }, [_c('i-fiche', {
      attrs: {
        "isContent": "",
        "isFooter": "",
        "title": item.realname,
        "extra": item.auditState,
        "thumb": item.portrait,
        "mpcomid": '26_' + index
      },
      slot: "title"
    }, [_c('view', {
      slot: "content"
    }, [_vm._v(_vm._s(item.remarks))]), _vm._v(" "), _c('view', {
      slot: "footer"
    }, [_vm._v(_vm._s(item.examineTime))])])], 1)
  }))], 1) : _vm._e(), _vm._v(" "), _c('i-modal', {
    attrs: {
      "title": "请填写审核意见",
      "visible": _vm.showSure,
      "eventid": '4',
      "mpcomid": '30'
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
      "eventid": '3',
      "mpcomid": '29'
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
      "eventid": '6',
      "mpcomid": '32'
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
      "eventid": '5',
      "mpcomid": '31'
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
      "mpcomid": '33'
    }
  }), _vm._v(" "), _c('i-message', {
    attrs: {
      "id": "message",
      "mpcomid": '34'
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
     require("vue-hot-reload-api").rerender("data-v-6fbeb1a8", esExports)
  }
}

/***/ })

},[109]);