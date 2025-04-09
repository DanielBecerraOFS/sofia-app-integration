"use client";
import { Button } from "@/shared/components/ui/button";
import { X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";
import {
  CardInvoiceDetails,
  TableDrawerDetails,
} from "@/modules//duplicate-invoice/index";
import {
  Invoice,
} from "@/modules/duplicate-invoice/services/apiService";

interface InvoiceDrawerProps {
  buttonTitle: string;
  group: Invoice[] | any;
  type: string;
}

const InvoiceDrawerDetails: React.FC<InvoiceDrawerProps> = ({
  buttonTitle,
  group,
  type = "link",
}) => {
  const renderCardDetails = () => {
    console.log(group);
    
    if (!group || group.length === 0) {
      return (
        <div className="text-gray-500 text-center py-4">
          No invoice details available
        </div>
      );
    }

    return (
      <div className="invoice-details-container flex flex-row justify-start gap-2">
        <CardInvoiceDetails
          title="Confidence"
          value={group[0].confidence as string}
          status={(group[0].confidence === "High" ? "danger" : "default") as "danger" | "default"}
          icon="high"
        />
        <CardInvoiceDetails
          title="Accurancy"
          value={group[0].accuracy.toString() as string}
          isCurrency={false}
        />
        <CardInvoiceDetails
          title="Amount at Risk"
          value={group
        .slice(1)
        .reduce((total: number, invoice: Invoice) => total + (Number(invoice.value) || 0), 0)
        .toString() as string}
          isCurrency={true}
        />
        <CardInvoiceDetails title="Group Pattern" value={group[0].pattern as string} />
        <CardInvoiceDetails
          title="Status"
          value={(group[0].open === true ? "Open" : "Close") as "Open" | "Close"}
        />
      </div>
    );
  };
  const renderTableContent = () => {
    return group ? <TableDrawerDetails invoices_group={group} /> : null;
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        {type == "link" ? (
          <Button
            variant="ghost"
            className="text-blue-400 cursor-pointer p-0 hover:underline decoration-solid"
            /* onClick={fetchInvoices} */
          >
            {buttonTitle}
          </Button>
        ) : (
          <Button
            variant="default"
            className="mt-4 cursor-pointer"
            /* onClick={fetchInvoices} */
          >
            {buttonTitle}
          </Button>
        )}
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-full w-full">
          <DrawerHeader>
            <div className="w-full flex flex-row justify-between items-center">
              <DrawerTitle className="text-3xl">
                Pattern Group Details
              </DrawerTitle>
              <DrawerClose asChild>
                <X className="cursor-pointer" />
              </DrawerClose>
            </div>
            <DrawerDescription>
              <div className="wrapper-description flex flex-col gap-4">
                {renderCardDetails()}
              </div>
            </DrawerDescription>
          </DrawerHeader>
          <div className="card-body px-4 py-6">
            <div className="flex flex-col items-start justify-center space-x-2">
              <div className="buttons-cta-grid-container mb-6">
                <h2 className="title-container font-medium mb-3">
                  Validation Case
                </h2>
                <div className="flex flex-row items-center gap-2">
                  <Button
                    className="cursor-pointer border-1 bg-error text-on-error hover:bg-error-container hover:text-on-error-container"
                    variant="destructive"
                  >
                    Duplicate
                  </Button>
                  <Button className="cursor-pointer" variant="outline">
                    No Duplicate
                  </Button>
                  <Button className="cursor-pointer" variant="outline">
                    Share Group
                  </Button>
                  <Button className="cursor-pointer" variant="outline">
                    No Action Required
                  </Button>
                </div>
              </div>
              {renderTableContent()}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default InvoiceDrawerDetails;
