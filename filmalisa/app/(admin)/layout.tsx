export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="pt-16">{children}</main>
    </>
  );
}
