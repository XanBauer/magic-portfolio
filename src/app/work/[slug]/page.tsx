import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { getPosts } from "@/app/utils/utils";
import { Button, Column, Heading, SmartImage, Text } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import ScrollToHash from "@/components/ScrollToHash";

interface WorkParams {
  params: {
    slug: string;
  };
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "work", "projects"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params: { slug } }: WorkParams) {
  let post = getPosts(["src", "app", "work", "projects"]).find((post) => post.slug === slug);

  if (!post) {
    return;
  }

  let { title, summary: description, image } = post.metadata;
  let ogImage = image ? `https://${baseURL}${image}` : `https://${baseURL}/og?title=${title}`;

  return {
    title,
    description,
    images: [ogImage],
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://${baseURL}/work/${post.slug}`,
      images: [{ url: ogImage }],
    },
  };
}

export default function Project({ params }: WorkParams) {
  let post = getPosts(["src", "app", "work", "projects"]).find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
      {/* JSON-LD Schema (without Twitter & publishedTime) */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `https://${baseURL}${post.metadata.image}`
              : `https://${baseURL}/og?title=${post.metadata.title}`,
            url: `https://${baseURL}/work/${post.slug}`,
            author: {
              "@type": "Person",
              name: "Xan Bauer",
            },
          }),
        }}
      />
      
      {/* Back Button */}
      <Button href="/work" variant="tertiary" weight="default" size="s" prefixIcon="chevronLeft">
        Projects
      </Button>

      {/* Title */}
      <Heading variant="display-strong-s">{post.metadata.title}</Heading>

      {/* Thumbnail Image */}
      {post.metadata.image && (
        <SmartImage
          priority
          aspectRatio="16 / 9"
          radius="m"
          alt="Project Image"
          src={post.metadata.image}
        />
      )}

      {/* Project Description */}
      <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
        {/* <Text variant="body-default-s" onBackground="neutral-weak">
          {post.metadata.summary}
        </Text> */}

        {/* Screen Size Warning */}
        <div style={{ margin: "8px", textAlign: "center" }}>
          <Text variant="body-default-s" onBackground="neutral-weak">
            ⚠️ This project is best viewed on a larger screen.
          </Text>
        </div>
        
        {/* <Text variant="body-default-s" onBackground="neutral-weak">
          This project is best viewed on a larger screen.
        </Text> */}
      </Column>

      {/* Jupyter Notebook Embed */}
      {post.metadata.notebook_link && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100vw", // Ensures the container takes the full viewport width
            overflowX: "hidden", // Prevents unwanted horizontal scroll
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
      )}

      {/* Render MDX content */}
      <Column gap="m" horizontal="center" style={{ margin: "auto" }}>
        <CustomMDX source={post.content} />
      </Column>

      {/* Buttons: View on GitHub & More Projects */}
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

      <ScrollToHash />
    </Column>
  );
}
