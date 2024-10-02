import { Box } from "@chakra-ui/react";

export const Card = ({ children }: any) => {
  return (
    <Box maxW="lg" borderWidth="1px" borderRadius="lg" boxShadow="md" p={6} bg="white" w="100%" h="auto" marginLeft="70vh" marginTop="50px" >
      { children }
    </Box>
  );
};
