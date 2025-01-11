import AuthData from '@/types/AuthData';
import Image from 'next/image';
import React, { useRef } from 'react';

interface AuthStepThreeProps {
  formData: AuthData;
  setFormData: React.Dispatch<React.SetStateAction<AuthData>>;
}

const AuthStepThree = ({ formData, setFormData }: AuthStepThreeProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Ref to the file input

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      // Assuming you store the image as a file or its URL in formData
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevState) => ({
          ...prevState,
          image: URL.createObjectURL(file), // storing the image URL or file
        }));
      };
      reader.readAsDataURL(file); // Convert image to base64 URL
    }
  };

  // Function to trigger the file input when the camera icon is clicked
  const handleImageClick = () => {
    fileInputRef.current?.click(); // Trigger the file input click using useRef
  };

  return (
    <section className="">
      <div>
        <div className="h-[140px] p-3 border border-[#00000033] mb-3 rounded-[12px] flex justify-center items-center">
          <div>
            <div className="flex justify-center items-center">
              <div className="relative h-[80px] w-[80px] rounded-full border">
                <Image
                  src={formData.image || '/images/avatar.svg'} // Display the uploaded image if available
                  alt="store logo"
                  className="rounded-full h-[80px] w-[80px]"
                  layout="fill"
                  objectFit="cover"
                />
                {/* Camera Icon in the Center */}
                <div
                  className="absolute inset-0 flex justify-center items-center cursor-pointer"
                  onClick={handleImageClick}
                >
                  <div className="relative h-[24px] w-[24px]">
                    <Image
                      src="/images/add_a_photo.svg"
                      alt="camera icon"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-3">Upload store logo</p>
          </div>
        </div>

        {/* Image Upload Input (hidden) */}
        <div className="mb-3">
          <input
            type="file"
            ref={fileInputRef} // Attach the ref to the file input
            id="image-upload"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <div>
          {/* Store name input */}
          <div className="mb-3">
            <input
              type="text"
              name="storename"
              value={formData.storename}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  storename: e.target.value,
                }))
              }
              className="w-full p-3 border border-[#00000033] rounded-[12px] placeholder-[#00000099] h-[52px]"
              placeholder="Store name"
            />
          </div>

          {/* Store tag name input */}
          <div className="mb-3">
            <input
              type="text"
              name="storeTagName"
              value={formData.storeTagName}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  storeTagName: e.target.value,
                }))
              }
              className="w-full p-3 border border-[#00000033] rounded-[12px] placeholder-[#00000099] h-[52px]"
              placeholder="Store tag name"
            />
          </div>

          {/* Store phone number input */}
          <div className="mb-3">
            <input
              type="text"
              name="storePhone"
              value={formData.storePhone}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  storePhone: e.target.value,
                }))
              }
              className="w-full p-3 border border-[#00000033] rounded-[12px] placeholder-[#00000099] h-[52px]"
              placeholder="Store phone number"
            />
          </div>

          {/* Store email input */}
          <div className="mb-3">
            <input
              type="text"
              name="storeEmail"
              value={formData.storeEmail}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  storeEmail: e.target.value,
                }))
              }
              className="w-full p-3 border border-[#00000033] rounded-[12px] placeholder-[#00000099] h-[52px]"
              placeholder="Store email"
            />
          </div>

          {/* Category input */}
          <div className="mb-3">
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  category: e.target.value,
                }))
              }
              className="w-full p-3 border border-[#00000033] rounded-[12px] placeholder-[#00000099] h-[52px]"
              placeholder="Category"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthStepThree;
