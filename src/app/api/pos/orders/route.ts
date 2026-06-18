import { NextResponse } from "next/server";

export async function GET() {
  // Mock data
  const orders = [
    {
      id: "1",
      orderNumber: "CMD-001",
      tableId: "1",
      serverId: "user1",
      orderType: "dine_in",
      status: "ready",
      items: [
        {
          id: "item1",
          menuItemId: "menu1",
          menuItem: {
            id: "menu1",
            name: "Thé à la menthe",
            categoryId: "cat1",
            price: 600,
            preparationTime: 5,
            available: true,
          },
          quantity: 2,
          unitPrice: 600,
          subtotal: 1200,
        },
      ],
      subtotal: 1200,
      tax: 216,
      total: 1416,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  const body = await request.json();
  
  const newOrder = {
    id: Date.now().toString(),
    orderNumber: `CMD-${Date.now()}`,
    ...body,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return NextResponse.json(newOrder, { status: 201 });
}
