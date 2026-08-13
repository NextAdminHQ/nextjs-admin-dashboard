# Switch

A switch allows a user to turn a setting on or off.

## Vanilla CSS example

### Switch.tsx

```tsx
'use client';
import {
  SwitchField,
  SwitchButton,
  type SwitchFieldProps,
  type ValidationResult
} from 'react-aria-components/Switch';
import './Switch.css';
import {Description, FieldError} from './Form';
import type {ReactNode} from 'react';

export interface SwitchProps extends Omit<SwitchFieldProps, 'children'> {
  children: ReactNode;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function Switch({children, description, errorMessage, ...props}: SwitchProps) {
  return (
    <SwitchField {...props}>
      <SwitchButton>
        {({isSelected, isDisabled}) => (
          <>
            <div className="track indicator">
              <div
                data-disabled={isDisabled || undefined}
                className={isSelected ? 'handle' : 'handle indicator'}
              />
            </div>
            {children}
          </>
        )}
      </SwitchButton>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </SwitchField>
  );
}

```

### Switch.css

```css
@import './theme.css';
@import './utilities.css';

.react-aria-SwitchField {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);

  &[data-disabled] [slot='description'] {
    color: var(--text-color-disabled);
  }
}

.react-aria-SwitchButton {
  display: flex;
  /* This is needed so the HiddenInput is positioned correctly */
  position: relative;
  align-items: center;
  gap: var(--spacing-2);
  font: var(--font-size) system-ui;
  color: var(--text-color);
  forced-color-adjust: none;
  -webkit-tap-highlight-color: transparent;

  .track {
    --height: calc(var(--spacing) * 5.5);
    height: var(--height);
    width: calc(var(--spacing) * 9.5);
    border-radius: var(--height);
    transition: all 200ms;
    scale: 1;

    .handle {
      display: block;
      height: 100%;
      aspect-ratio: 1;
      border-radius: var(--height);
      transition: all 200ms;
      transform-origin: 0 50%;
      will-change: transform;
      --indicator-color: var(--tint);
    }
  }

  &[data-pressed] .handle {
    scale: 1.2 1;
    border-radius: var(--height) / calc(var(--height) * 1.2);
    background: var(--button-background-pressed);
  }

  &[data-invalid] {
    .handle {
      --indicator-color: var(--invalid-color);
    }

    &[data-pressed] .handle {
      background: transparent;
    }
  }

  &[data-selected] {
    --border-color: var(--highlight-background-pressed);
    .handle {
      transform: translateX(var(--spacing-4));
      transform-origin: var(--spacing-9) 50%;
      background: white;
      box-shadow:
        inset 0 0 0 1px var(--border-color),
        inset 0 -4px 4px oklch(from var(--tint) 85% c h / 0.3);

      @media (forced-colors: active) {
        background: HighlightText;
        box-shadow: inset 0 0 0 1px Highlight;
      }
    }
  }

  &[data-focus-visible] .track {
    outline: 2px solid var(--focus-ring-color);
    outline-offset: 2px;
  }

  &[data-disabled] {
    color: var(--text-color-disabled);
    --border-color: var(--border-color-disabled);

    .track {
      box-shadow: 0 0 0 1px var(--border-color);
    }

    &[data-selected] .handle {
      background: var(--gray-200);
      box-shadow: none;
    }
  }
}

```

## Tailwind example

### Switch.tsx

