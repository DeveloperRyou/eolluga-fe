import { getMenuOptions } from "@/entities";
import TopBar from "@/shared/ui/TopBar";
import { MenuInfo } from "@/widgets";

export default async function Page({
  params,
}: {
  params: { menuId: string; storeId: string };
}) {
  const menuOptions = await getMenuOptions(params.storeId, params.menuId);

  return (
    <>
      <TopBar
        storeId={1}
        tableId={1}
        showBackButton
        showCartLink
        storeName="store"
      />
      <MenuInfo data={menuOptions} />
    </>
  );
}
