'use client';

import useGetEventsByOrganizer from '@/hooks/api/event/useGetEventsByOrganizer';
import { appConfig } from '@/utils/config';
import { debounce } from 'lodash';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AsyncSelect from 'react-select/async';

interface EventOption {
  value: number;
  label: string;
}

const Autocomplete = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>('');
  const { data, isLoading } = useGetEventsByOrganizer({
    search,
    id: 0,
  });

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

  const debouncedLoadOptions = debounce(loadOptions, 2000);

  return (
    <AsyncSelect
      placeholder="Search for events"
      className="absolute w-full "
      loadOptions={debouncedLoadOptions}
      isLoading={isLoading}
      theme={(theme) => ({
        ...theme,
        borderRadius: 10,
        colors: {
          ...theme.colors,
          primary25: '#f4f4f4',
          primary: '#fff',
          neutral20: '#fff',
          neutral60: '#fff',
        },
      })}
      onChange={(blog) => {
        router.push(appConfig.baseUrlNext + `/${blog?.value}`);
      }}
    />
  );
};

export default Autocomplete;
