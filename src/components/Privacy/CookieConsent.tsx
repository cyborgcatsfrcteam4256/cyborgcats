import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Cookie, Settings, Check, X } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  personalization: boolean;
}

export const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    personalization: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('cyborg-cats-cookie-consent');
    if (!consent) {
      setShowConsent(true);
    } else {
      setPreferences(JSON.parse(consent));
    }
  }, []);

  const acceptAll = () => {
    const allPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      personalization: true
    };
    setPreferences(allPreferences);
    localStorage.setItem('cyborg-cats-cookie-consent', JSON.stringify(allPreferences));
    setShowConsent(false);
  };

  const acceptSelected = () => {
    localStorage.setItem('cyborg-cats-cookie-consent', JSON.stringify(preferences));
    setShowConsent(false);
  };

  const rejectAll = () => {
    const minimalPreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      personalization: false
    };
    setPreferences(minimalPreferences);
    localStorage.setItem('cyborg-cats-cookie-consent', JSON.stringify(minimalPreferences));
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
      
      {/* Cookie Consent Banner */}
      <div className="fixed bottom-6 left-6 right-6 md:left-8 md:right-8 z-50 max-w-4xl mx-auto">
        <Card className="glass-morphism border-primary/30 shadow-luxury">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 p-3 bg-primary/20 rounded-lg">
                <Cookie className="w-6 h-6 text-primary" />
              </div>
              
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-orbitron font-bold text-foreground">
                      Cookie Preferences
                    </h3>
                    <Badge variant="secondary" className="text-xs">
                      <Shield className="w-3 h-3 mr-1" />
                      GDPR Compliant
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                    By clicking "Accept All", you consent to our use of cookies.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={acceptAll}
                    className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Accept All Cookies
                  </Button>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="border-primary/30 hover:border-primary/50">
                        <Settings className="w-4 h-4 mr-2" />
                        Customize Settings
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Cookie className="w-5 h-5 text-primary" />
                          Cookie Preferences
                        </DialogTitle>
                        <DialogDescription>
                          Choose which cookies you want to allow. You can change these settings at any time.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-6">
                        {/* Necessary Cookies */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold">Necessary Cookies</h4>
                              <p className="text-sm text-muted-foreground">
                                Required for basic website functionality
                              </p>
                            </div>
                            <Switch 
                              checked={preferences.necessary} 
                              disabled 
                              className="data-[state=checked]:bg-primary"
                            />
                          </div>
                          <Badge variant="secondary" className="text-xs">Always Active</Badge>
                        </div>

                        <Separator />

                        {/* Analytics Cookies */}
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">Analytics Cookies</h4>
                            <p className="text-sm text-muted-foreground">
                              Help us understand how visitors interact with our website
                            </p>
                          </div>
                          <Switch 
                            checked={preferences.analytics}
                            onCheckedChange={(checked) => 
                              setPreferences(prev => ({ ...prev, analytics: checked }))
                            }
                            className="data-[state=checked]:bg-primary"
                          />
                        </div>

                        <Separator />

                        {/* Marketing Cookies */}
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">Marketing Cookies</h4>
                            <p className="text-sm text-muted-foreground">
                              Used to track visitors across websites for marketing purposes
                            </p>
                          </div>
                          <Switch 
                            checked={preferences.marketing}
                            onCheckedChange={(checked) => 
                              setPreferences(prev => ({ ...prev, marketing: checked }))
                            }
                            className="data-[state=checked]:bg-primary"
                          />
                        </div>

                        <Separator />

                        {/* Personalization Cookies */}
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">Personalization Cookies</h4>
                            <p className="text-sm text-muted-foreground">
                              Remember your preferences and personalize your experience
                            </p>
                          </div>
                          <Switch 
                            checked={preferences.personalization}
                            onCheckedChange={(checked) => 
                              setPreferences(prev => ({ ...prev, personalization: checked }))
                            }
                            className="data-[state=checked]:bg-primary"
                          />
                        </div>

                        <div className="flex gap-3 pt-4">
                          <Button onClick={acceptSelected} className="flex-1">
                            <Check className="w-4 h-4 mr-2" />
                            Accept Selected
                          </Button>
                          <Button variant="outline" onClick={acceptAll} className="flex-1">
                            Accept All
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button 
                    variant="ghost" 
                    onClick={rejectAll}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Reject All
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};