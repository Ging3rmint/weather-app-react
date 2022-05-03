interface WeatherInfoTypes {
  temp_max: number;
  temp_min: number;
  humidity: number;
  weather: { id: number; main: string; description: string; icon: string }[];
  country: string;
  name: string;
  dateTime: string;
}

export type { WeatherInfoTypes };
