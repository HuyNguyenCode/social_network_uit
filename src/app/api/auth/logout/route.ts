import { cookies } from "next/headers";
export async function POST(request: Request) {
  const res = await request.json();
  const force = res.force as boolean | undefined;

  const cookieStore = cookies();
  const sessionToken = (await cookieStore).get("sessionToken")?.value;
  console.log("Get into localhost:3000 logout");
  
  if (force) {
    return Response.json(
      { message: "Buộc đăng xuất thành công" },
      {
        status: 200,
        headers: {
          "Set-Cookie": `sessionToken=; Path=/; Max-Age=0; SameSite=Strict`,
        },
      }
    );
  }

  if (!sessionToken) {
    console.log("Không tìm thấy sessionToken trong cookieStore");
    return Response.json(
      { message: "Không nhận được session token" },
      { status: 401 }
    );
  }

  console.log("sessionToken:", sessionToken);
  // const router = useRouter();
  try {
    // const response = await fetch("http://localhost:4000/auth/logout", {
    //   method: "POST",
    //   body: JSON.stringify({}),
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${sessionToken}`,
    //   },
    // });

    // const payload = await response.json();

    // if (!response.ok) {
    //   return Response.json(payload, { status: response.status });
    // }
 
 
    return Response.json(
      { message: "Đăng xuất thành công" },
      {
        status: 200,
        headers: {
          "Set-Cookie": `sessionToken=; Path=/; Max-Age=0; SameSite=Strict`,
        },
      }
    );
  } catch (error) {
    console.error("Lỗi đăng xuất:", error);
    return Response.json(
      { message: "Lỗi không xác định khi đăng xuất", error },
      { status: 500 }
    );
  }
}
