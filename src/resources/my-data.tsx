// Xan Bauer's personal portfolio data.
// This file is never touched by upstream — it's the single source of truth for all personal content.
// content.tsx imports from here and can be taken wholesale from upstream in future merges.

export const myPerson = {
  firstName: "Xan",
  lastName: "Bauer",
  role: "Data Analyst",
  avatar: "/images/avatar.jpg",
  email: "xanbauer@gmail.com",
  location: "America/Chicago", // IANA timezone for Austin, TX (Central Time)
  languages: ["English", "Spanish"],
  locale: "en",
} as const;

export const mySocial = [
  { name: "GitHub",   icon: "github",   link: "https://github.com/xanbauer",           essential: true },
  { name: "LinkedIn", icon: "linkedin", link: "https://www.linkedin.com/in/xanbauer/", essential: true },
  { name: "Email",    icon: "email",    link: "mailto:xanbauer@gmail.com",             essential: true },
] as const;

export const myHomeContent = {
  headline: <>Welcome to my portfolio</>,
  subline: (
    <>
      I turn complex data problems into practical solutions.
      <br /> Whether it&apos;s through building efficient data pipelines or discovering patterns,
      I&apos;m driven by seeing my analysis help make better decisions.
    </>
  ),
};

export const myIntroDescription = (
  <>
    I turn data problems into data solutions, setting others up for success.
    <br />
    My work bridges the gap between raw data and strategic decision making, creating tools to
    support business critical operations and using analysis to uncover meaningful patterns.
  </>
);

export const myMoreAboutMe =
  `For the past five years, I have been working as a data analyst/engineer. I'm on the front lines, diving into complex data challenges and emerging with scalable solutions that produce actionable insights. I am transitioning to data science, where I find joy in uncovering interesting patterns and applying my love for statistics.

      On any given day, I am coding in Python or SQL and working with BI tools like Domo and Mode. In my current role, I've architected data pipelines that transformed a chaotic mix of 50+ data sources into business-ready datasets for internal and external stakeholders. With that data, I have created various dashboards specializing in efficient and scalable designs. One of my favorite accomplishments is learning how to build and implement a CI/CD pipeline, which has protected business-critical processes from pesky bugs and edge cases.

      I am seeking more opportunities to use data science and multiply my impact. Check out my projects to see some examples of my work!

      When I'm not wrangling data, you can find me strength training or running around Town Lake (currently preparing for my first half marathon!) or playing with my Golden Doodle pup, Scarlett, who's convinced every Amazon delivery is full of treats just for her.`;

export const mySkills = [
  {
    title: "SQL",
    description: <>Proficient in writing efficient queries, optimizing performance, and leveraging window functions.</>,
  },
  {
    title: "Python",
    description: <>Machine Learning, data wrangling, and automation using libraries like Pandas, NumPy, and Scikit-learn. Comfortable with API integrations and workflow automation.</>,
  },
  {
    title: "Data Visualization",
    description: <>Experienced in creating clear and actionable dashboards using Domo, and Python libraries like Matplotlib and Seaborn.</>,
  },
  {
    title: "ETL",
    description: <>Experienced in building and optimizing data pipelines using Domo, Google Cloud, and Python. Comfortable working with large datasets and automating data transformations.</>,
  },
  {
    title: "Machine Learning",
    description: <>Predictive modeling and feature engineering.</>,
  },
];

export const myMoreSkills = [
  "BigQuery", "Snowflake", "GCP", "REST APIs", "Domo", "Mode", "Excel", "Tableau",
  "Git", "Jupyter", "CI/CD", "Google Analytics", "Google Sheets",
];

export const myWork = {
  title: "My projects",
  description: "Data projects by Xan Bauer",
};
