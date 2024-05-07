'use client';

import { useEffect, useState } from 'react';
import loader from '@/lib/googleMapsLoader';

interface MapProps {
  address: string;
}

const Maps: React.FC<MapProps> = ({ address }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    loader
      .load()
      .then(() => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address }, (results, status) => {
          if (status === 'OK') {
            const mapOptions: google.maps.MapOptions = {
              center: results[0].geometry.location,
              zoom: 16,
            };
            const newMap = new google.maps.Map(
              document.getElementById('map') as HTMLElement,
              mapOptions,
            );
            const marker = new google.maps.Marker({
              position: results[0].geometry.location,
              map: newMap,
            });
            setMap(newMap);
          } else {
            console.error(
              'Geocode was not successful for the following reason:',
              status,
            );
          }
        });
      })
      .catch((error) => {
        console.error('Error loading Google Maps API:', error);
      });
  }, [address]);

  return <div id="map" style={{ height: '450px' }}></div>;
};

export default Maps;
