import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { PageMeta } from '@/components/SEO/PageMeta';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, Pencil, Trash2, Save, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Sponsor {
  id: string;
  name: string;
  logo_url: string | null;
  website: string | null;
  tier: string;
  display_order: number;
  is_active: boolean;
}

const TIER_OPTIONS = [
  'Foundational Partner',
  'Sustainable Partner',
  'Development Partner',
  'Competition Partner',
  'Associate Partner'
];

const AdminSponsors = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    logo_url: '',
    website: '',
    tier: 'Associate Partner',
    display_order: 0,
    is_active: true
  });

  useEffect(() => {
    checkAdminAccess();
    loadSponsors();
  }, []);

  const checkAdminAccess = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/auth');
      return;
    }

    const { data: roles } = await supabase
      .from('user_roles')
      .select('role, approved')
      .eq('user_id', user.id);

    const isAdmin = roles?.some(r => r.role === 'admin' && r.approved);
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive"
      });
      navigate('/dashboard');
    }
  };

  const loadSponsors = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('sponsors')
      .select('*')
      .order('tier', { ascending: true })
      .order('display_order', { ascending: true });

    if (error) {
      toast({
        title: "Error loading sponsors",
        description: error.message,
        variant: "destructive"
      });
    } else {
      setSponsors(data || []);
    }
    setLoading(false);
  };

  const openDialog = (sponsor?: Sponsor) => {
    if (sponsor) {
      setEditingSponsor(sponsor);
      setFormData({
        name: sponsor.name,
        logo_url: sponsor.logo_url || '',
        website: sponsor.website || '',
        tier: sponsor.tier,
        display_order: sponsor.display_order,
        is_active: sponsor.is_active
      });
    } else {
      setEditingSponsor(null);
      setFormData({
        name: '',
        logo_url: '',
        website: '',
        tier: 'Associate Partner',
        display_order: 0,
        is_active: true
      });
    }
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingSponsor(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const sponsorData = {
      name: formData.name,
      logo_url: formData.logo_url || null,
      website: formData.website || null,
      tier: formData.tier,
      display_order: formData.display_order,
      is_active: formData.is_active
    };

    if (editingSponsor) {
      const { error } = await supabase
        .from('sponsors')
        .update(sponsorData)
        .eq('id', editingSponsor.id);

      if (error) {
        toast({
          title: "Error updating sponsor",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Success",
          description: "Sponsor updated successfully"
        });
        closeDialog();
        loadSponsors();
      }
    } else {
      const { error } = await supabase
        .from('sponsors')
        .insert([sponsorData]);

      if (error) {
        toast({
          title: "Error creating sponsor",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Success",
          description: "Sponsor created successfully"
        });
        closeDialog();
        loadSponsors();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this sponsor?')) return;

    const { error } = await supabase
      .from('sponsors')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error deleting sponsor",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Sponsor deleted successfully"
      });
      loadSponsors();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Manage Sponsors | Admin"
        description="Manage sponsor information"
      />
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-orbitron font-bold mb-2">Manage Sponsors</h1>
              <p className="text-muted-foreground">Add, edit, or remove sponsors</p>
            </div>
            <Button onClick={() => openDialog()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Sponsor
            </Button>
          </div>

          <div className="space-y-4">
            {TIER_OPTIONS.map((tier) => {
              const tierSponsors = sponsors.filter(s => s.tier === tier);
              
              return (
                <Card key={tier} className="p-6">
                  <h2 className="text-2xl font-orbitron font-bold mb-4">{tier}</h2>
                  
                  {tierSponsors.length === 0 ? (
                    <p className="text-muted-foreground">No sponsors in this tier</p>
                  ) : (
                    <div className="space-y-3">
                      {tierSponsors.map((sponsor) => (
                        <div
                          key={sponsor.id}
                          className="flex items-center justify-between p-4 border border-border rounded-lg"
                        >
                          <div className="flex items-center gap-4">
                            {sponsor.logo_url && (
                              <img
                                src={sponsor.logo_url}
                                alt={sponsor.name}
                                className="w-16 h-16 object-contain"
                              />
                            )}
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{sponsor.name}</h3>
                                {!sponsor.is_active && (
                                  <Badge variant="outline">Inactive</Badge>
                                )}
                              </div>
                              {sponsor.website && (
                                <a
                                  href={sponsor.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-primary hover:underline"
                                >
                                  {sponsor.website}
                                </a>
                              )}
                              <p className="text-sm text-muted-foreground">
                                Display Order: {sponsor.display_order}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openDialog(sponsor)}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(sponsor.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingSponsor ? 'Edit Sponsor' : 'Add New Sponsor'}
            </DialogTitle>
            <DialogDescription>
              {editingSponsor ? 'Update sponsor information' : 'Create a new sponsor entry'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="logo_url">Logo URL</Label>
              <Input
                id="logo_url"
                type="url"
                value={formData.logo_url}
                onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                placeholder="/lovable-uploads/..."
              />
            </div>

            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                placeholder="https://..."
              />
            </div>

            <div>
              <Label htmlFor="tier">Tier *</Label>
              <Select
                value={formData.tier}
                onValueChange={(value) => setFormData({ ...formData, tier: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TIER_OPTIONS.map((tier) => (
                    <SelectItem key={tier} value={tier}>
                      {tier}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="display_order">Display Order</Label>
              <Input
                id="display_order"
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="w-4 h-4"
              />
              <Label htmlFor="is_active">Active</Label>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={closeDialog}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button type="submit">
                <Save className="w-4 h-4 mr-2" />
                {editingSponsor ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default AdminSponsors;
