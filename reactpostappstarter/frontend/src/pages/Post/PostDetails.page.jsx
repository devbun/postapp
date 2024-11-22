import { Link } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import useBoundStore from "../../store/Store"; 
import { Button, Container } from "@mantine/core";
import { useState, useEffect } from "react";

import { useLoaderData } from "react-router-dom";
import { IconBookmark, IconHeart, IconShare } from '@tabler/icons-react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  ActionIcon,
  Avatar,
  Badge,
  Card,
  Group,
  Image,
  Text,
  useMantineTheme,
} from '@mantine/core';
import classes from './ArticleCardFooter.module.css';

function PostDetailsPage() {
  const theme = useMantineTheme();
  const { id } = useParams();
  console.log(`We got da post ID: ${id}`);
  const { user } = useBoundStore((state) => state); 
  console.log(`We got da user: ${user.email}`);
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/api/posts/${id}`);
        setPost(response.data.post);
        setAuthor(response.data.author);
        console.log("Fetched post:", response.data);
        console.log("fetched author", response.data.author)
      } catch (error) {
        console.error("Error fetching post:", error); // Handle any errors
      } finally {
        setLoading(false); // Stop loading after the request completes
      }
    };

    fetchPostDetails(); // Call the function to fetch post details
  }, [id]);


//Handle loading/errors
if (loading) return <Text>Loading...</Text>;
if (!post) return <Text>No post found</Text>;

const isOwner = post?.userId === user?.id;

const handleEditClick = () => {
  navigate(`/edit-post/${id}`);
};

  return (
    <Card withBorder padding="lg" radius="md" className={classes.card}>
      <Card.Section mb="sm">
        <Image
          src={post.image}
          alt="Top 50 underrated plants for house decoration"
          height={800}
        />
      </Card.Section>

      <Badge w="fit-content" variant="light">
        {post.category}
      </Badge>

      <Text fw={700} className={classes.title} mt="xs">
        {post.title}
      </Text>

      <p>
      {post.content}
      </p>

      <Group mt="lg">
        <Avatar
          src="https://media.istockphoto.com/id/1341046662/vector/picture-profile-icon-human-or-people-sign-and-symbol-for-template-design.jpg?s=612x612&w=0&k=20&c=A7z3OK0fElK3tFntKObma-3a7PyO8_2xxW0jtmjzT78="
          radius="sm"
        />
        <div>
          <Text fw={500}>{author.email}</Text>
          {/* <Text fz="xs" c="dimmed">
            posted 34 minutes ago
          </Text> */}
        </div>
      </Group>

      <Card.Section className={classes.footer}>
        <Group justify="space-between">
          <Text fz="xs" c="dimmed">
            733 people liked this
          </Text>
          <Group gap={0}>


          {isOwner && (
                      <div onClick={handleEditClick} className={classes.edit}>Edit</div>
      )}
            <ActionIcon variant="subtle" color="gray">
              <IconHeart size={20} color={theme.colors.red[6]} stroke={1.5} />
            </ActionIcon>
            <ActionIcon variant="subtle" color="gray">
              <IconBookmark size={20} color={theme.colors.yellow[6]} stroke={1.5} />
            </ActionIcon>
            <ActionIcon variant="subtle" color="gray">
              <IconShare size={20} color={theme.colors.blue[6]} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
}

export const postDetailsLoader = async ({ params }) => {
  // do something with this
  return null;
};

export default PostDetailsPage;
