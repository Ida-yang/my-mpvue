require("../../../common/manifest.js")
require("../../../common/vendor.js")
global.webpackJsonpMpvue([61],{

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(120);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_74545b2d_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(123);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(121)
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_74545b2d_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\order\\products\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-74545b2d", Component.options)
  } else {
    hotAPI.reload("data-v-74545b2d", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 121:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 122:
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




/* harmony default export */ __webpack_exports__["a"] = ({
    data: function data() {
        return {
            current: '产品',

            init: true,
            noMore: false,
            classData: [],
            productData: [],

            searchList: {
                searchName: '',
                classification_id: '',
                page: 1,
                limit: 10
            },

            isValue: false,
            searchCriteria: false,

            activename: 'name1',

            totalNumber: 0,
            totalAmount: 0
        };
    },
    mounted: function mounted() {
        this.init = true;
        this.noMore = false;
        this.searchList.page = 1;
        this.loadClass();
        this.loadData();
    },
    onReachBottom: function onReachBottom() {
        // console.log('碰到底部啦')
        this.searchList.page = this.searchList.page + 1;
        if (this.noMore == false) {
            this.loadData();
        }
    },


    methods: {
        loadClass: function loadClass() {
            var _this = this;
            wx.request({
                method: 'get',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'classification/getClassificationNodeTree.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    _this.classData = res.data.map.success;
                }
            });
        },
        loadData: function loadData() {
            var _this = this;
            var data = {
                searchName: this.searchList.searchName,
                classification_id: this.searchList.classification_id,
                page: this.searchList.page,
                limit: this.searchList.limit
            };
            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'goods/search.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    var info = res.data.map.goods;

                    info.forEach(function (el) {
                        el.countNum = 0;
                        if (el.image) {
                            el.proImage = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].sourcehost + 'product/' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId + '/' + el.image;
                        } else {
                            el.proImage = '../../../static/images/noProduct.png';
                        }
                    });

                    if (_this.init === true) {
                        _this.productData = info;
                        _this.init = false;
                        // console.log('我的第一次加载')
                        wx.stopPullDownRefresh();
                    } else {
                        _this.productData = _this.productData.concat(info);
                        // console.log('我不是第一次加载了')
                        if (info.length < 10) {
                            _this.noMore = true;
                        }
                    }
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
        collapseClick: function collapseClick(e, val, index) {
            if (index == 1) {
                this.searchList.classification_id = '';
            } else if (index == 2) {
                this.searchList.classification_id = val.id;
            }

            this.search();
        },
        collapseItem: function collapseItem(e, val, index) {
            this.searchList.classification_id = val.id;

            this.classData.forEach(function (item) {
                if (item.id == val.parentid) {
                    item.next.forEach(function (el) {
                        el.active = false;
                        if (el.id == val.id) {
                            el.active = true;
                        }
                    });
                }
            });
            this.search();
        },
        countReduce: function countReduce(e, val) {
            this.productData.forEach(function (el) {
                if (el.id == val.id) {
                    if (el.countNum == 0) {
                        return;
                    } else {
                        el.countNum--;
                    }
                }
            });

            this.countAll();
        },
        countAdd: function countAdd(e, val) {
            this.productData.forEach(function (el) {
                if (el.id == val.id) {
                    el.countNum++;
                }
            });

            this.countAll();
        },
        countInput: function countInput(e, val) {
            var value = e.target.value;

            this.productData.forEach(function (el) {
                if (el.id == val.id) {
                    el.countNum = parseInt(value);
                }
            });

            this.countAll();
        },
        countAll: function countAll() {
            var num = 0;
            var amount = 0;
            this.productData.forEach(function (el) {
                if (el.countNum) {
                    var a = 0;
                    num += el.countNum;
                    a = el.countNum * el.tbGoods.price;
                    amount += a;
                }
            });

            console.log(num, amount);

            this.totalNumber = num;
            this.totalAmount = amount;
        },
        addProduct: function addProduct() {
            // let productData = []
            // let orderDetails = []
            var newArr = new Array();

            this.productData.forEach(function (el, i) {
                if (el.countNum) {
                    newArr.push(el);
                }
            });

            __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.orderProductData = {
                orderProduct: newArr,
                totalNumber: this.totalNumber,
                totalAmount: this.totalAmount
            };

            wx.navigateBack({
                delta: 1
            });
        }
    }
});

/***/ }),

