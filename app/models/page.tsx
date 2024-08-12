import { NewModel } from "@/components/NewModel";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import Link from "next/link";

async function getModels() {
  const res = await fetch(
    `${process.env.XSPECT_HOST}:${process.env.XSPECT_PORT}/list-models`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function ModelsPage() {
  const models = (await getModels()) as Models;
  return (
    <div className="flex h-screen justify-center">
      <div className="mt-8 w-full max-w-4xl">
        <div className="mx-8 rounded-lg border border-gray-200 bg-white p-5 shadow dark:border-gray-700 dark:bg-gray-800">
          <h1 className="mb-6 text-4xl font-bold dark:text-white">Models</h1>
          <div className="mb-6 flex justify-end">
            <NewModel />
          </div>
          <div className="relative overflow-x-auto">
            <Table hoverable>
              <TableHead>
                <TableHeadCell>Name</TableHeadCell>
                <TableHeadCell>Type</TableHeadCell>
                <TableHeadCell>
                  <span className="sr-only">Edit</span>
                </TableHeadCell>
              </TableHead>
              <TableBody className="divide-y">
                {Object.keys(models).map((type) =>
                  models[type].map((model_name: string, index: number) => (
                    <TableRow
                      key={index}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <TableCell>{model_name}</TableCell>
                      <TableCell>{type}</TableCell>
                      <TableCell>
                        <Link
                          href={`/models/${model_name}-${type.toLowerCase()}`}
                          className="font-medium text-blue-500 hover:underline dark:text-blue-500"
                        >
                          Edit
                        </Link>
                      </TableCell>
                    </TableRow>
                  )),
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
