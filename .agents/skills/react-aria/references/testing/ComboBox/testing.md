# Testing ComboBox

## Test utils

`@react-aria/test-utils` offers common combobox interaction testing utilities. Install it with your preferred package manager.

```bash
npm install @react-aria/test-utils --dev
```

<InlineAlert variant="notice">
  <Heading>Requirements</Heading>
  <Content>Please note that this library uses [@testing-library/dom@10](https://www.npmjs.com/package/@testing-library/dom) and [@testing-library/user-event@14](https://www.npmjs.com/package/@testing-library/user-event). This means that you need to be on React 18+ in order for these utilities to work.</Content>
</InlineAlert>

Initialize a `User` object at the top of your test file, and use it to create a `ComboBox` pattern tester in your test cases. The tester has methods that you can call within your test to query for specific subcomponents or simulate common interactions.

```ts
// Combobox.test.ts
import {render} from '@testing-library/react';
import {User} from '@react-aria/test-utils';

let testUtilUser = new User({
  interactionType: 'mouse'
});
// ...

it('ComboBox can select an option via keyboard', async function () {
  // Render your test component/app and initialize the combobox tester
  let {getByTestId} = render(
    <ComboBox data-testid="test-combobox">
      ...
    </ComboBox>
  );
  let comboboxTester = testUtilUser.createTester('ComboBox', {root: getByTestId('test-combobox'), interactionType: 'keyboard'});

  await comboboxTester.open();
  expect(comboboxTester.getListbox()).toBeInTheDocument();

  let options = comboboxTester.getOptions();
  await comboboxTester.toggleOptionSelection({option: options[0]});
  expect(comboboxTester.getCombobox().value).toBe('One');
  expect(comboboxTester.getListbox()).not.toBeInTheDocument();
});
```

## API

### User

### ComboBoxTester

## Testing FAQ

<PatternTestingFAQ patternName="combobox"/>
