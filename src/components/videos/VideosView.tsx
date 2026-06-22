import { Button, Column, Flex, Heading, Text } from "@once-ui-system/core";
import { videos } from "@/resources";

export function VideosView() {
  return (
    <Column fillWidth gap="40" horizontal="center">
      {videos.channelUrl && (
        <Button
          href={videos.channelUrl}
          target="_blank"
          variant="secondary"
          size="m"
          prefixIcon="youtube"
          suffixIcon="arrowUpRightFromSquare"
        >
          Kurumsal Pusula kanalına git
        </Button>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "24px",
          width: "100%",
        }}
      >
        {videos.videos.map((video, index) => (
          <Column
            key={`${video.id}-${index}`}
            background="surface"
            border="neutral-alpha-weak"
            radius="l"
            overflow="hidden"
            fillWidth
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                paddingBottom: "56.25%",
                background: "var(--neutral-background-medium)",
              }}
            >
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                title={video.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
              />
            </div>
            <Flex direction="column" gap="8" padding="20" fillWidth>
              <Heading as="h2" variant="heading-strong-s" wrap="balance">
                {video.title}
              </Heading>
              {video.description && (
                <Text variant="body-default-s" onBackground="neutral-weak" wrap="balance">
                  {video.description}
                </Text>
              )}
            </Flex>
          </Column>
        ))}
      </div>
    </Column>
  );
}
