'use client';
import { auth } from '@edupulse/profile';
import { startSession } from '@edupulse/session';
import { Button } from '@feature/ui/components/button';
import { Play } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useState } from 'react';

interface Props {
  topicId: string;
  studentId: string;
}

export function StartSessionButton({ studentId, topicId }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setLoading(true);
    const response = await startSession({ studentId, topicId });
    console.log('StartSessionButton', response);
    setLoading(false);
    if (response.success) {
      router.push('/prep/session/' + response.data.sessionId);
    }
  };


  return (
    <Button
      onClick={handleClick}
      disabled={loading}
      size="sm"
      className="cursor-pointer bg-primary hover:bg-primary/90"
    >
      {loading ? (
        <div
          className="h-4 w-4"
          style={{ animation: 'flip 1s ease-in-out infinite' }}
        />
      ) : (
        <Play className="h-4 w-4" />
      )}
    </Button>
  );
}

export default StartSessionButton;
