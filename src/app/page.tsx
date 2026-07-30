import { Hero } from "@/components/home/Hero";
import { Welcome } from "@/components/home/Welcome";
import { FindBranch } from "@/components/home/FindBranch";
import { LatestSermon } from "@/components/home/LatestSermon";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { RegionsPreview } from "@/components/home/RegionsPreview";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Welcome />
      <FindBranch />
      <LatestSermon />
      <UpcomingEvents />
      <RegionsPreview />
    </>
  );
}
