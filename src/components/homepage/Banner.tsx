import Image from 'next/image';
import React from 'react';
import bannerImage from '@/assets/hero_img.jpg'; // If your alias points to project root, use '@/src/assets/hero_img.jpg'

const Banner = () => {
  return (
    <section className="max-w-6xl mx-auto my-10 px-4">
      <div className="bg-[#131313]/5 rounded-3xl p-10 sm:p-16 md:p-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div className="space-y-8 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-[#131313] leading-tight max-w-md">
            Books to freshen up your bookshelf
          </h1>
          <div>
            <button className="btn bg-[#23BE0A] hover:bg-[#1fa509] text-white font-semibold text-lg px-7 py-3 rounded-lg border-none shadow-none cursor-pointer">
              View The List
            </button>
          </div>
        </div>

        {/* Right Book Image */}
        <div className="flex justify-center md:justify-end items-center">
          <Image
            src={bannerImage}
            alt="The Dating Playbook For Men"
            priority
            className="w-auto max-h-380px object-contain drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;