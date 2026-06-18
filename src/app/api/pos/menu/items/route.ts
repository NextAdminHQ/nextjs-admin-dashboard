import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get("categoryId");

  const items = [
    {
      id: "menu1",
      name: "Thé à la menthe",
      categoryId: "cat1",
      price: 600,
      preparationTime: 5,
      available: true,
      description: "Thé traditionnel",
    },
    {
      id: "menu2",
      name: "Café traditionnel",
      categoryId: "cat1",
      price: 600,
      preparationTime: 3,
      available: true,
      description: "Café noir",
    },
    {
      id: "menu3",
      name: "Couscous",
      categoryId: "cat2",
      price: 2000,
      preparationTime: 30,
      available: true,
      description: "Couscous aux sept légumes",
    },
  ];

  const filtered = categoryId
    ? items.filter((item) => item.categoryId === categoryId)
    : items;

  return NextResponse.json(filtered);
}

export async function POST(request: Request) {
  const body = await request.json();

  const newItem = {
    id: Date.now().toString(),
    ...body,
  };

  return NextResponse.json(newItem, { status: 201 });
}
