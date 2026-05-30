import { calcExportScore, type Grade } from "@/lib/mock-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertCircle, Lightbulb } from "lucide-react";

interface Props {
  grade: Grade;
  quantityTons: number;
  packaging: string;
  certified: boolean;
  compact?: boolean;
}

export function ExportScoreCard({ grade, quantityTons, packaging, certified, compact }: Props) {
  const { score, strengths, improvements, recommendations } = calcExportScore({ grade, quantityTons, packaging, certified });
  const tone = score >= 85 ? "text-primary" : score >= 60 ? "text-chart-3" : "text-destructive";

  return (
    <Card className="shadow-card">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-baseline justify-between">
          <span>Export Readiness</span>
          <span className={`text-3xl font-bold ${tone}`}>{score}<span className="text-sm text-muted-foreground">/100</span></span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={score} className="h-2" />
        {!compact && (
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <div className="mb-1 flex items-center gap-1.5 text-sm font-medium text-primary"><CheckCircle2 className="h-4 w-4" /> Strengths</div>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {strengths.map((s) => <li key={s}>• {s}</li>)}
                {strengths.length === 0 && <li>—</li>}
              </ul>
            </div>
            <div>
              <div className="mb-1 flex items-center gap-1.5 text-sm font-medium text-chart-4"><AlertCircle className="h-4 w-4" /> Improve</div>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {improvements.map((s) => <li key={s}>• {s}</li>)}
                {improvements.length === 0 && <li>—</li>}
              </ul>
            </div>
          </div>
        )}
        {!compact && recommendations.length > 0 && (
          <div className="rounded-lg bg-secondary p-3 text-sm">
            <div className="mb-1 flex items-center gap-1.5 font-medium"><Lightbulb className="h-4 w-4 text-primary" /> Recommendation</div>
            <div className="text-muted-foreground">{recommendations[0]}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
