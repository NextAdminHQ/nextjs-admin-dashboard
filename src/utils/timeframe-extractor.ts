export function createTimeFrameExtractor(
  selectedTimeFrame: string | undefined,
) {
  return (sectionKey: string) => {
    return selectedTimeFrame
      ?.split(",")
      .find((value) => value.includes(sectionKey));
  };
}
