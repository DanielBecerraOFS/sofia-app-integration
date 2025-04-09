// src/routes/AppRoutes.tsx
import { Navigate, Routes, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/modules/auth/store/authSlice";

// Importación de componentes de página
import Home from "@/modules/home/pages/Home";
import { CompactProcessMining } from "@/modules/process-mining/CompactProcessMining";
import NotFound from "@/shared/components/common/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import AuthForm from "@/modules/auth/pages/AuthForm";
import { LandingPage } from "@/modules/landing";
import HomeLayout from "@/modules/home/layout/HomeLayout";
import { FreeTextPage } from "@/modules/free-text/pages/FreeTextPage";
import DuplicatedInvoiceCheckerPage from "@/modules/duplicate-invoice/pages/DuplicateInvoiceCheckerPage";
import ParticlesLayout from '@/shared/components/common/ParticlesLayout';
import PageRecomendation from "@/modules/recomendations/PageRecomendation";

const AppRoutes = () => {
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Obtener la ruta a la que el usuario intentaba acceder (si existe)
  const from = location.state?.from?.pathname || '/app/overview';

  return (
    <Routes>
      {/* Rutas públicas */}x
      <Route element={<ParticlesLayout />}>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/auth"
        element={isAuthenticated ? <Navigate to={from} replace /> : <AuthForm />}
      />
    </Route>
      <Route path="/app" element={<HomeLayout />}>
        <Route path="overview" index element={<Home />} />
        <Route path="free-text" element={<FreeTextPage />} />
        <Route path="process-mining" element={<CompactProcessMining />} />
        <Route path="duplicate-invoice" element={<DuplicatedInvoiceCheckerPage />} />.
        <Route path="recomendations" element={<PageRecomendation />} />
        <Route
          path="process-mining-component"
          element={<CompactProcessMining />}
        />
        
        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          {/*<Route element={<Layout />}>*/}
          <Route path="process-mining" element={<CompactProcessMining />} />

          {/* Aquí puedes añadir más rutas protegidas según necesites */}
          {/*</Route>*/}
        </Route>
      </Route>

      {/* Ruta 404 - Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
