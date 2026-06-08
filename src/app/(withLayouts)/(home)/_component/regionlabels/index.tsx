"use client";

import dynamic from "next/dynamic";

const RegionLabelsMap = dynamic(() => import("./Map"), { ssr: false });

export default function RegionLabels() {
  return <RegionLabelsMap />;
}
