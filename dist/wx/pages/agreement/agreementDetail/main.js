require("../../../common/manifest.js")
require("../../../common/vendor.js")
global.webpackJsonpMpvue([65],{

/***/ 27:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(28);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 28:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_e68491b8_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(31);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(29)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-e68491b8"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_e68491b8_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\agreement\\agreementDetail\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e68491b8", Component.options)
  } else {
    hotAPI.reload("data-v-e68491b8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 29:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 30:
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
//
//
//
//
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
            current: '合同详情',

            agreementDetail: {},
            checkStatus: '',
            examineRecordId: '',
            authority: false,

            activeName: 'first',

            followData: [],
            payPlanData: [],
            payInfoData: [],

            activeBar: '',
            showDetele: false,
            deleteActions: [{
                name: '删除',
                color: '#f56c6c'
            }],

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
            var _this = this;
            this.agreementDetail = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.agreementDetailData;
            // let info = config.information.agreementDetailData
            // let data = {
            //     contractId: info.contract_id
            // }

            // wx.request({
            //     method:'post',
            //     url: config.defaulthost + 'backPlan/selectBackPlanByContractId.do?cId=' + config.userData.cId,  //接口地址
            //     data: data,
            //     header:{
            //         "Content-Type": "application/x-www-form-urlencoded",
            //         'Cookie': config.SESSIONID
            //     },
            //     success:function(res) {
            //         _this.agreementDetail = res.data
            _this.checkStatus = _this.agreementDetail.checkStatus;
            _this.examineRecordId = _this.agreementDetail.examineRecordId;

            _this.loadState();
            _this.loadFollows();
            _this.loadMoneyBack();
            //     }
            // })
        },
        loadState: function loadState() {
            var _this = this;

            var data = {
                checkStatus: this.checkStatus,
                recordId: this.examineRecordId,
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
        loadFollows: function loadFollows() {
            var _this = this;
            var data = {
                contract_id: this.agreementDetail.contract_id
            };

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'getFollowByOpportunityIdOrContractId.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    var info = res.data.map.success;
                    info.forEach(function (el) {
                        if (el.userImagName) {
                            el.portrait = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].sourcehost + 'upload/' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId + '/' + el.userImagName;
                        } else {
                            el.portrait = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].sourcehost + 'upload/staticImg/avatar.jpg';
                        }

                        if (el.imgName) {
                            el.followImg = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].sourcehost + 'upload/' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId + '/' + el.imgName;
                        } else {
                            el.followImg = '';
                        }
                        el.followContent = el.followContent.replace(/\n/g, '<br/>');
                        el.followContent = '<div>' + el.followContent + '</div>';
                    });

                    _this.followData = info;
                }
            });
        },
        loadMoneyBack: function loadMoneyBack() {
            var _this = this;
            var data = {
                contract_id: this.agreementDetail.contract_id
            };

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'backPlan/selectBackPlanByContractId.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.payplanData = res.data;
                    _this.payPlanData = res.data;
                }
            });

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'back/selectBackByContactId.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.payinfoData = res.data;
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
                id: this.agreementDetail.contract_id,
                recordId: this.agreementDetail.examineRecordId,
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
                id: this.agreementDetail.contract_id,
                recordId: this.agreementDetail.examineRecordId,
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
        toAgreeState: function toAgreeState() {
            var url = '../agreementState/main';
            global.mpvue.navigateTo({ url: url });
        },
        tabClick: function tabClick(e) {
            this.activeName = e.target.key;
        },
        topayPlan: function topayPlan(e) {
            var url = '../paymentPlan/main';
            global.mpvue.navigateTo({ url: url });
        },
        topayInfo: function topayInfo() {
            var url = '../paymentInfo/main';
            global.mpvue.navigateTo({ url: url });
        },
        changeBar: function changeBar(val) {
            var key = val.target.key;
            this.activeBar = key;
            if (key == 'brush') {
                var url = '../agreementFollow/main';
                global.mpvue.navigateTo({ url: url });
            } else if (key == 'addressbook') {
                this.telephoneCall();
            } else if (key == 'trash') {
                this.showDetele = true;
            }
        },
        telephoneCall: function telephoneCall() {
            var phoneNum = this.agreementDetail.phone;
            if (phoneNum) {
                wx.makePhoneCall({
                    phoneNumber: phoneNum
                });
            } else {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '无法呼叫，请添加手机号码',
                    type: 'error'
                });
            }
        },
        cancelDelete: function cancelDelete() {
            this.showDetele = false;
        },
        deleteAgree: function deleteAgree() {
            var _this = this;
            var data = {
                ids: this.agreementDetail.contract_id
            };

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'delContract.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    if (res.data == 'success') {
                        Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Message"])({
                            content: '删除成功',
                            type: 'success'
                        });
                        _this.toAgreement();
                    } else if (res.data.msg && res.data.msg == 'error') {
                        Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                            content: '对不起，您没有此权限',
                            type: 'error'
                        });
                        _this.cancelDelete();
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

