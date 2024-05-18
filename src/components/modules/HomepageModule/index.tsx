"use client"
import { ProductCardProps } from "@/components/elements/ProductCard";
import { useEffect, useState } from "react";
import CarouselSection from "./sections/CarouselSection";
import CategorySection from "./sections/CategorySection";
import ProductSection from "./sections/ProductSection";
import { getAllProduct } from "@/api/service";
import { Client, IMessage, Message } from '@stomp/stompjs';

const HomepageModule = () => {
    const [productCards, setProductCards] = useState<ProductCardProps[]>([]);
    const [client, setClient] = useState<Client | null>(null);

    useEffect(() => {
        const connectClient = async () => {
            const newClient = new Client({
                brokerURL: 'wss://api-gateway-specialitystore.up.railway.app/product-service/ws-message',
                reconnectDelay: 5000,
            });

            newClient.onConnect = () => {
                console.log('Connected to WebSocket');
                newClient.subscribe('/topic/product-update', onMessage);
            };

            newClient.onUnhandledMessage = (message: IMessage) => {
                console.log(message.body)
                console.log(message)
            }

            newClient.onStompError = (frame) => {
                console.log('Error:', frame);
                // Lakukan penanganan kesalahan sesuai kebutuhan, seperti menampilkan pesan kesalahan kepada pengguna
            };

            newClient.activate();
            setClient(newClient);
        };

        connectClient();

        return () => {
            if (client) {
                client.deactivate();
            }
        };
    }, []);
    const fetchData = async () => {
        const products = await getAllProduct();
        setProductCards(products);
    };

    const onMessage = (message: Message) => {
        console.log('Received message:', message.body);
        if(message.body == "update"){
            fetchData()
        }
    };

    useEffect(() => {
        

        fetchData();
    }, []);

    return (
        <div className="flex flex-col w-screen pt-20 md:pt-24">
            <CarouselSection lst={productCards.slice(0, Math.min(6, productCards.length)).sort(() => Math.random() - 0.5)} />
            <CategorySection />
            <ProductSection lst={productCards} />
        </div>
    );
};

export default HomepageModule;

