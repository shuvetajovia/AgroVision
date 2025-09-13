import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Plus, Sprout } from "lucide-react";
import { Link } from "react-router-dom";

const MyCrop = () => {
  const [crops, setCrops] = useState([
    { id: 1, name: "Rice", variety: "Basmati", plantedDate: "2024-01-15", status: "Growing" },
    { id: 2, name: "Wheat", variety: "Durum", plantedDate: "2024-02-01", status: "Harvested" },
  ]);

  const [newCrop, setNewCrop] = useState({
    name: "",
    variety: "",
    plantedDate: "",
  });

  const handleAddCrop = () => {
    if (newCrop.name && newCrop.variety && newCrop.plantedDate) {
      setCrops([...crops, {
        id: crops.length + 1,
        ...newCrop,
        status: "Growing"
      }]);
      setNewCrop({ name: "", variety: "", plantedDate: "" });
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
            <Sprout className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold text-primary">My Crop</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Add New Crop */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Crop
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label htmlFor="cropName">Crop Name</Label>
                <Input
                  id="cropName"
                  value={newCrop.name}
                  onChange={(e) => setNewCrop({...newCrop, name: e.target.value})}
                  placeholder="e.g., Rice, Wheat"
                />
              </div>
              <div>
                <Label htmlFor="variety">Variety</Label>
                <Input
                  id="variety"
                  value={newCrop.variety}
                  onChange={(e) => setNewCrop({...newCrop, variety: e.target.value})}
                  placeholder="e.g., Basmati, Durum"
                />
              </div>
              <div>
                <Label htmlFor="plantedDate">Planted Date</Label>
                <Input
                  id="plantedDate"
                  type="date"
                  value={newCrop.plantedDate}
                  onChange={(e) => setNewCrop({...newCrop, plantedDate: e.target.value})}
                />
              </div>
            </div>
            <Button onClick={handleAddCrop} className="w-full md:w-auto">
              Add Crop
            </Button>
          </CardContent>
        </Card>

        {/* Crop List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {crops.map((crop) => (
            <Card key={crop.id}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary w-12 h-12 rounded-full flex items-center justify-center">
                    <Sprout className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{crop.name}</h3>
                    <p className="text-sm text-muted-foreground">{crop.variety}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Planted:</span>
                    <span>{new Date(crop.plantedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      crop.status === 'Growing' 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-accent/10 text-accent'
                    }`}>
                      {crop.status}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {crops.length === 0 && (
          <div className="text-center py-12">
            <Sprout className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No crops added yet. Add your first crop above!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default MyCrop;