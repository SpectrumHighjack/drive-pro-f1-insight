import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { User, Settings, Bell, Shield, DollarSign, FileText, MessageCircle, Upload, Image as ImageIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useAppStore } from '@/store/useAppStore';
import { F1_TEAMS } from '@/data/teams';
import { formatCurrency } from '@/lib/currency';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

// Validation schema for profile fields
const profileSchema = z.object({
  name: z.string()
    .trim()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string()
    .trim()
    .email('Invalid email format')
    .max(255, 'Email must be less than 255 characters'),
  phone: z.string()
    .trim()
    .regex(/^\+?[0-9\s\-()]{9,20}$/, 'Invalid phone number format'),
  license: z.string()
    .trim()
    .min(5, 'License must be at least 5 characters')
    .max(50, 'License must be less than 50 characters'),
});

export function Account() {
  const { selectedTeam, currency, avatarUrl, setAvatarUrl } = useAppStore();
  const currentTeam = F1_TEAMS.find(team => team.id === selectedTeam);
  const { toast } = useToast();
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
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
    // Validate profile data before saving
    const result = profileSchema.safeParse(profile);
    
    if (!result.success) {
      const firstError = result.error.errors[0];
      toast({
        title: 'Validation error',
        description: firstError.message,
        variant: 'destructive',
      });
      return;
    }

    setIsEditing(false);
    toast({
      title: t('account.saved'),
      description: t('account.saved'),
    });
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload an image file',
        variant: 'destructive',
      });
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please upload an image smaller than 2MB',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);

    try {
      // Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError, data } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Update avatar URL in store
      setAvatarUrl(publicUrl);

      toast({
        title: 'Avatar uploaded',
        description: 'Your profile picture has been updated',
      });
    } catch (error) {
      // Log sanitized error without exposing sensitive details
      console.error('Avatar upload failed');
      toast({
        title: 'Upload failed',
        description: 'Failed to upload avatar. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
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
            <Avatar className="h-24 w-24 border-4 border-primary shadow-glow">
              {avatarUrl ? (
                <AvatarImage src={avatarUrl} alt={profile.name} />
              ) : (
                <AvatarFallback className="bg-gradient-racing">
                  <User className="h-12 w-12 text-primary-foreground" />
                </AvatarFallback>
              )}
            </Avatar>
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
            {/* Avatar Upload Section */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Profile Picture
              </Label>
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20 border-2 border-primary">
                  {avatarUrl ? (
                    <AvatarImage src={avatarUrl} alt={profile.name} />
                  ) : (
                    <AvatarFallback className="bg-gradient-racing">
                      <User className="h-10 w-10 text-primary-foreground" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="flex flex-col gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {isUploading ? 'Uploading...' : 'Upload Avatar'}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Upload a helmet image or custom avatar (max 2MB)
                  </p>
                </div>
              </div>
            </div>

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