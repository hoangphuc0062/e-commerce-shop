import { Icon } from "@iconify/react";

export default function ProgressSteps({ steps, currentStep, setCurrentStep }) {
  return (
    <div className="pb-5">
      <ol className="flex items-center w-full text-sm font-medium text-center bg-indigo-100 pt-3 pb-1 text-gray-500 dark:text-gray-400 sm:text-base">
        {steps.map((step, index) => (
          <li
            key={index}
            className="relative flex items-center w-full justify-center cursor-pointer"
            onClick={() => {
              if (index <= currentStep) setCurrentStep(index);
            }}
          >
            {/* Left line for all except the first step */}
            {index !== 0 && (
              <span
                className={`absolute left-0 top-[22px] transform -translate-y-1/2 w-[50%] h-[1px] border-t ${
                  index <= currentStep
                    ? "border-solid border-indigo-600"
                    : "border-dotted border-gray-400"
                }`}
              ></span>
            )}

            <div className="relative z-10 flex flex-col items-center">
              {/* Icon with conditional background for active step */}
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-full ${
                  index === currentStep || index < currentStep
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-400 border border-gray-400"
                }`}
              >
                <Icon icon={step.icon} width={30} />
              </div>
              <span
                className={`h-8 hidden sm:block ${
                  index === currentStep || index < currentStep
                    ? "text-indigo-600 font-semibold"
                    : "text-gray-500"
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Right line for all except the last step */}
            {index < steps.length - 1 && (
              <span
                className={`absolute right-0 top-[22px] transform -translate-y-1/2 w-[50%] h-[1px] border-t ${
                  index < currentStep
                    ? "border-solid border-indigo-600"
                    : "border-dotted border-gray-400"
                }`}
              ></span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
