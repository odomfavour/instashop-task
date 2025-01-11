'use client';
import AuthStepOne from '@/components/auth/AuthStepOne';
import AuthStepThree from '@/components/auth/AuthStepThree';
import AuthStepTwo from '@/components/auth/AuthStepTwo';
import { setUser } from '@/provider/redux/userSlice';
import AuthData from '@/types/AuthData';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
const Page = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<AuthData>({
    phone: '',
    email: '',
    fullname: '',
    username: '',
    image: '',
    storename: '',
    storeTagName: '',
    storePhone: '',
    storeEmail: '',
    category: '',
  });

  const handleContinue = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      formData.token = process.env.NEXT_PUBLIC_INSTA_TOKEN;
      document.cookie = `instaToken=${formData.token}; path=/; max-age=86400;`;

      localStorage.setItem('instaUser', JSON.stringify(formData));
      dispatch(setUser(formData));
      toast.success('Account created successfully');
      setFormData({
        phone: '',
        email: '',
        fullname: '',
        username: '',
        image: '',
        storename: '',
        storeTagName: '',
        storePhone: '',
        storeEmail: '',
        category: '',
      });
      router.push('/product');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  return (
    <div className="w-11/12 md:w-1/3 mx-auto min-h-screen flex flex-col justify-between">
      <div>
        <div className="flex py-4 items-center gap-3">
          <BsArrowLeft role="button" onClick={handleBack} />
          <p className="text-base font-medium">Get started</p>
        </div>
        <div className="grid grid-cols-3 gap-2 my-[20px]">
          <div
            className={`h-[4px] rounded-[15px] w-full  ${
              currentStep >= 1 ? 'bg-pri' : ''
            }`}
          />
          <div
            className={`h-[4px] rounded-[15px] w-full  ${
              currentStep >= 2 ? 'bg-pri' : 'bg-[#0000001A]'
            }`}
          />
          <div
            className={`h-[4px] rounded-[15px] w-full  ${
              currentStep >= 3 ? 'bg-pri' : 'bg-[#0000001A]'
            }`}
          />
        </div>
        {currentStep === 1 && (
          <AuthStepOne formData={formData} setFormData={setFormData} />
        )}
        {currentStep === 2 && (
          <AuthStepTwo formData={formData} setFormData={setFormData} />
        )}
        {currentStep === 3 && (
          <AuthStepThree formData={formData} setFormData={setFormData} />
        )}
      </div>
      <div className="mb-4">
        <button className="pri-btn w-full h-[40px]" onClick={handleContinue}>
          {currentStep === 3 ? 'Submit' : 'Continue'}
        </button>
      </div>
    </div>
  );
};

export default Page;
