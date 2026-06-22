import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";
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
    </Column>
  );
}
