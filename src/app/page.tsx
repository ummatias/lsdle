"use client";
import { MembersProvider } from "@/app/contexts/MembersContext";
import GuessingGame from "@/app/components/GuessingGame";
import Footer from "@/app/components/Footer";
import Image from "next/image";

export default function Home() {
    return (
        <MembersProvider>
            <div className="h-screen flex flex-col bg-gray-100">
                <main className="flex flex-col justify-center bg-gray-100 flex-grow overflow-y-auto px-4">
                    <Image
                        src="/lsd-logo.png"
                        alt="logo"
                        width={300}
                        height={100}
                        className="mx-auto mb-8 h-auto w-full max-w-[300px]"
                    />
                    <GuessingGame />
                </main>
                <Footer />
            </div>
        </MembersProvider>
    );
}
