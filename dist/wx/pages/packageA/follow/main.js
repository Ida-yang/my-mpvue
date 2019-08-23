require("../../../common/manifest.js")
require("../../../common/vendor.js")
global.webpackJsonpMpvue([29],{

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(284);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_5576cab3_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(287);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(285)
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_5576cab3_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\packageA\\follow\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5576cab3", Component.options)
  } else {
    hotAPI.reload("data-v-5576cab3", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 285:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 286:
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


/* harmony default export */ __webpack_exports__["a"] = ({
    data: function data() {
        return {
            init: true,
            noMore: false,
            followData: [],

            searchList: {
                searchName: '',
                type: '',
                example: '',
                keyType: '',
                page: 1,
                limit: 10
            },
            powerList: [{ label: '11', name: '全部' }, { label: '12', name: '我的' }, { label: '13', name: '本组' }, { label: '14', name: '本机构' }],
            powerActive: '1',
            modelList: [{ label: '1', name: '线索' }, { label: '2', name: '客户' }],
            modelActive: '-1',
            timeList: [{ label: '2', name: '昨天' }, { label: '1', name: '今天' }, { label: '3', name: '本周' }, { label: '4', name: '本月' }, { label: '5', name: '上月' }],
            timeActive: '-1',
            keyTypeList: [{ label: '1', name: '电话' }, { label: '2', name: 'QQ' }, { label: '3', name: '微信' }, { label: '4', name: '邮箱' }, { label: '5', name: '拜访' }],
            keyTypeActive: '-1',

            isValue: false,
            searchCriteria: false
        };
    },
    mounted: function mounted() {
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


    methods: {
        loadData: function loadData() {
            var _this = this;
            var data = {
                searchName: this.searchList.searchName,
                type: this.searchList.type,
                example: this.searchList.example,
                keyType: this.searchList.keyType,
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
                url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'selectFollowReportForm.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId, //接口地址
                data: data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].SESSIONID
                },
                success: function success(res) {
                    var info = res.data.map.success;
                    info.forEach(function (el) {
                        if (el.userImagName) {
                            el.portrait = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].sourcehost + 'upload/' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId + '/' + el.userImagName;
                        } else {
                            el.portrait = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].sourcehost + 'upload/staticImg/avatar.jpg';
                        }

                        if (el.imgName) {
                            el.followImg = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].sourcehost + 'upload/' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId + '/' + el.imgName;
                        } else {
                            el.followImg = '';
                        }
                        el.followContent = el.followContent.replace(/\n/g, '<br/>');
                        el.followContent = '<div>' + el.followContent + '</div>';
                    });
                    if (_this.init === true) {
                        _this.followData = info;
                        _this.init = false;
                        // console.log('我的第一次加载')
                        wx.stopPullDownRefresh();
                    } else {
                        _this.followData = _this.followData.concat(info);
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
            if (val === 1) {
                this.powerActive = index;
                this.searchList.powerid = item.label;
            } else if (val === 2) {
                this.modelActive = index;
                this.searchList.type = item.label;
            } else if (val === 3) {
                this.timeActive = index;
                this.searchList.example = item.label;
            } else if (val === 4) {
                this.keyTypeActive = index;
                this.searchList.keyType = item.name;
            }
            this.search();
        },
        reSet: function reSet() {
            this.searchList = {
                searchName: '',
                type: '',
                example: '',
                keyType: '',
                page: 1,
                limit: 10
            };
            this.modelActive = '-1';
            this.powerActive = '1';
            this.timeActive = '-1';
            this.keyTypeActive = '-1';
            this.init = true;
            this.noMore = false;
            this.loadData();
        },
        toFollowDetail: function toFollowDetail(e, val) {
            var url = 'followDetail/main';
            __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].information.followDetailData = val;
            global.mpvue.navigateTo({ url: url });
        }
    }
});

/***/ }),

