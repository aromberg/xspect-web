"use client";

import { uploadFile } from "@/app/actions/uploadFile";
import { FileInput, Label } from "flowbite-react";
import { useRouter } from "next/navigation";
import type { ChangeEvent } from "react";
import { useState } from "react";

export default function SubmissionForm(props: { speciesModels: string[] }) {
  if (!props.speciesModels) {
    throw new Error("No species models provided");
  }

  const [file, setFile] = useState<string>("");
  const [genus, setGenus] = useState<string>(props.speciesModels[0]);
  const [meta, setMeta] = useState<boolean>(false);
  const [n, setN] = useState<number>(1);

  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    router.push(`/classification/${genus}/${file}/${meta}/${n}`);
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);
    await uploadFile(formData)
      .then((data) => setFile(data["filename"]))
      .catch((error) => console.error(error));
  };

  return (
    <div className="flex h-screen justify-center">
      <div className="w-5xl mt-8">
        <div className="w-full max-w-lg rounded-lg border border-gray-200 bg-white p-5 shadow dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            Classify sample
          </h2>
          <p className="mb-6 text-gray-500 dark:text-gray-400">
            To classify a sample, please upload your file and select which model
            to use.
          </p>

          <form className="mb-6" onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="mb-2 block">
                <Label htmlFor="file-upload" value="Upload file" />
              </div>
              <FileInput
                id="file-upload"
                helperText="FASTA or FASTQ."
                accept=".fasta, .fastq, .fa, .fq, .fna"
                onChange={(e) => handleFileChange(e)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="genus"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Select genus for species classification
              </label>
              <select
                id="genus"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                onChange={(e) => setGenus(e.target.value)}
              >
                {props.speciesModels.map((model: string, key: number) => (
                  <option key={key} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  value=""
                  className="peer sr-only"
                  onChange={(e) => setMeta(e.target.checked)}
                />
                <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Prefilter individual sequences for the selected genus
                  ("Metagenome mode")
                </span>
              </label>
            </div>

            <div className="mb-4">
              <label
                htmlFor="number-input"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Classify based on every nth kmer (sparse sampling):
              </label>
              <input
                type="number"
                id="number-input"
                aria-describedby="helper-text-explanation"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="1"
                defaultValue={1}
                max={500}
                min={1}
                required
                onChange={(e) => setN(parseInt(e.target.value))}
              />
            </div>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <button
                type="reset"
                className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              >
                Clear
              </button>
              <button
                type="submit"
                className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Classify
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
