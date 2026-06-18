"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useState, useEffect } from "react";
import type { MenuItem, MenuCategory, OrderItem, Table } from "@/types/pos";
import { menuService, orderService, tableService } from "@/services/pos.service";

interface CartItem extends OrderItem {
  menuItem: MenuItem;
}

export default function OrderEntryPage() {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [tables, setTables] = useState<Table[]>([]);
  const [selectedTable, setSelectedTable] = useState<string>("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [cats, items, tbls] = await Promise.all([
          menuService.getCategories(),
          menuService.getMenuItems(),
          tableService.getTables(),
        ]);
        setCategories(cats);
        setMenuItems(items);
        setTables(tbls);
        if (cats.length > 0) {
          setSelectedCategory(cats[0].id);
        }
      } catch (error) {
        console.error("Erreur lors du chargement:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredItems = menuItems.filter((item) => {
    const matchCategory = !selectedCategory || item.categoryId === selectedCategory;
    const matchSearch =
      !searchTerm ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch && item.available;
  });

  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find((ci) => ci.menuItemId === item.id);

    if (existingItem) {
      setCart(
        cart.map((ci) =>
          ci.menuItemId === item.id
            ? {
                ...ci,
                quantity: ci.quantity + 1,
              }
            : ci
        )
      );
    } else {
      setCart([
        ...cart,
        {
          id: `cart-${Date.now()}`,
          menuItemId: item.id,
          menuItem: item,
          quantity: 1,
          unitPrice: item.price,
        },
      ]);
    }
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter((ci) => ci.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart(
        cart.map((ci) =>
          ci.id === itemId
            ? { ...ci, quantity }
            : ci
        )
      );
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const tax = subtotal * 0.18; // 18% TVA
  const total = subtotal + tax;

  const handleCreateOrder = async () => {
    if (!selectedTable) {
      alert("Sélectionnez une table avant de créer la commande.");
      return;
    }

    if (cart.length === 0) {
      alert("Ajoutez des produits au panier avant de créer la commande.");
      return;
    }

    try {
      const orderItems = cart.map((item) => ({
        id: item.id,
        menuItemId: item.menuItemId,
        menuItem: item.menuItem,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        subtotal: item.quantity * item.unitPrice,
      }));

      const createdOrder = await orderService.createOrder({
        tableId: selectedTable,
        serverId: "server1",
        orderType: "dine_in",
        status: "pending",
        items: orderItems,
        subtotal,
        tax,
        total,
      });

      await tableService.updateTable(selectedTable, {
        status: "occupied",
      });

      setTables((prev) =>
        prev.map((table) =>
          table.id === selectedTable ? { ...table, status: "occupied" } : table
        )
      );

      setCart([]);
      alert(`Commande créée : ${createdOrder.orderNumber}`);
    } catch (error) {
      console.error("Erreur lors de la création de la commande:", error);
      alert("Impossible de créer la commande. Réessayez.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-500">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Breadcrumb pageName="Prise de commande" />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Menu */}
        <div className="lg:col-span-2 space-y-4">
          {/* Sélection de table */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-dark">
            <label className="block text-sm font-semibold text-dark dark:text-white mb-3">
              Sélectionner une table
            </label>
            <div className="grid grid-cols-4 gap-2">
              {tables.map((table) => (
                <button
                  key={table.id}
                  onClick={() => setSelectedTable(table.id)}
                  className={`p-3 rounded-lg border-2 font-semibold text-sm transition ${
                    selectedTable === table.id
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
                      : `border-gray-200 dark:border-gray-600 ${
                          table.status === "free"
                            ? "hover:border-blue-300"
                            : "opacity-50 cursor-not-allowed"
                        }`
                  }`}
                  disabled={table.status !== "free"}
                >
                  T {table.number}
                </button>
              ))}
            </div>
          </div>

          {/* Catégories et Recherche */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-dark">
            <div className="space-y-4">
              {/* Recherche */}
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />

              {/* Catégories */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap transition font-medium ${
                      selectedCategory === category.id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              {/* Grille des produits */}
              <div className="grid grid-cols-2 gap-3">
                {filteredItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => addToCart(item)}
                    className="p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition text-left"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-20 object-cover rounded mb-2"
                      />
                    )}
                    <p className="font-semibold text-sm text-dark dark:text-white">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.price.toLocaleString("fr-FR")} F CFA
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      ⏱ {item.preparationTime}min
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Panier */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-dark sticky top-20 h-fit">
          <h3 className="text-lg font-semibold text-dark dark:text-white mb-4">
            Panier
          </h3>

          {selectedTable && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Table: <span className="font-semibold">{tables.find((t) => t.id === selectedTable)?.number}</span>
            </p>
          )}

          <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-dark dark:text-white">
                    {item.menuItem.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.quantity} x {item.unitPrice.toLocaleString("fr-FR")} F
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2 py-1 bg-red-100 hover:bg-red-200 text-red-600 rounded text-xs"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-sm">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 bg-green-100 hover:bg-green-200 text-green-600 rounded text-xs"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="px-2 py-1 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded text-xs ml-1"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Totaux */}
          <div className="border-t border-gray-200 dark:border-gray-600 pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Sous-total:</span>
              <span className="font-semibold">{subtotal.toLocaleString("fr-FR")} F</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">TVA (18%):</span>
              <span className="font-semibold">{tax.toLocaleString("fr-FR")} F</span>
            </div>
            <div className="flex justify-between text-lg font-semibold text-dark dark:text-white border-t border-gray-200 dark:border-gray-600 pt-2">
              <span>Total:</span>
              <span>{total.toLocaleString("fr-FR")} F</span>
            </div>
          </div>

          {/* Boutons */}
          <div className="mt-4 space-y-2">
            <button
              onClick={handleCreateOrder}
              disabled={!selectedTable || cart.length === 0}
              className="w-full py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Créer la commande
            </button>
            <button
              onClick={() => setCart([])}
              className="w-full py-2 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Réinitialiser
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
