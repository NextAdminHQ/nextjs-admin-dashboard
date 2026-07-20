"use client";

import dynamic from "next/dynamic";

const RegionLabelsMap = dynamic(() => import("./map"), { ssr: false });

export default function RegionLabels() {
  return <RegionLabelsMap />;
}
