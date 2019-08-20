require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([65],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_784716fc_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(103);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(101)
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_784716fc_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\order\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-784716fc", Component.options)
  } else {
    hotAPI.reload("data-v-784716fc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 101:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 102:
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



/* harmony default export */ __webpack_exports__["a"] = ({
    data: function data() {
        return {
            current: '订单',

            init: true,
            noMore: false,
            tableData: [],
            totalAmount: '',

            searchList: {
                searchName: '',
                example: '',
                powerid: '12',
                page: 1,
                limit: 10
            },
            powerList: [{ label: '11', name: '全部' }, { label: '12', name: '我的' }, { label: '13', name: '本组' }, { label: '14', name: '本机构' }],
            powerActive: '12',
            timeList: [{ label: '0', name: '全部' }, { label: '2', name: '昨天' }, { label: '1', name: '今天' }, { label: '3', name: '本周' }, { label: '4', name: '本月' }, { label: '5', name: '上月' }],
            timeActive: '0',

            isValue: false,
            searchCriteria: false,

            firstItem: '我的',
            secondItem: '订单日期',

            showFirst: false,
            showSecond: false
        };
    },
    onShow: function onShow() {
        this.init = true;
        this.noMore = false;
        this.searchList.page = 1;
        this.loadData();
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
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'order/selectOrderList.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    var info = res.data.map.orders;
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

                    var newArr = new Array();
                    var order_time = '';
                    var num = 0;

                    _this.tableData.forEach(function (el) {
                        if (el.checkStatus == 0) {
                            el.auditStatus = '未审核';
                        } else if (el.checkStatus == 1) {
                            el.auditStatus = '审核中';
                        } else if (el.checkStatus == 2) {
                            el.auditStatus = '已审核';
                        } else if (el.checkStatus == 3) {
                            el.auditStatus = '未通过';
                        }

                        num += el.totalSum;
                    });

                    _this.totalAmount = num.toFixed(2);
                }
            });
        },
        handleInput: function handleInput(e, val) {
            if (val === 1) {
                this.searchList.searchName = e.target.value;
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
        changeBar: function changeBar(e) {
            var key = e.target.key;
            if (key == 'first') {
                this.showFirst = !this.showFirst;
                this.showSecond = false;
            } else if (key == 'second') {
                this.showSecond = !this.showSecond;
                this.showFirst = false;
            }
        },
        changeItem: function changeItem(e, item, val) {
            if (val == 1) {
                this.searchList.powerid = item.label;
                this.powerActive = item.label;
                this.firstItem = item.name;
                this.showFirst = false;
            } else if (val == 2) {
                this.searchList.example = item.label;
                this.timeActive = item.label;
                this.showSecond = false;
            }

            this.search();
        },
        toAddOrder: function toAddOrder() {
            var url = 'orderAdd/main';
            global.mpvue.navigateTo({ url: url });
        },
        toUpdateOrder: function toUpdateOrder(e, val) {
            var url = 'orderUpdate/main';
            __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.orderupdateData = val;
            global.mpvue.navigateTo({ url: url });
        },
        toOrderDetail: function toOrderDetail(e, val) {
            var url = 'orderDetail/main';
            __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.orderDetailData = val;
            global.mpvue.navigateTo({ url: url });
        }
    }
});

