import { useEffect, useState } from "react";
import { CustomButton } from "./CustomButton";

interface Props {
  stock: number;
  onAddToCart: (count: number) => void;
}

export const ItemCount = ({ stock, onAddToCart }: Props) => {
  const [qty, setQty] = useState<number>(0);

  useEffect(() => {
    setQty(stock > 0 ? 1 : 0);
  }, [stock]);

  const canDecrease = qty > 1;
  const canIncrement = qty < stock;
  const canAdd = stock > 0 && qty > 0;

  const handleDecrease = () => {
    if (!canDecrease) return;

    setQty((prev) => prev - 1);
  };

  const handleIncrease = () => {
    if (!canIncrement) return;
    setQty((prev) => prev + 1);
  };

  const handleAdd = () => {
    if (!canAdd) return;
    onAddToCart(qty);
  };

  return (
    <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3">
      <p className="opacity-70 text-sm mb-2">Cantidad</p>

      <div className="flex items-center gap-3">
        <CustomButton
          variant="ghost"
          onClick={handleDecrease}
          disabled={!canDecrease}
        >
          -
        </CustomButton>

        <span className="min-w-10 text-center text-lg font-semibold">
          {qty}
        </span>

        <CustomButton
          variant="ghost"
          onClick={handleIncrease}
          disabled={!canIncrement}
        >
          +
        </CustomButton>
        <CustomButton variant="primary" onClick={handleAdd} disabled={!canAdd}>
          Agregar
        </CustomButton>
      </div>
    </div>
  );
};
