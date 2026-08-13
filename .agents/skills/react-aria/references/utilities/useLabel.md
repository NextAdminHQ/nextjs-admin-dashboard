# useLabel

Provides the accessibility implementation for labels and their associated elements.
Labels provide context for user inputs.

## Example

The `useLabel` hook associates a label with a field. It automatically handles
creating an id for the field and associates the label with it.

```tsx
'use client';
import {useLabel} from 'react-aria/useLabel';

function ColorField(props) {
  let {labelProps, fieldProps} = useLabel(props);

  return (
    <>
      <label {...labelProps}>{props.label}</label>
      <select {...fieldProps}>
        <option>Indigo</option>
        <option>Maroon</option>
        <option>Chartreuse</option>
      </select>
    </>
  );
}

<ColorField label="Favorite color" />
```

By default, `useLabel` assumes that the label is a native HTML label element.
However, if you are labeling a non-native form element, be sure to use an
element other than a `<label>` and set the `labelElementType` prop appropriately.

See [useRadioGroup](RadioGroup/useRadioGroup.md#example) and [useTextField](TextField/useTextField.md#example)
for examples of how `useLabel` is used by components.

## API

<FunctionAPI
  function={docs.exports.useLabel}
  links={docs.links}
/>

### LabelAriaProps

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `aria-describedby` | `string | undefined` | — | Identifies the element (or elements) that describes the object. |
| `aria-details` | `string | undefined` | — | Identifies the element (or elements) that provide a detailed, extended description for the object. |
| `aria-label` | `string | undefined` | — | Defines a string value that labels the current element. |
| `aria-labelledby` | `string | undefined` | — | Identifies the element (or elements) that labels the current element. |
| `id` | `string | undefined` | — | The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). |
| `label` | `ReactNode` | — | The content to display as the label. |
| `labelElementType` | `ElementType | undefined` | 'label' | The HTML element used to render the label, e.g. 'label', or 'span'. |

### LabelAria

| Name | Type | Description |
|------|------|-------------|
| `fieldProps` \* | `AriaLabelingProps & DOMProps` | Props to apply to the field container element being labeled. |
| `labelProps` \* | `DOMAttributes<FocusableElement> | LabelHTMLAttributes<HTMLLabelElement>` | Props to apply to the label container element. |
