export interface APIResponse {
  success: boolean;
  message: string;
  data: User[];
  meta: Meta;
}

export interface Person {
  id: string;
  email: string;
  name: string;
  gender: string;
  isDeleting?: boolean;

  // createdAt: Date;
  // updatedAt: Date;
}

export interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
