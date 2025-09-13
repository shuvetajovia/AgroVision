import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Bug, Search, AlertTriangle, Leaf, Droplets } from "lucide-react";
import { Link } from "react-router-dom";

const DiseaseInfo = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("all");

  const diseases = [
    {
      id: 1,
      name: "Blast Disease",
      crop: "Rice",
      severity: "High",
      symptoms: ["Brown spots on leaves", "Whitish centers", "Leaf wilting"],
      treatment: "Apply fungicide, improve drainage, use resistant varieties",
      prevention: "Proper spacing, balanced nutrition, avoid over-watering"
    },
    {
      id: 2,
      name: "Rust Disease",
      crop: "Wheat",
      severity: "Medium",
      symptoms: ["Orange-red pustules", "Yellow spots", "Premature leaf drop"],
      treatment: "Fungicide application, remove affected plants",
      prevention: "Crop rotation, early planting, resistant varieties"
    },
    {
      id: 3,
      name: "Blight",
      crop: "Tomato",
      severity: "High",
      symptoms: ["Dark spots on leaves", "Yellowing", "Fruit rot"],
      treatment: "Copper-based fungicides, pruning affected parts",
      prevention: "Good air circulation, avoid overhead watering"
    },
    {
      id: 4,
      name: "Powdery Mildew",
      crop: "Grape",
      severity: "Medium",
      symptoms: ["White powdery coating", "Stunted growth", "Distorted leaves"],
      treatment: "Sulfur spray, neem oil application",
      prevention: "Proper pruning, avoid overcrowding"
    },
    {
      id: 5,
      name: "Root Rot",
      crop: "General",
      severity: "High",
      symptoms: ["Wilting plants", "Black roots", "Stunted growth"],
      treatment: "Improve drainage, apply fungicide to soil",
      prevention: "Well-draining soil, avoid overwatering"
    }
  ];

  const crops = ["all", "Rice", "Wheat", "Tomato", "Grape", "General"];

  const filteredDiseases = diseases.filter(disease => {
    const matchesSearch = disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         disease.symptoms.some(symptom => symptom.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCrop = selectedCrop === "all" || disease.crop === selectedCrop;
    return matchesSearch && matchesCrop;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High": return "bg-destructive text-destructive-foreground";
      case "Medium": return "bg-accent text-accent-foreground";
      case "Low": return "bg-primary text-primary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "High": return <AlertTriangle className="h-4 w-4" />;
      case "Medium": return <Droplets className="h-4 w-4" />;
      case "Low": return <Leaf className="h-4 w-4" />;
      default: return <Bug className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <Bug className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold text-primary">Disease Info</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search diseases or symptoms..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {crops.map((crop) => (
                  <Button
                    key={crop}
                    variant={selectedCrop === crop ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCrop(crop)}
                  >
                    {crop === "all" ? "All Crops" : crop}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disease Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDiseases.map((disease) => (
            <Card key={disease.id} className="hover:shadow-lg agro-transition">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{disease.name}</CardTitle>
                  <Badge className={getSeverityColor(disease.severity)}>
                    <div className="flex items-center gap-1">
                      {getSeverityIcon(disease.severity)}
                      {disease.severity}
                    </div>
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">Affects: {disease.crop}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Symptoms:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {disease.symptoms.map((symptom, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          {symptom}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Treatment:</h4>
                    <p className="text-sm text-muted-foreground">{disease.treatment}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Prevention:</h4>
                    <p className="text-sm text-muted-foreground">{disease.prevention}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDiseases.length === 0 && (
          <div className="text-center py-12">
            <Bug className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No diseases found matching your search criteria.</p>
          </div>
        )}

        {/* Quick Tips */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Disease Prevention Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">General Prevention:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Maintain proper plant spacing</li>
                  <li>• Ensure good air circulation</li>
                  <li>• Practice crop rotation</li>
                  <li>• Use disease-resistant varieties</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Early Detection:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Regular field inspection</li>
                  <li>• Monitor weather conditions</li>
                  <li>• Check for unusual symptoms</li>
                  <li>• Consult experts when in doubt</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default DiseaseInfo;