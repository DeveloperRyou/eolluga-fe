"use client";

import React, { useState } from "react";

import Image from "next/image";

import { CartDataT, ItemT } from "../types/order-cart-types";
import { removeItemFromCart, updateItemCount } from "../utils/cart";
import QuantityController from "./QuantityController";

export default function OrderCartItem({
  data,
  setCartData,
  orderedAt,
}: {
  data: ItemT;
  setCartData?: React.Dispatch<React.SetStateAction<CartDataT>>;
  orderedAt?: string;
}) {
  const [itemCount, setItemCount] = useState(data.count);

  const handleDecrease = () => {
    const newCount = itemCount - 1;
    if (newCount > 0) {
      setItemCount(newCount);
      updateItemCount(data.id, newCount);
      setCartData &&
        setCartData(prevData =>
          prevData.map(item =>
            item.id === data.id ? { ...item, count: newCount } : item,
          ),
        );
    } else {
      removeItemFromCart(data.id);
      setCartData &&
        setCartData(prevData => prevData.filter(item => item.id !== data.id));
    }
  };

  const handleIncrease = () => {
    const newCount = itemCount + 1;
    setItemCount(newCount);
    updateItemCount(data.id, newCount);
    setCartData &&
      setCartData(prevData =>
        prevData.map(item =>
          item.id === data.id ? { ...item, count: newCount } : item,
        ),
      );
  };

  if (itemCount <= 0) return null;

  return (
    <div className="flex flex-col">
      {orderedAt && (
        <p className="mb-[16px] block text-sm text-[#6F6F6F]">{orderedAt}</p>
      )}
      <div className="flex justify-between">
        <div>
          <p className="mb-[4px] block font-bold">{data.name}</p>
          <div>
            {data.options.length !== 0 && (
              <ul className="mb-[12px] text-sm text-[#6F6F6F]">
                {data?.options?.map((option, index) => (
                  <li key={index} className="space-y-[4px]">
                    {option.category} - {option.name}{" "}
                    {option.additionalPrice !== 0 &&
                      `( +${option.additionalPrice.toLocaleString()}원)`}
                  </li>
                ))}
              </ul>
            )}
            <p className="block text-sm font-bold">
              {data.price.toLocaleString()}원
            </p>
          </div>
        </div>

        <div className="relative h-[64px] w-[64px] overflow-hidden rounded-lg">
          <Image
            src={data.imageUrl}
            alt={data.name}
            fill
            style={{ objectFit: "fill" }}
            priority
          />
        </div>
      </div>

      {orderedAt ? null : (
        <div className="mt-[16px] flex justify-end">
          <QuantityController
            count={itemCount}
            onDecrease={handleDecrease}
            onIncrease={handleIncrease}
          />
        </div>
      )}
    </div>
  );
}