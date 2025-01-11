'use client';
import { saveProductData } from '@/provider/redux/productSlice';
import ProductData from '@/types/ProductData';
import RootState from '@/types/RootState';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
  const products = useSelector((state: RootState) => state.product.products);
  const dispatch = useDispatch();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const displayDetail = (productData: ProductData) => {
    localStorage.setItem('instaProductData', JSON.stringify(productData));
    dispatch(saveProductData(productData));
    router.push('/product/detail');
  };

  return (
    <div className="w-11/12 mx-auto min-h-screen flex flex-col justify-between">
      <div>
        <div className="flex justify-center items-center mt-[90px] mb-[25px]">
          <div className="relative h-[210px] w-[296px]">
            <Image src="/images/shopping-sale.svg" alt="shopping image" fill />
          </div>
        </div>
        {isClient && products.length < 1 && (
          <div>
            <h2 className="my-4 text-lg font-semibold text-center">
              You don&apos;t have any product yet
            </h2>
            <div className="text-center">
              <h2 className="text-center text-[36px] font-bold">Welcome</h2>
              <p className="text-sm mt-2 font-normal">
                The safest platfrom to shop from social
                <br /> media vendors
              </p>
            </div>
          </div>
        )}
        {isClient && products.length > 0 && (
          <section className="mt-3">
            <h2 className="my-4 text-lg font-semibold text-center">Products</h2>
            <div className="grid md:grid-cols-4 grid-cols-2 gap-3">
              {products.map((product: ProductData) => (
                <div
                  className="rounded-md shadow-lg"
                  key={product.title}
                  role="button"
                  onClick={() => displayDetail(product)}
                >
                  <div className="relative h-[150px] w-full">
                    <Image
                      src={product.prodImgs[0].src || `/images/avatar.png`}
                      alt={product.prodImgs[0]?.name}
                      className="rounded-md w-full object-top"
                      layout="fill"
                      objectFit="cover"
                      onError={(
                        e: React.SyntheticEvent<HTMLImageElement, Event>
                      ) => {
                        e.currentTarget.src = '/images/prod.svg'; // Replace with fallback image
                      }}
                    />
                  </div>

                  <h3 className="my-3 px-3">{product.title}</h3>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
      <div className="mb-4 flex justify-center items-center">
        <Link
          href="/product/create"
          className="pri-btn w-full md:w-1/6 inline-block"
        >
          Create Product
        </Link>
      </div>
    </div>
  );
}
