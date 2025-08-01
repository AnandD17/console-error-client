import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Download, FileText } from "lucide-react";

const reports = [
  {
    id: 1,
    name: "Monthly Sales Report",
    date: "2024-01-15",
    type: "Sales",
    size: "2.3 MB",
  },
  {
    id: 2,
    name: "User Activity Report",
    date: "2024-01-14",
    type: "Analytics",
    size: "1.8 MB",
  },
  {
    id: 3,
    name: "Financial Summary",
    date: "2024-01-13",
    type: "Finance",
    size: "3.1 MB",
  },
  {
    id: 4,
    name: "Performance Metrics",
    date: "2024-01-12",
    type: "Performance",
    size: "1.2 MB",
  },
];

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Reports</h1>
        <Button>
          <FileText size={16} className="mr-2" />
          Generate Report
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>Latest generated reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <FileText size={20} className="text-blue-600" />
                    <div>
                      <p className="font-medium">{report.name}</p>
                      <p className="text-sm text-gray-500">
                        {report.date} • {report.size}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download size={16} className="mr-1" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Report Statistics</CardTitle>
            <CardDescription>Overview of report generation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Total Reports Generated</span>
                <span className="font-semibold">847</span>
              </div>
              <div className="flex justify-between">
                <span>This Month</span>
                <span className="font-semibold">23</span>
              </div>
              <div className="flex justify-between">
                <span>Average Size</span>
                <span className="font-semibold">2.1 MB</span>
              </div>
              <div className="flex justify-between">
                <span>Most Popular Type</span>
                <span className="font-semibold">Sales</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
