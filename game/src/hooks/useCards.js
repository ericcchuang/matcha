import { useQuery } from "@tanstack/react-query";
export default function useCards() {
  const endpoint = process.env.REACT_APP_ENDPOINT;

  const { data, isPending, error } = useQuery({
    queryKey: ["cards"],
    queryFn: () => fetch(`${endpoint}/cards`).then((r) => r.json()),
  });
  return { data, isPending, error };
}
