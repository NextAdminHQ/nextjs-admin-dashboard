"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Button } from "@/components/ui-elements/button";
import { useState } from "react";
import type { PaymentMethod } from "@/types/pos";

interface CheckoutOrder {
  id: string;
  orderNumber: string;
  subtotal: number;
  tax: number;
  total: number;
  amountPaid: number;
}

export default function CheckoutPage() {
  const [selectedOrder, setSelectedOrder] = useState<CheckoutOrder | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [amountPaid, setAmountPaid] = useState<number>(0);
  const [showReceipt, setShowReceipt] = useState(false);

  const mockOrders: CheckoutOrder[] = [
    {
      id: "1",
      orderNumber: "CMD-001",
      subtotal: 50000,
      tax: 9000,
      total: 59000,
      amountPaid: 0,
    },
    {
      id: "2",
      orderNumber: "CMD-002",
      subtotal: 35000,
      tax: 6300,
      total: 41300,
      amountPaid: 0,
    },
  ];

  const remainingAmount = selectedOrder ? selectedOrder.total - amountPaid : 0;
  const isFullyPaid = remainingAmount <= 0;

  const handlePaymentMethodChange = (method: PaymentMethod) => {
    setPaymentMethod(method);
    if (selectedOrder && method !== "cash") {
      setAmountPaid(selectedOrder.total);
    }
  };

  const handleProcessPayment = () => {
    if (selectedOrder && amountPaid >= selectedOrder.total) {
      setShowReceipt(true);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Encaissement" />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Commandes */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-dark">
            <h3 className="text-lg font-semibold text-dark dark:text-white mb-4">
              Commandes à payer
            </h3>

            <div className="space-y-2">
              {mockOrders.map((order) => (
                <div
                  key={order.id}
                  onClick={() => {
                    setSelectedOrder(order);
                    setAmountPaid(0);
                    setShowReceipt(false);
                    setPaymentMethod("cash");
                  }}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                    selectedOrder?.id === order.id
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
                      : "border-gray-200 dark:border-gray-600"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-dark dark:text-white">
                        Commande #{order.orderNumber}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Total: {order.total.toLocaleString("fr-FR")} F
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.amountPaid >= order.total
                          ? "bg-green-100 text-green-800"
                          : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {order.amountPaid >= order.total ? "Payée" : "À payer"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Formulaire de paiement */}
        {selectedOrder && (
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-dark">
            <h3 className="text-lg font-semibold text-dark dark:text-white mb-6">
              Paiement
            </h3>

            {/* Montants */}
            <div className="space-y-3 mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Sous-total:</span>
                <span className="font-semibold">
                  {selectedOrder.subtotal.toLocaleString("fr-FR")} F
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">TVA:</span>
                <span className="font-semibold">
                  {selectedOrder.tax.toLocaleString("fr-FR")} F
                </span>
              </div>
              <div className="border-t border-gray-300 dark:border-gray-600 pt-3 flex justify-between text-lg font-semibold text-dark dark:text-white">
                <span>Total:</span>
                <span>{selectedOrder.total.toLocaleString("fr-FR")} F</span>
              </div>
            </div>

            {/* Méthodes de paiement */}
            <div className="space-y-2 mb-6">
              <p className="text-sm font-semibold text-dark dark:text-white mb-3">
                Méthode de paiement
              </p>
              {(
                [
                  { value: "cash", label: "Espèces" },
                  { value: "card", label: "Carte bancaire" },
                  { value: "orange_money", label: "Orange Money" },
                  { value: "mtn_momo", label: "MTN MoMo" },
                  { value: "wave", label: "Wave" },
                  { value: "room", label: "Imputation chambre" },
                ] as const
              ).map((method) => (
                <button
                  key={method.value}
                  onClick={() => handlePaymentMethodChange(method.value)}
                  className={`w-full p-3 rounded-lg border-2 transition text-left font-medium ${
                    paymentMethod === method.value
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900 text-blue-900 dark:text-blue-100"
                      : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {method.label}
                </button>
              ))}
            </div>

            {/* Montant reçu */}
            {paymentMethod === "cash" && (
              <div className="mb-6">
                <label className="text-sm font-semibold text-dark dark:text-white mb-2 block">
                  Montant reçu
                </label>
                <input
                  type="number"
                  value={amountPaid || ""}
                  onChange={(e) => setAmountPaid(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white font-semibold text-lg"
                  placeholder="0"
                />
                {remainingAmount > 0 && (
                  <p className="text-sm text-red-600 font-semibold mt-2">
                    Reste à payer: {remainingAmount.toLocaleString("fr-FR")} F
                  </p>
                )}
                {isFullyPaid && (
                  <p className="text-sm text-green-600 font-semibold mt-2">
                    Monnaie: {Math.abs(remainingAmount).toLocaleString("fr-FR")} F
                  </p>
                )}
              </div>
            )}

            {/* Boutons */}
            <button
              onClick={handleProcessPayment}
              disabled={!isFullyPaid}
              className="w-full py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition mb-2"
            >
              Valider le paiement
            </button>
            <button className="w-full py-3 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 transition">
              Annuler
            </button>
          </div>
        )}

        {/* Reçu */}
        {showReceipt && selectedOrder && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-dark rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-dark dark:text-white mb-4 text-center">
                Reçu de paiement
              </h3>

              <div className="space-y-3 text-center mb-6 text-sm">
                <p>Commande #{selectedOrder.orderNumber}</p>
                <p className="text-gray-600 dark:text-gray-400">
                  {new Date().toLocaleString("fr-FR")}
                </p>

                <div className="border-t border-gray-300 dark:border-gray-600 pt-3 mt-3">
                  <p>Montant: {selectedOrder.total.toLocaleString("fr-FR")} F</p>
                  <p className="text-green-600 font-semibold">Payé</p>
                </div>

                <p className="text-xs text-gray-500 mt-3">
                  Merci de votre visite!
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowReceipt(false)}
                  className="flex-1 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600"
                >
                  Imprimer
                </button>
                <button
                  onClick={() => {
                    setShowReceipt(false);
                    setSelectedOrder(null);
                  }}
                  className="flex-1 py-2 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-lg font-medium"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

