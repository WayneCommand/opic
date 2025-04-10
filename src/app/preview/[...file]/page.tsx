export const runtime = 'edge';

export default function PreviewPage({ params }: { params: { file: string[] } }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <img src={"/img/" + params.file.join("/")} alt={params.file.join("/")} />
    </main>
  )
}