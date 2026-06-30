import { notFound } from "next/navigation";
import { getPosts } from "@/utils/utils";
import {
  Meta,
  Schema,
  Button,
  Column,
  Heading,
  Media,
  Text,
  SmartLink,
  Row,
} from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { ScrollToHash, CustomMDX } from "@/components";
import { Metadata } from "next";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "work", "projects"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const posts = getPosts(["src", "app", "work", "projects"]);
  let post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
    path: `${work.path}/${post.slug}`,
  });
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  let post = getPosts(["src", "app", "work", "projects"]).find((post) => post.slug === slugPath);

  if (!post) {
    notFound();
  }

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={`${work.path}/${post.slug}`}
        title={post.metadata.title}
        description={post.metadata.summary}
        datePublished={post.metadata.publishedAt}
        dateModified={post.metadata.publishedAt}
        image={
          post.metadata.image || `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`
        }
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Button href="/work" variant="tertiary" weight="default" size="s" prefixIcon="chevronLeft">
        Projects
      </Button>

      <Heading variant="display-strong-s">{post.metadata.title}</Heading>

      {post.metadata.publishedAt && (
        <Text variant="body-default-xs" onBackground="neutral-weak">
          {formatDate(post.metadata.publishedAt)}
        </Text>
      )}

      {post.metadata.image && (
        <Media
          priority
          aspectRatio="16 / 9"
          radius="m"
          alt="Project Image"
          src={post.metadata.image}
        />
      )}

      {/* MDX content: Overview, Key Features, Skills */}
      <Column gap="m" horizontal="center" style={{ margin: "auto" }}>
        <CustomMDX source={post.content} />
      </Column>

      {/* Jupyter Notebook Embed */}
      {post.metadata.notebook_link && (
        <>
          <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
            <div style={{ margin: "8px", textAlign: "center" }}>
              <Text variant="body-default-s" onBackground="neutral-weak">
                ⚠️ This project is best viewed on a larger screen.
              </Text>
            </div>
          </Column>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100vw",
              overflowX: "hidden",
            }}
          >
            <iframe
              src={post.metadata.notebook_link}
              style={{
                margin: "8px",
                width: "75%",
                height: "600px",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            ></iframe>
          </div>
        </>
      )}

      {/* GitHub button */}
      {post.metadata.project_github && (
        <Column maxWidth="xs" horizontal="center" gap="m">
          <Button
            href={post.metadata.project_github}
            target="_blank"
            variant="primary"
            weight="strong"
            size="m"
          >
            View on GitHub
          </Button>
        </Column>
      )}

      <ScrollToHash />
    </Column>
  );
}