/***/ 123:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "order_product_wrap"
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
  }) : _vm._e()], 1), _vm._v(" "), _c('view', {
    staticClass: "order_product_content"
  }, [_c('scroll-view', {
    staticClass: "caption_wrap",
    attrs: {
      "scroll-y": ""
    }
  }, [_c('i-collapse', {
    attrs: {
      "name": _vm.activename,
      "accordion": "",
      "i-class": "order_collapse",
      "mpcomid": '4'
    }
  }, [_c('i-collapse-item', {
    attrs: {
      "title": "全部商品",
      "name": "name1",
      "i-class": "order_collapse_item",
      "eventid": '2',
      "mpcomid": '2'
    },
    on: {
      "collapse": function($event) {
        _vm.collapseClick($event, _vm.item, 1)
      }
    }
  }), _vm._v(" "), _vm._l((_vm.classData), function(item, index) {
    return _c('i-collapse-item', {
      key: index,
      attrs: {
        "title": item.name,
        "name": item.id,
        "i-class": "order_collapse_item",
        "i-collapse-title-wrap": "order_collapse_title",
        "eventid": '4_' + index,
        "mpcomid": '3_' + index
      },
      on: {
        "collapse": function($event) {
          _vm.collapseClick($event, item, 2)
        }
      }
    }, [_c('view', {
      slot: "content"
    }, _vm._l((item.next), function(el, i) {
      return _c('p', {
        key: i,
        staticClass: "order_collapse_c_p",
        class: el.active ? 'theme_color_text' : '',
        attrs: {
          "eventid": '3_' + index + '-' + i
        },
        on: {
          "click": function($event) {
            _vm.collapseItem($event, el, 2)
          }
        }
      }, [_vm._v(_vm._s(el.name))])
    }))])
  })], 2)], 1), _vm._v(" "), _c('scroll-view', {
    staticClass: "product_wrap",
    attrs: {
      "scroll-y": ""
    }
  }, _vm._l((_vm.productData), function(item, index) {
    return _c('view', {
      key: item.id,
      staticClass: "product_item"
    }, [_c('p', {
      staticStyle: {
        "margin-bottom": "8px"
      }
    }, [_vm._v(_vm._s(item.tbGoods.goodsName))]), _vm._v(" "), _c('view', {
      staticClass: "product_item_c"
    }, [_c('image', {
      staticStyle: {
        "width": "70px",
        "height": "70px"
      },
      attrs: {
        "src": item.proImage
      }
    }), _vm._v(" "), _c('view', {
      staticClass: "product_item_price"
    }, [_c('p', {
      staticStyle: {
        "margin-bottom": "10px"
      }
    }, [_vm._v(_vm._s(item.title))]), _vm._v(" "), _c('p', [_c('span', {
      staticStyle: {
        "color": "#e62c2c"
      }
    }, [_vm._v("￥" + _vm._s(item.tbGoods.price))]), _vm._v(" /" + _vm._s(item.tbGoods.unit))])], 1), _vm._v(" "), _c('view', {
      staticClass: "product_item_counter"
    }, [_c('span', {
      staticClass: "counter_btn",
      class: item.countNum == 0 ? 'gray_color_text' : '',
      attrs: {
        "eventid": '5_' + index
      },
      on: {
        "click": function($event) {
          _vm.countReduce($event, item)
        }
      }
    }, [_vm._v("-")]), _vm._v(" "), _c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (item.countNum),
        expression: "item.countNum"
      }],
      staticClass: "counter_text",
      attrs: {
        "eventid": '6_' + index
      },
      domProps: {
        "value": (item.countNum)
      },
      on: {
        "input": [function($event) {
          if ($event.target.composing) { return; }
          item.countNum = $event.target.value
        }, function($event) {
          _vm.countInput($event, item)
        }]
      }
    }), _vm._v(" "), _c('span', {
      staticClass: "counter_btn",
      attrs: {
        "eventid": '7_' + index
      },
      on: {
        "click": function($event) {
          _vm.countAdd($event, item)
        }
      }
    }, [_vm._v("+")])])])], 1)
  }))], 1), _vm._v(" "), _c('view', {
    staticClass: "bottom_view"
  }, [_c('span', {
    staticStyle: {
      "padding-left": "15px"
    }
  }, [_vm._v("共 " + _vm._s(_vm.totalNumber) + " 个")]), _vm._v(" "), _c('i-button', {
    attrs: {
      "type": "subject",
      "i-class": "inline_btn",
      "eventid": '8',
      "mpcomid": '5'
    },
    on: {
      "click": _vm.addProduct
    }
  }, [_vm._v("确定")])], 1)])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-74545b2d", esExports)
  }
}

/***/ })

},[119]);