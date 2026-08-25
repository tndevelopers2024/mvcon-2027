"use client";
import React, { forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';

export const FlipPage = forwardRef<HTMLDivElement, any>((props, ref) => {
  return (
    <div className="bg-white page-flip-container h-full w-full shadow-lg overflow-hidden" ref={ref}>
      <div className="h-full w-full p-8 md:p-12 relative">
        {/* Faint background pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(0,0,0,1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,1)_1px,transparent_1px)] bg-[size:20px_20px]" />
        
        {/* Elegant top right curves (decorative) */}
        <div className="absolute -top-40 -right-40 w-96 h-96 border-[40px] border-[#1F83C6]/5 rounded-full pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-96 h-96 border-[20px] border-[#F26522]/5 rounded-full pointer-events-none" />
        
        <div className="relative z-10 h-full">
          {props.children}
        </div>
      </div>
    </div>
  );
});

FlipPage.displayName = 'FlipPage';

const FlipBookWrapper = forwardRef<any, any>((props, ref) => {
  return (
    // @ts-ignore
    <HTMLFlipBook {...props} ref={ref}>
      {props.children}
    </HTMLFlipBook>
  );
});

FlipBookWrapper.displayName = 'FlipBookWrapper';

export default FlipBookWrapper;
