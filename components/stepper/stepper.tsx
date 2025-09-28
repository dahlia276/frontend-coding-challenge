import useStepper from "../../hooks/useStepper";

interface Steps {
    id: number
    title: string
    completed?: boolean
}

interface StepperProps {
    steps: Steps[]
}

export default function Stepper({ steps }: StepperProps) {
    const { currentStep } = useStepper();

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
                    const isCompleted = stepNumber < currentStep;

                    return (
                        <div key={step.id} className="flex flex-col items-center relative">
                            {index < steps.length - 1 && (
                                <div className="absolute top-6 left-12 w-24 h-0.5 bg-gray-300"/>
                            )}

                            <div
                                className={`
                                    relative w-12 h-12 rounded-full flex items-center justify-center
                                    text-lg font-semibold
                                   ${isActive
                                    ? 'bg-blue-500 text-white'
                                    : isCompleted
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 text-gray-600'
                                }
                                `}>
                                { index + 1}
                            </div>

                            <span className={`
                                mt-3 text-sm font-medium text-center
                                ${isActive || isCompleted
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
