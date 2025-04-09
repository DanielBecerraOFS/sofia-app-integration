import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/index";
import { TableLog } from "../index"
import { Invoice } from "../services/apiService";
interface TabsTableProps {
  data_invoices: Invoice[]
}

const TabsTable: React.FC<TabsTableProps> = ({ data_invoices }) => {
  return (
    <div className="filtering-table w-full">
      <Tabs defaultValue="open-tab">
        <TabsList className="grid w-[400px] grid-cols-2">
          <TabsTrigger value="open-tab">Open</TabsTrigger>
          <TabsTrigger value="resolved-tab">Resolved</TabsTrigger>
        </TabsList>
        <TabsContent value="open-tab">
          <TableLog invoices={data_invoices}/>
        </TabsContent>
        <TabsContent value="resolved-tab">
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabsTable;
