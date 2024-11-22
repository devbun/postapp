import { useNavigate } from "react-router-dom";
import useBoundStore from "../../store/Store";
import classes from './AuthenticationTitle.module.css';
import { useState, useEffect } from "react";

import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginService, authLoading, user } = useBoundStore((state) => state);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!!user) {
      navigate("/posts");
    }
  }, [user]);

  const onLogin = async (e) => {
    e.preventDefault();

    setErrorMessage(""); // Clear any previous errors
    if (!email || !password) {
      setErrorMessage("Email and password are required.");
      return;
    }

    try {
      await loginService(email, password);
    } catch (error) {
      setErrorMessage("Invalid credentials. Please try again.");
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        {errorMessage && (
          <Text color="red" size="sm" align="center" mt={10}>
            {errorMessage}
          </Text>
        )}
        <TextInput
          label="Email"
          placeholder="you@picly.dev"
          required
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button
          fullWidth
          mt="xl"
          onClick={onLogin}
          loading={authLoading}
          disabled={authLoading}
        >
          Sign in
        </Button>
      </Paper>
    </Container>
  );
};

export default LoginPage;