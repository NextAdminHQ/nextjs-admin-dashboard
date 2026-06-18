import { NextResponse } from "next/server";

export async function GET() {
  const categories = [
    {
      id: "cat1",
      name: "Boissons",
      displayOrder: 1,
      active: true,
    },
    {
      id: "cat2",
      name: "Plats",
      displayOrder: 2,
      active: true,
    },
    {
      id: "cat3",
      name: "Desserts",
      displayOrder: 3,
      active: true,
    },
  ];

  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const body = await request.json();

  const newCategory = {
    id: Date.now().toString(),
    ...body,
    active: true,
  };

  return NextResponse.json(newCategory, { status: 201 });
}
