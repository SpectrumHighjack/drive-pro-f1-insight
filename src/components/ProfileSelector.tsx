import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useAppStore } from '@/store/useAppStore';
import { F1_TEAMS } from '@/data/teams';
import { F1Team } from '@/types';

export function ProfileSelector() {
  const { isProfileSelectionOpen, selectedTeam, avatarUrl, setSelectedTeam, toggleProfileSelection } = useAppStore();

  if (!isProfileSelectionOpen) return null;

  const handleTeamSelect = (teamId: F1Team) => {
    setSelectedTeam(teamId);
    toggleProfileSelection();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm">
      <Card className="w-full max-w-4xl mx-4 bg-gradient-card border-border shadow-card">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-orbitron font-bold text-gradient">
              Escolha seu Perfil F1
            </h2>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleProfileSelection}
              className="hover:bg-destructive/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {F1_TEAMS.map((team) => {
              const isSelected = team.id === selectedTeam;
              
              return (
                <Card
                  key={team.id}
                  className={`
                    cursor-pointer transition-racing p-6 text-center
                    hover:shadow-racing border-2
                    ${isSelected 
                      ? 'border-primary shadow-glow bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                    }
                  `}
                  onClick={() => handleTeamSelect(team.id)}
                >
                  {/* Avatar / Helmet Icon */}
                  <Avatar 
                    className={`
                      w-20 h-20 mx-auto mb-4 shadow-racing border-2
                      transition-racing
                      ${isSelected ? 'shadow-glow scale-110 border-primary' : 'border-transparent'}
                    `}
                  >
                    {avatarUrl && isSelected ? (
                      <AvatarImage src={avatarUrl} alt={team.displayName} />
                    ) : (
                      <AvatarFallback 
                        className="text-2xl font-bold"
                        style={{
                          background: `linear-gradient(135deg, hsl(${team.colors.primary}), hsl(${team.colors.accent}))`
                        }}
                      >
                        🏎️
                      </AvatarFallback>
                    )}
                  </Avatar>
                  
                  <h3 className="font-orbitron font-bold text-lg mb-2">
                    {team.displayName}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {team.name}
                  </p>
                  
                  <div className="flex items-center justify-center gap-2 text-xs">
                    <div 
                      className="w-3 h-3 rounded-full shadow-sm"
                      style={{ backgroundColor: `hsl(${team.colors.primary})` }}
                    />
                    <div 
                      className="w-3 h-3 rounded-full shadow-sm"
                      style={{ backgroundColor: `hsl(${team.colors.accent})` }}
                    />
                  </div>
                  
                  {isSelected && (
                    <div className="mt-3">
                      <div className="h-1 w-full bg-gradient-racing rounded-full shadow-glow" />
                    </div>
                  )}
                </Card>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Selecione uma equipe para personalizar completamente a interface
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}