import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Dashboard from "./Pages/Dashboard";
import AppLayout from "./Layout/AppLayout";
import Quotation from "./Pages/Quotation";
import ProgressUpdate from "./Pages/ProgressUpdate";
import Invoice from "./Pages/Invoice";
import PaymentStatus from "./Pages/PaymentStatus";
import Summary from "./Pages/Summary";
import UpdateSoon from "./Pages/UpdateSoon";
import { HeaderDataProvider } from "./Context/HeaderContext.jsx";

function App() {
  return (
    <div className="App">
      <HeaderDataProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route
            path="/dashboard"
            element={
              <AppLayout>
                <Dashboard></Dashboard>
              </AppLayout>
            }
          />
          <Route
            path="/quotation"
            element={
              <AppLayout>
                <Quotation></Quotation>
              </AppLayout>
            }
          />
          <Route
            path="/progress"
            element={
              <AppLayout>
                <ProgressUpdate></ProgressUpdate>
              </AppLayout>
            }
          />
          <Route
            path="/invoice"
            element={
              <AppLayout>
                <Invoice></Invoice>
              </AppLayout>
            }
          />
          <Route
            path="/payment"
            element={
              <AppLayout>
                <PaymentStatus></PaymentStatus>
              </AppLayout>
            }
          />
          <Route
            path="/summary"
            element={
              <AppLayout>
                <Summary></Summary>
              </AppLayout>
            }
          />
          <Route
            path="/expense"
            element={
              <AppLayout>
                <UpdateSoon></UpdateSoon>
              </AppLayout>
            }
          />
          <Route
            path="/stock"
            element={
              <AppLayout>
                <UpdateSoon></UpdateSoon>
              </AppLayout>
            }
          />
          <Route
            path="/client/details"
            element={
              <AppLayout>
                <UpdateSoon></UpdateSoon>
              </AppLayout>
            }
          />
          <Route
            path="/client/credentials"
            element={
              <AppLayout>
                <UpdateSoon></UpdateSoon>
              </AppLayout>
            }
          />
          <Route
            path="/project/ongoing"
            element={
              <AppLayout>
                <UpdateSoon></UpdateSoon>
              </AppLayout>
            }
          />
          <Route
            path="/project/media"
            element={
              <AppLayout>
                <UpdateSoon></UpdateSoon>
              </AppLayout>
            }
          />
          <Route
            path="/project/certificate"
            element={
              <AppLayout>
                <UpdateSoon></UpdateSoon>
              </AppLayout>
            }
          />
          <Route
            path="/meeting/details"
            element={
              <AppLayout>
                <UpdateSoon></UpdateSoon>
              </AppLayout>
            }
          />
          <Route
            path="/asset/details"
            element={
              <AppLayout>
                <UpdateSoon></UpdateSoon>
              </AppLayout>
            }
          />
          <Route
            path="/asset/cctv"
            element={
              <AppLayout>
                <UpdateSoon></UpdateSoon>
              </AppLayout>
            }
          />
          <Route
            path="/asset/details"
            element={
              <AppLayout>
                <UpdateSoon></UpdateSoon>
              </AppLayout>
            }
          />
          <Route
            path="/asset/cctv"
            element={
              <AppLayout>
                <UpdateSoon></UpdateSoon>
              </AppLayout>
            }
          />
        </Routes>
      </HeaderDataProvider>
    </div>
  );
}

export default App;