```tsx
'use client';
import React from 'react';
import {
  SwitchField,
  SwitchButton,
  type SwitchFieldProps,
  type ValidationResult
} from 'react-aria-components/Switch';
import {tv} from 'tailwind-variants';
import {composeTailwindRenderProps, focusRing} from './utils';
import {Description, FieldError} from './Field';

export interface SwitchProps extends Omit<SwitchFieldProps, 'children'> {
  children: React.ReactNode;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

const track = tv({
  extend: focusRing,
  base: 'flex h-5 w-9 box-border px-px items-center shrink-0 cursor-default rounded-full transition duration-200 ease-in-out shadow-inner border border-transparent font-sans',
  variants: {
    isSelected: {
      false:
        'bg-neutral-100 dark:bg-neutral-800 group-pressed:bg-neutral-200 dark:group-pressed:bg-neutral-700 border-neutral-400 dark:border-neutral-400',
      true: 'bg-neutral-700 dark:bg-neutral-300 forced-colors:bg-[Highlight]! group-pressed:bg-neutral-800 dark:group-pressed:bg-neutral-200'
    },
    isDisabled: {
      true: 'bg-neutral-100 dark:bg-neutral-800 group-selected:bg-neutral-300 dark:group-selected:bg-neutral-800 forced-colors:group-selected:bg-[GrayText]! border-neutral-300 dark:border-neutral-900 forced-colors:border-[GrayText]'
    }
  }
});

const handle = tv({
  base: 'h-4 w-4 transform rounded-full outline outline-1 -outline-offset-1 outline-transparent shadow-xs transition duration-200 ease-in-out',
  variants: {
    isSelected: {
      false: 'translate-x-0 bg-neutral-900 dark:bg-neutral-300',
      true: 'translate-x-[100%] bg-white dark:bg-neutral-900'
    },
    isDisabled: {
      true: 'forced-colors:outline-[GrayText]'
    }
  },
  compoundVariants: [
    {
      isSelected: false,
      isDisabled: true,
      class: 'bg-neutral-300 dark:bg-neutral-700'
    },
    {
      isSelected: true,
      isDisabled: true,
      class: 'bg-neutral-50 dark:bg-neutral-700'
    }
  ]
});

export function Switch({children, ...props}: SwitchProps) {
  return (
    <SwitchField {...props} className="flex flex-col gap-1 group">
      <SwitchButton
        className={composeTailwindRenderProps(
          props.className,
          'group relative flex gap-2 items-center text-neutral-800 disabled:text-neutral-300 dark:text-neutral-200 dark:disabled:text-neutral-600 forced-colors:disabled:text-[GrayText] text-sm transition [-webkit-tap-highlight-color:transparent]'
        )}>
        {renderProps => (
          <>
            <div className={track(renderProps)}>
              <span className={handle(renderProps)} />
            </div>
            {children}
          </>
        )}
      </SwitchButton>
      {props.description && <Description>{props.description}</Description>}
      <FieldError>{props.errorMessage}</FieldError>
    </SwitchField>
  );
}

```

## Selection

Use the `isSelected` or `defaultSelected` prop to set the selection state, and `onChange` to handle selection changes.

```tsx
import {Switch} from 'vanilla-starter/Switch';
import {useState} from 'react';

function Example(props) {
  let [selected, setSelection] = useState(false);

  return (
    <>
      <Switch
        {...props}
        isSelected={selected}
        onChange={setSelection}
      >
        Low power mode
      </Switch>
      <p>{selected ? 'Low' : 'High'} power mode active.</p>
    </>
  );
}
```

## Forms

Use the `name` and `value` props to submit the switch to the server. Set the `isRequired` prop to validate the user selects the switch, or implement custom client or server-side validation. See the [Forms](forms.md) guide to learn more.

```tsx
import {Switch} from 'vanilla-starter/Switch';
import {Button} from 'vanilla-starter/Button';
import {Form} from 'vanilla-starter/Form';

<Form>
  {/*- begin highlight -*/}
  <Switch
    name="two-factor"
    isRequired
    description="Your organization requires two-factor authentication.">
    Two-factor authentication
  </Switch>
  {/*- end highlight -*/}
  <Button type="submit" style={{marginTop: 8}}>Submit</Button>
</Form>
```

## API

```tsx
<SwitchField>
  <SwitchButton>Label</SwitchButton>
  <Text slot="description" />
  <FieldError />
</SwitchField>
```

