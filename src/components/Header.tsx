import React from 'react';
import { ChevronDown, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppStore } from '@/store/useAppStore';
import { F1_TEAMS, WIDGETS } from '@/data/teams';
import { WidgetType } from '@/types';

export function Header() {
  const { selectedTeam, activeWidget, setActiveWidget, toggleProfileSelection } = useAppStore();
  
  const currentTeam = F1_TEAMS.find(team => team.id === selectedTeam);
  const currentWidget = WIDGETS.find(widget => widget.id === activeWidget);

  const handleWidgetChange = (widgetId: WidgetType) => {
    setActiveWidget(widgetId);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-gradient-card backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo & Team */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-racing shadow-glow" />
            <h1 className="font-orbitron text-xl font-bold text-gradient">
              DriverPro Analytics
            </h1>
          </div>
          
          {currentTeam && (
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
              <span>•</span>
              <span className="font-orbitron font-medium text-foreground">
                {currentTeam.displayName}
              </span>
            </div>
          )}
        </div>

        {/* Widget Selector */}
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="widget" className="gap-2">
                <span className="font-orbitron font-medium">
                  {currentWidget?.name || 'Dashboard'}
                </span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-56 bg-gradient-card border-border shadow-card"
            >
              {WIDGETS.map((widget) => (
                <DropdownMenuItem
                  key={widget.id}
                  onClick={() => handleWidgetChange(widget.id as WidgetType)}
                  className="cursor-pointer font-inter transition-racing hover:bg-muted/50"
                >
                  <span className="font-medium">{widget.name}</span>
                  {widget.id === activeWidget && (
                    <div className="ml-auto h-2 w-2 rounded-full bg-primary shadow-glow" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleProfileSelection}
            className="hover:bg-primary/10 transition-racing"
          >
            <Users className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}