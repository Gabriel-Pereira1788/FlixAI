export type ApiMessage = {
  role: string;
  content: string;
};

export interface BodyDTO {
  model: string;
  messages: ApiMessage[];
  temperature: number;
  max_tokens: number;
}
