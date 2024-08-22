"use client";

import { Checkbox, Label, ListGroup, RangeSlider } from "flowbite-react";
import { useState } from "react";
import { RadarChart } from "./chart";

export function ModelResult(props: {
  result: ModelResult;
  metadata: ModelMetadata;
}) {
  const subsequences = Object.keys(props.result.num_kmers);
  const [selectedSubsequences, setSelectedSubsequences] =
    useState(subsequences);
  const [numResults, setNumResults] = useState(10);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    if (checked) {
      setSelectedSubsequences((prevSelected) => [...prevSelected, id]);
    } else {
      setSelectedSubsequences((prevSelected) =>
        prevSelected.filter((subsequence) => subsequence !== id),
      );
    }
  };

  const totalScores = {};
  for (const subsequence of selectedSubsequences) {
    for (const category of Object.keys(props.result.hits[subsequence])) {
      if (!totalScores[category]) {
        totalScores[category] = 0;
      }
      totalScores[category] += props.result.hits[subsequence][category];
    }
  }
  const totalKmers = selectedSubsequences.reduce(
    (acc, subsequence) => acc + props.result.num_kmers[subsequence],
    0,
  );

  const normalizedScores = Object.fromEntries(
    Object.entries(totalScores).map(([category, score]) => [
      category,
      score / totalKmers,
    ]),
  );

  console.log(totalScores);

  const combinedResults = Object.keys(normalizedScores).map((key) => ({
    category: props.metadata.display_names[key],
    score: normalizedScores[key],
  }));

  const topResults = combinedResults
    .sort((a, b) => b.score - a.score)
    .slice(0, numResults);

  const categories = topResults.map((result) => result.category);
  const values = topResults.map((result) => result.score);

  return (
    <div>
      <div className="mx-8 rounded-lg border border-gray-200 bg-white p-5 shadow dark:border-gray-700 dark:bg-gray-800">
        <ListGroup>
          {subsequences.map((key) => (
            <ListGroup.Item key={key}>
              <Checkbox
                id={key}
                defaultChecked={selectedSubsequences.includes(key)}
                onChange={handleCheckboxChange}
              />
              <Label htmlFor={key}>{key}</Label>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <RangeSlider
          min="1"
          max={Object.keys(normalizedScores).length}
          defaultValue={numResults}
          onChange={(event) => setNumResults(parseInt(event.target.value))}
        />
      </div>
      <RadarChart keys={categories} values={values} />
    </div>
  );
}
