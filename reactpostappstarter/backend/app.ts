import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import {
  findUserById,
  IDecodedUser,
  verifyUser,
  parseToken,
  addPost,
  posts,
  sleep,
} from "./fakedb";

const port = 8085;
const app = express();
app.use(cors());
app.use(express.json());

// TODO: Obviously use a more secure signing key than "secret"
app.post("/api/user/login", (req, res) => {
  try {
    const { email, password } = req.body;
    const user = verifyUser(email, password);
    const token = jwt.sign({ id: user.id }, "secret", {
      expiresIn: "2 days",
    });
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.post("/api/user/validation", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = parseToken(authHeader, res);
    const decodedUser = jwt.verify(token, "secret");
    const user = findUserById((decodedUser as IDecodedUser).id);
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.get("/api/posts", async (req, res) => {
  // Sleep delay goes here
  res.json(posts);
});

app.put("/api/posts/:id", (req, res) => {
  const id = parseInt(req.params.id, 10); 
  const updatedPost = req.body;
  const authHeader = req.headers.authorization;

  try {
    // Authorization: Verify token
    const token = parseToken(authHeader, res);
    const decodedUser = jwt.verify(token, "secret");
    const user = findUserById((decodedUser as IDecodedUser).id);

    // Find the post
    const postIndex = posts.findIndex((post) => post.id === id);
    if (postIndex === -1) {
      return res.status(404).json({ error: "Post not found" });
    }

    const post = posts[postIndex];

    // Ensure the user owns the post
    if (post.userId !== user.id) {
      return res.status(403).json({ error: "Unauthorized to edit this post" });
    }

    // Validation: Check for required fields
    if (!updatedPost.title || !updatedPost.category || !updatedPost.content) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Update the post
    posts[postIndex] = { ...post, ...updatedPost }; // Merge updated data
    res.json({ success: true, post: posts[postIndex] });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "An error occurred while updating the post" });
  }
});


// ⭐️ TODO: Implement this yourself
app.get("/api/posts/:id", (req, res) => {
  const id = parseInt(req.params.id, 10); // Convert the id from string to number
  
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  try {
    const author = findUserById(post.userId);
    return res.json({ post, author });
  } catch (error) {
    // Handle case where author is not found
    return res.status(404).json({ error: "Author not found" });
  }
});


/**
 * Problems with this:
 * (1) Authorization Issues:
 *     What if you make a request to this route WITHOUT a token?
 *     What if you make a request to this route WITH a token but
 *     it's invalid/expired?
 * (2) Server-Side Validation Issues:
 *     What if you make a request to this route with a valid token but
 *     with an empty/incorrect payload (post)
 */
app.post("/api/posts", (req, res) => {
  const incomingPost = req.body;
  addPost(incomingPost);
  res.status(200).json({ success: true });
});

app.listen(port, () => console.log("Server is running"));
