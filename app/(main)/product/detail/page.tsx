'use client';
import { saveProductData } from '@/provider/redux/productSlice';
import ProductData from '@/types/ProductData';
import RootState from '@/types/RootState';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  BsArrowLeft,
  BsPlus,
  BsThreeDots,
  BsThreeDotsVertical,
  BsX,
} from 'react-icons/bs';
import { GoChevronDown } from 'react-icons/go';
import { IoCheckmark } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Page: React.FC = () => {
  const itemData = useSelector((state: RootState) => state.product.productData);
  const [productData, setProductData] = useState<ProductData>({
    title: '',
    description: '',
    price: 0,
    oldPrice: 0,
    collection: [],
    inventoryStock: 0,
    hasInventoryVariations: false,
    prodImgs: [],
    colors: [],
    sizes: [],
    selfShipping: false,
    instaShipping: false,
  });

  useEffect(() => {
    setProductData(itemData);
  }, [itemData]);

  const [collectionInput, setCollectionInput] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleAddCollection = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && collectionInput.trim()) {
      setProductData((prev) => ({
        ...prev,
        collection: [...prev.collection, collectionInput.trim()],
      }));
      setCollectionInput('');
    }
  };

  const handleAddCollectionClick = () => {
    if (collectionInput.trim()) {
      setProductData((prev) => ({
        ...prev,
        collection: [...prev.collection, collectionInput.trim()],
      }));
      setCollectionInput('');
    }
  };

  const handleRemoveCollection = (item: string) => {
    setProductData((prev) => ({
      ...prev,
      collection: prev.collection.filter((col) => col !== item),
    }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const newImages = files.map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      src: URL.createObjectURL(file),
    }));
    setProductData((prev) => ({
      ...prev,
      prodImgs: [...prev.prodImgs, ...newImages],
    }));
  };

  const handleRemoveImage = (id: number) => {
    setProductData((prev) => ({
      ...prev,
      prodImgs: prev.prodImgs.filter((img) => img.id !== id),
    }));
  };

  const handleAddValue = (optionType: 'colors' | 'sizes', value: string) => {
    setProductData((prev) => ({
      ...prev,
      [optionType]: [...prev[optionType], value.trim()],
    }));
  };

  const handleAddValueClick = (optionType: 'colors' | 'sizes') => {
    const inputElement =
      optionType === 'colors'
        ? document.querySelector<HTMLInputElement>('input[name="color"]')
        : document.querySelector<HTMLInputElement>('input[name="size"]');

    if (inputElement) {
      const value = inputElement.value.trim();

      if (value) {
        setProductData((prev) => ({
          ...prev,
          [optionType]: [...prev[optionType], value],
        }));
        inputElement.value = '';
      }
    }
  };

  const handleRemoveValue = (optionType: 'colors' | 'sizes', value: string) => {
    setProductData((prev) => ({
      ...prev,
      [optionType]: prev[optionType].filter((v) => v !== value),
    }));
  };

  const handleSave = () => {
    console.log('productData', productData);
    localStorage.setItem('instaProductData', JSON.stringify(productData));
    dispatch(saveProductData(productData));
    toast.success('Product updated successfully');
    router.push('/product/preview');
  };

  return (
    <div className="w-11/12 md:w-2/5 mx-auto">
      <div className="p-4 shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex py-4 items-center gap-3">
            <Link href="/product">
              <BsArrowLeft />
            </Link>
            <p className="text-base font-medium">Product Detail</p>
          </div>
          <div>
            <BsThreeDotsVertical />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 rounded-[12px] border py-[2px] px-[4px] text-xs font-normal">
            Draft <IoCheckmark className="text-lg" />
          </div>
          <p
            className="text-pri font-medium text-sm"
            role="button"
            onClick={handleSave}
          >
            Preview product
          </p>
        </div>
        <section className="mt-4 py-3 border-t border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Basic details</h3>
            <GoChevronDown />
          </div>
          <div className="mt-4">
            <div className="mb-3">
              <div className="border px-4 pb-2  border-[#00000033] rounded-[12px]">
                <label htmlFor="" className="text-[10px] mb-0">
                  Product Title
                </label>
                <input
                  type="text"
                  value={productData.title}
                  onChange={(e) =>
                    setProductData({ ...productData, title: e.target.value })
                  }
                  className="w-full outline-none placeholder-[#00000099] text-sm"
                  placeholder="Place holder"
                />
              </div>
            </div>
            <div className="mb-3">
              <div className="border px-4 pb-2  border-[#00000033] rounded-[12px]">
                <label htmlFor="" className="text-[10px] mb-0">
                  Product Description
                </label>
                <textarea
                  value={productData.description}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      description: e.target.value,
                    })
                  }
                  className="w-full outline-none placeholder-[#00000099] text-sm"
                  placeholder="Place holder"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="mb-3">
                <div className="border px-4 pb-2  border-[#00000033] rounded-[12px]">
                  <label htmlFor="" className="text-[10px] mb-0">
                    Price
                  </label>
                  <input
                    type="num"
                    value={productData.price}
                    min={0}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        price: Number(e.target.value),
                      })
                    }
                    className="w-full outline-none placeholder-[#00000099] text-sm"
                    placeholder="Place holder"
                  />
                </div>
              </div>
              <div className="mb-3">
                <div className="border px-4 pb-2  border-[#00000033] rounded-[12px]">
                  <label htmlFor="" className="text-[10px] mb-0">
                    Old Price
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={productData.oldPrice}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        oldPrice: Number(e.target.value),
                      })
                    }
                    className="w-full outline-none placeholder-[#00000099] text-sm"
                    placeholder="Place holder"
                  />
                </div>
              </div>
            </div>
            <div className="border py-[8px] rounded-md mb-3">
              <div className="border-b">
                <div className="flex items-center justify-between p-[8px]">
                  <div>
                    <p className="text-[10px]">Product collection</p>
                  </div>
                </div>
              </div>
              <div className="p-[8px]">
                <div className="flex mt-2 gap-2">
                  {productData.collection.map((item, index) => (
                    <button
                      key={index}
                      className="plain-btn bg-[#00000005] border-[#00000005] rounded-[90px] text-xs flex gap-2 items-center"
                      onClick={() => handleRemoveCollection(item)}
                    >
                      {item} <BsX className="text-lg" />
                    </button>
                  ))}
                </div>
              </div>
              <div className="px-[8px]">
                <input
                  type="text"
                  value={collectionInput}
                  onChange={(e) => setCollectionInput(e.target.value)}
                  onKeyDown={handleAddCollection}
                  placeholder="Search or create collection"
                  className="w-full p-2 text-sm outline-none"
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleAddCollectionClick}
                    className="pri-btn text-sm inline-block"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div className="border px-4 pb-2  border-[#00000033] rounded-[12px]">
                <label htmlFor="" className="text-[10px] mb-0">
                  Inventory Stocks
                </label>
                <input
                  type="number"
                  value={productData.inventoryStock}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      inventoryStock: Number(e.target.value),
                    })
                  }
                  className="w-full outline-none placeholder-[#00000099] text-sm"
                  placeholder="50"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="mt-4 py-3 border-t border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Product images</h3>
            <GoChevronDown />
          </div>
          <div>
            {productData.prodImgs.map((prodImg) => (
              <div
                className="flex justify-between items-center py-2"
                key={prodImg.id}
              >
                <div className="flex gap-2 items-center w-3/4">
                  <div className="relative h-[60px] w-[60px]">
                    <Image
                      src={prodImg.src || '/images/avatar.svg'}
                      alt={prodImg.name}
                      className="rounded-md"
                      fill
                      onError={(
                        e: React.SyntheticEvent<HTMLImageElement, Event>
                      ) => {
                        e.currentTarget.src = '/images/prod.svg'; // Replace with fallback image
                      }}
                    />
                  </div>
                  <p>{prodImg.name}</p>
                </div>
                <div className="">
                  <div className="flex items-center gap-4">
                    <BsThreeDots />
                    <button
                      className="text-red-500 text-sm"
                      onClick={() => handleRemoveImage(prodImg.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="py-[8px]">
            <label className="flex items-center justify-center w-full plain-btn rounded-[90px] bg-[#00000005] border-[#00000005] cursor-pointer">
              Add Image
              <div className="relative h-[20px] w-[20px] ml-2">
                <Image
                  src="/images/add_photo_alternate.svg"
                  alt="add image"
                  fill
                />
              </div>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </section>
        <section className="mt-4 py-3 border-t border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Inventory variations</h3>
          </div>
          <div className="">
            <div className="flex items-center mb-4">
              <input
                id="default-checkbox"
                type="checkbox"
                checked={productData.hasInventoryVariations}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    hasInventoryVariations: e.target.checked,
                  })
                }
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 "
              />
              <label
                htmlFor="default-checkbox"
                className="ms-2 text-sm font-normal "
              >
                This product is variable; has different colors, sizes, weight,
                materials, etc.
              </label>
            </div>
          </div>
          {productData.hasInventoryVariations && (
            <section>
              <div className="border py-[8px] rounded-md mb-3">
                <div className="border-b">
                  <div className="flex items-center justify-between p-[8px]">
                    <div>
                      <p className="text-[10px]">Option 1</p>
                      <p className="text-sm">Color</p>
                    </div>
                    <BsThreeDots />
                  </div>
                </div>
                <div className="p-[8px]">
                  <div className="flex mt-2 gap-2 flex-wrap">
                    {productData.colors.map((color) => (
                      <button
                        key={color}
                        className="plain-btn bg-[#00000005] border-[#00000005] rounded-[90px] text-xs flex gap-2 items-center"
                        onClick={() => handleRemoveValue('colors', color)}
                      >
                        {color} <BsX className="text-lg" />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="px-[8px]">
                  <input
                    name="color"
                    type="text"
                    placeholder="Add color"
                    className="w-full p-2 text-sm outline-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                        handleAddValue('colors', e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleAddValueClick('colors')}
                      className="pri-btn text-sm inline-block"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              <div className="border py-[8px] rounded-md mb-3">
                <div className="border-b">
                  <div className="flex items-center justify-between p-[8px]">
                    <div>
                      <p className="text-[10px]">Option 2</p>
                      <p className="text-sm">Size</p>
                    </div>
                    <BsThreeDots />
                  </div>
                </div>
                <div className="p-[8px]">
                  <div className="flex mt-2 gap-2 flex-wrap">
                    {productData.sizes.map((size) => (
                      <button
                        key={size}
                        className="plain-btn bg-[#00000005] border-[#00000005] rounded-[90px] text-xs flex gap-2 items-center"
                        onClick={() => handleRemoveValue('sizes', size)}
                      >
                        {size} <BsX className="text-lg" />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="px-[8px]">
                  <input
                    type="text"
                    name="size"
                    placeholder="Add size"
                    className="w-full p-2 text-sm outline-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                        handleAddValue('sizes', e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleAddValueClick('sizes')}
                      className="pri-btn text-sm inline-block"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
              <div className="py-[8px]">
                <button className="flex gap-2 items-center justify-center w-full plain-btn rounded-[90px] text-sm text-pri bg-[#00000005] border-[#00000005]">
                  <BsPlus className="text-lg" /> Add new option
                </button>
              </div>
            </section>
          )}
        </section>
        <section className="mt-4 py-3 border-t border-b">
          <div className="flex items-center justify-between">
            <h3>Shipping</h3>
            <GoChevronDown />
          </div>
          <div className="">
            <div className="flex items-center justify-between py-[10px] pr-[10px]">
              <label
                htmlFor="self-shipping-checkbox"
                className="text-xs font-medium"
              >
                Self shipping
              </label>
              <input
                id="self-shipping-checkbox"
                type="checkbox"
                checked={productData.selfShipping}
                onChange={(e) =>
                  setProductData((prev) => ({
                    ...prev,
                    selfShipping: e.target.checked,
                  }))
                }
                className="w-4 h-4 text-pri bg-gray-100 border-gray-300 rounded focus:ring-pri"
              />
            </div>
            <div className="flex items-center justify-between mb-4 py-[10px] pr-[10px]">
              <label
                htmlFor="instashop-shipping-checkbox"
                className="text-xs font-medium"
              >
                InstaShop shipping
              </label>
              <input
                id="instashop-shipping-checkbox"
                type="checkbox"
                checked={productData.instaShipping}
                onChange={(e) =>
                  setProductData((prev) => ({
                    ...prev,
                    instaShipping: e.target.checked,
                  }))
                }
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 "
              />
            </div>
            <div className="mb-6">
              <div className="border px-4 pb-2  border-[#00000033] rounded-[12px]">
                <label htmlFor="inventory-stock" className="text-[10px] mb-0">
                  Inventory Stocks
                </label>
                <input
                  id="inventory-stock"
                  type="number"
                  value={productData.inventoryStock}
                  onChange={(e) =>
                    setProductData((prev) => ({
                      ...prev,
                      inventoryStock: parseInt(e.target.value) || 0,
                    }))
                  }
                  className="w-full outline-none placeholder-[#00000099] text-sm"
                  placeholder="50"
                />
              </div>
            </div>
          </div>
          <div className="mb-4 grid grid-cols-2 gap-3 ">
            <button className="plain-btn w-full h-[40px] rounded-[90px] border-pri text-pri">
              Cancel
            </button>
            <button className="pri-btn w-full h-[40px]" onClick={handleSave}>
              Save
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
