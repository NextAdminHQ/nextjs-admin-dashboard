# RangeCalendar

RangeCalendars display a grid of days in one or more months and allow users to select a
contiguous range of dates.

## Vanilla CSS example

### RangeCalendar.tsx

```tsx
'use client';
import {
  CalendarCell as AriaCalendarCell,
  RangeCalendar as AriaRangeCalendar,
  CalendarHeading,
  Text,
  type DateValue,
  type RangeCalendarProps as AriaRangeCalendarProps,
  type CalendarCellProps
} from 'react-aria-components/RangeCalendar';
import {composeRenderProps} from 'react-aria-components/composeRenderProps';
import {Button} from './Button';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {CalendarGrid} from './Calendar';
import './RangeCalendar.css';

export interface RangeCalendarProps<T extends DateValue> extends AriaRangeCalendarProps<T> {
  errorMessage?: string;
}

export function RangeCalendar<T extends DateValue>({
  errorMessage,
  ...props
}: RangeCalendarProps<T>) {
  let months = props.visibleDuration?.months || 1;
  return (
    <AriaRangeCalendar {...props}>
      <div className="months">
        {Array.from({length: months}, (_, i) => (
          <div key={i} className="month">
            <header>
              {i === 0 && (
                <Button slot="previous" variant="quiet">
                  <ChevronLeft />
                </Button>
              )}
              <CalendarHeading offset={{months: i}} />
              {i === months - 1 && (
                <Button slot="next" variant="quiet">
                  <ChevronRight />
                </Button>
              )}
            </header>
            <CalendarGrid offset={{months: i}}>{date => <CalendarCell date={date} />}</CalendarGrid>
          </div>
        ))}
      </div>
      {errorMessage && <Text slot="errorMessage">{errorMessage}</Text>}
    </AriaRangeCalendar>
  );
}

export {CalendarGrid};
export function CalendarCell(props: CalendarCellProps) {
  return (
    <AriaCalendarCell {...props}>
      {composeRenderProps(
        props.children,
        (
          children,
          {defaultChildren, isHovered, isPressed, isSelectionStart, isSelectionEnd, isDisabled}
        ) => (
          <span
            className="button-base"
            data-variant="quiet"
            data-hovered={isHovered || undefined}
            data-pressed={isPressed || undefined}
            data-selected={isSelectionStart || isSelectionEnd || undefined}
            data-disabled={isDisabled || undefined}>
            {children || defaultChildren}
          </span>
        )
      )}
    </AriaCalendarCell>
  );
}

```

### RangeCalendar.css

```css
@import './theme.css';

.react-aria-RangeCalendar {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
  overflow: auto;
  width: 100%;
  max-width: fit-content;
  font: var(--font-size) system-ui;
  color: var(--text-color);

  .months {
    display: flex;
    gap: var(--spacing-3);
  }

  .month {
    width: calc(var(--spacing-9) * 7);
    min-width: calc(var(--spacing-7) * 7);
    container-type: inline-size;
  }

  header {
    display: flex;
    align-items: center;
    margin: 0 var(--spacing-1) var(--spacing-4) var(--spacing-1);
    min-height: var(--spacing-8);

    .react-aria-CalendarHeading {
      flex: 1;
      margin: 0;
      text-align: center;
      font-size: var(--font-size-lg);
    }
  }

  .react-aria-CalendarGrid {
    border-collapse: collapse;
    border-spacing: 0;
  }

  [slot='errorMessage'] {
    font-size: var(--font-size-sm);
    color: var(--invalid-color);
  }

  .react-aria-CalendarCell {
    margin: 2px 0;
    padding: 0 calc(var(--gap) / 2);
    position: relative;
    z-index: 1;
    outline: none;

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      border-radius: 9999px;
      transition: scale 200ms;
    }

    &[data-selected] {
      border-radius: 0;
      background: var(--button-background);
      border-color: var(--tint-700);
      border-style: solid;
      border-width: 0;
      border-top-width: 0.5px;
      border-bottom-width: 0.5px;
      margin: 1.5px 0;

      @media (forced-colors: active) {
        border-color: Highlight;
      }

      &[data-selection-start],
      &:is(td:first-child > *, [aria-disabled] + td > *) {
        border-start-start-radius: 9999px;
        border-end-start-radius: 9999px;
        border-inline-start-width: 0.5px;
        margin-inline-start: calc(var(--gap) / 2 - 0.5px);
        padding-inline-start: 0;
      }

      &[data-selection-end],
      &:is(td:last-child > *, td:has(+ [aria-disabled]) > *) {
        border-end-end-radius: 9999px;
        border-start-end-radius: 9999px;
        border-inline-end-width: 0.5px;
        margin-inline-end: calc(var(--gap) / 2 - 0.5px);
        padding-inline-end: 0;
      }

      &[data-selection-start],
      &[data-selection-end] {
        z-index: 2;
      }

      &:not([data-selection-start], [data-selection-end]) span {
        color: var(--tint-1200);
        @media (forced-colors: active) {
          color: ButtonText;
        }
      }
    }

    &[data-pressed] {
      scale: 1;
      span {
        scale: 0.9;
      }
    }

    &[data-focus-visible] {
      outline: none;
      z-index: 2;
      span {
        outline: 2px solid var(--focus-ring-color);
        outline-offset: 2px;
      }
    }
  }
}

```

## Tailwind example

### RangeCalendar.tsx

