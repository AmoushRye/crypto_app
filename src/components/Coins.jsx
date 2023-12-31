import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from "../index"
import { Container, HStack, VStack } from '@chakra-ui/react'
import Loader from './Loader'
import { Text, Heading, Image } from '@chakra-ui/react'
import ErrorComponent from './ErrorComponent'
const Coins = () => {
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)
    const [page,setPage] = useState(1);
    const [currency,setCurrency] = useState("inr");
    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
                setCoins(data)
                setLoading(false)
            } catch (error) {
                setError(true)
                setLoading(false)
            }
        }
        fetchCoins()
    }, [currency,page]);
    if(error) return <ErrorComponent message = {"Error while Fetching exchanges"}/> 


    return (
        <Container maxW={"container.xl"}>
            {loading ? (<Loader />) : (<>
                <HStack wrap={"wrap"}>
                    {
                        coins.map((i) => (
                            <ExchangeCard key={i.id} name={i.name} img={i.image} rank={i.trust_score_rank} url={i.url} />
                        ))
                    }
                </HStack>
            </>
            )}
        </Container>
    );
}

const ExchangeCard = ({ name, img, rank, url }) =>
    <a href={url} target={"blank"}>
        <VStack w={"52"} shadow={"lg"} p="8" borderRadius={"lg"} transition={"all 0.3s"} m={"4"}
            css={{
                "&:hover": {
                    transform: "scale(1.2)"
                }
            }}
        >
            <Image src={img} w={"10"} h={"10"} objectFit={"contain"} alt={"exchange"} />
            <Heading size={"md"} noOfLines={1}>{rank}</Heading>
            <Text noOfLines={1}>{name}</Text>
        </VStack>
    </a>

export default Coins
