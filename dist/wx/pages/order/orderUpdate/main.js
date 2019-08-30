require("../../../common/manifest.js")
require("../../../common/vendor.js")
global.webpackJsonpMpvue([62],{

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(115);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_787adcb8_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(118);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(116)
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_787adcb8_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\order\\orderUpdate\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-787adcb8", Component.options)
  } else {
    hotAPI.reload("data-v-787adcb8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 116:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 117:
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




/* harmony default export */ __webpack_exports__["a"] = ({
    data: function data() {
        return {
            current: '编辑订单',

            updateList: {
                id: '',
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
            var _this = this;
            var info = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.orderupdateData;

            var data = {
                id: info.id
            };
            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'order/selectById.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    var info = res.data;
                    _this.updateList = {
                        id: info.id,
                        ascriptionId: info.ascriptionId, //负责人,取客户负责人
                        customerpoolId: info.customerpoolId,
                        customerpoolName: info.customerName,
                        deliveryAddress: info.deliveryAddress,
                        deliveryMode: info.deliveryMode, //交货方式ID
                        deliveryModeName: info.delivery,
                        orderDetails: [],
                        orderTime: info.orderTime,
                        settlement: info.settlement //结算方式
                    };

                    var a = 0;
                    var b = 0;
                    var c = 0;
                    var d = 0;
                    var e = 0;

                    var newArr = new Array();

                    info.orderDetails.forEach(function (el) {
                        el.countNum = el.num;
                        if (el.image) {
                            el.proImage = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].sourcehost + 'product/' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId + '/' + el.image;
                        } else {
                            el.proImage = '../../../static/images/noProduct.png';
                        }
                        a += el.amountOfMoney;
                        b += el.discountAmount;
                        c += el.discountAfter;
                        d += el.taxAmount;
                        e += el.taxAfter;

                        newArr.push({
                            amountOfMoney: el.amountOfMoney,
                            commitTime: el.commitTime,
                            discount: el.discount,
                            discountAfter: el.discountAfter,
                            discountAmount: el.discountAmount,
                            goodsName: el.goodsName,
                            image: el.image,
                            proImage: el.proImage,
                            id: el.itemId,
                            num: el.num,
                            countNum: el.num,
                            price: el.price,
                            taxAfter: el.taxAfter,
                            taxAmount: el.taxAmount,
                            taxRate: el.taxRate,
                            title: el.title,
                            unit: el.unit
                        });
                    });

                    _this.productData = newArr;
                    _this.productInfo = {
                        totalAmount: a.toFixed(2),
                        discountAfter: c.toFixed(2),
                        taxRate: info.orderDetails[0].taxRate,
                        realAmount: info.totalSum
                    };

                    console.log(_this.productData);
                }
            });
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
            var _this = this;
            if (val == 1) {
                this.showSettle = true;
            } else if (val == 2) {
                this.showMode = true;
            } else if (val == 3) {
                var data = {
                    id: this.updateList.customerpoolId
                };
                wx.request({
                    method: 'post',
                    url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'customerpool/getPoolById.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                    data: data,
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                    },
                    success: function success(res) {
                        var info = res.data.map.success;
                        var customer_discount = '';
                        var customer_taxRate = '';
                        if (info.discount) {
                            customer_discount = info.discount;
                        } else {
                            customer_discount = '100';
                        }
                        if (info.taxRate) {
                            customer_taxRate = info.taxRate;
                        } else {
                            customer_taxRate = '0';
                        }
                        __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.orderPoolNameData = {
                            taxRate: customer_taxRate,
                            discount: customer_discount
                        };

                        var url = '../products/main';
                        global.mpvue.navigateTo({ url: url });
                    }
                });
            }
        },
        handleInput: function handleInput(e, val) {
            if (val == 1) {
                this.updateList.deliveryAddress = e.mp.detail;
            } else if (val == 2) {
                this.productInfo.taxRate = e.mp.detail;
                this.loadProduct();
            }
        },
        dealChange: function dealChange(e, val) {
            if (val == 1) {
                this.updateList.orderTime = e.target.value;
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
                        _this.updateList.settlement = a.name;
                        _this.showSettle = false;
                    }
                });
            } else if (val == 2) {
                this.modeList.forEach(function (b, j) {
                    if (j == index) {
                        _this.updateList.deliveryModeName = b.name;
                        _this.updateList.deliveryMode = b.id;
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
                console.log(element);
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
                });
            });
            var data = {
                id: this.updateList.id,
                ascriptionId: this.updateList.ascriptionId, //负责人,取客户负责人
                customerpoolId: this.updateList.customerpoolId,
                deliveryAddress: this.updateList.deliveryAddress,
                deliveryMode: this.updateList.deliveryMode, //交货方式ID
                orderDetails: newArr,
                orderTime: this.updateList.orderTime,
                settlement: this.updateList.settlement, //结算方式
                totalSum: this.productInfo.realAmount,
                pId: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.pId
            };

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'order/update.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    // "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    if (res.data.code && res.data.code == "200") {
                        Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Message"])({
                            content: '编辑成功',
                            type: 'success'
                        });
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

