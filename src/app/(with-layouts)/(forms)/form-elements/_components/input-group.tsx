"use client";

import { FieldError } from "@/components/tailgrids/core/field";
import { Input } from "@/components/tailgrids/core/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/tailgrids/core/input-group";
import { Label } from "@/components/tailgrids/core/label";
import {
  NumberField,
  NumberFieldAction,
  NumberFieldGroup,
} from "@/components/tailgrids/core/number-field";
import {
  Select,
  SelectContent,
  SelectIndicator,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/tailgrids/core/select";
import { TextField } from "@/components/tailgrids/core/text-field";
import { Check, ChevronDown, Copy4, Minus, Plus } from "@tailgrids/icons";
import Image from "next/image";
import { useState } from "react";

export const countryOptions = [
  { value: "us", label: "United States", flag: "/images/flag/US.svg", code: "+1" },
  { value: "ca", label: "Canada", flag: "/images/flag/CA.svg", code: "+1" },
  { value: "fr", label: "France", flag: "/images/flag/FR.svg", code: "+33" },
  { value: "au", label: "Australia", flag: "/images/flag/AU.svg", code: "+61" },
  { value: "it", label: "Italy", flag: "/images/flag/IT.svg", code: "+39" },
  { value: "in", label: "India", flag: "/images/flag/IN.svg", code: "+91" },
];

const currencies = [
  { code: "USD", flag: "/images/flag/US.svg" },
  { code: "AUD", flag: "/images/flag/AU.svg" },
  { code: "CAD", flag: "/images/flag/CA.svg" },
  { code: "EUR", flag: "/images/flag/FR.svg" },
  { code: "INR", flag: "/images/flag/IN.svg" },
];

export default function InputGroupComponents() {
  const [phoneCode, setPhoneCode] = useState<string>("us");
  const [phone, setPhone] = useState<string>("");
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [copied, setCopied] = useState(false);
  const [counterValue, setCounterValue] = useState<number>(1000);

  const handleCopy = () => {
    navigator.clipboard.writeText("www.nextadmin.co");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-5 p-6">
      {/* Phone Number */}
      <TextField
        className="w-full gap-2.5"
        value={phone}
        onChange={setPhone}
        required
        validationBehavior="native"
      >
        <Label>
          Phone Number <span className="text-sm font-medium text-error-500">*</span>
        </Label>
        <InputGroup className="w-full has-user-invalid:border-input-error-focus-border focus-within:has-user-invalid:ring-4 focus-within:has-user-invalid:ring-input-error-focus-border/20">
          <Select
            name="countryCode"
            value={phoneCode}
            onChange={(val) => setPhoneCode(val as string)}
            isRequired
            className="w-24 shrink-0"
          >
            <SelectTrigger className="h-full justify-between gap-0 rounded-l-lg rounded-r-none border-y-0 border-r border-l-0 border-r-card-border bg-transparent pr-2.5 pl-3 text-sm shadow-none hover:bg-transparent focus:ring-0 focus:ring-offset-0">
              <SelectValue className="flex items-center gap-2" />
              <SelectIndicator className="ml-1 text-text-secondary" />
            </SelectTrigger>

            <SelectContent className="w-30">
              {countryOptions.map((option) => (
                <SelectItem key={option.value} id={option.value} textValue={option.code}>
                  <span className="flex items-center gap-2">
                    <Image
                      src={option.flag}
                      alt={option.label}
                      width={20}
                      height={20}
                      className="size-5 rounded-full object-cover"
                    />
                    <span className="font-normal text-text-primary">{option.code}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            name="phone"
            type="tel"
            placeholder="6564 164 932"
            className="w-full flex-1 rounded-none rounded-r-lg border-none bg-transparent px-4 py-2.5 shadow-none focus:border-none focus:ring-0 focus:ring-offset-0"
          />
        </InputGroup>
        <FieldError />
      </TextField>

      {/* Website URL */}
      <TextField className="w-full flex-col gap-1.5" defaultValue="www.nextadmin.co">
        <Label className="flex items-center gap-0.5 text-sm font-medium text-input-label-text">
          Website URL
        </Label>

        <InputGroup className="h-full w-full">
          <InputGroupAddon
            align="inline-start"
            className="h-full rounded-none border-r border-base-300 py-2.5 pr-3 text-text-secondary"
          >
            https://
          </InputGroupAddon>
          <InputGroupInput
            type="url"
            className="pl-3 text-sm text-text-primary placeholder:text-input-placeholder-text"
          />
          <InputGroupButton
            size="icon-sm"
            onPress={handleCopy}
            aria-label="Copy URL"
            className="mr-1 text-text-secondary hover:text-text-primary"
          >
            {copied ? (
              <Check className="size-5 text-input-success-focus-border" />
            ) : (
              <Copy4 className="size-5" />
            )}
          </InputGroupButton>
        </InputGroup>
        <FieldError />
      </TextField>

      {/* Amount */}
      <NumberField className="flex w-full flex-col gap-1.5">
        <Label className="flex items-center gap-0.5 text-sm font-medium text-input-label-text">
          Amount
        </Label>
        <InputGroup className="w-full overflow-hidden">
          <InputGroupAddon
            align="inline-start"
            className="border-0 pr-1 pl-3 text-input-placeholder-text"
          >
            $
          </InputGroupAddon>
          <InputGroupInput
            placeholder="2,000.00"
            type="text"
            className="w-full flex-1 pl-0 text-sm text-text-primary placeholder:text-input-placeholder-text"
          />
          <Select
            value={selectedCurrency.code}
            onChange={(key) => {
              const currency = currencies.find((c) => c.code === key);
              if (currency) setSelectedCurrency(currency);
            }}
            aria-label="Currency"
            className="w-24 shrink-0"
          >
            <SelectTrigger className="h-full w-24 rounded-none border-0 border-l border-base-300 bg-transparent pr-2 pl-3 shadow-none hover:bg-transparent focus:ring-0">
              <div className="flex items-center gap-2">
                <img
                  src={selectedCurrency.flag}
                  alt={selectedCurrency.code}
                  className="h-3.5 w-5 rounded-sm object-cover"
                />
                <span className="text-sm font-medium text-text-primary">
                  {selectedCurrency.code}
                </span>
                <ChevronDown className="size-3 text-text-secondary" />
              </div>
            </SelectTrigger>
            <SelectContent className="w-32">
              {currencies.map((c) => (
                <SelectItem key={c.code} id={c.code} textValue={c.code}>
                  <div className="flex items-center gap-2">
                    <img src={c.flag} alt={c.code} className="h-3.5 w-5 rounded-sm object-cover" />
                    <span className="text-sm">{c.code}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </InputGroup>
        <FieldError />
      </NumberField>

      {/* Card Number */}
      <NumberField className="flex w-full flex-col gap-1.5">
        <Label className="flex items-center gap-0.5 text-sm font-medium text-input-label-text">
          Card Number
        </Label>
        <InputGroup className="w-full">
          <InputGroupAddon align="inline-start" className="pr-1 pl-3">
            <img
              src="/images/products/mastercard.png"
              alt="Mastercard"
              className="h-auto w-7 object-contain"
            />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="8400 5000 4000 3540"
            type="text"
            className="pl-2 text-sm text-text-primary placeholder:text-input-placeholder-text"
          />
        </InputGroup>
        <FieldError />
      </NumberField>

      {/* Counter */}
      <NumberField defaultValue={1000} className="flex flex-col gap-1.5">
        <Label>Quantity</Label>

        <NumberFieldGroup className="w-full">
          <Input placeholder="0" className="w-full px-13" />
          <NumberFieldAction slot="decrement">
            <Minus />
          </NumberFieldAction>
          <NumberFieldAction slot="increment">
            <Plus />
          </NumberFieldAction>
        </NumberFieldGroup>
      </NumberField>
    </div>
  );
}
