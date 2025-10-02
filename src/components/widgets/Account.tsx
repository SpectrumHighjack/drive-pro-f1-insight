import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { User, Settings, Bell, Shield, DollarSign, FileText, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useAppStore } from '@/store/useAppStore';
import { F1_TEAMS } from '@/data/teams';
import { formatCurrency } from '@/lib/currency';

export function Account() {
  const { selectedTeam, currency } = useAppStore();
  const currentTeam = F1_TEAMS.find(team => team.id === selectedTeam);
  const { toast } = useToast();
  const { t } = useTranslation();
  
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: currentTeam?.displayName || 'Driver',
    email: 'driver@driverpro.com',
    phone: '+351 912 345 678',
    license: 'PT-2024-ABC123',
  });

  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoAccept: false,
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: t('account.saved'),
      description: t('account.saved'),
    });
  };

  const stats = [
    { label: t('account.totalTrips'), value: '1,247', icon: DollarSign },
    { label: t('account.totalEarnings'), value: formatCurrency(45620, currency), icon: DollarSign },
    { label: t('account.avgRating'), value: '4.8 ⭐', icon: User },
  ];

  const quickActions = [
    { label: t('account.viewEarnings'), icon: DollarSign },
    { label: t('account.downloadReports'), icon: FileText },
    { label: t('account.contactSupport'), icon: MessageCircle },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center py-4">
        <h2 className="text-2xl font-orbitron font-bold text-gradient mb-2">
          {t('account.title')}
        </h2>
        <p className="text-muted-foreground">{t('account.profile')}</p>
      </div>

      {/* Profile Card */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardContent className="pt-6">
          <div className="flex items-center gap-6">
            <div className="h-24 w-24 rounded-full bg-gradient-racing flex items-center justify-center shadow-glow">
              <User className="h-12 w-12 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-orbitron font-bold mb-1">{profile.name}</h3>
              <p className="text-muted-foreground mb-2">{currentTeam?.name}</p>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? t('account.cancel') : t('account.edit')}
                </Button>
                {isEditing && (
                  <Button size="sm" onClick={handleSave}>
                    {t('account.save')}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Form */}
      {isEditing && (
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="font-orbitron">{t('account.edit')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t('account.name')}</Label>
                <Input 
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>{t('account.email')}</Label>
                <Input 
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>{t('account.phone')}</Label>
                <Input 
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>{t('account.license')}</Label>
                <Input 
                  value={profile.license}
                  onChange={(e) => setProfile({ ...profile, license: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-gradient-card border-border shadow-card">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-orbitron font-bold">{stat.value}</p>
                  </div>
                  <Icon className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Settings */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-orbitron">
            <Settings className="h-5 w-5" />
            {t('account.settings')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{t('account.notifications')}</p>
              <p className="text-sm text-muted-foreground">{t('account.notificationsDesc')}</p>
            </div>
            <Switch 
              checked={settings.notifications}
              onCheckedChange={(checked) => setSettings({ ...settings, notifications: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{t('account.darkMode')}</p>
              <p className="text-sm text-muted-foreground">{t('account.darkModeDesc')}</p>
            </div>
            <Switch 
              checked={settings.darkMode}
              onCheckedChange={(checked) => setSettings({ ...settings, darkMode: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{t('account.autoAccept')}</p>
              <p className="text-sm text-muted-foreground">{t('account.autoAcceptDesc')}</p>
            </div>
            <Switch 
              checked={settings.autoAccept}
              onCheckedChange={(checked) => setSettings({ ...settings, autoAccept: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-orbitron">
            <Shield className="h-5 w-5" />
            {t('account.security')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            {t('account.changePassword')}
          </Button>
          <Button variant="outline" className="w-full justify-start">
            {t('account.twoFactor')}
          </Button>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Card 
              key={index}
              className="bg-gradient-card border-border shadow-card hover:shadow-racing transition-racing cursor-pointer group"
            >
              <CardContent className="p-4 text-center">
                <div className="h-12 w-12 bg-gradient-racing rounded-lg mx-auto mb-2 flex items-center justify-center group-hover:shadow-glow transition-racing">
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <p className="font-medium text-sm">{action.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
