import React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";

export default function KakaoLoginBtn() {
  return (
    <Button
      as={Flex}
      minWidth="300px"
      maxWidth="600px"
      width="100%"
      height="45px"
      px={4}
      bg="#FEE500"
      borderRadius="xl"
      alignItems="center"
      justifyContent="center"
      gap={1.5}
    >
      <Image src="/imgs/kakao_icon.svg" alt="kakao" width={18} height={18} />
      <Text fontSize="16px" fontWeight="500" color="#000000cc">
        Login with Kakao
      </Text>
    </Button>
  );
}
