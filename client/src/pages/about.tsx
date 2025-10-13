import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Shield, BookOpen, Users } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <h1 className="text-3xl lg:text-4xl font-bold">About The DOT Insider</h1>
          <p className="text-muted-foreground mt-2">
            Your trusted source for DOT compliance and SAP support
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Mission */}
          <Card className="border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base text-muted-foreground leading-relaxed">
                The DOT Insider exists to keep Substance Abuse Professionals (SAPs), Employee Assistance Professionals (EAPs), and compliance officers informed and empowered with unbiased, timely insight into regulatory changes, best practices, and vetted education resources.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                We believe that access to clear, actionable compliance information should never be a barrier to safety or professional excellence. Our platform serves as an independent hub where professionals can stay current, make informed decisions, and connect with trusted resources.
              </p>
            </CardContent>
          </Card>

          {/* Core Values */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Our Core Values</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="hover-elevate">
                <CardHeader>
                  <Shield className="h-10 w-10 text-primary mb-3" />
                  <CardTitle className="text-lg">Independence & Trust</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    We maintain complete editorial independence. Our reviews and recommendations are unbiased, based solely on quality, compliance, and professional value.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-elevate">
                <CardHeader>
                  <CheckCircle className="h-10 w-10 text-primary mb-3" />
                  <CardTitle className="text-lg">Accuracy & Timeliness</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Regulatory compliance is time-sensitive. We prioritize delivering accurate, up-to-date information when it matters most.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-elevate">
                <CardHeader>
                  <BookOpen className="h-10 w-10 text-primary mb-3" />
                  <CardTitle className="text-lg">Education First</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Beyond news, we provide educational resources that help professionals understand and implement compliance requirements effectively.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-elevate">
                <CardHeader>
                  <Users className="h-10 w-10 text-primary mb-3" />
                  <CardTitle className="text-lg">Community Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    We foster connections between SAPs, employers, and trusted organizations to build a stronger, more informed compliance community.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* What We Cover */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">What We Cover</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-base">Regulatory Updates</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span>FMCSA, PHMSA, FAA, FTA, FRA, USCG notices</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span>Drug and Alcohol Clearinghouse updates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span>Plain language summaries of complex regulations</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-base">SAP Resources</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span>Return-to-Duty process guidance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span>Evaluation templates and checklists</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span>Best practice documentation</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-base">Provider Reviews</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span>Independent quality ratings (1-5 scale)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span>Detailed criteria: course quality, SAP support, reporting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span>DOT compliance verification</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-base">Community</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span>Organization spotlights (ASAP, The SAP List, etc.)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span>Expert webinars and training sessions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span>Professional networking resources</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Funding Disclosure */}
          <Card className="border-l-4 border-l-muted">
            <CardHeader>
              <CardTitle className="text-xl">Independence & Funding</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The DOT Insider operates as an independent publication. We do not accept payment for reviews or editorial content. Provider listings may include sponsored placements, but all ratings and reviews are based on verified criteria and remain editorially independent. Our mission is to serve the compliance community with unbiased, professional information.
              </p>
            </CardContent>
          </Card>

          {/* Tagline */}
          <div className="text-center py-8">
            <p className="text-xl font-semibold text-primary">
              Stay informed. Stay compliant. Stay connected.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
