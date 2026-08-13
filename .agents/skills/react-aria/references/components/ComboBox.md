# ComboBox

A combo box combines a text input with a listbox, allowing users to filter a list of options to
items matching a query.

## Vanilla CSS example

```tsx
import {ComboBox, ComboBoxItem} from 'vanilla-starter/ComboBox';

<ComboBox>
  <ComboBoxItem>Aardvark</ComboBoxItem>
  <ComboBoxItem>Cat</ComboBoxItem>
  <ComboBoxItem>Dog</ComboBoxItem>
  <ComboBoxItem>Kangaroo</ComboBoxItem>
  <ComboBoxItem>Panda</ComboBoxItem>
  <ComboBoxItem>Snake</ComboBoxItem>
</ComboBox>
```

### ComboBox.tsx

```tsx
'use client';
import {
  ComboBox as AriaComboBox,
  type ComboBoxProps as AriaComboBoxProps,
  ComboBoxValue,
  Input,
  type ListBoxItemProps,
  type ListBoxProps,
  type ValidationResult
} from 'react-aria-components/ComboBox';
import {Label, FieldError, FieldButton, Description} from './Form';
import {DropdownItem, DropdownListBox} from './ListBox';
import {Popover} from './Popover';
import {ChevronDown} from 'lucide-react';
import './ComboBox.css';

export interface ComboBoxProps<T, M extends 'single' | 'multiple'> extends Omit<
  AriaComboBoxProps<T, M>,
  'children'
> {
  label?: string;
  description?: string | null;
  errorMessage?: string | ((validation: ValidationResult) => string);
  children: React.ReactNode | ((item: T) => React.ReactNode);
  placeholder?: string;
}

export function ComboBox<T, M extends 'single' | 'multiple' = 'single'>({
  label,
  description,
  errorMessage,
  children,
  placeholder,
  ...props
}: ComboBoxProps<T, M>) {
  return (
    <AriaComboBox {...props}>
      <Label>{label}</Label>
      <div className="combobox-field">
        <Input className="react-aria-Input inset" placeholder={placeholder} />
        <FieldButton>
          <ChevronDown />
        </FieldButton>
      </div>
      {props.selectionMode === 'multiple' && <ComboBoxValue placeholder="No items selected" />}
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
      <Popover hideArrow className="combobox-popover">
        <ComboBoxListBox>{children}</ComboBoxListBox>
      </Popover>
    </AriaComboBox>
  );
}

export function ComboBoxListBox<T>(props: ListBoxProps<T>) {
  return <DropdownListBox {...props} />;
}

export function ComboBoxItem(props: ListBoxItemProps) {
  return <DropdownItem {...props} />;
}

```

### ComboBox.css

```css
@import './theme.css';
@import './TextField.css';

.react-aria-ComboBox {
  color: var(--text-color);
  width: calc(var(--spacing) * 50);

  .combobox-field {
    display: flex;
    align-items: center;
    height: var(--spacing-8);
    width: 100%;
  }

  .react-aria-Input {
    width: 100%;
    padding: 0 calc(var(--spacing-3) + var(--spacing-6)) 0 var(--spacing-3);
  }

  .react-aria-ComboBoxValue {
    margin-top: var(--spacing-1);
    font: var(--font-size-sm) system-ui;
    color: var(--text-color);
  }
}

.combobox-popover[data-trigger='ComboBox'] {
  width: var(--trigger-width);
  padding: 0;
}

```

## Tailwind example

```tsx
import {ComboBox, ComboBoxItem} from 'tailwind-starter/ComboBox';

<ComboBox>
  <ComboBoxItem>Aardvark</ComboBoxItem>
  <ComboBoxItem>Cat</ComboBoxItem>
  <ComboBoxItem>Dog</ComboBoxItem>
  <ComboBoxItem>Kangaroo</ComboBoxItem>
  <ComboBoxItem>Panda</ComboBoxItem>
  <ComboBoxItem>Snake</ComboBoxItem>
</ComboBox>
```

### ComboBox.tsx

```tsx
'use client';
import {ChevronDown} from 'lucide-react';
import React from 'react';
import {
  ComboBox as AriaComboBox,
  type ComboBoxProps as AriaComboBoxProps,
  ComboBoxValue,
  ListBox,
  type ListBoxItemProps,
  type ValidationResult
} from 'react-aria-components/ComboBox';
import {Description, FieldError, FieldGroup, Input, Label} from './Field';
import {DropdownItem, DropdownSection, type DropdownSectionProps} from './ListBox';
import {Popover} from './Popover';
import {composeTailwindRenderProps} from './utils';
import {FieldButton} from './FieldButton';

export interface ComboBoxProps<T, M extends 'single' | 'multiple'> extends Omit<
  AriaComboBoxProps<T, M>,
  'children'
> {
  label?: string;
  description?: string | null;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
  children: React.ReactNode | ((item: T) => React.ReactNode);
}

export function ComboBox<T, M extends 'single' | 'multiple' = 'single'>({
  label,
  description,
  errorMessage,
  children,
  items,
  ...props
}: ComboBoxProps<T, M>) {
  return (
    <AriaComboBox
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'group flex flex-col gap-1 font-sans'
      )}>
      <Label>{label}</Label>
      <FieldGroup>
        <Input className="ps-3 pe-1" />
        <FieldButton className="w-6 mr-1 outline-offset-0">
          <ChevronDown aria-hidden className="w-4 h-4" />
        </FieldButton>
      </FieldGroup>
      {props.selectionMode === 'multiple' && (
        <ComboBoxValue
          placeholder="No items selected"
          className="text-xs text-neutral-600 dark:text-neutral-300"
        />
      )}
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
      <Popover className="w-(--trigger-width)">
        <ListBox
          items={items}
          className="outline-0 p-1 box-border max-h-[inherit] overflow-auto [clip-path:inset(0_0_0_0_round_.75rem)]">
          {children}
        </ListBox>
      </Popover>
    </AriaComboBox>
  );
}

export function ComboBoxItem(props: ListBoxItemProps) {
  return <DropdownItem {...props} />;
}

export function ComboBoxSection<T>(props: DropdownSectionProps<T>) {
  return <DropdownSection {...props} />;
}

```

## Content

`ComboBox` reuses the `ListBox` component, following the [Collection Components API](collections.md?component=ComboBox). It supports ListBox features such as static and dynamic collections, sections, disabled items, links, text slots, asynchronous loading, etc. See the [ListBox docs](ListBox.md) for more details.

The following example shows a dynamic collection of items, grouped into sections.

