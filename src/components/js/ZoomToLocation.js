import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const ZoomToLocation = ({ lat, lng }) => {
  const map = useMap();

  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], 12); // ซูมแผนที่ไปยังตำแหน่ง lat, lng และซูมระดับ 12
    }
  }, [lat, lng, map]);

  return null;
};

export default ZoomToLocation;
