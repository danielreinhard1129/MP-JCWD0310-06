'use client';

import useGetEvents from '@/hooks/api/event/useGetEvents';
import { appConfig } from '@/utils/config';
import { debounce } from 'lodash';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AsyncSelect from 'react-select/async';
import { Check, ChevronsUpDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandDialog,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface EventOption {
  value: number;
  label: string;
}

const Autocomplete = () => {
  const router = useRouter();

  const [search, setSearch] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const { data, isLoading } = useGetEvents({ search });

  const loadOptions = (
    inputValue: string,
    callback: (options: EventOption[]) => void,
  ) => {
    try {
      const options = data.map((event) => {
        return {
          label: event.title,
          value: event.id,
        };
      });
      callback(options);
      setSearch(inputValue);
    } catch (error) {
      callback([]);
    }
  };

  const debouncedLoadOptions = debounce(loadOptions, 750);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="flex w-full justify-start gap-2 bg-inherit"
        >
          <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          {search
            ? data.find((event) => event.title === search)?.title
            : 'Search event...'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="hidden p-0">
        {/* <Command>
          <CommandInput placeholder="Search events..." />
          <CommandEmpty>No event found.</CommandEmpty>
          <CommandList>
            {data.map((event) => (
              <CommandItem
                key={event.title}
                value={event.title}
                onSelect={(currentValue) => {
                  setSearch(currentValue === search ? '' : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    search === event.title ? 'opacity-100' : 'opacity-0',
                  )}
                />
                {event.title}
              </CommandItem>
            ))}
          </CommandList>
        </Command> */}
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Search events" />
          <CommandList>
            <CommandEmpty>No events found.</CommandEmpty>
            {data.map((event) => (
              <CommandItem
                key={event.title}
                value={String(event.id)}
                onSelect={(event) => {
                  router.push(appConfig.baseUrlNext + `/${event}`)
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    search === event.title ? 'opacity-100' : 'opacity-0',
                  )}
                />
                {event.title}
              </CommandItem>
            ))}
          </CommandList>
        </CommandDialog>
      </PopoverContent>
    </Popover>
    // <AsyncSelect
    //   placeholder="Search for events"
    //   className="mx-auto my-4 max-w-[650px] w-full absolute"
    //   loadOptions={debouncedLoadOptions}
    //   isLoading={isLoading}
    //   onChange={(event) => {
    //     router.push(appConfig.baseUrlNext + `/${event?.value}`);
    //   }}
    // />
  );
};

export default Autocomplete;
