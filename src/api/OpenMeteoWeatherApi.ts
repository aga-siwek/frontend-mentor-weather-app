export type OpenMeteoWeatherApiUtils = {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    current_units: {
        time: string;
        interval: string;
        temperature_2m: string;
        relative_humidity_2m: string;
        apparent_temperature: string;
        precipitation: string;
    };

    current: {
        time: string;
        interval: number;
        temperature_2m: number;
        relative_humidity_2m: number;
        apparent_temperature: number;
        precipitation: number;
    };

    hourly_units: {
        time: string;
        temperature_2m: string;
        relative_humidity_2m: string;
        apparent_temperature: string;
        precipitation_probability: string;
        wind_speed_10m: string;
    };

    hourly: {
        time: string[];
        temperature_2m: number[];
        relative_humidity_2m: number[];
        apparent_temperature: number[];
        precipitation_probability: number[];
        wind_speed_10m: number[];
    };

    daily_units: {
        time: string;
        temperature_2m_max: string;
        temperature_2m_min: string;
    };

    daily: {
        time: string[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
    };
} | [];

interface ApiProps {
    onFailStatusChange: (status: boolean) => void;
    lat: string;
    lon: string;
    measureType: string
}

async function OnSearchOpenMeteoWeather({
                                            onFailStatusChange,
                                            lat,
                                            lon,
                                        }: ApiProps): Promise<OpenMeteoWeatherApiUtils> {

    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m`);

    if (response.status === 404) {
        onFailStatusChange(true)
        return []
    } else {
        const data = await response.json();
        onFailStatusChange(false)
        return data
    }
}

export default OnSearchOpenMeteoWeather