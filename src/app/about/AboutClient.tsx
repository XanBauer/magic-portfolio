"use client";

import { useState } from "react";
import {
  Avatar,
  Button,
  Column,
  Heading,
  Icon,
  IconButton,
  Media,
  Row,
  Tag,
  Text,
} from "@once-ui-system/core";
import { About, Person, Social } from "@/types";
import TableOfContents from "@/components/about/TableOfContents";
import styles from "@/components/about/about.module.scss";
import React from "react";

interface AboutClientProps {
  about: About;
  person: Person;
  social: Social;
  aboutExtras: { moreAboutMe: string; moreSkills: string[] };
}

export default function AboutClient({ about, person, social, aboutExtras }: AboutClientProps) {
  const structure = [
    { title: about.intro.title,     display: about.intro.display,     items: [] },
    { title: about.work.title,      display: about.work.display,      items: about.work.experiences.map((e) => e.company) },
    { title: about.studies.title,   display: about.studies.display,   items: about.studies.institutions.map((i) => i.name) },
    { title: about.technical.title, display: about.technical.display, items: about.technical.skills.map((s) => s.title) },
  ];

  const [showMoreSkills,  setShowMoreSkills]  = useState(false);
  const [showMoreAboutMe, setShowMoreAboutMe] = useState(false);

  return (
    <Column maxWidth="m">
      {about.tableOfContent.display && (
        <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          s={{ hide: true }}
        >
          <TableOfContents structure={structure} about={about} />
        </Column>
      )}
      <Row fillWidth s={{ direction: "column" }} horizontal="center">
        {about.avatar.display && (
          <Column
            className={styles.avatar}
            top="64"
            fitHeight
            position="sticky"
            s={{ position: "relative", style: { top: "auto" } }}
            xs={{ style: { top: "auto" } }}
            minWidth="160"
            paddingX="l"
            paddingBottom="xl"
            gap="m"
            flex={3}
            horizontal="center"
          >
            <Avatar src={person.avatar} size="xl" />
            <Row gap="8" vertical="center">
              <Icon onBackground="accent-weak" name="globe" />
              {person.location}
            </Row>
            {person.languages && person.languages.length > 0 && (
              <Row wrap gap="8">
                {person.languages.map((language, index) => (
                  <Tag key={index} size="l">{language}</Tag>
                ))}
              </Row>
            )}
            {social.length > 0 && (
              <Row
                className={styles.blockAlign}
                paddingTop="20"
                paddingBottom="8"
                gap="8"
                wrap
                horizontal="center"
                fitWidth
                data-border="rounded"
              >
                {social
                  .filter((item) => item.essential)
                  .map((item) =>
                    item.link && (
                      <React.Fragment key={item.name}>
                        <Row s={{ hide: true }}>
                          <Button
                            href={item.link}
                            prefixIcon={item.icon}
                            label={item.name}
                            size="s"
                            weight="default"
                            variant="secondary"
                          />
                        </Row>
                        <Row hide s={{ hide: false }}>
                          <IconButton
                            size="l"
                            href={item.link}
                            icon={item.icon}
                            variant="secondary"
                          />
                        </Row>
                      </React.Fragment>
                    ),
                  )}
              </Row>
            )}
          </Column>
        )}

        <Column className={styles.blockAlign} flex={9} maxWidth={40}>
          {about.intro.display && (
            <Column id={about.intro.title} textVariant="body-default-l" fillWidth gap="m" marginBottom="xl">
              <Heading className={styles.textAlign} variant="display-strong-xl">{person.name}</Heading>
              <Text className={styles.textAlign} variant="display-default-xs" onBackground="neutral-weak">{person.role}</Text>
              <Text>{about.intro.description}</Text>

              {aboutExtras.moreAboutMe && (
                <>
                  <Button variant="tertiary" onClick={() => setShowMoreAboutMe(!showMoreAboutMe)} style={{ marginTop: "10px" }}>
                    {showMoreAboutMe ? "Show Less" : "More About Me"}
                  </Button>
                  {showMoreAboutMe && (
                    <Column fillWidth gap="m" marginTop="12">
                      {aboutExtras.moreAboutMe.split("\n\n").map((paragraph, index) => (
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

          {about.work.display && (
            <>
              <Heading as="h2" id={about.work.title} variant="display-strong-s" marginBottom="m">
                {about.work.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.work.experiences.map((experience, index) => (
                  <Column key={`${experience.company}-${experience.role}-${index}`} fillWidth>
                    <Row fillWidth horizontal="between" vertical="end" marginBottom="4">
                      <Text id={experience.company} variant="heading-strong-l">{experience.company}</Text>
                      <Text variant="heading-default-xs" onBackground="neutral-weak">{experience.timeframe}</Text>
                    </Row>
                    <Text variant="body-default-s" onBackground="brand-weak" marginBottom="m">{experience.role}</Text>
                    <Column as="ul" gap="16">
                      {experience.achievements.map((achievement: React.ReactNode, i: number) => (
                        <Text as="li" variant="body-default-m" key={`${experience.company}-${i}`}>
                          {achievement}
                        </Text>
                      ))}
                    </Column>
                    {experience.images && experience.images.length > 0 && (
                      <Row fillWidth paddingTop="m" paddingLeft="40" gap="12" wrap>
                        {experience.images.map((image, i) => (
                          <Row key={i} border="neutral-medium" radius="m" minWidth={image.width} height={image.height}>
                            <Media enlarge radius="m" sizes={image.width.toString()} alt={image.alt} src={image.src} />
                          </Row>
                        ))}
                      </Row>
                    )}
                  </Column>
                ))}
              </Column>
            </>
          )}

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

          {about.technical.display && (
            <>
              <Heading as="h2" id={about.technical.title} variant="display-strong-s" marginBottom="40">
                {about.technical.title}
              </Heading>
              <Column fillWidth gap="l">
                {about.technical.skills.map((skill, index) => (
                  <Column key={`${skill.title}-${index}`} fillWidth gap="4">
                    <Text id={skill.title} variant="heading-strong-l">{skill.title}</Text>
                    <Text variant="body-default-m" onBackground="neutral-weak">{skill.description}</Text>
                    {skill.tags && skill.tags.length > 0 && (
                      <Row wrap gap="8" paddingTop="8">
                        {skill.tags.map((tag, tagIndex) => (
                          <Tag key={`${skill.title}-${tagIndex}`} size="l" prefixIcon={tag.icon}>{tag.name}</Tag>
                        ))}
                      </Row>
                    )}
                  </Column>
                ))}
              </Column>

              <Button variant="tertiary" onClick={() => setShowMoreSkills(!showMoreSkills)} style={{ marginTop: "20px" }}>
                {showMoreSkills ? "Hide Additional Skills" : "More Skills"}
              </Button>
              {showMoreSkills && (
                <Column fillWidth gap="12" marginTop="12">
                  <Text variant="body-default-m" onBackground="neutral-weak">
                    {aboutExtras.moreSkills.length > 0 ? aboutExtras.moreSkills.join(" • ") : "No additional skills listed"}
                  </Text>
                </Column>
              )}
            </>
          )}
        </Column>
      </Row>
    </Column>
  );
}