```tsx
'use client';
import React from 'react';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {
  RangeCalendar as AriaRangeCalendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarHeading,
  Text,
  type DateValue,
  type RangeCalendarProps as AriaRangeCalendarProps
} from 'react-aria-components/RangeCalendar';
import {useLocale} from 'react-aria-components/I18nProvider';
import {tv} from 'tailwind-variants';
import {Button} from './Button';
import {CalendarGridHeader} from './Calendar';
import {composeTailwindRenderProps, focusRing} from './utils';

export interface RangeCalendarProps<T extends DateValue> extends AriaRangeCalendarProps<T> {
  errorMessage?: string;
}

const cell = tv({
  extend: focusRing,
  base: 'w-full h-full flex items-center justify-center rounded-full forced-color-adjust-none text-neutral-900 dark:text-neutral-200',
  variants: {
    selectionState: {
      none: 'group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700 group-pressed:bg-neutral-300 dark:group-pressed:bg-neutral-600',
      middle: [
        'group-hover:bg-blue-200 dark:group-hover:bg-blue-900 forced-colors:group-hover:bg-[Highlight]',
        'group-invalid:group-hover:bg-red-200 dark:group-invalid:group-hover:bg-red-900 forced-colors:group-invalid:group-hover:bg-[Mark]',
        'group-pressed:bg-blue-300 dark:group-pressed:bg-blue-800 forced-colors:group-pressed:bg-[Highlight] forced-colors:text-[HighlightText]',
        'group-invalid:group-pressed:bg-red-300 dark:group-invalid:group-pressed:bg-red-800 forced-colors:group-invalid:group-pressed:bg-[Mark]'
      ],
      cap: 'bg-blue-600 group-invalid:bg-red-600 forced-colors:bg-[Highlight] forced-colors:group-invalid:bg-[Mark] text-white forced-colors:text-[HighlightText]'
    },
    isDisabled: {
      true: 'text-neutral-300 dark:text-neutral-600 forced-colors:text-[GrayText]'
    }
  }
});

export function RangeCalendar<T extends DateValue>({
  errorMessage,
  ...props
}: RangeCalendarProps<T>) {
  let {direction} = useLocale();
  let months = props.visibleDuration?.months || 1;
  return (
    <AriaRangeCalendar
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'flex font-sans w-full max-w-fit overflow-auto gap-3'
      )}>
      {Array.from({length: months}, (_, i) => (
        <div key={i} className="@container flex flex-col w-[calc(9*var(--spacing)*7)]">
          <header className="flex items-center mb-4">
            {i === 0 && (
              <Button variant="quiet" slot="previous">
                {direction === 'rtl' ? (
                  <ChevronRight aria-hidden size={18} />
                ) : (
                  <ChevronLeft aria-hidden size={18} />
                )}
              </Button>
            )}
            <CalendarHeading
              offset={{months: i}}
              className="flex-1 font-sans font-semibold [font-variation-settings:normal] text-base text-center mx-2 my-0 text-neutral-900 dark:text-neutral-200"
            />
            {i === months - 1 && (
              <Button variant="quiet" slot="next">
                {direction === 'rtl' ? (
                  <ChevronLeft aria-hidden size={18} />
                ) : (
                  <ChevronRight aria-hidden size={18} />
                )}
              </Button>
            )}
          </header>
          <CalendarGrid offset={{months: i}} className="[&_td]:px-0 [&_td]:py-px border-spacing-0">
            <CalendarGridHeader />
            <CalendarGridBody>
              {date => (
                <CalendarCell
                  date={date}
                  className="group w-[calc(100cqw/7)] aspect-square text-sm outline outline-0 cursor-default outside-month:text-neutral-300 selected:bg-blue-100 dark:selected:bg-blue-700/30 forced-colors:selected:bg-[Highlight] invalid:selected:bg-red-100 dark:invalid:selected:bg-red-700/30 forced-colors:invalid:selected:bg-[Mark] [td:first-child_&]:rounded-s-full selection-start:rounded-s-full [td:last-child_&]:rounded-e-full selection-end:rounded-e-full [-webkit-tap-highlight-color:transparent]">
                  {({
                    formattedDate,
                    isSelected,
                    isSelectionStart,
                    isSelectionEnd,
                    isFocusVisible,
                    isDisabled
                  }) => (
                    <span
                      className={cell({
                        selectionState:
                          isSelected && (isSelectionStart || isSelectionEnd)
                            ? 'cap'
                            : isSelected
                              ? 'middle'
                              : 'none',
                        isDisabled,
                        isFocusVisible
                      })}>
                      {formattedDate}
                    </span>
                  )}
                </CalendarCell>
              )}
            </CalendarGridBody>
          </CalendarGrid>
        </div>
      ))}
      {errorMessage && (
        <Text slot="errorMessage" className="text-sm text-red-600">
          {errorMessage}
        </Text>
      )}
    </AriaRangeCalendar>
  );
}

```

## Value

Use the `value` or `defaultValue` prop to set the selected date range, using objects in the [@internationalized/date](internationalized/date/.md) package. This library supports parsing date strings in multiple formats, manipulation across international calendar systems, time zones, etc.

```tsx
import {parseDate, getLocalTimeZone} from '@internationalized/date';
import {useDateFormatter} from 'react-aria/useDateFormatter';
import {RangeCalendar} from 'vanilla-starter/RangeCalendar';
import {useState} from 'react';

function Example() {
  let [range, setRange] = useState({
    start: parseDate('2025-02-03'),
    end: parseDate('2025-02-12')
  });
  let formatter = useDateFormatter({ dateStyle: 'long' });

  return (
    <>
      <RangeCalendar
        value={range}
        onChange={setRange}
      />
      <p>Selected range: {formatter.formatRange(
        range.start.toDate(getLocalTimeZone()),
        range.end.toDate(getLocalTimeZone())
      )}</p>
    </>
  );
}
```

### International calendars

By default, `RangeCalendar` displays the value using the calendar system for the user's locale. Use `<I18nProvider>` to override the calendar system by setting the [Unicode calendar locale extension](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/calendar#adding_a_calendar_in_the_locale_string). The `onChange` event always receives a date in the same calendar as the `value` or `defaultValue` (Gregorian if no value is provided), regardless of the displayed locale.

```tsx
import {I18nProvider} from 'react-aria-components/I18nProvider';
import {parseDate} from '@internationalized/date';
import {RangeCalendar} from 'vanilla-starter/RangeCalendar';

<I18nProvider>
  <RangeCalendar
    defaultValue={{
      start: parseDate('2025-02-03'),
      end: parseDate('2025-02-12')
    }} />
</I18nProvider>
```

### Custom calendar systems

