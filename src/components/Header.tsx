import React from 'react';
import { ChevronDown, Users, Globe, DollarSign } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppStore, Language, Currency } from '@/store/useAppStore';
import { F1_TEAMS, WIDGETS } from '@/data/teams';
import { WidgetType } from '@/types';
import { CURRENCY_SYMBOLS } from '@/lib/currency';

export function Header() {
  const { 
    selectedTeam, 
    activeWidget, 
    language, 
    currency,
    avatarUrl,
    setActiveWidget, 
    setLanguage, 
    setCurrency, 
    toggleProfileSelection 
  } = useAppStore();
  
  const { t, i18n } = useTranslation();
  const currentTeam = F1_TEAMS.find(team => team.id === selectedTeam);

  const handleWidgetChange = (widgetId: WidgetType) => {
    setActiveWidget(widgetId);
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const handleCurrencyChange = (curr: Currency) => {
    setCurrency(curr);
  };

  const languages: { code: Language; label: string }[] = [
    { code: 'pt', label: 'PT' },
    { code: 'en', label: 'EN' },
    { code: 'es', label: 'ES' },
  ];

  const currencies: Currency[] = ['EUR', 'USD', 'GBP'];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-gradient-card backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo & Team */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-racing shadow-glow" />
            <h1 className="font-orbitron text-xl font-bold text-gradient">
              {t('header.title')}
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

        {/* Selectors & Actions */}
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1.5 hover:bg-primary/10">
                <Globe className="h-4 w-4" />
                <span className="font-orbitron text-sm font-medium">{language.toUpperCase()}</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-gradient-card border-border">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className="cursor-pointer font-inter"
                >
                  <span className="font-medium">{lang.label}</span>
                  {lang.code === language && (
                    <div className="ml-auto h-2 w-2 rounded-full bg-primary shadow-glow" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Currency Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1.5 hover:bg-primary/10">
                <DollarSign className="h-4 w-4" />
                <span className="font-orbitron text-sm font-medium">{CURRENCY_SYMBOLS[currency]}</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-gradient-card border-border">
              {currencies.map((curr) => (
                <DropdownMenuItem
                  key={curr}
                  onClick={() => handleCurrencyChange(curr)}
                  className="cursor-pointer font-inter"
                >
                  <span className="font-medium">{CURRENCY_SYMBOLS[curr]} {curr}</span>
                  {curr === currency && (
                    <div className="ml-auto h-2 w-2 rounded-full bg-primary shadow-glow" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Widget Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="widget" className="gap-2">
                <span className="font-orbitron font-medium">
                  {t(`header.${activeWidget}`)}
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
                  <span className="font-medium">{t(`header.${widget.id}`)}</span>
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
            className="hover:bg-primary/10 transition-racing p-1"
            aria-label={t('header.profileButton')}
          >
            <Avatar className="h-8 w-8">
              {avatarUrl ? (
                <AvatarImage src={avatarUrl} alt="Profile" />
              ) : (
                <AvatarFallback className="bg-gradient-racing">
                  <Users className="h-4 w-4 text-primary-foreground" />
                </AvatarFallback>
              )}
            </Avatar>
          </Button>
        </div>
      </div>
    </header>
  );
}