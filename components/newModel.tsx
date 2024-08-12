"use client";

import { submitTrainingJob } from "@/app/actions/submitTrainingJob";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";

export function NewModel() {
  const [openDownloadModal, setOpenDownloadModal] = useState(false);
  const [openTrainModal, setOpenTrainModal] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const genus = event.currentTarget.genus.value as string;
    const step = 1;

    await submitTrainingJob(genus, step)
      .then(() => {
        setOpenTrainModal(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button.Group>
        <Button
          color="light"
          size="sm"
          onClick={() => setOpenDownloadModal(true)}
        >
          Download
        </Button>
        <Button color="light" size="sm" onClick={() => setOpenTrainModal(true)}>
          Train
        </Button>
      </Button.Group>
      <Modal
        dismissible
        show={openDownloadModal}
        onClose={() => setOpenDownloadModal(false)}
      >
        <Modal.Header>Coming soon!</Modal.Header>
        <Modal.Body>
          <div>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Download functionality for models is not available yet. Please
              check back later.
            </p>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        dismissible
        show={openTrainModal}
        onClose={() => setOpenTrainModal(false)}
      >
        <Modal.Body>
          <div className="mt-6 space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Submit Training Job
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <div className="mb-2 block">
                  <Label htmlFor="genus" value="Genus to train" />
                </div>
                <TextInput id="genus" placeholder="Salmonella" required />
              </div>
              <div className="w-full">
                <Button type="submit" color="blue">
                  Submit job
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