/***/ 31:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "agree_detail_wrap"
  }, [_c('i-cell', {
    attrs: {
      "title": _vm.agreementDetail.contract_name,
      "mpcomid": '3'
    }
  }, [_c('p', {
    staticClass: "cell_info"
  }, [_vm._v("合同编号：  " + _vm._s(_vm.agreementDetail.contract_number))]), _vm._v(" "), _c('p', {
    staticClass: "cell_info"
  }, [_vm._v("合同金额：  " + _vm._s(_vm.agreementDetail.amount) + "   |   到期时间：  " + _vm._s(_vm.agreementDetail.end_date))]), _vm._v(" "), (_vm.authority) ? _c('view', {
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
      "title": '审核状态：' + _vm.agreementDetail.auditStatus,
      "is-link": "",
      "i-class": "cell_link",
      "eventid": '2',
      "mpcomid": '2'
    },
    on: {
      "click": _vm.toAgreeState
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
      "title": "跟进记录",
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
    staticClass: "follow_view"
  }, _vm._l((_vm.followData), function(item, index) {
    return _c('view', {
      key: item.id
    }, [_c('i-panel', {
      attrs: {
        "title": item.createTime,
        "i-class": "vice_panel",
        "mpcomid": '9_' + index
      }
    }), _vm._v(" "), _c('i-fiche', {
      attrs: {
        "full": "",
        "isContent": "",
        "isFooter": "",
        "title": item.contacts[0].name,
        "thumb": item.portrait,
        "mpcomid": '11_' + index
      }
    }, [_c('view', {
      slot: "content"
    }, [_c('rich-text', {
      attrs: {
        "nodes": item.followContent,
        "mpcomid": '10_' + index
      }
    })], 1), _vm._v(" "), _c('view', {
      slot: "footer"
    }, [_c('span', {
      staticClass: "bgc_span"
    }, [_vm._v(_vm._s(item.followType))]), _vm._v(" "), (item.contactTime) ? _c('span', [_vm._v("    ")]) : _vm._e(), _vm._v(" "), (item.contactTime) ? _c('span', {
      staticClass: "bgc_span"
    }, [_vm._v(_vm._s(item.contactTime))]) : _vm._e(), _vm._v("\n                        \n                    "), _c('span', [_vm._v(_vm._s(item.inputType))]), _vm._v(" "), _c('br'), _vm._v(" "), (item.followImg) ? _c('image', {
      staticClass: "follow_image",
      attrs: {
        "mode": "scaleToFill",
        "src": item.followImg
      }
    }) : _vm._e()], 1)])], 1)
  })) : _vm._e(), _vm._v(" "), (_vm.activeName == 'second') ? _c('view', {
    staticClass: "font_size_12"
  }, [_c('i-cell-group', {
    attrs: {
      "mpcomid": '24'
    }
  }, [_c('i-cell', {
    attrs: {
      "title": "公司名称",
      "value": _vm.agreementDetail.poolName,
      "mpcomid": '12'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "客户签约人",
      "value": _vm.agreementDetail.signatories,
      "mpcomid": '13'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "电话",
      "value": _vm.agreementDetail.phone,
      "mpcomid": '14'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "合同类型",
      "value": _vm.agreementDetail.contract_type,
      "mpcomid": '15'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "合同开始时间",
      "value": _vm.agreementDetail.start_date,
      "mpcomid": '16'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "合同结束时间",
      "value": _vm.agreementDetail.end_date,
      "mpcomid": '17'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "合同金额",
      "value": _vm.agreementDetail.amount,
      "mpcomid": '18'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "关联商机",
      "value": _vm.agreementDetail.opportunity_name,
      "mpcomid": '19'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "创建时间",
      "value": _vm.agreementDetail.create_time,
      "mpcomid": '20'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "我方签约人",
      "value": _vm.agreementDetail.our_signatories,
      "mpcomid": '21'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "部门",
      "value": _vm.agreementDetail.deptname,
      "mpcomid": '22'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "机构",
      "value": _vm.agreementDetail.parentname,
      "mpcomid": '23'
    }
  })], 1)], 1) : _vm._e(), _vm._v(" "), (_vm.activeName == 'third') ? _c('view', {
    staticClass: "font_size_12"
  }, [_c('i-card', {
    attrs: {
      "full": "",
      "desc": "",
      "title": "回款计划",
      "mpcomid": '26'
    }
  }, [_c('span', {
    attrs: {
      "eventid": '4'
    },
    on: {
      "click": _vm.topayPlan
    },
    slot: "desc"
  }, [_vm._v("+")]), _vm._v(" "), _vm._l((_vm.payPlanData), function(item, index) {
    return _c('i-cell', {
      key: item.id,
      attrs: {
        "i-class": "card_cell",
        "title": item.stage,
        "value": item.price + '元',
        "label": '预计回款日期：' + item.date,
        "mpcomid": '25_' + index
      },
      slot: "content"
    })
  })], 2), _vm._v(" "), _c('view', {
    staticClass: "detail_module"
  }), _vm._v(" "), _c('i-card', {
    attrs: {
      "full": "",
      "desc": "",
      "title": "回款信息",
      "mpcomid": '28'
    }
  }, [_c('span', {
    attrs: {
      "eventid": '5'
    },
    on: {
      "click": _vm.topayInfo
    },
    slot: "desc"
  }, [_vm._v("+")]), _vm._v(" "), _vm._l((_vm.payInfoData), function(item, index) {
    return _c('i-cell', {
      key: item.id,
      attrs: {
        "i-class": "card_cell",
        "title": item.back_plan,
        "label": '回款日期：' + item.createTime,
        "mpcomid": '27_' + index
      },
      slot: "content"
    }, [_c('view', {
      slot: "footer"
    }, [_c('p', [_vm._v(_vm._s(item.price + '元'))]), _vm._v(" "), _c('p', {
      staticClass: "gray_12"
    }, [_vm._v(_vm._s(item.pay_type))])], 1)])
  })], 2)], 1) : _vm._e(), _vm._v(" "), _c('i-tab-bar', {
    staticClass: "bottom_btn",
    attrs: {
      "current": _vm.activeBar,
      "eventid": '6',
      "mpcomid": '32'
    },
    on: {
      "change": _vm.changeBar
    }
  }, [_c('i-tab-bar-item', {
    key: "brush",
    attrs: {
      "icon": "brush",
      "current-icon": "brush",
      "title": "写跟进",
      "mpcomid": '29'
    }
  }), _vm._v(" "), _c('i-tab-bar-item', {
    key: "addressbook",
    attrs: {
      "icon": "addressbook",
      "current-icon": "addressbook",
      "title": "打电话",
      "mpcomid": '30'
    }
  }), _vm._v(" "), _c('i-tab-bar-item', {
    key: "trash",
    attrs: {
      "icon": "trash",
      "current-icon": "trash",
      "title": "删除",
      "mpcomid": '31'
    }
  })], 1), _vm._v(" "), _c('i-action-sheet', {
    attrs: {
      "visible": _vm.showDetele,
      "actions": _vm.deleteActions,
      "show-cancel": "",
      "mask-closable": false,
      "eventid": '7',
      "mpcomid": '33'
    },
    on: {
      "cancel": _vm.cancelDelete,
      "change": _vm.deleteAgree
    }
  }, [_c('view', {
    staticStyle: {
      "padding": "16px"
    },
    slot: "header"
  }, [_c('view', {
    staticStyle: {
      "color": "#444",
      "font-size": "16px"
    }
  }, [_vm._v("确定吗？")]), _vm._v(" "), _c('text', [_vm._v("删除后无法恢复哦")])])]), _vm._v(" "), _c('i-modal', {
    attrs: {
      "title": "请填写审核意见",
      "visible": _vm.showSure,
      "eventid": '9',
      "mpcomid": '35'
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
      "eventid": '8',
      "mpcomid": '34'
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
      "eventid": '11',
      "mpcomid": '37'
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
      "eventid": '10',
      "mpcomid": '36'
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
      "mpcomid": '38'
    }
  }), _vm._v(" "), _c('i-message', {
    attrs: {
      "id": "message",
      "mpcomid": '39'
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
     require("vue-hot-reload-api").rerender("data-v-e68491b8", esExports)
  }
}

/***/ })

},[27]);