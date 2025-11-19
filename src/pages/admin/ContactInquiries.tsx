import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Mail, User, Phone, MessageSquare } from "lucide-react";
import { AdminLayout } from "@/components/Admin/AdminLayout";
import { useTranslation } from "react-i18next";

interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  created_at: string;
}

const ContactInquiries = () => {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const { data, error } = await supabase
        .from("contact_inquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setInquiries(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load contact inquiries",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getSubjectColor = (subject: string) => {
    const colors: Record<string, string> = {
      general: "bg-blue-500",
      sponsorship: "bg-purple-500",
      mentorship: "bg-green-500",
      join: "bg-orange-500",
      other: "bg-gray-500",
    };
    return colors[subject] || colors.other;
  };

  if (isLoading) {
    return (
      <AdminLayout 
        title={t('contactInquiries.title')} 
        description={t('contactInquiries.description')}
      >
        <div className="text-center">{t('contactInquiries.loading')}</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout 
      title={t('contactInquiries.title')} 
      description={t('contactInquiries.description')}
    >
      {inquiries.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            {t('contactInquiries.noInquiries')}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inquiry) => (
            <Card key={inquiry.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      {inquiry.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(inquiry.created_at), "MMM d, yyyy 'at' h:mm a")}
                    </p>
                  </div>
                  <Badge className={getSubjectColor(inquiry.subject)}>
                    {inquiry.subject.charAt(0).toUpperCase() + inquiry.subject.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href={`mailto:${inquiry.email}`} className="hover:underline">
                    {inquiry.email}
                  </a>
                </div>
                {inquiry.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a href={`tel:${inquiry.phone}`} className="hover:underline">
                      {inquiry.phone}
                    </a>
                  </div>
                )}
                <div className="pt-4 border-t">
                  <div className="flex items-start gap-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground mt-1" />
                    <p className="text-sm flex-1">{inquiry.message}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default ContactInquiries;
