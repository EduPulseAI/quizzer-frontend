import type { SocialLink } from '@edupulse/profile';
import Discord from '@feature/ui/icons/discord';
import { Github, Link2, Instagram, Linkedin, Twitter } from 'lucide-react';

interface SocialLinksProps {
  socialLinks: SocialLink;
}

const getIconComponent = (platform: keyof SocialLink) => {
  switch(platform) {
    case "Github":
      return Github;
    case "Linkedin":
      return Linkedin;
    case "Twitter":
      return Twitter;
    case "Instagram":
      return Instagram;
    case "Discord":
      return Discord;
    default:
      return Link2;
  }
}

export function SocialLinks({ socialLinks }: SocialLinksProps) {
  if (!socialLinks) return null;
  return (
    <div className="flex justify-center gap-2 sm:gap-3 my-2 sm:my-3">
      {Object.entries(socialLinks).map(([platform, link], index) => {
        const IconComponent = getIconComponent(platform as keyof SocialLink);
        return (
          <a
            key={index}
            href={link}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors"
            aria-label={platform}
          >
            {IconComponent && <IconComponent className="w-3 h-3 sm:w-4 sm:h-4" />}
          </a>
        )
      })}
    </div>
  )
}
