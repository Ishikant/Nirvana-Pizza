import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="bg-ink text-paper">
      <div className="shell flex min-h-[70svh] flex-col items-start justify-center py-24">
        <h1 className="text-title max-w-[14ch]">That page is not on the menu.</h1>
        <p className="text-lead mt-5 max-w-[40ch] text-ash">
          The link may be old or mistyped. Everything we serve is one tap away.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/menu">View menu</ButtonLink>
          <ButtonLink href="/" variant="light">
            Back to home
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
