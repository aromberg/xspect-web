"use client";

import { updateModelMetadata } from "@/app/actions/updateModelMetadata";
import {
  Alert,
  Button,
  Label,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
} from "flowbite-react";
import Link from "next/link";
import { useState } from "react";
import { UpdateDisplayNameModal } from "./editDisplayName";

export default function ModelDetailsForm(props: {
  modelMetadata: ModelMetadata;
}) {
  if (!props.modelMetadata) {
    throw new Error("No model metadata provided");
  }
  const model = props.modelMetadata;

  const [showSuccessAlert, setShowSucessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [editDisplayNameModalID, setEditDisplayNameModalID] = useState("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const author = event.currentTarget.author.value as string;
    const email = event.currentTarget.email1.value as string;

    updateModelMetadata(
      model.model_display_name.toLowerCase() +
        "-" +
        model.model_type.toLowerCase(),
      author,
      email,
    )
      .then(() => {
        setShowErrorAlert(false);
        setShowSucessAlert(true);
      })
      .catch((error) => {
        console.error(error);
        setShowSucessAlert(false);
        setShowErrorAlert(true);
      });
  };
  return (
    <div>
      {showSuccessAlert && (
        <Alert
          className="my-4"
          color="success"
          onDismiss={() => setShowSucessAlert(false)}
        >
          <span className="font-medium">Metadata updated!</span>
        </Alert>
      )}
      {showErrorAlert && (
        <Alert
          className="my-4"
          color="failure"
          onDismiss={() => setShowErrorAlert(false)}
        >
          <span className="font-medium">Failed to update metadata</span>
        </Alert>
      )}
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="author" value="Model Author" />
          </div>
          <TextInput
            id="author"
            type="text"
            placeholder={model.author}
            defaultValue={model.author}
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Author email" />
          </div>
          <TextInput
            id="email1"
            type="email"
            placeholder={model.author_email}
            defaultValue={model.author_email}
            required
          />
        </div>
        <Button color="blue" type="submit">
          Update
        </Button>
      </form>
      <div className="mt-10">
        <h2 className="mt-6 text-2xl font-bold dark:text-white">
          Display names
        </h2>
        <Table hoverable className="mt-6">
          <TableHead>
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>Display name</TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">Edit</span>
            </TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {Object.keys(model.display_names).map(
              (id: string, index: number) => (
                <TableRow
                  key={index}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <TableCell>{id}</TableCell>
                  <TableCell>{model.display_names[id]}</TableCell>
                  <TableCell>
                    <Link
                      href=""
                      onClick={(e) => {
                        e.preventDefault();
                        setEditDisplayNameModalID(id);
                      }}
                      className="font-medium text-blue-500 hover:underline dark:text-blue-500"
                    >
                      Edit
                    </Link>
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
        <UpdateDisplayNameModal
          slug={
            model.model_display_name.toLowerCase() +
            "-" +
            model.model_type.toLowerCase()
          }
          displayName={model.display_names[editDisplayNameModalID]}
          id={editDisplayNameModalID}
          closeModal={() => setEditDisplayNameModalID("")}
        />
      </div>
    </div>
  );
}
