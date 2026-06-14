import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JNTUH CONNECT | Channels",
  description: "Join our Telegram and WhatsApp channels to stay updated with the latest JNTUH results and notifications.",
};

export default function ChannelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
