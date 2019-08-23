require("../../../../common/manifest.js")
require("../../../../common/vendor.js")
global.webpackJsonpMpvue([12],{

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(369);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 369:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_26921cf4_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(372);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(370)
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_26921cf4_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\packageA\\outwork\\outworkDetail\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-26921cf4", Component.options)
  } else {
    hotAPI.reload("data-v-26921cf4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 370:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 371:
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
//




/* harmony default export */ __webpack_exports__["a"] = ({
    data: function data() {
        return {
            current: '外勤详情',

            outworkData: {},
            authority: false,

            activeName: 'first',

            stepIndex: -1,
            auditLog: [],

            activeBar: '',
            showMore: false,
            moreActions: [{ name: '未完成' }, { name: '作废' }, { name: '删除' }],
            showDetele: false,
            deleteActions: [{
                name: '删除',
                color: '#f56c6c'
            }],

            showSure: false,
            showRefuse: false,
            remarks: '',

            starIndex: 0,
            scoreIndex: 0,

            nowTime: ''

        };
    },
    onShow: function onShow() {
        this.loadData();
    },


    methods: {
        loadData: function loadData() {
            var info = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.outworkDetailData;
            this.outworkData = info;

            this.loadVisit();
        },
        loadVisit: function loadVisit() {
            var _this = this;
            var data = {
                id: this.outworkData.id
            };

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'visit/selectVisitById.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    var info = res.data.map.visit;
                    if (info.checkStatus == 0) {
                        info.checkState = '待审核';
                    } else if (info.checkStatus == 1) {
                        info.checkState = '审核中';
                    } else if (info.checkStatus == 2) {
                        info.checkState = '已审核';
                    } else if (info.checkStatus == 3) {
                        info.checkState = '未通过';
                    }

                    if (info.photoCheck) {
                        info.photoName = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].sourcehost + 'upload/' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId + '/' + info.photoCheck;
                    }

                    if (info.score) {
                        _this.starIndex = parseInt(info.score);
                        _this.scoreIndex = _this.starIndex * 2;
                    }
                    _this.outworkData = info;

                    _this.loadState();
                    _this.loadAudit();
                }
            });
        },
        loadState: function loadState() {
            var _this = this;

            var data = {
                recordId: this.outworkData.examineRecordId,
                checkStatus: this.outworkData.checkStatus,
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

                    if (info.isCheck == 1 && _this.outworkData.checkStatus !== 2) {
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
                recordId: this.outworkData.examineRecordId
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
        loadTime: function loadTime() {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hour = date.getHours();
            var min = date.getMinutes();
            var sec = date.getSeconds();

            month = month < 10 ? "0" + month : month;
            day = day < 10 ? "0" + day : day;
            hour = hour < 10 ? "0" + hour : hour;
            min = min < 10 ? "0" + min : min;
            sec = sec < 10 ? "0" + sec : sec;

            this.nowTime = year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
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
                id: this.outworkData.id,
                recordId: this.outworkData.examineRecordId,
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
                        _this.loadVisit();
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
                id: this.outworkData.id,
                recordId: this.outworkData.examineRecordId,
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
                        _this.loadVisit();
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
        },
        changeBar: function changeBar(val) {
            var key = val.target.key;
            this.activeBar = key;
            if (key == 'coordinates') {
                this.signIn();
            } else if (key == 'success') {
                this.complete();
            } else if (key == 'collection') {
                this.score();
            } else if (key == 'more') {
                this.showMore = true;
            }
        },
        cancelMore: function cancelMore() {
            this.showMore = false;
        },
        changeOption: function changeOption(val) {
            var index = val.target.index;
            if (index === 0) {
                this.incomplete();
            } else if (index === 1) {
                this.nullify();
            } else if (index === 2) {
                if (this.outworkData.state == '已完成' || this.outworkData.state == '作废' || this.outworkData.checkStatus == 2) {
                    Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                        content: '不可删除',
                        type: 'warning'
                    });
                } else {
                    this.showDetele = true;
                }
            }
            this.showMore = false;
        },
        cancelDelete: function cancelDelete() {
            this.showDetele = false;
        },
        incomplete: function incomplete() {
            var _this = this;
            if (this.outworkData.state == '已完成') {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '该外勤已经是完成状态',
                    type: 'warning'
                });
            } else {
                this.loadTime();

                var data = {
                    id: this.outworkData.id,
                    state: '已完成',
                    updateTime: this.nowTime
                };

                wx.request({
                    method: 'post',
                    url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'visit/updateVisitState.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                    data: data,
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                    },
                    success: function success(res) {
                        if (res.data.code && res.data.code == "200") {
                            Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Message"])({
                                content: '已修改为未完成',
                                type: 'success'
                            });
                            _this.loadVisit();
                        } else {
                            Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Message"])({
                                content: res.data.msg,
                                type: 'error'
                            });
                        }
                    }
                });
            }
        },
        complete: function complete() {
            var _this = this;
            if (!this.outworkData.timeCheck) {
                // console.log('没有签到')
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '该外勤未签到',
                    type: 'warning'
                });
            } else if (this.outworkData.state == '已完成') {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '该外勤已完成',
                    type: 'warning'
                });
            } else {
                this.loadTime();

                var data = {
                    id: this.outworkData.id,
                    state: '已完成',
                    updateTime: this.nowTime
                };

                wx.request({
                    method: 'post',
                    url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'visit/updateVisitState.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                    data: data,
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                    },
                    success: function success(res) {
                        if (res.data.code && res.data.code == "200") {
                            Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Message"])({
                                content: '已完成',
                                type: 'success'
                            });
                            _this.loadVisit();
                        } else {
                            Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Message"])({
                                content: res.data.msg,
                                type: 'error'
                            });
                        }
                    }
                });
            }
        },
        nullify: function nullify() {
            var _this = this;

            if (this.outworkData.state == '已完成') {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '该外勤已经是完成状态',
                    type: 'warning'
                });
            } else {
                this.loadTime();

                var data = {
                    id: this.outworkData.id,
                    state: '已完成',
                    updateTime: this.nowTime
                };

                wx.request({
                    method: 'post',
                    url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'visit/updateVisitState.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                    data: data,
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                    },
                    success: function success(res) {
                        if (res.data.code && res.data.code == "200") {
                            Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Message"])({
                                content: '作废成功',
                                type: 'success'
                            });
                            _this.loadVisit();
                        } else {
                            Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Message"])({
                                content: res.data.msg,
                                type: 'error'
                            });
                        }
                    }
                });
            }
        },
        deleteOutwork: function deleteOutwork() {
            var _this = this;
            var data = {
                id: this.outworkData.id
            };

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'visit/deleteVisit.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    if (res.data.success && res.data.success == true) {
                        Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Message"])({
                            content: '删除成功',
                            type: 'success'
                        });
                        _this.tooutwork();
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
        signIn: function signIn() {
            if (this.outworkData.timeCheck) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '该外勤已签到',
                    type: 'warning'
                });
            } else if (this.outworkData.checkStatus !== 2) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '该外勤非已审核状态',
                    type: 'warning'
                });
            } else {
                var url = '../signIn/main';
                global.mpvue.navigateTo({ url: url });
            }
        },
        changeStar: function changeStar(e) {
            var index = e.target.index;
            this.starIndex = index;
            this.scoreIndex = index * 2;
        },
        score: function score() {
            var _this = this;
            if (this.outworkData.state !== '已完成') {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '该外勤不是完成状态',
                    type: 'warning'
                });
            } else if (this.scoreIndex == 0) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '请先选择评分等级',
                    type: 'warning'
                });
            } else {
                var data = {
                    id: this.outworkData.id,
                    score: this.starIndex
                };

                wx.request({
                    method: 'post',
                    url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'visit/updateVisitState.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                    data: data,
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                    },
                    success: function success(res) {
                        if (res.data.code && res.data.code == "200") {
                            Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Message"])({
                                content: '打分成功',
                                type: 'success'
                            });
                            _this.loadVisit();
                        } else {
                            Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Message"])({
                                content: res.data.msg,
                                type: 'error'
                            });
                        }
                    }
                });
            }
        },
        tooutwork: function tooutwork() {
            wx.navigateBack({
                delta: 1
            });
        }
    }
});

