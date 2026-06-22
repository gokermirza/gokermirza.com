import { Button, Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";
import { baseURL, about, person, videos } from "@/resources";
import { VideosView } from "@/components/videos/VideosView";

export async function generateMetadata() {
  return Meta.generate({
    title: videos.title,
    description: videos.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(videos.title)}`,
    path: videos.path,
  });
}

export default function Videos() {
  return (
    <Column maxWidth="l" paddingTop="24" gap="24" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={videos.path}
        title={videos.title}
        description={videos.description}
        image={`/api/og/generate?title=${encodeURIComponent(videos.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column maxWidth="s" horizontal="center" gap="12" align="center">
        <Heading variant="heading-strong-xl" align="center" wrap="balance">
          {videos.title}
        </Heading>
        <Text variant="body-default-l" onBackground="neutral-weak" align="center" wrap="balance">
          {videos.description}
        </Text>
      </Column>
      <VideosView />

      {videos.channelUrl && (
        <Column
          fillWidth
          maxWidth="s"
          horizontal="center"
          align="center"
          gap="16"
          padding="xl"
          marginTop="24"
          radius="l"
          background="surface"
          border="neutral-alpha-weak"
        >
          <Heading variant="heading-strong-l" align="center" wrap="balance">
            Yeni videoları kaçırma
          </Heading>
          <Text variant="body-default-m" onBackground="neutral-weak" align="center" wrap="balance">
            Strateji, performans ve insan davranışı üzerine yeni videolar için Kurumsal Pusula'ya abone ol.
          </Text>
          <Button
            href={videos.channelUrl}
            target="_blank"
            variant="primary"
            size="m"
            prefixIcon="youtube"
            suffixIcon="arrowUpRightFromSquare"
          >
            Kanala git
          </Button>
        </Column>
      )}
    </Column>
  );
}
