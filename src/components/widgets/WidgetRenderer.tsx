import React from 'react';
import { Dashboard } from './Dashboard';
import { Analytics } from './Analytics';
import { HeatMap } from './HeatMap';
import { TrafficNews } from './TrafficNews';
import { BusinessPlan } from './BusinessPlan';
import { Account } from './Account';
import { useAppStore } from '@/store/useAppStore';

export function WidgetRenderer() {
  const { activeWidget } = useAppStore();

  const renderWidget = () => {
    switch (activeWidget) {
      case 'dashboard':
        return <Dashboard />;
      case 'analytics':
        return <Analytics />;
      case 'heatmap':
        return <HeatMap />;
      case 'traffic-news':
        return <TrafficNews />;
      case 'business-plan':
        return <BusinessPlan />;
      case 'account':
        return <Account />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="transition-all duration-300 ease-in-out">
      {renderWidget()}
    </div>
  );
}