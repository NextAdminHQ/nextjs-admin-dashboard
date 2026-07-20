"use client";

import {
  Select,
  SelectContent,
  SelectIndicator,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/tailgrids/core/select";
import { Close } from "@tailgrids/icons";
import { useState } from "react";

const countries = [
  { code: "US", name: "United State", flag: "/images/flag/US.svg" },
  { code: "AU", name: "Australia", flag: "/images/flag/AU.svg" },
  { code: "CA", name: "Canada", flag: "/images/flag/CA.svg" },
  { code: "FR", name: "France", flag: "/images/flag/FR.svg" },
  { code: "IN", name: "India", flag: "/images/flag/IN.svg" },
  { code: "IT", name: "Italy", flag: "/images/flag/IT.svg" },
];

const optionList = ["Bangladesh", "Singapore", "Malaysia", "Thailand"];

export default function Selects() {
  const [singleValue, setSingleValue] = useState<string>("");
  const [selectedCountries, setSelectedCountries] = useState<string[]>(["Bangladesh", "Singapore"]);
  const [selectedCountry, setSelectedCountry] = useState<string>("US");

  const currentCountry = countries.find((c) => c.code === selectedCountry);

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Single Select Option */}
      <div className="flex flex-col gap-2">
        <Select
          value={singleValue}
          onChange={(val) => setSingleValue(val as string)}
          className="w-full"
          aria-label="Select option"
          placeholder="Select option"
        >
          <SelectLabel>Select option</SelectLabel>
          <SelectTrigger className="w-full border-border-secondary bg-input-background py-2.5">
            <SelectValue />
            <SelectIndicator />
          </SelectTrigger>

          <SelectContent className="min-w-(--trigger-width)">
            {optionList.map((opt) => (
              <SelectItem key={opt} id={opt} textValue={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Multi-Select Component */}
      <div className="flex flex-col gap-2">
        <Select
          selectionMode="multiple"
          value={selectedCountries}
          onChange={(val) => setSelectedCountries(val as string[])}
          className="w-full"
          aria-label="Select options"
        >
          <SelectLabel>Select options</SelectLabel>
          <SelectTrigger className="h-auto min-h-11 w-full flex-wrap justify-between gap-1.5 border-border-secondary bg-input-background py-1.5 pr-2.5 pl-3 text-sm">
            <div className="flex flex-1 flex-wrap items-center gap-1.5">
              {selectedCountries.length === 0 ? (
                <span className="text-input-placeholder-text">Select option</span>
              ) : (
                selectedCountries.map((opt) => (
                  <span
                    key={opt}
                    className="inline-flex items-center gap-1 rounded-md bg-dropdown-hover-background px-2 py-1 text-sm font-medium text-text-primary"
                  >
                    {opt}
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCountries(selectedCountries.filter((item) => item !== opt));
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedCountries(selectedCountries.filter((item) => item !== opt));
                        }
                      }}
                      className="cursor-pointer rounded-sm p-0.5 text-text-secondary hover:text-text-primary"
                      aria-label={`Remove ${opt}`}
                    >
                      <Close className="size-3" />
                    </span>
                  </span>
                ))
              )}
            </div>
            <SelectIndicator />
          </SelectTrigger>
          <SelectContent className="min-w-(--trigger-width)">
            {optionList.map((opt) => (
              <SelectItem key={opt} id={opt} textValue={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Country Select with Flags */}
      <div className="flex flex-col gap-2">
        <Select
          value={selectedCountry}
          onChange={(val) => setSelectedCountry(val as string)}
          className="w-full"
          aria-label="Select Country"
        >
          <SelectLabel>Select Country</SelectLabel>
          <SelectTrigger className="w-full border-border-secondary bg-input-background py-2.5">
            <div className="flex items-center gap-2">
              {currentCountry && (
                <img
                  src={currentCountry.flag}
                  alt={currentCountry.name}
                  className="h-3.5 w-5 rounded-sm object-cover"
                />
              )}
              <span className="text-sm text-text-primary">
                {currentCountry ? currentCountry.name : "Select Country"}
              </span>
            </div>
            <SelectIndicator />
          </SelectTrigger>
          <SelectContent className="min-w-(--trigger-width)">
            {countries.map((c) => (
              <SelectItem key={c.code} id={c.code} textValue={c.name}>
                <div className="flex items-center gap-2">
                  <img src={c.flag} alt={c.name} className="h-3.5 w-5 rounded-sm object-cover" />
                  <span>{c.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
