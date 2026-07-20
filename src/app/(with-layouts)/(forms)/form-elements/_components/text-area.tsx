import { FieldError, FieldLabel } from "@/components/tailgrids/core/field";
import { TextArea } from "@/components/tailgrids/core/text-area";
import { TextField } from "@/components/tailgrids/core/text-field";

export default function TextAreaInput() {
  return (
    <div className="flex flex-col gap-5 p-6">
      <TextField className="w-full gap-2">
        <FieldLabel>Message</FieldLabel>
        <TextArea placeholder="Enter your message here..." />
        <FieldError>Bio must be between 5 and 280 characters.</FieldError>
      </TextField>

      <TextField className="w-full gap-2" invalid>
        <FieldLabel>Message</FieldLabel>
        <TextArea placeholder="Enter your message here..." />
        <FieldError>Message must be between 5 and 280 characters.</FieldError>
      </TextField>

      <TextField className="w-full gap-2" disabled>
        <FieldLabel>Message</FieldLabel>
        <TextArea placeholder="Enter your message here..." />
      </TextField>
    </div>
  );
}
