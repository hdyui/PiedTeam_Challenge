import React from "react";
import { Card, CardContent } from "@/shared/components/ui/card";

export const HomePage = () => {
  return (
    <div className="text-center">
      <h1 className="text-5xl font-extrabold text-while">
        Business Management
      </h1>
      <p className="mt-6 text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
        Provides features that assist users in effectively managing news -
        recruitment - and human resources.
      </p>
      <img
        src="https://base.vn/wp-content/uploads/2024/10/bo-quy-trinh-quan-ly-doanh-nghiep.webp"
        alt="Business Management"
        className="mt-10 w-full max-w-3xl mx-auto rounded-xl border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.25)]"
      />
    </div>
  );
};
