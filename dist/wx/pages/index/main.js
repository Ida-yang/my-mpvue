require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([29],{

/***/ 177:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(178);



// add this to handle exception
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.config.errorHandler = function (err) {
  if (console && console.error) {
    console.error(err);
  }
};

var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 178:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_5307a380_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(217);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(179)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-5307a380"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_5307a380_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\index\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5307a380", Component.options)
  } else {
    hotAPI.reload("data-v-5307a380", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 179:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_card__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__static_echarts_min_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__static_echarts_min_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__static_echarts_min_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_mpvue_echarts__ = __webpack_require__(11);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






var chart = null;
var option = { //ECharts 配置项
    title: {},
    // tooltip: {
    //     trigger: 'item',
    //     // formatter: "{b}\n{a}：{c}"
    //     formatter: function(params, ticket, callback){
    //         let a = params.data
    //         let b = params.seriesName
    //         var showHtm = a.name + '\n' + b + '：' + a.label

    //         return showHtm;
    //     }
    // },
    // legend: {
    //     data: ['加载失败'],
    //     bottom: 30
    // },
    calculable: true,
    series: [{
        name: '数量',
        type: 'funnel',
        left: '10%',
        top: 30,
        bottom: 30,
        width: '80%',
        minSize: '30%',
        sort: 'descending',
        // sort: 'none',
        // gap: 2,
        label: {
            show: true,
            position: 'inside'
        },
        emphasis: {
            label: {
                fontSize: 14
            }
        },
        data: [{ name: '加载失败' }]
    }]
};

function initChart(canvas, width, height) {
    chart = __WEBPACK_IMPORTED_MODULE_2__static_echarts_min_js___default.a.init(canvas, null, {
        width: width,
        height: height
    });
    canvas.setChart(chart);
    chart.setOption(option, true);

    // console.log(this.next,'333333333')
    return chart; // 返回 chart 后可以自动绑定触摸操作
}

/* harmony default export */ __webpack_exports__["a"] = ({
    components: {
        mpEcharts: __WEBPACK_IMPORTED_MODULE_3_mpvue_echarts__["a" /* default */]
    },

    data: function data() {
        return {
            activeName1: 'first',
            activeName2: '1',
            activeName3: '1',

            next: false,

            month: '',
            year: '',
            searchyear: '',
            searchyearMonth: '',

            amountData: {},

            saleData: {},

            echarts: __WEBPACK_IMPORTED_MODULE_2__static_echarts_min_js___default.a,
            onInit: initChart,

            tableData: []
        };
    },
    onShow: function onShow() {
        this.next = false;
        this.loadDate();
        this.loadSale();
        this.drawfunnel();
    },


    methods: {
        loadDate: function loadDate() {
            var date = new Date();
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? "0" + m : m;

            this.year = y;
            this.month = m;

            this.searchyearMonth = y + '-' + m;

            this.loadAmount();
        },
        loadAmount: function loadAmount() {
            var _this = this;
            var data = {
                pId: __WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */].userData.pId,
                year: this.searchyear,
                yearMonth: this.searchyearMonth
            };

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */].defaulthost + 'homePageHeader/selectMoneyForSmallProcedures.do?cId=' + __WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    _this.amountData = res.data;
                }
            });
        },
        loadSale: function loadSale() {
            var _this = this;
            var data = {
                pId: __WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */].userData.pId,
                example: this.activeName2
            };

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */].defaulthost + 'homePageHeader/saleBriefingForSmallProcedures.do?cId=' + __WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    _this.saleData = res.data;
                }
            });
        },
        drawfunnel: function drawfunnel() {
            var _this = this;
            var data = {
                pId: __WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */].userData.pId,
                keyWord: this.activeName3
            };

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */].defaulthost + 'getMonthCountByExample.do?cId=' + __WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    var info = res.data.reverse();
                    option.series[0].data = [];
                    info.forEach(function (el, i) {
                        option.series[0].data.push({ value: i, name: el.name + '(' + el.value + ')', label: el.value });
                    });

                    _this.tableData = info.reverse();

                    if (_this.next == true) {
                        _this.reloadFunnel();
                    }
                }
            });
        },
        tabClick1: function tabClick1(e) {
            this.activeName1 = e.target.key;
            if (e.target.key == 'first') {
                this.searchyear = '';
                this.searchyearMonth = this.year + '-' + this.month;
            } else if (e.target.key == 'second') {
                this.searchyear = '';
                var m = '';
                if (this.month == '01') {
                    var y = this.year - 1;
                    m = 12;
                    this.searchyearMonth = y + '-' + m;
                } else {
                    m = parseInt(this.month - 1);
                    m = m < 10 ? "0" + m : m;
                    this.searchyearMonth = this.year + '-' + m;
                }
            } else if (e.target.key == 'third') {
                this.searchyear = this.year;
                this.searchyearMonth = '';
            }

            this.loadAmount();
        },
        tabClick2: function tabClick2(e) {
            this.activeName2 = e.target.key;
            this.loadSale();
        },
        tabClick3: function tabClick3(e) {
            this.activeName3 = e.target.key;
            this.next = true;
            this.drawfunnel();
        },
        reloadFunnel: function reloadFunnel() {
            chart.setOption(option, true);
        }
    }
});

