import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import {
  myPerson,
  mySocial,
  myHomeContent,
  myIntroDescription,
  mySkills,
  myWork,
  myMoreAboutMe,
  myMoreSkills,
} from "./my-data";

const person: Person = {
  ...(myPerson as unknown as Person),
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}&apos;s Newsletter</>,
  description: <>I&apos;m not currently sending out newsletters</>,
};

const social: Social = [...mySocial] as unknown as Social;

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  ...myHomeContent,
  featured: {
    display: false,
    title: "",
    href: "",
  },
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: myIntroDescription,
  },
  work: {
    display: false,
    title: "Work Experience",
    experiences: [],
  },
  studies: {
    display: true,
    title: "Studies",
    institutions: [
      {
        name: "Texas State University",
        description: <>Finance &amp; Economics</>,
      },
      {
        name: "DataQuest",
        description: <>Data Science</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical skills",
    skills: mySkills,
  },
};

// Custom fields not in the About type — imported directly by about/page.tsx
export const aboutExtras = {
  moreAboutMe: myMoreAboutMe,
  moreSkills: myMoreSkills,
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about data science and other interests",
  description: `Read what ${person.name} has been up to recently`,
};

const work: Work = {
  path: "/work",
  label: "Work",
  ...myWork,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  images: [
    { src: "/images/gallery/horizontal-1.jpg", alt: "image", orientation: "horizontal" },
    { src: "/images/gallery/vertical-4.jpg",   alt: "image", orientation: "vertical"   },
    { src: "/images/gallery/horizontal-3.jpg", alt: "image", orientation: "horizontal" },
    { src: "/images/gallery/vertical-1.jpg",   alt: "image", orientation: "vertical"   },
    { src: "/images/gallery/vertical-2.jpg",   alt: "image", orientation: "vertical"   },
    { src: "/images/gallery/horizontal-2.jpg", alt: "image", orientation: "horizontal" },
    { src: "/images/gallery/horizontal-4.jpg", alt: "image", orientation: "horizontal" },
    { src: "/images/gallery/vertical-3.jpg",   alt: "image", orientation: "vertical"   },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
