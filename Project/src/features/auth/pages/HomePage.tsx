import React from "react";
import { Card, CardContent } from "@/shared/components/ui/card";

export const HomePage = () => {
  return (
    <div className="text-center">
      <h1 className="text-5xl font-extrabold text-while">Welcome to ShopApp</h1>
      <p className="mt-6 text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
        Experience the power of Single Page Applications (SPA) with React Router
        v6. Smooth transitions, no reloads, and clean code.
      </p>
      <img
        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Shop"
        className="mt-10 w-full max-w-3xl mx-auto rounded-xl border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.25)]"
      />
    </div>
  );
};
