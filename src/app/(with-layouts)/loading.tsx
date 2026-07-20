import { Spinner } from "@/components/tailgrids/core/spinner";

export default function Loading() {
  return (
    <>
      <Spinner className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    </>
  );
}
