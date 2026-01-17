import {
  object,
  pipe,
  string,
  minLength,
  maxLength,
  email,
  picklist,
  InferOutput,
} from "valibot";

export const PersonSchema = object({
  name: pipe(
    string("Name must be a string"),
    minLength(5, "Name must be at least 5 characters"),
    maxLength(50, "Name must not exceed 50 characters")
  ),
  email: pipe(
    string("Email must be a string"),
    email("Please enter a valid email address")
  ),
  gender: pipe(
    string("Gender must be selected"),
    picklist(["MALE", "FEMALE"], "Please select a valid gender")
  ),
});

export type PersonFormData = InferOutput<typeof PersonSchema>;
