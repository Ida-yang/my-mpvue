require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([20],{

/***/ 279:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(280);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_0c6f7a01_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(283);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(281)
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_0c6f7a01_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\opportunity\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0c6f7a01", Component.options)
  } else {
    hotAPI.reload("data-v-0c6f7a01", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 281:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 282:
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
            current: '商机',

            init: true,
            noMore: false,
            tableData: [],

            searchList: {
                searchName: '',
                stateid: '',
                keyWord: '',
                example: '',
                powerid: '12',
                page: 1,
                limit: 10
            },
            stateList: [],
            stateActive: '-1',
            predList: [{ label: '6', name: '本月已成交' }, { label: '1', name: '预计7天成交' }, { label: '2', name: '预计15天成交' }, { label: '3', name: '预计本月成交' }, { label: '4', name: '预计下月成交' }, { label: '5', name: '异常商机' }],
            predActive: '-1',
            powerList: [{ label: '11', name: '全部' }, { label: '12', name: '我的' }, { label: '13', name: '本组' }, { label: '14', name: '本机构' }],
            powerActive: '1',
            timeList: [{ label: '2', name: '昨天' }, { label: '1', name: '今天' }, { label: '3', name: '本周' }, { label: '4', name: '本月' }, { label: '5', name: '上月' }],
            timeActive: '-1',

            isValue: false,
            searchCriteria: false
        };
    },
    onShow: function onShow() {
        this.init = true;
        this.noMore = false;
        this.searchList.page = 1;
        this.loadData();
        this.getSearchList();
    },

    // 触底加载
    onReachBottom: function onReachBottom() {
        // console.log('碰到底部啦')
        this.searchList.page = this.searchList.page + 1;
        if (this.noMore == false) {
            this.loadData();
        }
    },

    // 下拉刷新
    onPullDownRefresh: function onPullDownRefresh() {
        this.init = true;
        this.noMore = false;
        this.searchList.page = 1;
        this.loadData();
    },


    methods: {
        loadData: function loadData() {
            var _this = this;
            var data = {
                searchName: this.searchList.searchName,
                stateid: this.searchList.stateid,
                keyWord: this.searchList.keyWord,
                example: this.searchList.example,
                page: this.searchList.page,
                limit: this.searchList.limit
            };
            if (this.searchList.powerid == '11') {
                data.pId = '';
            } else if (this.searchList.powerid == '12') {
                data.pId = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.pId;
            } else if (this.searchList.powerid == '13') {
                data.secondid = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.second_id;
            } else if (this.searchList.powerid == '14') {
                data.deptid = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.private_deptid;
            }
            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'opportunity/query.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    var info = res.data.map.success;
                    info.forEach(function (el) {
                        el.progress_probability = parseInt(el.opportunityProgress[0].progress_probability);
                        if (el.progress_probability == 100) {
                            el.status = 'success';
                        } else if (el.progress_probability == 0) {
                            el.status = 'wrong';
                        } else if (el.progress_probability !== 100 && el.progress_probability >= 50) {
                            el.status = 'normal';
                        } else {
                            el.status = 'info';
                        }
                    });
                    if (_this.init === true) {
                        _this.tableData = info;
                        _this.init = false;
                        // console.log('我的第一次加载')
                        wx.stopPullDownRefresh();
                    } else {
                        _this.tableData = _this.tableData.concat(info);
                        // console.log('我不是第一次加载了')
                        if (info.length < 10) {
                            _this.noMore = true;
                        }
                    }
                }
            });
        },
        getSearchList: function getSearchList() {
            var _this = this;

            wx.request({
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'addstep/selectAddstep.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                success: function success(res) {
                    _this.stateList = res.data.map.addsteps;
                }
            });
        },
        handleInput: function handleInput(e, val) {
            if (val === 1) {
                this.searchList.searchName = e.mp.detail;
            }
            if (e.mp.detail) {
                this.isValue = true;
            } else {
                this.isValue = false;
            }
        },
        closeSearch: function closeSearch() {
            this.searchList.searchName = '';
            this.isValue = false;
            this.search();
        },
        search: function search() {
            this.init = true;
            this.noMore = false;
            this.searchList.page = 1;
            this.loadData();
        },
        queryCriteria: function queryCriteria() {
            this.searchCriteria = !this.searchCriteria;
        },
        checkCriteria: function checkCriteria(item, index, val) {
            if (val === 1) {
                this.powerActive = index;
                this.searchList.powerid = item.label;
            } else if (val === 2) {
                this.stateActive = index;
                this.searchList.stateid = item.step_id;
            } else if (val === 3) {
                this.predActive = index;
                this.searchList.keyWord = item.label;
            } else if (val === 4) {
                this.timeActive = index;
                this.searchList.example = item.label;
            }
            this.search();
        },
        reSet: function reSet() {
            this.searchList = {
                searchName: '',
                stateid: '',
                keyWord: '',
                example: '',
                powerid: '12',
                page: 1,
                limit: 10
            };
            this.stateActive = '-1';
            this.predActive = '-1';
            this.powerActive = '1';
            this.timeActive = '-1';
            this.init = true;
            this.noMore = false;
            this.loadData();
        },
        toAddOpportunity: function toAddOpportunity() {
            var url = 'opportunityAdd/main';
            global.mpvue.navigateTo({ url: url });
        },
        toUpdateOpportunity: function toUpdateOpportunity(e, val) {
            var url = 'opportunityUpdate/main';
            __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.opportunityupdateData = val;
            global.mpvue.navigateTo({ url: url });
        },
        toOpportunityDetail: function toOpportunityDetail(e, val) {
            console.log('11111');
            var url = 'opportunityDetail/main';
            __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.opportunityDetailData = val;
            global.mpvue.navigateTo({ url: url });
        }
    }
});