`RangeCalendar` also supports custom calendar systems that implement custom business rules, for example a fiscal year calendar that follows a [4-5-4 format](https://nrf.com/resources/4-5-4-calendar), where month ranges don't follow the usual Gregorian calendar. See the [@internationalized/date docs](internationalized/date/Calendar.md#custom-calendars) for an example implementation.

```tsx
import type {AnyCalendarDate, Calendar} from '@internationalized/date';
import {CalendarDate, startOfWeek, GregorianCalendar} from '@internationalized/date';
import {RangeCalendar} from 'vanilla-starter/RangeCalendar';

export default function Example() {
  return (
    <RangeCalendar
      firstDayOfWeek="sun"
      createCalendar={() => new Custom454()} />
  );
}

// See @internationalized/date docs linked above.
class Custom454 extends GregorianCalendar {
  // The anchor date, in Gregorian calendar.
  // The anchor date is a date that occurs in the first week of the first month of every fiscal year.
  anchorDate = new CalendarDate(2001, 2, 4);

  private getYear(year: number): [CalendarDate, number[]] {
    let anchor = this.anchorDate.set({year});
    let startOfYear = startOfWeek(anchor, 'en', 'sun');
    let isBigYear = !startOfYear.add({weeks: 53}).compare(anchor.add({years: 1}));
    let weekPattern = [4, 5, 4, 4, 5, 4, 4, 5, 4, 4, 5, isBigYear ? 5 : 4];
    return [startOfYear, weekPattern];
  }

  getDaysInMonth(date: AnyCalendarDate): number {
    let [, weekPattern] = this.getYear(date.year);
    return weekPattern[date.month - 1] * 7;
  }

  fromJulianDay(jd: number): CalendarDate {
    let gregorian = super.fromJulianDay(jd);
    let year = gregorian.year;

    let [monthStart, weekPattern] = this.getYear(year);
    if (gregorian.compare(monthStart) < 0) {
      year--;
      [monthStart, weekPattern] = this.getYear(year);
    }

    for (let month = 1; month <= 12; month++) {
      let weeks = weekPattern[month - 1];
      let nextMonth = monthStart.add({weeks});
      if (nextMonth.compare(gregorian) > 0) {
        let days = gregorian.compare(monthStart);
        return new CalendarDate(this, year, month, days + 1);
      }
      monthStart = nextMonth;
    }

    throw new Error('date not found');
  }

  toJulianDay(date: AnyCalendarDate): number {
    let [monthStart, weekPattern] = this.getYear(date.year);
    for (let month = 1; month < date.month; month++) {
      monthStart = monthStart.add({weeks: weekPattern[month - 1]});
    }

    let gregorian = monthStart.add({days: date.day - 1});
    return super.toJulianDay(gregorian);
  }

  getFormattableMonth(date: AnyCalendarDate): CalendarDate {
    let anchorMonth = this.anchorDate.month - 1;
    let dateMonth = date.month - 1;
    let month = ((anchorMonth + dateMonth) % 12) + 1;
    let year = anchorMonth + dateMonth >= 12 ? date.year + 1 : date.year;
    return new CalendarDate(year, month, 1);
  }

  isEqual(other: Calendar): boolean {
    return other instanceof Custom454 && other.anchorDate.compare(this.anchorDate) === 0;
  }
}
```

## Validation

Use the `minValue` and `maxValue` props to set the valid date range. The `isDateUnavailable` callback prevents certain dates from being selected. Use `allowsNonContiguousRanges` to allow selecting ranges containing unavailable dates. For custom validation rules, set the `isInvalid` prop and the `errorMessage` slot.

```tsx
import {today, getLocalTimeZone} from '@internationalized/date';
import {RangeCalendar} from 'vanilla-starter/RangeCalendar';
import {useState} from 'react';

function Example(props) {
  let now = today(getLocalTimeZone());
  let [range, setRange] = useState({
    start: now.add({days: 6}),
    end: now.add({ days: 14 })
  });
  let disabledRanges = [
    [now, now.add({ days: 5 })],
    [now.add({ days: 15 }), now.add({ days: 17 })],
    [now.add({ days: 23 }), now.add({ days: 24 })]
  ];
  let isInvalid = range.end.compare(range.start) > 7;

  return (
    <RangeCalendar
      {...props}
      aria-label="Trip dates"
      value={range}
      onChange={setRange}
      
      minValue={today(getLocalTimeZone())}
      isDateUnavailable={(date, anchorDate) => (
        (anchorDate && Math.abs(date.compare(anchorDate)) > 7) ||
        disabledRanges.some((interval) =>
          date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0
        )
      )}
      isInvalid={isInvalid}
      errorMessage={isInvalid ? 'Maximum stay duration is 1 week' : undefined} />
  );
}
```

## Display options

Set the `visibleDuration` prop and render multiple `CalendarGrid` elements to display more than one month at a time. The `pageBehavior` prop controls whether pagination advances by a single month or multiple. The `firstDayOfWeek` and `weeksInMonth` props override the locale-specified defaults.

```tsx
import {RangeCalendar} from 'vanilla-starter/RangeCalendar';

// TODO: move this into the starter example.
function Example(props) {
  return (
    <RangeCalendar
      {...props}
      aria-label="Trip dates"
      
    />
  );
}
```

## Controlling the focused date

Use the `focusedValue` or `defaultFocusedValue` prop to control which date is focused. This controls which month is visible. The `onFocusChange` event is called when a date is focused by the user.

```tsx
import {RangeCalendar} from 'vanilla-starter/RangeCalendar';
import {Button} from 'vanilla-starter/Button';
import {CalendarDate, today, getLocalTimeZone} from '@internationalized/date';
import {useState} from 'react';

function Example() {
  let defaultDate = new CalendarDate(2021, 7, 1);
  let [focusedDate, setFocusedDate] = useState(defaultDate);

  return (
    <div>
      <Button
        style={{marginBottom: 20}}
        onPress={() => setFocusedDate(today(getLocalTimeZone()))}>
        Today
      </Button>
      <RangeCalendar
        focusedValue={focusedDate}
        onFocusChange={setFocusedDate}
      />
    </div>
  );
}
```

### Month and year pickers

Use the `<CalendarMonthPicker>` and `<CalendarYearPicker>` components to allow the user to jump to a different month or year. This example uses the render prop function to render a [Select](Select.md).

```tsx
import {RangeCalendar, CalendarMonthPicker, CalendarYearPicker} from 'react-aria-components/RangeCalendar';
import {CalendarGrid, CalendarCell} from 'vanilla-starter/RangeCalendar';
import {Button} from 'vanilla-starter/Button';
import {Select, SelectItem} from 'vanilla-starter/Select';
import {ChevronLeft, ChevronRight} from 'lucide-react';

<RangeCalendar>
  <div className="months">
    <div className="month">
      <header style={{display: 'flex', gap: 4}}>
        <Button slot="previous" variant="quiet">
          <ChevronLeft />
        </Button>
        {/*- begin highlight -*/}
        <CalendarMonthPicker>
          {(props) => (
            <Select {...props}>
              {item => <SelectItem>{item.formatted}</SelectItem>}
            </Select>
          )}
        </CalendarMonthPicker>
        <CalendarYearPicker>
          {(props) => (
            <Select {...props}>
              {item => <SelectItem>{item.formatted}</SelectItem>}
            </Select>
          )}
        </CalendarYearPicker>
        {/*- end highlight -*/}
        <Button slot="next" variant="quiet">
          <ChevronRight />
        </Button>
      </header>
      <CalendarGrid>
        {(date) => <CalendarCell date={date} />}
      </CalendarGrid>
    </div>
  </div>
</RangeCalendar>
```

## API

```tsx
<RangeCalendar>
  <CalendarHeading />
  <CalendarMonthPicker />
  <CalendarYearPicker />
  <Button slot="previous" />
  <Button slot="next" />
  <CalendarGrid>
    <CalendarGridHeader>
      {day => <CalendarHeaderCell />}
    </CalendarGridHeader>
    <CalendarGridBody>
      {date => <CalendarCell date={date} />}
    </CalendarGridBody>
  </CalendarGrid>
  <Text slot="errorMessage" />
</RangeCalendar>
```

### RangeCalendar

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `allowsNonContiguousRanges` | `boolean | undefined` | — | When combined with `isDateUnavailable`, determines whether non-contiguous ranges, i.e. ranges containing unavailable dates, may be selected. |
| `aria-describedby` | `string | undefined` | — | Identifies the element (or elements) that describes the object. |
| `aria-details` | `string | undefined` | — | Identifies the element (or elements) that provide a detailed, extended description for the object. |
| `aria-label` | `string | undefined` | — | Defines a string value that labels the current element. |
| `aria-labelledby` | `string | undefined` | — | Identifies the element (or elements) that labels the current element. |
| `autoFocus` | `boolean | undefined` | false | Whether to automatically focus the calendar when it mounts. |
| `commitBehavior` | `"clear" | "reset" | "select" | undefined` | 'select' | Controls the behavior when a pointer is released outside the calendar or a blur occurs mid selection: - `clear`: clear the currently selected range of dates. - `reset`: reset the selection to the previously selected range of dates. - `select`: select the currently hovered range of dates. |
| `createCalendar` | `((identifier: CalendarIdentifier) => Calendar) | undefined` | — | A function to create a new [Calendar](https://react-spectrum.adobe.com/internationalized/date/Calendar.html) object for a given calendar identifier. If not provided, the `createCalendar` function from `@internationalized/date` will be used. |
| `defaultFocusedValue` | `DateValue | null | undefined` | — | The date that is focused when the calendar first mounts (uncontrolled). |
| `defaultValue` | `RangeValue<T> | null | undefined` | — | The default value (uncontrolled). |
| `errorMessage` | `ReactNode` | — | The error message to display when the calendar is invalid. |
| `firstDayOfWeek` | `"fri" | "mon" | "sat" | "sun" | "thu" | "tue" | "wed" | undefined` | — | The day that starts the week. |
| `focusedValue` | `DateValue | null | undefined` | — | Controls the currently focused date within the calendar. |
| `id` | `string | undefined` | — | The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). |
| `isDateUnavailable` | `((date: DateValue, anchorDate: CalendarDate | null) => boolean) | undefined` | — | Callback that is called for each date of the calendar. If it returns true, then the date is unavailable. The second argument provides the current selection anchor date, if any. This can be used to adjust the available dates based on the user's first selected date. |
| `isDisabled` | `boolean | undefined` | false | Whether the calendar is disabled. |
| `isInvalid` | `boolean | undefined` | — | Whether the current selection is invalid according to application logic. |
| `isReadOnly` | `boolean | undefined` | false | Whether the calendar value is immutable. |
| `maxValue` | `DateValue | null | undefined` | — | The maximum allowed date that a user may select. |
| `minValue` | `DateValue | null | undefined` | — | The minimum allowed date that a user may select. |
| `onChange` | `((value: RangeValue<MappedDateValue<T>>) => void) | undefined` | — | Handler that is called when the value changes. |
| `onFocusChange` | `((date: CalendarDate) => void) | undefined` | — | Handler that is called when the focused date changes. |
| `pageBehavior` | `PageBehavior | undefined` | visible | Controls the behavior of paging. Pagination either works by advancing the visible page by visibleDuration (default) or one unit of visibleDuration. |
| `selectionAlignment` | `"center" | "end" | "start" | undefined` | 'center' | Determines the alignment of the visible months on initial render based on the current selection or current date if there is no selection. |
| `slot` | `string | null | undefined` | — | A slot name for the component. Slots allow the component to receive props from a parent component. An explicit `null` value indicates that the local props completely override all props received from a parent. |
| `styles` | `StylesProp | undefined` | — | Spectrum-defined styles, returned by the `style()` macro. |
| `UNSAFE_className` | `UnsafeClassName | undefined` | — | Sets the CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. Only use as a **last resort**. Use the `style` macro via the `styles` prop instead. |
| `UNSAFE_style` | `CSSProperties | undefined` | — | Sets inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. Only use as a **last resort**. Use the `style` macro via the `styles` prop instead. |
| `value` | `RangeValue<T> | null | undefined` | — | The current value (controlled). |
| `visibleMonths` | `number | undefined` | 1 | The number of months to display at once. |

### CalendarGrid

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `((date: CalendarDate) => ReactElement) | React.ReactElement<React.JSXElementConstructor<any> | unknown, string> | React.ReactElement<React.JSXElementConstructor<any> | unknown, string>[] | undefined` | — | Either a function to render calendar cells for each date in the month, or children containing a `<CalendarGridHeader>`` and `<CalendarGridBody>`when additional customization is needed. |
|`className`|`string | undefined`| 'react-aria-CalendarGrid' | The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. |
|`dir`|`string | undefined`| — |  |
|`hidden`|`boolean | undefined`| — |  |
|`inert`|`boolean | undefined`| — |  |
|`lang`|`string | undefined`| — |  |
|`offset`|`DateDuration | undefined`| — | An offset from the beginning of the visible date range that this CalendarGrid should display. Useful when displaying more than one month at a time. |
|`onAnimationEnd`|`React.AnimationEventHandler<HTMLTableElement> | undefined`| — |  |
|`onAnimationEndCapture`|`React.AnimationEventHandler<HTMLTableElement> | undefined`| — |  |
|`onAnimationIteration`|`React.AnimationEventHandler<HTMLTableElement> | undefined`| — |  |
|`onAnimationIterationCapture`|`React.AnimationEventHandler<HTMLTableElement> | undefined`| — |  |
|`onAnimationStart`|`React.AnimationEventHandler<HTMLTableElement> | undefined`| — |  |
|`onAnimationStartCapture`|`React.AnimationEventHandler<HTMLTableElement> | undefined`| — |  |
|`onAuxClick`|`React.MouseEventHandler<HTMLTableElement> | undefined`| — |  |
|`onAuxClickCapture`|`React.MouseEventHandler<HTMLTableElement> | undefined`| — |  |
|`onClick`|`React.MouseEventHandler<HTMLTableElement> | undefined`| — |  |
|`onClickCapture`|`React.MouseEventHandler<HTMLTableElement> | undefined`| — |  |
|`onContextMenu`|`React.MouseEventHandler<HTMLTableElement> | undefined`| — |  |
|`onContextMenuCapture`|`React.MouseEventHandler<HTMLTableElement> | undefined`| — |  |
|`onDoubleClick`|`React.MouseEventHandler<HTMLTableElement> | undefined`| — |  |
|`onDoubleClickCapture`|`React.MouseEventHandler<HTMLTableElement> | undefined`| — |  |
|`onGotPointerCapture`|`React.PointerEventHandler<HTMLTableElement> | undefined`| — |  |
|`onGotPointerCaptureCapture`|`React.PointerEventHandler<HTMLTableElement> | undefined`| — |  |
|`onLostPointerCapture`|`React.PointerEventHandler<HTMLTableElement> | undefined`| — |  |
|`onLostPointerCaptureCapture`|`React.PointerEventHandler<HTMLTableElement> | undefined`| — |  |
|`onMouseDown`|`React.MouseEventHandler<HTMLTableElement> | undefined`| — |  |
|`onMouseDownCapture`|`React.MouseEventHandler<HTMLTableElement> | undefined`| — |  |
|`onMouseEnter`|`React.MouseEventHandler<HTMLTableElement> | undefined`| — |  |
|`onMouseLeave`|`React.MouseEventHandler<HTMLTableElement> | undefined`| — |  |
|`onMouseMove`|`React.MouseEventHandler<HTMLTableElement> | undefined`| — |  |
|`onMouseMoveCapture`|`React.MouseEventHandler<HTMLTableElement> | undefined`| — |  |
|`onMouseOut`|`React.MouseEventHandler<HTMLTableElement> | undefined`| — |  |
|`onMouseOutCapture`|`React.MouseEventHandler<HTMLTableElement> | undefined`| — |  |
|`onMouseOver`|`React.MouseEventHandler<HTMLTableElement> | undefined`| — |  |
|`onMouseOverCapture`|`React.MouseEventHandler<HTMLTableElement> | undefined`| — |  |
|`onMouseUp`|`React.MouseEventHandler<HTMLTableElement> | undefined`| — |  |
|`onMouseUpCapture`|`React.MouseEventHandler<HTMLTableElement> | undefined`| — |  |
|`onPointerCancel`|`React.PointerEventHandler<HTMLTableElement> | undefined`| — |  |
|`onPointerCancelCapture`|`React.PointerEventHandler<HTMLTableElement> | undefined`| — |  |
|`onPointerDown`|`React.PointerEventHandler<HTMLTableElement> | undefined`| — |  |
|`onPointerDownCapture`|`React.PointerEventHandler<HTMLTableElement> | undefined`| — |  |
|`onPointerEnter`|`React.PointerEventHandler<HTMLTableElement> | undefined`| — |  |
|`onPointerLeave`|`React.PointerEventHandler<HTMLTableElement> | undefined`| — |  |
|`onPointerMove`|`React.PointerEventHandler<HTMLTableElement> | undefined`| — |  |
|`onPointerMoveCapture`|`React.PointerEventHandler<HTMLTableElement> | undefined`| — |  |
|`onPointerOut`|`React.PointerEventHandler<HTMLTableElement> | undefined`| — |  |
|`onPointerOutCapture`|`React.PointerEventHandler<HTMLTableElement> | undefined`| — |  |
|`onPointerOver`|`React.PointerEventHandler<HTMLTableElement> | undefined`| — |  |
|`onPointerOverCapture`|`React.PointerEventHandler<HTMLTableElement> | undefined`| — |  |
|`onPointerUp`|`React.PointerEventHandler<HTMLTableElement> | undefined`| — |  |
|`onPointerUpCapture`|`React.PointerEventHandler<HTMLTableElement> | undefined`| — |  |
|`onScroll`|`React.UIEventHandler<HTMLTableElement> | undefined`| — |  |
|`onScrollCapture`|`React.UIEventHandler<HTMLTableElement> | undefined`| — |  |
|`onTouchCancel`|`React.TouchEventHandler<HTMLTableElement> | undefined`| — |  |
|`onTouchCancelCapture`|`React.TouchEventHandler<HTMLTableElement> | undefined`| — |  |
|`onTouchEnd`|`React.TouchEventHandler<HTMLTableElement> | undefined`| — |  |
|`onTouchEndCapture`|`React.TouchEventHandler<HTMLTableElement> | undefined`| — |  |
|`onTouchMove`|`React.TouchEventHandler<HTMLTableElement> | undefined`| — |  |
|`onTouchMoveCapture`|`React.TouchEventHandler<HTMLTableElement> | undefined`| — |  |
|`onTouchStart`|`React.TouchEventHandler<HTMLTableElement> | undefined`| — |  |
|`onTouchStartCapture`|`React.TouchEventHandler<HTMLTableElement> | undefined`| — |  |
|`onTransitionCancel`|`React.TransitionEventHandler<HTMLTableElement> | undefined`| — |  |
|`onTransitionCancelCapture`|`React.TransitionEventHandler<HTMLTableElement> | undefined`| — |  |
|`onTransitionEnd`|`React.TransitionEventHandler<HTMLTableElement> | undefined`| — |  |
|`onTransitionEndCapture`|`React.TransitionEventHandler<HTMLTableElement> | undefined`| — |  |
|`onTransitionRun`|`React.TransitionEventHandler<HTMLTableElement> | undefined`| — |  |
|`onTransitionRunCapture`|`React.TransitionEventHandler<HTMLTableElement> | undefined`| — |  |
|`onTransitionStart`|`React.TransitionEventHandler<HTMLTableElement> | undefined`| — |  |
|`onTransitionStartCapture`|`React.TransitionEventHandler<HTMLTableElement> | undefined`| — |  |
|`onWheel`|`React.WheelEventHandler<HTMLTableElement> | undefined`| — |  |
|`onWheelCapture`|`React.WheelEventHandler<HTMLTableElement> | undefined`| — |  |
|`render`|`DOMRenderFunction\<"table", undefined> | undefined`| — | Overrides the default DOM element with a custom render function. This allows rendering existing components with built-in styles and behaviors such as router links, animation libraries, and pre-styled components. Requirements: - You must render the expected element type (e.g. if`<button>`is expected, you cannot render an  `<a>`). - Only a single root DOM element can be rendered (no fragments). - You must pass through props and ref to the underlying DOM element, merging with your own prop   as appropriate. |
| `style`|`React.CSSProperties | undefined`| — | The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. |
|`translate`|`"no" | "yes" | undefined`| — |  |
|`weekdayStyle`|`"long" | "narrow" | "short" | undefined\` | 'narrow' | The style of weekday names to display in the calendar grid header, e.g. single letter, abbreviation, or full day name. |

### CalendarGridHeader

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `(day: string) => ReactElement` | — | A function to render a `<CalendarHeaderCell>` for a weekday name. |
| `className` | `string | undefined` | 'react-aria-CalendarGridHeader' | The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. |
| `dir` | `string | undefined` | — |  |
| `hidden` | `boolean | undefined` | — |  |
| `inert` | `boolean | undefined` | — |  |
| `lang` | `string | undefined` | — |  |
| `onAnimationEnd` | `React.AnimationEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onAnimationEndCapture` | `React.AnimationEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onAnimationIteration` | `React.AnimationEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onAnimationIterationCapture` | `React.AnimationEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onAnimationStart` | `React.AnimationEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onAnimationStartCapture` | `React.AnimationEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onAuxClick` | `React.MouseEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onAuxClickCapture` | `React.MouseEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onClick` | `React.MouseEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onClickCapture` | `React.MouseEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onContextMenu` | `React.MouseEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onContextMenuCapture` | `React.MouseEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onDoubleClick` | `React.MouseEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onDoubleClickCapture` | `React.MouseEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onGotPointerCapture` | `React.PointerEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onGotPointerCaptureCapture` | `React.PointerEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onLostPointerCapture` | `React.PointerEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onLostPointerCaptureCapture` | `React.PointerEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onMouseDown` | `React.MouseEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onMouseDownCapture` | `React.MouseEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onMouseEnter` | `React.MouseEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onMouseLeave` | `React.MouseEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onMouseMove` | `React.MouseEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onMouseMoveCapture` | `React.MouseEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onMouseOut` | `React.MouseEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onMouseOutCapture` | `React.MouseEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onMouseOver` | `React.MouseEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onMouseOverCapture` | `React.MouseEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onMouseUp` | `React.MouseEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onMouseUpCapture` | `React.MouseEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onPointerCancel` | `React.PointerEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onPointerCancelCapture` | `React.PointerEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onPointerDown` | `React.PointerEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onPointerDownCapture` | `React.PointerEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onPointerEnter` | `React.PointerEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onPointerLeave` | `React.PointerEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onPointerMove` | `React.PointerEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onPointerMoveCapture` | `React.PointerEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onPointerOut` | `React.PointerEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onPointerOutCapture` | `React.PointerEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onPointerOver` | `React.PointerEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onPointerOverCapture` | `React.PointerEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onPointerUp` | `React.PointerEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onPointerUpCapture` | `React.PointerEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onScroll` | `React.UIEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onScrollCapture` | `React.UIEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onTouchCancel` | `React.TouchEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onTouchCancelCapture` | `React.TouchEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onTouchEnd` | `React.TouchEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onTouchEndCapture` | `React.TouchEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onTouchMove` | `React.TouchEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onTouchMoveCapture` | `React.TouchEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onTouchStart` | `React.TouchEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onTouchStartCapture` | `React.TouchEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onTransitionCancel` | `React.TransitionEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onTransitionCancelCapture` | `React.TransitionEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onTransitionEnd` | `React.TransitionEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onTransitionEndCapture` | `React.TransitionEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onTransitionRun` | `React.TransitionEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onTransitionRunCapture` | `React.TransitionEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onTransitionStart` | `React.TransitionEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onTransitionStartCapture` | `React.TransitionEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onWheel` | `React.WheelEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onWheelCapture` | `React.WheelEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `render` | `DOMRenderFunction<"thead", undefined> | undefined` | — | Overrides the default DOM element with a custom render function. This allows rendering existing components with built-in styles and behaviors such as router links, animation libraries, and pre-styled components. Requirements: - You must render the expected element type (e.g. if `<button>` is expected, you cannot render an   `<a>`). - Only a single root DOM element can be rendered (no fragments). - You must pass through props and ref to the underlying DOM element, merging with your own prop   as appropriate. |
| `style` | `React.CSSProperties | undefined` | — | The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. |
| `translate` | `"no" | "yes" | undefined` | — |  |

### CalendarHeaderCell

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | — | The children of the component. |
| `className` | `string | undefined` | 'react-aria-CalendarHeaderCell' | The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. |
| `dir` | `string | undefined` | — |  |
| `hidden` | `boolean | undefined` | — |  |
| `id` | `string | undefined` | — | The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). |
| `inert` | `boolean | undefined` | — |  |
| `lang` | `string | undefined` | — |  |
| `onAnimationEnd` | `React.AnimationEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onAnimationEndCapture` | `React.AnimationEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onAnimationIteration` | `React.AnimationEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onAnimationIterationCapture` | `React.AnimationEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onAnimationStart` | `React.AnimationEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onAnimationStartCapture` | `React.AnimationEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onAuxClick` | `React.MouseEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onAuxClickCapture` | `React.MouseEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onClick` | `React.MouseEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onClickCapture` | `React.MouseEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onContextMenu` | `React.MouseEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onContextMenuCapture` | `React.MouseEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onDoubleClick` | `React.MouseEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onDoubleClickCapture` | `React.MouseEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onGotPointerCapture` | `React.PointerEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onGotPointerCaptureCapture` | `React.PointerEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onLostPointerCapture` | `React.PointerEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onLostPointerCaptureCapture` | `React.PointerEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onMouseDown` | `React.MouseEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onMouseDownCapture` | `React.MouseEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onMouseEnter` | `React.MouseEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onMouseLeave` | `React.MouseEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onMouseMove` | `React.MouseEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onMouseMoveCapture` | `React.MouseEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onMouseOut` | `React.MouseEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onMouseOutCapture` | `React.MouseEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onMouseOver` | `React.MouseEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onMouseOverCapture` | `React.MouseEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onMouseUp` | `React.MouseEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onMouseUpCapture` | `React.MouseEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onPointerCancel` | `React.PointerEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onPointerCancelCapture` | `React.PointerEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onPointerDown` | `React.PointerEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onPointerDownCapture` | `React.PointerEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onPointerEnter` | `React.PointerEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onPointerLeave` | `React.PointerEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onPointerMove` | `React.PointerEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onPointerMoveCapture` | `React.PointerEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onPointerOut` | `React.PointerEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onPointerOutCapture` | `React.PointerEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onPointerOver` | `React.PointerEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onPointerOverCapture` | `React.PointerEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onPointerUp` | `React.PointerEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onPointerUpCapture` | `React.PointerEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onScroll` | `React.UIEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onScrollCapture` | `React.UIEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onTouchCancel` | `React.TouchEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onTouchCancelCapture` | `React.TouchEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onTouchEnd` | `React.TouchEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onTouchEndCapture` | `React.TouchEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onTouchMove` | `React.TouchEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onTouchMoveCapture` | `React.TouchEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onTouchStart` | `React.TouchEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onTouchStartCapture` | `React.TouchEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onTransitionCancel` | `React.TransitionEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onTransitionCancelCapture` | `React.TransitionEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onTransitionEnd` | `React.TransitionEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onTransitionEndCapture` | `React.TransitionEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onTransitionRun` | `React.TransitionEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onTransitionRunCapture` | `React.TransitionEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onTransitionStart` | `React.TransitionEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onTransitionStartCapture` | `React.TransitionEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onWheel` | `React.WheelEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `onWheelCapture` | `React.WheelEventHandler<HTMLTableHeaderCellElement> | undefined` | — |  |
| `render` | `DOMRenderFunction<"th", undefined> | undefined` | — | Overrides the default DOM element with a custom render function. This allows rendering existing components with built-in styles and behaviors such as router links, animation libraries, and pre-styled components. Requirements: - You must render the expected element type (e.g. if `<button>` is expected, you cannot render an   `<a>`). - Only a single root DOM element can be rendered (no fragments). - You must pass through props and ref to the underlying DOM element, merging with your own prop   as appropriate. |
| `style` | `React.CSSProperties | undefined` | — | The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. |
| `translate` | `"no" | "yes" | undefined` | — |  |

### CalendarGridBody

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `(date: CalendarDate) => ReactElement` | — | A function to render a `<CalendarCell>` for a given date. |
| `className` | `string | undefined` | 'react-aria-CalendarGridBody' | The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. |
| `dir` | `string | undefined` | — |  |
| `hidden` | `boolean | undefined` | — |  |
| `inert` | `boolean | undefined` | — |  |
| `lang` | `string | undefined` | — |  |
| `onAnimationEnd` | `React.AnimationEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onAnimationEndCapture` | `React.AnimationEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onAnimationIteration` | `React.AnimationEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onAnimationIterationCapture` | `React.AnimationEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onAnimationStart` | `React.AnimationEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onAnimationStartCapture` | `React.AnimationEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onAuxClick` | `React.MouseEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onAuxClickCapture` | `React.MouseEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onClick` | `React.MouseEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onClickCapture` | `React.MouseEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onContextMenu` | `React.MouseEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onContextMenuCapture` | `React.MouseEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onDoubleClick` | `React.MouseEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onDoubleClickCapture` | `React.MouseEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onGotPointerCapture` | `React.PointerEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onGotPointerCaptureCapture` | `React.PointerEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onLostPointerCapture` | `React.PointerEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onLostPointerCaptureCapture` | `React.PointerEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onMouseDown` | `React.MouseEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onMouseDownCapture` | `React.MouseEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onMouseEnter` | `React.MouseEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onMouseLeave` | `React.MouseEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onMouseMove` | `React.MouseEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onMouseMoveCapture` | `React.MouseEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onMouseOut` | `React.MouseEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onMouseOutCapture` | `React.MouseEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onMouseOver` | `React.MouseEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onMouseOverCapture` | `React.MouseEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onMouseUp` | `React.MouseEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onMouseUpCapture` | `React.MouseEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onPointerCancel` | `React.PointerEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onPointerCancelCapture` | `React.PointerEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onPointerDown` | `React.PointerEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onPointerDownCapture` | `React.PointerEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onPointerEnter` | `React.PointerEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onPointerLeave` | `React.PointerEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onPointerMove` | `React.PointerEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onPointerMoveCapture` | `React.PointerEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onPointerOut` | `React.PointerEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onPointerOutCapture` | `React.PointerEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onPointerOver` | `React.PointerEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onPointerOverCapture` | `React.PointerEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onPointerUp` | `React.PointerEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onPointerUpCapture` | `React.PointerEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onScroll` | `React.UIEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onScrollCapture` | `React.UIEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onTouchCancel` | `React.TouchEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onTouchCancelCapture` | `React.TouchEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onTouchEnd` | `React.TouchEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onTouchEndCapture` | `React.TouchEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onTouchMove` | `React.TouchEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onTouchMoveCapture` | `React.TouchEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onTouchStart` | `React.TouchEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onTouchStartCapture` | `React.TouchEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onTransitionCancel` | `React.TransitionEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onTransitionCancelCapture` | `React.TransitionEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onTransitionEnd` | `React.TransitionEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onTransitionEndCapture` | `React.TransitionEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onTransitionRun` | `React.TransitionEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onTransitionRunCapture` | `React.TransitionEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onTransitionStart` | `React.TransitionEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onTransitionStartCapture` | `React.TransitionEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onWheel` | `React.WheelEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `onWheelCapture` | `React.WheelEventHandler<HTMLTableSectionElement> | undefined` | — |  |
| `render` | `DOMRenderFunction<"tbody", undefined> | undefined` | — | Overrides the default DOM element with a custom render function. This allows rendering existing components with built-in styles and behaviors such as router links, animation libraries, and pre-styled components. Requirements: - You must render the expected element type (e.g. if `<button>` is expected, you cannot render an   `<a>`). - Only a single root DOM element can be rendered (no fragments). - You must pass through props and ref to the underlying DOM element, merging with your own prop   as appropriate. |
| `style` | `React.CSSProperties | undefined` | — | The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. |
| `translate` | `"no" | "yes" | undefined` | — |  |

