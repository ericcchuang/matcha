import { useQuery } from "@tanstack/react-query";
export default function useCards() {
  const { data, isPending, error } = useQuery({
    queryKey: ["cards"],
    queryFn: () => fetch("http://localhost:8000/cards").then((r) => r.json()),
  });
  return { data, isPending, error };
}
