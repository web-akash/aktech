// Import React and useState
import React, { useState, useEffect } from "react";
import customizationOptions from "./customization-options.json";

const CustomWebsiteOrderForm = () => {
  // ... (previous code)

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">Customize Your Website</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>{/* ... (Category selection) */}</div>
        <div>{/* ... (Sub-Category selection) */}</div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Options</h2>
          <ul className="space-y-2">
            {selectedSubCategories.length > 0 &&
              customizationOptions.categories.map((category) =>
                category.subCategories
                  .filter((subCategory) =>
                    selectedSubCategories.includes(subCategory.id)
                  )
                  .map((subCategory) =>
                    subCategory.options.map((option) => (
                      <li key={option.id}>
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedOptions.includes(option.id)}
                            onChange={() => handleOptionChange(option.id)}
                            className="mr-2"
                          />
                          {option.name} - ${option.price}
                        </label>
                      </li>
                    ))
                  )
              )}
          </ul>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Order Summary</h2>
        <div className="w-full border rounded-lg overflow-hidden">
          <div className="w-full bg-gray-200 py-2 px-4">
            <div className="grid grid-cols-3">
              <div className="font-semibold">Item</div>
              <div className="font-semibold text-center">Quantity</div>
              <div className="font-semibold text-right">Price</div>
            </div>
          </div>
          <div className="bg-white">
            {selectedOptions.map((optionId) => {
              const category = customizationOptions.categories.find((cat) =>
                cat.subCategories.some((subCat) =>
                  subCat.options.some((opt) => opt.id === optionId)
                )
              );
              if (category) {
                const subCategory = category.subCategories.find((subCat) =>
                  subCat.options.some((opt) => opt.id === optionId)
                );
                const option = subCategory.options.find(
                  (opt) => opt.id === optionId
                );
                return (
                  <div className="border-b" key={option.id}>
                    <div className="py-2 px-4 grid grid-cols-3">
                      <div>
                        {category.name} &gt; {subCategory.name} &gt;{" "}
                        {option.name}
                      </div>
                      <div className="text-center">1</div>
                      <div className="text-right">${option.price}</div>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
          <div className="bg-gray-200">
            <div className="py-2 px-4 grid grid-cols-2">
              <div className="font-semibold">Total</div>
              <div className="font-semibold text-right">${totalPrice}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomWebsiteOrderForm;
