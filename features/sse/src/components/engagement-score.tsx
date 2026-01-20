
import { EngagementScore as Score } from '../lib/types';

interface EngagementScoreProps {
  score: Score;
}

export function EngagementScoreDisplay({ score }: EngagementScoreProps) {
  const getScoreColor = (value: number) => {
    if (value >= 0.7) return 'text-green-600';
    if (value >= 0.4) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTrendIcon = (trend: Score['trend']) => {
    switch (trend) {
      case 'RISING':
        return '↗️';
      case 'STABLE':
        return '➡️';
      case 'DECLINING':
        return '↘️';
      case 'CRITICAL':
        return '⚠️';
    }
  };

  const percentage = (score.score * 100).toFixed(1);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Engagement Score</h3>

      {/* Main Score */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className={`text-4xl font-bold ${getScoreColor(score.score)}`}>
            {percentage}%
          </div>
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <span>{score.trend}</span>
            <span>{getTrendIcon(score.trend)}</span>
          </div>
        </div>

        {/* Progress Circle */}
        <div className="relative w-24 h-24">
          <svg className="transform -rotate-90 w-24 h-24">
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-200"
            />
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={`${score.score * 251.2} 251.2`}
              className={getScoreColor(score.score)}
            />
          </svg>
        </div>
      </div>

      {/* Component Breakdown */}
      <div className="space-y-2">
        <ScoreBar
          label="Dwell Time"
          value={score.scoreComponents.dwellScore}
        />
        <ScoreBar
          label="Accuracy"
          value={score.scoreComponents.accuracyScore}
        />
        <ScoreBar
          label="Pacing"
          value={score.scoreComponents.pacingScore}
        />
        {score.scoreComponents.attentionScore !== undefined && (
          <ScoreBar
            label="Attention"
            value={score.scoreComponents.attentionScore}
          />
        )}
      </div>

      {/* Alert */}
      {score.alertThresholdCrossed && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-800 font-medium">
            ⚠️ Alert: Engagement below threshold
          </p>
        </div>
      )}
    </div>
  );
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  const percentage = (value * 100).toFixed(0);

  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}