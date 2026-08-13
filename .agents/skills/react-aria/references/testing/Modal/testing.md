# Testing Modal

## Test utils

`@react-aria/test-utils` offers common dialog interaction testing utilities. Install it with your preferred package manager.

```bash
npm install @react-aria/test-utils --dev
```

<InlineAlert variant="notice">
  <Heading>Requirements</Heading>
  <Content>Please note that this library uses [@testing-library/dom@10](https://www.npmjs.com/package/@testing-library/dom) and [@testing-library/user-event@14](https://www.npmjs.com/package/@testing-library/user-event). This means that you need to be on React 18+ in order for these utilities to work.</Content>
</InlineAlert>

Initialize a `User` object at the top of your test file, and use it to create a `Dialog` pattern tester in your test cases. Pass `overlayType: 'modal'` to indicate the dialog is rendered inside a `Modal`. The tester has methods that you can call within your test to query for the dialog or simulate common interactions.

```ts
// Modal.test.ts
import {render} from '@testing-library/react';
import {User} from '@react-aria/test-utils';

let testUtilUser = new User({
  interactionType: 'mouse'
});
// ...

it('Modal can be opened and closed', async function () {
  // Render your test component/app and initialize the dialog tester
  let {getByRole} = render(
    <DialogTrigger>
      <Button>Open</Button>
      <Modal>
        <Dialog role="alertdialog">
          ...
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
  let button = getByRole('button');
  let dialogTester = testUtilUser.createTester('Dialog', {root: button, overlayType: 'modal'});

  await dialogTester.open();
  let dialog = dialogTester.getDialog();
  expect(dialog).toBeVisible();

  await dialogTester.close();
  expect(dialog).not.toBeInTheDocument();
});
```

## API

### User

### DialogTester

## Testing FAQ

<PatternTestingFAQ patternName="modal"/>
