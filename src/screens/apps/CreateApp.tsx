import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Card } from "@/components/ui/Card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface FormData {
  projectName: string;
  alertType: string;
  threshold: string;
  occurrenceType: string;
  timeFrame: string;
  notifyEmail: boolean;
}

export default function CreateApp() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    projectName: "",
    alertType: "high-priority",
    threshold: "10",
    occurrenceType: "a unique error in",
    timeFrame: "one minute",
    notifyEmail: true,
  });

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.projectName.trim()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Here you would typically make an API call to create the app
      console.log("Creating app:", formData);

      // Navigate back to dashboard or apps list
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating app:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <Card className="p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-white">
              Name your project and assign it a team
            </h1>
            <p className="text-gray-400 text-sm">
              Create a new application to start monitoring errors
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="project-name"
                className="text-white text-sm font-medium"
              >
                Project name
              </Label>
              <Input
                id="project-name"
                type="text"
                placeholder="Enter project name"
                value={formData.projectName}
                onChange={(e) => updateFormData("projectName", e.target.value)}
                className="w-full"
                disabled={isLoading}
                required
              />
            </div>

            {/* Alert Frequency Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium text-white">
                  Set your alert frequency
                </h3>
              </div>

              <div className="space-y-4 pl-8">
                {/* Alert Type Radio Buttons */}
                <RadioGroup
                  value={formData.alertType}
                  onValueChange={(value) => updateFormData("alertType", value)}
                  className="space-y-3"
                >
                  <label className="flex items-center gap-3 cursor-pointer">
                    <RadioGroupItem
                      value="high-priority"
                      disabled={isLoading}
                    />
                    <span className="text-white text-sm">
                      Alert me on high priority issues
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <RadioGroupItem
                      value="when-more-than"
                      disabled={isLoading}
                    />
                    <span className="text-white text-sm">
                      When there are more than
                    </span>
                  </label>

                  {/* Conditional threshold configuration */}
                  {formData.alertType === "when-more-than" && (
                    <div className="flex items-center gap-2 ml-7 flex-wrap">
                      <input
                        type="number"
                        value={formData.threshold}
                        onChange={(e) =>
                          updateFormData("threshold", e.target.value)
                        }
                        className="w-16 h-8 px-2 text-sm bg-white/10 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-[#5563F5]"
                        disabled={isLoading}
                        min="1"
                      />
                      <Select
                        value={formData.occurrenceType}
                        onValueChange={(value) =>
                          updateFormData("occurrenceType", value)
                        }
                        disabled={isLoading}
                      >
                        <SelectTrigger className="w-fit min-w-[140px] bg-white/10 border-gray-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          <SelectItem
                            value="occurrences of"
                            className="text-white hover:bg-white/10"
                          >
                            occurrences of
                          </SelectItem>
                          <SelectItem
                            value="a unique error in"
                            className="text-white hover:bg-white/10"
                          >
                            user affected by
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <span className="text-white text-sm">
                        A unique error in
                      </span>
                      <Select
                        value={formData.timeFrame}
                        onValueChange={(value) =>
                          updateFormData("timeFrame", value)
                        }
                        disabled={isLoading}
                      >
                        <SelectTrigger className="w-fit min-w-[120px] bg-white/10 border-gray-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          <SelectItem
                            value="one minute"
                            className="text-white hover:bg-white/10"
                          >
                            one minute
                          </SelectItem>
                          <SelectItem
                            value="five minutes"
                            className="text-white hover:bg-white/10"
                          >
                            five minutes
                          </SelectItem>
                          <SelectItem
                            value="ten minutes"
                            className="text-white hover:bg-white/10"
                          >
                            ten minutes
                          </SelectItem>
                          <SelectItem
                            value="one hour"
                            className="text-white hover:bg-white/10"
                          >
                            one hour
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <label className="flex items-center gap-3 cursor-pointer">
                    <RadioGroupItem value="custom" disabled={isLoading} />
                    <span className="text-white text-sm">
                      I'll create my own alerts later
                    </span>
                  </label>
                </RadioGroup>

                {/* Email Notification */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <Checkbox
                    checked={formData.notifyEmail}
                    onCheckedChange={(checked) =>
                      updateFormData(
                        "notifyEmail",
                        checked === "indeterminate" ? false : checked
                      )
                    }
                    disabled={isLoading}
                  />
                  <span className="text-white text-sm">Notify via email</span>
                </label>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={handleCancel}
                disabled={isLoading}
                className="flex-1 text-gray-400 hover:text-white hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!formData.projectName.trim() || isLoading}
                className="flex-1 bg-gradient-to-r from-[#5563F5] to-[#A284EC] hover:from-[#4F59E5] hover:to-[#9B7FE8] text-white font-medium"
              >
                {isLoading ? "Creating..." : "Create Project"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