/***/ 287:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('view', {
    staticClass: "follow_wrap"
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
      "eventid": '9',
      "mpcomid": '9'
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
          _vm.checkCriteria(item, index, 1)
        }
      }
    }, [_vm._v(_vm._s(item.name))])
  }))]), _vm._v(" "), _c('i-panel', {
    attrs: {
      "title": "模块",
      "i-class": "query_label",
      "mpcomid": '5'
    }
  }, [_c('view', {
    staticClass: "query_view"
  }, _vm._l((_vm.modelList), function(item, index) {
    return _c('span', {
      key: item.label,
      staticClass: "queryBtn",
      class: [index == _vm.modelActive ? 'isActive' : ''],
      attrs: {
        "eventid": '5_' + index
      },
      on: {
        "click": function($event) {
          _vm.checkCriteria(item, index, 2)
        }
      }
    }, [_vm._v(_vm._s(item.name))])
  }))]), _vm._v(" "), _c('i-panel', {
    attrs: {
      "title": "跟进时间",
      "i-class": "query_label",
      "mpcomid": '6'
    }
  }, [_c('view', {
    staticClass: "query_view"
  }, _vm._l((_vm.timeList), function(item, index) {
    return _c('span', {
      key: item.label,
      staticClass: "queryBtn",
      class: [index == _vm.timeActive ? 'isActive' : ''],
      attrs: {
        "eventid": '6_' + index
      },
      on: {
        "click": function($event) {
          _vm.checkCriteria(item, index, 3)
        }
      }
    }, [_vm._v(_vm._s(item.name))])
  }))]), _vm._v(" "), _c('i-panel', {
    attrs: {
      "title": "跟进类型",
      "i-class": "query_label",
      "mpcomid": '7'
    }
  }, [_c('view', {
    staticClass: "query_view"
  }, _vm._l((_vm.keyTypeList), function(item, index) {
    return _c('span', {
      key: item.label,
      staticClass: "queryBtn",
      class: [index == _vm.keyTypeActive ? 'isActive' : ''],
      attrs: {
        "eventid": '7_' + index
      },
      on: {
        "click": function($event) {
          _vm.checkCriteria(item, index, 4)
        }
      }
    }, [_vm._v(_vm._s(item.name))])
  }))]), _vm._v(" "), _c('i-button', {
    staticClass: "reset_btn",
    attrs: {
      "type": "ghost",
      "size": "small",
      "long": "true",
      "eventid": '8',
      "mpcomid": '8'
    },
    on: {
      "click": _vm.reSet
    }
  }, [_vm._v("重置")])], 1)]), _vm._v(" "), _vm._l((_vm.followData), function(item, index) {
    return _c('view', {
      key: item.id
    }, [_c('i-panel', {
      attrs: {
        "title": item.createTime,
        "i-class": "vice_panel",
        "mpcomid": '10_' + index
      }
    }), _vm._v(" "), _c('i-fiche', {
      attrs: {
        "full": "",
        "isContent": "",
        "isFooter": "",
        "title": item.contacts[0].name,
        "extra": item.state,
        "thumb": item.portrait,
        "eventid": '10_' + index,
        "mpcomid": '12_' + index
      },
      on: {
        "click": function($event) {
          _vm.toFollowDetail($event, item)
        }
      }
    }, [_c('view', {
      slot: "content"
    }, [_c('rich-text', {
      attrs: {
        "nodes": item.followContent,
        "mpcomid": '11_' + index
      }
    })], 1), _vm._v(" "), _c('view', {
      slot: "footer"
    }, [_c('p', {
      staticClass: "follow_cus_p"
    }, [_vm._v(_vm._s(item.poolname))]), _vm._v(" "), _c('span', {
      staticClass: "bgc_span"
    }, [_vm._v(_vm._s(item.followType))]), _vm._v(" "), (item.contactTime) ? _c('span', [_vm._v("    ")]) : _vm._e(), _vm._v(" "), (item.contactTime) ? _c('span', {
      staticClass: "bgc_span"
    }, [_vm._v(_vm._s(item.contactTime))]) : _vm._e(), _vm._v("\n                    \n                "), _c('span', [_vm._v(_vm._s(item.inputType))]), _vm._v(" "), _c('br'), _vm._v(" "), (item.followImg) ? _c('image', {
      staticClass: "follow_image",
      attrs: {
        "mode": "scaleToFill",
        "src": item.followImg
      }
    }) : _vm._e()], 1)])], 1)
  }), _vm._v(" "), (_vm.noMore) ? _c('i-load-more', {
    attrs: {
      "tip": "我是有底线的",
      "loading": false,
      "mpcomid": '13'
    }
  }) : _vm._e()], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5576cab3", esExports)
  }
}

/***/ })

},[283]);