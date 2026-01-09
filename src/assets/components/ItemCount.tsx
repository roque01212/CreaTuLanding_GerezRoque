import { useState } from "react";
import { CustomButton } from "./CustomButton";

interface Props {
  stock: number;
}

export const ItemCount = ({ stock }: Props) => {
  const [qty, setQty] = useState<number>(0);

  const handleDecrease = () => {
    if (qty <= 0) return;

    setQty(qty - 1);
  };
  const handleIncrease = () => {
    if (qty >= stock) return;
    setQty(qty + 1);
  };

  return (
    <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3">
      <p className="opacity-70 text-sm mb-2">Cantidad</p>

      <div className="flex items-center gap-3">
        <CustomButton variant="ghost" onClick={handleDecrease}>
          -
        </CustomButton>

        <span className="min-w-10 text-center text-lg font-semibold">
          {qty}
        </span>

        <CustomButton
          variant="ghost"
          onClick={handleIncrease}
          //   disabled={!canIncrease}
        >
          +
        </CustomButton>
        <CustomButton variant="primary">Agregar</CustomButton>
      </div>
    </div>
  );
};
