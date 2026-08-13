---
name: "react-aria"
description: "Build accessible UI components with React Aria Components. Use when developers mention React Aria, react-aria-components, accessible components, or need unstyled accessible primitives. Provides documentation for building custom accessible UI with hooks and components."
license: "Apache-2.0"
compatibility: "Requires React project with react-aria-components installed."
metadata:
  author: "Adobe"
  website: "https://react-aria.adobe.com/"
---

# React Aria Components

## Test utilities

`@react-aria/test-utils` provides ARIA pattern testers that simulate mouse, keyboard, and touch interactions for components built with React Aria Components.

### Installation

```bash
npm install @react-aria/test-utils --save-dev
```

### Core pattern

External consumers should import from `@react-aria/test-utils`.

Initialize a `User` once per test file. Call `createTester` to get a tester for a specific ARIA pattern, then call tester methods to simulate interactions.

```ts
import {User} from '@react-aria/test-utils';

// Provide whatever method of advancing timers you use in your test, this example assumes Jest with fake timers.
// 'interactionType' specifies what mode of interaction should be simulated by the tester
// 'advanceTimer' is used by the tester to advance the timers in the tests for specific interactions (e.g. long press)
let testUtilUser = new User({interactionType: 'mouse', advanceTimer: jest.advanceTimersByTime});

it('my test case', async function () {
  // Render your test component/app
  let {getByTestId} = render();
  // Initialize the table tester via providing the 'Table' pattern name and the root element of said table
  let tableTester = testUtilUser.createTester('Table', {root: getByTestId('test_table')});
  expect(tableTester.getSelectedRows()).toHaveLength(0);

  await tableTester.toggleSelectAll();
  expect(tableTester.getSelectedRows()).toHaveLength(10);
  ...
});
```

Set `interactionType` to `'mouse'`, `'keyboard'`, or `'touch'`. Override per tester via `createTester(..., {interactionType})` or per method call.

When using fake timers, pass `advanceTimer: jest.advanceTimersByTime` and flush timers after each test:

```ts
afterEach(() => {
  act(() => jest.runAllTimers());
});
```

### Tips and Tricks
- The testers typically offers these things: a way to simulate common user interactions for the given component via a specified user modality (e.g. using mouse vs keyboard to toggle a menu), a way to get the various common elements that make up the component (e.g. the rows in a table), and a way to query the state of the component (e.g. get the selected rows in a table). Prefer using the testers for these use cases so that the user doesn't need to know what specific roles/elements/etc to target in their tests.
- You can still simulate interactions manually in your test alongside the utilities provided by the tester. This can come in handy if you find that the tester doesn't cover a specific user flow or if one of its utilities isn't quite working as expected. After simulating your interaction, you can still
use the tester to query for the component's state or trigger a different interaction utility.
- Mouse drag interactions, simulated scrolling, and other mock reliant interactions are not available in these test utils since they depend heavily on how the user mocks things like clientHeight/Width/etc in their tests. These interactions need to be simulated manually by the user.
- Some testers may support the notion of "long press" for certain interactions (e.g. long pressing a button to trigger its menu). To simulate this, you will need mock PointerEvent globally (see the installPointerEvent util) and provide a way to advance timers to the User via `advanceTimer`.
- These test utils are compatible with not only JSDOM unit tests but browser tests as well (e.g. vitest-browser-react).
- Methods that accept a target (`option`, `row`, `column`, `checkbox`, `radio`, `tab`) take a `number` (index), `string` (text content), or `HTMLElement`. Use the tester's own query methods (e.g. `getRows()`, `getOptions()`) to obtain an `HTMLElement` when you need one.
- Link navigation assertions must be simulated manually. The testers do not assert navigation side effects.

### When not to use the testers

Skip the testers and write manual interactions for the following cases:

- When testing a Menu or Dialog rendered without a trigger, or when testing interactive elements embedded inside rows or cells (e.g. an ActionMenu inside a TreeView row). The testers assume a trigger exists and do not reach into row/cell content.
- tests that verify exact focus order, arrow key cycling, or specific modifier key behavior. Use `fireEvent.keyDown` or `userEvent.keyboard` directly so the test is actually testing the desired keyboard flow.
- when `isOpen` or `defaultOpen` is set, `open()` will no-op but the tester's `root` must still resolve to the trigger element. Use `getByLabelText` or `getByTestId` rather than `getByRole('button')` to avoid ambiguity when multiple buttons are in the DOM.
- testing `isDismissible`, `isKeyboardDismissDisabled`, or outside-click behavior. Use `userEvent.click(document.body)` or `user.keyboard('[Escape]')` directly and assert the expected state afterwards.
- when a Dialog closes via an action button (not the explicit close/dismiss button) you should instead click that button manually, then use `dialogTester.getDialog()` to assert whether the dialog is still present.

