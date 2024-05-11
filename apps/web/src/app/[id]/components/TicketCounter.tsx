'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';

const TicketCounter = () => {
  const [numCount, setNumCount] = useState(1);

  const plus = () => {
    setNumCount(numCount + 1);
  };
  const minus = () => {
    if (numCount > 1) {
      setNumCount(numCount - 1);
    }
  };
  return (
    <div className="flex place-items-center gap-4">
      <Button
        type="button"
        variant="outline"
        onClick={minus}
        disabled={numCount === 1}
        className="rounded-xl"
      >
        -
      </Button>
      <div>{numCount}</div>
      <Button
        type="button"
        variant="outline"
        onClick={plus}
        className="rounded-xl"
      >
        +
      </Button>
    </div>
  );
};

export default TicketCounter;
