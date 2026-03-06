import { useParams } from "react-router-dom";
import type { UserLoaderData, UserEditFormData } from "../UserEdit.types";

export function useUserEditData(): UserLoaderData {
  const params = useParams<{ userId: string }>();
  const user: UserEditFormData = {
    id: params.userId ?? "",
    name: "teste",
    email: "teste@gmail.com",
  };
  return { user };
}
