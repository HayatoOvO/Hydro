import React from 'react';
import ReactDOM from 'react-dom';
import { assign } from 'lodash';
import DOMAttachedObject from 'vj/components/DOMAttachedObject';
import AutoComplete from '.';
import DomainSelectAutoCompleteFC from './components/DomainSelectAutoComplete';

const Component = React.forwardRef((props: { value: string, multi: boolean, onChange: (v: string) => void }, ref) => {
  const [value, setValue] = React.useState(props.value);
  return (
    <DomainSelectAutoCompleteFC
      ref={ref as any}
      height="34px"
      selectedKeys={value.split(',').map((i) => i.trim())}
      onChange={(v) => {
        setValue(v);
        props.onChange(v);
      }}
      multi={props.multi}
    />
  );
});

export default class DomainSelectAutoComplete extends AutoComplete {
  static DOMAttachKey = 'ucwDomainSelectAutoCompleteInstance';

  constructor($dom, options) {
    super($dom, {
      classes: 'domain-select',
      ...options,
    });
  }

  attach() {
    const value = this.$dom.val();
    ReactDOM.render(
      <Component
        ref={(ref) => { this.ref = ref; }}
        value={value}
        onChange={this.onChange}
        multi={this.options.multi}
      />,
      this.container,
    );
  }
}

assign(DomainSelectAutoComplete, DOMAttachedObject);
window.Hydro.components.DomainSelectAutoComplete = DomainSelectAutoComplete;
