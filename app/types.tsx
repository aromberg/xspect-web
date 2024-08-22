interface Models {
  [key: string]: string[];
}

interface ModelMetadata {
  model_display_name: string;
  model_type: string;
  author: string;
  author_email: string;
  k: number;
  display_names: { [key: string]: string };
  fpr: number;
  num_hashes: number;
  kernel: Partial<string>;
  C: Partial<number>;
}

interface ModelResult {
  model_slug: string;
  sparse_sampling_step: number;
  hits: { [subsequence: string]: { [label: string]: number } };
  scores: { [subsequence: string]: { [label: string]: number } };
  num_kmers: { [subsequence: string]: number };
  prediction: string;
  pipeline_steps: [SubprocessingStep];
}

interface SubprocessingStep {
  subprocessing_type: string;
  label: string;
  threshold: number;
  model_execution: ModelResult;
}

interface Run {
  display_name: string;
  input_file: string;
  results: [ModelResult];
}
