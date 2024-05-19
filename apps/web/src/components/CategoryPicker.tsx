'use client';

import * as React from 'react';
import { Check, ListMusic, MapPin } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const categories = [
  {
    value: 'all',
    label: 'All Category',
  },
  {
    value: 'edm',
    label: 'EDM',
  },
  {
    value: 'mix',
    label: 'Mix',
  },
  {
    value: 'jazz',
    label: 'Jazz',
  },
  {
    value: 'pop',
    label: 'Pop',
  },
  {
    value: 'punk',
    label: 'Punk',
  },
  {
    value: 'rock',
    label: 'Rock',
  },
];

interface CategoryPickerProps {
  onChange: (category: string) => void;
}

export function CategoryPicker({ onChange }: CategoryPickerProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string>('all');

  const handleSelect = (currentValue: string) => {
    setValue(currentValue);
    setOpen(false);
    onChange(currentValue);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="mx-auto w-fit gap-2 rounded-none p-0 hover:bg-inherit"
        >
          <ListMusic className="h-4 w-4 shrink-0 opacity-50" />
          {value === 'all'
            ? 'All Category'
            : categories.find((category) => category.value === value)?.label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0">
        {open && (
          <Command>
            <CommandInput placeholder="Search location..." />
            <CommandEmpty>No location found.</CommandEmpty>
            <CommandGroup>
              <CommandList>
                {categories.map((category) => (
                  <CommandItem
                    key={category.value}
                    value={category.value}
                    onSelect={() => handleSelect(category.value)}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value === category.value ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                    {category.label}
                  </CommandItem>
                ))}
              </CommandList>
            </CommandGroup>
          </Command>
        )}
      </PopoverContent>
    </Popover>
  );
}
