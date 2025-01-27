import { MessageOutlineIcon } from "@/assets/icons";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Button } from "@/components/ui-elements/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buttons",
};

export default function Page() {
  return (
    <>
      <Breadcrumb pageName="Buttons" />

      <div className="space-y-10">
        <ShowcaseSection title="Normal Button">
          <div className="mb-7.5 flex flex-wrap gap-5 xl:gap-20">
            <Button label="Button" variant="primary" />
            <Button label="Button" variant="primary" shape="rounded" />
            <Button label="Button" variant="primary" shape="full" />
            <Button label="Button" variant="outlinePrimary" shape="rounded" />
          </div>

          <div className="mb-7.5 flex flex-wrap gap-5 xl:gap-20">
            <Button label="Button" variant="green" />
            <Button label="Button" variant="green" shape="rounded" />
            <Button label="Button" variant="green" shape="full" />
            <Button label="Button" variant="outlineGreen" shape="rounded" />
          </div>

          <div className="flex flex-wrap gap-5 xl:gap-20">
            <Button label="Button" variant="dark" />
            <Button label="Button" variant="dark" shape="rounded" />
            <Button label="Button" variant="dark" shape="full" />
            <Button label="Button" variant="outlineDark" shape="rounded" />
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="Button With Icon">
          <div className="mb-7.5 flex flex-wrap gap-5 xl:gap-7.5">
            <Button
              label="Button With Icon"
              variant="primary"
              size="small"
              icon={<MessageOutlineIcon />}
            />
            <Button
              label="Button With Icon"
              variant="green"
              size="small"
              icon={<MessageOutlineIcon />}
            />
            <Button
              label="Button With Icon"
              variant="dark"
              size="small"
              icon={<MessageOutlineIcon />}
            />
            <Button
              label="Button With Icon"
              variant="outlinePrimary"
              size="small"
              icon={<MessageOutlineIcon />}
            />
          </div>

          <div className="mb-7.5 flex flex-wrap gap-5 xl:gap-7.5">
            <Button
              label="Button With Icon"
              variant="primary"
              shape="rounded"
              size="small"
              icon={<MessageOutlineIcon />}
            />
            <Button
              label="Button With Icon"
              variant="green"
              shape="rounded"
              size="small"
              icon={<MessageOutlineIcon />}
            />
            <Button
              label="Button With Icon"
              variant="dark"
              shape="rounded"
              size="small"
              icon={<MessageOutlineIcon />}
            />
            <Button
              label="Button With Icon"
              variant="outlinePrimary"
              shape="rounded"
              size="small"
              icon={<MessageOutlineIcon />}
            />
          </div>

          <div className="flex flex-wrap gap-5 xl:gap-7.5">
            <Button
              label="Button With Icon"
              variant="primary"
              shape="full"
              size="small"
              icon={<MessageOutlineIcon />}
            />
            <Button
              label="Button With Icon"
              variant="green"
              shape="full"
              size="small"
              icon={<MessageOutlineIcon />}
            />
            <Button
              label="Button With Icon"
              variant="dark"
              shape="full"
              size="small"
              icon={<MessageOutlineIcon />}
            />
            <Button
              label="Button With Icon"
              variant="outlinePrimary"
              shape="full"
              size="small"
              icon={<MessageOutlineIcon />}
            />
          </div>
        </ShowcaseSection>
      </div>
    </>
  );
}
