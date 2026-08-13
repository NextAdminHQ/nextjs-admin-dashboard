# useObjectRef

Offers an object ref for a given callback ref or an object ref. Especially
helfpul when passing forwarded refs (created using \`React.forwardRef\`) to
React Aria hooks.

## Introduction

`useObjectRef` is a utility function that will give an object ref back regardless of if a
callback ref or object ref was passed in. This is useful for passing refs to React Aria hooks.

## Example

```tsx
'use client';
import React from 'react';
import {useObjectRef} from 'react-aria/useObjectRef';
import {useButton, type AriaButtonProps} from 'react-aria/useButton';

let Button = React.forwardRef((props: AriaButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
  let objRef = useObjectRef(ref);
  let {buttonProps} = useButton(props, objRef);
  let {children} = props;

  return (
    <button {...buttonProps} ref={objRef}>
      {children}
    </button>
  );
});

function MyButton(props) {
  let ref = React.useRef(null);
  return <Button ref={ref} onPress={() => console.log(ref.current)}>{props.children}</Button>;
}

<MyButton>Test</MyButton>
```

## API

<FunctionAPI
  function={docs.exports.useObjectRef}
  links={docs.links}
/>
