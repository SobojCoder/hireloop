import { Hero } from "@/components/home/hero";
import { SiteNavbar } from "@/components/site-navbar";

export default async function Home({searchParams}:{searchParams: Promise<{ [key: string]: string | string[] | undefined}>}) {

  const search = await searchParams;

  console.log('Search params: ', search);

  return (
    <div>
      <SiteNavbar />
      <Hero />  ;

    </div>
  )
}
