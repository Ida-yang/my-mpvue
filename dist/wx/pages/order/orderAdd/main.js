require("../../../common/manifest.js")
require("../../../common/vendor.js")
global.webpackJsonpMpvue([65],{

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(150);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 150:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_5e4f5d08_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(153);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(151)
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_5e4f5d08_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\order\\orderAdd\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5e4f5d08", Component.options)
  } else {
    hotAPI.reload("data-v-5e4f5d08", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 151:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 152:
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




/* harmony default export */ __webpack_exports__["a"] = ({
    data: function data() {
        return {
            current: '新增订单',

            addList: {
                ascriptionId: '', //负责人,取客户负责人
                customerpoolId: '',
                customerpoolName: '',
                deliveryAddress: '',
                deliveryMode: '', //交货方式ID
                deliveryModeName: '',
                orderDetails: [],
                orderTime: '',
                settlement: '' //结算方式
            },
            productData: [],
            productInfo: {
                totalAmount: 0,
                discountAfter: 0,
                taxRate: '0',
                realAmount: 0
            },

            showSettle: false,
            settleList: [{ name: '一次性付款' }, { name: '分次付款' }, { name: '月结付款' }],
            showMode: false,
            modeList: [],

            nowDate: '',

            showCounter: false,
            countProduct: {}
        };
    },
    onShow: function onShow() {
        this.loadData();
    },
    mounted: function mounted() {
        this.loadList();
        this.loadMode();
    },


    methods: {
        loadData: function loadData() {
            var poolObj = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.orderPoolNameData;
            if (poolObj) {
                this.addList.customerpoolName = poolObj.poolName;
                this.addList.customerpoolId = poolObj.poolNameID;
                this.addList.ascriptionId = poolObj.ascriptionId;
                this.productInfo.taxRate = poolObj.taxRate;
            }

            var product = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.orderProductData;
            if (product.orderProduct) {
                if (this.productData.length == 0) {
                    // console.log(this.productData,'产品为空数组')
                    this.productData = product.orderProduct;
                } else {
                    // console.log(this.productData,'需要拼接')
                    var aarr = this.productData;
                    var barr = product.orderProduct;
                    aarr.forEach(function (a, i) {
                        barr.forEach(function (b, j) {
                            if (a.id == b.id) {
                                a.countNum += b.countNum;
                                barr.splice(j, 1);
                            }
                        });
                    });

                    this.productData = aarr.concat(barr);
                }

                console.log(this.productData);
                this.loadProduct();
            } else {
                return;
            }
        },
        loadProduct: function loadProduct() {
            var _this2 = this;

            var anum = 0; //消费总金额
            var bnum = 0; //税后总金额金额
            var cnum = 0; //折税后金额
            this.productData.forEach(function (el) {

                var xnum = parseFloat(el.price) * parseInt(el.countNum); //本产品总金额
                el.amountOfMoney = xnum.toFixed(2);

                anum += xnum;
                bnum += parseFloat(el.discountAfter);

                el.taxRate = _this2.productInfo.taxRate;

                var ynum = parseFloat(el.taxRate) * parseFloat(el.discountAfter) / 100; //本产品税额
                var znum = parseFloat(el.discountAfter) + ynum; //本产品税后金额
                el.taxAmount = ynum.toFixed(2);
                el.taxAfter = znum.toFixed(2);

                cnum += znum;
            });
            this.productInfo.totalAmount = anum.toFixed(2);
            this.productInfo.discountAfter = bnum.toFixed(2);
            this.productInfo.realAmount = cnum.toFixed(2);

            console.log(this.productData);
        },
        loadList: function loadList() {
            this.addList = {
                ascriptionId: '', //负责人,取客户负责人
                customerpoolId: '',
                customerpoolName: '',
                deliveryAddress: '',
                deliveryMode: '', //交货方式ID
                deliveryModeName: '',
                orderDetails: [],
                orderTime: '',
                settlement: '' //结算方式
            };
            this.productData = [];
            this.productInfo = {
                totalAmount: 0,
                discountAfter: 0,
                taxRate: '0',
                realAmount: 0
            };
        },
        loadMode: function loadMode() {
            var _this = this;
            this.modeList = [];
            var data = {
                type: '交货方式'
            };

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'typeInfo/getTypeInfoGroupByType.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    var info = res.data;

                    info.forEach(function (el) {
                        _this.modeList.push({ id: el.id, name: el.typeName });
                    });
                }
            });
        },
        cellFocus: function cellFocus(e, val) {
            if (val == 1) {
                var url = '../customers/main';
                global.mpvue.navigateTo({ url: url });
            } else if (val == 2) {
                this.showSettle = true;
            } else if (val == 3) {
                this.showMode = true;
            } else if (val == 4) {
                if (this.addList.customerpoolId) {
                    var _url = '../products/main';
                    global.mpvue.navigateTo({ url: _url });
                } else {
                    Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                        content: '请先选择客户',
                        type: 'warning'
                    });
                    return;
                }
            }
        },
        handleInput: function handleInput(e, val) {
            if (val == 1) {
                this.addList.deliveryAddress = e.mp.detail;
            } else if (val == 2) {
                this.productInfo.taxRate = e.mp.detail;
                this.loadProduct();
            }
        },
        dealChange: function dealChange(e, val) {
            if (val == 1) {
                this.addList.orderTime = e.target.value;
            }
        },
        sheetCancel: function sheetCancel(e, val) {
            if (val == 2) {
                this.showMode = false;
            }
        },
        sheetChange: function sheetChange(e, val) {
            var _this = this;
            var index = e.target.index;
            if (val == 1) {
                this.settleList.forEach(function (a, i) {
                    if (i == index) {
                        _this.addList.settlement = a.name;
                        _this.showSettle = false;
                    }
                });
            } else if (val == 2) {
                this.modeList.forEach(function (b, j) {
                    if (j == index) {
                        _this.addList.deliveryModeName = b.name;
                        _this.addList.deliveryMode = b.id;
                        _this.showMode = false;
                    }
                });
            }
        },
        showCounters: function showCounters(e, val) {
            this.showCounter = true;

            this.countProduct = val;
        },
        closeCounter: function closeCounter(e, val) {
            var _this3 = this;

            if (val == 2) {
                this.productData.forEach(function (item) {
                    if (item.id == _this3.countProduct.id) {
                        // console.log(item,'替换大的值')
                        item = _this3.countProduct;
                    }
                });
            }
            this.showCounter = false;

            this.loadProduct();
        },
        itemcountReduce: function itemcountReduce() {
            if (this.countProduct.countNum == 0) {
                return;
            } else {
                this.countProduct.countNum--;
            }

            this.countdiscount();
        },
        itemcountAdd: function itemcountAdd() {
            this.countProduct.countNum++;

            this.countdiscount();
        },
        itemCountInput: function itemCountInput(e, val) {
            if (val == 1) {
                this.countProduct.countNum = e.target.value;
            } else if (val == 2) {
                this.countProduct.price = e.mp.detail;
            } else if (val == 3) {
                this.countProduct.discount = e.mp.detail;
            }

            this.countdiscount();
        },
        countdiscount: function countdiscount() {
            var a = 0;
            var b = 0;
            var c = 0;

            a = parseInt(this.countProduct.countNum) * parseFloat(this.countProduct.price);
            b = parseFloat(this.countProduct.discount) * a / 100;
            c = a - b;

            this.countProduct.discountAfter = b.toFixed(2);
            this.countProduct.discountAmount = c.toFixed(2);
        },
        addOrder: function addOrder() {
            var _this = this;

            var newArr = new Array();
            this.productData.forEach(function (element) {
                newArr.push({
                    "itemId": element.id,
                    "num": parseInt(element.countNum),
                    "price": parseFloat(element.price),
                    "commitTime": '',
                    "amountOfMoney": element.amountOfMoney,
                    "discount": element.discount,
                    "discountAmount": element.discountAmount,
                    "discountAfter": element.discountAfter,
                    "taxRate": element.taxRate,
                    "taxAmount": element.taxAmount,
                    "taxAfter": element.taxAfter
                    // "goodsCode":element.goodsCode
                });
            });
            var data = {
                ascriptionId: this.addList.ascriptionId, //负责人,取客户负责人
                customerpoolId: this.addList.customerpoolId,
                deliveryAddress: this.addList.deliveryAddress,
                deliveryMode: this.addList.deliveryMode, //交货方式ID
                orderDetails: newArr,
                orderTime: this.addList.orderTime,
                settlement: this.addList.settlement, //结算方式
                totalSum: this.productInfo.realAmount,
                pId: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.pId
            };

            console.log(data);

            var flag = false;
            if (data.orderDetails.length == 0) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '请选择产品',
                    type: 'warning'
                });
                flag = true;
            }
            if (!data.settlement) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '请选择结算方式',
                    type: 'warning'
                });
                flag = true;
            }
            if (!data.customerpoolId) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '请选择客户名称',
                    type: 'warning'
                });
                flag = true;
            }
            if (!data.orderTime) {
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                    content: '请选择订单时间',
                    type: 'warning'
                });
                flag = true;
            }
            if (flag) return;

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'order/insert.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    if (res.data.code && res.data.code == "200") {
                        Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Message"])({
                            content: '新增成功',
                            type: 'success'
                        });
                        __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.orderPoolNameData = '';
                        __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.orderPoolNameData = '';
                        _this.toOrder();
                    } else {
                        Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Message"])({
                            content: res.data.msg,
                            type: 'error'
                        });
                    }
                }
            });
        },
        toOrder: function toOrder() {
            wx.navigateBack({
                delta: 1
            });
        }
    }
});

