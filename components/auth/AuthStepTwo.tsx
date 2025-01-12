import AuthData from '@/types/AuthData';
import Image from 'next/image';
import React from 'react';
interface AuthStepTwoProps {
  formData: AuthData;
  setFormData: React.Dispatch<React.SetStateAction<AuthData>>;
}
const AuthStepTwo = ({ formData, setFormData }: AuthStepTwoProps) => {
  return (
    <section className="">
      <div className="mb-6">
        <h3 className="text-2xl font-medium mb-4 text-[#000000E5]">
          Complete profile setup
        </h3>
        <p className="font-normal text-sm">
          Connect your socials for quick setup
        </p>
      </div>

      <div>
        <div className="grid grid-cols-3 gap-3">
          <button className="bg-[#00000005] h-[48px] rounded-[12px] flex justify-center items-center">
            <div className="relative h-[20px] w-[20px]">
              <Image src="/images/instagram.svg" alt="shopping image" fill />
            </div>
          </button>
          <button className="bg-[#00000005] h-[48px] rounded-[12px] flex justify-center items-center">
            <div className="relative h-[20px] w-[20px]">
              <Image src="/images/tiktok.svg" alt="shopping image" fill />
            </div>
          </button>
          <button className="bg-[#00000005] h-[48px] rounded-[12px] flex justify-center items-center">
            <div className="relative h-[20px] w-[20px]">
              <Image src="/images/google.svg" alt="shopping image" fill />
            </div>
          </button>
        </div>
        <p className="my-4">Or enter manually</p>
        <div>
          <div className="mb-3">
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  fullname: e.target.value,
                }))
              }
              className="w-full p-3 border border-[#00000033] rounded-[12px] placeholder-[#00000099] h-[52px]"
              placeholder="Full name"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  username: e.target.value,
                }))
              }
              className="w-full p-3 border border-[#00000033] rounded-[12px] placeholder-[#00000099] h-[52px]"
              placeholder="Username"
            />
          </div>
          <div className="mb-3">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  phone: e.target.value,
                }))
              }
              className="w-full p-3 border border-[#00000033] rounded-[12px] placeholder-[#00000099] h-[52px]"
              placeholder="Phone number"
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  email: e.target.value,
                }))
              }
              className="w-full p-3 border border-[#00000033] rounded-[12px] placeholder-[#00000099] h-[52px]"
              placeholder="Email"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthStepTwo;
