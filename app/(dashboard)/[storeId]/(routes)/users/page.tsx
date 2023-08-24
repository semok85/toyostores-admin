import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { UserColumn } from "./components/columns"
import { UsersClient } from "./components/client";

const UsersPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const users = await prismadb.user.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedSizes: UserColumn[] = users.map((item) => ({
    id: item.id,
    name: item.name,
    address: item.address,
    phone: item.phone,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <UsersClient data={formattedSizes} />
      </div>
    </div>
  );
};

export default UsersPage;
