"use client";
import { useRouter } from "next/navigation";
export default function RouterButton({
  styles,
  title,
  route,
}: {
  styles: string;
  title: string;
  route: string;
}) {
  const router = useRouter();
  return (
    <button className={styles} onClick={() => router.push(`/${route}`)}>
      {title}
    </button>
  );
}
