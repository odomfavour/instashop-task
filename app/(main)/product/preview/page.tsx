'use client';
import { addProduct, updateProduct } from '@/provider/redux/productSlice';
import ProductData from '@/types/ProductData';
import RootState from '@/types/RootState';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { BsArrowLeft, BsHeart, BsThreeDotsVertical } from 'react-icons/bs';
import { FaStarHalfAlt } from 'react-icons/fa';
import { FaStar, FaUserGroup } from 'react-icons/fa6';
import { GoChevronDown } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Page = () => {
  const productData = useSelector(
    (state: RootState) => state.product.productData
  );
  const dispatch = useDispatch();
  const router = useRouter();
  console.log(productData);
  const {
    title,
    description,
    price,
    oldPrice,
    collection,
    prodImgs,
    colors,
    sizes,
  } = productData;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next image
  //   const handleNext = () => {
  //     setCurrentIndex((prevIndex) => (prevIndex + 1) % prodImgs.length);
  //   };

  // Function to go to the previous image
  //   const handlePrev = () => {
  //     setCurrentIndex(
  //       (prevIndex) => (prevIndex - 1 + prodImgs.length) % prodImgs.length
  //     );
  //   };
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    const distance = touchStart - touchEnd;

    if (Math.abs(distance) > 50) {
      // Only detect swipe if the swipe distance is greater than 50px
      if (distance > 0) {
        // Swipe left (next image)
        setCurrentIndex((prevIndex) => (prevIndex + 1) % prodImgs.length);
      } else {
        // Swipe right (previous image)
        setCurrentIndex(
          (prevIndex) => (prevIndex - 1 + prodImgs.length) % prodImgs.length
        );
      }
    }
  };

  const handlePublish = () => {
    const existingProducts = JSON.parse(
      localStorage.getItem('instaProducts') || '[]'
    );

    // Check if the product already exists
    const productExists = existingProducts.some(
      (product: ProductData) => product.id === productData.id
    );

    let updatedProducts;

    if (productExists) {
      // Update the existing product
      updatedProducts = existingProducts.map((product: ProductData) =>
        product.id === productData.id ? { ...product, ...productData } : product
      );
      dispatch(updateProduct(productData)); // Make sure you have the correct Redux action
    } else {
      // Add the new product
      updatedProducts = [...existingProducts, productData];
      dispatch(addProduct(productData)); // Make sure you have the correct Redux action
    }

    // Save the updated products list to localStorage
    localStorage.setItem('instaProducts', JSON.stringify(updatedProducts));

    // Also save the current product data (for `instaProductData`)
    localStorage.setItem('instaProductData', JSON.stringify(productData));
    toast.success('Product published successfully');
    // Redirect to the product listing page
    router.push('/product');
  };

  return (
    <div>
      <div className="w-11/12 md:w-2/5 mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex py-4 items-center gap-3">
            <BsArrowLeft role="button" />
            <p className="text-base font-medium">Product Preview</p>
          </div>
          <div>
            <BsThreeDotsVertical />
          </div>
        </div>
      </div>
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative w-full h-[360px]"
      >
        <div className="absolute bottom-2 right-2 text-white font-bold bg-[#0000000D] h-[21px] w-[21px] z-30 text-[10px] rounded-full flex justify-center items-center">
          {currentIndex + 1}/{prodImgs.length}
        </div>

        {/* Image display */}
        <div className="relative w-full h-full">
          <Image
            src={prodImgs[currentIndex].src || `/images/avatar.png`}
            alt={`Product image ${currentIndex + 1}`}
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              e.currentTarget.src = '/images/prod.svg'; // Replace with fallback image
            }}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <div className="border-b pb-2">
        <div className="w-11/12 md:w-2/5 mx-auto">
          <div className="my-2 flex items-center justify-between">
            <p className="text-sm font-medium w-3/4">{title}</p>
            <div className="flex gap-3 items-center">
              <button className="h-[36px] w-[36px] rounded-full bg-[#0000000D] flex justify-center items-center">
                <div className="relative h-[20px] w-[20px] rounded-full border">
                  <Image
                    src="/images/curved_arrow.svg"
                    alt="shopping image"
                    fill
                  />
                </div>
              </button>
              <button className="h-[36px] w-[36px] rounded-full bg-[#0000000D] flex justify-center items-center">
                <BsHeart />
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-1 items-center">
              <p className="text-[20px] text-[#3B3B3B] font-medium">
                {' '}
                ₦{price.toFixed(2)}
              </p>
              <p className="text-xs font-medium text-[#ACACAC]">
                ₦{oldPrice.toFixed(2)}
              </p>
              <div className="bg-pri rounded-[24px] py-[2px] px-[4px] text-[10px] text-white">
                25% OFF
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center">
                <FaStar className="text-[#FFDB4C]" />
                <FaStar className="text-[#FFDB4C]" />
                <FaStar className="text-[#FFDB4C]" />
                <FaStar className="text-[#FFDB4C]" />
                <FaStarHalfAlt className="text-[#FFDB4C]" />
              </div>
              <p className="text-sm font-medium text-[#ACACAC]">(5 sold)</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b pb-2">
        <div className="w-11/12 md:w-2/5 mx-auto">
          <h3 className="text-sm font-medium mt-4 mb-2">Select variants</h3>
          <div className="pt-2 mb-4">
            <p className="text-[10px] font-medium">Size: {sizes?.join(', ')}</p>
            <div className="flex mt-2 gap-2">
              {sizes?.map((size: string, index: number) => (
                <button
                  key={index}
                  className="plain-btn bg-black text-white rounded-[90px] text-xs"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className=" mb-4">
            <p className="text-[10px] font-medium">
              Color: {colors?.join(', ')}
            </p>
            <div className="flex mt-2 gap-2">
              {colors?.map((color: string, index: number) => (
                <button
                  key={index}
                  className="plain-btn bg-[#00000005] border-[#00000005] rounded-[90px] text-xs"
                >
                  {color}
                </button>
              ))}

              {/* <button className="plain-btn bg-black text-white rounded-[90px] text-xs">
                Filter
              </button>
              <button className="plain-btn bg-[#00000005] border-[#00000005] rounded-[90px] text-xs">
                Filter
              </button>
              <button className="plain-btn bg-[#00000005] border-[#00000005] rounded-[90px] text-xs">
                Filter
              </button>
              <button className="plain-btn bg-[#00000005] border-[#00000005] rounded-[90px] text-xs">
                Filter
              </button>
              <button className="plain-btn bg-[#00000005] border-[#00000005] rounded-[90px] text-xs">
                Filter
              </button> */}
            </div>
          </div>
        </div>
      </div>
      <div className="border-b pb-2">
        <div className="w-11/12 md:w-2/5 mx-auto">
          <div className="flex items-center justify-between mb-2 mt-4">
            <h3 className="text-sm font-medium">Product description</h3>
            <GoChevronDown />
          </div>
          <p className="text-xs">{description}</p>
          <button className="text-pri inline-block mb-3 text-xs">
            Read more
          </button>
        </div>
      </div>
      <div className="border-b mb-6">
        <div className="w-11/12 md:w-2/5 mx-auto">
          <div className="flex items-center justify-between mb-2 mt-4">
            <h3 className="text-sm font-medium">About this vendor</h3>
            <GoChevronDown />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative h-[52px] w-[52px] rounded-full border">
                <Image
                  src="/images/avatar.svg"
                  alt="shopping image"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div>
                <h3 className="font-medium text-xs">Gucci Store</h3>
                <div className="flex items-center gap-2 text-xs">
                  <p className="text-[#00000066] font-normal">Fashion</p>
                  <div className="h-1 w-1 rounded-full bg-[#00000099]" />
                  <div className="flex gap-1 items-center">
                    <FaStar className="text-[#000000E6]" />
                    <p className="text-[#00000066] font-normal">5.4</p>
                  </div>
                  <div className="h-1 w-1 rounded-full bg-[#00000099]" />
                  <div className="flex gap-1 items-center">
                    <FaUserGroup className="text-[#000000E6]" />
                    <p className="text-[#00000066] font-normal">100k</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-pri font-medium text-xs">Follow</p>
          </div>
          <p className="text-xs">
            Vendor description: You can track your parcel on the following
            website using your tracking number: www.17track.net/en  (Copied to
            the browser to open)
          </p>
          <div className="flex flex-wrap mt-2 gap-2 pb-6">
            {collection?.map((item: string, index: number) => (
              <button
                key={index}
                className="plain-btn bg-[#00000005] border-[#00000005] rounded-[90px] text-[10px]"
              >
                {item}
              </button>
            ))}
            {/* <button className="plain-btn  bg-[#00000005] border-[#00000005] rounded-[90px] text-[10px]">
              Quality goods
            </button>
            <button className="plain-btn bg-[#00000005] border-[#00000005] rounded-[90px] text-[10px]">
              Nice designs
            </button>

            <button className="plain-btn  bg-[#00000005] border-[#00000005] rounded-[90px] text-[10px]">
              Quality goods
            </button>
            <button className="plain-btn bg-[#00000005] border-[#00000005] rounded-[90px] text-[10px]">
              Nice designs
            </button>

            <button className="plain-btn  bg-[#00000005] border-[#00000005] rounded-[90px] text-[10px]">
              Quality goods
            </button>
            <button className="plain-btn bg-[#00000005] border-[#00000005] rounded-[90px] text-[10px]">
              Nice designs
            </button> */}
          </div>
        </div>
      </div>
      <div className="w-11/12 md:w-2/5 mx-auto">
        <div className="mb-4">
          <button className="pri-btn w-full h-[40px]" onClick={handlePublish}>
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
