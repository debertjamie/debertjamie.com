import {
  Images,
  MessagesSquare,
  PencilLine,
  Star,
  User,
  Users,
} from "lucide-react";

export const HEADER_LINKS = [
  {
    icon: <User className="w-5 h-5" />,
    href: "/about",
    label: "about",
  },
  {
    icon: <PencilLine className="w-5 h-5" />,
    href: "/blog",
    label: "blog",
  },
  {
    icon: <Star className="w-5 h-5" />,
    href: "/projects",
    label: "projects",
  },
  {
    icon: <MessagesSquare className="w-5 h-5" />,
    href: "/contact",
    label: "contact",
  },
  {
    icon: <Users className="w-5 h-5" />,
    href: "/friends",
    label: "friends",
  },
  {
    icon: <Images className="w-5 h-5" />,
    href: "/photos",
    label: "photos",
  },
];

export const FOOTER_GROUP = [
  [
    {
      href: "/about",
      label: "about",
    },
    {
      href: "/blog",
      label: "blog",
    },
    {
      href: "/projects",
      label: "projects",
    },
    {
      href: "/contact",
      label: "contact",
    },
  ],
  [
    {
      href: "/friends",
      label: "friends",
    },
    {
      href: "/now",
      label: "now",
    },
    {
      href: "/photos",
      label: "photos",
    },
  ],
  [
    {
      href: "https://linkedin.com/in/debertjamie",
      name: "LinkedIn",
    },
    {
      href: "https://twitter.com/debertjamie",
      name: "Twitter",
    },
    {
      href: "https://github.com/debertjamie",
      name: "GitHub",
    },
    {
      href: "mailto:hi@debertjamie.com",
      name: "Email",
    },
  ],
];
