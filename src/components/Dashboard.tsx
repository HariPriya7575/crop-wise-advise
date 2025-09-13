import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, DollarSign, Droplets, Thermometer, Sprout } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CropRecommendation {
  name: string;
  suitabilityScore: number;
  expectedYield: number;
  profit: number;
  fertilizerAdvice: string;
  pesticideAdvice: string;
  waterRequirement: string;
  growthPeriod: string;
}

interface DashboardProps {
  recommendations: CropRecommendation[];
  farmLocation: string;
  soilType: string;
  season: string;
}

// Mock data for demonstration
const mockRecommendations: CropRecommendation[] = [
  {
    name: "Rice",
    suitabilityScore: 92,
    expectedYield: 45,
    profit: 35000,
    fertilizerAdvice: "Apply NPK 20:10:10 at sowing, Urea top-dressing at tillering stage",
    pesticideAdvice: "Use Chlorpyrifos for stem borer control, Mancozeb for blast disease",
    waterRequirement: "High (1500-2000mm)",
    growthPeriod: "120-140 days",
  },
  {
    name: "Cotton",
    suitabilityScore: 87,
    expectedYield: 25,
    profit: 42000,
    fertilizerAdvice: "Balanced NPK 19:19:19, Potash during flowering",
    pesticideAdvice: "Bt-cotton for bollworm control, Imidacloprid for aphids",
    waterRequirement: "Medium (700-1200mm)",
    growthPeriod: "160-180 days",
  },
  {
    name: "Maize",
    suitabilityScore: 84,
    expectedYield: 55,
    profit: 28000,
    fertilizerAdvice: "Nitrogen at V6 stage, Phosphorus at sowing",
    pesticideAdvice: "Carbofuran for rootworm, 2,4-D for weed control",
    waterRequirement: "Medium (500-800mm)",
    growthPeriod: "90-120 days",
  },
];

export const Dashboard = ({ farmLocation, soilType, season }: Omit<DashboardProps, 'recommendations'>) => {
  const recommendations = mockRecommendations;
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card className="bg-gradient-to-r from-primary/5 to-field-green/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Sprout className="h-6 w-6 text-primary" />
            {t('crop.recommendations')}
          </CardTitle>
          <CardDescription className="text-base">
            <div className="flex flex-wrap gap-4 mt-2">
              <span><strong>{t('location')}:</strong> {farmLocation}</span>
              <span><strong>{t('soil')}:</strong> {soilType}</span>
              <span><strong>{t('season')}:</strong> {season}</span>
            </div>
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Recommendations List */}
      <div className="space-y-4">
        {recommendations.map((crop, index) => (
          <Card key={crop.name} className="border-2 border-primary/10">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-primary">
                  {crop.name}
                </CardTitle>
                <Badge 
                  variant="secondary" 
                  className="text-sm font-semibold bg-field-green/10 text-field-green border-field-green/20"
                >
                  {crop.suitabilityScore}% {t('suitable')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Simple Key Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-field-green/5 rounded-lg border border-field-green/20">
                  <div className="text-2xl font-bold text-field-green">{crop.expectedYield}</div>
                  <div className="text-sm text-muted-foreground">{t('quintals.hectare')}</div>
                </div>
                <div className="text-center p-4 bg-harvest-gold/5 rounded-lg border border-harvest-gold/20">
                  <div className="text-2xl font-bold text-harvest-gold">₹{crop.profit.toLocaleString('en-IN')}</div>
                  <div className="text-sm text-muted-foreground">{t('profit.hectare')}</div>
                </div>
                <div className="text-center p-4 bg-sky-blue/5 rounded-lg border border-sky-blue/20">
                  <div className="text-sm font-semibold text-sky-blue">{crop.waterRequirement}</div>
                  <div className="text-sm text-muted-foreground">{t('water.requirement')}</div>
                </div>
              </div>

              <Separator />

              {/* Simple Advice */}
              <div className="space-y-3">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-sm text-primary mb-1">🌱 {t('fertilizer.advice')}</h4>
                  <p className="text-sm">{crop.fertilizerAdvice}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-sm text-primary mb-1">🛡️ {t('pest.control')}</h4>
                  <p className="text-sm">{crop.pesticideAdvice}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};