export default function Home() {
  return (
    <div className="flex flex-col gap-12 h-screen w-screen bg-background">
      <div className="w-screen h-20 bg-primary flex justify-center items-center font-semibold text-5xl text-white">
        More Than To Do
      </div>

      <div className="ml-12 font-bold text-4xl text-primary">| Groups</div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-12 mx-auto">
        <div className="bg-red-500 aspect-[1.5/1] h-50 lg:h-75"></div>
        <div className="bg-red-500 aspect-[1.5/1] h-50 lg:h-75"></div>
        <div className="bg-red-500 aspect-[1.5/1] h-50 lg:h-75"></div>
      </div>
    </div>
  );
}
