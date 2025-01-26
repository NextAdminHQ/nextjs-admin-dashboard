export const UI_ELEMENTS = ["Alerts", "Buttons"]
  .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
  .map((value) => ({
    title: value,
    url: "/ui-elements/" + value.split(" ").join("-").toLowerCase(),
    isPro: !["Alerts", "Buttons"].includes(value),
  }));
