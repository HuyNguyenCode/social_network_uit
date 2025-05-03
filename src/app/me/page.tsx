import { cookies } from "next/headers";
import ProfilePage from "@/app/me/profile";
import LogoutButton from "@/app/auth/components/LogoutButton";

export default async function MeProfile() {

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken");

  // const response = await fetch("http://localhost:4000/account/me", {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${sessionToken?.value}`,
  //   },
  // });

  return (
    <div>
      Me profile
      {/* <LogoutButton></LogoutButton> */}
      <ProfilePage></ProfilePage>

    </div>
  );
}
