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