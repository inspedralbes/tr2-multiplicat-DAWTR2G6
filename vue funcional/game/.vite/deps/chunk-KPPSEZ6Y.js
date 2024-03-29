import {
  BaseStyle,
  script
} from "./chunk-7UAON2CU.js";
import {
  ObjectUtils
} from "./chunk-RMBKWYC3.js";

// node_modules/primevue/baseicon/style/baseiconstyle.esm.js
var css = "\n.p-icon {\n    display: inline-block;\n}\n\n.p-icon-spin {\n    -webkit-animation: p-icon-spin 2s infinite linear;\n    animation: p-icon-spin 2s infinite linear;\n}\n\n@-webkit-keyframes p-icon-spin {\n    0% {\n        -webkit-transform: rotate(0deg);\n        transform: rotate(0deg);\n    }\n    100% {\n        -webkit-transform: rotate(359deg);\n        transform: rotate(359deg);\n    }\n}\n\n@keyframes p-icon-spin {\n    0% {\n        -webkit-transform: rotate(0deg);\n        transform: rotate(0deg);\n    }\n    100% {\n        -webkit-transform: rotate(359deg);\n        transform: rotate(359deg);\n    }\n}\n";
var BaseIconStyle = BaseStyle.extend({
  name: "baseicon",
  css
});

// node_modules/primevue/baseicon/baseicon.esm.js
var script2 = {
  name: "BaseIcon",
  "extends": script,
  props: {
    label: {
      type: String,
      "default": void 0
    },
    spin: {
      type: Boolean,
      "default": false
    }
  },
  style: BaseIconStyle,
  beforeMount: function beforeMount() {
    var _this$$config;
    BaseIconStyle.loadStyle({
      nonce: (_this$$config = this.$config) === null || _this$$config === void 0 || (_this$$config = _this$$config.csp) === null || _this$$config === void 0 ? void 0 : _this$$config.nonce
    });
  },
  methods: {
    pti: function pti() {
      var isLabelEmpty = ObjectUtils.isEmpty(this.label);
      return {
        "class": ["p-icon", {
          "p-icon-spin": this.spin
        }],
        role: !isLabelEmpty ? "img" : void 0,
        "aria-label": !isLabelEmpty ? this.label : void 0,
        "aria-hidden": isLabelEmpty
      };
    }
  },
  computed: {
    $config: function $config() {
      var _this$$primevue;
      return (_this$$primevue = this.$primevue) === null || _this$$primevue === void 0 ? void 0 : _this$$primevue.config;
    }
  }
};

export {
  script2 as script
};
//# sourceMappingURL=chunk-KPPSEZ6Y.js.map
