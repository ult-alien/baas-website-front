import { Autocomplete } from 'element-ui';
import config from '../config';

export default {
  name: config.prefix + 'Autocomplete',
  mixins: [Autocomplete],
  props: {
    valueKey: {
      type: String,
      default: 'value'
    },
    popperClass: String,
    placeholder: String,
    disabled: Boolean,
    name: String,
    size: String,
    value: String,
    autofocus: Boolean,
    fetchSuggestions: Function,
    triggerOnFocus: {
      type: Boolean,
      default: true
    },
    customItem: String,
    selectWhenUnmatched: {
      type: Boolean,
      default: false
    },
    label: String,
    debounce: {
      type: Number,
      default: 300
    },
    itemIndex: Number
  },
  methods: {
    select (item) {
      this.$emit('input', item[this.valueKey]);
      this.$emit('select', item, this.itemIndex);
      this.$nextTick(_ => {
        this.suggestions = [];
        this.highlightedIndex = -1;
      });
    }
  }
};
