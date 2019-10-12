require("../../../common/manifest.js")
require("../../../common/vendor.js")
global.webpackJsonpMpvue([34],{

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(285);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 285:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_d10c6640_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(288);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(286)
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_d10c6640_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\packageA\\customer\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d10c6640", Component.options)
  } else {
    hotAPI.reload("data-v-d10c6640", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 286:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 287:
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




/* harmony default export */ __webpack_exports__["a"] = ({
    data: function data() {
        return {
            current: '客户',

            init: true,
            noMore: false,
            tableData: [],

            searchList: {
                searchName: '',
                stateid: '',
                customerStateid: '',
                example: '',
                powerid: '12',
                levelsid: '',
                page: 1,
                limit: 10
            },
            stateList: [],
            stateActive: '-1',
            originList: [],
            originActive: '-1',
            levelList: [],
            levelActive: '-1',
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
                levelsid: this.searchList.levelsid,
                stateid: this.searchList.stateid,
                customerStateid: this.searchList.customerStateid,
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
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'customerpool/query.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    var info = res.data.map.success;
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
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'typeInfo/getTypeInfoByType.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                header: {
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    _this.stateList = res.data.name2001;
                    _this.originList = res.data.name3001;
                    _this.levelList = res.data.name4001;
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
            if (val === 2) {
                this.levelActive = index;
                this.searchList.levelsid = item.id;
            } else if (val === 3) {
                this.stateActive = index;
                this.searchList.stateid = item.id;
            } else if (val === 4) {
                this.originActive = index;
                this.searchList.customerStateid = item.id;
            } else if (val === 5) {
                this.timeActive = index;
                this.searchList.example = item.label;
            }
            this.search();
        },
        powerCriteria: function powerCriteria(item, index, val) {
            var _this = this;
            this.powerActive = index;
            this.searchList.powerid = item.label;

            var queryUrl = '';
            if (item.label == '11') {
                queryUrl = 'customerJurisdiction/all.do';
            } else if (item.label == '13') {
                queryUrl = 'customerJurisdiction/second.do';
            } else if (item.label == '14') {
                queryUrl = 'customerJurisdiction/dept.do';
            }

            if (index == 1) {
                this.search();
            } else {
                wx.request({
                    url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + queryUrl, //接口地址
                    header: {
                        'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                    },
                    success: function success(res) {
                        var info = res.data.msg;
                        if (info == 'success') {
                            _this.search();
                        } else if (info == 'error') {
                            Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                                content: '对不起，您没有此权限',
                                type: 'error'
                            });
                        }
                    }
                });
            }
        },
        reSet: function reSet() {
            this.searchList = {
                searchName: '',
                stateid: '',
                customerStateid: '',
                example: '',
                powerid: '12',
                levelsid: '',
                page: 1,
                limit: 10
            };
            this.levelActive = '-1';
            this.stateActive = '-1';
            this.originActive = '-1';
            this.powerActive = '1';
            this.timeActive = '-1';
            this.init = true;
            this.noMore = false;
            this.loadData();
        },
        toAddCustomer: function toAddCustomer() {
            var _this = this;

            wx.request({
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'customerJurisdiction/insert.do', //接口地址
                header: {
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    var info = res.data.msg;
                    if (info == 'success') {
                        var url = 'customerAdd/main';
                        global.mpvue.navigateTo({ url: url });
                    } else if (info == 'error') {
                        Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                            content: '对不起，您没有此权限',
                            type: 'error'
                        });
                    }
                }
            });
        },
        toUpdateCustomer: function toUpdateCustomer(e, val) {
            var _this = this;

            wx.request({
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'customerJurisdiction/update.do', //接口地址
                header: {
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    var info = res.data.msg;
                    if (info == 'success') {
                        var url = 'customerUpdate/main';
                        __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.customerupdateData = val;
                        global.mpvue.navigateTo({ url: url });
                    } else if (info == 'error') {
                        Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                            content: '对不起，您没有此权限',
                            type: 'error'
                        });
                    }
                }
            });
        },
        toCustomerDetail: function toCustomerDetail(e, val) {
            var url = 'customerDetail/main';
            __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.customerDetailData = val;
            global.mpvue.navigateTo({ url: url });
        }
    }
});