/***/ }),

/***/ 153:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "add_or_update_wrap"
  }, [_c('i-panel', {
    attrs: {
      "title": " ",
      "mpcomid": '0'
    }
  }), _vm._v(" "), _c('i-panel', {
    attrs: {
      "title": " ",
      "mpcomid": '11'
    }
  }, [_c('i-cell', {
    attrs: {
      "title": "订单日期",
      "request": "",
      "is-link": "",
      "i-class": "simple_cell",
      "i-cell-text": "color_495060_text",
      "mpcomid": '1'
    }
  }, [_c('picker', {
    attrs: {
      "mode": "date",
      "value": _vm.addList.orderTime,
      "start": _vm.nowDate,
      "eventid": '0'
    },
    on: {
      "change": function($event) {
        _vm.dealChange($event, 1)
      }
    },
    slot: "footer"
  }, [_c('view', {
    staticClass: "picker cell_picker"
  }, [_vm._v("\n                " + _vm._s(_vm.addList.orderTime) + "\n                ")])])], 1), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "客户名称",
      "value": _vm.addList.customerpoolName,
      "request": "",
      "is-link": "",
      "i-class": "simple_cell",
      "i-cell-text": "color_495060_text",
      "eventid": '1',
      "mpcomid": '2'
    },
    on: {
      "click": function($event) {
        _vm.cellFocus($event, 1)
      }
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "结算方式",
      "value": _vm.addList.settlement,
      "request": "",
      "is-link": "",
      "i-class": "simple_cell",
      "i-cell-text": "color_495060_text",
      "eventid": '2',
      "mpcomid": '3'
    },
    on: {
      "click": function($event) {
        _vm.cellFocus($event, 2)
      }
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "交货方式",
      "value": _vm.addList.deliveryModeName,
      "is-link": "",
      "i-class": "simple_cell",
      "i-cell-text": "color_495060_text",
      "eventid": '3',
      "mpcomid": '4'
    },
    on: {
      "click": function($event) {
        _vm.cellFocus($event, 3)
      }
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "产品",
      "value": _vm.addList.orderDetails,
      "request": "",
      "is-link": "",
      "i-class": "simple_cell",
      "i-cell-text": "color_495060_text",
      "eventid": '4',
      "mpcomid": '5'
    },
    on: {
      "click": function($event) {
        _vm.cellFocus($event, 4)
      }
    }
  }), _vm._v(" "), _c('view', {
    staticStyle: {
      "padding": "0 8px"
    }
  }, _vm._l((_vm.productData), function(item, index) {
    return _c('view', {
      key: item.id,
      staticClass: "product_item"
    }, [_c('p', {
      staticStyle: {
        "margin-bottom": "8px"
      }
    }, [_vm._v(_vm._s(item.goodsName))]), _vm._v(" "), _c('view', {
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
    }, [(item.title !== item.goodsName) ? _c('p', {
      staticStyle: {
        "margin-bottom": "3px"
      }
    }, [_vm._v(_vm._s(item.title))]) : _vm._e(), _vm._v(" "), _c('p', [_c('span', {
      staticStyle: {
        "color": "#e62c2c"
      }
    }, [_vm._v("￥" + _vm._s(item.price))]), _vm._v(" /" + _vm._s(item.unit))])], 1), _vm._v(" "), _c('view', {
      staticClass: "product_item_amount"
    }, [_c('span', [_vm._v("数量：" + _vm._s(item.countNum) + "    总额：" + _vm._s(item.discountAfter))])]), _vm._v(" "), _c('view', {
      staticClass: "product_item_update",
      attrs: {
        "eventid": '5_' + index
      },
      on: {
        "click": function($event) {
          _vm.showCounters($event, item)
        }
      }
    }, [_c('span', {
      staticStyle: {
        "color": "#ff6333",
        "font-size": "14px"
      }
    }, [_vm._v("修改")])])])], 1)
  })), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "销售金额",
      "value": _vm.productInfo.totalAmount,
      "i-class": "simple_cell",
      "i-cell-text": "color_495060_text",
      "mpcomid": '6'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "折后金额",
      "value": _vm.productInfo.discountAfter,
      "i-class": "simple_cell",
      "i-cell-text": "color_495060_text",
      "mpcomid": '7'
    }
  }), _vm._v(" "), _c('i-input', {
    attrs: {
      "title": "税率(%)",
      "right": "",
      "type": "number",
      "maxlength": "3",
      "eventid": '6',
      "mpcomid": '8'
    },
    on: {
      "input": function($event) {
        _vm.handleInput($event, 2)
      }
    },
    model: {
      value: (_vm.productInfo.taxRate),
      callback: function($$v) {
        _vm.productInfo.taxRate = $$v
      },
      expression: "productInfo.taxRate"
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "折税后金额",
      "value": _vm.productInfo.realAmount,
      "i-class": "simple_cell",
      "i-cell-text": "color_495060_text",
      "mpcomid": '9'
    }
  }), _vm._v(" "), _c('i-input', {
    attrs: {
      "title": "交货地址",
      "right": "",
      "type": "textarea",
      "maxlength": "200",
      "eventid": '7',
      "mpcomid": '10'
    },
    on: {
      "input": function($event) {
        _vm.handleInput($event, 1)
      }
    },
    model: {
      value: (_vm.addList.deliveryAddress),
      callback: function($$v) {
        _vm.addList.deliveryAddress = $$v
      },
      expression: "addList.deliveryAddress"
    }
  })], 1), _vm._v(" "), _c('p', {
    staticClass: "request_tip"
  }, [_c('span', {
    staticStyle: {
      "color": "#f56c6c"
    }
  }, [_vm._v(" * ")]), _vm._v("为必填项")]), _vm._v(" "), (_vm.showCounter) ? _c('view', {
    staticClass: "product_counter"
  }, [_c('view', {
    staticClass: "counter_wrap"
  }, [_c('view', {
    staticClass: "counter_head"
  }, [_vm._v(_vm._s(_vm.countProduct.goodsName))]), _vm._v(" "), _c('view', {
    staticClass: "counter_content"
  }, [_c('i-cell', {
    attrs: {
      "title": "数量",
      "i-class": "simple_cell",
      "i-cell-text": "color_495060_text",
      "mpcomid": '12'
    }
  }, [_c('view', {
    staticClass: "counter_item",
    slot: "footer"
  }, [_c('span', {
    staticClass: "counter_btn",
    class: _vm.countProduct.countNum == 0 ? 'gray_color_text' : '',
    attrs: {
      "eventid": '8'
    },
    on: {
      "click": _vm.itemcountReduce
    }
  }, [_vm._v("-")]), _vm._v(" "), _c('input', {
    staticClass: "counter_text",
    attrs: {
      "value": _vm.countProduct.countNum,
      "type": "number",
      "eventid": '9'
    },
    on: {
      "input": function($event) {
        _vm.itemCountInput($event, 1)
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "counter_btn",
    attrs: {
      "eventid": '10'
    },
    on: {
      "click": _vm.itemcountAdd
    }
  }, [_vm._v("+")])])]), _vm._v(" "), _c('i-input', {
    attrs: {
      "title": "单价",
      "right": "",
      "type": "number",
      "maxlength": "11",
      "eventid": '11',
      "mpcomid": '13'
    },
    on: {
      "input": function($event) {
        _vm.itemCountInput($event, 2)
      }
    },
    model: {
      value: (_vm.countProduct.price),
      callback: function($$v) {
        _vm.countProduct.price = $$v
      },
      expression: "countProduct.price"
    }
  }), _vm._v(" "), _c('i-input', {
    attrs: {
      "title": "折扣率(%)",
      "right": "",
      "type": "number",
      "maxlength": "3",
      "eventid": '12',
      "mpcomid": '14'
    },
    on: {
      "input": function($event) {
        _vm.itemCountInput($event, 3)
      }
    },
    model: {
      value: (_vm.countProduct.discount),
      callback: function($$v) {
        _vm.countProduct.discount = $$v
      },
      expression: "countProduct.discount"
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "折扣金额",
      "value": _vm.countProduct.discountAmount,
      "i-class": "simple_cell",
      "i-cell-text": "color_495060_text",
      "mpcomid": '15'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "折后金额",
      "value": _vm.countProduct.discountAfter,
      "i-class": "simple_cell",
      "i-cell-text": "color_495060_text",
      "mpcomid": '16'
    }
  })], 1), _vm._v(" "), _c('view', {
    staticClass: "counter_foot"
  }, [_c('span', {
    staticStyle: {
      "border-right": "1rpx solid #e9eaec"
    },
    attrs: {
      "eventid": '13'
    },
    on: {
      "click": function($event) {
        _vm.closeCounter($event, 1)
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('span', {
    staticStyle: {
      "color": "#ff6333"
    },
    attrs: {
      "eventid": '14'
    },
    on: {
      "click": function($event) {
        _vm.closeCounter($event, 2)
      }
    }
  }, [_vm._v("确定")])])])]) : _vm._e(), _vm._v(" "), _c('i-button', {
    staticClass: "bottom_btn",
    attrs: {
      "type": "ghost",
      "long": true,
      "eventid": '15',
      "mpcomid": '17'
    },
    on: {
      "click": _vm.addOrder
    }
  }, [_vm._v("确定")]), _vm._v(" "), _c('i-action-sheet', {
    attrs: {
      "visible": _vm.showSettle,
      "actions": _vm.settleList,
      "eventid": '16',
      "mpcomid": '18'
    },
    on: {
      "change": function($event) {
        _vm.sheetChange($event, 1)
      }
    }
  }), _vm._v(" "), _c('i-action-sheet', {
    attrs: {
      "visible": _vm.showMode,
      "actions": _vm.modeList,
      "show-cancel": "",
      "eventid": '17',
      "mpcomid": '19'
    },
    on: {
      "cancel": function($event) {
        _vm.sheetCancel($event, 2)
      },
      "change": function($event) {
        _vm.sheetChange($event, 2)
      }
    }
  }), _vm._v(" "), _c('i-message', {
    attrs: {
      "id": "message",
      "mpcomid": '20'
    }
  }), _vm._v(" "), _c('i-toast', {
    attrs: {
      "id": "toast",
      "mpcomid": '21'
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
     require("vue-hot-reload-api").rerender("data-v-5e4f5d08", esExports)
  }
}

/***/ })

},[149]);