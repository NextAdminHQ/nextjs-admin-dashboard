import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/tailgrids/core/avatar";

export default function AvatarStatusPreview() {
  return (
    <div className="flex w-full items-center justify-start gap-10 p-4">
      <Avatar size="lg">
        <AvatarImage src="/images/user/jhon-smith.png" alt="Jhon Smith" />
        <AvatarFallback>JS</AvatarFallback>
        <AvatarBadge status="online" />
      </Avatar>

      <Avatar size="lg">
        <AvatarImage src="/images/user/jhon-smith.png" alt="Jhon Smith" />
        <AvatarFallback>JS</AvatarFallback>
        <AvatarBadge status="busy" />
      </Avatar>

      <Avatar size="lg">
        <AvatarImage src="/images/user/jhon-smith.png" alt="Jhon Smith" />
        <AvatarFallback>JS</AvatarFallback>
        <AvatarBadge status="offline" />
      </Avatar>

      <Avatar size="lg">
        <AvatarImage src="/images/user/jhon-smith.png" alt="Jhon Smith" />
        <AvatarFallback>JS</AvatarFallback>
        <AvatarBadge status="offline" size="lg" ping />
      </Avatar>
    </div>
  );
}
