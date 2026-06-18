"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useState, useEffect } from "react";
import type { MenuCategory, MenuItem } from "@/types/pos";
import { menuService } from "@/services/pos.service";

export default function MenuPage() {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [newCategory, setNewCategory] = useState({ name: "", displayOrder: 0 });
  const [newItem, setNewItem] = useState({
    name: "",
    categoryId: "",
    price: 0,
    preparationTime: 15,
    description: "",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const cats = await menuService.getCategories();
        setCategories(cats);
        if (cats.length > 0) {
          setSelectedCategory(cats[0]);
        }
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const loadItems = async () => {
        try {
          const items = await menuService.getMenuItems(selectedCategory.id);
          setMenuItems(items);
        } catch (error) {
          console.error("Erreur:", error);
        }
      };

      loadItems();
    }
  }, [selectedCategory]);

  const handleAddCategory = async () => {
    try {
      const created = await menuService.createCategory(newCategory);
      setCategories([...categories, created]);
      setNewCategory({ name: "", displayOrder: 0 });
      setShowCategoryModal(false);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const handleAddItem = async () => {
    if (!selectedCategory) return;

    try {
      const created = await menuService.createMenuItem({
        ...newItem,
        categoryId: selectedCategory.id,
      });
      setMenuItems([...menuItems, created]);
      setNewItem({
        name: "",
        categoryId: "",
        price: 0,
        preparationTime: 15,
        description: "",
      });
      setShowItemModal(false);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Chargement...</p>
      </div>
    );
  }

  return (
    <>
      <Breadcrumb pageName="Gestion des menus" />

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Catégories */}
        <div className="lg:col-span-1">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-dark">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-dark dark:text-white">
                Catégories
              </h3>
              <button
                onClick={() => setShowCategoryModal(true)}
                className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
              >
                +
              </button>
            </div>

            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full p-3 rounded-lg text-left transition ${
                    selectedCategory?.id === category.id
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 font-semibold"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Articles */}
        <div className="lg:col-span-3">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-dark">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-dark dark:text-white">
                {selectedCategory?.name}
              </h3>
              <button
                onClick={() => setShowItemModal(true)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                + Ajouter un article
              </button>
            </div>

            {/* Tableau des articles */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Nom</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Prix</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Temps</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Disponible</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {menuItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-4 py-3">
                        <p className="font-medium text-dark dark:text-white">{item.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {item.description}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-dark dark:text-white font-semibold">
                        {item.price.toLocaleString("fr-FR")} F
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                        {item.preparationTime} min
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            item.available
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.available ? "Oui" : "Non"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button className="text-blue-600 hover:text-blue-800 mr-2">Modifier</button>
                        <button className="text-red-600 hover:text-red-800">Supprimer</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Catégorie */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-dark rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-dark dark:text-white mb-4">
              Ajouter une catégorie
            </h3>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nom de la catégorie"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />

              <input
                type="number"
                placeholder="Ordre d'affichage"
                value={newCategory.displayOrder}
                onChange={(e) => setNewCategory({ ...newCategory, displayOrder: Number(e.target.value) })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />

              <div className="flex gap-2">
                <button
                  onClick={() => setShowCategoryModal(false)}
                  className="flex-1 py-2 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-lg font-medium"
                >
                  Annuler
                </button>
                <button
                  onClick={handleAddCategory}
                  className="flex-1 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600"
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Article */}
      {showItemModal && selectedCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-dark rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-dark dark:text-white mb-4">
              Ajouter un article
            </h3>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nom du produit"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />

              <textarea
                placeholder="Description"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />

              <input
                type="number"
                placeholder="Prix"
                value={newItem.price || ""}
                onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />

              <input
                type="number"
                placeholder="Temps de préparation (min)"
                value={newItem.preparationTime}
                onChange={(e) => setNewItem({ ...newItem, preparationTime: Number(e.target.value) })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />

              <div className="flex gap-2">
                <button
                  onClick={() => setShowItemModal(false)}
                  className="flex-1 py-2 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-lg font-medium"
                >
                  Annuler
                </button>
                <button
                  onClick={handleAddItem}
                  className="flex-1 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600"
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

