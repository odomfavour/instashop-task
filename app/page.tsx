import Image from 'next/image';
import Link from 'next/link';

import { IoIosCheckmarkCircleOutline } from 'react-icons/io';

export default function Home() {
  return (
    <div className="w-10/12 md:w-1/3 mx-auto min-h-screen flex flex-col justify-between">
      <div>
        <div className="flex justify-center items-center mt-[90px] mb-[25px]">
          <div className="relative h-[210px] w-[296px]">
            <Image src="/images/shopping-sale.svg" alt="shopping image" fill />
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-center text-[36px] font-bold">Welcome</h2>
          <p className="text-sm mt-2 font-normal">
            The safest platfrom to shop from social
            <br /> media vendors
          </p>
        </div>
        <div className="bg-[#FFEAFA] py-3 px-4 rounded-[12px] mt-[25px]">
          <ul>
            <li className="text-sm font-medium mb-[12px] flex items-center gap-3">
              <IoIosCheckmarkCircleOutline className="text-[#8A226F]" />
              Reach Millions of Shoppers
            </li>
            <li className="text-sm font-medium mb-[12px] flex items-center gap-3">
              <IoIosCheckmarkCircleOutline className="text-[#8A226F]" />
              Easy Product Listing
            </li>
            <li className="text-sm font-medium mb-[12px] flex items-center gap-3">
              <IoIosCheckmarkCircleOutline className="text-[#8A226F]" />
              Secure and Fast Payments
            </li>
            <li className="text-sm font-medium mb-[12px] flex items-center gap-3">
              <IoIosCheckmarkCircleOutline className="text-[#8A226F]" />
              Boost Your Visibility
            </li>
          </ul>
        </div>
      </div>
      <div className="mb-4">
        <Link href="/signup" className="pri-btn w-full inline-block">
          Get started
        </Link>
      </div>
    </div>
  );
}
