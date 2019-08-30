require("../../../../common/manifest.js")
require("../../../../common/vendor.js")
global.webpackJsonpMpvue([30],{

/***/ 274:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(275);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_b0d53b58_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(278);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(276)
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_b0d53b58_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\packageA\\follow\\followDetail\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b0d53b58", Component.options)
  } else {
    hotAPI.reload("data-v-b0d53b58", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 276:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 277:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(2);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
            curent: '跟进记录详情页',

            customertwoId: '',
            customerpool_id: '',

            numData: {},

            activeName: 'first',

            followData: []
        };
    },
    mounted: function mounted() {
        this.loadData();
    },


    methods: {
        loadData: function loadData() {
            var info = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.followDetailData;

            if (info.customertwo_id) {
                this.customertwoId = info.customertwoId;
                this.customerpool_id = '';
                this.loadClueFollow();
            }
            if (info.customerpool_id) {
                this.customerpool_id = info.customerpool_id;
                this.customertwoId = '';
                this.loadCusFollow();
            }

            this.loadOther();
        },
        loadOther: function loadOther() {
            var _this = this;
            var data = {
                customerPoolId: this.customerpool_id,
                customertwoId: this.customertwoId
            };

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'follow/getFollowForSmallProcedures.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    _this.numData = res.data;
                }
            });
        },
        loadClueFollow: function loadClueFollow() {
            var _this = this;
            var data = {
                customertwoId: this.customertwoId
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
        loadCusFollow: function loadCusFollow() {
            var _this = this;
            var data = {
                customerpool_id: this.customerpool_id
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
        tabClick: function tabClick(e) {
            this.activeName = e.target.key;
        }
    }
});

/***/ }),

/***/ 278:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "follow_detail_wrap"
  }, [_c('i-cell', {
    attrs: {
      "title": _vm.numData.corporateName,
      "mpcomid": '0'
    }
  }, [_c('p', {
    staticClass: "cell_info"
  }, [_vm._v("总联系人：" + _vm._s(_vm.numData.contactsTotal) + "人  |  联系过其中：" + _vm._s(_vm.numData.contactsIng) + "人")]), _vm._v(" "), _c('p', {
    staticClass: "cell_info"
  }, [_vm._v("总联系次数：" + _vm._s(_vm.numData.contactsNum) + "次  |  最近联系：  " + _vm._s(_vm.numData.contact_time))]), _vm._v(" "), _c('p', {
    staticClass: "cell_info"
  }, [_vm._v("距上次联系天数：" + _vm._s(_vm.numData.distanceDayNum) + "天")])], 1), _vm._v(" "), _c('i-panel', {
    attrs: {
      "title": " ",
      "mpcomid": '3'
    }
  }, [_c('i-tabs', {
    attrs: {
      "current": _vm.activeName,
      "eventid": '0',
      "mpcomid": '2'
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
  })], 1)], 1), _vm._v(" "), (_vm.activeName == 'first') ? _c('view', {
    staticClass: "white_bg"
  }, _vm._l((_vm.followData), function(item, index) {
    return _c('view', {
      key: item.id
    }, [_c('i-panel', {
      attrs: {
        "title": item.createTime,
        "i-class": "vice_panel",
        "mpcomid": '4_' + index
      }
    }), _vm._v(" "), _c('i-fiche', {
      attrs: {
        "full": "",
        "isContent": "",
        "isFooter": "",
        "title": item.contacts[0].name,
        "extra": item.state,
        "thumb": item.portrait,
        "mpcomid": '6_' + index
      }
    }, [_c('view', {
      slot: "content"
    }, [_c('rich-text', {
      attrs: {
        "nodes": item.followContent,
        "mpcomid": '5_' + index
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
  })) : _vm._e()], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-b0d53b58", esExports)
  }
}

/***/ })

},[274]);