"use client";

import Image from "next/image";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { products as initialProducts } from "@/components/Layouts/sidebar/data/product-items";

type Product = {
  Title: string;
  Description: string;
  Price: {
    CurrentPrice: number;
  };
};

export default function Products() {
  const [open, setOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<null | {
    title: string;
    description: string;
    amount: number;
  }>(null);
  const [editIndex, setEditIndex] = React.useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = React.useState<number | null>(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = React.useState(false);
  const [productList, setProductList] =
    React.useState<Product[]>(initialProducts);

  const handleClickOpen = (
    product?: { title: string; description: string; amount: number },
    index?: number,
  ) => {
    setSelectedProduct(product ?? null);
    setEditIndex(index ?? null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
    setEditIndex(null);
  };
  const handleDeleteConfirmOpen = (index: number) => {
    setDeleteIndex(index);
    setConfirmDeleteOpen(true);
  };
  const handleDeleteConfirmClose = () => {
    setDeleteIndex(null);
    setConfirmDeleteOpen(false);
  };
  const handleDelete = () => {
    if (deleteIndex !== null) {
      const updatedList = [...productList];
      updatedList.splice(deleteIndex, 1);
      setProductList(updatedList);
    }
    handleDeleteConfirmClose();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const updatedProduct: Product = {
      Title: formData.get("title") as string,
      Description: formData.get("description") as string,
      Price: {
        CurrentPrice: Number(formData.get("amount")),
      },
    };

    if (editIndex !== null) {
      const updatedList = [...productList];
      updatedList[editIndex] = updatedProduct;
      setProductList(updatedList);
    } else {
      setProductList([...productList, updatedProduct]);
    }

    handleClose();
  };

  function ProductItem({
    imgURL,
    title,
    description,
    amount,
    onEdit,
    onDelete,
  }: {
    imgURL: string;
    title: string;
    description: string;
    amount: number;
    onEdit: () => void;
    onDelete: () => void;
  }) {
    return (
      <article className="relative flex flex-row-reverse gap-3 rounded-2xl border border-neutral-200 bg-white p-3">
        <Image
          src={imgURL}
          width={100}
          height={100}
          alt={`alt image for ${title}`}
          className="h-32 w-32 rounded-lg"
        />
        <div className="flex h-full flex-col items-end justify-between gap-2">
          <div className="flex flex-col items-end gap-2">
            <h4 className="text-xl">{title}</h4>
            <h5 style={{ direction: "rtl" }}>{description}</h5>
          </div>
          <h6 className="text-lg font-medium">{amount}</h6>
        </div>
        <div className="flex flex-row">
          <button
            onClick={onDelete}
            className="absolute bottom-0 left-0 m-3 rounded-lg bg-red-600 px-3 py-1 text-white transition hover:shadow-[0_4px_10px_rgba(255,0,0,0.63)]"
          >
            Delete
          </button>
          <button
            onClick={onEdit}
            className="absolute bottom-0 left-20 m-3 rounded-lg bg-red-600 px-3 py-1 text-white transition hover:shadow-[0_4px_10px_rgba(255,0,0,0.63)]"
          >
            Edit
          </button>
        </div>
      </article>
    );
  }

  return (
    <main className="relative h-full w-full">
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => handleClickOpen()}
          className="rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
        >
          Add Product
        </button>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {selectedProduct ? "Edit Product" : "Add Product"}
        </DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
          <DialogContentText>
            {selectedProduct
              ? "Update the product information below."
              : "Enter a new product to add to the list."}
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="dense"
              id="title"
              name="title"
              label="Title"
              variant="outlined"
              defaultValue={selectedProduct?.title || ""}
              required
            />
            <TextField
              fullWidth
              margin="dense"
              id="description"
              name="description"
              label="Description"
              variant="outlined"
              defaultValue={selectedProduct?.description || ""}
              required
            />
            <TextField
              fullWidth
              margin="dense"
              id="amount"
              name="amount"
              label="Price"
              type="number"
              variant="outlined"
              defaultValue={selectedProduct?.amount || ""}
              required
            />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">
                {selectedProduct ? "Update" : "Add"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={confirmDeleteOpen} onClose={handleDeleteConfirmClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmClose}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <section className="grid w-full grid-cols-1 gap-3 xl:grid-cols-2">
        {productList.map((product, index) => (
          <ProductItem
            key={index}
            imgURL="https://cdnimg.webstaurantstore.com/images/products/large/581976/2438215.jpg"
            title={product.Title}
            description={product.Description}
            amount={product.Price.CurrentPrice}
            onEdit={() =>
              handleClickOpen(
                {
                  title: product.Title,
                  description: product.Description,
                  amount: product.Price.CurrentPrice,
                },
                index,
              )
            }
            onDelete={() => handleDeleteConfirmOpen(index)}
          />
        ))}
      </section>
    </main>
  );
}
