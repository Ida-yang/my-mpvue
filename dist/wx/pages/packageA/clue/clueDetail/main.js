require("../../../../common/manifest.js")
require("../../../../common/vendor.js")
global.webpackJsonpMpvue([48],{

/***/ 219:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(220);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_35a33b54_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(223);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(221)
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_35a33b54_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\packageA\\clue\\clueDetail\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-35a33b54", Component.options)
  } else {
    hotAPI.reload("data-v-35a33b54", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 221:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 222:
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




/* harmony default export */ __webpack_exports__["a"] = ({
    data: function data() {
        return {
            current: '线索详情',
            clueData: {},
            clueContact: {},
            clue_id: 7029,

            activeName: 'first',

            followData: [],
            contactData: [],

            showOptions: false,
            optionList: [{ name: '转移至客户' }, { name: '转移至线索池' }],

            activeBar: ''
        };
    },
    onShow: function onShow() {
        this.loadData();
    },


    methods: {
        loadData: function loadData() {
            var _this = this;

            var clueDetail = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.clueDetailData;
            var data = {
                id: clueDetail.id
            };

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'customerTwo/selectByPrimaryKey.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    var info = res.data;
                    _this.clueData = info;
                    _this.clueContact = info.contacts[0];
                    _this.loadFollows();
                    _this.loadContacts();
                }
            });
        },
        loadFollows: function loadFollows() {
            var _this = this;
            var data = {
                customertwoId: this.clueData.id
            };

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'getFollowStaff.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
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
        loadContacts: function loadContacts() {
            var _this = this;
            var data = {
                customeroneId: this.clueData.id,
                page: 1,
                limit: 50
            };

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'customerTwo/getClueContacts.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    _this.contactData = res.data.map.success;
                }
            });
        },
        tabClick: function tabClick(e) {
            this.activeName = e.target.key;
        },
        changeBar: function changeBar(val) {
            var key = val.target.key;
            this.activeBar = key;
            if (key == 'brush') {
                this.toAddFollow();
            } else if (key == 'addressbook') {
                this.telephoneCall();
            } else if (key == 'more') {
                this.moreOptions();
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
                this.transferToCustomer();
            } else if (index === 1) {
                this.transferTocluePool();
            }
            this.showOptions = false;
        },
        toAddFollow: function toAddFollow() {
            var url = '../clueFollow/main';
            global.mpvue.navigateTo({ url: url });
        },
        telephoneCall: function telephoneCall() {
            var phoneNum = this.clueContact.phone;
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

        // 转移至客户
        transferToCustomer: function transferToCustomer() {
            var _this = this;
            var data = {
                id: this.clueData.id,
                pId: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.pId,
                secondid: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.second_id
            };

            wx.request({
                methods: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'customerTwo/insert.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
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
                        _this.toClue();
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

        // 转移至线索池
        transferTocluePool: function transferTocluePool() {
            var _this = this;
            var data = {
                id: this.clueData.id
            };

            wx.request({
                methods: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'customerTwo/updateState.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    var info = res.data;
                    if (res.data && res.data == 'success') {
                        Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Message"])({
                            content: '转移成功',
                            type: 'success'
                        });
                        _this.toClue();
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
        toClue: function toClue() {
            // const url = '../main'
            // mpvue.navigateTo({ url })
            wx.navigateBack({
                delta: 1
            });
        }
    }
});

/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "clue_detail"
  }, [_c('i-cell', {
    attrs: {
      "title": _vm.clueData.name,
      "mpcomid": '0'
    }
  }, [_c('p', {
    staticClass: "cell_info"
  }, [_vm._v("联系人姓名：  " + _vm._s(_vm.clueContact.coName))]), _vm._v(" "), _c('p', {
    staticClass: "cell_info"
  }, [_vm._v("联系人手机：  " + _vm._s(_vm.clueContact.phone || '无'))]), _vm._v(" "), _c('p', {
    staticClass: "cell_info"
  }, [_vm._v("详细地址：    " + _vm._s(_vm.clueData.address || '无'))])], 1), _vm._v(" "), _c('i-panel', {
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
      "title": "联系人",
      "mpcomid": '2'
    }
  }), _vm._v(" "), _c('i-tab', {
    key: "third",
    attrs: {
      "title": "基本信息",
      "mpcomid": '3'
    }
  })], 1)], 1), _vm._v(" "), (_vm.activeName == 'first') ? _c('view', {
    staticClass: "white_bg"
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
        "isContent": "",
        "isFooter": "",
        "title": item.contacts[0].name,
        "extra": item.state,
        "thumb": item.portrait,
        "mpcomid": '8_' + index
      }
    }, [_c('view', {
      slot: "content"
    }, [_c('rich-text', {
      attrs: {
        "nodes": item.followContent,
        "mpcomid": '7_' + index
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
  })) : _vm._e(), _vm._v(" "), (_vm.activeName == 'second') ? _c('view', _vm._l((_vm.contactData), function(item, index) {
    return _c('i-cell-group', {
      key: item.id,
      attrs: {
        "mpcomid": '11_' + index
      }
    }, [_c('i-cell', {
      attrs: {
        "title": "联系人",
        "value": item.name,
        "mpcomid": '9_' + index
      }
    }), _vm._v(" "), _c('i-cell', {
      attrs: {
        "title": "手机号码",
        "value": item.phone,
        "mpcomid": '10_' + index
      }
    })], 1)
  })) : _vm._e(), _vm._v(" "), (_vm.activeName == 'third') ? _c('view', [_c('i-cell-group', {
    attrs: {
      "mpcomid": '19'
    }
  }, [_c('i-cell', {
    attrs: {
      "title": "公司名称",
      "value": _vm.clueData.name,
      "mpcomid": '12'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "线索状态",
      "value": _vm.clueData.state,
      "mpcomid": '13'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "未联系天数",
      "value": _vm.clueData.dayNum,
      "mpcomid": '14'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "创建时间",
      "value": _vm.clueData.createTime,
      "mpcomid": '15'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "负责人",
      "value": _vm.clueData.privateUser[0].private_employee,
      "mpcomid": '16'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "部门",
      "value": _vm.clueData.deptname,
      "mpcomid": '17'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "机构",
      "value": _vm.clueData.parentname,
      "mpcomid": '18'
    }
  })], 1)], 1) : _vm._e(), _vm._v(" "), _c('i-tab-bar', {
    staticClass: "bottom_btn",
    attrs: {
      "current": _vm.activeBar,
      "eventid": '1',
      "mpcomid": '23'
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
      "mpcomid": '20'
    }
  }), _vm._v(" "), _c('i-tab-bar-item', {
    key: "addressbook",
    attrs: {
      "icon": "addressbook",
      "current-icon": "addressbook",
      "title": "打电话",
      "mpcomid": '21'
    }
  }), _vm._v(" "), _c('i-tab-bar-item', {
    key: "more",
    attrs: {
      "icon": "more",
      "current-icon": "more",
      "title": "更多",
      "mpcomid": '22'
    }
  })], 1), _vm._v(" "), _c('i-action-sheet', {
    attrs: {
      "visible": _vm.showOptions,
      "actions": _vm.optionList,
      "show-cancel": "",
      "eventid": '2',
      "mpcomid": '24'
    },
    on: {
      "cancel": _vm.optionCencel,
      "change": _vm.optionChange
    }
  }), _vm._v(" "), _c('i-toast', {
    attrs: {
      "id": "toast",
      "mpcomid": '25'
    }
  }), _vm._v(" "), _c('i-message', {
    attrs: {
      "id": "message",
      "mpcomid": '26'
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
     require("vue-hot-reload-api").rerender("data-v-35a33b54", esExports)
  }
}

/***/ })

},[219]);