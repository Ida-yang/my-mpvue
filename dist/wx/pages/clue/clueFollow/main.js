require("../../../common/manifest.js")
require("../../../common/vendor.js")
global.webpackJsonpMpvue([45],{

/***/ 70:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(71);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 71:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_642a5b64_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(74);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(72)
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_642a5b64_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\clue\\clueFollow\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-642a5b64", Component.options)
  } else {
    hotAPI.reload("data-v-642a5b64", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 72:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 73:
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




/* harmony default export */ __webpack_exports__["a"] = ({
    data: function data() {
        return {
            current: '跟进记录',
            clue_id: 7026,

            followData: {},

            followList: {
                followType: '电话',
                contactTime: '',
                followContent: '',
                contactsId: '',
                contactsName: '',
                follow_state: '',
                follow_stateName: '',
                imgName: ''
            },

            followImg: '',

            showtype: false,
            typeList: [{ name: '电话' }, { name: '微信' }, { name: 'QQ' }, { name: '邮箱' }, { name: '拜访' }],

            showcontact: false,
            contactData: [],
            contactList: [],

            showstate: false,
            stateData: [],
            stateList: []
        };
    },
    mounted: function mounted() {
        this.loadData();
    },


    methods: {
        loadData: function loadData() {
            this.followData = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.clueDetailData;

            this.followList = {
                followType: '电话',
                contactTime: '',
                followContent: '',
                contactsId: '',
                contactsName: '',
                follow_state: '',
                follow_stateName: '',
                imgName: ''
            };

            var _this = this;
            _this.stateList = [];
            _this.contactList = [];

            var data = {
                customeroneId: this.followData.id,
                page: 1,
                limit: 50
            };

            wx.request({
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'typeInfo/getTypeInfoGroupByType.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: {
                    type: '线索状态'
                },
                success: function success(res) {
                    var info = res.data.slice(1);
                    info.forEach(function (el) {
                        _this.stateList.push({ name: el.typeName });
                    });
                    _this.followList.follow_state = info[0].id;
                    _this.followList.follow_stateName = info[0].typeName;

                    _this.stateData = info;
                }
            });

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'customerTwo/getClueContacts.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    var info2 = res.data.map.success;
                    _this.contactData = info2;
                    info2.forEach(function (el) {
                        _this.contactList.push({ name: el.name });
                    });
                    _this.followList.contactsId = info2[0].id;
                    _this.followList.contactsName = info2[0].name;
                }
            });
        },
        optionFocus: function optionFocus(e, val) {
            if (val === 1) {
                this.showtype = true;
            } else if (val === 2) {
                this.showcontact = true;
            } else if (val === 3) {
                this.showstate = true;
            }
        },
        typeChange: function typeChange(e) {
            var _this2 = this;

            var index = e.target.index;
            this.typeList.forEach(function (el, i) {
                if (i == index) {
                    _this2.followList.followType = el.name;
                }
            });
            this.showtype = false;
        },
        contactChange: function contactChange(e) {
            var _this3 = this;

            var index = e.target.index;
            this.contactData.forEach(function (el, i) {
                if (i == index) {
                    _this3.followList.contactsName = el.name;
                    _this3.followList.contactsId = el.id;
                }
            });
            this.showcontact = false;
        },
        stateChange: function stateChange(e) {
            var _this4 = this;

            var index = e.target.index;
            this.stateData.forEach(function (el, i) {
                if (i == index) {
                    _this4.followList.follow_stateName = el.typeName;
                    _this4.followList.follow_state = el.id;
                }
            });
            this.showstate = false;
        },
        handleInput: function handleInput(e, val) {
            if (val == 1) {
                this.followList.followContent = e.mp.detail;
            }
            if (val == 2) {
                this.followList.contactTime = e.mp.detail;
            }
        },
        uploadIMG: function uploadIMG() {
            var _this = this;

            wx.chooseImage({
                count: 1,
                success: function success(res) {
                    // tempFilePath可以作为img标签的src属性显示图片
                    var tempFilePaths = res.tempFilePaths;
                    _this.followImg = res.tempFilePaths[0];
                    wx.uploadFile({
                        url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'workOrder/upload.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId,
                        filePath: tempFilePaths[0],
                        name: 'file',
                        success: function success(res) {
                            _this.followList.imgName = res.data;
                        }
                    });
                }
            });
        },
        addClueFollow: function addClueFollow() {
            var _this = this;
            var data = {
                customertwo_id: this.followData.id,
                followType: this.followList.followType,
                contactTime: this.followList.contactTime,
                followContent: this.followList.followContent,
                contactsId: this.followList.contactsId,
                follow_state: this.followList.follow_state,
                imgName: this.followList.imgName,
                pId: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.pId,
                secondid: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.second_id,
                deptid: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.private_deptid
            };

            var flag = false;
            if (!data.followContent) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '跟进内容不能为空',
                    type: 'error'
                });
                flag = true;
            }
            if (!data.follow_state) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '跟进状态不能为空',
                    type: 'error'
                });
                flag = true;
            }
            if (!data.contactsId) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '联系人不能为空',
                    type: 'error'
                });
                flag = true;
            }
            if (flag) return;

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'addFollowFromSmallProcedures.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    if (res.data.code && res.data.code == '200') {
                        Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Message"])({
                            content: '添加成功',
                            type: 'success'
                        });
                        _this.toClueDetail();
                    } else {
                        Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Message"])({
                            content: res.data.msg,
                            type: 'error'
                        });
                    }
                }
            });
        },
        toClueDetail: function toClueDetail() {
            // const url = '../clueDetail/main'
            // mpvue.navigateTo({ url })
            wx.navigateBack({
                delta: 1
            });
        }
    }
});

