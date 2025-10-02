import React, { useState } from 'react';
import { User, Settings, Bell, Shield, CreditCard, LogOut, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAppStore } from '@/store/useAppStore';
import { F1_TEAMS } from '@/data/teams';

export function Account() {
  const { selectedTeam } = useAppStore();
  const currentTeam = F1_TEAMS.find(team => team.id === selectedTeam);
  const { toast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: currentTeam?.displayName || 'Piloto',
    email: 'piloto@driverpro.com',
    phone: '+351 912 345 678',
    license: 'PT-2024-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Perfil atualizado",
      description: "As suas informações foram guardadas com sucesso.",
    });
  };

  const accountSections = [
    {
      title: 'Configurações',
      icon: Settings,
      items: [
        { label: 'Idioma', value: 'Português (PT)' },
        { label: 'Fuso Horário', value: 'GMT+0 (Lisboa)' },
        { label: 'Moeda', value: 'Euro (EUR)' },
        { label: 'Tema', value: currentTeam?.displayName || 'Padrão' },
      ]
    },
    {
      title: 'Notificações',
      icon: Bell,
      items: [
        { label: 'Push Notifications', value: 'Ativado' },
        { label: 'Email Marketing', value: 'Desativado' },
        { label: 'Alertas de Tráfego', value: 'Ativado' },
        { label: 'Relatórios Semanais', value: 'Ativado' },
      ]
    },
    {
      title: 'Segurança',
      icon: Shield,
      items: [
        { label: 'Autenticação 2FA', value: 'Ativada' },
        { label: 'Login Biométrico', value: 'Configurado' },
        { label: 'Última Atividade', value: 'Hoje, 14:30' },
        { label: 'Sessões Ativas', value: '2 dispositivos' },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center py-4">
        <h2 className="text-2xl font-orbitron font-bold text-gradient mb-2">
          Minha Conta
        </h2>
        <p className="text-muted-foreground">
          Configurações e informações do perfil
        </p>
      </div>

      {/* Profile Header */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardContent className="pt-6">
          <div className="flex items-center gap-6">
            <div className="h-24 w-24 rounded-full bg-gradient-racing flex items-center justify-center shadow-glow">
              <User className="h-12 w-12 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-orbitron font-bold mb-1">
                {profile.name}
              </h3>
              <p className="text-muted-foreground mb-2">Piloto • {currentTeam?.name}</p>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {isEditing ? 'Cancelar' : 'Editar Perfil'}
                </Button>
                {isEditing && (
                  <Button size="sm" onClick={handleSave}>
                    <Shield className="h-4 w-4 mr-2" />
                    Guardar
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Editable Profile Fields */}
      {isEditing && (
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="font-orbitron">Editar Informações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input 
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input 
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="license">Licença</Label>
                <Input 
                  id="license"
                  value={profile.license}
                  disabled
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Account Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {accountSections.map((section, index) => {
          const Icon = section.icon;
          
          return (
            <Card key={index} className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-orbitron">
                  <Icon className="h-5 w-5 text-primary" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex justify-between items-center p-2 hover:bg-muted/20 rounded transition-racing">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-medium text-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Pagamentos', icon: CreditCard, variant: 'outline' as const },
          { label: 'Suporte', icon: User, variant: 'outline' as const },
          { label: 'Backup', icon: Shield, variant: 'outline' as const },
          { label: 'Sair', icon: LogOut, variant: 'destructive' as const },
        ].map((action, index) => {
          const ActionIcon = action.icon;
          
          return (
            <Button
              key={index}
              variant={action.variant}
              className="h-16 flex-col gap-2"
            >
              <ActionIcon className="h-5 w-5" />
              <span className="text-xs">{action.label}</span>
            </Button>
          );
        })}
      </div>

      {/* Statistics */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="font-orbitron">Estatísticas da Conta</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Dias Ativos', value: '127' },
              { label: 'Logins Totais', value: '342' },
              { label: 'Widgets Usados', value: '6/6' },
              { label: 'Equipes Testadas', value: '6' },
            ].map((stat, index) => (
              <div key={index} className="text-center p-3 bg-muted/10 rounded-lg border border-border">
                <div className="text-2xl font-orbitron font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}