/***/ }),

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "opportunity_wrap"
  }, [_c('view', {
    staticClass: "search_view"
  }, [_c('view', {
    staticClass: "search_box"
  }, [_c('i-icon', {
    staticClass: "search_icon",
    attrs: {
      "type": "search",
      "size": "16",
      "color": "#80848f",
      "mpcomid": '0'
    }
  }), _vm._v(" "), _c('i-input', {
    attrs: {
      "maxlength": "50",
      "i-class": "search_input",
      "eventid": '0',
      "mpcomid": '1'
    },
    on: {
      "input": function($event) {
        _vm.handleInput($event, 1)
      }
    },
    model: {
      value: (_vm.searchList.searchName),
      callback: function($$v) {
        _vm.searchList.searchName = $$v
      },
      expression: "searchList.searchName"
    }
  }), _vm._v(" "), (_vm.isValue) ? _c('i-icon', {
    staticClass: "search_icon",
    attrs: {
      "type": "close",
      "size": "14",
      "color": "#80848f",
      "eventid": '1',
      "mpcomid": '2'
    },
    on: {
      "click": _vm.closeSearch
    }
  }) : _vm._e()], 1), _vm._v(" "), _c('span', {
    staticClass: "search_btn",
    attrs: {
      "eventid": '2'
    },
    on: {
      "click": _vm.search
    }
  }, [_vm._v("搜索")]), _vm._v(" "), _c('i-icon', {
    staticClass: "search_icon",
    attrs: {
      "type": "other",
      "size": "18",
      "color": "#80848f",
      "eventid": '3',
      "mpcomid": '3'
    },
    on: {
      "click": _vm.queryCriteria
    }
  })], 1), _vm._v(" "), _c('i-drawer', {
    attrs: {
      "mode": "right",
      "visible": _vm.searchCriteria,
      "eventid": '9',
      "mpcomid": '9'
    },
    on: {
      "close": _vm.queryCriteria
    }
  }, [_c('view', {
    staticClass: "search_container"
  }, [_c('i-panel', {
    attrs: {
      "title": "数据授权",
      "i-class": "query_label",
      "mpcomid": '4'
    }
  }, [_c('view', {
    staticClass: "query_view"
  }, _vm._l((_vm.powerList), function(item, index) {
    return _c('span', {
      key: item.label,
      staticClass: "queryBtn",
      class: [index == _vm.powerActive ? 'isActive' : ''],
      attrs: {
        "eventid": '4_' + index
      },
      on: {
        "click": function($event) {
          _vm.checkCriteria(item, index, 1)
        }
      }
    }, [_vm._v(_vm._s(item.name))])
  }))]), _vm._v(" "), _c('i-panel', {
    attrs: {
      "title": "商机进度",
      "i-class": "query_label",
      "mpcomid": '5'
    }
  }, [_c('view', {
    staticClass: "query_view"
  }, _vm._l((_vm.stateList), function(item, index) {
    return _c('span', {
      key: item.step_id,
      staticClass: "queryBtn",
      class: [index == _vm.stateActive ? 'isActive' : ''],
      attrs: {
        "eventid": '5_' + index
      },
      on: {
        "click": function($event) {
          _vm.checkCriteria(item, index, 2)
        }
      }
    }, [_vm._v(_vm._s(item.step_name))])
  }))]), _vm._v(" "), _c('i-panel', {
    attrs: {
      "title": "商机预测",
      "i-class": "query_label",
      "mpcomid": '6'
    }
  }, [_c('view', {
    staticClass: "query_view"
  }, _vm._l((_vm.predList), function(item, index) {
    return _c('span', {
      key: item.label,
      staticClass: "queryBtn",
      class: [index == _vm.predActive ? 'isActive' : ''],
      attrs: {
        "eventid": '6_' + index
      },
      on: {
        "click": function($event) {
          _vm.checkCriteria(item, index, 3)
        }
      }
    }, [_vm._v(_vm._s(item.name))])
  }))]), _vm._v(" "), _c('i-panel', {
    attrs: {
      "title": "新增时间",
      "i-class": "query_label",
      "mpcomid": '7'
    }
  }, [_c('view', {
    staticClass: "query_view"
  }, _vm._l((_vm.timeList), function(item, index) {
    return _c('span', {
      key: item.label,
      staticClass: "queryBtn",
      class: [index == _vm.timeActive ? 'isActive' : ''],
      attrs: {
        "eventid": '7_' + index
      },
      on: {
        "click": function($event) {
          _vm.checkCriteria(item, index, 4)
        }
      }
    }, [_vm._v(_vm._s(item.name))])
  }))]), _vm._v(" "), _c('i-button', {
    staticClass: "reset_btn",
    attrs: {
      "type": "ghost",
      "size": "small",
      "long": "true",
      "eventid": '8',
      "mpcomid": '8'
    },
    on: {
      "click": _vm.reSet
    }
  }, [_vm._v("重置")])], 1)]), _vm._v(" "), _vm._l((_vm.tableData), function(item, index) {
    return _c('i-swipeout', {
      key: item.id,
      attrs: {
        "i-class": "i-swipeout-demo-item",
        "operateWidth": 60,
        "mpcomid": '14_' + index
      }
    }, [_c('view', {
      attrs: {
        "eventid": '10_' + index
      },
      on: {
        "click": function($event) {
          _vm.toOpportunityDetail($event, item)
        }
      },
      slot: "content"
    }, [_c('i-cell', {
      attrs: {
        "i-class": "cell_content",
        "title": item.opportunity_name,
        "label": item.customerpool[0].name,
        "mpcomid": '12_' + index
      }
    }, [_c('wxs', {
      attrs: {
        "module": "tools",
        "src": "./../utils/comming.wxs",
        "mpcomid": '10_' + index
      }
    }), _vm._v(" "), _c('view', {
      staticClass: "cell_footer"
    }, [_vm._v("\n                    负责人：" + _vm._s(item.private_employee) + "\n                      |  \n                    预计成交金额： " + _vm._s(item.opportunity_achievement) + "\n                ")]), _vm._v(" "), _c('view', {
      staticClass: "cell_footer"
    }, [_vm._v("\n                    预计成交时间：" + _vm._s(item.opportunity_deal) + "\n                      |  \n                    阶段：" + _vm._s(item.opportunityProgress[0].progress_name) + "\n                ")]), _vm._v(" "), _c('view', {
      staticClass: "cell_footer"
    }, [_c('i-progress', {
      attrs: {
        "percent": item.progress_probability,
        "status": item.status,
        "mpcomid": '11_' + index
      }
    })], 1)], 1)], 1), _vm._v(" "), _c('view', {
      staticClass: "i-swipeout-button",
      slot: "button"
    }, [_c('view', {
      staticClass: "i-swipeout-button-item",
      staticStyle: {
        "width": "60px",
        "background-color": "#f5f5f5"
      },
      attrs: {
        "eventid": '11_' + index
      },
      on: {
        "click": function($event) {
          _vm.toUpdateOpportunity($event, item)
        }
      }
    }, [_c('i-icon', {
      staticStyle: {
        "color": "#80848f"
      },
      attrs: {
        "size": "24",
        "type": "editor",
        "mpcomid": '13_' + index
      }
    })], 1)])])
  }), _vm._v(" "), (_vm.noMore) ? _c('i-load-more', {
    attrs: {
      "tip": "我是有底线的",
      "loading": false,
      "mpcomid": '15'
    }
  }) : _vm._e(), _vm._v(" "), _c('i-button', {
    staticClass: "bottom_btn",
    attrs: {
      "type": "ghost",
      "long": true,
      "eventid": '12',
      "mpcomid": '16'
    },
    on: {
      "click": _vm.toAddOpportunity
    }
  }, [_vm._v("新增")])], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0c6f7a01", esExports)
  }
}

/***/ })

},[279]);