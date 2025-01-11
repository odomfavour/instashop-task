import AuthData from '@/types/AuthData';
import React from 'react';

interface AuthStepOneProps {
  formData: AuthData;
  setFormData: React.Dispatch<React.SetStateAction<AuthData>>;
}
const AuthStepOne = ({ formData, setFormData }: AuthStepOneProps) => {
  return (
    <section className="">
      <div className="mb-6">
        <h3 className="text-2xl font-medium mb-4 text-[#000000E5]">
          Enter your phone number or email to get started
        </h3>
        <p className="font-normal text-sm">
          We will send you a verification code for confirmation
        </p>
      </div>

      <div>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              phone: e.target.value,
            }))
          }
          className="w-full p-3 border border-[#00000033] rounded-[12px] placeholder-[#00000099] h-[52px]"
          placeholder="Enter phone number or email"
        />
      </div>
    </section>
  );
};

export default AuthStepOne;