### Draggable handle components

Components with draggable handles (Slider, ColorArea, ColorSlider, ColorWheel) need `getBoundingClientRect` mocked so move calculations work:

```ts
import {installMouseEvent} from '@react-aria/test-utils';
installMouseEvent();

beforeAll(() => {
  jest.spyOn(window.HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(
    () => ({top: 0, left: 0, width: 100, height: 10, bottom: 10, right: 100})
  );
});
```

### Available testers

| Pattern name | Component | Key methods |
|---|---|---|
| `'CheckboxGroup'` | CheckboxGroup | `getCheckboxGroup()`, `getCheckboxes()`, `getSelectedCheckboxes()`, `toggleCheckbox({checkbox})` |
| `'ComboBox'` | ComboBox | `getCombobox()`, `getListbox()`, `getOptions()`, `open()`, `toggleOptionSelection({option})` |
| `'Dialog'` | Modal, Popover | `getTrigger()`, `getDialog()`, `open()`, `close()` — pass `overlayType: 'modal'` or `'popover'` to `createTester` |
| `'GridList'` | GridList | `getGridlist()`, `getRows()`, `getSelectedRows()`, `toggleRowSelection({row})`, `triggerRowAction({row})` |
| `'ListBox'` | ListBox | `getListbox()`, `getOptions()`, `getSelectedOptions()`, `toggleOptionSelection({option})`, `triggerOptionAction({option})` |
| `'Menu'` | Menu | `getTrigger()`, `getMenu()`, `getOptions()`, `open()`, `toggleOptionSelection({option})`, `openSubmenu({submenuTrigger})`, `close()` |
| `'RadioGroup'` | RadioGroup | `getRadioGroup()`, `getRadios()`, `getSelectedRadio()`, `triggerRadio({radio})` |
| `'Select'` | Select | `getTrigger()`, `getListbox()`, `getOptions()`, `toggleOptionSelection({option})` |
| `'Table'` | Table | `getTable()`, `getRows()`, `getFooterRows()`, `getColumns()`, `getSelectedRows()`, `toggleRowSelection({row})`, `toggleSort({column})`, `triggerRowAction({row})` |
| `'Tabs'` | Tabs | `getTablist()`, `getTabs()`, `getTabpanels()`, `getSelectedTab()`, `triggerTab({tab})` |
| `'Tree'` | Tree | `getTree()`, `getRows()`, `getSelectedRows()`, `toggleRowSelection({row})`, `toggleRowExpansion({row})`, `triggerRowAction({row})` |

### Per-component reference

- [CheckboxGroup](references/testing/CheckboxGroup/testing.md)
- [ComboBox](references/testing/ComboBox/testing.md)
- [GridList](references/testing/GridList/testing.md)
- [ListBox](references/testing/ListBox/testing.md)
- [Menu](references/testing/Menu/testing.md)
- [Modal](references/testing/Modal/testing.md)
- [Popover](references/testing/Popover/testing.md)
- [RadioGroup](references/testing/RadioGroup/testing.md)
- [Select](references/testing/Select/testing.md)
- [Table](references/testing/Table/testing.md)
- [Tabs](references/testing/Tabs/testing.md)
- [Tree](references/testing/Tree/testing.md)

## Documentation Structure

The `references/` directory contains detailed documentation organized as follows:

### Guides
- [Collections](references/guides/collections.md)
- [Customization](references/guides/customization.md)
- [Drag and Drop](references/guides/dnd.md)
- [Forms](references/guides/forms.md)
- [Framework setup](references/guides/frameworks.md)
- [Getting started](references/guides/getting-started.md)
- [Quality](references/guides/quality.md)
- [Selection](references/guides/selection.md)
- [Styling](references/guides/styling.md)
- [Testing](references/guides/testing.md)
- [Working with AI](references/guides/ai.md)

### Components

Component documentation is in `references/components/` — one Markdown file per component (e.g. `references/components/Button.md`). Read the file for a component when you need its API, props, examples, or accessibility notes.

