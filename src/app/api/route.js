export async function GET(request) {
  const data = { message: "System is up and running", status: "OK" };
  return Response.json(data);
}