```tsx
import {ComboBox, ComboBoxItem} from 'vanilla-starter/ComboBox';
import {ListBoxSection, Header} from 'vanilla-starter/ListBox';
import {Collection} from 'react-aria-components/Collection';

function Example() {
  /*- begin collapse -*/
  let options = [
    {name: 'Fruit', children: [
      {name: 'Apple'},
      {name: 'Banana'},
      {name: 'Orange'},
      {name: 'Honeydew'},
      {name: 'Grapes'},
      {name: 'Watermelon'},
      {name: 'Cantaloupe'},
      {name: 'Pear'}
    ]},
    {name: 'Vegetable', children: [
      {name: 'Cabbage'},
      {name: 'Broccoli'},
      {name: 'Carrots'},
      {name: 'Lettuce'},
      {name: 'Spinach'},
      {name: 'Bok Choy'},
      {name: 'Cauliflower'},
      {name: 'Potatoes'}
    ]}
  ];
  /*- end collapse -*/

  return (
    /*- begin highlight -*/
    <ComboBox
      label="Preferred fruit or vegetable"
      placeholder="Select an option"
      defaultItems={options}>
      {section => (
        <ListBoxSection id={section.name}>
          <Header>{section.name}</Header>
          <Collection items={section.children}>
            {item => <ComboBoxItem id={item.name}>{item.name}</ComboBoxItem>}
          </Collection>
        </ListBoxSection>
      )}
    </ComboBox>
    /*- end highlight -*/
  );
}
```

### TagGroup

Use the `ComboBoxValue` render prop function to display the selected items as a [TagGroup](TagGroup.md).

```tsx
import {ComboBox, ComboBoxValue, Input} from 'react-aria-components/ComboBox';
import {ComboBoxListBox, ComboBoxItem} from 'vanilla-starter/ComboBox';
import {Label, FieldButton} from 'vanilla-starter/Form';
import {Popover} from 'vanilla-starter/Popover';
import {Tag, TagGroup} from 'vanilla-starter/TagGroup';
import {ChevronDown} from 'lucide-react';

/*- begin collapse -*/
const states = [
  {id: 'AL', name: 'Alabama'},
  {id: 'AK', name: 'Alaska'},
  {id: 'AZ', name: 'Arizona'},
  {id: 'AR', name: 'Arkansas'},
  {id: 'CA', name: 'California'},
  {id: 'CO', name: 'Colorado'},
  {id: 'CT', name: 'Connecticut'},
  {id: 'DE', name: 'Delaware'},
  {id: 'DC', name: 'District of Columbia'},
  {id: 'FL', name: 'Florida'},
  {id: 'GA', name: 'Georgia'},
  {id: 'HI', name: 'Hawaii'},
  {id: 'ID', name: 'Idaho'},
  {id: 'IL', name: 'Illinois'},
  {id: 'IN', name: 'Indiana'},
  {id: 'IA', name: 'Iowa'},
  {id: 'KS', name: 'Kansas'},
  {id: 'KY', name: 'Kentucky'},
  {id: 'LA', name: 'Louisiana'},
  {id: 'ME', name: 'Maine'},
  {id: 'MD', name: 'Maryland'},
  {id: 'MA', name: 'Massachusetts'},
  {id: 'MI', name: 'Michigan'},
  {id: 'MN', name: 'Minnesota'},
  {id: 'MS', name: 'Mississippi'},
  {id: 'MO', name: 'Missouri'},
  {id: 'MT', name: 'Montana'},
  {id: 'NE', name: 'Nebraska'},
  {id: 'NV', name: 'Nevada'},
  {id: 'NH', name: 'New Hampshire'},
  {id: 'NJ', name: 'New Jersey'},
  {id: 'NM', name: 'New Mexico'},
  {id: 'NY', name: 'New York'},
  {id: 'NC', name: 'North Carolina'},
  {id: 'ND', name: 'North Dakota'},
  {id: 'OH', name: 'Ohio'},
  {id: 'OK', name: 'Oklahoma'},
  {id: 'OR', name: 'Oregon'},
  {id: 'PA', name: 'Pennsylvania'},
  {id: 'RI', name: 'Rhode Island'},
  {id: 'SC', name: 'South Carolina'},
  {id: 'SD', name: 'South Dakota'},
  {id: 'TN', name: 'Tennessee'},
  {id: 'TX', name: 'Texas'},
  {id: 'UT', name: 'Utah'},
  {id: 'VT', name: 'Vermont'},
  {id: 'VA', name: 'Virginia'},
  {id: 'WA', name: 'Washington'},
  {id: 'WV', name: 'West Virginia'},
  {id: 'WI', name: 'Wisconsin'},
  {id: 'WY', name: 'Wyoming'}
];
/*- end collapse -*/

<ComboBox selectionMode="multiple">
  <Label>States</Label>
  <div className="combobox-field">
    <Input className="react-aria-Input inset" placeholder="Select a state" />
    <FieldButton><ChevronDown /></FieldButton>
  </div>
  {/*- begin highlight -*/}
  <ComboBoxValue<typeof states[0]>>
    {({selectedItems, state}) => (
      <TagGroup
        aria-label="Selected states"
        style={{marginTop: 8}}
        items={selectedItems.filter(item => item != null)}
        renderEmptyState={() => 'No selected items'}
        onRemove={(keys) => {
          // Remove keys from ComboBox state.
          if (Array.isArray(state.value)) {
            state.setValue(state.value.filter(k => !keys.has(k)));
          }
        }}>
        {item => <Tag>{item.name}</Tag>}
      </TagGroup>
    )}
  </ComboBoxValue>
  {/*- end highlight -*/}
  <Popover hideArrow className="combobox-popover">
    <ComboBoxListBox items={states}>
      {state => <ComboBoxItem>{state.name}</ComboBoxItem>}
    </ComboBoxListBox>
  </Popover>
</ComboBox>
```

## Value

Use the `defaultValue` or `value` prop to set the selected item. The value corresponds to the `id` prop of an item. Items can be disabled with the `isDisabled` prop.

