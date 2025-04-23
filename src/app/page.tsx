import { redirect } from "next/navigation";
export default function Home() {
  redirect("/bus-booking");
  return <>hello world</>;
}
