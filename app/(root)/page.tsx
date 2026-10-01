import FreshNotifications from "@/components/homepage/fresh-notifications";
import Hero from "@/components/homepage/hero";
import HomeFooter from "@/components/homepage/home-footer";
import ImpactBand from "@/components/homepage/impact-band";
import PlatformBand from "@/components/homepage/platform-band";
import ToolGrid from "@/components/homepage/tool-grid";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100dvh-4rem)] flex-col">
      <Hero />
      <FreshNotifications />
      <ImpactBand />
      <ToolGrid />
      <PlatformBand />
      <HomeFooter />
    </div>
  );
}
