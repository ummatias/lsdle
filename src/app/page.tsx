"use client";
import { MembersProvider } from "@/app/contexts/MembersContext";
import GuessingGame from "@/app/components/GuessingGame";
import Footer from "@/app/components/Footer";
import Image from "next/image";

export default function Home() {
    return (
        <MembersProvider>
            <div className="h-screen flex flex-col bg-gray-100">
                <main className="flex flex-col justify-center bg-gray-100 flex-grow overflow-hidden">
                    <Image
                        src="/lsd-logo.png"
                        alt="logo"
                        width={300}
                        height={100}
                        className="mx-auto mb-8"
                    />
                    <GuessingGame />
                </main>
                <Footer />
            </div>
        </MembersProvider>
    );
}
