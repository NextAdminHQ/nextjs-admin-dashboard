# useDateFormatter

Provides localized date formatting for the current locale. Automatically updates when the locale
changes, and handles caching of the date formatter for performance.

## Introduction

`useDateFormatter` wraps a builtin browser [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)
object to provide a React Hook that integrates with the i18n system in React Aria. It handles formatting dates for the current locale,
updating when the locale changes, and caching of date formatters for performance. See the
[Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) docs for
information on formatting options.

## Example

This example displays the current date for two locales: USA, and Russia. Two instances of the `CurrentDate` component are rendered,
using the [I18nProvider](I18nProvider.md) to specify the locale to display.

```tsx
'use client';
import {I18nProvider} from 'react-aria/I18nProvider';
import {useDateFormatter} from 'react-aria/useDateFormatter';

function CurrentDate() {
  let formatter = useDateFormatter();

  return (
    <p>{formatter.format(new Date())}</p>
  );
}

<>
  <I18nProvider locale="en-US">
    <CurrentDate />
  </I18nProvider>
  <I18nProvider locale="ru-RU">
    <CurrentDate />
  </I18nProvider>
</>
```

## API

<FunctionAPI
  function={docs.exports.useDateFormatter}
  links={docs.links}
/>

### DateFormatterOptions

| Name | Type | Description |
|------|------|-------------|
| `calendar` | `string | undefined` | — |
| `dateStyle` | `"full" | "long" | "medium" | "short" | undefined` | — |
| `day` | `"2-digit" | "numeric" | undefined` | — |
| `dayPeriod` | `"long" | "narrow" | "short" | undefined` | — |
| `era` | `"long" | "narrow" | "short" | undefined` | — |
| `formatMatcher` | `"basic" | "best fit" | undefined` | — |
| `fractionalSecondDigits` | `1 | 2 | 3 | undefined` | — |
| `hour` | `"2-digit" | "numeric" | undefined` | — |
| `hour12` | `boolean | undefined` | — |
| `hourCycle` | `"h11" | "h12" | "h23" | "h24" | undefined` | — |
| `localeMatcher` | `"best fit" | "lookup" | undefined` | — |
| `minute` | `"2-digit" | "numeric" | undefined` | — |
| `month` | `"2-digit" | "long" | "narrow" | "numeric" | "short" | undefined` | — |
| `numberingSystem` | `string | undefined` | — |
| `second` | `"2-digit" | "numeric" | undefined` | — |
| `timeStyle` | `"full" | "long" | "medium" | "short" | undefined` | — |
| `timeZone` | `string | undefined` | — |
| `timeZoneName` | `"long" | "longGeneric" | "longOffset" | "short" | "shortGeneric" | "shortOffset" | undefined` | — |
| `weekday` | `"long" | "narrow" | "short" | undefined` | — |
| `year` | `"2-digit" | "numeric" | undefined` | — |

### DateFormatter
