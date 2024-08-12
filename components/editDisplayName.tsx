"use client";

import { updateModelDisplayName } from "@/app/actions/updateModelDisplayName";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";

type UpdateDisplayNameModalProps = {
  slug: string;
  id: string;
  displayName: string;
  closeModal: () => void;
};

export function UpdateDisplayNameModal({
  slug,
  id,
  displayName,
  closeModal,
}: UpdateDisplayNameModalProps) {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = event.currentTarget.dname.value as string;

    console.log(name);
    updateModelDisplayName(slug, id, name);
    router.refresh();
    closeModal();
  };

  return (
    <Modal dismissible show={id ? true : false} onClose={closeModal}>
      <Modal.Body>
        <div className="mt-6 space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Edit display name
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="mb-2 block">
                <Label htmlFor="dname" value="Display name" />
              </div>
              <TextInput
                id="dname"
                placeholder={displayName}
                defaultValue={displayName}
                required
              />
            </div>
            <div className="w-full">
              <Button type="submit" color="blue">
                Update display name
              </Button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
