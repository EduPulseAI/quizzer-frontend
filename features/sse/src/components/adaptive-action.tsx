'use client';

import type { AdaptAction } from '../lib/types';

interface AdaptiveActionProps {
  action: AdaptAction;
  onDismiss?: () => void;
}

export function AdaptiveActionDisplay({ action, onDismiss }: AdaptiveActionProps) {
  const getActionIcon = (type: AdaptAction['actionType']) => {
    switch (type) {
      case 'DIFFICULTY_ADJUST':
        return '📊';
      case 'HINT_PROVIDED':
        return '💡';
      case 'CONTENT_SWITCH':
        return '🔄';
      case 'BREAK_SUGGESTED':
        return '☕';
    }
  };

  const getActionTitle = (type: AdaptAction['actionType']) => {
    switch (type) {
      case 'DIFFICULTY_ADJUST':
        return 'Difficulty Adjusted';
      case 'HINT_PROVIDED':
        return 'Hint Provided';
      case 'CONTENT_SWITCH':
        return 'Content Switched';
      case 'BREAK_SUGGESTED':
        return 'Break Suggested';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{getActionIcon(action.actionType)}</span>
          <div>
            <h3 className="text-lg font-semibold">
              {getActionTitle(action.actionType)}
            </h3>
            <p className="text-sm text-gray-500">
              {action.modelMetadata.modelName} v{action.modelMetadata.modelVersion}
            </p>
          </div>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      {/* Difficulty Adjustment */}
      {action.difficultyAdjustment && (
        <div className="mb-4 p-4 bg-blue-50 rounded-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Level Change:</span>
            <span className="text-lg font-bold">
              {action.difficultyAdjustment.fromLevel} → {action.difficultyAdjustment.toLevel}
            </span>
          </div>
          <p className="text-sm text-gray-700">
            {action.difficultyAdjustment.reason}
          </p>
          <div className="mt-2 text-xs text-gray-500">
            Expected Reward: {(action.difficultyAdjustment.expectedReward * 100).toFixed(1)}%
          </div>
        </div>
      )}

      {/* Hint Content */}
      {action.hintContent && (
        <div className="mb-4 p-4 bg-yellow-50 rounded-md border-l-2 border-yellow-400">
          <p className="text-sm">{action.hintContent}</p>
        </div>
      )}

      {/* Model Metadata */}
      <div className="flex items-center gap-4 text-xs text-gray-500">
        <span>Latency: {action.modelMetadata.inferenceLatencyMs}ms</span>
        {action.modelMetadata.confidence !== undefined && (
          <span>
            Confidence: {(action.modelMetadata.confidence * 100).toFixed(1)}%
          </span>
        )}
      </div>
    </div>
  );
}