/***/ }),

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "customer_wrap"
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
      "eventid": '10',
      "mpcomid": '10'
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
          _vm.powerCriteria(item, index, 1)
        }
      }
    }, [_vm._v(_vm._s(item.name))])
  }))]), _vm._v(" "), _c('i-panel', {
    attrs: {
      "title": "客户分类",
      "i-class": "query_label",
      "mpcomid": '5'
    }
  }, [_c('view', {
    staticClass: "query_view"
  }, _vm._l((_vm.levelList), function(item, index) {
    return _c('span', {
      key: item.id,
      staticClass: "queryBtn",
      class: [index == _vm.levelActive ? 'isActive' : ''],
      attrs: {
        "eventid": '5_' + index
      },
      on: {
        "click": function($event) {
          _vm.checkCriteria(item, index, 2)
        }
      }
    }, [_vm._v(_vm._s(item.typeName))])
  }))]), _vm._v(" "), _c('i-panel', {
    attrs: {
      "title": "客户状态",
      "i-class": "query_label",
      "mpcomid": '6'
    }
  }, [_c('view', {
    staticClass: "query_view"
  }, _vm._l((_vm.stateList), function(item, index) {
    return _c('span', {
      key: item.id,
      staticClass: "queryBtn",
      class: [index == _vm.stateActive ? 'isActive' : ''],
      attrs: {
        "eventid": '6_' + index
      },
      on: {
        "click": function($event) {
          _vm.checkCriteria(item, index, 3)
        }
      }
    }, [_vm._v(_vm._s(item.typeName))])
  }))]), _vm._v(" "), _c('i-panel', {
    attrs: {
      "title": "客户来源",
      "i-class": "query_label",
      "mpcomid": '7'
    }
  }, [_c('view', {
    staticClass: "query_view"
  }, _vm._l((_vm.originList), function(item, index) {
    return _c('span', {
      key: item.id,
      staticClass: "queryBtn",
      class: [index == _vm.originActive ? 'isActive' : ''],
      attrs: {
        "eventid": '7_' + index
      },
      on: {
        "click": function($event) {
          _vm.checkCriteria(item, index, 4)
        }
      }
    }, [_vm._v(_vm._s(item.typeName))])
  }))]), _vm._v(" "), _c('i-panel', {
    attrs: {
      "title": "新增时间",
      "i-class": "query_label",
      "mpcomid": '8'
    }
  }, [_c('view', {
    staticClass: "query_view"
  }, _vm._l((_vm.timeList), function(item, index) {
    return _c('span', {
      key: item.label,
      staticClass: "queryBtn",
      class: [index == _vm.timeActive ? 'isActive' : ''],
      attrs: {
        "eventid": '8_' + index
      },
      on: {
        "click": function($event) {
          _vm.checkCriteria(item, index, 5)
        }
      }
    }, [_vm._v(_vm._s(item.name))])
  }))]), _vm._v(" "), _c('i-button', {
    staticClass: "reset_btn",
    attrs: {
      "type": "ghost",
      "size": "small",
      "long": "true",
      "eventid": '9',
      "mpcomid": '9'
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
        "mpcomid": '13_' + index
      }
    }, [_c('view', {
      attrs: {
        "eventid": '11_' + index
      },
      on: {
        "click": function($event) {
          _vm.toCustomerDetail($event, item)
        }
      },
      slot: "content"
    }, [_c('i-cell', {
      attrs: {
        "i-class": "cell_content",
        "title": item.pName,
        "label": item.address || '无',
        "mpcomid": '11_' + index
      }
    }, [_c('view', {
      staticClass: "cell_footer"
    }, [_vm._v("\n                    " + _vm._s('负责人：' + item.privateUser[0].private_employee) + "\n                       |   \n                    状态：" + _vm._s(item.status || '无') + "\n                       |   \n                    " + _vm._s('未联系天数：' + item.dayNum) + "\n                ")])])], 1), _vm._v(" "), _c('view', {
      staticClass: "i-swipeout-button",
      slot: "button"
    }, [_c('view', {
      staticClass: "i-swipeout-button-item",
      staticStyle: {
        "width": "60px",
        "background-color": "#f5f5f5"
      },
      attrs: {
        "eventid": '12_' + index
      },
      on: {
        "click": function($event) {
          _vm.toUpdateCustomer($event, item)
        }
      }
    }, [_c('i-icon', {
      staticStyle: {
        "color": "#80848f"
      },
      attrs: {
        "size": "24",
        "type": "editor",
        "mpcomid": '12_' + index
      }
    })], 1)])])
  }), _vm._v(" "), (_vm.noMore) ? _c('i-load-more', {
    attrs: {
      "tip": "我是有底线的",
      "loading": false,
      "mpcomid": '14'
    }
  }) : _vm._e(), _vm._v(" "), _c('i-button', {
    staticClass: "bottom_btn",
    attrs: {
      "type": "ghost",
      "long": true,
      "eventid": '13',
      "mpcomid": '15'
    },
    on: {
      "click": _vm.toAddCustomer
    }
  }, [_vm._v("新增")]), _vm._v(" "), _c('i-message', {
    attrs: {
      "id": "message",
      "mpcomid": '16'
    }
  }), _vm._v(" "), _c('i-toast', {
    attrs: {
      "id": "toast",
      "mpcomid": '17'
    }
  })], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-d10c6640", esExports)
  }
}

/***/ })

},[284]);