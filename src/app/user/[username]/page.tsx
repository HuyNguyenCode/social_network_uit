"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserProfile() {
    const params = useParams();
    const router = useRouter();
    const username = params.username as string;

    useEffect(() => {
        // Only redirect to posts if we're on the exact username route
        if (window.location.pathname === `/${username}`) {
            router.push(`/${username}/posts`);
        }
    }, [username, router]);

    return null;
}
