import { useEffect, useState } from "react";
import { getCoordinates } from "../../helpers/getCoordinates";
import { Project, ProjectWithCoordinates } from "../../interfaces/types";
import { getProjects } from "../../helpers/getData";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import myIcon from "../../assets/point.gif";

export const MapProjects = () => {
  const defaultCenter: LatLngExpression = [40.4168, -3.7038];

  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsLocations, setprojectsLocations] = useState<
    ProjectWithCoordinates[]
  >([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getProjects();
      setProjects(data);
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchProjectsLocation = async () => {
      const locations = await Promise.all(
        projects.map(async (project) => {
          const { address, postalCode } = project;
          const coordinates = await getCoordinates(address, postalCode);
          console.log(coordinates);
          return {
            ...project,
            coordinates,
          };
        })
      );
      setprojectsLocations(locations.filter((p) => p.coordinates));
    };
    fetchProjectsLocation();
  }, [projects]);

  const customIcon = new Icon({
    iconUrl: myIcon,
    iconSize: [30, 26],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
  return (
    <section style={{
      background:'red'
    }}>
      <div>
        <MapContainer
          maxZoom={18}
          center={defaultCenter}
          zoom={10}
          style={{ height: "80vh", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {projectsLocations.map((project, index) => (
            <Marker
              icon={customIcon}
              key={index}
              position={[project.coordinates!.lat, project.coordinates!.lon]}
            >
              <Popup>
                {project.title} <br /> {project.address}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
};