/***/ }),

/***/ 74:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "clue_follow"
  }, [_c('i-panel', {
    attrs: {
      "title": _vm.followData.name,
      "mpcomid": '7'
    }
  }, [_c('i-cell', {
    attrs: {
      "title": "联系方式",
      "value": _vm.followList.followType,
      "is-link": "",
      "request": "",
      "i-class": "simple_cell",
      "eventid": '0',
      "mpcomid": '0'
    },
    on: {
      "click": function($event) {
        _vm.optionFocus($event, 1)
      }
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "联系人",
      "value": _vm.followList.contactsName,
      "is-link": "",
      "request": "",
      "i-class": "simple_cell",
      "eventid": '1',
      "mpcomid": '1'
    },
    on: {
      "click": function($event) {
        _vm.optionFocus($event, 2)
      }
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "状态",
      "value": _vm.followList.follow_stateName,
      "is-link": "",
      "request": "",
      "i-class": "simple_cell",
      "eventid": '2',
      "mpcomid": '2'
    },
    on: {
      "click": function($event) {
        _vm.optionFocus($event, 3)
      }
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "下次联系时间",
      "is-link": "",
      "i-class": "simple_cell",
      "mpcomid": '4'
    }
  }, [_c('i-datetime-picker', {
    staticClass: "cell_picker",
    attrs: {
      "value": _vm.followList.contactTime,
      "eventid": '3',
      "mpcomid": '3'
    },
    on: {
      "change": function($event) {
        _vm.handleInput($event, 2)
      }
    },
    slot: "footer"
  })], 1), _vm._v(" "), _c('i-input', {
    attrs: {
      "title": "跟进内容",
      "right": "",
      "request": "",
      "type": "textarea",
      "maxlength": "200",
      "eventid": '4',
      "mpcomid": '5'
    },
    on: {
      "input": function($event) {
        _vm.handleInput($event, 1)
      }
    },
    model: {
      value: (_vm.followList.followContent),
      callback: function($$v) {
        _vm.followList.followContent = $$v
      },
      expression: "followList.followContent"
    }
  }), _vm._v(" "), _c('i-button', {
    attrs: {
      "type": "ghost",
      "long": true,
      "i-class": "followimg_btn",
      "eventid": '5',
      "mpcomid": '6'
    },
    on: {
      "click": _vm.uploadIMG
    }
  }, [_vm._v("上传图片")])], 1), _vm._v(" "), (_vm.followImg) ? _c('image', {
    staticClass: "fullwidth_img",
    attrs: {
      "mode": "aspectFit",
      "src": _vm.followImg
    }
  }) : _vm._e(), _vm._v(" "), _c('p', {
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
      "click": _vm.addClueFollow
    }
  }, [_vm._v("确定")]), _vm._v(" "), _c('i-action-sheet', {
    attrs: {
      "visible": _vm.showtype,
      "actions": _vm.typeList,
      "eventid": '7',
      "mpcomid": '9'
    },
    on: {
      "change": _vm.typeChange
    }
  }), _vm._v(" "), _c('i-action-sheet', {
    attrs: {
      "visible": _vm.showcontact,
      "actions": _vm.contactList,
      "eventid": '8',
      "mpcomid": '10'
    },
    on: {
      "change": _vm.contactChange
    }
  }), _vm._v(" "), _c('i-action-sheet', {
    attrs: {
      "visible": _vm.showstate,
      "actions": _vm.stateList,
      "eventid": '9',
      "mpcomid": '11'
    },
    on: {
      "change": _vm.stateChange
    }
  }), _vm._v(" "), _c('i-message', {
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
     require("vue-hot-reload-api").rerender("data-v-642a5b64", esExports)
  }
}

/***/ })

},[70]);