"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserProfile() {
    const params = useParams();
    const router = useRouter();
    const username = params.username as string;
      
    useEffect(() => {
        // Luôn redirect khi vào trang này
        router.replace(`/user/${username}/posts`);
    }, [username, router]);

    return null;
}
