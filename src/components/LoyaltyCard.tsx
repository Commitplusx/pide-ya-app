"use client";

import { motion } from "framer-motion";
import { Gift, Sparkles, TrendingUp, Award } from "lucide-react";

interface LoyaltyCardProps {
    stamps: number; // 0 to 6
    loading?: boolean;
}

export function LoyaltyCard({ stamps, loading }: LoyaltyCardProps) {
    const totalSlots = 6;
    const isRewardUnlocked = stamps >= 6;
    const progress = Math.min((stamps / 6) * 100, 100);

    // Calculate circular progress (0-360 degrees)
    const circumference = 2 * Math.PI * 45; // radius = 45
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="w-full relative">
            {/* Main Card with 3D effect */}
            <motion.div
                className="relative"
                initial={{ rotateX: 5 }}
                whileHover={{ rotateX: 0, y: -5 }}
                transition={{ duration: 0.3 }}
                style={{ perspective: 1000 }}
            >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-pink-500/20 to-purple-500/20 rounded-[2.5rem] blur-2xl" />

                {/* Card Container - LIGHT THEME */}
                <div className="relative bg-white rounded-[2.5rem] p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-hidden">

                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-full blur-3xl" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Sparkles className="w-5 h-5 text-orange-500" />
                                    <h2 className="text-slate-900 font-black text-2xl sm:text-3xl tracking-tight">
                                        Programa de Lealtad
                                    </h2>
                                </div>
                                <p className="text-slate-500 text-sm font-medium">
                                    Acumula 6 sellos, el 7º envío es gratis
                                </p>
                            </div>
                        </div>

                        {/* Progress Circle + Stamps */}
                        <div className="flex flex-col sm:flex-row items-center gap-8 my-8">
                            {/* Circular Progress */}
                            <div className="relative flex-shrink-0">
                                <svg className="w-40 h-40 sm:w-48 sm:h-48 transform -rotate-90">
                                    {/* Background circle */}
                                    <circle
                                        cx="50%"
                                        cy="50%"
                                        r="45"
                                        className="stroke-slate-200"
                                        strokeWidth="8"
                                        fill="none"
                                    />
                                    {/* Animated progress circle */}
                                    <motion.circle
                                        cx="50%"
                                        cy="50%"
                                        r="45"
                                        className="stroke-orange-500"
                                        strokeWidth="8"
                                        fill="none"
                                        strokeLinecap="round"
                                        initial={{ strokeDashoffset: circumference }}
                                        animate={{ strokeDashoffset }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        style={{
                                            strokeDasharray: circumference,
                                            filter: "drop-shadow(0 0 8px rgba(249, 115, 22, 0.6))"
                                        }}
                                    />
                                </svg>

                                {/* Center content */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <motion.div
                                        key={stamps}
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="text-center"
                                    >
                                        <div className="text-5xl sm:text-6xl font-black text-slate-900 mb-1">
                                            {stamps}
                                        </div>
                                        <div className="text-slate-500 text-sm font-bold">
                                            de {totalSlots}
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Reward badge if unlocked */}
                                {isRewardUnlocked && (
                                    <motion.div
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50"
                                    >
                                        <Gift className="w-6 h-6 text-white" />
                                    </motion.div>
                                )}
                            </div>

                            {/* Stamps Grid */}
                            <div className="flex-1 w-full">
                                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                                    {Array.from({ length: 6 }).map((_, i) => {
                                        const isFilled = stamps > i;
                                        return (
                                            <motion.div
                                                key={i}
                                                initial={false}
                                                animate={{
                                                    scale: isFilled ? [1, 1.1, 1] : 1,
                                                }}
                                                transition={{ duration: 0.3, delay: i * 0.05 }}
                                                className={`
                                                    aspect-square rounded-2xl flex items-center justify-center text-2xl font-bold
                                                    ${isFilled
                                                        ? 'bg-gradient-to-br from-orange-500 to-pink-500 text-white shadow-lg shadow-orange-500/30'
                                                        : 'bg-slate-50 border-2 border-dashed border-slate-300 text-slate-400'
                                                    }
                                                `}
                                            >
                                                {isFilled ? '✓' : i + 1}
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Status Banner */}
                        {isRewardUnlocked ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-4 flex items-center justify-center gap-3"
                            >
                                <Award className="w-6 h-6 text-white animate-pulse" />
                                <div className="text-center">
                                    <div className="text-white font-black text-lg">¡FELICIDADES!</div>
                                    <div className="text-green-100 text-sm font-medium">Tu próximo envío es GRATIS 🎉</div>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-4 border border-orange-100">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                                            <TrendingUp className="w-5 h-5 text-orange-500" />
                                        </div>
                                        <div>
                                            <div className="text-slate-900 font-bold text-sm">
                                                {6 - stamps} sellos más
                                            </div>
                                            <div className="text-slate-600 text-xs">
                                                para tu envío gratis
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-orange-500 font-black text-2xl">
                                            {Math.round(progress)}%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
