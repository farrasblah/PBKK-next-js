"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Ganti dengan next/navigation

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        // Redirect ke halaman /sign-in
        router.push('/sign-in');
    }, [router]);

    return null; // Tidak menampilkan apa pun karena pengguna langsung diarahkan
}

