import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { DeskProvider } from "./lib/store";
import { Alerts } from "./pages/Alerts";
import { Calendar } from "./pages/Calendar";
import { GrantDesk } from "./pages/GrantDesk";
import { Grants } from "./pages/Grants";
import { Ingest } from "./pages/Ingest";
import { Landing } from "./pages/Landing";
import { Settings } from "./pages/Settings";

export default function App() {
  return (
    <DeskProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/app" element={<AppShell />}>
            <Route index element={<Grants />} />
            <Route path="new" element={<Ingest />} />
            <Route path="grants/:id" element={<GrantDesk />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </DeskProvider>
  );
}
