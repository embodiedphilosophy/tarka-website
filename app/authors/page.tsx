import { redirect } from "next/navigation";

export default function AuthorsIndex() {
  redirect("/about#authors");
}
