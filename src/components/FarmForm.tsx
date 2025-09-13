import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FarmFormProps {
  onSubmit: (data: FormData) => void;
}

export interface FormData {
  location: string;
  latitude?: number;
  longitude?: number;
  soilType: string;
  season: string;
}

const soilTypes = [
  { value: "clay", label: "Clay Soil" },
  { value: "sandy", label: "Sandy Soil" },
  { value: "loam", label: "Loam Soil" },
  { value: "black", label: "Black Cotton Soil" },
  { value: "red", label: "Red Soil" },
  { value: "alluvial", label: "Alluvial Soil" },
];

const seasons = [
  { value: "kharif", label: "Kharif (Monsoon)" },
  { value: "rabi", label: "Rabi (Winter)" },
  { value: "zaid", label: "Zaid (Summer)" },
];

export const FarmForm = ({ onSubmit }: FarmFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    location: "",
    soilType: "",
    season: "",
  });
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const { toast } = useToast();

  const detectLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Location not supported",
        description: "Your browser doesn't support geolocation.",
        variant: "destructive",
      });
      return;
    }

    setIsDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        // Reverse geocoding to get location name
        try {
          const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=demo`
          );
          
          if (response.ok) {
            const data = await response.json();
            const locationName = data[0] ? `${data[0].name}, ${data[0].country}` : `${latitude}, ${longitude}`;
            
            setFormData(prev => ({
              ...prev,
              location: locationName,
              latitude,
              longitude,
            }));
            
            toast({
              title: "Location detected",
              description: `Found your location: ${locationName}`,
            });
          } else {
            throw new Error("Geocoding failed");
          }
        } catch (error) {
          // Fallback to coordinates
          const locationName = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
          setFormData(prev => ({
            ...prev,
            location: locationName,
            latitude,
            longitude,
          }));
          
          toast({
            title: "Location detected",
            description: `Using coordinates: ${locationName}`,
          });
        }
        
        setIsDetectingLocation(false);
      },
      (error) => {
        setIsDetectingLocation(false);
        toast({
          title: "Location detection failed",
          description: "Please enter your location manually.",
          variant: "destructive",
        });
      }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.location || !formData.soilType || !formData.season) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-field-green bg-clip-text text-transparent">
          Farm Advisory Input
        </CardTitle>
        <CardDescription className="text-lg">
          Enter your farm details to get personalized crop recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="location" className="text-base font-medium">
              Farm Location
            </Label>
            <div className="flex gap-2">
              <Input
                id="location"
                placeholder="Enter your city or region"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={detectLocation}
                disabled={isDetectingLocation}
                className="px-3"
              >
                {isDetectingLocation ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <MapPin className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="soilType" className="text-base font-medium">
              Soil Type
            </Label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, soilType: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select your soil type" />
              </SelectTrigger>
              <SelectContent>
                {soilTypes.map((soil) => (
                  <SelectItem key={soil.value} value={soil.value}>
                    {soil.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="season" className="text-base font-medium">
              Growing Season
            </Label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, season: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select growing season" />
              </SelectTrigger>
              <SelectContent>
                {seasons.map((season) => (
                  <SelectItem key={season.value} value={season.value}>
                    {season.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-field-green hover:from-primary/90 hover:to-field-green/90 transition-all duration-300"
          >
            Get Crop Recommendations
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};