import { about, person, social, aboutExtras } from "@/resources";
import AboutClient from "./AboutClient";
export { generateMetadata } from "./metadata";

export default function About() {
  return (
    <AboutClient
      about={about}
      person={person}
      social={social}
      aboutExtras={aboutExtras}
    />
  );
}
