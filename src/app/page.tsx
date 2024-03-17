import CategoriesList from "./_components/CategoriesList";
import AuthorizedRoute from "./providers/AuthProvider/jsx/AuthorizedRoute";

export default async function Home() {
  return (
    <AuthorizedRoute>
      <CategoriesList />
    </AuthorizedRoute>
  );
}