Available components: Autocomplete, Breadcrumbs, Button, Calendar, Checkbox, CheckboxGroup, ColorArea, ColorField, ColorPicker, ColorSlider, ColorSwatch, ColorSwatchPicker, ColorWheel, ComboBox, DateField, DatePicker, DateRangePicker, Disclosure, DisclosureGroup, DropZone, FileTrigger, Form, GridList, Group, Link, ListBox, Menu, Meter, Modal, NumberField, Popover, ProgressBar, RadioGroup, RangeCalendar, SearchField, Select, Separator, Slider, Switch, Table, Tabs, TagGroup, TextField, TimeField, Toast, ToggleButton, ToggleButtonGroup, Toolbar, Tooltip, Tree, Virtualizer.

### Interactions
- [FocusRing](references/interactions/FocusRing.md): A utility component that applies a CSS class when an element has keyboard focus.
- [FocusScope](references/interactions/FocusScope.md): A FocusScope manages focus for its descendants. It supports containing focus inside
- [useClipboard](references/interactions/useClipboard.md): Handles clipboard interactions for a focusable element. Supports items of multiple
- [useDrag](references/interactions/useDrag.md): Handles drag interactions for an element, with support for traditional mouse and touch
- [useDrop](references/interactions/useDrop.md): Handles drop interactions for an element, with support for traditional mouse and touch
- [useFocus](references/interactions/useFocus.md): Handles focus events for the immediate target.
- [useFocusRing](references/interactions/useFocusRing.md): Determines whether a focus ring should be shown to indicate keyboard focus.
- [useFocusVisible](references/interactions/useFocusVisible.md): Manages focus visible state for the page, and subscribes individual components for updates.
- [useFocusWithin](references/interactions/useFocusWithin.md): Handles focus events for the target and its descendants.
- [useHover](references/interactions/useHover.md): Handles pointer hover interactions for an element. Normalizes behavior
- [useKeyboard](references/interactions/useKeyboard.md): Handles keyboard interactions for a focusable element.
- [useLandmark](references/interactions/useLandmark.md): Provides landmark navigation in an application. Call this with a role and label to register a
- [useLongPress](references/interactions/useLongPress.md): Handles long press interactions across mouse and touch devices. Supports a customizable time
- [useMove](references/interactions/useMove.md): Handles move interactions across mouse, touch, and keyboard, including dragging with
- [usePress](references/interactions/usePress.md): Handles press interactions across mouse, touch, keyboard, and screen readers.

### Utilities
- [I18nProvider](references/utilities/I18nProvider.md): Provides the locale for the application to all child components.
- [mergeProps](references/utilities/mergeProps.md): Merges multiple props objects together. Event handlers are chained,
- [PortalProvider](references/utilities/PortalProvider.md): Sets the portal container for all overlay elements rendered by its children.
- [SSRProvider](references/utilities/SSRProvider.md): When using SSR with React Aria in React 16 or 17, applications must be wrapped in an SSRProvider.
- [useCollator](references/utilities/useCollator.md): Provides localized string collation for the current locale. Automatically updates when the locale
- [useDateFormatter](references/utilities/useDateFormatter.md): Provides localized date formatting for the current locale. Automatically updates when the locale
- [useField](references/utilities/useField.md): Provides the accessibility implementation for input fields. Fields accept user input, gain
- [useFilter](references/utilities/useFilter.md): Provides localized string search functionality that is useful for filtering or matching items in
- [useId](references/utilities/useId.md): If a default is not provided, generate an id.
- [useIsSSR](references/utilities/useIsSSR.md): Returns whether the component is currently being server side rendered or
- [useLabel](references/utilities/useLabel.md): Provides the accessibility implementation for labels and their associated elements.
- [useLocale](references/utilities/useLocale.md): Returns the current locale and layout direction.
- [useNumberFormatter](references/utilities/useNumberFormatter.md): Provides localized number formatting for the current locale. Automatically updates when the
- [useObjectRef](references/utilities/useObjectRef.md): Offers an object ref for a given callback ref or an object ref. Especially
- [VisuallyHidden](references/utilities/VisuallyHidden.md): VisuallyHidden hides its children visually, while keeping content visible

### Internationalization
- [Calendar](references/internationalized/date/Calendar.md)
- [CalendarDate](references/internationalized/date/CalendarDate.md)
- [CalendarDateTime](references/internationalized/date/CalendarDateTime.md)
- [DateFormatter](references/internationalized/date/DateFormatter.md)
- [Internationalized Date](references/internationalized/date/index.md)
- [Internationalized Number](references/internationalized/number/index.md)
- [NumberFormatter](references/internationalized/number/NumberFormatter.md)
- [NumberParser](references/internationalized/number/NumberParser.md)
- [Time](references/internationalized/date/Time.md)
- [ZonedDateTime](references/internationalized/date/ZonedDateTime.md)
