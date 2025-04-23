"use client";

import SingleBlog from "@/components/SingleBlog";
import { useParams } from "next/navigation";

export default function BlogPage() {
  const params = useParams();
  if (!params?.id) return null;
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  return <SingleBlog id={id} />;
}
