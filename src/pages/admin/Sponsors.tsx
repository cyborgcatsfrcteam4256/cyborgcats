import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { AdminLayout } from '@/components/Admin/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, Pencil, Trash2, Save, X, Upload, Image as ImageIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

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
  const [uploadingLogo, setUploadingLogo] = useState(false);
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
      toast({ title: "Access Denied", variant: "destructive" });
      navigate('/dashboard');
    }
  };

  const loadSponsors = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('sponsors')
      .select('*')
      .order('display_order', { ascending: true });
    setSponsors(data || []);
    setLoading(false);
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast({ title: "File too large", variant: "destructive" });
      return;
    }

    try {
      setUploadingLogo(true);
      const fileName = `sponsor-${Date.now()}.${file.name.split('.').pop()}`;
      const { error } = await supabase.storage.from('public-images').upload(fileName, file);
      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage.from('public-images').getPublicUrl(fileName);
      setFormData(prev => ({ ...prev, logo_url: publicUrl }));
      toast({ title: "Logo uploaded successfully" });
    } catch (error: any) {
      toast({ title: "Upload failed", variant: "destructive" });
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const sponsorData = { ...formData, logo_url: formData.logo_url || null, website: formData.website || null };

    if (editingSponsor) {
      await supabase.from('sponsors').update(sponsorData).eq('id', editingSponsor.id);
    } else {
      await supabase.from('sponsors').insert([sponsorData]);
    }

    toast({ title: "Success" });
    setIsDialogOpen(false);
    loadSponsors();
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <AdminLayout title="Manage Sponsors" description="Add and organize sponsors">
      <Button onClick={() => { setEditingSponsor(null); setFormData({ name: '', logo_url: '', website: '', tier: 'Associate Partner', display_order: 0, is_active: true }); setIsDialogOpen(true); }} className="mb-6">
        <Plus className="w-4 h-4 mr-2" />Add Sponsor
      </Button>

      <div className="grid md:grid-cols-3 gap-6">
        {sponsors.map((sponsor) => (
          <Card key={sponsor.id}>
            <CardContent className="p-6">
              {sponsor.logo_url && <img src={sponsor.logo_url} alt={sponsor.name} className="h-24 object-contain mb-4" />}
              <h3 className="font-bold text-lg">{sponsor.name}</h3>
              <p className="text-sm text-muted-foreground">{sponsor.tier}</p>
              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="ghost" onClick={() => { setEditingSponsor(sponsor); setFormData(sponsor); setIsDialogOpen(true); }}>
                  <Pencil className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingSponsor ? 'Edit' : 'Add'} Sponsor</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Name *</Label>
              <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div>
              <Label>Logo</Label>
              {formData.logo_url && <img src={formData.logo_url} alt="Preview" className="h-32 object-contain mb-2" />}
              <Button type="button" variant="outline" onClick={() => document.getElementById('logo')?.click()} disabled={uploadingLogo}>
                {uploadingLogo ? <Loader2 className="animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}Upload
              </Button>
              <input id="logo" type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
            </div>
            <div>
              <Label>Website</Label>
              <Input value={formData.website} onChange={(e) => setFormData({...formData, website: e.target.value})} />
            </div>
            <div>
              <Label>Tier</Label>
              <Select value={formData.tier} onValueChange={(v) => setFormData({...formData, tier: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{TIER_OPTIONS.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={formData.is_active} onCheckedChange={(c) => setFormData({...formData, is_active: c})} />
              <Label>Active</Label>
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

export default AdminSponsors;
