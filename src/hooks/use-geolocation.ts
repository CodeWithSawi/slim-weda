import { useCallback, useEffect, useState } from "react";
import type { Coordinates } from "@/api/type";

interface GeolocationState {
  coordinates: Coordinates | null;
  error: string | null;
  isLoading: boolean;
}

function requestLocation(): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        let message: string;

        switch (error.code) {
          case error.PERMISSION_DENIED:
            message =
              "Location permission denied. Please enable location access.";
            break;
          case error.POSITION_UNAVAILABLE:
            message = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            message = "Location request timed out.";
            break;
          default:
            message = "An unknown error occurred.";
        }

        reject(new Error(message));
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  });
}

export function useGeolocation() {
  const [locationData, setLocationData] = useState<GeolocationState>({
    coordinates: null,
    error: null,
    isLoading: true,
  });

  const getLocation = useCallback(async () => {
    setLocationData((previous) => ({
      ...previous,
      isLoading: true,
      error: null,
    }));

    try {
      const coordinates = await requestLocation();

      setLocationData({
        coordinates,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      setLocationData((previous) => ({
        ...previous,
        error:
          error instanceof Error ? error.message : "An unknown error occurred.",
        isLoading: false,
      }));
    }
  }, []);

  useEffect(() => {
    let active = true;

    requestLocation()
      .then((coordinates) => {
        if (!active) return;

        setLocationData({
          coordinates,
          error: null,
          isLoading: false,
        });
      })
      .catch((error: unknown) => {
        if (!active) return;

        setLocationData((previous) => ({
          ...previous,
          error:
            error instanceof Error
              ? error.message
              : "An unknown error occurred.",
          isLoading: false,
        }));
      });

    return () => {
      active = false;
    };
  }, []);

  return {
    ...locationData,
    getLocation,
  };
}
