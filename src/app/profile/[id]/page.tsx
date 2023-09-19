export default function UserPage({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      User {params.id}
    </div>
  );
}
