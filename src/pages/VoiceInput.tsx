import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Mic, MicOff, Volume2 } from "lucide-react";
import { Link } from "react-router-dom";

const VoiceInput = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      // Simulate processing
      setTimeout(() => {
        setResponse("I understand you're asking about crop care. Here's what I recommend...");
      }, 1000);
    } else {
      setIsListening(true);
      setTranscript("Listening...");
      setResponse("");
      
      // Simulate voice recognition
      setTimeout(() => {
        setTranscript("How do I take care of my rice crop during monsoon season?");
        setIsListening(false);
        setTimeout(() => {
          setResponse("During monsoon season, ensure proper drainage to prevent waterlogging. Monitor for fungal diseases and apply appropriate fungicides if needed. Check soil pH levels regularly.");
        }, 1500);
      }, 3000);
    }
  };

  const speakResponse = () => {
    if ('speechSynthesis' in window && response) {
      const utterance = new SpeechSynthesisUtterance(response);
      window.speechSynthesis.speak(utterance);
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
            <Mic className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold text-primary">Voice Input</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Voice Input Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center">Ask Your Agriculture Questions</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="mb-8">
              <Button
                onClick={toggleListening}
                size="lg"
                className={`w-24 h-24 rounded-full ${
                  isListening 
                    ? 'bg-destructive hover:bg-destructive/90 animate-pulse' 
                    : 'bg-primary hover:bg-primary/90'
                }`}
              >
                {isListening ? (
                  <MicOff className="h-8 w-8" />
                ) : (
                  <Mic className="h-8 w-8" />
                )}
              </Button>
            </div>
            
            <p className="text-muted-foreground mb-4">
              {isListening ? "Listening... Speak now!" : "Tap the microphone to start"}
            </p>

            {transcript && (
              <div className="bg-muted p-4 rounded-lg mb-4">
                <h3 className="font-semibold mb-2">You said:</h3>
                <p className="text-sm">{transcript}</p>
              </div>
            )}

            {response && (
              <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">AI Response:</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={speakResponse}
                    className="flex items-center gap-2"
                  >
                    <Volume2 className="h-4 w-4" />
                    Listen
                  </Button>
                </div>
                <p className="text-sm text-left">{response}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Voice Input Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Speak clearly and at normal speed</li>
              <li>• Ask specific questions about your crops</li>
              <li>• Mention crop type, season, and specific issues</li>
              <li>• Use your local language - we support multiple languages</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default VoiceInput;