/***/ }),

/***/ 217:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "index_wrap"
  }, [_c('i-tabs', {
    attrs: {
      "current": _vm.activeName1,
      "eventid": '0',
      "mpcomid": '3'
    },
    on: {
      "change": _vm.tabClick1
    }
  }, [_c('i-tab', {
    key: "first",
    attrs: {
      "title": "本月",
      "mpcomid": '0'
    }
  }), _vm._v(" "), _c('i-tab', {
    key: "second",
    attrs: {
      "title": "上月",
      "mpcomid": '1'
    }
  }), _vm._v(" "), _c('i-tab', {
    key: "third",
    attrs: {
      "title": "本年",
      "mpcomid": '2'
    }
  })], 1), _vm._v(" "), _c('view', {
    staticClass: "sale_view"
  }, [_c('view', {
    staticClass: "sale_wrap_item_one"
  }, [_c('p', {
    staticClass: "p1"
  }, [_vm._v("销售目标")]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.amountData.target))])], 1), _vm._v(" "), _c('view', {
    staticClass: "sale_wrap_item_one"
  }, [_c('p', {
    staticClass: "p1"
  }, [_vm._v("预计金额")]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.amountData.opportunity_achievement))])], 1), _vm._v(" "), _c('view', {
    staticClass: "sale_wrap_item_one"
  }, [_c('p', {
    staticClass: "p1"
  }, [_vm._v("完成金额")]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.amountData.deal))])], 1), _vm._v(" "), _c('view', {
    staticClass: "sale_wrap_item_one"
  }, [_c('p', {
    staticClass: "p1"
  }, [_vm._v("差    额")]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.amountData.difference))])], 1), _vm._v(" "), _c('view', {
    staticClass: "sale_wrap_item_one"
  }, [_c('p', {
    staticClass: "p1"
  }, [_vm._v("回款金额")]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.amountData.back))])], 1), _vm._v(" "), _c('view', {
    staticClass: "sale_wrap_item_one"
  }, [_c('p', {
    staticClass: "p1"
  }, [_vm._v("计划回款金额")]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.amountData.backPlan))])], 1)]), _vm._v(" "), _c('i-panel', {
    staticClass: "small_panel",
    attrs: {
      "title": "销售简报",
      "mpcomid": '9'
    }
  }, [_c('i-tabs', {
    attrs: {
      "current": _vm.activeName2,
      "eventid": '1',
      "mpcomid": '8'
    },
    on: {
      "change": _vm.tabClick2
    }
  }, [_c('i-tab', {
    key: "1",
    attrs: {
      "title": "今天",
      "mpcomid": '4'
    }
  }), _vm._v(" "), _c('i-tab', {
    key: "3",
    attrs: {
      "title": "本周",
      "mpcomid": '5'
    }
  }), _vm._v(" "), _c('i-tab', {
    key: "4",
    attrs: {
      "title": "本月",
      "mpcomid": '6'
    }
  }), _vm._v(" "), _c('i-tab', {
    key: "5",
    attrs: {
      "title": "上月",
      "mpcomid": '7'
    }
  })], 1)], 1), _vm._v(" "), _c('view', {
    staticClass: "sale_view"
  }, [_c('view', {
    staticClass: "sale_wrap_item_two"
  }, [_vm._m(0), _vm._v(" "), _c('view', {
    staticClass: "item_two_view2"
  }, [_c('p', [_vm._v(_vm._s(_vm.saleData.customertwoNum))]), _vm._v(" "), _c('p', [_vm._v("线索")])], 1)]), _vm._v(" "), _c('view', {
    staticClass: "sale_wrap_item_two"
  }, [_vm._m(1), _vm._v(" "), _c('view', {
    staticClass: "item_two_view2"
  }, [_c('p', [_vm._v(_vm._s(_vm.saleData.customertwoAddNum))]), _vm._v(" "), _c('p', [_vm._v("新增线索")])], 1)]), _vm._v(" "), _c('view', {
    staticClass: "sale_wrap_item_two"
  }, [_vm._m(2), _vm._v(" "), _c('view', {
    staticClass: "item_two_view2"
  }, [_c('p', [_vm._v(_vm._s(_vm.saleData.customerpoolNum))]), _vm._v(" "), _c('p', [_vm._v("客户")])], 1)]), _vm._v(" "), _c('view', {
    staticClass: "sale_wrap_item_two"
  }, [_vm._m(3), _vm._v(" "), _c('view', {
    staticClass: "item_two_view2"
  }, [_c('p', [_vm._v(_vm._s(_vm.saleData.customerpoolAddNum))]), _vm._v(" "), _c('p', [_vm._v("新增客户")])], 1)]), _vm._v(" "), _c('view', {
    staticClass: "sale_wrap_item_two"
  }, [_vm._m(4), _vm._v(" "), _c('view', {
    staticClass: "item_two_view2"
  }, [_c('p', [_vm._v(_vm._s(_vm.saleData.opportunityAddNum))]), _vm._v(" "), _c('p', [_vm._v("新增商机")])], 1)]), _vm._v(" "), _c('view', {
    staticClass: "sale_wrap_item_two"
  }, [_vm._m(5), _vm._v(" "), _c('view', {
    staticClass: "item_two_view2"
  }, [_c('p', [_vm._v(_vm._s(_vm.saleData.followNum))]), _vm._v(" "), _c('p', [_vm._v("新增跟进记录")])], 1)])]), _vm._v(" "), _c('i-panel', {
    staticClass: "small_panel",
    attrs: {
      "title": "商机漏斗",
      "mpcomid": '15'
    }
  }, [_c('i-tabs', {
    attrs: {
      "current": _vm.activeName3,
      "eventid": '2',
      "mpcomid": '14'
    },
    on: {
      "change": _vm.tabClick3
    }
  }, [_c('i-tab', {
    key: "1",
    attrs: {
      "title": "预计7天",
      "mpcomid": '10'
    }
  }), _vm._v(" "), _c('i-tab', {
    key: "2",
    attrs: {
      "title": "预计15天",
      "mpcomid": '11'
    }
  }), _vm._v(" "), _c('i-tab', {
    key: "3",
    attrs: {
      "title": "预计当月",
      "mpcomid": '12'
    }
  }), _vm._v(" "), _c('i-tab', {
    key: "4",
    attrs: {
      "title": "预计下月",
      "mpcomid": '13'
    }
  })], 1)], 1), _vm._v(" "), _c('div', {
    staticClass: "index_funnel"
  }, [_c('mp-echarts', {
    attrs: {
      "echarts": _vm.echarts,
      "onInit": _vm.onInit,
      "canvasId": "demo-canvas",
      "mpcomid": '16'
    }
  })], 1), _vm._v(" "), _c('view', {
    staticClass: "index_table"
  }, [_vm._m(6), _vm._v(" "), _vm._l((_vm.tableData), function(item, index) {
    return _c('view', {
      key: index,
      staticClass: "index_table_td"
    }, [_c('span', [_vm._v(_vm._s(item.name + '(' + item.proportion + ')'))]), _vm._v(" "), _c('span', [_vm._v(_vm._s(item.value))]), _vm._v(" "), _c('span', [_vm._v(_vm._s(item.opportunity_achievement))])])
  })], 2)], 1)
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('view', {
    staticClass: "item_two_view1"
  }, [_c('image', {
    staticStyle: {
      "width": "24px",
      "height": "24px"
    },
    attrs: {
      "src": "../../static/images/clue.png"
    }
  })])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('view', {
    staticClass: "item_two_view1"
  }, [_c('image', {
    staticStyle: {
      "width": "24px",
      "height": "24px"
    },
    attrs: {
      "src": "../../static/images/clue.png"
    }
  })])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('view', {
    staticClass: "item_two_view1"
  }, [_c('image', {
    staticStyle: {
      "width": "24px",
      "height": "24px"
    },
    attrs: {
      "src": "../../static/images/customer.png"
    }
  })])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('view', {
    staticClass: "item_two_view1"
  }, [_c('image', {
    staticStyle: {
      "width": "24px",
      "height": "24px"
    },
    attrs: {
      "src": "../../static/images/customer.png"
    }
  })])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('view', {
    staticClass: "item_two_view1"
  }, [_c('image', {
    staticStyle: {
      "width": "24px",
      "height": "24px"
    },
    attrs: {
      "src": "../../static/images/opportunity.png"
    }
  })])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('view', {
    staticClass: "item_two_view1"
  }, [_c('image', {
    staticStyle: {
      "width": "24px",
      "height": "24px"
    },
    attrs: {
      "src": "../../static/images/opportunity.png"
    }
  })])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('view', {
    staticClass: "index_table_th"
  }, [_c('span', [_vm._v("商机阶段")]), _vm._v(" "), _c('span', [_vm._v("机会数量")]), _vm._v(" "), _c('span', [_vm._v("预计合同金额")])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5307a380", esExports)
  }
}

/***/ })

},[177]);