import { createFileRoute } from "@tanstack/react-router";
import Bakery from "~/components/Bakery";
export const Route = createFileRoute("/")({
  component: Home,
});
function Home() {
  return <Bakery />;
}
