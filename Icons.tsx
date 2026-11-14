import type { ReactNode, SVGProps } from "react";

/** Small line icons, drawn on a 24px grid with a 1.5px stroke. */

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 21s-6.5-5.7-6.5-10.6a6.5 6.5 0 0 1 13 0C18.5 15.3 12 21 12 21Z" />
      <circle cx="12" cy="10.4" r="2.3" />
    </Icon>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5.5 4h3.6l1.8 4.6-2.3 1.4a10.6 10.6 0 0 0 5.4 5.4l1.4-2.3 4.6 1.8v3.6a1.9 1.9 0 0 1-2 1.9A15.4 15.4 0 0 1 3.6 6 1.9 1.9 0 0 1 5.5 4Z" />
    </Icon>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="5" y="3.5" width="14" height="17" rx="1.2" />
      <path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4" />
    </Icon>
  );
}

export function BagIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5.6 8.5h12.8l1 11a1 1 0 0 1-1 1.1H5.6a1 1 0 0 1-1-1.1l1-11Z" />
      <path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" />
    </Icon>
  );
}

export function ExternalIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M8 16l8.5-8.5M9.5 7.5h7v7" />
    </Icon>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17" cy="7" r="0.7" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M14 21v-7.6h2.6l.5-3.2H14V8.3c0-.9.5-1.5 1.6-1.5h1.6V4a13 13 0 0 0-2.4-.2c-2.4 0-3.9 1.5-3.9 4v2.4H8.3v3.2h2.6V21" />
    </Icon>
  );
}

export function TikTokIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M13.5 3.5v11.8a3.2 3.2 0 1 1-3.2-3.2" />
      <path d="M13.5 3.5c.3 2.6 2 4.3 4.7 4.6" />
    </Icon>
  );
}
