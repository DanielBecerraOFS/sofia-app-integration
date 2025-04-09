import {
  PieChartPercent,
  MaterialsTable,
  OrdersDetails,
  FiltersAccordion,
} from "@/modules/free-text/index";

import { KPICard } from "@/shared/components/index";

import {
  KPI,
  MaterialsResponse,
  OrdersResponse,
} from "../types/freetext.types";

import {
  getKPIs,
  MaterialsService,
  OrdersService,
} from "../services/apiService";
import { useEffect, useState } from "react";
import { OrdersTableLog } from "..";
import Lottie from "lottie-react";
import CircleLoadingAnimation from "@/assets/animations/loading_animation.json";

export const FreeTextPage: React.FC = () => {
  const [kpiData, setKpiData] = useState<KPI>();
  const [materials, setMaterials] = useState<MaterialsResponse>();
  const [orders, setOrders] = useState<OrdersResponse>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchKPIs = async (): Promise<void> => {
      setLoading(true);
      try {
        const data = await getKPIs();
        setKpiData(data);
      } catch (error) {
        console.error("Error al cargar KPIs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKPIs();
  }, []);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        setLoading(true);
        const data = await MaterialsService.getMaterials();
        setMaterials(data);
      } catch (err) {
        console.error("Error al cargar los materiales: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  // Cargar datos iniciales
  useEffect(() => {
    fetchOrders();
  }, []);

  // Función para obtener materiales
  const fetchOrders = async (filters = {}) => {
    try {
      setLoading(true);
      const response = await OrdersService.getOrders(filters);
      setOrders(response);
    } catch (error) {
      console.error("Error fetching Orders: ", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    <div className="dashboard-layout w-[100svw] h-[100svh] py-1 px-4 md:px-8 md:py-4 flex justify-center items-center">
      <div className="app-wrapper flex flex-col justify-center items-center gap-4 w-full h-full">
        <Lottie
          animationData={CircleLoadingAnimation}
          style={{ width: 150, height: 150 }}
        />
      </div>
    </div>;

  return (
    <div className="px-4 py-6 grid-container h-full flex flex-col md:flex-row justify-center">
      <div className="info-container w-full min-h-[100vh] md:py-4">
        <div className="filters-button-content w-full text-end mb-4">
          <FiltersAccordion />
        </div>
        <div className="grid gap-4 w-full ">
          <div className="grid flex-1 scroll-mt-20 items-start gap-2 grid-cols-2 md:gap-6 lg:grid-cols-4 xl:gap-2">
            {kpiData &&
              Object.entries(kpiData).map(([key, value]) =>
                !key.includes("percentage") && key != "total_orders" ? (
                  <div className="h-auto rounded-md">
                    <KPICard
                      key={key}
                      title={key
                        .replace("total_oc_ft_amount", "total_ft_amount")
                        .replace(/_/g, " ")
                        .replace("ft", "free text")
                        .replace("oc", "Orders")
                        .replace("amount", "Value")
                        .toUpperCase()}
                      data={parseFloat(value.toString())}
                      isCurrency={key.includes("Amount") ? true : false}
                      legend="+20.1% from last month"
                    />
                  </div>
                ) : (
                  <></>
                )
              )}
          </div>
          <div className="container-layout-data flex justify-center flex-row h-auto items-stretch">
            <div className="wrapper-tables-container flex-2 gap-2 space-y-3">
              <div className="grid flex-1 scroll-mt-20 items-start gap-2 md:grid-cols-3">
                <div className="border-primary rounded-md border-1  h-auto lg:max-h-[600px] lg:h-[600px]">
                  {kpiData && (
                    <PieChartPercent
                      total_oc={kpiData.total_items}
                      total_oc_ft={kpiData.total_items_ft}
                    />
                  )}
                </div>
                <div className=" rounded-md border border-primary md:col-span-2 py-6 px-6 h-auto md:max-h-[600px] md:h-[600px] overflow-hidden">
                  <h2 className="text-2xl font-semibold">Table Log Overview</h2>
                  {orders && <OrdersTableLog orders={orders.results} />}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-2">
                <div className=" rounded-md border border-primary  py-6 px-6 h-auto md:max-h-[420px] md:h-[420px] overflow-hidden">
                  <h2 className="text-2xl font-semibold">
                    Non-use of materials catalogue
                  </h2>
                  {materials && (
                    <MaterialsTable
                      materials_data={materials.results}
                      type="freeText"
                    />
                  )}
                </div>
                <div className=" rounded-md border border-primary py-6 px-6 h-auto md:max-h-[420px] md:h-[420px] overflow-hidden">
                  <h2 className="text-2xl font-semibold">
                  Sofia suggests adding these materials to the catalog
                  </h2>
                  {materials && (
                    <MaterialsTable
                      materials_data={materials.results}
                      type="noFreeText"
                    />
                  )}
                </div>
              </div>
              <div className="rounded-md border border-primary py-6 px-6 h-auto md:max-h-[420px] md:h-[420px]">
                <h2 className="text-2xl font-semibold">PO Details</h2>
                {orders && <OrdersDetails orders={orders.results} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
