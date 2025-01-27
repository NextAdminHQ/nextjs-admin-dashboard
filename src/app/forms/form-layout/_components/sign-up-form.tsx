import InputGroup from "@/components/FormElements/InputGroup";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";

export function SignUpForm() {
  return (
    <ShowcaseSection title="Sign Up Form" className="!p-6.5">
      <form action="#">
        <InputGroup
          label="Name"
          type="text"
          placeholder="Enter full name"
          className="mb-4.5"
        />

        <InputGroup
          label="Email"
          type="email"
          placeholder="Enter email address"
          className="mb-4.5"
        />

        <InputGroup
          label="Password"
          type="password"
          placeholder="Enter password"
          className="mb-4.5"
        />

        <InputGroup
          label="Re-type Password"
          type="password"
          placeholder="Re-type password"
          className="mb-5.5"
        />

        <button className="flex w-full justify-center rounded-lg bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
          Sign Up
        </button>
      </form>
    </ShowcaseSection>
  );
}
