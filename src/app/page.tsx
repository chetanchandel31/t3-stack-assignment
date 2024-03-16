import ClientComponent from "./ClientComponent";

export default async function Home() {
  return (
    <main className="m-auto" style={{ border: "solid 1px red", maxWidth: 600 }}>
      hi home
      <ClientComponent />
    </main>
  );
}
