import prismadb from "@/lib/prismadb";

import { UserForm } from "./components/user-form";

const SizePage = async ({
  params
}: {
  params: { sizeId: string }
}) => {
  const user = await prismadb.user.findFirst({
    where: {
      id: params.sizeId
    }
  });

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <UserForm initialData={user} />
      </div>
    </div>
  );
}

export default SizePage;
