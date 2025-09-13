import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FarmForm, FormData } from "@/components/FarmForm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Leaf, TrendingUp, Users, Award } from "lucide-react";
import { LanguageSelector } from "@/components/LanguageSelector";
import heroImage from "@/assets/hero-farm.jpg";

const Index = () => {
  const navigate = useNavigate();

  const handleFormSubmit = (data: FormData) => {
    navigate("/results", { state: data });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Language Selector - Fixed Position */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSelector />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background/80" />
        </div>
        
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge variant="secondary" className="mb-6 text-primary bg-white/90 hover:bg-white">
              🌾 Smart Agriculture Platform
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Get Personalized{" "}
              <span className="bg-gradient-to-r from-harvest-gold to-field-green bg-clip-text text-transparent">
                Crop Recommendations
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
              Make informed farming decisions with AI-powered insights based on your location, soil type, and season
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-field-green" />
                <span>Soil Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-harvest-gold" />
                <span>Yield Prediction</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-sky-blue" />
                <span>Expert Advice</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Start Your Farm Analysis
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enter your farm details below to receive personalized crop recommendations, 
              yield predictions, and agricultural guidance tailored to your specific conditions.
            </p>
          </div>
          
          <FarmForm onSubmit={handleFormSubmit} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Platform?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Empowering farmers with data-driven decisions for better yields and sustainable farming
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-lg bg-card shadow-sm">
              <div className="w-16 h-16 mx-auto mb-4 bg-field-green/10 rounded-full flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-field-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Yield Optimization</h3>
              <p className="text-muted-foreground">
                Get accurate yield predictions and optimize your crop selection for maximum profitability
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-card shadow-sm">
              <div className="w-16 h-16 mx-auto mb-4 bg-harvest-gold/10 rounded-full flex items-center justify-center">
                <Leaf className="h-8 w-8 text-harvest-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Soil-Specific Advice</h3>
              <p className="text-muted-foreground">
                Receive tailored recommendations based on your specific soil type and local conditions
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-card shadow-sm">
              <div className="w-16 h-16 mx-auto mb-4 bg-sky-blue/10 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-sky-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Guidance</h3>
              <p className="text-muted-foreground">
                Access comprehensive fertilizer and pesticide recommendations from agricultural experts
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