### SwitchField

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `aria-controls` | `string | undefined` | — | Identifies the element (or elements) whose contents or presence are controlled by the current element. |
| `aria-describedby` | `string | undefined` | — | Identifies the element (or elements) that describes the object. |
| `aria-details` | `string | undefined` | — | Identifies the element (or elements) that provide a detailed, extended description for the object. |
| `aria-errormessage` | `string | undefined` | — | Identifies the element that provides an error message for the object. |
| `aria-label` | `string | undefined` | — | Defines a string value that labels the current element. |
| `aria-labelledby` | `string | undefined` | — | Identifies the element (or elements) that labels the current element. |
| `autoFocus` | `boolean | undefined` | — | Whether the element should receive focus on render. |
| `children` | `ChildrenOrFunction<SwitchFieldRenderProps>` | — | The children of the component. A function may be provided to alter the children based on component state. |
| `className` | `ClassNameOrFunction<SwitchFieldRenderProps> | undefined` | 'react-aria-SwitchField' | The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state. |
| `defaultSelected` | `boolean | undefined` | — | Whether the element should be selected (uncontrolled). |
| `dir` | `string | undefined` | — |  |
| `excludeFromTabOrder` | `boolean | undefined` | — | Whether to exclude the element from the sequential tab order. If true, the element will not be focusable via the keyboard by tabbing. This should be avoided except in rare scenarios where an alternative means of accessing the element or its functionality via the keyboard is available. |
| `form` | `string | undefined` | — | The `<form>` element to associate the input with. The value of this attribute must be the id of a `<form>` in the same document. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#form). |
| `hidden` | `boolean | undefined` | — |  |
| `id` | `string | undefined` | — | The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). |
| `inert` | `boolean | undefined` | — |  |
| `inputRef` | `RefObject<HTMLInputElement | null> | undefined` | — | A ref for the HTML input element. |
| `isDisabled` | `boolean | undefined` | — | Whether the input is disabled. |
| `isInvalid` | `boolean | undefined` | — | Whether the input value is invalid. |
| `isReadOnly` | `boolean | undefined` | — | Whether the input can be selected but not changed by the user. |
| `isRequired` | `boolean | undefined` | — | Whether user input is required on the input before form submission. |
| `isSelected` | `boolean | undefined` | — | Whether the element should be selected (controlled). |
| `lang` | `string | undefined` | — |  |
| `name` | `string | undefined` | — | The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname). |
| `onAnimationEnd` | `React.AnimationEventHandler<HTMLDivElement> | undefined` | — |  |
| `onAnimationEndCapture` | `React.AnimationEventHandler<HTMLDivElement> | undefined` | — |  |
| `onAnimationIteration` | `React.AnimationEventHandler<HTMLDivElement> | undefined` | — |  |
| `onAnimationIterationCapture` | `React.AnimationEventHandler<HTMLDivElement> | undefined` | — |  |
| `onAnimationStart` | `React.AnimationEventHandler<HTMLDivElement> | undefined` | — |  |
| `onAnimationStartCapture` | `React.AnimationEventHandler<HTMLDivElement> | undefined` | — |  |
| `onAuxClick` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onAuxClickCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onBlur` | `((e: React.FocusEvent<Element>) => void) | undefined` | — | Handler that is called when the element loses focus. |
| `onChange` | `((isSelected: boolean) => void) | undefined` | — | Handler that is called when the element's selection state changes. |
| `onClick` | `((e: React.MouseEvent<FocusableElement>) => void) | undefined` | — | **Not recommended – use `onPress` instead.** `onClick` is an alias for `onPress` provided for compatibility with other libraries. `onPress` provides additional event details for non-mouse interactions. |
| `onClickCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onContextMenu` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onContextMenuCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onDoubleClick` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onDoubleClickCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onFocus` | `((e: React.FocusEvent<Element>) => void) | undefined` | — | Handler that is called when the element receives focus. |
| `onFocusChange` | `((isFocused: boolean) => void) | undefined` | — | Handler that is called when the element's focus status changes. |
| `onGotPointerCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onGotPointerCaptureCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
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
| `onPress` | `((e: PressEvent) => void) | undefined` | — | Handler that is called when the press is released over the target. |
| `onPressChange` | `((isPressed: boolean) => void) | undefined` | — | Handler that is called when the press state changes. |
| `onPressEnd` | `((e: PressEvent) => void) | undefined` | — | Handler that is called when a press interaction ends, either over the target or when the pointer leaves the target. |
| `onPressStart` | `((e: PressEvent) => void) | undefined` | — | Handler that is called when a press interaction starts. |
| `onPressUp` | `((e: PressEvent) => void) | undefined` | — | Handler that is called when a press is released over the target, regardless of whether it started on the target or not. |
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
| `render` | `DOMRenderFunction<"div", SwitchFieldRenderProps> | undefined` | — | Overrides the default DOM element with a custom render function. This allows rendering existing components with built-in styles and behaviors such as router links, animation libraries, and pre-styled components. Requirements: - You must render the expected element type (e.g. if `<button>` is expected, you cannot render an   `<a>`). - Only a single root DOM element can be rendered (no fragments). - You must pass through props and ref to the underlying DOM element, merging with your own prop   as appropriate. |
| `slot` | `string | null | undefined` | — | A slot name for the component. Slots allow the component to receive props from a parent component. An explicit `null` value indicates that the local props completely override all props received from a parent. |
| `style` | `(((values: SwitchFieldRenderProps & { defaultStyle: React.CSSProperties; }) => React.CSSProperties | React.CSSProperties | undefined)) | undefined` | — | The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state. |
| `translate` | `"no" | "yes" | undefined` | — |  |
| `validate` | `((value: boolean) => true | undefined) | ValidationError | null | undefined` | — | A function that returns an error message if a given value is invalid. Validation errors are displayed to the user when the form is submitted if `validationBehavior="native"`. For realtime validation, use the `isInvalid` prop instead. |
| `validationBehavior` | `"aria" | "native" | undefined` | 'native' | Whether to use native HTML form validation to prevent form submission when the value is missing or invalid, or mark the field as required or invalid via ARIA. |
| `value` | `string | undefined` | — | The value of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefvalue). |

