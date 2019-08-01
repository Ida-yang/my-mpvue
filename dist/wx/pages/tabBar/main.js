require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([6],{

/***/ 289:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(290);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 290:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_d483bbb4_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(293);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(291)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-d483bbb4"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_d483bbb4_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
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

/***/ 291:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 292:
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
            current: 'homepage',
            showRight: false,
            page: 1,
            actionSheet1: false,
            actionSheet2: false,

            actions1: [{
                name: '选项1'
            }, {
                name: '选项2'
            }, {
                name: '去分享',
                icon: 'share',
                openType: 'share'
            }],
            actions2: [{
                name: '删除',
                color: '#f56c6c'
            }],

            modelvisible: false,

            date222: '2016-09-01',

            nodesText: '<ul style="color:red"><li>你好你好</li><li>世界</li></ul>'

        };
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
        handleWarning: function handleWarning() {
            Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Toast"])({
                content: '这是一个错误的提示',
                type: 'error'
            });
        },
        handleSuccess: function handleSuccess() {
            Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Message"])({
                content: '这是一条成功提醒',
                type: 'success'
            });
        },
        toggleRight: function toggleRight() {
            this.showRight = !this.showRight;
        },
        changePage: function changePage(val) {
            var type = val.target.type;
            if (type === 'next') {
                this.page = this.page + 1;
            } else if (type === 'prev') {
                this.page = this.page - 1;
            }
        },
        onShareAppMessage: function onShareAppMessage() {
            return {
                title: 'iView Weapp',
                imageUrl: 'https://file.iviewui.com/iview-weapp-logo.png'
            };
        },
        handleOpen1: function handleOpen1() {
            this.actionSheet1 = true;
        },
        handleCancel1: function handleCancel1() {
            this.actionSheet1 = false;
        },
        handleOpen2: function handleOpen2() {
            this.actionSheet2 = true;
        },
        handleCancel2: function handleCancel2() {
            this.actionSheet2 = false;
        },
        handleClickItem1: function handleClickItem1(e) {
            var index = e.target.index + 1;

            Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Message"])({
                content: '点击了选项' + index
            });
        },
        handleClickItem2: function handleClickItem2(e) {
            var _this = this;

            var action = this.actions2;
            action[0].loading = true;

            this.actions2 = action;

            setTimeout(function () {
                action[0].loading = false;
                _this.actionSheet2 = false, _this.actions2 = action;
                Object(__WEBPACK_IMPORTED_MODULE_1__dist_wx_iview_base_index__["$Message"])({
                    content: '删除成功！',
                    type: 'success'
                });
            }, 2000);
        },
        openModel: function openModel() {
            this.modelvisible = true;
        },
        closeModel: function closeModel() {
            this.modelvisible = false;
        },
        clickdatepicker: function clickdatepicker() {},
        DateChange: function DateChange(e) {
            console.log('picker发送选择改变，携带值为', e.detail.value);
            this.date222 = e.detail.value;
        },
        uploadIMG: function uploadIMG() {
            wx.chooseImage({
                count: 1,
                success: function success(res) {
                    //         // tempFilePath可以作为img标签的src属性显示图片
                    var tempFilePaths = res.tempFilePaths;
                    // console.log(tempFilePaths)
                    wx.uploadFile({
                        url: __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].defaulthost + 'goods/masterGraph.do?cId=' + __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].userData.cId,
                        filePath: tempFilePaths[0],
                        name: 'file',
                        success: function success(res) {
                            // var data = JSON.parse(res)　　//坑2：与wx.request不同，wx.uploadFile返回的是[字符串]，需要自己转为JSON格式
                            console.log(res);
                        }
                    });
                }
            });
        }
    }
});

/***/ }),

