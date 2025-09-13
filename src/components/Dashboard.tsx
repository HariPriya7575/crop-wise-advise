import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, DollarSign, Droplets, Thermometer, Sprout } from "lucide-react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

  const chartData = {
    labels: recommendations.map(crop => crop.name),
    datasets: [
      {
        label: 'Expected Yield (quintals/hectare)',
        data: recommendations.map(crop => crop.expectedYield),
        backgroundColor: 'hsl(var(--field-green) / 0.8)',
        borderColor: 'hsl(var(--field-green))',
        borderWidth: 2,
      },
      {
        label: 'Profit (₹/hectare)',
        data: recommendations.map(crop => crop.profit / 1000), // Convert to thousands for chart
        backgroundColor: 'hsl(var(--harvest-gold) / 0.8)',
        borderColor: 'hsl(var(--harvest-gold))',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Yield vs Profit Comparison',
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card className="bg-gradient-to-r from-primary/5 to-field-green/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Sprout className="h-6 w-6 text-primary" />
            Crop Recommendations for Your Farm
          </CardTitle>
          <CardDescription className="text-lg">
            <div className="flex flex-wrap gap-4 mt-2">
              <span><strong>Location:</strong> {farmLocation}</span>
              <span><strong>Soil:</strong> {soilType}</span>
              <span><strong>Season:</strong> {season}</span>
            </div>
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Chart Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Yield & Profit Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </CardContent>
      </Card>

      {/* Recommendations Grid */}
      <div className="grid gap-6">
        {recommendations.map((crop, index) => (
          <Card key={crop.name} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-primary">
                  {crop.name}
                </CardTitle>
                <Badge 
                  variant="secondary" 
                  className="text-sm font-semibold bg-field-green/10 text-field-green border-field-green/20"
                >
                  {crop.suitabilityScore}% Suitable
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <TrendingUp className="h-4 w-4 text-field-green" />
                  </div>
                  <div className="text-2xl font-bold text-field-green">{crop.expectedYield}</div>
                  <div className="text-sm text-muted-foreground">Quintals/hectare</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <DollarSign className="h-4 w-4 text-harvest-gold" />
                  </div>
                  <div className="text-2xl font-bold text-harvest-gold">₹{(crop.profit / 1000).toFixed(0)}K</div>
                  <div className="text-sm text-muted-foreground">Per hectare</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <Droplets className="h-4 w-4 text-sky-blue" />
                  </div>
                  <div className="text-sm font-semibold text-sky-blue">{crop.waterRequirement}</div>
                  <div className="text-sm text-muted-foreground">Water need</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <Thermometer className="h-4 w-4 text-earth-brown" />
                  </div>
                  <div className="text-sm font-semibold text-earth-brown">{crop.growthPeriod}</div>
                  <div className="text-sm text-muted-foreground">Growth period</div>
                </div>
              </div>

              <Separator />

              {/* Advice Sections */}
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-sm text-primary mb-1">🌱 Fertilizer Advice</h4>
                  <p className="text-sm text-muted-foreground">{crop.fertilizerAdvice}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-primary mb-1">🛡️ Pesticide Advice</h4>
                  <p className="text-sm text-muted-foreground">{crop.pesticideAdvice}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};