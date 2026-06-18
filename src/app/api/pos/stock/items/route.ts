import { NextResponse } from "next/server";

export async function GET() {
  const items = [
    {
      id: "stock1",
      name: "Farine",
      quantity: 50,
      unit: "kg",
      unitCost: 500,
      minThreshold: 20,
      lastUpdated: new Date(),
      alerts: [],
    },
    {
      id: "stock2",
      name: "Sucre",
      quantity: 5,
      unit: "kg",
      unitCost: 1000,
      minThreshold: 10,
      lastUpdated: new Date(),
      alerts: [{ id: "a1", itemId: "stock2", type: "low", createdAt: new Date() }],
    },
    {
      id: "stock3",
      name: "Huile d'olive",
      quantity: 0,
      unit: "L",
      unitCost: 5000,
      minThreshold: 2,
      lastUpdated: new Date(),
      alerts: [
        { id: "a2", itemId: "stock3", type: "out_of_stock", createdAt: new Date() },
      ],
    },
  ];

  return NextResponse.json(items);
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const updatedItem = {
    id: params.id,
    ...body,
    lastUpdated: new Date(),
  };

  return NextResponse.json(updatedItem);
}
