require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([24],{

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(165);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 165:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_619bc6d4_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(168);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(166)
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_619bc6d4_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\module\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-619bc6d4", Component.options)
  } else {
    hotAPI.reload("data-v-619bc6d4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 166:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 167:
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


// import { $Message } from '../../../dist/wx/iview/base/index';

/* harmony default export */ __webpack_exports__["a"] = ({
    data: function data() {
        return {
            current: '功能'
        };
    },
    mounted: function mounted() {},


    methods: {
        toClue: function toClue() {
            console.log('去线索');
            var url = '../clue/main';
            global.mpvue.navigateTo({ url: url });
        },
        toCluePool: function toCluePool() {
            console.log('去线索池');
            var url = '../cluePool/main';
            global.mpvue.navigateTo({ url: url });
        },
        toCustomer: function toCustomer() {
            console.log('去客户');
            var url = '../customer/main';
            global.mpvue.navigateTo({ url: url });
        },
        toCustomerPool: function toCustomerPool() {
            console.log('去客户池');
            var url = '../customerPool/main';
            global.mpvue.navigateTo({ url: url });
        },
        toContact: function toContact() {
            console.log('去联系人');
            var url = '../contact/main';
            global.mpvue.navigateTo({ url: url });
        },
        toOpportunity: function toOpportunity() {
            console.log('去商机');
            var url = '../opportunity/main';
            global.mpvue.navigateTo({ url: url });
        },
        toAgreement: function toAgreement() {
            console.log('去合同');
            var url = '../agreement/main';
            global.mpvue.navigateTo({ url: url });
        },
        toPayCollection: function toPayCollection() {
            console.log('去应收回款');
            var url = '../payCollection/main';
            global.mpvue.navigateTo({ url: url });
        },
        toOutwork: function toOutwork() {
            console.log('去外勤');
            var url = '../outwork/main';
            global.mpvue.navigateTo({ url: url });
        },
        toTask: function toTask() {
            console.log('去任务');
            var url = '../task/main';
            global.mpvue.navigateTo({ url: url });
        },
        toNote: function toNote() {
            console.log('去便签');
            var url = '../note/main';
            global.mpvue.navigateTo({ url: url });
        }
    }
});

/***/ }),

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "module_content"
  }, [_c('i-panel', {
    staticClass: "small_panel",
    attrs: {
      "title": "常用",
      "mpcomid": '0'
    }
  }), _vm._v(" "), _c('i-grid', {
    attrs: {
      "i-class": "module_view",
      "mpcomid": '11'
    }
  }, [_c('i-row', {
    attrs: {
      "mpcomid": '10'
    }
  }, [_c('i-grid-item', {
    attrs: {
      "eventid": '0',
      "mpcomid": '3'
    },
    on: {
      "click": _vm.toCustomer
    }
  }, [_c('i-grid-icon', {
    attrs: {
      "mpcomid": '1'
    }
  }, [_c('image', {
    staticStyle: {
      "width": "20px",
      "height": "20px"
    },
    attrs: {
      "src": "../../static/images/customer.png"
    }
  })]), _vm._v(" "), _c('i-grid-label', {
    attrs: {
      "mpcomid": '2'
    }
  }, [_vm._v("客户")])], 1), _vm._v(" "), _c('i-grid-item', {
    attrs: {
      "eventid": '1',
      "mpcomid": '6'
    },
    on: {
      "click": _vm.toOpportunity
    }
  }, [_c('i-grid-icon', {
    attrs: {
      "mpcomid": '4'
    }
  }, [_c('image', {
    staticStyle: {
      "width": "20px",
      "height": "20px"
    },
    attrs: {
      "src": "../../static/images/opportunity.png"
    }
  })]), _vm._v(" "), _c('i-grid-label', {
    attrs: {
      "mpcomid": '5'
    }
  }, [_vm._v("商机")])], 1), _vm._v(" "), _c('i-grid-item', {
    attrs: {
      "eventid": '2',
      "mpcomid": '9'
    },
    on: {
      "click": _vm.toAgreement
    }
  }, [_c('i-grid-icon', {
    attrs: {
      "mpcomid": '7'
    }
  }, [_c('image', {
    staticStyle: {
      "width": "20px",
      "height": "20px"
    },
    attrs: {
      "src": "../../static/images/agreement.png"
    }
  })]), _vm._v(" "), _c('i-grid-label', {
    attrs: {
      "mpcomid": '8'
    }
  }, [_vm._v("合同")])], 1)], 1)], 1), _vm._v(" "), _c('i-panel', {
    staticClass: "small_panel",
    attrs: {
      "title": "销售支持",
      "mpcomid": '12'
    }
  }), _vm._v(" "), _c('i-grid', {
    attrs: {
      "i-class": "module_view",
      "mpcomid": '38'
    }
  }, [_c('i-row', {
    attrs: {
      "mpcomid": '37'
    }
  }, [_c('i-grid-item', {
    attrs: {
      "eventid": '3',
      "mpcomid": '15'
    },
    on: {
      "click": _vm.toClue
    }
  }, [_c('i-grid-icon', {
    attrs: {
      "mpcomid": '13'
    }
  }, [_c('image', {
    staticStyle: {
      "width": "20px",
      "height": "20px"
    },
    attrs: {
      "src": "../../static/images/clue.png"
    }
  })]), _vm._v(" "), _c('i-grid-label', {
    attrs: {
      "mpcomid": '14'
    }
  }, [_vm._v("线索")])], 1), _vm._v(" "), _c('i-grid-item', {
    attrs: {
      "eventid": '4',
      "mpcomid": '18'
    },
    on: {
      "click": _vm.toCluePool
    }
  }, [_c('i-grid-icon', {
    attrs: {
      "mpcomid": '16'
    }
  }, [_c('image', {
    staticStyle: {
      "width": "20px",
      "height": "20px"
    },
    attrs: {
      "src": "../../static/images/cluePool.png"
    }
  })]), _vm._v(" "), _c('i-grid-label', {
    attrs: {
      "mpcomid": '17'
    }
  }, [_vm._v("线索池")])], 1), _vm._v(" "), _c('i-grid-item', {
    attrs: {
      "eventid": '5',
      "mpcomid": '21'
    },
    on: {
      "click": _vm.toCustomer
    }
  }, [_c('i-grid-icon', {
    attrs: {
      "mpcomid": '19'
    }
  }, [_c('image', {
    staticStyle: {
      "width": "20px",
      "height": "20px"
    },
    attrs: {
      "src": "../../static/images/customer.png"
    }
  })]), _vm._v(" "), _c('i-grid-label', {
    attrs: {
      "mpcomid": '20'
    }
  }, [_vm._v("客户")])], 1), _vm._v(" "), _c('i-grid-item', {
    attrs: {
      "eventid": '6',
      "mpcomid": '24'
    },
    on: {
      "click": _vm.toCustomerPool
    }
  }, [_c('i-grid-icon', {
    attrs: {
      "mpcomid": '22'
    }
  }, [_c('image', {
    staticStyle: {
      "width": "20px",
      "height": "20px"
    },
    attrs: {
      "src": "../../static/images/customerPool.png"
    }
  })]), _vm._v(" "), _c('i-grid-label', {
    attrs: {
      "mpcomid": '23'
    }
  }, [_vm._v("客户池")])], 1), _vm._v(" "), _c('i-grid-item', {
    attrs: {
      "eventid": '7',
      "mpcomid": '27'
    },
    on: {
      "click": _vm.toContact
    }
  }, [_c('i-grid-icon', {
    attrs: {
      "mpcomid": '25'
    }
  }, [_c('image', {
    staticStyle: {
      "width": "20px",
      "height": "20px"
    },
    attrs: {
      "src": "../../static/images/contact.png"
    }
  })]), _vm._v(" "), _c('i-grid-label', {
    attrs: {
      "mpcomid": '26'
    }
  }, [_vm._v("联系人")])], 1), _vm._v(" "), _c('i-grid-item', {
    attrs: {
      "eventid": '8',
      "mpcomid": '30'
    },
    on: {
      "click": _vm.toOpportunity
    }
  }, [_c('i-grid-icon', {
    attrs: {
      "mpcomid": '28'
    }
  }, [_c('image', {
    staticStyle: {
      "width": "20px",
      "height": "20px"
    },
    attrs: {
      "src": "../../static/images/opportunity.png"
    }
  })]), _vm._v(" "), _c('i-grid-label', {
    attrs: {
      "mpcomid": '29'
    }
  }, [_vm._v("商机")])], 1), _vm._v(" "), _c('i-grid-item', {
    attrs: {
      "eventid": '9',
      "mpcomid": '33'
    },
    on: {
      "click": _vm.toAgreement
    }
  }, [_c('i-grid-icon', {
    attrs: {
      "mpcomid": '31'
    }
  }, [_c('image', {
    staticStyle: {
      "width": "20px",
      "height": "20px"
    },
    attrs: {
      "src": "../../static/images/agreement.png"
    }
  })]), _vm._v(" "), _c('i-grid-label', {
    attrs: {
      "mpcomid": '32'
    }
  }, [_vm._v("合同")])], 1), _vm._v(" "), _c('i-grid-item', {
    attrs: {
      "eventid": '10',
      "mpcomid": '36'
    },
    on: {
      "click": _vm.toPayCollection
    }
  }, [_c('i-grid-icon', {
    attrs: {
      "mpcomid": '34'
    }
  }, [_c('image', {
    staticStyle: {
      "width": "20px",
      "height": "20px"
    },
    attrs: {
      "src": "../../static/images/payCollection.png"
    }
  })]), _vm._v(" "), _c('i-grid-label', {
    attrs: {
      "mpcomid": '35'
    }
  }, [_vm._v("应收回款")])], 1)], 1)], 1), _vm._v(" "), _c('i-panel', {
    staticClass: "small_panel",
    attrs: {
      "title": "办公",
      "mpcomid": '39'
    }
  }), _vm._v(" "), _c('i-grid', {
    attrs: {
      "i-class": "module_view",
      "mpcomid": '50'
    }
  }, [_c('i-row', {
    attrs: {
      "mpcomid": '49'
    }
  }, [_c('i-grid-item', {
    attrs: {
      "eventid": '11',
      "mpcomid": '42'
    },
    on: {
      "click": _vm.toOutwork
    }
  }, [_c('i-grid-icon', {
    attrs: {
      "mpcomid": '40'
    }
  }, [_c('image', {
    staticStyle: {
      "width": "20px",
      "height": "20px"
    },
    attrs: {
      "src": "../../static/images/outwork.png"
    }
  })]), _vm._v(" "), _c('i-grid-label', {
    attrs: {
      "mpcomid": '41'
    }
  }, [_vm._v("外勤")])], 1), _vm._v(" "), _c('i-grid-item', {
    attrs: {
      "eventid": '12',
      "mpcomid": '45'
    },
    on: {
      "click": _vm.toTask
    }
  }, [_c('i-grid-icon', {
    attrs: {
      "mpcomid": '43'
    }
  }, [_c('image', {
    staticStyle: {
      "width": "20px",
      "height": "20px"
    },
    attrs: {
      "src": "../../static/images/task.png"
    }
  })]), _vm._v(" "), _c('i-grid-label', {
    attrs: {
      "mpcomid": '44'
    }
  }, [_vm._v("任务")])], 1), _vm._v(" "), _c('i-grid-item', {
    attrs: {
      "eventid": '13',
      "mpcomid": '48'
    },
    on: {
      "click": _vm.toNote
    }
  }, [_c('i-grid-icon', {
    attrs: {
      "mpcomid": '46'
    }
  }, [_c('image', {
    staticStyle: {
      "width": "20px",
      "height": "20px"
    },
    attrs: {
      "src": "../../static/images/note.png"
    }
  })]), _vm._v(" "), _c('i-grid-label', {
    attrs: {
      "mpcomid": '47'
    }
  }, [_vm._v("便签")])], 1)], 1)], 1)], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-619bc6d4", esExports)
  }
}

/***/ })

},[164]);