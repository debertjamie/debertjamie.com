import { Hero } from "@/src/components/home/hero";
import { Grid } from "@/src/components/home/grid";
import { RevealSection } from "@/src/components/commons/reveal";

export default async function Home() {
  return (
    <main className="flex flex-col">
      <RevealSection>
        <Hero />
      </RevealSection>
      <RevealSection>
        <Grid />
      </RevealSection>
    </main>
  );
}
