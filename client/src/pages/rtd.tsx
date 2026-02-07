import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle, ChevronRight, Download, Route } from "lucide-react";
import sectionRtdImg from "@/assets/images/section-rtd.png";

const rtdSteps = [
  {
    id: 1,
    title: "Initial Violation & Removal from Duty",
    description: "Employee tests positive or refuses a drug/alcohol test. Employer immediately removes employee from safety-sensitive duties.",
    details: [
      "Employer documents the violation in the Drug and Alcohol Clearinghouse",
      "Employee is informed of the positive test result and consequences",
      "Employee cannot perform safety-sensitive functions until completing RTD process",
    ],
    resources: ["Violation Documentation Template", "Employee Notification Letter"],
  },
  {
    id: 2,
    title: "SAP Evaluation",
    description: "Employee must be evaluated by a qualified Substance Abuse Professional (SAP).",
    details: [
      "SAP conducts a face-to-face clinical assessment",
      "SAP determines appropriate education or treatment plan",
      "SAP provides written recommendations to employee and employer",
    ],
    resources: ["SAP Locator Tool", "Evaluation Checklist"],
  },
  {
    id: 3,
    title: "Treatment/Education Completion",
    description: "Employee completes the SAP-prescribed education or treatment program.",
    details: [
      "Employee follows SAP's recommendations completely",
      "Provider reports completion to SAP",
      "SAP verifies successful completion",
    ],
    resources: ["Treatment Completion Form", "Provider Communication Guide"],
  },
  {
    id: 4,
    title: "SAP Follow-Up Evaluation",
    description: "SAP conducts a follow-up evaluation to determine if employee has successfully complied.",
    details: [
      "SAP reviews treatment completion documentation",
      "SAP conducts another face-to-face assessment",
      "SAP determines if employee demonstrated successful compliance",
    ],
    resources: ["Follow-Up Evaluation Form"],
  },
  {
    id: 5,
    title: "Return-to-Duty Test",
    description: "Employee must pass a DOT return-to-duty drug and/or alcohol test.",
    details: [
      "Test must be directly observed (for drug test)",
      "Must test negative for drugs and/or alcohol (BAC below 0.02)",
      "Medical Review Officer (MRO) verifies test results",
    ],
    resources: ["RTD Testing Requirements"],
  },
  {
    id: 6,
    title: "Follow-Up Testing Plan",
    description: "SAP prescribes a follow-up testing plan (minimum 6 tests over 12 months).",
    details: [
      "SAP determines number and frequency of follow-up tests",
      "Employer implements the follow-up testing schedule",
      "Follow-up tests are unannounced and in addition to regular testing",
    ],
    resources: ["Follow-Up Testing Schedule Template"],
  },
  {
    id: 7,
    title: "Return to Safety-Sensitive Duties",
    description: "Employee may resume safety-sensitive functions after completing all requirements.",
    details: [
      "All SAP recommendations completed",
      "Negative return-to-duty test received",
      "Follow-up testing plan in place",
      "Employee signs acknowledgment of ongoing responsibilities",
    ],
    resources: ["Return to Duty Agreement", "Ongoing Compliance Checklist"],
  },
];

export default function RTDGuide() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b relative overflow-hidden">
        <img src={sectionRtdImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />
        <div className="container mx-auto px-4 lg:px-8 py-12 relative">
          <div className="flex items-center gap-3 mb-2">
            <Route className="h-6 w-6 text-primary" />
            <Badge variant="outline">Step-by-Step Guide</Badge>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold">Return-to-Duty (RTD) Process Guide</h1>
          <p className="text-muted-foreground mt-2">
            A step-by-step guide to the DOT Return-to-Duty process for SAPs and employers
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Introduction */}
          <Card className="border-2 border-primary">
            <CardHeader>
              <CardTitle>Understanding the RTD Process</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                The Return-to-Duty (RTD) process is required when a DOT-regulated employee has violated drug and alcohol testing regulations. This process ensures that employees who have violated the regulations complete appropriate education or treatment before returning to safety-sensitive duties.
              </p>
              <div className="bg-muted/50 p-4 rounded-md">
                <p className="text-sm font-medium mb-2">Key Requirements:</p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Evaluation and follow-up by a qualified SAP</li>
                  <li>Completion of recommended education or treatment</li>
                  <li>Negative return-to-duty test</li>
                  <li>Ongoing follow-up testing (minimum 6 tests in 12 months)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Flowchart */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Step-by-Step Process</h2>
            <div className="space-y-3">
              {rtdSteps.map((step, index) => (
                <div key={step.id}>
                  <Card
                    className={`hover-elevate cursor-pointer transition-all ${
                      activeStep === step.id ? "border-primary" : ""
                    }`}
                    onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                    data-testid={`card-rtd-step-${step.id}`}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            {activeStep === step.id ? (
                              <CheckCircle className="h-5 w-5 text-primary" />
                            ) : (
                              <Circle className="h-5 w-5 text-muted-foreground" />
                            )}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-4">
                            <div className="space-y-1 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <Badge variant="outline">Step {step.id}</Badge>
                                <CardTitle className="text-lg">{step.title}</CardTitle>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {step.description}
                              </p>
                            </div>
                            <ChevronRight
                              className={`h-5 w-5 text-muted-foreground transition-transform flex-shrink-0 ${
                                activeStep === step.id ? "rotate-90" : ""
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    {activeStep === step.id && (
                      <CardContent className="space-y-4 pt-0">
                        <div className="bg-muted/50 p-4 rounded-md space-y-3">
                          <p className="text-sm font-medium">Details:</p>
                          <ul className="text-sm text-muted-foreground space-y-2">
                            {step.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        {step.resources.length > 0 && (
                          <div>
                            <p className="text-sm font-medium mb-2">Available Resources:</p>
                            <div className="flex flex-wrap gap-2">
                              {step.resources.map((resource, idx) => (
                                <Button
                                  key={idx}
                                  variant="outline"
                                  size="sm"
                                  className="hover-elevate"
                                  data-testid={`button-resource-${step.id}-${idx}`}
                                >
                                  <Download className="mr-2 h-3 w-3" />
                                  {resource}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    )}
                  </Card>
                  {index < rtdSteps.length - 1 && (
                    <div className="flex justify-center py-2">
                      <div className="w-0.5 h-8 bg-border" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Important Notes */}
          <Card className="border-2 border-accent">
            <CardHeader>
              <CardTitle>Important Notes for SAPs and Employers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <p className="text-sm font-medium">For SAPs:</p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>All evaluations must be conducted face-to-face</li>
                  <li>SAP recommendations must be specific and documented</li>
                  <li>SAP cannot provide the treatment or education they recommend</li>
                  <li>Follow-up testing plan must include at least 6 tests in 12 months</li>
                </ul>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">For Employers:</p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Must provide SAP evaluation resources to employee</li>
                  <li>Cannot allow employee to perform safety-sensitive functions until RTD complete</li>
                  <li>Must conduct all follow-up tests as prescribed by SAP</li>
                  <li>Must report all violations and RTD completions to Clearinghouse</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
