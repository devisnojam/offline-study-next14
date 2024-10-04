import { Metadata } from "next";
import { Box, VStack, Input, Button, Heading } from "@chakra-ui/react";
import { KakaoLoginBtn } from "@/@components/social-btns";

export const metadata: Metadata = {
  title: "로그인",
};

export default function LoginPage() {
  return (
    <Box maxWidth="400px" margin="auto" mt={8}>
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          로그인
        </Heading>
        <Input placeholder="아이디" />
        <Input type="password" placeholder="비밀번호" />
        <Button colorScheme="blue">로그인</Button>

        <KakaoLoginBtn />
      </VStack>
    </Box>
  );
}
