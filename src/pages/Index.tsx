import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sprout, Mic, Brain, Bug, Leaf } from "lucide-react";

const Index = () => {
  const [language, setLanguage] = useState("english");

  const languages = {
    english: {
      title: "AGROVISION",
      subtitle: "Smart Agriculture Solutions",
      sections: {
        myCrop: "My Crop",
        voiceInput: "Voice Input", 
        aiAdvice: "AI Advice",
        diseaseInfo: "Disease Info"
      }
    },
    tamil: {
      title: "AGROVISION",
      subtitle: "ஸ்மார்ட் வேளாண்மை தீர்வுகள்",
      sections: {
        myCrop: "என் பயிர்",
        voiceInput: "குரல் உள்ளீடு",
        aiAdvice: "AI ஆலோசனை", 
        diseaseInfo: "நோய் தகவல்"
      }
    },
    malayalam: {
      title: "AGROVISION",
      subtitle: "സ്മാർട്ട് കൃഷി പരിഹാരങ്ങൾ",
      sections: {
        myCrop: "എന്റെ വിള",
        voiceInput: "വോയ്സ് ഇൻപുട്ട്",
        aiAdvice: "AI ഉപദേശം",
        diseaseInfo: "രോഗ വിവരങ്ങൾ"
      }
    },
    hindi: {
      title: "AGROVISION", 
      subtitle: "स्मार्ट कृषि समाधान",
      sections: {
        myCrop: "मेरी फसल",
        voiceInput: "आवाज इनपुट",
        aiAdvice: "AI सलाह",
        diseaseInfo: "रोग की जानकारी"
      }
    },
    kannada: {
      title: "AGROVISION",
      subtitle: "ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಪರಿಹಾರಗಳು", 
      sections: {
        myCrop: "ನನ್ನ ಬೆಳೆ",
        voiceInput: "ಧ್ವನಿ ಇನ್‌ಪುಟ್",
        aiAdvice: "AI ಸಲಹೆ",
        diseaseInfo: "ರೋಗ ಮಾಹಿತಿ"
      }
    }
  };

  const currentLang = languages[language as keyof typeof languages];

  const sections = [
    { 
      key: "myCrop", 
      icon: Sprout, 
      path: "/my-crop",
      color: "bg-primary"
    },
    { 
      key: "voiceInput", 
      icon: Mic, 
      path: "/voice-input",
      color: "bg-accent"
    },
    { 
      key: "aiAdvice", 
      icon: Brain, 
      path: "/ai-advice",
      color: "bg-primary-light"
    },
    { 
      key: "diseaseInfo", 
      icon: Bug, 
      path: "/disease-info",
      color: "bg-primary-dark"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Leaf className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">{currentLang.title}</h1>
          </div>
          
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="tamil">தமிழ்</SelectItem>
              <SelectItem value="malayalam">മലയാളം</SelectItem>
              <SelectItem value="hindi">हिंदी</SelectItem>
              <SelectItem value="kannada">ಕನ್ನಡ</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {currentLang.title}
          </h2>
          <p className="text-xl text-muted-foreground">
            {currentLang.subtitle}
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Link key={section.key} to={section.path}>
                <Card className="hover:shadow-lg agro-transition hover:scale-105 cursor-pointer">
                  <CardContent className="p-8 text-center">
                    <div className={`${section.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {currentLang.sections[section.key as keyof typeof currentLang.sections]}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Index;