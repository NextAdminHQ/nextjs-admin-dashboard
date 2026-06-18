import { NextResponse } from "next/server";

export async function GET() {
  const tables = [
    { id: "t1", number: 1, capacity: 2, status: "free", currentCustomers: 0 },
    { id: "t2", number: 2, capacity: 4, status: "occupied", currentCustomers: 3 },
    { id: "t3", number: 3, capacity: 4, status: "free", currentCustomers: 0 },
    { id: "t4", number: 4, capacity: 6, status: "occupied", currentCustomers: 5 },
    { id: "t5", number: 5, capacity: 2, status: "waiting_payment", currentCustomers: 2 },
    { id: "t6", number: 6, capacity: 4, status: "free", currentCustomers: 0 },
    { id: "t7", number: 7, capacity: 8, status: "occupied", currentCustomers: 7 },
    { id: "t8", number: 8, capacity: 4, status: "free", currentCustomers: 0 },
  ];

  return NextResponse.json(tables);
}

export async function POST(request: Request) {
  const body = await request.json();

  const newTable = {
    id: `t${Date.now()}`,
    number: body.number ?? 0,
    capacity: body.capacity ?? 2,
    status: body.status ?? "free",
    currentCustomers: body.currentCustomers ?? 0,
  };

  return NextResponse.json(newTable);
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const updatedTable = {
    id: params.id,
    ...body,
  };

  return NextResponse.json(updatedTable);
}