### SwitchButton

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ChildrenOrFunction<SwitchButtonRenderProps>` | — | The children of the component. A function may be provided to alter the children based on component state. |
| `className` | `ClassNameOrFunction<SwitchButtonRenderProps> | undefined` | 'react-aria-SwitchButton' | The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state. |
| `dir` | `string | undefined` | — |  |
| `hidden` | `boolean | undefined` | — |  |
| `inert` | `boolean | undefined` | — |  |
| `lang` | `string | undefined` | — |  |
| `onAnimationEnd` | `React.AnimationEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onAnimationEndCapture` | `React.AnimationEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onAnimationIteration` | `React.AnimationEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onAnimationIterationCapture` | `React.AnimationEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onAnimationStart` | `React.AnimationEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onAnimationStartCapture` | `React.AnimationEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onAuxClick` | `React.MouseEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onAuxClickCapture` | `React.MouseEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onClick` | `React.MouseEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onClickCapture` | `React.MouseEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onContextMenu` | `React.MouseEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onContextMenuCapture` | `React.MouseEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onDoubleClick` | `React.MouseEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onDoubleClickCapture` | `React.MouseEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onGotPointerCapture` | `React.PointerEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onGotPointerCaptureCapture` | `React.PointerEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onHoverChange` | `((isHovering: boolean) => void) | undefined` | — | Handler that is called when the hover state changes. |
| `onHoverEnd` | `((e: HoverEvent) => void) | undefined` | — | Handler that is called when a hover interaction ends. |
| `onHoverStart` | `((e: HoverEvent) => void) | undefined` | — | Handler that is called when a hover interaction starts. |
| `onLostPointerCapture` | `React.PointerEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onLostPointerCaptureCapture` | `React.PointerEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onMouseDown` | `React.MouseEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onMouseDownCapture` | `React.MouseEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onMouseEnter` | `React.MouseEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onMouseLeave` | `React.MouseEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onMouseMove` | `React.MouseEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onMouseMoveCapture` | `React.MouseEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onMouseOut` | `React.MouseEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onMouseOutCapture` | `React.MouseEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onMouseOver` | `React.MouseEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onMouseOverCapture` | `React.MouseEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onMouseUp` | `React.MouseEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onMouseUpCapture` | `React.MouseEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onPointerCancel` | `React.PointerEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onPointerCancelCapture` | `React.PointerEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onPointerDown` | `React.PointerEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onPointerDownCapture` | `React.PointerEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onPointerEnter` | `React.PointerEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onPointerLeave` | `React.PointerEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onPointerMove` | `React.PointerEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onPointerMoveCapture` | `React.PointerEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onPointerOut` | `React.PointerEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onPointerOutCapture` | `React.PointerEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onPointerOver` | `React.PointerEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onPointerOverCapture` | `React.PointerEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onPointerUp` | `React.PointerEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onPointerUpCapture` | `React.PointerEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onScroll` | `React.UIEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onScrollCapture` | `React.UIEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onTouchCancel` | `React.TouchEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onTouchCancelCapture` | `React.TouchEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onTouchEnd` | `React.TouchEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onTouchEndCapture` | `React.TouchEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onTouchMove` | `React.TouchEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onTouchMoveCapture` | `React.TouchEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onTouchStart` | `React.TouchEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onTouchStartCapture` | `React.TouchEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onTransitionCancel` | `React.TransitionEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onTransitionCancelCapture` | `React.TransitionEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onTransitionEnd` | `React.TransitionEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onTransitionEndCapture` | `React.TransitionEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onTransitionRun` | `React.TransitionEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onTransitionRunCapture` | `React.TransitionEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onTransitionStart` | `React.TransitionEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onTransitionStartCapture` | `React.TransitionEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onWheel` | `React.WheelEventHandler<HTMLLabelElement> | undefined` | — |  |
| `onWheelCapture` | `React.WheelEventHandler<HTMLLabelElement> | undefined` | — |  |
| `render` | `DOMRenderFunction<"label", SwitchButtonRenderProps> | undefined` | — | Overrides the default DOM element with a custom render function. This allows rendering existing components with built-in styles and behaviors such as router links, animation libraries, and pre-styled components. Requirements: - You must render the expected element type (e.g. if `<button>` is expected, you cannot render an   `<a>`). - Only a single root DOM element can be rendered (no fragments). - You must pass through props and ref to the underlying DOM element, merging with your own prop   as appropriate. |
| `slot` | `string | null | undefined` | — | A slot name for the component. Slots allow the component to receive props from a parent component. An explicit `null` value indicates that the local props completely override all props received from a parent. |
| `style` | `(((values: SwitchButtonRenderProps & { defaultStyle: React.CSSProperties; }) => React.CSSProperties | React.CSSProperties | undefined)) | undefined` | — | The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state. |
| `translate` | `"no" | "yes" | undefined` | — |  |
