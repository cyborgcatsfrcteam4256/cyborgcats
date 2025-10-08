import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageMeta } from '@/components/SEO/PageMeta';
import { RoleApprovals } from '@/components/Admin/RoleApprovals';
import { User } from '@supabase/supabase-js';
import { Users, Upload, FileText, Award } from 'lucide-react';

interface Profile {
  full_name: string;
  graduation_year: number | null;
  bio: string | null;
}

interface UserRole {
  role: string;
  approved: boolean;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth');
        return;
      }

      setUser(session.user);

      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('full_name, graduation_year, bio')
        .eq('id', session.user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
      }

      // Fetch roles
      const { data: rolesData } = await supabase
        .from('user_roles')
        .select('role, approved')
        .eq('user_id', session.user.id);

      if (rolesData) {
        setRoles(rolesData);
      }

      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          navigate('/auth');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const approvedRoles = roles.filter(r => r.approved);
  const pendingRoles = roles.filter(r => !r.approved);
  const isAdmin = approvedRoles.some(r => r.role === 'admin');

  return (
    <>
      <PageMeta
        title="Dashboard - Cyborg Cats Member Portal"
        description="Your personal dashboard for the Cyborg Cats robotics team"
      />

      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Header */}
          <div className="glass-morphism border-2 border-primary/20 rounded-xl p-8">
            <h1 className="text-4xl font-orbitron font-bold bg-gradient-premium bg-clip-text text-transparent mb-2">
              Welcome back, {profile?.full_name || 'Member'}!
            </h1>
            <p className="text-muted-foreground">
              {user?.email}
            </p>
            {pendingRoles.length > 0 && (
              <div className="mt-4 p-4 bg-warning/10 border border-warning/30 rounded-lg">
                <p className="text-sm text-warning-foreground">
                  ⏳ You have {pendingRoles.length} role request(s) pending admin approval: {pendingRoles.map(r => r.role).join(', ')}
                </p>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="glass-morphism border-2 border-primary/20 hover:border-primary/40 transition-all cursor-pointer" onClick={() => navigate('/profile')}>
              <CardHeader>
                <Users className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="font-orbitron">My Profile</CardTitle>
                <CardDescription>Update your information</CardDescription>
              </CardHeader>
            </Card>

            {approvedRoles.length > 0 && (
              <>
                <Card className="glass-morphism border-2 border-primary/20 hover:border-primary/40 transition-all cursor-pointer" onClick={() => navigate('/submit-photo')}>
                  <CardHeader>
                    <Upload className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="font-orbitron">Submit Photo</CardTitle>
                    <CardDescription>Share team moments</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="glass-morphism border-2 border-primary/20 hover:border-primary/40 transition-all cursor-pointer" onClick={() => navigate('/submit-resource')}>
                  <CardHeader>
                    <FileText className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="font-orbitron">Submit Resource</CardTitle>
                    <CardDescription>Share knowledge</CardDescription>
                  </CardHeader>
                </Card>

                {(approvedRoles.some(r => r.role === 'alumni')) && (
                  <Card className="glass-morphism border-2 border-primary/20 hover:border-primary/40 transition-all cursor-pointer" onClick={() => navigate('/alumni-network')}>
                    <CardHeader>
                      <Award className="h-8 w-8 text-primary mb-2" />
                      <CardTitle className="font-orbitron">Alumni Network</CardTitle>
                      <CardDescription>Connect & mentor</CardDescription>
                    </CardHeader>
                  </Card>
                )}
              </>
            )}

            {isAdmin && (
              <Card className="glass-morphism border-2 border-accent/20 hover:border-accent/40 transition-all cursor-pointer" onClick={() => navigate('/admin/users')}>
                <CardHeader>
                  <Users className="h-8 w-8 text-accent mb-2" />
                  <CardTitle className="font-orbitron">Admin Panel</CardTitle>
                  <CardDescription>Manage users & roles</CardDescription>
                </CardHeader>
              </Card>
            )}
          </div>

          {/* Admin Section - Role Approvals */}
          {isAdmin && (
            <RoleApprovals />
          )}

          {/* Your Roles */}
          {approvedRoles.length > 0 && (
            <Card className="glass-morphism border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="font-orbitron">Your Roles</CardTitle>
                <CardDescription>Active roles in the community</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {approvedRoles.map((role, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-sm font-orbitron capitalize"
                    >
                      {role.role}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
