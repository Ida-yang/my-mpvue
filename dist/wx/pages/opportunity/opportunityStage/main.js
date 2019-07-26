require("../../../common/manifest.js")
require("../../../common/vendor.js")
global.webpackJsonpMpvue([15],{

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_23c342e2_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(350);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(349)
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_23c342e2_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\opportunity\\opportunityStage\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-23c342e2", Component.options)
  } else {
    hotAPI.reload("data-v-23c342e2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


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




/* harmony default export */ __webpack_exports__["a"] = ({
    data: function data() {
        return {
            current: '商机阶段',

            opportunityInfo: {},

            stepList: [],
            opportunityStep: [],

            stepIndex: '',
            stageIndex: '',
            failStep: false,
            finishStep: false,

            activeBar: '',

            showNext: false,

            opportunity_deal: '',
            stepId: '',
            progressProbability: '',
            failStepId: ''
        };
    },
    onShow: function onShow() {
        this.loadData();
    },


    methods: {
        loadData: function loadData() {
            var _this = this;
            var info = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.opportunityDetailData;
            this.opportunityInfo = {
                id: info.opportunity_id,
                name: info.opportunity_name
                // id: 143,
                // name: '广州海飞人力资源有限公司博罗分公司商机',
            };
            this.loadStep();
        },
        loadStep: function loadStep() {
            var _this = this;

            wx.request({
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'addstep/selectAddstep.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                success: function success(res) {
                    var info = res.data.map.addsteps;
                    info.forEach(function (el) {
                        if (el.step_probability == '0') {
                            _this.failStepId = el.step_id;
                        }
                    });
                    _this.stepList = info;
                    _this.stepList.length = info.length - 1;
                    _this.loadDetail();
                }
            });
        },
        loadDetail: function loadDetail() {
            var _this = this;
            var data = {
                opportunity_id: this.opportunityInfo.id
            };

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'opportunity/getopportunityById.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    _this.opportunity_deal = res.data.map.success[0].opportunity_deal;
                    var info = res.data.map.success[0].opportunityProgress;
                    var point = '';
                    _this.opportunityStep = info;
                    info.forEach(function (a) {
                        if (a.progress_probability == '0') {
                            _this.stepIndex = info.length - 1;
                            point = info.length - 1;
                            _this.failStep = true;
                        } else if (a.progress_probability == '100') {
                            _this.stepIndex = info.length;
                            point = info.length;
                            _this.finishStep = true;
                        } else {
                            _this.stepIndex = info.length;
                            point = info.length;
                            _this.failStep = false;
                            _this.finishStep = false;
                        }
                    });
                    _this.stageIndex = point;

                    _this.stepList.forEach(function (el, i) {
                        info.forEach(function (item, j) {
                            if (i == j) {
                                el.createTime = item.createTime;
                                if (item.previousTime) {
                                    var arr = item.previousTime.split(" ");
                                    var arr2 = item.createTime.split(" ");
                                    var begintime = new Date(arr[0].replace(/-/g, "/"));
                                    var endtime = new Date(arr2[0].replace(/-/g, "/"));
                                    var dateDiff = endtime.getTime() - begintime.getTime();
                                    var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));
                                    el.duration = '历时：' + dayDiff + '天';
                                }
                            }
                            if (i < point) {
                                // console.log(el,'已完成的')
                                el.stepStatus = 'finish';
                                el.stepIcon = 'right';
                            }
                            if (i == point) {
                                if (_this.failStep == true) {
                                    // console.log(el,'已关闭的')
                                    el.stepStatus = 'error';
                                    el.stepIcon = 'close';
                                    _this.stepIndex = -1;
                                } else if (_this.failStep == false) {
                                    // console.log(el,'正在进行中的')
                                    el.stepStatus = 'process';
                                    el.stepIcon = 'brush';
                                }
                            }
                            if (i > point) {
                                // console.log(el,'还在排队的')
                                el.stepStatus = 'process';
                                el.stepIcon = 'time_fill';
                            }
                        });
                    });
                }
            });
        },
        changeBar: function changeBar(val) {
            var _this2 = this;

            var _this = this;
            var key = val.target.key;
            this.activeBar = key;
            if (key == 'playon') {
                this.showNext = true;
                this.stepList.forEach(function (el, i) {
                    if (i == _this2.stepIndex) {
                        _this.stepId = el.step_id;
                        _this.progressProbability = el.step_probability;
                    }
                });
            } else if (key == 'offline') {
                var url = '../opportunityFail/main';
                var length = this.opportunityStep.length - 1;
                __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.failReason = {
                    previousTime: this.opportunityStep[length].createTime + ':00',
                    oy_id: this.opportunityInfo.id,
                    opportunityDeal: this.opportunity_deal,
                    stepId: this.failStepId,
                    progress_probability: this.progressProbability
                };
                global.mpvue.navigateTo({ url: url });
            }
        },
        cancelNext: function cancelNext() {
            this.showNext = false;
        },
        dealChange: function dealChange(e) {
            this.opportunity_deal = e.target.value;
        },
        nextStep: function nextStep() {
            var _this = this;
            var length = this.opportunityStep.length - 1;
            var data = {
                previousTime: this.opportunityStep[length].createTime + ':00',
                oy_id: this.opportunityInfo.id,
                opportunityDeal: this.opportunity_deal,
                stepId: this.stepId,
                progress_probability: this.progressProbability,
                pId: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.pId,
                secondid: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.second_id,
                deptid: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.private_deptid
            };

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'saveOpportunityProgress.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    if (res.data.code && res.data.code == '200') {
                        Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Message"])({
                            content: '修改成功',
                            type: 'success'
                        });
                        _this.cancelNext();
                        _this.loadData();
                    } else {
                        Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Message"])({
                            content: res.data.msg,
                            type: 'error'
                        });
                    }
                }
            });
        }
    }
});

