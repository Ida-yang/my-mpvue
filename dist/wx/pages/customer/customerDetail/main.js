require("../../../common/manifest.js")
require("../../../common/vendor.js")
global.webpackJsonpMpvue([29],{

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(106);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_7e81bae4_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(109);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(107)
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_7e81bae4_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\customer\\customerDetail\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7e81bae4", Component.options)
  } else {
    hotAPI.reload("data-v-7e81bae4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 107:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 108:
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
//
//




/* harmony default export */ __webpack_exports__["a"] = ({
    data: function data() {
        return {
            current: '客户详情',

            customerData: {},
            customerContact: {},

            activeName: 'first',

            followData: [],
            contactData: [],
            opportunityData: [],
            agreementData: [],
            outWordAddTaskDara: [],

            showOptions: false,
            optionList: [{ name: '转移至客户池' }],

            activeBar: ''
        };
    },
    onShow: function onShow() {
        this.loadData();
    },


    methods: {
        loadData: function loadData() {
            this.customerData = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.customerDetailData;
            this.customerContact = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.customerDetailData.contacts[0];

            this.activeBar = '';

            this.loadFollows();
            this.loadOthers();
        },
        loadFollows: function loadFollows() {
            var _this = this;
            var data = {
                customerpool_id: this.customerData.id
            };

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'customerpool/getFollowStaffAndpool.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    var info = res.data.map.success;
                    // _this.followData = res.data.map.success
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
                    });

                    _this.followData = info;
                }
            });

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'customerpool/selectWorkPlanAndVisit.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    _this.outWordAddTaskDara = res.data.map.workPlanAndVisit;
                }
            });
        },
        loadOthers: function loadOthers() {
            var _this = this;
            var data = {
                customerpool_id: this.customerData.id,
                page: 1,
                limit: 50
            };

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'customerpool/getPoolContacts.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    _this.contactData = res.data.map.success;
                }
            });

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'customerpool/queryForPoolList.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    _this.opportunityData = res.data.map.success;
                }
            });

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'customerpool/getContractByPool.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    _this.agreementData = res.data.map.success;
                }
            });
        },
        tabClick: function tabClick(e) {
            this.activeName = e.target.key;
        },
        changeBar: function changeBar(val) {
            console.log(val);
            var key = val.target.key;
            this.activeBar = key;
            if (key == 'brush') {
                this.toAddFollow();
            } else if (key == 'addressbook') {
                this.telephoneCall();
            } else if (key == 'send') {
                this.transferTocustomerPool();
            }
        },
        moreOptions: function moreOptions() {
            this.showOptions = true;
        },
        optionCencel: function optionCencel() {
            this.showOptions = false;
        },
        optionChange: function optionChange(val) {
            var index = val.target.index;
            if (index === 0) {
                this.transferTocustomerPool();
            }
            this.showOptions = false;
        },
        toAddFollow: function toAddFollow() {
            var url = '../customerFollow/main';
            global.mpvue.navigateTo({ url: url });
        },
        telephoneCall: function telephoneCall() {
            var phoneNum = this.customerContact.phone;
            if (phoneNum) {
                wx.makePhoneCall({
                    phoneNumber: phoneNum //仅为示例，并非真实的电话号码
                });
            } else {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '无法呼叫，请添加手机号码',
                    type: 'error'
                });
            }
        },

        // 转移至客户池
        transferTocustomerPool: function transferTocustomerPool() {
            var _this = this;
            var data = {
                id: this.customerData.id
            };

            wx.request({
                methods: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'customerpool/updateTo.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    var info = res.data;
                    if (res.data.code && res.data.code == '200') {
                        Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Message"])({
                            content: '转移成功',
                            type: 'success'
                        });
                        _this.toCustomer();
                    } else if (res.data.msg && res.data.msg == 'error') {
                        Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                            content: '对不起，您没有此权限',
                            type: 'error'
                        });
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

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "customer_detail"
  }, [_c('i-cell', {
    attrs: {
      "title": _vm.customerData.pName,
      "mpcomid": '0'
    }
  }, [_c('p', {
    staticClass: "cell_info"
  }, [_vm._v("联系人姓名：  " + _vm._s(_vm.customerContact.coName))]), _vm._v(" "), _c('p', {
    staticClass: "cell_info"
  }, [_vm._v("联系人手机：  " + _vm._s(_vm.customerContact.phone || '无'))]), _vm._v(" "), _c('p', {
    staticClass: "cell_info"
  }, [_vm._v("详细地址：    " + _vm._s(_vm.customerData.address || '无'))])], 1), _vm._v(" "), _c('i-panel', {
    attrs: {
      "title": " ",
      "mpcomid": '5'
    }
  }, [_c('i-tabs', {
    attrs: {
      "current": _vm.activeName,
      "eventid": '0',
      "mpcomid": '4'
    },
    on: {
      "change": _vm.tabClick
    }
  }, [_c('i-tab', {
    key: "first",
    attrs: {
      "title": "跟进记录",
      "mpcomid": '1'
    }
  }), _vm._v(" "), _c('i-tab', {
    key: "second",
    attrs: {
      "title": "基本信息",
      "mpcomid": '2'
    }
  }), _vm._v(" "), _c('i-tab', {
    key: "third",
    attrs: {
      "title": "相关信息",
      "mpcomid": '3'
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
        "mpcomid": '6_' + index
      }
    }), _vm._v(" "), _c('i-fiche', {
      attrs: {
        "full": "",
        "title": item.contacts[0].name,
        "extra": item.state,
        "thumb": item.portrait,
        "mpcomid": '7_' + index
      }
    }, [_c('view', {
      slot: "content"
    }, [_vm._v(_vm._s(item.followContent))]), _vm._v(" "), _c('view', {
      slot: "footer"
    }, [_c('span', {
      staticClass: "bgc_span"
    }, [_vm._v(_vm._s(item.followType))]), _vm._v(" "), (item.contactTime) ? _c('span', [_vm._v("    ")]) : _vm._e(), _vm._v(" "), (item.contactTime) ? _c('span', {
      staticClass: "bgc_span"
    }, [_vm._v(_vm._s(item.contactTime))]) : _vm._e(), _vm._v(" "), _vm._v("\n                        \n                    "), _c('span', [_vm._v(_vm._s(item.inputType))]), _vm._v(" "), _c('br'), _vm._v(" "), (item.followImg) ? _c('image', {
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
      "mpcomid": '13'
    }
  }, [_c('i-cell', {
    attrs: {
      "title": "公司名称",
      "value": _vm.customerData.pName,
      "mpcomid": '8'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "负责人",
      "value": _vm.customerData.privateUser[0].private_employee,
      "mpcomid": '9'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "客户状态",
      "value": _vm.customerData.source,
      "mpcomid": '10'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "未联系天数",
      "value": _vm.customerData.dayNum,
      "mpcomid": '11'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "创建时间",
      "value": _vm.customerData.createTime,
      "mpcomid": '12'
    }
  })], 1)], 1) : _vm._e(), _vm._v(" "), (_vm.activeName == 'third') ? _c('view', {
    staticClass: "font_size_12"
  }, [_c('i-card', {
    attrs: {
      "full": "",
      "title": "联系人",
      "mpcomid": '15'
    }
  }, _vm._l((_vm.contactData), function(item, index) {
    return _c('i-cell', {
      key: item.id,
      attrs: {
        "i-class": "card_cell",
        "title": item.name,
        "value": item.phone,
        "mpcomid": '14_' + index
      },
      slot: "content"
    })
  })), _vm._v(" "), _c('view', {
    staticClass: "detail_module"
  }), _vm._v(" "), _c('i-card', {
    attrs: {
      "full": "",
      "title": "商机",
      "mpcomid": '17'
    }
  }, _vm._l((_vm.opportunityData), function(item, index) {
    return _c('i-cell', {
      key: item.id,
      attrs: {
        "i-class": "card_cell",
        "title": item.opportunity_name,
        "label": item.opportunity_time,
        "mpcomid": '16_' + index
      },
      slot: "content"
    }, [_c('view', {
      slot: "footer"
    }, [_c('span', {
      staticStyle: {
        "font-size": "11px",
        "color": "#80848f"
      }
    }, [_vm._v(_vm._s(item.opportunity_achievement))]), _vm._v(" "), _c('br'), _vm._v(" "), _c('span', {
      staticStyle: {
        "font-size": "11px",
        "color": "#80848f"
      }
    }, [_vm._v(_vm._s(item.opportunityProgress[0].progress_name))])], 1)])
  })), _vm._v(" "), _c('view', {
    staticClass: "detail_module"
  }), _vm._v(" "), _c('i-card', {
    attrs: {
      "full": "",
      "title": "合同",
      "mpcomid": '19'
    }
  }, _vm._l((_vm.agreementData), function(item, index) {
    return _c('i-cell', {
      key: item.id,
      attrs: {
        "i-class": "card_cell",
        "title": item.contract_name,
        "label": item.start_date,
        "mpcomid": '18_' + index
      },
      slot: "content"
    }, [_c('view', {
      slot: "footer"
    }, [_c('span', {
      staticStyle: {
        "font-size": "11px",
        "color": "#80848f"
      }
    }, [_vm._v(_vm._s(item.amount))]), _vm._v(" "), _c('br'), _vm._v(" "), _c('span', {
      staticStyle: {
        "font-size": "11px",
        "color": "#80848f"
      }
    }, [_vm._v(_vm._s(item.contract_type))])], 1)])
  })), _vm._v(" "), _c('view', {
    staticClass: "detail_module"
  }), _vm._v(" "), _c('i-card', {
    attrs: {
      "full": "",
      "title": "任务",
      "mpcomid": '21'
    }
  }, _vm._l((_vm.outWordAddTaskDara), function(item, index) {
    return _c('i-cell', {
      key: item.id,
      attrs: {
        "i-class": "card_cell",
        "title": item.theme,
        "label": item.startTime,
        "mpcomid": '20_' + index
      },
      slot: "content"
    }, [_c('view', {
      slot: "footer"
    }, [_c('span', {
      staticStyle: {
        "font-size": "11px",
        "color": "#80848f"
      }
    }, [_vm._v(_vm._s(item.type))]), _vm._v(" "), _c('br'), _vm._v(" "), _c('span', {
      staticStyle: {
        "font-size": "11px",
        "color": "#80848f"
      }
    }, [_vm._v(_vm._s(item.state))])], 1)])
  }))], 1) : _vm._e(), _vm._v(" "), _c('i-tab-bar', {
    staticClass: "bottom_btn",
    attrs: {
      "current": _vm.activeBar,
      "eventid": '1',
      "mpcomid": '25'
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
      "mpcomid": '22'
    }
  }), _vm._v(" "), _c('i-tab-bar-item', {
    key: "addressbook",
    attrs: {
      "icon": "addressbook",
      "current-icon": "addressbook",
      "title": "打电话",
      "mpcomid": '23'
    }
  }), _vm._v(" "), _c('i-tab-bar-item', {
    key: "send",
    attrs: {
      "icon": "send",
      "current-icon": "send",
      "title": "转移至客户池",
      "mpcomid": '24'
    }
  })], 1), _vm._v(" "), _c('i-action-sheet', {
    attrs: {
      "visible": _vm.showOptions,
      "actions": _vm.optionList,
      "show-cancel": "",
      "eventid": '2',
      "mpcomid": '26'
    },
    on: {
      "cancel": _vm.optionCencel,
      "change": _vm.optionChange
    }
  }), _vm._v(" "), _c('i-toast', {
    attrs: {
      "id": "toast",
      "mpcomid": '27'
    }
  }), _vm._v(" "), _c('i-message', {
    attrs: {
      "id": "message",
      "mpcomid": '28'
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
     require("vue-hot-reload-api").rerender("data-v-7e81bae4", esExports)
  }
}

/***/ })

},[105]);