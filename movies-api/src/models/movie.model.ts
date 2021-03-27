export interface Movie {
  id?:            string;
  title?:         string;
  year?:          number;
  cover?:         string;
  description?:   string;
  duration?:      number;
  contentRating?: string;
  source?:        string;
  tags?:          string[];
}
