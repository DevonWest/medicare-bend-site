import { permanentRedirect } from "next/navigation";

export default function AboutPage() {
  // The team/our-team page is temporarily removed pending the finalized Bend
  // team roster, so /about routes to /contact for now.
  permanentRedirect("/contact");
}
