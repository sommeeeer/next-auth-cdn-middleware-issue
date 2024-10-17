export const revalidate = 60;

export default async function Page() {
  const time = await fetch('https://worldtimeapi.org/api/ip');
  const data = await time.json();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-700 text-lg">
          This is a page that is ISR. It revalidates every 60s
        </p>
        <p className="text-gray-700 text-lg">
          The time is {new Date(data.datetime).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
