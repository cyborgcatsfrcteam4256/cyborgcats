import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { AdminLayout } from '@/components/Admin/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, Pencil, Trash2, Save, X, GripVertical } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface SponsorTier {
  id: string;
  name: string;
  description: string | null;
  display_order: number;
  benefits: string[] | null;
  icon: string | null;
  color_gradient: string | null;
}

const AdminSponsorTiers = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tiers, setTiers] = useState<SponsorTier[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTier, setEditingTier] = useState<SponsorTier | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    display_order: 0,
    benefits: '',
    icon: '',
    color_gradient: ''
  });

  useEffect(() => {
    checkAdminAccess();
    loadTiers();
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
      toast({ title: "Access Denied", variant: "destructive" });
      navigate('/dashboard');
    }
  };

  const loadTiers = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('sponsor_tiers')
      .select('*')
      .order('display_order', { ascending: true });
    setTiers(data || []);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tierData = {
      name: formData.name,
      description: formData.description || null,
      display_order: formData.display_order,
      benefits: formData.benefits ? formData.benefits.split('\n').filter(b => b.trim()) : null,
      icon: formData.icon || null,
      color_gradient: formData.color_gradient || null
    };

    if (editingTier) {
      await supabase.from('sponsor_tiers').update(tierData).eq('id', editingTier.id);
      toast({ title: "Tier updated successfully" });
    } else {
      await supabase.from('sponsor_tiers').insert([tierData]);
      toast({ title: "Tier created successfully" });
    }

    setIsDialogOpen(false);
    loadTiers();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tier?')) return;
    await supabase.from('sponsor_tiers').delete().eq('id', id);
    toast({ title: "Tier deleted successfully" });
    loadTiers();
  };

  const openDialog = (tier?: SponsorTier) => {
    if (tier) {
      setEditingTier(tier);
      setFormData({
        name: tier.name,
        description: tier.description || '',
        display_order: tier.display_order,
        benefits: tier.benefits?.join('\n') || '',
        icon: tier.icon || '',
        color_gradient: tier.color_gradient || ''
      });
    } else {
      setEditingTier(null);
      setFormData({
        name: '',
        description: '',
        display_order: tiers.length + 1,
        benefits: '',
        icon: '',
        color_gradient: ''
      });
    }
    setIsDialogOpen(true);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <AdminLayout title="Manage Sponsor Tiers" description="Add and organize sponsorship tiers">
      <Button onClick={() => openDialog()} className="mb-6">
        <Plus className="w-4 h-4 mr-2" />Add Tier
      </Button>

      <div className="grid md:grid-cols-2 gap-6">
        {tiers.map((tier) => (
          <Card key={tier.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg">{tier.name}</h3>
                  <p className="text-sm text-muted-foreground">{tier.description}</p>
                  <p className="text-xs text-muted-foreground mt-2">Order: {tier.display_order}</p>
                </div>
                <GripVertical className="w-5 h-5 text-muted-foreground" />
              </div>
              {tier.benefits && tier.benefits.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Benefits:</p>
                  <ul className="text-sm text-muted-foreground list-disc list-inside">
                    {tier.benefits.map((benefit, idx) => (
                      <li key={idx}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" onClick={() => openDialog(tier)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => handleDelete(tier.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingTier ? 'Edit' : 'Add'} Sponsor Tier</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Tier Name *</Label>
              <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
            </div>
            <div>
              <Label>Display Order</Label>
              <Input type="number" value={formData.display_order} onChange={(e) => setFormData({...formData, display_order: parseInt(e.target.value)})} />
            </div>
            <div>
              <Label>Benefits (one per line)</Label>
              <Textarea value={formData.benefits} onChange={(e) => setFormData({...formData, benefits: e.target.value})} placeholder="Premium logo placement&#10;Recognition at events&#10;Social media features" rows={5} />
            </div>
            <div>
              <Label>Icon (optional)</Label>
              <Input value={formData.icon} onChange={(e) => setFormData({...formData, icon: e.target.value})} placeholder="e.g. Star, Trophy" />
            </div>
            <div>
              <Label>Color Gradient (optional)</Label>
              <Input value={formData.color_gradient} onChange={(e) => setFormData({...formData, color_gradient: e.target.value})} placeholder="e.g. from-primary to-primary-glow" />
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit"><Save className="w-4 h-4 mr-2" />Save</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminSponsorTiers;