import { useState, useEffect } from "react";
import { api } from "../lib/api";
import TopNav from "../components/TopNav";
import Sidebar from "../components/Sidebar";
import CommandCenter from "../components/views/CommandCenter";
import Entities from "../components/views/Entities";
import Financials from "../components/views/Financials";
import Operations from "../components/views/Operations";
import Reports from "../components/views/Reports";
import EntityDetail from "../components/views/EntityDetail";
import { Entity } from "../types";

const Dashboard = () => {
  const [currentView, setCurrentView] = useState("command-center");
  const [entities, setEntities] = useState<Entity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const entitiesData = await api.getEntities();
        setEntities(entitiesData);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-bg-primary text-text-primary flex items-center justify-center">
        Loading...
      </div>
    );

  const renderView = () => {
    switch (currentView) {
      case "command-center":
        return <CommandCenter />;
      case "entities":
        return <Entities />;
      case "financials":
        return <Financials />;
      case "operations":
        return <Operations />;
      case "reports":
        return <Reports />;
      default:
        if (currentView.startsWith("entity-")) {
          const entityId = currentView.replace("entity-", "");
          return <EntityDetail entityId={entityId} />;
        }
        return <CommandCenter />;
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <TopNav onViewChange={setCurrentView} />
      <div className="flex">
        <Sidebar onViewChange={setCurrentView} entities={entities} />
        <main className="flex-1 ml-52 mt-13 p-7 overflow-y-auto">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
