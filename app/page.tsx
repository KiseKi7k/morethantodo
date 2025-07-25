import CreateGroupModal from "@/components/CreateGroupModal";
import GroupContainer from "@/components/GroupContainer";

import { CirclePlus } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 h-screen w-screen bg-background">
      <div className="w-screen h-20 bg-primary flex justify-center items-center font-semibold text-5xl text-white">
        More Than To Do
      </div>

      <div className="flex flex-row items-baseline gap-4 ml-12">
        <span className="font-bold text-4xl text-primary">| Groups</span>
        <CreateGroupModal />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-12 mx-auto">
        <GroupContainer />
        <GroupContainer />
        <GroupContainer />
      </div>
    </div>
  );
}
