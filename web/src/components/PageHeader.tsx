import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="relative bg-primary text-white overflow-hidden py-16 sm:py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-20 bg-[url('/assets/images/hero-bg.png')] bg-cover bg-center"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 animate-fade-in">
          {title}
        </h1>
        {description && (
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto font-light animate-slide-up">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
