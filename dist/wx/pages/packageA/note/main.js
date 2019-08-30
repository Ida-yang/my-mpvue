require("../../../common/manifest.js")
require("../../../common/vendor.js")
global.webpackJsonpMpvue([28],{

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_1e448118_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(288);
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_1e448118_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\packageA\\note\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1e448118", Component.options)
  } else {
    hotAPI.reload("data-v-1e448118", Component.options)
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

            optionIndex: '0',
            optionArray: ['个人便签']
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

                    _this.loadData();
                }
            });
        },
        loadData: function loadData() {
            var _this = this;
            var data = {
                pId: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.pId,
                parentid: this.searchList.typeid,
                name: this.searchList.searchName
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

                    info.forEach(function (el) {
                        var starIndex = el.name.indexOf('<p>');
                        var endIndex = el.name.indexOf('</p>');
                        var title = el.name.slice(starIndex, endIndex);

                        var reg = new RegExp('[\u4E00-\u9FA5]+$', 'g');
                        var str = title;
                        var values = str.match(/[\u4e00-\u9fa5]/g);
                        if (values) {
                            str = str.match(/[\u4e00-\u9fa5]/g).join("");
                        } else {
                            str = str.replace(/[0-9]/g, '');
                            str = str.replace('</p>', '');
                            str = str.replace('<p>', '');
                            str = str.replace('.', '');
                        }

                        el.title = str;
                    });
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
        toAddNote: function toAddNote() {
            var url = 'noteAdd/main';
            global.mpvue.navigateTo({ url: url });
        },
        toUpdateNote: function toUpdateNote(e, val) {
            var url = 'noteUpdate/main';
            __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.noteupdateData = val;
            global.mpvue.navigateTo({ url: url });
        },
        todeleteNote: function todeleteNote(e, val) {
            var _this = this;
            var data = {
                id: val.id,
                pId: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.pId
            };

            wx.request({
                method: 'post',
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'noteType/deleteNoteTypeById.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    if (res.data.code && res.data.code == "200") {
                        Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Message"])({
                            content: '删除成功',
                            type: 'success'
                        });
                        _this.loadData();
                    } else {
                        Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Message"])({
                            content: res.data.msg,
                            type: 'error'
                        });
                    }
                }
            });
        }
    }
});

/***/ }),

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "note_wrap"
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
      "eventid": '6',
      "mpcomid": '6'
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
      "mpcomid": '4'
    }
  }, [_c('view', {
    staticClass: "query_view"
  }, _vm._l((_vm.typeList), function(item, index) {
    return _c('span', {
      key: item.id,
      staticClass: "queryBtn",
      class: [index == _vm.typeActive ? 'isActive' : ''],
      attrs: {
        "eventid": '4_' + index
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
      "eventid": '5',
      "mpcomid": '5'
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
        "mpcomid": '9_' + index
      }
    }, [_c('view', {
      attrs: {
        "eventid": '7_' + index
      },
      on: {
        "click": function($event) {
          _vm.toUpdateNote($event, item)
        }
      },
      slot: "content"
    }, [_c('i-cell', {
      attrs: {
        "i-class": "cell_content",
        "title": item.title,
        "mpcomid": '7_' + index
      }
    }, [_c('view', {
      staticClass: "cell_footer"
    }, [_vm._v("\n                    " + _vm._s(item.createTime) + "\n                ")])])], 1), _vm._v(" "), _c('view', {
      staticClass: "i-swipeout-button",
      slot: "button"
    }, [_c('view', {
      staticClass: "i-swipeout-button-item",
      staticStyle: {
        "width": "60px",
        "background-color": "#f56c6c"
      },
      attrs: {
        "eventid": '8_' + index
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
        "mpcomid": '8_' + index
      }
    })], 1)])])
  }), _vm._v(" "), _c('i-button', {
    staticClass: "bottom_btn",
    attrs: {
      "type": "ghost",
      "long": true,
      "eventid": '9',
      "mpcomid": '10'
    },
    on: {
      "click": _vm.toAddNote
    }
  }, [_vm._v("新增")]), _vm._v(" "), _c('i-message', {
    attrs: {
      "id": "message",
      "mpcomid": '11'
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
     require("vue-hot-reload-api").rerender("data-v-1e448118", esExports)
  }
}

/***/ })

},[284]);