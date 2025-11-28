export interface Project {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  type?: string;
  imageUrl?: string;
}

export interface ProjectInput {
  name: string;
  description?: string;
  latitude: number;
  longitude: number;
}
