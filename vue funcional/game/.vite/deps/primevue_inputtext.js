import {
  BaseStyle,
  script
} from "./chunk-7UAON2CU.js";
import "./chunk-RMBKWYC3.js";
import {
  createElementBlock,
  mergeProps,
  openBlock
} from "./chunk-KESUWDAB.js";

// node_modules/primevue/inputtext/style/inputtextstyle.esm.js
var classes = {
  root: function root(_ref) {
    var instance = _ref.instance, props = _ref.props;
    return ["p-inputtext p-component", {
      "p-filled": instance.filled,
      "p-inputtext-sm": props.size === "small",
      "p-inputtext-lg": props.size === "large"
    }];
  }
};
var InputTextStyle = BaseStyle.extend({
  name: "inputtext",
  classes
});

// node_modules/primevue/inputtext/inputtext.esm.js
var script$1 = {
  name: "BaseInputText",
  "extends": script,
  props: {
    modelValue: null,
    size: {
      type: String,
      "default": null
    }
  },
  style: InputTextStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};
var script2 = {
  name: "InputText",
  "extends": script$1,
  emits: ["update:modelValue"],
  methods: {
    getPTOptions: function getPTOptions(key) {
      return this.ptm(key, {
        context: {
          filled: this.filled,
          disabled: this.$attrs.disabled || this.$attrs.disabled === ""
        }
      });
    },
    onInput: function onInput(event) {
      this.$emit("update:modelValue", event.target.value);
    }
  },
  computed: {
    filled: function filled() {
      return this.modelValue != null && this.modelValue.toString().length > 0;
    }
  }
};
var _hoisted_1 = ["value"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("input", mergeProps({
    "class": _ctx.cx("root"),
    value: _ctx.modelValue,
    onInput: _cache[0] || (_cache[0] = function() {
      return $options.onInput && $options.onInput.apply($options, arguments);
    })
  }, $options.getPTOptions("root"), {
    "data-pc-name": "inputtext"
  }), null, 16, _hoisted_1);
}
script2.render = render;
export {
  script2 as default
};
//# sourceMappingURL=primevue_inputtext.js.map