```tsx
import {ComboBox, ComboBoxItem} from 'vanilla-starter/ComboBox';
import {useState} from 'react';
import type {Key} from 'react-aria-components/ComboBox';

function Example() {
  let [animal, setAnimal] = useState<Key | null>("bison");

  return (
    <div>
      <ComboBox
        label="Favorite Animal"
        placeholder="Select an animal"
        /*- begin highlight -*/
        value={animal}
        onChange={setAnimal}>
        {/*- end highlight -*/}
        <ComboBoxItem id="koala">Koala</ComboBoxItem>
        <ComboBoxItem id="kangaroo">Kangaroo</ComboBoxItem>
        <ComboBoxItem id="platypus" isDisabled>Platypus</ComboBoxItem>
        <ComboBoxItem id="eagle">Bald Eagle</ComboBoxItem>
        <ComboBoxItem id="bison">Bison</ComboBoxItem>
        <ComboBoxItem id="skunk">Skunk</ComboBoxItem>
      </ComboBox>
      <p>Current selection: {animal}</p>
    </div>
  );
}
```

### Input value

Use the `inputValue` or `defaultInputValue` prop to set the value of the input field. By default, the value will be reverted to the selected item on blur. Set the `allowsCustomValue` prop to enable entering values that are not in the list.

```tsx
import {ComboBox, ComboBoxItem} from 'vanilla-starter/ComboBox';
import {useState} from 'react';

function Example(props) {
  let [value, setValue] = useState('Kangaroo');

  return (
    <div>
      <ComboBox
        {...props}
        label="Favorite Animal"
        placeholder="Select an animal"
        /*- begin highlight -*/
        
        inputValue={value}
        onInputChange={setValue}>
        {/*- end highlight -*/}
        <ComboBoxItem id="koala">Koala</ComboBoxItem>
        <ComboBoxItem id="kangaroo">Kangaroo</ComboBoxItem>
        <ComboBoxItem id="platypus">Platypus</ComboBoxItem>
        <ComboBoxItem id="eagle">Bald Eagle</ComboBoxItem>
        <ComboBoxItem id="bison">Bison</ComboBoxItem>
        <ComboBoxItem id="skunk">Skunk</ComboBoxItem>
      </ComboBox>
      <p>Current input value: {value}</p>
    </div>
  );
}
```

### Fully controlled

Both `inputValue` and `value` can be controlled simultaneously. However, each interaction will only trigger either `onInputChange` or `onChange`, not both. When controlling both props, you must update both values accordingly.

```tsx
import type {Key} from 'react-aria-components/ComboBox';
import {ComboBox, ComboBoxItem} from 'vanilla-starter/ComboBox';
import {useState} from 'react';

function ControlledComboBox() {
  /*- begin collapse -*/
  let options = [
    {id: 1, name: 'Aerospace'},
    {id: 2, name: 'Mechanical'},
    {id: 3, name: 'Civil'},
    {id: 4, name: 'Biomedical'},
    {id: 5, name: 'Nuclear'},
    {id: 6, name: 'Industrial'},
    {id: 7, name: 'Chemical'},
    {id: 8, name: 'Agricultural'},
    {id: 9, name: 'Electrical'}
  ];
  /*- end collapse -*/

  let [fieldState, setFieldState] = useState<{value: Key | null, inputValue: string}>({
    value: null,
    inputValue: ''
  });

  let onChange = (id: Key | null) => {
    // Update inputValue when value changes.
    setFieldState({
      inputValue: id == null ? '' : options.find(o => o.id === id)?.name ?? '',
      value: id
    });
  };

  let onInputChange = (value: string) => {
    // Reset value to null if the input is cleared.
    setFieldState(prevState => ({
      inputValue: value,
      value: value === '' ? null : prevState.value
    }));
  };

  return (
    <div>
      <ComboBox
        label="Engineering major"
        placeholder="Select a major"
        /*- begin highlight -*/
        defaultItems={options}
        value={fieldState.value}
        inputValue={fieldState.inputValue}
        onChange={onChange}
        onInputChange={onInputChange}>
        {/*- end highlight -*/}
        {item => <ComboBoxItem>{item.name}</ComboBoxItem>}
      </ComboBox>
      <pre style={{fontSize: 12}}>
        Current selected major id: {fieldState.value}{'\n'}
        Current input text: {fieldState.inputValue}
      </pre>
    </div>
  );
}
```

## Item actions

Use the `onAction` prop on a `<ListBoxItem>` to perform a custom action when the item is pressed. This example adds a "Create" action for the current input value.

```tsx
import {ComboBox, ComboBoxItem} from 'vanilla-starter/ComboBox';
import {useState} from 'react';

function Example() {
  let [inputValue, setInputValue] = useState('');

  return (
    <ComboBox
      label="Favorite Animal"
      placeholder="Select an animal"
      allowsEmptyCollection
      inputValue={inputValue}
      onInputChange={setInputValue}>
      {/*- begin highlight -*/}
      {inputValue.length > 0 && (
        <ComboBoxItem onAction={() => alert('Creating ' + inputValue)}>
          {`Create "${inputValue}"`}
        </ComboBoxItem>
      )}
      {/*- end highlight -*/}
      <ComboBoxItem>Aardvark</ComboBoxItem>
      <ComboBoxItem>Cat</ComboBoxItem>
      <ComboBoxItem>Dog</ComboBoxItem>
      <ComboBoxItem>Kangaroo</ComboBoxItem>
      <ComboBoxItem>Panda</ComboBoxItem>
      <ComboBoxItem>Snake</ComboBoxItem>
    </ComboBox>
  );
}
```

## Forms

Use the `name` prop to submit the `id` of the selected item to the server. Set the `isRequired` prop to validate that the user selects a value, or implement custom client or server-side validation. See the [Forms](forms.md) guide to learn more.

```tsx
import {ComboBox, ComboBoxItem} from 'vanilla-starter/ComboBox';
import {Button} from 'vanilla-starter/Button';
import {Form} from 'vanilla-starter/Form';;

<Form>
  <ComboBox
    label="Animal"
    placeholder="e.g. Cat"
    /*- begin highlight -*/
    name="animal"
    isRequired
    /*- end highlight -*/
    description="Please select an animal.">
    <ComboBoxItem id="aardvark">Aardvark</ComboBoxItem>
    <ComboBoxItem id="cat">Cat</ComboBoxItem>
    <ComboBoxItem id="dog">Dog</ComboBoxItem>
    <ComboBoxItem id="kangaroo">Kangaroo</ComboBoxItem>
    <ComboBoxItem id="panda">Panda</ComboBoxItem>
    <ComboBoxItem id="snake">Snake</ComboBoxItem>
  </ComboBox>
  <Button type="submit">Submit</Button>
</Form>
```

## Popover

Use the `menuTrigger` prop to control when the popover opens:

- `input` (default): popover opens when the user edits the input text.
- `focus`: popover opens when the user focuses the input.
- `manual`: popover only opens when the user presses the trigger button or uses the arrow keys.

