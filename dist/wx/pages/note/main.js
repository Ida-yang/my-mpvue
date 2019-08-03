require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([25],{

/***/ 239:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(240);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 240:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_22785fcc_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(243);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(241)
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_22785fcc_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\note\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-22785fcc", Component.options)
  } else {
    hotAPI.reload("data-v-22785fcc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 241:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 242:
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



/* harmony default export */ __webpack_exports__["a"] = ({
    data: function data() {
        return {
            current: '便签',

            tableData: [],

            searchList: {
                searchName: '',
                typeid: ''
            },
            typeList: [],
            typeActive: '-1',

            isValue: false,
            searchCriteria: false,

            multiIndex: [0, 0],
            multiArray: [['个人便签', '公司公告'], []]
        };
    },
    onShow: function onShow() {
        this.getSearchList();
    },

    // 下拉刷新
    onPullDownRefresh: function onPullDownRefresh() {
        this.getSearchList();
    },


    methods: {
        getSearchList: function getSearchList() {
            var _this = this;
            var data = {
                pId: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.pId
            };

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'noteType/getNote.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    var info = res.data;
                    _this.typeList = info;

                    var itemArr = [];
                    info.forEach(function (el) {
                        itemArr.push(el.name);
                    });

                    _this.multiArray[1] = itemArr;

                    _this.loadData();
                }
            });
        },
        loadData: function loadData() {
            var _this = this;
            var data = {
                pId: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.pId,
                parentid: this.searchList.typeid
            };
            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'noteType/getNoteTypeByParentId.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    var info = res.data;
                    _this.tableData = info;
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
            this.loadData();
        },
        queryCriteria: function queryCriteria() {
            this.searchCriteria = !this.searchCriteria;
        },
        checkCriteria: function checkCriteria(item, index, val) {
            if (val === 1) {
                this.typeActive = index;
                this.searchList.typeid = item.id;
            }
            this.search();
        },
        reSet: function reSet() {
            this.searchList = {
                searchName: '',
                typeid: ''
            };
            this.typeActive = '-1';
            this.loadData();
        },
        changeType: function changeType(e) {
            console.log(e);
            this.multiIndex = e.target.value;
        },
        columnChange: function columnChange(e) {
            // console.log('修改的列为', e.mp.detail.column, '，值为', e.mp.detail.value);
            var _this = this;
            var column = e.mp.detail.column;
            var value = e.mp.detail.value;
            // var data = {
            //     multiArray: this.multiArray,
            //     multiIndex: this.multiIndex
            // };
            this.multiIndex[column] = value;
            switch (column) {
                case 0:
                    switch (_this.multiIndex[0]) {
                        case 0:
                            console.log(_this.multiArray[1]);
                            _this.multiArray[1] = ['爬行动物', '爬行动物', '爬行动物'];
                            break;
                        case 1:
                            console.log(_this.multiArray[1]);
                            _this.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
                            break;
                    }
                    _this.multiIndex[1] = 0;
                    break;
                case 1:
                    console.log(_this.multiArray[1]);
                    break;
            }
            // this.multiArray = data.multiArray
            // this.multiIndex = data.multiIndex
        },
        toAddNote: function toAddNote() {
            var url = 'noteAdd/main';
            __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.noteaddData = {};
            global.mpvue.navigateTo({ url: url });
        },
        todeleteNote: function todeleteNote(e, val) {
            console.log(e, val);
        }
    }
});

/***/ }),

/***/ 243:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "note_wrap"
  }, [_c('view', {
    staticClass: "search_view"
  }, [_c('i-icon', {
    staticClass: "search_icon",
    attrs: {
      "type": "other",
      "size": "18",
      "color": "#80848f",
      "eventid": '0',
      "mpcomid": '0'
    },
    on: {
      "click": _vm.queryCriteria
    }
  })], 1), _vm._v(" "), _c('i-drawer', {
    attrs: {
      "mode": "right",
      "visible": _vm.searchCriteria,
      "eventid": '3',
      "mpcomid": '3'
    },
    on: {
      "close": _vm.queryCriteria
    }
  }, [_c('view', {
    staticClass: "search_container"
  }, [_c('i-panel', {
    attrs: {
      "title": "个人便签",
      "i-class": "query_label",
      "mpcomid": '1'
    }
  }, [_c('view', {
    staticClass: "query_view"
  }, _vm._l((_vm.typeList), function(item, index) {
    return _c('span', {
      key: item.id,
      staticClass: "queryBtn",
      class: [index == _vm.typeActive ? 'isActive' : ''],
      attrs: {
        "eventid": '1_' + index
      },
      on: {
        "click": function($event) {
          _vm.checkCriteria(item, index, 1)
        }
      }
    }, [_vm._v(_vm._s(item.name))])
  }))]), _vm._v(" "), _c('i-button', {
    staticClass: "reset_btn",
    attrs: {
      "type": "ghost",
      "size": "small",
      "long": "true",
      "eventid": '2',
      "mpcomid": '2'
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
        "mpcomid": '7_' + index
      }
    }, [_c('view', {
      slot: "content"
    }, [_c('i-cell', {
      attrs: {
        "i-class": "cell_content",
        "mpcomid": '5_' + index
      }
    }, [_c('rich-text', {
      attrs: {
        "nodes": item.name,
        "mpcomid": '4_' + index
      }
    }), _vm._v(" "), _c('view', {
      staticClass: "cell_footer"
    }, [_vm._v("\n                    创建时间：" + _vm._s(item.opportunity_deal) + "\n                ")])], 1)], 1), _vm._v(" "), _c('view', {
      staticClass: "i-swipeout-button",
      slot: "button"
    }, [_c('view', {
      staticClass: "i-swipeout-button-item",
      staticStyle: {
        "width": "60px",
        "background-color": "#f56c6c"
      },
      attrs: {
        "eventid": '4_' + index
      },
      on: {
        "click": function($event) {
          _vm.todeleteNote($event, item)
        }
      }
    }, [_c('i-icon', {
      staticStyle: {
        "color": "#fff"
      },
      attrs: {
        "size": "24",
        "type": "trash",
        "mpcomid": '6_' + index
      }
    })], 1)])])
  }), _vm._v(" "), _c('picker', {
    attrs: {
      "mode": "multiSelector",
      "value": _vm.multiIndex,
      "range": _vm.multiArray,
      "eventid": '5'
    },
    on: {
      "change": _vm.changeType,
      "columnchange": _vm.columnChange
    }
  }, [_c('view', {
    staticClass: "picker"
  }, [_c('i-button', {
    staticClass: "bottom_btn",
    attrs: {
      "type": "ghost",
      "long": true,
      "mpcomid": '8'
    }
  }, [_vm._v("新增")])], 1)])], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-22785fcc", esExports)
  }
}

/***/ })

},[239]);