import CreateGroupModal from "@/components/CreateGroupModal";
import GroupContainer from "@/components/GroupContainer";
import { getGroups } from "@/actions/group.action";

export default async function Home() {
  const groups = await getGroups();

  return (
    <div className="flex flex-col gap-12 h-screen w-screen bg-background">
      <div className="flex flex-row items-baseline gap-4 ml-12">
        <span className="font-bold text-4xl text-primary">| Groups</span>
        <CreateGroupModal />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-12 mx-auto">
        {groups.map((g) => (
          <GroupContainer group={g} key={g.id} />
        ))}
      </div>
    </div>
  );
}
