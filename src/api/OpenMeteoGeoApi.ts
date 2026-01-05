

export interface LocationResult {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    elevation: number;
    feature_code: string;
    country_code: string;
    admin1_id: number;
    admin2_id: number;
    admin3_id: number;
    timezone: string;
    population: number;
    country_id: number;
    country: string;
    admin1: string;
    admin2: string;
    admin3: string;
}

export interface OpenMeteoGeoApiUtils {
    results: LocationResult[] | {};
    generationtime_ms: number;
}

interface ApiProps {
    searchPlace: string;
    onFailStatusChange: (status: boolean) => void;
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function onSearchOpenMeteoGeo({ searchPlace = "Warsaw", onFailStatusChange }: ApiProps) {
    console.log("start api open meteo geo");
    await delay(1000);
    const correctSearch: string = searchPlace.toLowerCase().trim().replaceAll(" ", "%20");
    const link = `https://geocoding-api.open-meteo.com/v1/search?name=${correctSearch}&count=10&language=en&format=json`
    console.log(link);
    const response = await fetch(
        link,
        {
            method: "GET",
            headers: {
                "User-Agent": "mySimpleWeatherAppFromFrontendMentorByAga (+mailto:aga@gmail.com)"
            }
        }
    );
    console.log("response geo api", response)
    if (response.status === 404) {
        onFailStatusChange(true);
        return {};
    }
    const data: OpenMeteoGeoApiUtils = await response.json();
    onFailStatusChange(false);
    console.log("open meteo api geo", data);
    return data;
}

export default onSearchOpenMeteoGeo;
