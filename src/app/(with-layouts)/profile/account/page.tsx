"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/tailgrids/core/avatar";
import { Button } from "@/components/tailgrids/core/button";
import { Card } from "@/components/tailgrids/core/card";
import { Input } from "@/components/tailgrids/core/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/tailgrids/core/input-group";
import { Label } from "@/components/tailgrids/core/label";
import {
  Select,
  SelectContent,
  SelectIndicator,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/tailgrids/core/select";
import { TextArea } from "@/components/tailgrids/core/text-area";
import { TextField } from "@/components/tailgrids/core/text-field";
import Image from "next/image";
import { FieldError, Form } from "react-aria-components";
import { LogoutIcon, TrashIcon } from "./icons";

const countryOptions = [
  { value: "us", label: "United States", flag: "/images/flag/US.svg" },
  { value: "ca", label: "Canada", flag: "/images/flag/CA.svg" },
  { value: "fr", label: "France", flag: "/images/flag/FR.svg" },
  { value: "au", label: "Australia", flag: "/images/flag/AU.svg" },
  { value: "it", label: "Italy", flag: "/images/flag/IT.svg" },
  { value: "in", label: "India", flag: "/images/flag/IN.svg" },
];

export default function AccountPage() {
  return (
    <div className="space-y-6">
      {/* Account Details Card */}
      <Card className="bg-transparent p-5">
        <h2 className="mb-6 text-xl leading-7 font-semibold text-text-primary">Account Details</h2>

        <Form
          className="space-y-6"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <div className="flex items-center gap-4">
            <Avatar size="xxl">
              <AvatarImage src="/images/user/jhon-smith.png" alt="Jhon Smith" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-3">
                <Button appearance="outline" size="sm">
                  Change Avatar
                </Button>
                <Button appearance="outline" variant="danger" size="sm">
                  Remove
                </Button>
              </div>
              <p className="text-xs leading-4 text-text-tertiary">
                Accepts PNG, JPEG, GIF; max size 2MB.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <TextField className="w-full gap-2.5">
              <Label>Full Name</Label>
              <Input name="fullName" placeholder="Jhon Smith" className="w-full" required />
              <FieldError />
            </TextField>

            <TextField className="w-full gap-2.5">
              <Label>Email address</Label>
              <Input
                name="email"
                type="email"
                placeholder="jhon@example.com"
                className="w-full"
                required
              />
              <FieldError />
            </TextField>

            <TextField className="w-full gap-2.5">
              <Label>Phone Number</Label>
              <Input name="phone" placeholder="+1 604 555 1234" className="w-full" />
            </TextField>

            <TextField className="w-full gap-2.5">
              <Label>Website</Label>
              <InputGroup>
                <InputGroupAddon className="after h-full border-r border-card-border text-input-placeholder-text-color">
                  https://
                </InputGroupAddon>
                <InputGroupInput name="website" placeholder="www.nextadmin.co" className="pl-2" />
              </InputGroup>
            </TextField>

            <TextField className="w-full gap-2.5">
              <Label>Address</Label>
              <Input
                name="address"
                placeholder="1901 Thornridge Cir. Shiloh, Hawaii 81063"
                className="w-full"
              />
            </TextField>

            <div>
              <Select name="country" defaultSelectedKey="us" className="h-full">
                <SelectLabel>Country</SelectLabel>
                <SelectTrigger className="h-full w-full border-input-border">
                  <SelectValue className="flex items-center gap-2" />
                  <SelectIndicator />
                </SelectTrigger>
                <SelectContent>
                  {countryOptions.map((option) => (
                    <SelectItem key={option.value} id={option.value} textValue={option.label}>
                      <span className="flex items-center gap-2">
                        <Image
                          src={option.flag}
                          alt={option.label}
                          width={20}
                          height={20}
                          className="size-5 rounded-full object-cover"
                        />
                        <span>{option.label}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <TextField className="col-span-1 w-full gap-2.5 md:col-span-2">
              <Label>Bio</Label>
              <TextArea
                name="bio"
                className="h-25 shadow-xs"
                placeholder="Passionate software engineer with a knack for crafting scalable web applications and exploring cutting-edge technologies. Always eager to solve complex problems and innovate."
              />
            </TextField>

            <div className="col-span-1 flex items-center justify-end gap-3 md:col-span-2">
              <Button
                appearance="outline"
                variant="primary"
                size="lg"
                type="button"
                className="px-3.5 text-sm"
              >
                Cancel
              </Button>
              <Button variant="primary" size="lg" type="submit" className="px-3.5 text-sm">
                Save Changes
              </Button>
            </div>
          </div>
        </Form>
      </Card>

      <Card className="bg-transparent p-5">
        {/* Sign Out */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-1 text-sm leading-5 font-medium text-text-primary">
              Sign out from all devices
            </p>
            <p className="text-xs leading-4 text-text-tertiary">
              End all active sessions across your devices.
            </p>
          </div>

          <Button
            appearance="outline"
            variant="primary"
            size="lg"
            className="gap-2 px-3.5 py-2 text-sm [&>svg]:size-5"
          >
            <LogoutIcon />
            Sign Out
          </Button>
        </div>
        <hr className="my-4 border-border-secondary-alt" />
        {/* Delete Account */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-1 text-sm leading-5 font-medium text-text-primary">Delete Account</p>
            <p className="text-xs leading-4 text-text-tertiary">
              Delete your account permanently along with all associated data.
            </p>
          </div>

          <Button
            appearance="outline"
            variant="danger"
            size="lg"
            className="gap-2 px-3.5 text-sm [&>svg]:size-5"
          >
            <TrashIcon />
            Delete Account
          </Button>
        </div>
      </Card>
    </div>
  );
}
