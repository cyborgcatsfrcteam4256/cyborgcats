import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface UserRole {
  role: string;
  approved: boolean;
  requested_at: string;
  approved_at: string | null;
}

export default function Debug() {
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDebugInfo = async () => {
    setLoading(true);
    
    // Get current session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      setUserId(session.user.id);
      setUserEmail(session.user.email || null);
      
      // Get user roles
      const { data: rolesData } = await supabase
        .from('user_roles')
        .select('role, approved, requested_at, approved_at')
        .eq('user_id', session.user.id);
      
      setRoles(rolesData || []);
    } else {
      setUserId(null);
      setUserEmail(null);
      setRoles([]);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    loadDebugInfo();
  }, []);

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pt-20">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-orbitron font-black mb-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Debug Information
                </h1>
                <p className="text-muted-foreground">
                  Current authentication status and roles
                </p>
              </div>
              <Button onClick={loadDebugInfo} disabled={loading} size="sm">
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Session</CardTitle>
                  <CardDescription>Current authenticated user information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">User ID</div>
                    <div className="font-mono text-sm bg-muted p-3 rounded-md break-all">
                      {userId || 'Not logged in'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">Email</div>
                    <div className="font-mono text-sm bg-muted p-3 rounded-md">
                      {userEmail || 'N/A'}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Roles</CardTitle>
                  <CardDescription>Roles assigned to this user</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-sm text-muted-foreground">Loading...</div>
                  ) : roles.length === 0 ? (
                    <div className="text-sm text-muted-foreground">No roles assigned</div>
                  ) : (
                    <div className="space-y-3">
                      {roles.map((role, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-md">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium capitalize">{role.role}</span>
                              <Badge variant={role.approved ? "default" : "secondary"}>
                                {role.approved ? "Approved" : "Pending"}
                              </Badge>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Requested: {new Date(role.requested_at).toLocaleString()}
                            </div>
                            {role.approved_at && (
                              <div className="text-xs text-muted-foreground">
                                Approved: {new Date(role.approved_at).toLocaleString()}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Admin Status Check</CardTitle>
                  <CardDescription>Verification of admin privileges</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-sm text-muted-foreground">Loading...</div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Has Admin Role:</span>
                        <Badge variant={roles.some(r => r.role === 'admin') ? "default" : "secondary"}>
                          {roles.some(r => r.role === 'admin') ? 'Yes' : 'No'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Admin Approved:</span>
                        <Badge variant={roles.some(r => r.role === 'admin' && r.approved) ? "default" : "secondary"}>
                          {roles.some(r => r.role === 'admin' && r.approved) ? 'Yes' : 'No'}
                        </Badge>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