/***/ }),

/***/ 349:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 350:
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
      "title": _vm.opportunityInfo.name,
      "mpcomid": '1'
    }
  }), _vm._v(" "), _c('i-steps', {
    attrs: {
      "current": _vm.stepIndex,
      "direction": "vertical",
      "i-class": "stage_steps",
      "mpcomid": '8'
    }
  }, _vm._l((_vm.stepList), function(item, index) {
    return _c('i-step', {
      key: item.sort,
      attrs: {
        "status": item.stepStatus,
        "icon": item.stepIcon,
        "mpcomid": '7_' + index
      }
    }, [(index == 0) ? _c('i-fiche', {
      attrs: {
        "unborder": "",
        "isFooter": "",
        "title": item.step_name,
        "extra": '成功几率：' + item.step_probability + ' %',
        "mpcomid": '2_' + index
      },
      slot: "title"
    }, [_c('view', {
      slot: "footer"
    }, [_vm._v("\n                    创建时间：" + _vm._s(item.createTime) + "\n                ")])]) : _vm._e(), _vm._v(" "), (index < _vm.stageIndex && index !== 0) ? _c('i-fiche', {
      attrs: {
        "unborder": "",
        "isFooter": "",
        "title": item.step_name,
        "extra": '成功几率：' + item.step_probability + ' %',
        "mpcomid": '3_' + index
      },
      slot: "title"
    }, [_c('view', {
      slot: "footer"
    }, [_vm._v("\n                    推进时间：" + _vm._s(item.createTime) + "   -   " + _vm._s(item.duration) + "\n                ")])]) : _vm._e(), _vm._v(" "), (index == _vm.stageIndex && !_vm.failStep) ? _c('i-fiche', {
      attrs: {
        "title": item.step_name,
        "extra": '成功几率：' + item.step_probability + ' %',
        "mpcomid": '4_' + index
      },
      slot: "title"
    }) : _vm._e(), _vm._v(" "), (index == _vm.stageIndex && _vm.failStep) ? _c('i-fiche', {
      attrs: {
        "isFooter": "",
        "title": item.step_name,
        "extra": '成功几率：' + item.step_probability + ' %',
        "mpcomid": '5_' + index
      },
      slot: "title"
    }, [_c('view', {
      slot: "footer"
    }, [_vm._v("\n                    推进时间：" + _vm._s(item.createTime) + "   -   " + _vm._s(item.duration) + "\n                ")])]) : _vm._e(), _vm._v(" "), (index > _vm.stageIndex) ? _c('i-fiche', {
      attrs: {
        "unborder": "",
        "title": item.step_name,
        "extra": '成功几率：' + item.step_probability + ' %',
        "mpcomid": '6_' + index
      },
      slot: "title"
    }) : _vm._e()], 1)
  })), _vm._v(" "), (!_vm.failStep && !_vm.finishStep) ? _c('i-tab-bar', {
    staticClass: "bottom_btn",
    attrs: {
      "current": _vm.activeBar,
      "eventid": '0',
      "mpcomid": '11'
    },
    on: {
      "change": _vm.changeBar
    }
  }, [_c('i-tab-bar-item', {
    key: "playon",
    attrs: {
      "icon": "playon",
      "current-icon": "playon",
      "title": "下一步",
      "mpcomid": '9'
    }
  }), _vm._v(" "), _c('i-tab-bar-item', {
    key: "offline",
    attrs: {
      "icon": "offline",
      "current-icon": "offline",
      "title": "失败关闭",
      "mpcomid": '10'
    }
  })], 1) : _vm._e(), _vm._v(" "), _c('i-modal', {
    attrs: {
      "title": "确认修改商机进度吗？一旦确定将不可撤回",
      "visible": _vm.showNext,
      "eventid": '2',
      "mpcomid": '13'
    },
    on: {
      "ok": _vm.nextStep,
      "cancel": _vm.cancelNext
    }
  }, [_c('i-cell', {
    attrs: {
      "title": "预计成交时间",
      "is-link": "",
      "mpcomid": '12'
    }
  }, [_c('picker', {
    attrs: {
      "mode": "date",
      "value": _vm.opportunity_deal,
      "eventid": '1'
    },
    on: {
      "change": _vm.dealChange
    },
    slot: "footer"
  }, [_c('view', {
    staticClass: "picker",
    staticStyle: {
      "min-width": "100px",
      "height": "20px"
    }
  }, [_vm._v("\n                    " + _vm._s(_vm.opportunity_deal) + "\n                ")])])], 1)], 1), _vm._v(" "), _c('i-toast', {
    attrs: {
      "id": "toast",
      "mpcomid": '14'
    }
  }), _vm._v(" "), _c('i-message', {
    attrs: {
      "id": "message",
      "mpcomid": '15'
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
     require("vue-hot-reload-api").rerender("data-v-23c342e2", esExports)
  }
}

/***/ })

},[219]);