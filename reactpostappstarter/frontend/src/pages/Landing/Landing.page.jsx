import { Button, Container, Overlay, Text, Title } from '@mantine/core';
import classes from "./Landing.module.css";

export function Landing() {
  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container} size="md">
        <Title className={classes.title}>Show Off Your Shots with Picly</Title>
        <Text className={classes.description} size="xl" mt="xl">
        Join a vibrant community of photographers. Upload, share, and get inspired by stunning photos from around the world.
        </Text>

        <Button variant="gradient" size="xl" radius="xl" className={classes.control}>
          Get started
        </Button>
      </Container>
    </div>
  );
}

export default Landing;
