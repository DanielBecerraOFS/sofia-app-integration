import {
  ScrollArea,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
  TableFooter,
} from "@/shared/components/index";
import { Material } from "../types/freetext.types";
import { formatValues } from "@/shared/utils/formatters";

interface MaterialsTableProps {
  materials_data: Material[];
  type: string;
}
const MaterialsTable: React.FC<MaterialsTableProps> = ({
  materials_data,
  type,
}) => {
  const no_use_material = materials_data.filter(
    (item) => item.suggestion != null
  );

  console.log(materials_data);
  

  let no_use_material_total_quantity = 0;
  let no_use_material_total_price = 0;
  for (let i = 0; i < no_use_material.length; i++) {
    if (no_use_material[i].order) {
      no_use_material_total_quantity +=
        no_use_material[i].order.number_of_items || 0;
      no_use_material_total_price += Number(no_use_material[i].order.total_price) || 0;
    }
  }

  const use_material = materials_data.filter(
    (item) => item.suggestion == null
  );

  let use_material_total_quantity = 0;
  let use_material_total_price = 0;
  for (let i = 0; i < use_material.length; i++) {
    // Verificar si el objeto tiene la propiedad order
    if (use_material[i].order) {
      use_material_total_quantity += use_material[i].order.number_of_items || 0;
      use_material_total_price += Number(use_material[i].order.total_price) || 0;
    }
  }
  return (
    <div className="materials-table py-4">
      {type === "freeText" ? (
        <div className="scroll-table-container">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px] p-0">Order Id</TableHead>
                <TableHead className="w-[200px] p-0">Material Code</TableHead>
                <TableHead className="w-[300px] p-0">Material Name</TableHead>
                <TableHead className="w-[100px] p-0">Quantity</TableHead>
                <TableHead className="w-[100px] p-0">Amount</TableHead>
              </TableRow>
            </TableHeader>
          </Table>
          <ScrollArea className="h-65 w-full">
            <Table>
              <TableBody>
                {no_use_material.map((material) => (
                  <TableRow>
                    <TableCell>{material.order.order_id}</TableCell>
                    <TableCell>{material.material_code}</TableCell>
                    <TableCell>{material.material_name}</TableCell>
                    <TableCell className="font-semibold">
                      {material.order.number_of_items}
                    </TableCell>
                    <TableCell className="text-right">
                      $ {formatValues(Number(material.order.total_price))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
          <Table>
            <TableFooter>
              <TableRow>
                <TableCell className="w-[330px]">Total</TableCell>
                <TableCell className="text-right">
                  {formatValues(no_use_material_total_quantity)}
                </TableCell>
                <TableCell className="text-right">
                  $ {formatValues(no_use_material_total_price)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      ) : (
        <div className="scroll-table-container">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px] p-0">Order Id</TableHead>
                <TableHead className="w-[200px] p-0 text-left">
                  Material Query
                </TableHead>
                <TableHead className="w-[100px] p-0">Quantity</TableHead>
                <TableHead className="w-[100px] p-0">Amount</TableHead>
              </TableRow>
            </TableHeader>
          </Table>
          <ScrollArea className="h-65  w-full">
            <Table>
              <TableBody>
                {use_material.map(
                  (material) =>
                    material.order && (
                      <TableRow>
                        <TableCell>{material.order.order_id}</TableCell>
                        <TableCell>{material.material_name}</TableCell>
                        <TableCell className="font-semibold">
                          {material.order.number_of_items}
                        </TableCell>
                        <TableCell className="text-right">
                          $ {formatValues(Number(material.order.total_price))}
                        </TableCell>
                      </TableRow>
                    )
                )}
              </TableBody>
            </Table>
          </ScrollArea>
          <Table>
            <TableFooter>
              <TableRow>
                <TableCell className="w-[280px]">Total</TableCell>
                <TableCell className="text-right">
                  {formatValues(use_material_total_quantity)}
                </TableCell>
                <TableCell className="text-right">
                  $ {formatValues(use_material_total_price)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      )}
    </div>
  );
};
export default MaterialsTable;
