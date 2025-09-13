import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Dashboard } from "@/components/Dashboard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const formData = location.state;

  useEffect(() => {
    if (!formData) {
      navigate("/");
    }
  }, [formData, navigate]);

  if (!formData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('back.form')}
          </Button>
          <LanguageSelector />
        </div>
        
        <Dashboard
          farmLocation={formData.location}
          soilType={formData.soilType}
          season={formData.season}
        />
      </div>
    </div>
  );
};

export default Results;