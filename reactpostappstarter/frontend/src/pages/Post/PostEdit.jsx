import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextInput, Button, Group, Box, Text, Loader } from "@mantine/core";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { useForm } from "@mantine/form";
import useBoundStore from "../../store/Store";



function EditPostPage() {
    const navigate = useNavigate();
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
            const response = await axios.get(`${DOMAIN}/api/posts/${id}`);
            const fetchedPost = response.data.post;
    
            if (fetchedPost) {
              setPost(fetchedPost);
    
              form.setValues({
                title: fetchedPost.title,
                category: fetchedPost.category,
                image: fetchedPost.image,
                content: fetchedPost.content,
              });
            } else {
              setError("Post not found");
            }
          } catch (err) {
            console.error("Error fetching post:", err);
            setError("An error occurred while fetching the post.");
          } finally {
            setLoading(false);
          }
        };
    
        fetchPostDetails();
      }, [id]);

      const form = useForm({
        initialValues: {
          title: "",
          category: "",
          image: "",
          content: "",
        },
      });
      
      if (loading) return <Text>Loading...</Text>;
      if (!post) return <Text>No post found</Text>;
      
      const isOwner = post?.userId === user?.id;
          

      const handleSubmit = async (values) => {
        try {
          const response = await axios.put(`${DOMAIN}/api/posts/${id}`, {
            ...values,
            userId: post.userId,
          });
    
          if (response?.data?.success) {
            navigate(`/posts/${id}`);
          } else {
            setError("Failed to update the post.");
          }
        } catch (err) {
          console.error("Error updating post:", err);
          setError("An error occurred while updating the post.");
        }
      };



 
      return (
        <Box maw={500} mx="auto">
          <Text size="lg" mb="md" weight={500}>
            Edit Post
          </Text>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label="Title"
              placeholder="Enter a Title"
              {...form.getInputProps("title")}
            />
            <TextInput
              label="Category"
              placeholder="Enter a Category"
              {...form.getInputProps("category")}
            />
            <TextInput
              label="Image"
              placeholder="Enter an Image URL"
              {...form.getInputProps("image")}
            />
            <TextInput
              label="Content"
              placeholder="Enter some content"
              {...form.getInputProps("content")}
            />
            <Group position="right" mt="md">
              <Button type="submit">Save Changes</Button>
            </Group>
          </form>
        </Box>
      );
    }
    

export default EditPostPage