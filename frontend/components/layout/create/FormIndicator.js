import { Landmark, ReceiptText } from "lucide-react";

function FormIndicator({ step, setStep, isActive }) {
  const handleStepClick = (selectedStep) => {
    if (!isActive) return;
    setStep(selectedStep);
  };

  return (
    <div className="space-y-6 relative">
      <div
        className="flex gap-3 items-start cursor-pointer"
        onClick={() => handleStepClick(1)}
      >
        <div
          className={`p-2 rounded-md border ${
            step === 1 ? "border-gray-100" : "border-gray-500"
          } w-fit`}
        >
          <ReceiptText size={20} color={step === 1 ? "white" : "gray"} />
        </div>

        <div>
          <p
            className={
              step === 1 ? "font-semibold text-gray-100" : "text-gray-700"
            }
          >
            Union Details
          </p>
          <p className="text-sm text-gray-400">
            Create a new union by filling out the form.
          </p>
        </div>
      </div>

      <div
        className="flex gap-3 items-start cursor-pointer"
        onClick={() => handleStepClick(2)}
      >
        <div
          className={`p-2 rounded-md border ${
            step === 2 ? "border-gray-100" : "border-gray-500"
          } w-fit`}
        >
          <Landmark size={20} color={step === 2 ? "white" : "gray"} />
        </div>

        <div>
          <p
            className={
              step === 2 ? "font-semibold text-gray-100" : "text-gray-700"
            }
          >
            Union Properties
          </p>
          <p className="text-sm text-gray-400">
            Set the properties of the union you want to create
          </p>
        </div>
      </div>
    </div>
  );
}

export default FormIndicator;
