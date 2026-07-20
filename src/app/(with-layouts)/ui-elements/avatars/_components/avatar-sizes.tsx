import { Avatar, AvatarFallback, AvatarImage } from "@/components/tailgrids/core/avatar";
import { avatarSizes } from "./data";

export default function AvatarSizesPreview() {
  return (
    <div className="flex w-full items-center justify-center gap-10 p-4">
      {avatarSizes.map((member) => (
        <Avatar key={member.id} size={member.size}>
          <AvatarImage src={member.src} alt={member.alt} />
          <AvatarFallback>{member.fallback}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}
