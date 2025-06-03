import { cookies } from "next/headers";

export async function POST(request: Request) {
  const res = await request.json();
  const sessionToken = res.token;
  if (!sessionToken) {
    return Response.json(
      { message: "Không nhận được sessionToken" },
      {
        status: 400,
      }
    );
  }

  const cookieStore = await cookies();
  cookieStore.set("sessionToken", sessionToken, {
    path: "/",
    secure: false, // ❌ Bỏ `secure` khi test trên localhost
    sameSite: "lax",
    httpOnly: false, // ❌ Tắt HttpOnly để FE có thể đọc cookie
  });

  return Response.json(
    { res },
    {
      status: 200,
      headers: {
        "Set-Cookie": `sessionToken=${sessionToken}; Path=/;`,
      },
    }
  );
}