/***/ }),

/***/ 372:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "out_work_detail_wrap"
  }, [_c('i-cell', {
    attrs: {
      "title": _vm.outworkData.visitTheme,
      "mpcomid": '3'
    }
  }, [_c('p', {
    staticClass: "cell_info"
  }, [_vm._v("拜访公司：  " + _vm._s(_vm.outworkData.customerName))]), _vm._v(" "), _c('p', {
    staticClass: "cell_info"
  }, [_vm._v("拜访对象：  " + _vm._s(_vm.outworkData.contactsName) + "   |   手机号码：  " + _vm._s(_vm.outworkData.phone || '无'))]), _vm._v(" "), _c('p', {
    staticClass: "cell_info"
  }, [_vm._v("拜访目的：  " + _vm._s(_vm.outworkData.visitObjective))]), _vm._v(" "), (_vm.authority) ? _c('view', {
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
      "title": '审核状态：' + _vm.outworkData.checkState,
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
      "title": "审核历史",
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
    staticClass: "white_bg"
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
  }))], 1) : _vm._e(), _vm._v(" "), (_vm.activeName == 'second') ? _c('view', [_c('i-cell-group', {
    attrs: {
      "mpcomid": '20'
    }
  }, [_c('i-cell', {
    attrs: {
      "title": "拜访时间",
      "value": _vm.outworkData.visitTime,
      "mpcomid": '12'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "结束时间",
      "value": _vm.outworkData.endTime,
      "mpcomid": '13'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "提醒时间",
      "value": _vm.outworkData.remindTime,
      "mpcomid": '14'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "协助人员",
      "mpcomid": '15'
    }
  }, _vm._l((_vm.outworkData.privateUser), function(item, index) {
    return _c('span', {
      key: item.private_id,
      slot: "footer"
    }, [(index !== 0) ? _c('span', [_vm._v("，")]) : _vm._e(), _vm._v("\n                    " + _vm._s(item.private_name) + "\n                ")])
  })), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "状态",
      "value": _vm.outworkData.state,
      "mpcomid": '16'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "负责人",
      "value": _vm.outworkData.private_employee,
      "mpcomid": '17'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "部门",
      "value": _vm.outworkData.deptname,
      "mpcomid": '18'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "机构",
      "value": _vm.outworkData.parentname,
      "mpcomid": '19'
    }
  })], 1)], 1) : _vm._e(), _vm._v(" "), (_vm.activeName == 'third') ? _c('view', [_c('i-card', {
    attrs: {
      "full": "",
      "isContent": "",
      "title": "执行结果",
      "extra": _vm.outworkData.state,
      "mpcomid": '21'
    }
  }, [_c('view', {
    slot: "content"
  }, [_c('p', [_vm._v("签到时间：" + _vm._s(_vm.outworkData.timeCheck || ''))]), _vm._v(" "), _c('p', [_vm._v("签到地址：" + _vm._s(_vm.outworkData.addressCheck || ''))]), _vm._v(" "), _c('br'), _vm._v(" "), (_vm.outworkData.photoName) ? _c('image', {
    staticClass: "follow_image",
    attrs: {
      "mode": "scaleToFill",
      "src": _vm.outworkData.photoName
    }
  }) : _vm._e()], 1)]), _vm._v(" "), _c('view', {
    staticClass: "detail_module"
  }), _vm._v(" "), _c('i-card', {
    attrs: {
      "full": "",
      "isContent": "",
      "title": "打分",
      "extra": _vm.outworkData.state,
      "mpcomid": '23'
    }
  }, [_c('view', {
    slot: "content"
  }, [_c('i-rate', {
    attrs: {
      "value": _vm.starIndex,
      "eventid": '3',
      "mpcomid": '22'
    },
    on: {
      "change": _vm.changeStar
    }
  }, [_vm._v("\n                    " + _vm._s(_vm.scoreIndex) + "\n                ")])], 1)])], 1) : _vm._e(), _vm._v(" "), _c('i-tab-bar', {
    staticClass: "bottom_btn",
    attrs: {
      "current": _vm.activeBar,
      "eventid": '4',
      "mpcomid": '28'
    },
    on: {
      "change": _vm.changeBar
    }
  }, [_c('i-tab-bar-item', {
    key: "coordinates",
    attrs: {
      "icon": "coordinates",
      "current-icon": "coordinates",
      "title": "签到",
      "mpcomid": '24'
    }
  }), _vm._v(" "), _c('i-tab-bar-item', {
    key: "success",
    attrs: {
      "icon": "success",
      "current-icon": "success",
      "title": "已完成",
      "mpcomid": '25'
    }
  }), _vm._v(" "), _c('i-tab-bar-item', {
    key: "collection",
    attrs: {
      "icon": "collection",
      "current-icon": "collection",
      "title": "打分",
      "mpcomid": '26'
    }
  }), _vm._v(" "), _c('i-tab-bar-item', {
    key: "more",
    attrs: {
      "icon": "more",
      "current-icon": "more",
      "title": "更多",
      "mpcomid": '27'
    }
  })], 1), _vm._v(" "), _c('i-modal', {
    attrs: {
      "title": "请填写审核意见",
      "visible": _vm.showSure,
      "eventid": '6',
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
      "eventid": '5',
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
      "eventid": '8',
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
      "eventid": '7',
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
  })], 1), _vm._v(" "), _c('i-action-sheet', {
    attrs: {
      "visible": _vm.showMore,
      "actions": _vm.moreActions,
      "show-cancel": "",
      "mask-closable": false,
      "eventid": '9',
      "mpcomid": '33'
    },
    on: {
      "cancel": _vm.cancelMore,
      "change": _vm.changeOption
    }
  }), _vm._v(" "), _c('i-action-sheet', {
    attrs: {
      "visible": _vm.showDetele,
      "actions": _vm.deleteActions,
      "show-cancel": "",
      "mask-closable": false,
      "eventid": '10',
      "mpcomid": '34'
    },
    on: {
      "cancel": _vm.cancelDelete,
      "change": _vm.deleteOutwork
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
  }, [_vm._v("确定吗？")]), _vm._v(" "), _c('text', [_vm._v("删除后无法恢复哦")])])]), _vm._v(" "), _c('i-toast', {
    attrs: {
      "id": "toast",
      "mpcomid": '35'
    }
  }), _vm._v(" "), _c('i-message', {
    attrs: {
      "id": "message",
      "mpcomid": '36'
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
     require("vue-hot-reload-api").rerender("data-v-26921cf4", esExports)
  }
}

/***/ })

},[368]);