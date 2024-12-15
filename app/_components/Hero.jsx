import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ContainerScroll } from "../../components/ui/container-scroll-animation";

function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-gray-100 flex items-center justify-center flex-col min-h-screen py-12">
      <div className="max-w-4xl text-center">
        {/* Hero Content */}
        <h1 className="text-4xl font-extrabold text-gray-800 md:text-5xl mb-6">
          Welcome to Money Manager
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          A simple and intuitive application designed to help you manage your finances effortlessly. Track your income, expenses, and savings all in one place. Your ultimate companion for smarter financial decisions!
        </p>
        
        {/* Call-to-Action Button */}
        <div className="flex justify-center gap-4">
          <Link href="/dashboard">
            <Button variant="default" className="rounded-full px-6 py-3 bg-blue-600 text-white hover:bg-blue-700">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>

      {/* Animation or Scroll Container */}
      <div className="mt-16 w-full">
        <ContainerScroll>
          <p className="text-gray-500 text-center text-sm">
            Explore the features and insights that make your experience delightful!
          </p>
        </ContainerScroll>
      </div>
    </section>
  );
}

export default Hero;