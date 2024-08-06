import { Suspense, useEffect, useState } from "react";
import { getCoordinates } from "../../helpers/getCoordinates";
import { Project, ProjectWithCoordinates } from "../../interfaces/types";
import { getProjects } from "../../helpers/getData";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import myIcon from "../../assets/point.png";
import { Link } from "wouter";
import "./MapProjects.css";

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
      const locations = await Promise.allSettled(
        projects.map(async (project) => {
          const { address, postalCode } = project;
          const coordinates = await getCoordinates(address, postalCode);
          try {
            return {
              ...project,
              coordinates,
            };
          } catch (error) {
            console.log(error);
            return {
              ...project,
              coordinates:null
            };
          }
        
        })
      );
      const successfulLocations = locations
      .filter((result) => result.status === 'fulfilled')
      .map((result) => (result as PromiseFulfilledResult<ProjectWithCoordinates>).value);


      setprojectsLocations(successfulLocations);
    };
    fetchProjectsLocation();
  }, [projects]);

  const customIcon = new Icon({
    iconUrl: myIcon,
    iconSize: [30, 33],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <Suspense fallback="Loading . . .">
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
              <Popup className="pop-up">
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.address}</p>
                  <p>{project.postalCode}</p>
                  <Link to={`/projects/${project.id}`}>
                    <button>View Project</button>
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </Suspense>
  );
};
