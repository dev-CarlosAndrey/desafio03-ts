import { Center, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import CardInfo from "../components/CardInfo";
import { useEffect, useState } from "react";
import { api } from "../api";

const ContaInfo = () => {
  const [userData, setUserData] = useState<null | UserData>(null);
  const navigate = useNavigate();

  interface UserData {
    email: string;
    password: string;
    name: string;
    balance: number;
    id: string;
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const data: any | UserData = await api;
        setUserData(data);
      } catch (error) {
        console.error("Erro ao buscar dados: ", error);
        navigate("/");
      }
    };
    getData();
  }, [navigate]);

  return (
    <>
      <Center paddingTop="50px">
        <Text fontSize="3xl" fontWeight="bold">
          Informações da conta
        </Text>
      </Center>
      <Center>
        <SimpleGrid columns={2} spacing={8} paddingTop={20}>
          {userData === null ? (
            <Center>
              <Spinner size="x1" color="black" />
            </Center>
          ) : (
            <>
              <CardInfo
                mainContent={`Nome: ${userData?.name}`}
                content="Nome do usuario"
              />
              <CardInfo
                mainContent={`Email: ${userData?.email}`}
                content="Email do usuario"
              />
            </>
          )}
        </SimpleGrid>
      </Center>
    </>
  );
};

export default ContaInfo;
