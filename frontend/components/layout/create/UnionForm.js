import UnionDetailsForm from "./UnionDetailsForm";
import SelectDAOForm from "./SelectDAOForm";

const UnionForm = ({
  step,
  image,
  unionName,
  setUnionName,
  setDescription,
  setSelectedDAO,
  handleImageChange,
  handleSubmit,
  description,
  selectedDAO,
  handleNext,
  handlePrev,
  type,
  setType,
  multiplierPeriod,
  setMultiplierPeriod,
  nftAddress,
  setNftAddress,
}) => {
  return (
    <form className="space-y-10 mx-20">
      {step === 1 && (
        <UnionDetailsForm
          image={image}
          unionName={unionName}
          setUnionName={setUnionName}
          description={description}
          setDescription={setDescription}
          handleImageChange={handleImageChange}
        />
      )}

      {step === 2 && (
        <SelectDAOForm
          selectedDAO={selectedDAO}
          setSelectedDAO={setSelectedDAO}
          type={type}
          setType={setType}
          multiplierPeriod={multiplierPeriod}
          setMultiplierPeriod={setMultiplierPeriod}
          nftAddress={nftAddress}
          setNftAddress={setNftAddress}
        />
      )}

      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={handlePrev}
          disabled={step === 1}
          className="select-none rounded-lg bg-gray-900 py-3 px-6 text-center font-sans text-xs font-bold uppercase text-white border border-gray-700 shadow-md transition-all hover:shadow-lg focus:opacity-[0.85] disabled:opacity-50"
        >
          Prev
        </button>

        {step === 2 ? (
          <button
            onClick={handleSubmit}
            className="select-none rounded-lg bg-gray-900 py-3 px-6 text-center font-sans text-xs font-bold uppercase text-white shadow-md border border-gray-400 transition-all hover:shadow-lg focus:opacity-[0.85]"
          >
            Submit
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            className="select-none rounded-lg bg-gray-900 py-3 px-6 text-center font-sans text-xs font-bold uppercase text-white border border-gray-400 shadow-md transition-all hover:shadow-lg focus:opacity-[0.85]"
          >
            Next
          </button>
        )}
      </div>
    </form>
  );
};

export default UnionForm;
