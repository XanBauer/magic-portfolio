import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { fileURLToPath } from "node:url";

type Team = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

type Metadata = {
  title: string;
  subtitle?: string;
  publishedAt: string;
  notebook_link?: string;
  project_github?: string;
  summary: string;
  image?: string;
  images: string[];
  tag?: string;
  team: Team[];
  link?: string;
};

import { notFound } from "next/navigation";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");

function resolveContentDir(customPath: string[]) {
  const localDir = path.join(projectRoot, ...customPath);
  if (fs.existsSync(localDir)) {
    return localDir;
  }

  const cwdDir = path.join(process.cwd(), ...customPath);
  if (fs.existsSync(cwdDir)) {
    return cwdDir;
  }

  const workspaceDir = path.join(process.cwd(), "magic-portfolio", ...customPath);
  return workspaceDir;
}

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    notFound();
  }

  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  const metadata: Metadata = {
    title: data.title || "",
    subtitle: data.subtitle || "",
    publishedAt: data.publishedAt,
    notebook_link: data.notebook_link || "",
    project_github: data.project_github || "",
    summary: data.summary || "",
    image: data.image || "",
    images: data.images || [],
    tag: data.tag || [],
    team: data.team || [],
    link: data.link || "",
  };

  return { metadata, content };
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getPosts(customPath = ["", "", "", ""]) {
  const postsDir = resolveContentDir(customPath);
  return getMDXData(postsDir);
}