### CalendarCell

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ChildrenOrFunction<CalendarCellRenderProps>` | — | The children of the component. A function may be provided to alter the children based on component state. |
| `className` | `ClassNameOrFunction<CalendarCellRenderProps> | undefined` | 'react-aria-CalendarCell' | The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state. |
| `date` | `CalendarDate` | — | The date to render in the cell. |
| `dir` | `string | undefined` | — |  |
| `hidden` | `boolean | undefined` | — |  |
| `inert` | `boolean | undefined` | — |  |
| `lang` | `string | undefined` | — |  |
| `onAnimationEnd` | `React.AnimationEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onAnimationEndCapture` | `React.AnimationEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onAnimationIteration` | `React.AnimationEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onAnimationIterationCapture` | `React.AnimationEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onAnimationStart` | `React.AnimationEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onAnimationStartCapture` | `React.AnimationEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onAuxClick` | `React.MouseEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onAuxClickCapture` | `React.MouseEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onClick` | `React.MouseEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onClickCapture` | `React.MouseEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onContextMenu` | `React.MouseEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onContextMenuCapture` | `React.MouseEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onDoubleClick` | `React.MouseEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onDoubleClickCapture` | `React.MouseEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onGotPointerCapture` | `React.PointerEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onGotPointerCaptureCapture` | `React.PointerEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onHoverChange` | `((isHovering: boolean) => void) | undefined` | — | Handler that is called when the hover state changes. |
| `onHoverEnd` | `((e: HoverEvent) => void) | undefined` | — | Handler that is called when a hover interaction ends. |
| `onHoverStart` | `((e: HoverEvent) => void) | undefined` | — | Handler that is called when a hover interaction starts. |
| `onLostPointerCapture` | `React.PointerEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onLostPointerCaptureCapture` | `React.PointerEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onMouseDown` | `React.MouseEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onMouseDownCapture` | `React.MouseEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onMouseEnter` | `React.MouseEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onMouseLeave` | `React.MouseEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onMouseMove` | `React.MouseEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onMouseMoveCapture` | `React.MouseEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onMouseOut` | `React.MouseEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onMouseOutCapture` | `React.MouseEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onMouseOver` | `React.MouseEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onMouseOverCapture` | `React.MouseEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onMouseUp` | `React.MouseEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onMouseUpCapture` | `React.MouseEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onPointerCancel` | `React.PointerEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onPointerCancelCapture` | `React.PointerEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onPointerDown` | `React.PointerEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onPointerDownCapture` | `React.PointerEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onPointerEnter` | `React.PointerEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onPointerLeave` | `React.PointerEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onPointerMove` | `React.PointerEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onPointerMoveCapture` | `React.PointerEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onPointerOut` | `React.PointerEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onPointerOutCapture` | `React.PointerEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onPointerOver` | `React.PointerEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onPointerOverCapture` | `React.PointerEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onPointerUp` | `React.PointerEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onPointerUpCapture` | `React.PointerEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onScroll` | `React.UIEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onScrollCapture` | `React.UIEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onTouchCancel` | `React.TouchEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onTouchCancelCapture` | `React.TouchEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onTouchEnd` | `React.TouchEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onTouchEndCapture` | `React.TouchEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onTouchMove` | `React.TouchEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onTouchMoveCapture` | `React.TouchEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onTouchStart` | `React.TouchEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onTouchStartCapture` | `React.TouchEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onTransitionCancel` | `React.TransitionEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onTransitionCancelCapture` | `React.TransitionEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onTransitionEnd` | `React.TransitionEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onTransitionEndCapture` | `React.TransitionEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onTransitionRun` | `React.TransitionEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onTransitionRunCapture` | `React.TransitionEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onTransitionStart` | `React.TransitionEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onTransitionStartCapture` | `React.TransitionEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onWheel` | `React.WheelEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `onWheelCapture` | `React.WheelEventHandler<HTMLTableCellElement> | undefined` | — |  |
| `render` | `DOMRenderFunction<"div", CalendarCellRenderProps> | undefined` | — | Overrides the default DOM element with a custom render function. This allows rendering existing components with built-in styles and behaviors such as router links, animation libraries, and pre-styled components. Requirements: - You must render the expected element type (e.g. if `<button>` is expected, you cannot render an   `<a>`). - Only a single root DOM element can be rendered (no fragments). - You must pass through props and ref to the underlying DOM element, merging with your own prop   as appropriate. |
| `style` | `(((values: CalendarCellRenderProps & { defaultStyle: React.CSSProperties; }) => React.CSSProperties | React.CSSProperties | undefined)) | undefined` | — | The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state. |
| `translate` | `"no" | "yes" | undefined` | — |  |

