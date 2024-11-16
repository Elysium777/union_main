"use client";

import { useState } from "react";

import UnionForm from "@/components/layout/create/UnionForm";
import FormIndicator from "@/components/layout/create/FormIndicator";
import { toast } from "sonner";
import useCreate from "@/hooks/useCreate";

const CreateUnionPage = () => {
  const [step, setStep] = useState(1);
  const [image, setImage] = useState(null);
  const [unionName, setUnionName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDAO, setSelectedDAO] = useState("");
  const [type, setType] = useState("");
  const [multiplierPeriod, setMultiplierPeriod] = useState("");
  const [nftAddress, setNftAddress] = useState("");
  const { createUnion } = useCreate();

  const handleImageChange = (e) => {
    convertToBase64(e.target.files[0]);
  };

  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result.split(",")[1]);
    };
    reader.onerror = (error) => {
      console.error("Error:", error);
    };
  };

  const handleNext = (e) => {
    e.preventDefault();
    unionName && description && setStep((prev) => (prev < 2 ? prev + 1 : prev));
  };
  const handlePrev = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

  const handleSubmit = (e) => {
    e.preventDefault();

    createUnion(
      unionName,
      description,
      image,
      selectedDAO,
      type,
      multiplierPeriod,
      nftAddress
    );
  };

  return (
    <div className="flex m-5 gap-5 flex-1">
      <section className="bg-white/10 rounded-xl h-full flex-1 min-w-80 p-5 space-y-12">
        <h1 className="text-2xl font-bold">
          Create <span className="font-alegreya text-3xl">union</span>
        </h1>

        <FormIndicator
          step={step}
          setStep={setStep}
          isActive={unionName && description}
        />
      </section>

      <section className="flex-[4]">
        <UnionForm
          step={step}
          setUnionName={setUnionName}
          setDescription={setDescription}
          setSelectedDAO={setSelectedDAO}
          setType={setType}
          handleImageChange={handleImageChange}
          handleSubmit={handleSubmit}
          image={image}
          unionName={unionName}
          description={description}
          selectedDAO={selectedDAO}
          type={type}
          handleNext={handleNext}
          handlePrev={handlePrev}
          multiplierPeriod={multiplierPeriod}
          setMultiplierPeriod={setMultiplierPeriod}
          nftAddress={nftAddress}
          setNftAddress={setNftAddress}
        />
      </section>
    </div>
  );
};

export default CreateUnionPage;
