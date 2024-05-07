'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';

const TicketCounter = () => {
  const [numCount, setNumCount] = useState(1);

  const plus = () => {
    setNumCount(numCount + 1);
  };
  const minus = () => {
    setNumCount(numCount - 1);
  };
  const reset = () => {
    setNumCount(0);
  };
  return (
    <div className="flex place-items-center gap-4">
      <Button type="button" variant="outline" onClick={minus}>
        -
      </Button>
      <div>{numCount}</div>
      <Button type="button" variant="outline" onClick={plus}>
        +
      </Button>
    </div>
  );
};

export default TicketCounter;
