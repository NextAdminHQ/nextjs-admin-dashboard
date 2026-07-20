"use client";

import { UploadIcon } from "@/app/(with-layouts)/(forms)/form-elements/_components/icons";
import { Button } from "@/components/tailgrids/core/button";
import { cn } from "@/utils/cn";
import { useState } from "react";
import { DropZone, FileTrigger, Text } from "react-aria-components";

export default function UploadZone() {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Choose File Input */}
      <div className="relative flex w-full items-center overflow-hidden rounded-lg border border-input-border bg-input-background transition-all focus-within:border-input-primary-focus-border focus-within:ring-4 focus-within:ring-input-primary-focus-border/20">
        <FileTrigger
          onSelect={(e) => {
            const files = e ? Array.from(e) : [];
            if (files.length > 0) setFile1(files[0]);
          }}
        >
          <Button
            variant="ghost"
            className="cursor-pointer rounded-none border-r border-card-border bg-background-gray-secondary_alt px-4 py-2.5 text-sm font-medium text-text-primary transition outline-none select-none focus:ring-0"
          >
            Choose File
          </Button>
        </FileTrigger>
        <span
          className={cn(
            "flex-1 truncate px-4 text-sm",
            file1 ? "text-title-50" : "text-input-placeholder-text",
          )}
        >
          {file1 ? file1.name : "No file chosen"}
        </span>
      </div>

      {/* Drag & Drop Zone */}
      <div className="w-full">
        <DropZone
          onDrop={async (e) => {
            const fileItem = e.items.find((item) => item.kind === "file");
            if (fileItem) {
              const file = await fileItem.getFile();
              setFile2(file);
            }
          }}
          className={({ isDropTarget, isFocusVisible }) =>
            cn(
              "relative flex w-full cursor-pointer flex-col items-center justify-center gap-5 rounded-xl border border-dashed p-8 text-center transition duration-300 outline-none select-none",
              isDropTarget
                ? "border-input-primary-focus-border bg-input-primary-focus-border/5"
                : "border-button-primary-outline-stroke bg-input-background hover:bg-background-gray-secondary_alt_2",
              isFocusVisible &&
                "border-input-primary-focus-border ring-4 ring-input-primary-focus-border/20",
            )
          }
        >
          <Text slot="label" className="sr-only">
            File upload zone
          </Text>

          {file2 ? (
            <div className="flex flex-col items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary-50 text-primary-500">
                <UploadIcon />
              </span>

              <div className="space-y-1">
                <p className="text-sm font-medium text-title-50">{file2.name}</p>
                <p className="text-xs text-input-placeholder-text">
                  {(file2.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
              <Button
                variant="danger"
                appearance="outline"
                size="xs"
                onClick={(e) => {
                  e.stopPropagation();
                  setFile2(null);
                }}
              >
                Remove File
              </Button>
            </div>
          ) : (
            <div className="flex w-full flex-col items-center gap-4">
              {/* Cloud Icon */}
              <div className="flex size-10 items-center justify-center rounded-full border border-card-border bg-background-gray-secondary_alt text-text-secondary">
                <svg
                  className="size-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 16V8M12 8L9 11M12 8L15 11M4 16.5C4 13.4624 6.46243 11 9.5 11C9.51675 11 9.53347 11.0001 9.55015 11.0002C10.2612 8.17513 12.8228 6 15.8333 6C19.2391 6 22 8.76087 22 12.1667C22 14.8878 20.2372 17.1977 17.8 18M17.8 18H6.2C4.43269 18 3 16.5673 3 14.8V14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Instruction Texts */}
              <div className="space-y-1">
                <p className="text-sm font-medium text-title-50">Drag & drop or click to upload</p>
                <p className="text-xs text-input-placeholder-text">
                  JPEG, PNG, PDG, and MP4 formats, up to 50MB
                </p>
              </div>

              {/* Trigger Button */}
              <FileTrigger
                onSelect={(e) => {
                  const files = e ? Array.from(e) : [];
                  if (files.length > 0) setFile2(files[0]);
                }}
              >
                <Button variant="primary" appearance="outline" size="sm" className="mt-1">
                  Browse File
                </Button>
              </FileTrigger>
            </div>
          )}
        </DropZone>
      </div>
    </div>
  );
}
