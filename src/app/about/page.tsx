"use client"; // ✅ Required for useState

import { useState } from "react";
import {
  Avatar,
  Button,
  Column,
  Flex,
  Heading,
  Icon,
  IconButton,
  SmartImage,
  Tag,
  Text,
} from "@/once-ui/components";
import TableOfContents from "@/components/about/TableOfContents";
import styles from "@/components/about/about.module.scss";
import { person, about, social } from "@/app/resources/content";
import { generateMetadata } from "./metadata"; // ✅ Keeps metadata separate

export default function About() {
  const structure = [
    { title: about.intro.title, display: about.intro.display, items: [] },
    { title: about.work.title, display: about.work.display, items: about.work.experiences.map((experience) => experience.company) },
    { title: about.studies.title, display: about.studies.display, items: about.studies.institutions.map((institution) => institution.name) },
    { title: about.technical.title, display: about.technical.display, items: about.technical.skills.map((skill) => skill.title) },
  ];

  // State for toggling "More Skills" and "More About Me" sections
  const [showMoreSkills, setShowMoreSkills] = useState(false);
  const [showMoreAboutMe, setShowMoreAboutMe] = useState(false);

  return (
    <Column maxWidth="m">
      {/* Table of Contents */}
      {about.tableOfContent.display && (
        <Column left="0" style={{ top: "50%", transform: "translateY(-50%)" }} position="fixed" paddingLeft="24" gap="32" hide="s">
          <TableOfContents structure={structure} about={about} />
        </Column>
      )}

      {/* Main Section */}
      <Flex fillWidth mobileDirection="column" horizontal="center">
        {/* Profile Section */}
        {about.avatar.display && (
          <Column className={styles.avatar} minWidth="160" paddingX="l" paddingBottom="xl" gap="m" flex={3} horizontal="center">
            <Avatar src={person.avatar} size="xl" />
            <Flex gap="8" vertical="center">
              <Icon onBackground="accent-weak" name="globe" />
              {person.location}
            </Flex>
            {person.languages.length > 0 && (
              <Flex wrap gap="8">
                {person.languages.map((language, index) => (
                  <Tag key={index} size="l">{language}</Tag>
                ))}
              </Flex>
            )}
          </Column>
        )}

        {/* Content Section */}
        <Column className={styles.blockAlign} flex={9} maxWidth={40}>
          {/* Intro Section */}
          {about.intro.display && (
            <Column id={about.intro.title} textVariant="body-default-l" fillWidth gap="m" marginBottom="xl">
              <Heading className={styles.textAlign} variant="display-strong-xl">{person.name}</Heading>
              <Text className={styles.textAlign} variant="display-default-xs" onBackground="neutral-weak">{person.role}</Text>
              <Text>{about.intro.description}</Text>

              {/* Collapsible "More About Me" Section */}
              {about.intro.moreAboutMe && (
                <>
                  <Button variant="tertiary" onClick={() => setShowMoreAboutMe(!showMoreAboutMe)} style={{ marginTop: "10px" }}>
                    {showMoreAboutMe ? "Show Less" : "More About Me"}
                  </Button>

                  {showMoreAboutMe && (
                    <Column fillWidth gap="m" marginTop="12">
                      {about.intro.moreAboutMe.split("\n\n").map((paragraph, index) => (
                        <Text key={index} variant="body-default-m" onBackground="neutral-weak">
                          {paragraph}
                        </Text>
                      ))}
                    </Column>
                  )}
                </>
              )}
            </Column>
          )}

          {/* Studies Section */}
          {about.studies.display && (
            <>
              <Heading as="h2" id={about.studies.title} variant="display-strong-s" marginBottom="m">
                {about.studies.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.studies.institutions.map((institution, index) => (
                  <Column key={`${institution.name}-${index}`} fillWidth gap="4">
                    <Text id={institution.name} variant="heading-strong-l">{institution.name}</Text>
                    <Text variant="heading-default-xs" onBackground="neutral-weak">{institution.description}</Text>
                  </Column>
                ))}
              </Column>
            </>
          )}

          {/* Technical Skills Section */}
          {about.technical.display && (
            <>
              <Heading as="h2" id={about.technical.title} variant="display-strong-s" marginBottom="40">
                {about.technical.title}
              </Heading>

              {/* Display Core Technical Skills with Descriptions */}
              <Column fillWidth gap="l">
                {about.technical.skills.map((skill, index) => (
                  <Column key={index} fillWidth gap="4">
                    <Text variant="heading-strong-l">{skill.title}</Text>
                    <Text variant="body-default-m" onBackground="neutral-weak">{skill.description}</Text>
                  </Column>
                ))}
              </Column>

              {/* Collapsible "More Skills" Section */}
              <Button variant="tertiary" onClick={() => setShowMoreSkills(!showMoreSkills)} style={{ marginTop: "20px" }}>
                {showMoreSkills ? "Hide Additional Skills" : "More Skills"}
              </Button>

              {showMoreSkills && (
                <Column fillWidth gap="12" marginTop="12">
                  <Text variant="body-default-m" onBackground="neutral-weak">
                    {about.technical.moreSkills?.length > 0 ? about.technical.moreSkills.join(" • ") : "No additional skills listed"}
                  </Text>
                </Column>
              )}
            </>
          )}
        </Column>
      </Flex>
    </Column>
  );
}
