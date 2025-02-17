import { InlineCode } from "@/once-ui/components";

const person = {
  firstName: "Xan",
  lastName: "Bauer",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Data Analyst",
  avatar: "/images/avatar.jpg",
  location: "Austin, Texas", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Spanish"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      I'm not currently sending out newsletters
    </>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/xanbauer",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/xanbauer/",
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:xanbauer@gmail.com",
  },
];

const home = {
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Welcome to my portfolio</>,
  subline: (
    <>
      I turn complex data problems into practical solutions.
      <br /> Whether it&apos;s through building efficient data pipelines or discovering patterns, I&apos;m driven by seeing my analysis help make better decisions. 
    </>
  ),
};

const about = {
  label: "About",
  title: "About me",
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
    description: (
      <>
        I turn data problems into data solutions, setting others up for success.<br></br>
        My work bridges the gap between raw data and strategic decision making, creating tools to support business critical
        operations and using analysis to uncover meaningful patterns.
      </>
    ),
    moreAboutMe: 
      `For the past five years, I have been working as a data analyst/engineer. I'm on the front lines, diving into complex data challenges and emerging with scalable solutions that produce actionable insights. I am transitioning to data science, where I find joy in uncovering interesting patterns and applying my love for statistics.

      On any given day, I am coding in Python or SQL and working with BI tools like Domo and Mode. In my current role, I've architected data pipelines that transformed a chaotic mix of 50+ data sources into business-ready datasets for internal and external stakeholders. With that data, I have created various dashboards specializing in efficient and scalable designs. One of my favorite accomplishments is learning how to build and implement a CI/CD pipeline, which has protected business-critical processes from pesky bugs and edge cases.

      I am seeking more opportunities to use data science and multiply my impact. Check out my projects to see some examples of my work!

      When I'm not wrangling data, you can find me strength training or running around Town Lake (currently preparing for my first half marathon!) or playing with my Golden Doodle pup, Scarlett, who's convinced every Amazon delivery is full of treats just for her.`
  },
  work: {
    display: false, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Orange 142",
        timeframe: "2019 - Present",
        role: "Data Analyst",
        achievements: [
          <>
            Redesigned the UI/UX for the FLY platform, resulting in a 20% increase in user
            engagement and 30% faster load times.
          </>,
          <>
            Spearheaded the integration of AI tools into design workflows, enabling designers to
            iterate 50% faster.
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/projects/project-01/cover-01.jpg",
            alt: "Once UI Project",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Creativ3",
        timeframe: "2018 - 2022",
        role: "Lead Designer",
        achievements: [
          <>
            Developed a design system that unified the brand across multiple platforms, improving
            design consistency by 40%.
          </>,
          <>
            Led a cross-functional team to launch a new product line, contributing to a 15% increase
            in overall company revenue.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "Texas State University",
        description: <>Finance & Economics</>,
      },
      {
        name: "DataQuest",
        description: <>Data Science</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "SQL",
        description: <>Proficient in writing efficient queries, optimizing performance, and leveraging window functions.</>,
        // optional: leave the array empty if you don't want to display images
        // images: [
        //   {
        //     src: "/images/projects/project-01/cover-02.jpg",
        //     alt: "Project image",
        //     width: 16,
        //     height: 9,
        //   }
      },
      {
        title: "Python",
        description: <>Machine Learning, data wrangling, and automation using libraries like Pandas, NumPy, and Scikit-learn. Comfortable with API integrations and workflow automation.</>,
      },
      {
        title: "Data Visualization",
        description: <>Experienced in creating clear and actionable dashboards using Domo, and Python libraries like Matplotlib and Seaborn</>,
      },
      {
        title: "ETL",
        description: <>Experienced in building and optimizing data pipelines using Domo, Google Cloud, and Python. Comfortable working with large datasets and automating data transformations.</>,
      },
      {
        title: "Machine Learning",
        description: "Predictive modeling and feature engineering." 
      },
    ],
    moreSkills: [
      "BigQuery", "Snowflake", "GCP", "REST APIs", "Domo", "Mode", "Excel", "Tableau",
       "Git", "Jupyter", "CI/CD", "Google Analytics",  "Google Sheets"
    ],
  },
};

const blog = {
  label: "Blog",
  title: "Writing about data science and other interests",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  label: "Work",
  title: "My projects",
  description: `Data projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  label: "Gallery",
  title: "My photo gallery",
  description: `A photo collection by ${person.name}`,
  // Images from https://pexels.com
  images: [
    {
      src: "/images/gallery/img-01.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-02.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-03.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-04.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-05.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-06.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-07.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-08.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-09.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-10.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-11.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-12.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-13.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-14.jpg",
      alt: "image",
      orientation: "horizontal",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
