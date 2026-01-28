import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type AuthStep = "phone" | "otp" | "profile";

export default function Auth() {
  const [step, setStep] = useState<AuthStep>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length !== 10) return;
    
    setIsLoading(true);
    // Simulate OTP sending - will be replaced with actual Supabase auth
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
    }, 1500);
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) return;
    
    setIsLoading(true);
    // Simulate OTP verification - will be replaced with actual Supabase auth
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to home or profile setup
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      {/* Back to Home */}
      <Link
        to="/"
        className="absolute left-4 top-4 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      {/* Logo */}
      <div className="mb-8 text-center">
        <h1 className="font-serif text-2xl font-bold text-primary">Gowtham Handlooms</h1>
        <p className="text-sm text-muted-foreground">Premium Andhra Handloom Sarees</p>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="font-serif text-2xl">
            {step === "phone" && "Welcome"}
            {step === "otp" && "Verify OTP"}
            {step === "profile" && "Complete Profile"}
          </CardTitle>
          <CardDescription>
            {step === "phone" && "Enter your phone number to continue"}
            {step === "otp" && `We've sent a 6-digit code to +91 ${phone}`}
            {step === "profile" && "Just a few more details"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {step === "phone" && (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex gap-2">
                  <div className="flex h-10 items-center rounded-md border border-input bg-muted px-3 text-sm">
                    +91
                  </div>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    className="flex-1"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full gap-2"
                disabled={phone.length !== 10 || isLoading}
              >
                {isLoading ? (
                  "Sending OTP..."
                ) : (
                  <>
                    <Phone className="h-4 w-4" />
                    Send OTP
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                By continuing, you agree to our{" "}
                <Link to="/terms" className="underline hover:text-foreground">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="underline hover:text-foreground">
                  Privacy Policy
                </Link>
              </p>
            </form>
          )}

          {step === "otp" && (
            <div className="space-y-6">
              <div className="flex flex-col items-center gap-4">
                <InputOTP
                  value={otp}
                  onChange={setOtp}
                  maxLength={6}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>

                <p className="text-center text-sm text-muted-foreground">
                  Didn't receive code?{" "}
                  <button
                    type="button"
                    className="font-medium text-primary hover:underline"
                    onClick={() => {
                      // Resend OTP logic
                    }}
                  >
                    Resend
                  </button>
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setStep("phone");
                    setOtp("");
                  }}
                >
                  Change Number
                </Button>
                <Button
                  className="flex-1"
                  disabled={otp.length !== 6 || isLoading}
                  onClick={handleVerifyOTP}
                >
                  {isLoading ? "Verifying..." : "Verify"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Decorative elements */}
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />
    </div>
  );
}
