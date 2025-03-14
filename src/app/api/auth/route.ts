export async function POST(request: Request) {
  const res = await request.json();
  const sessionToken = res.token;
  if (!sessionToken) {
    console.log(res);
    return Response.json(
      { message: "Không nhận được sessionToken" },
      {
        status: 400,
      }
    );
  }
  return Response.json(
    { res },
    {
      status: 200,
      headers: {
        "Set-Cookie": `sessionToken=${sessionToken}; Path=/; HttpOnly`,
      },
    }
  );
}