/***/ 118:
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
      "value": _vm.updateList.orderTime,
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
  }, [_vm._v("\n                " + _vm._s(_vm.updateList.orderTime) + "\n                ")])])], 1), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "客户名称",
      "value": _vm.updateList.customerpoolName,
      "request": "",
      "i-class": "simple_cell",
      "i-cell-text": "color_495060_text",
      "mpcomid": '2'
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "结算方式",
      "value": _vm.updateList.settlement,
      "request": "",
      "is-link": "",
      "i-class": "simple_cell",
      "i-cell-text": "color_495060_text",
      "eventid": '1',
      "mpcomid": '3'
    },
    on: {
      "click": function($event) {
        _vm.cellFocus($event, 1)
      }
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "交货方式",
      "value": _vm.updateList.deliveryModeName,
      "is-link": "",
      "i-class": "simple_cell",
      "i-cell-text": "color_495060_text",
      "eventid": '2',
      "mpcomid": '4'
    },
    on: {
      "click": function($event) {
        _vm.cellFocus($event, 2)
      }
    }
  }), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "产品",
      "value": _vm.updateList.orderDetails,
      "request": "",
      "is-link": "",
      "i-class": "simple_cell",
      "i-cell-text": "color_495060_text",
      "eventid": '3',
      "mpcomid": '5'
    },
    on: {
      "click": function($event) {
        _vm.cellFocus($event, 3)
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
        "eventid": '4_' + index
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
      "eventid": '5',
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
      "eventid": '6',
      "mpcomid": '10'
    },
    on: {
      "input": function($event) {
        _vm.handleInput($event, 1)
      }
    },
    model: {
      value: (_vm.updateList.deliveryAddress),
      callback: function($$v) {
        _vm.updateList.deliveryAddress = $$v
      },
      expression: "updateList.deliveryAddress"
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
      "eventid": '7'
    },
    on: {
      "click": _vm.itemcountReduce
    }
  }, [_vm._v("-")]), _vm._v(" "), _c('input', {
    staticClass: "counter_text",
    attrs: {
      "value": _vm.countProduct.countNum,
      "type": "number",
      "eventid": '8'
    },
    on: {
      "input": function($event) {
        _vm.itemCountInput($event, 1)
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "counter_btn",
    attrs: {
      "eventid": '9'
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
      "eventid": '10',
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
      "eventid": '11',
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
      "eventid": '12'
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
      "eventid": '13'
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
      "eventid": '14',
      "mpcomid": '17'
    },
    on: {
      "click": _vm.addOrder
    }
  }, [_vm._v("确定")]), _vm._v(" "), _c('i-action-sheet', {
    attrs: {
      "visible": _vm.showSettle,
      "actions": _vm.settleList,
      "eventid": '15',
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
      "eventid": '16',
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
     require("vue-hot-reload-api").rerender("data-v-787adcb8", esExports)
  }
}

/***/ })

},[114]);