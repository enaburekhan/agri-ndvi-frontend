import { useParams } from "react-router-dom";
import { useGetProjectQuery } from "./projectApi";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issue in Leaflet
const DefaultIcon = L.icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const projectId = Number(id);
  const { data: project, isLoading, isError } = useGetProjectQuery(projectId);

  if (isLoading)
    return <p className="p-4 text-center text-lg font-semibold">Loading...</p>;
  if (isError || !project)
    return (
      <p className="p-4 text-center text-red-600 font-semibold">
        Failed to load project.
      </p>
    );

  const lat = Number(project.latitude);
  const lng = Number(project.longitude);

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="bg-white shadow rounded-xl p-4">
        <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
        <p className="text-gray-600 mt-2">{project.description}</p>
        <div className="text-sm text-gray-500 mt-4">
          <p>
            <span className="font-semibold">Latitude:</span>
            {lat}
          </p>
          <p>
            <span className="font-semibold">Longitude:</span>
            {lng}
          </p>
        </div>
      </div>

      {/* Map Section */}
      <div className="h-[350px] md:h-[450px] w-full bg-gray-200 rounded-xl overflow-hidden shadow">
        <MapContainer
          center={{ lat, lng }}
          zoom={13}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={{ lat, lng }}>
            <Popup>
              <span className="font-semibold">{project.name}</span>
              <br />
              {project.description}
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* FUTURE SECTIONS */}
      <div className="bg-white shadow rounded-xl p-4">
        <h2 className="text-xl font-bold mb-2">Project Data</h2>
        <p className="text-gray-600 text-sm">
          NDVI uploads, processed results and reports will appear here.
        </p>
      </div>
    </div>
  );
}
