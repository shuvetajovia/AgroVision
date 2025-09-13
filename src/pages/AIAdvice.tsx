import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Brain, Send, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

const AIAdvice = () => {
  const [question, setQuestion] = useState("");
  const [cropType, setCropType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [advice, setAdvice] = useState("");

  const commonQuestions = [
    "When is the best time to plant rice?",
    "How to prevent pest attacks?",
    "What fertilizer should I use?",
    "How often should I water my crops?",
    "Signs of nutrient deficiency in plants"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    setAdvice("");

    // Simulate AI processing
    setTimeout(() => {
      const sampleAdvice = `Based on your question about "${question}" for ${cropType || 'your crop'}, here are my recommendations:

1. **Assessment**: First, examine the current conditions of your crop and soil.

2. **Best Practices**: Follow proven agricultural techniques specific to your crop type and local climate.

3. **Timing**: Consider seasonal factors and growth stages for optimal results.

4. **Monitoring**: Regular observation is key to early problem detection and successful crop management.

5. **Local Expertise**: Consult with local agricultural experts who understand your specific regional conditions.

Remember to adapt these suggestions to your local conditions and always consider sustainable farming practices.`;

      setAdvice(sampleAdvice);
      setIsLoading(false);
    }, 2000);
  };

  const handleQuestionClick = (q: string) => {
    setQuestion(q);
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
            <Brain className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold text-primary">AI Advice</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Get Smart Agriculture Advice
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="cropType">Crop Type (Optional)</Label>
                    <Input
                      id="cropType"
                      value={cropType}
                      onChange={(e) => setCropType(e.target.value)}
                      placeholder="e.g., Rice, Wheat, Tomato"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="question">Your Question</Label>
                    <Textarea
                      id="question"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="Ask about planting, care, diseases, fertilizers, or any farming question..."
                      rows={4}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isLoading || !question.trim()}
                    className="w-full"
                  >
                    {isLoading ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Get AI Advice
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* AI Response */}
            {advice && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">AI Recommendation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
                    <pre className="whitespace-pre-wrap text-sm font-sans">{advice}</pre>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Common Questions Sidebar */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Common Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {commonQuestions.map((q, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuestionClick(q)}
                      className="w-full text-left justify-start h-auto p-3 text-wrap"
                    >
                      {q}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Pro Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Be specific about your crop and location</li>
                  <li>• Mention current season and weather</li>
                  <li>• Include soil type if known</li>
                  <li>• Describe symptoms clearly for disease diagnosis</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIAdvice;