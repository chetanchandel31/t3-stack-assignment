import AuthorizedRoute from "./providers/AuthProvider/jsx/AuthorizedRoute";

export default async function Home() {
  return (
    <AuthorizedRoute>
      <main
        className="m-auto"
        style={{ border: "solid 1px red", maxWidth: 600 }}
      >
        hi home
      </main>
    </AuthorizedRoute>
  );
}
