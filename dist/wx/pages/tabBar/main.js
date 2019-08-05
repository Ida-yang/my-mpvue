require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([6],{

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(344);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_d483bbb4_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(347);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(345)
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_d483bbb4_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\tabBar\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d483bbb4", Component.options)
  } else {
    hotAPI.reload("data-v-d483bbb4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 345:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__);
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






var chart = null;
var option = { //ECharts 配置项
    title: {
        text: '商机漏斗',
        left: 10,
        top: 10,
        textStyle: { //标题的文字样式
            fontSize: 15
        }
    },
    tooltip: {
        trigger: 'item',
        // formatter: "{b}\n{a}：{c}"
        formatter: function formatter(params, ticket, callback) {
            console.log(params.seriesName, params.data);
            var a = params.data;
            var b = params.seriesName;
            var showHtm = a.name + '\n' + b + '：' + a.label;

            return showHtm;
        }
    },
    legend: {
        data: ['加载失败'],
        bottom: 30
    },
    calculable: true,
    series: [{
        name: '数量',
        type: 'funnel',
        left: '10%',
        top: 60,
        bottom: 100,
        width: '80%',
        minSize: '20%',
        sort: 'none',
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
            current: 'homepage',

            echarts: __WEBPACK_IMPORTED_MODULE_2__static_echarts_min_js___default.a,
            onInit: initChart
        };
    },
    onShow: function onShow() {
        this.drawfunnel();
    },


    methods: {
        handleChange: function handleChange(detail) {
            this.current = detail.target.key;
        },
        bindViewTap: function bindViewTap() {
            var url = '../index/main';
            if (global.mpvuePlatform === 'wx') {
                global.mpvue.switchTab({ url: url });
            } else {
                global.mpvue.navigateTo({ url: url });
            }
        },
        onShareAppMessage: function onShareAppMessage() {
            return {
                title: 'iView Weapp',
                imageUrl: 'https://file.iviewui.com/iview-weapp-logo.png'
            };
        },
        drawfunnel: function drawfunnel() {
            option.series[0].data = [{ value: 70, name: 'xxxx', label: 100 }, { value: 60, name: 'yyyy', label: 100 }, { value: 50, name: 'aaaa', label: 100 }, { value: 40, name: 'bbbb', label: 200 }, { value: 30, name: 'cccc', label: 300 }, { value: 20, name: 'dddd', label: 400 }, { value: 10, name: 'eeee', label: 500 }];
            option.legend.data = ['xxxx', 'yyyy', 'aaaa', 'bbbb', 'cccc', 'dddd', 'eeee'];
        }
    }
});

/***/ }),

/***/ 347:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('i-notice-bar', {
    attrs: {
      "icon": "systemprompt",
      "loop": "",
      "mpcomid": '0'
    }
  }, [_vm._v("\n        2018年世界杯,将于6月14日至7月15日举行;2018年世界杯,将于6月14日至7月15日举行;\n    ")]), _vm._v(" "), _c('i-panel', {
    attrs: {
      "title": "基本用法",
      "mpcomid": '1'
    }
  }), _vm._v(" "), _c('i-tab-bar', {
    attrs: {
      "current": _vm.current,
      "eventid": '0',
      "mpcomid": '6'
    },
    on: {
      "change": _vm.handleChange
    }
  }, [_c('i-tab-bar-item', {
    key: "homepage",
    attrs: {
      "icon": "homepage",
      "current-icon": "homepage_fill",
      "title": "Home",
      "mpcomid": '2'
    }
  }), _vm._v(" "), _c('i-tab-bar-item', {
    key: "group",
    attrs: {
      "icon": "group",
      "current-icon": "group_fill",
      "title": "Friends",
      "mpcomid": '3'
    }
  }), _vm._v(" "), _c('i-tab-bar-item', {
    key: "remind",
    attrs: {
      "icon": "remind",
      "current-icon": "remind_fill",
      "count": "3",
      "title": "Notice",
      "mpcomid": '4'
    }
  }), _vm._v(" "), _c('i-tab-bar-item', {
    key: "mine",
    attrs: {
      "icon": "mine",
      "current-icon": "mine_fill",
      "dot": "",
      "title": "My",
      "mpcomid": '5'
    }
  })], 1), _vm._v(" "), _c('i-button', {
    attrs: {
      "type": "success",
      "eventid": '1',
      "mpcomid": '7'
    },
    on: {
      "click": _vm.bindViewTap
    }
  }, [_vm._v("进入小程序")]), _vm._v(" "), _c('div', {
    staticClass: "home-funnel"
  }, [_c('mp-echarts', {
    attrs: {
      "echarts": _vm.echarts,
      "onInit": _vm.onInit,
      "canvasId": "demo-canvas",
      "mpcomid": '8'
    }
  })], 1)], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-d483bbb4", esExports)
  }
}

/***/ })

},[343]);