/***/ }),

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "order_wrap"
  }, [_c('view', {
    staticClass: "order_search"
  }, [_c('i-icon', {
    staticClass: "order_search_icon",
    attrs: {
      "type": "search",
      "size": "16",
      "color": "#80848f",
      "mpcomid": '0'
    }
  }), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.searchList.searchName),
      expression: "searchList.searchName"
    }],
    staticClass: "order_search_input",
    attrs: {
      "placeholder": "请输入公司名称查询",
      "maxlength": "50",
      "confirm-type": "search",
      "eventid": '0'
    },
    domProps: {
      "value": (_vm.searchList.searchName)
    },
    on: {
      "input": [function($event) {
        if ($event.target.composing) { return; }
        _vm.searchList.searchName = $event.target.value
      }, function($event) {
        _vm.handleInput($event, 1)
      }],
      "confirm": _vm.search
    }
  }), _vm._v(" "), (_vm.isValue) ? _c('i-icon', {
    staticClass: "order_search_icon",
    attrs: {
      "type": "close",
      "size": "14",
      "color": "#80848f",
      "eventid": '1',
      "mpcomid": '1'
    },
    on: {
      "click": _vm.closeSearch
    }
  }) : _vm._e()], 1), _vm._v(" "), _c('i-tabs', {
    attrs: {
      "i-class": "order_tabs",
      "eventid": '2',
      "mpcomid": '8'
    },
    on: {
      "change": _vm.changeBar
    }
  }, [_c('i-tab', {
    key: "first",
    attrs: {
      "title": _vm.firstItem,
      "mpcomid": '4'
    }
  }, [_vm._v("\n             \n            "), (_vm.showFirst) ? _c('i-icon', {
    attrs: {
      "type": "packup",
      "mpcomid": '3'
    }
  }) : _c('i-icon', {
    attrs: {
      "type": "unfold",
      "mpcomid": '2'
    }
  })], 1), _vm._v(" "), _c('i-tab', {
    key: "second",
    attrs: {
      "title": _vm.secondItem,
      "mpcomid": '7'
    }
  }, [_vm._v("\n             \n            "), (_vm.showSecond) ? _c('i-icon', {
    attrs: {
      "type": "packup",
      "mpcomid": '6'
    }
  }) : _c('i-icon', {
    attrs: {
      "type": "unfold",
      "mpcomid": '5'
    }
  })], 1)], 1), _vm._v(" "), (_vm.showFirst) ? _c('view', {
    staticClass: "bar_option"
  }, _vm._l((_vm.powerList), function(item, index) {
    return _c('p', {
      key: item.label,
      staticClass: "option_p",
      class: _vm.powerActive == item.label ? 'theme_color_text' : '',
      attrs: {
        "eventid": '3_' + index
      },
      on: {
        "click": function($event) {
          _vm.changeItem($event, item, 1)
        }
      }
    }, [_vm._v(_vm._s(item.name))])
  })) : _vm._e(), _vm._v(" "), (_vm.showSecond) ? _c('view', {
    staticClass: "bar_option"
  }, _vm._l((_vm.timeList), function(item, index) {
    return _c('p', {
      key: item.label,
      staticClass: "option_p",
      class: _vm.timeActive == item.label ? 'theme_color_text' : '',
      attrs: {
        "eventid": '4_' + index
      },
      on: {
        "click": function($event) {
          _vm.changeItem($event, item, 2)
        }
      }
    }, [_vm._v(_vm._s(item.name))])
  })) : _vm._e(), _vm._v(" "), _c('view', {
    staticClass: "detail_module"
  }), _vm._v(" "), _vm._l((_vm.tableData), function(item, index) {
    return _c('i-swipeout', {
      key: item.id,
      attrs: {
        "i-class": "i-swipeout-demo-item",
        "operateWidth": 60,
        "mpcomid": '11_' + index
      }
    }, [_c('view', {
      attrs: {
        "eventid": '5_' + index
      },
      on: {
        "click": function($event) {
          _vm.toOrderDetail($event, item)
        }
      },
      slot: "content"
    }, [_c('i-cell', {
      attrs: {
        "i-class": "cell_content",
        "title": item.customerName,
        "label": item.orderNo,
        "mpcomid": '9_' + index
      }
    }, [_c('view', {
      staticClass: "cell_footer"
    }, [_vm._v("\n                    订单时间：" + _vm._s(item.orderTime) + "\n                      |  \n                    金额： " + _vm._s(item.totalSum) + "\n                ")]), _vm._v(" "), _c('view', {
      staticClass: "cell_footer"
    }, [_vm._v("\n                    负责人：" + _vm._s(item.ascription) + "\n                      |  \n                    状态：" + _vm._s(item.auditStatus) + "\n                ")])])], 1), _vm._v(" "), _c('view', {
      staticClass: "i-swipeout-button",
      slot: "button"
    }, [_c('view', {
      staticClass: "i-swipeout-button-item",
      staticStyle: {
        "width": "60px",
        "background-color": "#f5f5f5"
      },
      attrs: {
        "eventid": '6_' + index
      },
      on: {
        "click": function($event) {
          _vm.toUpdateOrder($event, item)
        }
      }
    }, [_c('i-icon', {
      staticStyle: {
        "color": "#80848f"
      },
      attrs: {
        "size": "24",
        "type": "editor",
        "mpcomid": '10_' + index
      }
    })], 1)])])
  }), _vm._v(" "), (_vm.noMore) ? _c('i-load-more', {
    attrs: {
      "tip": "我是有底线的",
      "loading": false,
      "mpcomid": '12'
    }
  }) : _vm._e(), _vm._v(" "), _c('view', {
    staticClass: "bottom_view"
  }, [_c('span', {
    staticStyle: {
      "padding-left": "15px"
    }
  }, [_vm._v("合计")]), _vm._v(" "), _c('span', {
    staticStyle: {
      "padding-right": "15px"
    }
  }, [_vm._v("￥" + _vm._s(_vm.totalAmount))])]), _vm._v(" "), _c('view', {
    staticClass: "order_add_btn",
    attrs: {
      "eventid": '7'
    },
    on: {
      "click": _vm.toAddOrder
    }
  }, [_c('i-icon', {
    attrs: {
      "type": "add",
      "size": "24",
      "color": "#ff6633",
      "mpcomid": '13'
    }
  })], 1)], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-784716fc", esExports)
  }
}

/***/ }),

/***/ 99:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(100);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ })

},[99]);