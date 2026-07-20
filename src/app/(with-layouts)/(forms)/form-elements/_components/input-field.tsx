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
import { TextField } from "@/components/tailgrids/core/text-field";
import { Eye, Search1 } from "@tailgrids/icons";
import * as React from "react";
import { EyeClose } from "./icons";

export default function InputField() {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="flex flex-col gap-5 p-6">
      {/*  Text Input */}
      <TextField className="w-full flex-col gap-1.5">
        <Label className="flex items-center gap-0.5 text-sm font-medium text-input-label-text">
          Text Input
        </Label>
        <Input placeholder="Jhon Smith" type="text" className="w-full px-3 py-2.5 text-sm" />
        <FieldError />
      </TextField>

      {/* Email */}
      <TextField className="w-full flex-col gap-1.5">
        <Label className="flex items-center gap-0.5 text-sm font-medium text-input-label-text">
          Email
        </Label>
        <Input placeholder="info@gmail.com" type="email" className="w-full px-3 py-2.5 text-sm" />
        <FieldError />
      </TextField>

      {/*  Password */}
      <TextField className="w-full gap-2.5">
        <Label>
          Password <span className="text-sm font-medium text-error-500">*</span>
        </Label>
        <InputGroup>
          <InputGroupInput
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Choose a password"
            minLength={8}
            className="w-full px-3 py-2.5 text-sm"
          />
          <InputGroupButton
            size="icon-sm"
            className="mr-1 text-text-secondary hover:text-text-primary"
            onPress={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeClose className="size-5" /> : <Eye className="size-5" />}
          </InputGroupButton>
        </InputGroup>
        <FieldError />
      </TextField>

      {/* 4. Search */}
      <TextField className="w-full flex-col gap-1.5">
        <Label className="flex items-center gap-0.5 text-sm font-medium text-input-label-text">
          Search
        </Label>
        <InputGroup className="w-full">
          <InputGroupAddon align="inline-start" className="pr-1 text-text-secondary">
            <Search1 />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search anything..." type="text" className="text-sm" />
          <InputGroupAddon align="inline-end" className="pl-1">
            <div className="bg-base-100 flex items-center gap-0.5 rounded border border-card-border px-1.5 py-0.5 text-[10px] font-medium text-text-secondary select-none">
              <span>⌘</span>
              <span>K</span>
            </div>
          </InputGroupAddon>
        </InputGroup>
        <FieldError />
      </TextField>

      {/* 5. Placeholder */}
      <TextField className="w-full flex-col gap-1.5">
        <Label className="flex items-center gap-0.5 text-sm font-medium text-input-label-text">
          Placeholder
        </Label>
        <Input
          placeholder="Type somethings..."
          type="text"
          className="w-full px-3 py-2.5 text-sm"
        />
        <FieldError />
      </TextField>
    </div>
  );
}