Use `allowsEmptyCollection` to keep the popover open when there are no items available in the list.

```tsx
import {ComboBox, ComboBoxItem} from 'vanilla-starter/ComboBox';

<ComboBox>
  <ComboBoxItem id="red panda">Red Panda</ComboBoxItem>
  <ComboBoxItem id="cat">Cat</ComboBoxItem>
  <ComboBoxItem id="dog">Dog</ComboBoxItem>
  <ComboBoxItem id="aardvark">Aardvark</ComboBoxItem>
  <ComboBoxItem id="kangaroo">Kangaroo</ComboBoxItem>
  <ComboBoxItem id="snake">Snake</ComboBoxItem>
</ComboBox>
```

## API

```tsx
<ComboBox>
  <Label />
  <Group>
    <Input />
    <Button />
  </Group>
  <ComboBoxValue />
  <Text slot="description" />
  <FieldError />
  <Popover>
    <ListBox />
  </Popover>
</ComboBox>
```

### ComboBox

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `allowsCustomValue` | `boolean | undefined` | — | Whether the ComboBox allows a non-item matching input value to be set. |
| `allowsEmptyCollection` | `boolean | undefined` | — | Whether the combo box allows the menu to be open when the collection is empty. |
| `aria-describedby` | `string | undefined` | — | Identifies the element (or elements) that describes the object. |
| `aria-details` | `string | undefined` | — | Identifies the element (or elements) that provide a detailed, extended description for the object. |
| `aria-label` | `string | undefined` | — | Defines a string value that labels the current element. |
| `aria-labelledby` | `string | undefined` | — | Identifies the element (or elements) that labels the current element. |
| `autoFocus` | `boolean | undefined` | — | Whether the element should receive focus on render. |
| `children` | `ChildrenOrFunction<ComboBoxRenderProps>` | — | The children of the component. A function may be provided to alter the children based on component state. |
| `className` | `ClassNameOrFunction<ComboBoxRenderProps> | undefined` | 'react-aria-ComboBox' | The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state. |
| `defaultFilter` | `((textValue: string, inputValue: string) => boolean) | undefined` | — | The filter function used to determine if a option should be included in the combo box list. |
| `defaultInputValue` | `string | undefined` | — | The default value of the ComboBox input (uncontrolled). |
| `defaultItems` | `Iterable<T> | undefined` | — | The list of ComboBox items (uncontrolled). |
| `defaultValue` | `ValueType<M> | undefined` | — | The default value (uncontrolled). |
| `dir` | `string | undefined` | — |  |
| `disabledKeys` | `Iterable<Key> | undefined` | — | The item keys that are disabled. These items cannot be selected, focused, or otherwise interacted with. |
| `form` | `string | undefined` | — | The `<form>` element to associate the input with. The value of this attribute must be the id of a `<form>` in the same document. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#form). |
| `formValue` | `"key" | "text" | undefined` | 'key' | Whether the text or key of the selected item is submitted as part of an HTML form. When `allowsCustomValue` is `true`, this option does not apply and the text is always submitted. |
| `hidden` | `boolean | undefined` | — |  |
| `id` | `string | undefined` | — | The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). |
| `inert` | `boolean | undefined` | — |  |
| `inputValue` | `string | undefined` | — | The value of the ComboBox input (controlled). |
| `isDisabled` | `boolean | undefined` | — | Whether the input is disabled. |
| `isInvalid` | `boolean | undefined` | — | Whether the input value is invalid. |
| `isReadOnly` | `boolean | undefined` | — | Whether the input can be selected but not changed by the user. |
| `isRequired` | `boolean | undefined` | — | Whether user input is required on the input before form submission. |
| `items` | `Iterable<T> | undefined` | — | The list of ComboBox items (controlled). |
| `lang` | `string | undefined` | — |  |
| `menuTrigger` | `MenuTriggerAction | undefined` | 'input' | The interaction required to display the ComboBox menu. |
| `name` | `string | undefined` | — | The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname). |
| `onAnimationEnd` | `React.AnimationEventHandler<HTMLDivElement> | undefined` | — |  |
| `onAnimationEndCapture` | `React.AnimationEventHandler<HTMLDivElement> | undefined` | — |  |
| `onAnimationIteration` | `React.AnimationEventHandler<HTMLDivElement> | undefined` | — |  |
| `onAnimationIterationCapture` | `React.AnimationEventHandler<HTMLDivElement> | undefined` | — |  |
| `onAnimationStart` | `React.AnimationEventHandler<HTMLDivElement> | undefined` | — |  |
| `onAnimationStartCapture` | `React.AnimationEventHandler<HTMLDivElement> | undefined` | — |  |
| `onAuxClick` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onAuxClickCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onBlur` | `((e: React.FocusEvent<HTMLInputElement, Element>) => void) | undefined` | — | Handler that is called when the element loses focus. |
| `onChange` | `((value: ChangeValueType<M>) => void) | undefined` | — | Handler that is called when the value changes. |
| `onClick` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onClickCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onContextMenu` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onContextMenuCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onDoubleClick` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onDoubleClickCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onFocus` | `((e: React.FocusEvent<HTMLInputElement, Element>) => void) | undefined` | — | Handler that is called when the element receives focus. |
| `onFocusChange` | `((isFocused: boolean) => void) | undefined` | — | Handler that is called when the element's focus status changes. |
| `onGotPointerCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onGotPointerCaptureCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onInputChange` | `((value: string) => void) | undefined` | — | Handler that is called when the ComboBox input value changes. |
| `onKeyDown` | `((e: KeyboardEvent) => void) | undefined` | — | Handler that is called when a key is pressed. |
| `onKeyUp` | `((e: KeyboardEvent) => void) | undefined` | — | Handler that is called when a key is released. |
| `onLostPointerCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onLostPointerCaptureCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseDown` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseDownCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseEnter` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseLeave` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseMove` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseMoveCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseOut` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseOutCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseOver` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseOverCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseUp` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseUpCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onOpenChange` | `((isOpen: boolean, menuTrigger?: MenuTriggerAction) => void) | undefined` | — | Method that is called when the open state of the menu changes. Returns the new open state and the action that caused the opening of the menu. |
| `onPointerCancel` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerCancelCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerDown` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerDownCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerEnter` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerLeave` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerMove` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerMoveCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerOut` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerOutCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerOver` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerOverCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerUp` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerUpCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onScroll` | `React.UIEventHandler<HTMLDivElement> | undefined` | — |  |
| `onScrollCapture` | `React.UIEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTouchCancel` | `React.TouchEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTouchCancelCapture` | `React.TouchEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTouchEnd` | `React.TouchEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTouchEndCapture` | `React.TouchEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTouchMove` | `React.TouchEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTouchMoveCapture` | `React.TouchEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTouchStart` | `React.TouchEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTouchStartCapture` | `React.TouchEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTransitionCancel` | `React.TransitionEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTransitionCancelCapture` | `React.TransitionEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTransitionEnd` | `React.TransitionEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTransitionEndCapture` | `React.TransitionEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTransitionRun` | `React.TransitionEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTransitionRunCapture` | `React.TransitionEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTransitionStart` | `React.TransitionEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTransitionStartCapture` | `React.TransitionEventHandler<HTMLDivElement> | undefined` | — |  |
| `onWheel` | `React.WheelEventHandler<HTMLDivElement> | undefined` | — |  |
| `onWheelCapture` | `React.WheelEventHandler<HTMLDivElement> | undefined` | — |  |
| `render` | `DOMRenderFunction<"div", ComboBoxRenderProps> | undefined` | — | Overrides the default DOM element with a custom render function. This allows rendering existing components with built-in styles and behaviors such as router links, animation libraries, and pre-styled components. Requirements: - You must render the expected element type (e.g. if `<button>` is expected, you cannot render an   `<a>`). - Only a single root DOM element can be rendered (no fragments). - You must pass through props and ref to the underlying DOM element, merging with your own prop   as appropriate. |
| `selectionMode` | `M | undefined` | 'single' | Whether single or multiple selection is enabled. |
| `shouldFocusWrap` | `boolean | undefined` | — | Whether keyboard navigation is circular. |
| `slot` | `string | null | undefined` | — | A slot name for the component. Slots allow the component to receive props from a parent component. An explicit `null` value indicates that the local props completely override all props received from a parent. |
| `style` | `(((values: ComboBoxRenderProps & { defaultStyle: React.CSSProperties; }) => React.CSSProperties | React.CSSProperties | undefined)) | undefined` | — | The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state. |
| `translate` | `"no" | "yes" | undefined` | — |  |
| `validate` | `((value: ComboBoxValidationValue<M>) => true | undefined) | ValidationError | null | undefined` | — | A function that returns an error message if a given value is invalid. Validation errors are displayed to the user when the form is submitted if `validationBehavior="native"`. For realtime validation, use the `isInvalid` prop instead. |
| `validationBehavior` | `"aria" | "native" | undefined` | 'native' | Whether to use native HTML form validation to prevent form submission when the value is missing or invalid, or mark the field as required or invalid via ARIA. |
| `value` | `ValueType<M> | undefined` | — | The current value (controlled). |

### ComboBoxValue

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `about` | `string | undefined` | — |  |
| `accessKey` | `string | undefined` | — |  |
| `aria-activedescendant` | `string | undefined` | — | Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application. |
| `aria-atomic` | `(boolean | "true" | "false") | undefined` | — | Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute. |
| `aria-autocomplete` | `"both" | "inline" | "list" | "none" | undefined` | — | Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be presented if they are made. |
| `aria-braillelabel` | `string | undefined` | — | Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user. |
| `aria-brailleroledescription` | `string | undefined` | — | Defines a human-readable, author-localized abbreviated description for the role of an element, which is intended to be converted into Braille. |
| `aria-busy` | `(boolean | "true" | "false") | undefined` | — |  |
| `aria-checked` | `boolean | "true" | "false" | "mixed" | undefined` | — | Indicates the current "checked" state of checkboxes, radio buttons, and other widgets. |
| `aria-colcount` | `number | undefined` | — | Defines the total number of columns in a table, grid, or treegrid. |
| `aria-colindex` | `number | undefined` | — | Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid. |
| `aria-colindextext` | `string | undefined` | — | Defines a human readable text alternative of aria-colindex. |
| `aria-colspan` | `number | undefined` | — | Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid. |
| `aria-controls` | `string | undefined` | — | Identifies the element (or elements) whose contents or presence are controlled by the current element. |
| `aria-current` | `boolean | "true" | "false" | "date" | "location" | "page" | "step" | "time" | undefined` | — | Indicates the element that represents the current item within a container or set of related elements. |
| `aria-describedby` | `string | undefined` | — | Identifies the element (or elements) that describes the object. |
| `aria-description` | `string | undefined` | — | Defines a string value that describes or annotates the current element. |
| `aria-details` | `string | undefined` | — | Identifies the element that provides a detailed, extended description for the object. |
| `aria-disabled` | `(boolean | "true" | "false") | undefined` | — | Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable. |
| `aria-errormessage` | `string | undefined` | — | Identifies the element that provides an error message for the object. |
| `aria-expanded` | `(boolean | "true" | "false") | undefined` | — | Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. |
| `aria-flowto` | `string | undefined` | — | Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion, allows assistive technology to override the general default of reading in document source order. |
| `aria-haspopup` | `boolean | "true" | "false" | "dialog" | "grid" | "listbox" | "menu" | "tree" | undefined` | — | Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. |
| `aria-hidden` | `(boolean | "true" | "false") | undefined` | — | Indicates whether the element is exposed to an accessibility API. |
| `aria-invalid` | `boolean | "true" | "false" | "grammar" | "spelling" | undefined` | — | Indicates the entered value does not conform to the format expected by the application. |
| `aria-keyshortcuts` | `string | undefined` | — | Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. |
| `aria-label` | `string | undefined` | — | Defines a string value that labels the current element. |
| `aria-labelledby` | `string | undefined` | — | Identifies the element (or elements) that labels the current element. |
| `aria-level` | `number | undefined` | — | Defines the hierarchical level of an element within a structure. |
| `aria-live` | `"assertive" | "off" | "polite" | undefined` | — | Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region. |
| `aria-modal` | `(boolean | "true" | "false") | undefined` | — | Indicates whether an element is modal when displayed. |
| `aria-multiline` | `(boolean | "true" | "false") | undefined` | — | Indicates whether a text box accepts multiple lines of input or only a single line. |
| `aria-multiselectable` | `(boolean | "true" | "false") | undefined` | — | Indicates that the user may select more than one item from the current selectable descendants. |
| `aria-orientation` | `"horizontal" | "vertical" | undefined` | — | Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. |
| `aria-owns` | `string | undefined` | — | Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship between DOM elements where the DOM hierarchy cannot be used to represent the relationship. |
| `aria-placeholder` | `string | undefined` | — | Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value. A hint could be a sample value or a brief description of the expected format. |
| `aria-posinset` | `number | undefined` | — | Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM. |
| `aria-pressed` | `boolean | "true" | "false" | "mixed" | undefined` | — | Indicates the current "pressed" state of toggle buttons. |
| `aria-readonly` | `(boolean | "true" | "false") | undefined` | — | Indicates that the element is not editable, but is otherwise operable. |
| `aria-relevant` | `"additions" | "additions removals" | "additions text" | "all" | "removals" | "removals additions" | "removals text" | "text" | "text additions" | "text removals" | undefined` | — | Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified. |
| `aria-required` | `(boolean | "true" | "false") | undefined` | — | Indicates that user input is required on the element before a form may be submitted. |
| `aria-roledescription` | `string | undefined` | — | Defines a human-readable, author-localized description for the role of an element. |
| `aria-rowcount` | `number | undefined` | — | Defines the total number of rows in a table, grid, or treegrid. |
| `aria-rowindex` | `number | undefined` | — | Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid. |
| `aria-rowindextext` | `string | undefined` | — | Defines a human readable text alternative of aria-rowindex. |
| `aria-rowspan` | `number | undefined` | — | Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid. |
| `aria-selected` | `(boolean | "true" | "false") | undefined` | — | Indicates the current "selected" state of various widgets. |
| `aria-setsize` | `number | undefined` | — | Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM. |
| `aria-sort` | `"ascending" | "descending" | "none" | "other" | undefined` | — | Indicates if items in a table or grid are sorted in ascending or descending order. |
| `aria-valuemax` | `number | undefined` | — | Defines the maximum allowed value for a range widget. |
| `aria-valuemin` | `number | undefined` | — | Defines the minimum allowed value for a range widget. |
| `aria-valuenow` | `number | undefined` | — | Defines the current value for a range widget. |
| `aria-valuetext` | `string | undefined` | — | Defines the human readable text alternative of aria-valuenow for a range widget. |
| `autoCapitalize` | `"characters" | "none" | "off" | "on" | "sentences" | "words" | (string & {}) | undefined` | — |  |
| `autoCorrect` | `string | undefined` | — |  |
| `autoFocus` | `boolean | undefined` | — |  |
| `autoSave` | `string | undefined` | — |  |
| `children` | `ChildrenOrFunction<ComboBoxValueRenderProps<T>>` | — | The children of the component. A function may be provided to alter the children based on component state. |
| `className` | `ClassNameOrFunction<ComboBoxValueRenderProps<T>> | undefined` | 'react-aria-ComboBoxValue' | The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state. |
| `color` | `string | undefined` | — |  |
| `content` | `string | undefined` | — |  |
| `contentEditable` | `"inherit" | "plaintext-only" | (boolean | "true" | "false") | undefined` | — |  |
| `contextMenu` | `string | undefined` | — |  |
| `dangerouslySetInnerHTML` | `{ __html: string | TrustedHTML; } | undefined` | — |  |
| `datatype` | `string | undefined` | — |  |
| `defaultChecked` | `boolean | undefined` | — |  |
| `defaultValue` | `number | string | readonly string[] | undefined` | — |  |
| `dir` | `string | undefined` | — |  |
| `draggable` | `(boolean | "true" | "false") | undefined` | — |  |
| `enterKeyHint` | `"done" | "enter" | "go" | "next" | "previous" | "search" | "send" | undefined` | — |  |
| `exportparts` | `string | undefined` | — |  |
| `hidden` | `boolean | undefined` | — |  |
| `id` | `string | undefined` | — |  |
| `inert` | `boolean | undefined` | — |  |
| `inlist` | `any` | — |  |
| `inputMode` | `"decimal" | "email" | "none" | "numeric" | "search" | "tel" | "text" | "url" | undefined` | — | Hints at the type of data that might be entered by the user while editing the element or its contents |
| `is` | `string | undefined` | — | Specify that a standard HTML element should behave like a defined custom built-in element |
| `itemID` | `string | undefined` | — |  |
| `itemProp` | `string | undefined` | — |  |
| `itemRef` | `string | undefined` | — |  |
| `itemScope` | `boolean | undefined` | — |  |
| `itemType` | `string | undefined` | — |  |
| `lang` | `string | undefined` | — |  |
| `nonce` | `string | undefined` | — |  |
| `onAbort` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onAbortCapture` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onAnimationEnd` | `React.AnimationEventHandler<HTMLElement> | undefined` | — |  |
| `onAnimationEndCapture` | `React.AnimationEventHandler<HTMLElement> | undefined` | — |  |
| `onAnimationIteration` | `React.AnimationEventHandler<HTMLElement> | undefined` | — |  |
| `onAnimationIterationCapture` | `React.AnimationEventHandler<HTMLElement> | undefined` | — |  |
| `onAnimationStart` | `React.AnimationEventHandler<HTMLElement> | undefined` | — |  |
| `onAnimationStartCapture` | `React.AnimationEventHandler<HTMLElement> | undefined` | — |  |
| `onAuxClick` | `React.MouseEventHandler<HTMLElement> | undefined` | — |  |
| `onAuxClickCapture` | `React.MouseEventHandler<HTMLElement> | undefined` | — |  |
| `onBeforeInput` | `React.InputEventHandler<HTMLElement> | undefined` | — |  |
| `onBeforeInputCapture` | `React.FormEventHandler<HTMLElement> | undefined` | — |  |
| `onBeforeToggle` | `React.ToggleEventHandler<HTMLElement> | undefined` | — |  |
| `onBlur` | `React.FocusEventHandler<HTMLElement> | undefined` | — |  |
| `onBlurCapture` | `React.FocusEventHandler<HTMLElement> | undefined` | — |  |
| `onCanPlay` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onCanPlayCapture` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onCanPlayThrough` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onCanPlayThroughCapture` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onChange` | `React.FormEventHandler<HTMLElement> | undefined` | — |  |
| `onChangeCapture` | `React.FormEventHandler<HTMLElement> | undefined` | — |  |
| `onClick` | `React.MouseEventHandler<HTMLElement> | undefined` | — |  |
| `onClickCapture` | `React.MouseEventHandler<HTMLElement> | undefined` | — |  |
| `onCompositionEnd` | `React.CompositionEventHandler<HTMLElement> | undefined` | — |  |
| `onCompositionEndCapture` | `React.CompositionEventHandler<HTMLElement> | undefined` | — |  |
| `onCompositionStart` | `React.CompositionEventHandler<HTMLElement> | undefined` | — |  |
| `onCompositionStartCapture` | `React.CompositionEventHandler<HTMLElement> | undefined` | — |  |
| `onCompositionUpdate` | `React.CompositionEventHandler<HTMLElement> | undefined` | — |  |
| `onCompositionUpdateCapture` | `React.CompositionEventHandler<HTMLElement> | undefined` | — |  |
| `onContextMenu` | `React.MouseEventHandler<HTMLElement> | undefined` | — |  |
| `onContextMenuCapture` | `React.MouseEventHandler<HTMLElement> | undefined` | — |  |
| `onCopy` | `React.ClipboardEventHandler<HTMLElement> | undefined` | — |  |
| `onCopyCapture` | `React.ClipboardEventHandler<HTMLElement> | undefined` | — |  |
| `onCut` | `React.ClipboardEventHandler<HTMLElement> | undefined` | — |  |
| `onCutCapture` | `React.ClipboardEventHandler<HTMLElement> | undefined` | — |  |
| `onDoubleClick` | `React.MouseEventHandler<HTMLElement> | undefined` | — |  |
| `onDoubleClickCapture` | `React.MouseEventHandler<HTMLElement> | undefined` | — |  |
| `onDrag` | `React.DragEventHandler<HTMLElement> | undefined` | — |  |
| `onDragCapture` | `React.DragEventHandler<HTMLElement> | undefined` | — |  |
| `onDragEnd` | `React.DragEventHandler<HTMLElement> | undefined` | — |  |
| `onDragEndCapture` | `React.DragEventHandler<HTMLElement> | undefined` | — |  |
| `onDragEnter` | `React.DragEventHandler<HTMLElement> | undefined` | — |  |
| `onDragEnterCapture` | `React.DragEventHandler<HTMLElement> | undefined` | — |  |
| `onDragExit` | `React.DragEventHandler<HTMLElement> | undefined` | — |  |
| `onDragExitCapture` | `React.DragEventHandler<HTMLElement> | undefined` | — |  |
| `onDragLeave` | `React.DragEventHandler<HTMLElement> | undefined` | — |  |
| `onDragLeaveCapture` | `React.DragEventHandler<HTMLElement> | undefined` | — |  |
| `onDragOver` | `React.DragEventHandler<HTMLElement> | undefined` | — |  |
| `onDragOverCapture` | `React.DragEventHandler<HTMLElement> | undefined` | — |  |
| `onDragStart` | `React.DragEventHandler<HTMLElement> | undefined` | — |  |
| `onDragStartCapture` | `React.DragEventHandler<HTMLElement> | undefined` | — |  |
| `onDrop` | `React.DragEventHandler<HTMLElement> | undefined` | — |  |
| `onDropCapture` | `React.DragEventHandler<HTMLElement> | undefined` | — |  |
| `onDurationChange` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onDurationChangeCapture` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onEmptied` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onEmptiedCapture` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onEncrypted` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onEncryptedCapture` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onEnded` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onEndedCapture` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onError` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onErrorCapture` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onFocus` | `React.FocusEventHandler<HTMLElement> | undefined` | — |  |
| `onFocusCapture` | `React.FocusEventHandler<HTMLElement> | undefined` | — |  |
| `onGotPointerCapture` | `React.PointerEventHandler<HTMLElement> | undefined` | — |  |
| `onGotPointerCaptureCapture` | `React.PointerEventHandler<HTMLElement> | undefined` | — |  |
| `onInput` | `React.FormEventHandler<HTMLElement> | undefined` | — |  |
| `onInputCapture` | `React.FormEventHandler<HTMLElement> | undefined` | — |  |
| `onInvalid` | `React.FormEventHandler<HTMLElement> | undefined` | — |  |
| `onInvalidCapture` | `React.FormEventHandler<HTMLElement> | undefined` | — |  |
| `onKeyDown` | `React.KeyboardEventHandler<HTMLElement> | undefined` | — |  |
| `onKeyDownCapture` | `React.KeyboardEventHandler<HTMLElement> | undefined` | — |  |
| `onKeyUp` | `React.KeyboardEventHandler<HTMLElement> | undefined` | — |  |
| `onKeyUpCapture` | `React.KeyboardEventHandler<HTMLElement> | undefined` | — |  |
| `onLoad` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onLoadCapture` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onLoadedData` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onLoadedDataCapture` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onLoadedMetadata` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onLoadedMetadataCapture` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onLoadStart` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onLoadStartCapture` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onLostPointerCapture` | `React.PointerEventHandler<HTMLElement> | undefined` | — |  |
| `onLostPointerCaptureCapture` | `React.PointerEventHandler<HTMLElement> | undefined` | — |  |
| `onMouseDown` | `React.MouseEventHandler<HTMLElement> | undefined` | — |  |
| `onMouseDownCapture` | `React.MouseEventHandler<HTMLElement> | undefined` | — |  |
| `onMouseEnter` | `React.MouseEventHandler<HTMLElement> | undefined` | — |  |
| `onMouseLeave` | `React.MouseEventHandler<HTMLElement> | undefined` | — |  |
| `onMouseMove` | `React.MouseEventHandler<HTMLElement> | undefined` | — |  |
| `onMouseMoveCapture` | `React.MouseEventHandler<HTMLElement> | undefined` | — |  |
| `onMouseOut` | `React.MouseEventHandler<HTMLElement> | undefined` | — |  |
| `onMouseOutCapture` | `React.MouseEventHandler<HTMLElement> | undefined` | — |  |
| `onMouseOver` | `React.MouseEventHandler<HTMLElement> | undefined` | — |  |
| `onMouseOverCapture` | `React.MouseEventHandler<HTMLElement> | undefined` | — |  |
| `onMouseUp` | `React.MouseEventHandler<HTMLElement> | undefined` | — |  |
| `onMouseUpCapture` | `React.MouseEventHandler<HTMLElement> | undefined` | — |  |
| `onPaste` | `React.ClipboardEventHandler<HTMLElement> | undefined` | — |  |
| `onPasteCapture` | `React.ClipboardEventHandler<HTMLElement> | undefined` | — |  |
| `onPause` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onPauseCapture` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onPlay` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onPlayCapture` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onPlaying` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onPlayingCapture` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onPointerCancel` | `React.PointerEventHandler<HTMLElement> | undefined` | — |  |
| `onPointerCancelCapture` | `React.PointerEventHandler<HTMLElement> | undefined` | — |  |
| `onPointerDown` | `React.PointerEventHandler<HTMLElement> | undefined` | — |  |
| `onPointerDownCapture` | `React.PointerEventHandler<HTMLElement> | undefined` | — |  |
| `onPointerEnter` | `React.PointerEventHandler<HTMLElement> | undefined` | — |  |
| `onPointerLeave` | `React.PointerEventHandler<HTMLElement> | undefined` | — |  |
| `onPointerMove` | `React.PointerEventHandler<HTMLElement> | undefined` | — |  |
| `onPointerMoveCapture` | `React.PointerEventHandler<HTMLElement> | undefined` | — |  |
| `onPointerOut` | `React.PointerEventHandler<HTMLElement> | undefined` | — |  |
| `onPointerOutCapture` | `React.PointerEventHandler<HTMLElement> | undefined` | — |  |
| `onPointerOver` | `React.PointerEventHandler<HTMLElement> | undefined` | — |  |
| `onPointerOverCapture` | `React.PointerEventHandler<HTMLElement> | undefined` | — |  |
| `onPointerUp` | `React.PointerEventHandler<HTMLElement> | undefined` | — |  |
| `onPointerUpCapture` | `React.PointerEventHandler<HTMLElement> | undefined` | — |  |
| `onProgress` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onProgressCapture` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onRateChange` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onRateChangeCapture` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onReset` | `React.FormEventHandler<HTMLElement> | undefined` | — |  |
| `onResetCapture` | `React.FormEventHandler<HTMLElement> | undefined` | — |  |
| `onScroll` | `React.UIEventHandler<HTMLElement> | undefined` | — |  |
| `onScrollCapture` | `React.UIEventHandler<HTMLElement> | undefined` | — |  |
| `onScrollEnd` | `React.UIEventHandler<HTMLElement> | undefined` | — |  |
| `onScrollEndCapture` | `React.UIEventHandler<HTMLElement> | undefined` | — |  |
| `onSeeked` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onSeekedCapture` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onSeeking` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onSeekingCapture` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onSelect` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onSelectCapture` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onStalled` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onStalledCapture` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onSubmit` | `React.FormEventHandler<HTMLElement> | undefined` | — |  |
| `onSubmitCapture` | `React.FormEventHandler<HTMLElement> | undefined` | — |  |
| `onSuspend` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onSuspendCapture` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onTimeUpdate` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onTimeUpdateCapture` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onToggle` | `React.ToggleEventHandler<HTMLElement> | undefined` | — |  |
| `onTouchCancel` | `React.TouchEventHandler<HTMLElement> | undefined` | — |  |
| `onTouchCancelCapture` | `React.TouchEventHandler<HTMLElement> | undefined` | — |  |
| `onTouchEnd` | `React.TouchEventHandler<HTMLElement> | undefined` | — |  |
| `onTouchEndCapture` | `React.TouchEventHandler<HTMLElement> | undefined` | — |  |
| `onTouchMove` | `React.TouchEventHandler<HTMLElement> | undefined` | — |  |
| `onTouchMoveCapture` | `React.TouchEventHandler<HTMLElement> | undefined` | — |  |
| `onTouchStart` | `React.TouchEventHandler<HTMLElement> | undefined` | — |  |
| `onTouchStartCapture` | `React.TouchEventHandler<HTMLElement> | undefined` | — |  |
| `onTransitionCancel` | `React.TransitionEventHandler<HTMLElement> | undefined` | — |  |
| `onTransitionCancelCapture` | `React.TransitionEventHandler<HTMLElement> | undefined` | — |  |
| `onTransitionEnd` | `React.TransitionEventHandler<HTMLElement> | undefined` | — |  |
| `onTransitionEndCapture` | `React.TransitionEventHandler<HTMLElement> | undefined` | — |  |
| `onTransitionRun` | `React.TransitionEventHandler<HTMLElement> | undefined` | — |  |
| `onTransitionRunCapture` | `React.TransitionEventHandler<HTMLElement> | undefined` | — |  |
| `onTransitionStart` | `React.TransitionEventHandler<HTMLElement> | undefined` | — |  |
| `onTransitionStartCapture` | `React.TransitionEventHandler<HTMLElement> | undefined` | — |  |
| `onVolumeChange` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onVolumeChangeCapture` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onWaiting` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onWaitingCapture` | `React.ReactEventHandler<HTMLElement> | undefined` | — |  |
| `onWheel` | `React.WheelEventHandler<HTMLElement> | undefined` | — |  |
| `onWheelCapture` | `React.WheelEventHandler<HTMLElement> | undefined` | — |  |
| `part` | `string | undefined` | — |  |
| `placeholder` | `React.ReactNode` | — | A value to display when no items are selected. |
| `popover` | `"" | "auto" | "manual" | undefined` | — |  |
| `popoverTarget` | `string | undefined` | — |  |
| `popoverTargetAction` | `"hide" | "show" | "toggle" | undefined` | — |  |
| `prefix` | `string | undefined` | — |  |
| `property` | `string | undefined` | — |  |
| `radioGroup` | `string | undefined` | — |  |
| `rel` | `string | undefined` | — |  |
| `render` | `DOMRenderFunction<"div", ComboBoxValueRenderProps<T>> | undefined` | — | Overrides the default DOM element with a custom render function. This allows rendering existing components with built-in styles and behaviors such as router links, animation libraries, and pre-styled components. Requirements: - You must render the expected element type (e.g. if `<button>` is expected, you cannot render an   `<a>`). - Only a single root DOM element can be rendered (no fragments). - You must pass through props and ref to the underlying DOM element, merging with your own prop   as appropriate. |
| `resource` | `string | undefined` | — |  |
| `results` | `number | undefined` | — |  |
| `rev` | `string | undefined` | — |  |
| `role` | `React.AriaRole | undefined` | — |  |
| `security` | `string | undefined` | — |  |
| `slot` | `string | undefined` | — |  |
| `spellCheck` | `(boolean | "true" | "false") | undefined` | — |  |
| `style` | `(((values: ComboBoxValueRenderProps<T> & { defaultStyle: React.CSSProperties; }) => React.CSSProperties | React.CSSProperties | undefined)) | undefined` | — | The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state. |
| `suppressContentEditableWarning` | `boolean | undefined` | — |  |
| `suppressHydrationWarning` | `boolean | undefined` | — |  |
| `tabIndex` | `number | undefined` | — |  |
| `title` | `string | undefined` | — |  |
| `translate` | `"no" | "yes" | undefined` | — |  |
| `typeof` | `string | undefined` | — |  |
| `unselectable` | `"off" | "on" | undefined` | — |  |
| `vocab` | `string | undefined` | — |  |
