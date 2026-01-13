interface Props {
  count?: number;
}

export default function CartWidget({ count = 0 }: Props) {
  return (
    <div className="relative flex items-center cursor-pointer select-none">
      <span className="text-2xl">🛒</span>
      {count > 0 && (
        <span className="absolute -top-2 -right-2 min-w-4.5 h-4.5 px-1 rounded-full text-[11px] flex items-center justify-center bg-red-600 text-white border border-white/10">
          {count}
        </span>
      )}
    </div>
  );
}
