import { useId } from "react";

interface PropsType {
  label: string;
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
  active?: boolean;
}

export function TextAreaGroup({
  label,
  placeholder,
  required,
  disabled,
  active,
}: PropsType) {
  const id = useId();

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
      >
        {label}
      </label>

      <textarea
        id={id}
        rows={6}
        placeholder={placeholder}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary disabled:cursor-default disabled:bg-gray-2 data-[active=true]:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary dark:disabled:bg-dark dark:data-[active=true]:border-primary"
        required={required}
        disabled={disabled}
        data-active={active}
      />
    </div>
  );
}
