import { Container } from "@mantine/core";
import classes from "./Landing.module.css";

const Landing = () => {
  return (
    <Container>
      <h1>Show Off Your Shots with Picly</h1>
      <p>Join a vibrant community of photographers. Upload, share, and get inspired by stunning photos from around the world.</p>
      <img src="https://girlsunited.essence.com/wp-content/uploads/2022/08/GettyImages-1320038604-Cropped-2048x1152.jpg" alt="" srcset="" className={classes.img} />
    </Container>
  );
};

export default Landing;