### CalendarHeading

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
| `children` | `React.ReactNode` | — |  |
| `className` | `string | undefined` | 'react-aria-CalendarHeading' | The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. |
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
| `format` | `CalendarHeadingFormatOptions | undefined` | — | The format of the month heading. |
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
| `level` | `number | undefined` | 3 | The heading level. |
| `nonce` | `string | undefined` | — |  |
| `offset` | `DateDuration | undefined` | 0 | The number of months from the start of the visible range to display. |
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
| `popover` | `"" | "auto" | "manual" | undefined` | — |  |
| `popoverTarget` | `string | undefined` | — |  |
| `popoverTargetAction` | `"hide" | "show" | "toggle" | undefined` | — |  |
| `prefix` | `string | undefined` | — |  |
| `property` | `string | undefined` | — |  |
| `radioGroup` | `string | undefined` | — |  |
| `rel` | `string | undefined` | — |  |
| `render` | `DOMRenderFunction<"h1", undefined> | undefined` | — | Overrides the default DOM element with a custom render function. This allows rendering existing components with built-in styles and behaviors such as router links, animation libraries, and pre-styled components. Requirements: - You must render the expected element type (e.g. if `<button>` is expected, you cannot render an   `<a>`). - Only a single root DOM element can be rendered (no fragments). - You must pass through props and ref to the underlying DOM element, merging with your own prop   as appropriate. |
| `resource` | `string | undefined` | — |  |
| `results` | `number | undefined` | — |  |
| `rev` | `string | undefined` | — |  |
| `role` | `React.AriaRole | undefined` | — |  |
| `security` | `string | undefined` | — |  |
| `slot` | `string | undefined` | — |  |
| `spellCheck` | `(boolean | "true" | "false") | undefined` | — |  |
| `style` | `React.CSSProperties | undefined` | — |  |
| `suppressContentEditableWarning` | `boolean | undefined` | — |  |
| `suppressHydrationWarning` | `boolean | undefined` | — |  |
| `tabIndex` | `number | undefined` | — |  |
| `title` | `string | undefined` | — |  |
| `translate` | `"no" | "yes" | undefined` | — |  |
| `typeof` | `string | undefined` | — |  |
| `unselectable` | `"off" | "on" | undefined` | — |  |
| `vocab` | `string | undefined` | — |  |

### CalendarMonthPicker

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `(renderProps: CalendarMonthPickerAria) => JSX.Element` | — | A function to render the month picker. |
| `format` | `"2-digit" | "long" | "narrow" | "numeric" | "short" | undefined` | — | The format of the month. |

### CalendarYearPicker

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `(renderProps: CalendarYearPickerAria) => JSX.Element` | — | A function to render the year picker. |
| `format` | `CalendarYearPickerFormatOptions | undefined` | — | The format to display. |
| `visibleYears` | `number | undefined` | 20 | The number of years to display. |