/***/ 293:
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
  })], 1), _vm._v(" "), _c('i-progress', {
    attrs: {
      "percent": "60",
      "circle": "",
      "mpcomid": '7'
    }
  }), _vm._v(" "), _c('i-steps', {
    attrs: {
      "direction": "vertical",
      "mpcomid": '11'
    }
  }, [_c('i-step', {
    attrs: {
      "status": "finish",
      "icon": "barrage",
      "mpcomid": '8'
    }
  }, [_c('view', {
    slot: "title"
  }, [_vm._v("\n                已完成\n            ")]), _vm._v(" "), _c('view', {
    slot: "content"
  }, [_vm._v("\n                这里是该步骤的描述信息\n            ")])]), _vm._v(" "), _c('i-step', {
    attrs: {
      "status": "process",
      "icon": "brush",
      "mpcomid": '9'
    }
  }, [_c('view', {
    slot: "title"
  }, [_vm._v("\n                进行中\n            ")]), _vm._v(" "), _c('view', {
    attrs: {
      "icon": "camera"
    },
    slot: "content"
  }, [_vm._v("\n                这里是该步骤的描述信息\n            ")])]), _vm._v(" "), _c('i-step', {
    attrs: {
      "status": "error",
      "icon": "collection",
      "mpcomid": '10'
    }
  }, [_c('view', {
    slot: "title"
  }, [_vm._v("\n                错误\n            ")]), _vm._v(" "), _c('view', {
    slot: "content"
  }, [_vm._v("\n                这里是该步骤的描述信息\n            ")])])], 1), _vm._v(" "), _c('div', {
    staticStyle: {
      "margin-top": "100px"
    }
  }), _vm._v(" "), _c('i-input', {
    attrs: {
      "title": "备注",
      "right": "",
      "type": "textarea",
      "maxlength": "200",
      "eventid": '1',
      "mpcomid": '12'
    },
    on: {
      "input": function($event) {
        _vm.handleInput()
      }
    },
    model: {
      value: (_vm.addList.opportunity_remarks),
      callback: function($$v) {
        _vm.addList.opportunity_remarks = $$v
      },
      expression: "addList.opportunity_remarks"
    }
  }), _vm._v(" "), _c('rich-text', {
    attrs: {
      "nodes": _vm.nodesText,
      "mpcomid": '13'
    }
  }), _vm._v(" "), _c('i-card', {
    attrs: {
      "title": "卡片标题",
      "mpcomid": '14'
    }
  }, [_c('view', {
    slot: "content"
  }, [_vm._v("内容不错")]), _vm._v(" "), _c('view', {
    slot: "footer"
  }, [_vm._v("尾部内容")])]), _vm._v(" "), _c('i-button', {
    attrs: {
      "type": "ghost",
      "eventid": '2',
      "mpcomid": '15'
    },
    on: {
      "click": _vm.handleWarning
    }
  }, [_vm._v("错误")]), _vm._v(" "), _c('i-toast', {
    attrs: {
      "id": "toast",
      "mpcomid": '16'
    }
  }), _vm._v(" "), _c('i-button', {
    attrs: {
      "type": "ghost",
      "eventid": '3',
      "mpcomid": '17'
    },
    on: {
      "click": _vm.handleSuccess
    }
  }, [_vm._v("成功提醒")]), _vm._v(" "), _c('i-message', {
    attrs: {
      "id": "message",
      "mpcomid": '18'
    }
  }), _vm._v(" "), _c('i-button', {
    attrs: {
      "type": "ghost",
      "eventid": '4',
      "mpcomid": '19'
    },
    on: {
      "click": _vm.toggleRight
    }
  }, [_vm._v("右边弹出")]), _vm._v(" "), _c('i-drawer', {
    attrs: {
      "mode": "right",
      "visible": _vm.showRight,
      "eventid": '5',
      "mpcomid": '20'
    },
    on: {
      "close": _vm.toggleRight
    }
  }, [_c('view', {
    staticClass: "demo-container"
  }, [_vm._v("\n            单击遮罩层关闭\n        ")])]), _vm._v(" "), _c('i-page', {
    attrs: {
      "current": _vm.page,
      "total": "5",
      "eventid": '6',
      "mpcomid": '21'
    },
    on: {
      "change": _vm.changePage
    }
  }, [_c('view', {
    slot: "prev"
  }, [_vm._v("Prev")]), _vm._v(" "), _c('view', {
    slot: "next"
  }, [_vm._v("Next")])]), _vm._v(" "), _c('view', [_c('i-button', {
    attrs: {
      "type": "ghost",
      "eventid": '7',
      "mpcomid": '22'
    },
    on: {
      "click": _vm.handleOpen1
    }
  }, [_vm._v("一般用法")]), _vm._v(" "), _c('i-button', {
    attrs: {
      "type": "ghost",
      "eventid": '8',
      "mpcomid": '23'
    },
    on: {
      "click": _vm.handleOpen2
    }
  }, [_vm._v("带有提示、异步")])], 1), _vm._v(" "), _c('i-action-sheet', {
    attrs: {
      "visible": _vm.actionSheet1,
      "actions": _vm.actions1,
      "show-cancel": "",
      "eventid": '9',
      "mpcomid": '24'
    },
    on: {
      "cancel": _vm.handleCancel1,
      "change": _vm.handleClickItem1
    }
  }), _vm._v(" "), _c('i-action-sheet', {
    attrs: {
      "visible": _vm.actionSheet2,
      "actions": _vm.actions2,
      "show-cancel": "",
      "mask-closable": false,
      "eventid": '10',
      "mpcomid": '25'
    },
    on: {
      "cancel": _vm.handleCancel2,
      "change": _vm.handleClickItem2
    }
  }, [_c('view', {
    staticStyle: {
      "padding": "16px"
    },
    slot: "header"
  }, [_c('view', {
    staticStyle: {
      "color": "#444",
      "font-size": "16px"
    }
  }, [_vm._v("确定吗？")]), _vm._v(" "), _c('text', [_vm._v("删除后无法恢复哦")])])]), _vm._v(" "), _c('i-button', {
    attrs: {
      "type": "ghost",
      "eventid": '11',
      "mpcomid": '26'
    },
    on: {
      "click": _vm.openModel
    }
  }, [_vm._v("普通对话框")]), _vm._v(" "), _c('i-modal', {
    attrs: {
      "title": "标题",
      "visible": _vm.modelvisible,
      "eventid": '12',
      "mpcomid": '27'
    },
    on: {
      "ok": _vm.closeModel,
      "cancel": _vm.closeModel
    }
  }, [_c('view', [_vm._v("一些文本")]), _vm._v(" "), _c('view', [_vm._v("一些文本")]), _vm._v(" "), _c('view', [_vm._v("一些文本")]), _vm._v(" "), _c('view', [_vm._v("一些文本")]), _vm._v(" "), _c('view', [_vm._v("一些文本")]), _vm._v(" "), _c('view', [_vm._v("一些文本")]), _vm._v(" "), _c('view', [_vm._v("一些文本")]), _vm._v(" "), _c('view', [_vm._v("一些文本")]), _vm._v(" "), _c('view', [_vm._v("一些文本")])]), _vm._v(" "), _c('i-button', {
    attrs: {
      "type": "warning",
      "eventid": '13',
      "mpcomid": '28'
    },
    on: {
      "click": _vm.uploadIMG
    }
  }, [_vm._v("上传图片")]), _vm._v(" "), _c('i-cell', {
    attrs: {
      "title": "只显示箭头",
      "is-link": "",
      "i-class": "index_cell",
      "mpcomid": '30'
    }
  }, [_c('i-datetime-picker', {
    staticClass: "index_picker",
    attrs: {
      "mpcomid": '29'
    }
  })], 1), _vm._v(" "), _c('view', {
    staticClass: "section"
  }, [_c('view', {
    staticClass: "section__title"
  }, [_vm._v("日期选择器")]), _vm._v(" "), _c('picker', {
    attrs: {
      "mode": "date",
      "value": _vm.date222,
      "start": "2015-09-01",
      "end": "2017-09-01",
      "eventid": '14'
    },
    on: {
      "change": _vm.DateChange
    }
  }, [_c('view', {
    staticClass: "picker"
  }, [_vm._v("\n                当前选择: " + _vm._s(_vm.date222) + "\n            ")])])], 1), _vm._v(" "), _c('i-button', {
    attrs: {
      "type": "success",
      "eventid": '15',
      "mpcomid": '31'
    },
    on: {
      "click": _vm.bindViewTap
    }
  }, [_vm._v("进入小程序")])], 1)
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

},[289]);