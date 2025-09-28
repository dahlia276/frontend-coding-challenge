import useStepper from "../../hooks/useStepper";
interface Steps {
    id: number
    title: string
    completed?: boolean
}

interface StepperProps {
    steps: Steps[]
    currentStep: number
    onStepClick?: (stepNumber: number) => void
    onNextStep?: () => void
}

export default function Stepper({ steps, onStepClick }: Omit<StepperProps, 'currentStep' | 'onNextStep'>) {
    const { currentStep, handleNextStep } = useStepper();
    if (!steps || steps.length === 0) {
        return (
            <div className="w-full max-w-md mx-auto text-center text-gray-500">
                No steps provided
            </div>
        );
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                    const stepNumber = index;
                    const isActive = stepNumber === currentStep;
                    const isCompleted = stepNumber < currentStep || step.completed;
                    const isClickable = onStepClick && stepNumber <= currentStep;

                    return (
                        <div key={step.id} className="flex flex-col items-center relative">
                            {index < steps.length - 1 && (
                                <div className="absolute top-6 left-12 w-20 h-0.5 bg-gray-300" />
                            )}

                            <button
                                onClick={() => handleNextStep()}
                                disabled={!isClickable}
                                className={`
                                    relative w-12 h-12 rounded-full flex items-center justify-center
                                    text-lg font-semibold
                                    ${isActive
                                    ? 'bg-blue-500 text-white shadow-lg'
                                    : isCompleted
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 text-gray-600'
                                }
                                    ${isClickable
                                    ? 'cursor-pointer'
                                    : 'cursor-default'
                                }
                                `}
                                type="button"
                            >
                                {isCompleted ? (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    </svg>
                                ) : (
                                    index + 1
                                )}
                            </button>

                            <span className={`
                                mt-3 text-sm font-medium text-center
                                ${isActive
                                ? 'text-blue-500'
                                : isCompleted
                                    ? 'text-blue-500'
                                    : 'text-gray-500'
                            }
                            `}>
                                {step.title}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
