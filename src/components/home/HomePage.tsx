import { Experience } from "@/components/home/Experience";
import { Featured } from "@/components/home/Featured";
import { FoodIndex } from "@/components/home/FoodIndex";
import { Hero } from "@/components/home/Hero";
import { OrderOnline } from "@/components/home/OrderOnline";
import { Visit } from "@/components/home/Visit";

export function HomePage() {
  return (
    <>
      <Hero />
      <FoodIndex />
      <Featured />
      <Experience />
      <OrderOnline />
      <Visit />
    </>
  );
}
