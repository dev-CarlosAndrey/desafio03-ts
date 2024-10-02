import { Center, SimpleGrid, Spinner, Button } from "@chakra-ui/react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { api } from "../api";
import CardInfo from "../components/CardInfo";
import { AppContext } from "../components/AppContext";

interface UserData {
  email: string;
  password: string;
  name: string;
  balance: number;
  id: string;
}

const Conta = () => {
  const [userData, setUserData] = useState<null | UserData>(null); 
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoggedIn } = useContext(AppContext);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/"); 
    }
  }, [isLoggedIn, navigate]); 

  useEffect(() => {
    const getData = async () => {
      try {
        const data: any | UserData = await api;
        setUserData(data);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
        navigate("/"); 
      }
    };

    getData();
  }, [navigate]);

  const actualData = new Date();

  if (userData && id !== userData.id) {
    navigate("/");
  }

  return (
    <Center>
      <SimpleGrid columns={2} spacing={8} paddingTop={16}>
        {userData === null ? (
          <Center>
            <Spinner size="xl" color="white" />
          </Center>
        ) : (
          <>
            <CardInfo
              mainContent={`Bem vindo(a) ${userData?.name}`}
              content={`${actualData.getDate()} / ${
                actualData.getMonth() + 1
              } / ${actualData.getFullYear()} ${String(
                actualData.getHours()
              ).padStart(2, "0")}:${String(actualData.getMinutes()).padStart(
                2,
                "0"
              )}`}
            />
            <CardInfo
              mainContent="Saldo"
              content={`R$ ${userData.balance.toFixed(2)}`}
            />
            <Center>
            <Link to="infoconta">
              <Button>Informações da Conta</Button>
            </Link>
            </Center>
          </>
        )}
      </SimpleGrid>
    </Center>
  );
};

export default Conta;
