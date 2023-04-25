import React, { useCallback } from "react";
import ReactECharts from "echarts-for-react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import axios from "axios";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const queryClient = new QueryClient();
const MapView = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Example2 />
      <Example />

      <Example3 />
    </QueryClientProvider>
  );
};
var option;
function Example() {
  const { isLoading, error, data } = useQuery("repoData", async () =>
    axios
      .get("https://disease.sh/v3/covid-19/historical/all?lastdays=all")
      .then((r) => r)
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  if (data) {
    option = {
      title: {
        text: "Covid-19 ",
      },
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        data: Object.keys(data.data.cases),
      },
      yAxis: {
        type: "value",
      },
      legend: {
        data: ["Cases", "Deaths", "Recovered"],
      },
      series: [
        {
          data: Object.entries(data.data.cases).map((i, r) => i),
          name: "Cases",
          type: "line",
        },
        {
          data: Object.entries(data.data.deaths).map((i, r) => i),
          name: "Deaths",
          type: "line",
        },
        {
          data: Object.entries(data.data.recovered).map((i, r) => i),
          name: "Recovered",
          type: "line",
        },
      ],
    };
  }

  return <ReactECharts option={option} />;
}

function Example2() {
  const { isLoading, error, data } = useQuery("repoData2", async () =>
    axios.get("https://disease.sh/v3/covid-19/all").then((r) => r)
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      {data && (
        <div className="flex flex-wrap justify-between align-center">
          {Object.entries(data.data).map((k, v) => {
            return (
              <h1 key={v} className="w-[200px] flex flex-col text-center my-3">
                <span className="bg-gray-200 p-2 font-medium text-gray-600">
                  {k[0].toUpperCase()}
                </span>{" "}
                <span className="p-2 text-gray-600">{k[1]}</span>
              </h1>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Example3() {
  const { isLoading, error, data } = useQuery("repoData3", async () =>
    axios.get("https://disease.sh/v3/covid-19/countries").then((r) => r)
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      {data && (
        <MapContainer
          center={[51.505, -0.09]}
          zoom={3}
          scrollWheelZoom={true}
          style={{ height: "600px", width: "100wh" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {data.data.map((k, v) => {
            let iconPerson = L.icon({
              iconUrl: k.countryInfo.flag,
              iconSize: [35, 22], // size of the icon
            });
            return (
              <Marker
                position={[k.countryInfo.lat, k.countryInfo.long]}
                icon={iconPerson}
                key={v}
              >
                <Popup>
                  <h1>{k.country}</h1>
                  <h1>
                    Total Cases: <span>{k.active}</span>
                  </h1>
                  <h1>
                    Total Deaths: <span>{k.recovered}</span>
                  </h1>
                  <h1>
                    Total Recovered: <span>{k.deaths}</span>
                  </h1>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      )}
    </div>
  );
}
export default MapView;
