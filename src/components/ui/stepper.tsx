"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StepperStep {
  label: string;
}

export function Stepper({
  steps,
  currentStep,
  className,
}: {
  steps: StepperStep[];
  currentStep: number;
  className?: string;
}) {
  return (
    <div className={cn("flex w-full items-start justify-center", className)}>
      {steps.map((step, idx) => {
        const stepNumber = idx + 1;
        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;
        return (
          <React.Fragment key={step.label}>
            <div className="flex flex-col items-center gap-1.5">
              <motion.div
                initial={false}
                animate={{
                  backgroundColor:
                    isCompleted || isActive ? "#1980e5" : "#e5e7eb",
                  scale: isActive ? 1.08 : 1,
                }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                  isCompleted || isActive ? "text-white" : "text-gray-500"
                )}
              >
                {isCompleted ? <Check className="size-4" /> : stepNumber}
              </motion.div>
              <span
                className={cn(
                  "hidden text-xs font-medium sm:block",
                  isActive || isCompleted ? "text-brand-blue" : "text-gray-500"
                )}
              >
                {step.label}
              </span>
            </div>
            {stepNumber < steps.length && (
              <div className="relative mx-2 mt-4 h-0.5 w-8 shrink-0 overflow-hidden rounded-full bg-gray-200 sm:w-16">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-brand-blue"
                  initial={false}
                  animate={{ width: isCompleted ? "100%" : "0%" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
