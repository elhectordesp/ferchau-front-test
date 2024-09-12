export interface Forecast {
  probPrecipitacion: ProbPrecipitacion[];
  temperatura: Temperatura;
  unidadTemperatura: string;
  mediaTemperatura: number;
}

export interface ProbPrecipitacion {
  value: number;
  periodo: string;
}

export interface Temperatura {
  minima: number;
  maxima: number;
}
