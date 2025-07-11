import React, { useRef, useEffect, useState } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";
import storeData from "../assets/walmart_stores.json";

const GlobeComponent = ({ onCountryClick }) => {
  const globeRef = useRef();
  const navigate = useNavigate();

  const [countries, setCountries] = useState([]);
  const [locations, setLocations] = useState([]);

  // 🌍 Load GeoJSON country polygons
  useEffect(() => {
    fetch("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
      .then((res) => res.json())
      .then((data) => setCountries(data.features));
  }, []);

  // 🏪 Load Walmart store locations
  useEffect(() => {
    setLocations(storeData);
  }, []);

  // 📌 Initial camera focus on USA + enable auto rotation
  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.pointOfView({ lat: 37.0902, lng: -95.7129, altitude: 2.2 }, 1500);
      setTimeout(() => {
        const controls = globeRef.current.controls();
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;
      }, 2000);
    }
  }, []);

  // 💡 Add ambient light
  useEffect(() => {
    if (globeRef.current) {
      const scene = globeRef.current.scene();
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);
    }
  }, []);

  // 👉 Handle store point click
  const handleStoreSelect = (store) => {
    localStorage.setItem("selectedStore", JSON.stringify(store));
    navigate("dashboard"); // 🔁 Redirect to layout page
  };

  return (
    <div className="relative h-[600px] w-full bg-gradient-to-br from-[#0b0b28] to-[#191970]">
      {/* Info overlay */}
      <div className="absolute top-4 left-4 z-50 bg-black/70 text-white px-4 py-2 rounded shadow-md text-sm">
        📍 Currently showing Walmart stores in the <b>United States</b>
      </div>

      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundColor="rgba(0, 0, 0, 0)"

        // 🌐 Country polygons
        polygonsData={countries}
        polygonAltitude={0.01}
        polygonCapColor={(d) =>
          d.properties?.name === "United States"
            ? "rgba(255, 165, 0, 0.7)"
            : "rgba(30, 144, 255, 0.2)"
        }
        polygonSideColor={() => "rgba(255, 255, 255, 0.05)"}
        polygonStrokeColor={(d) =>
          d.properties?.name === "United States" ? "#FFA500" : "#333"
        }
        onPolygonClick={(polygon) => {
          const name = polygon.properties?.name || "Unknown";
          onCountryClick(name);
        }}
        polygonLabel={({ properties: d }) => `<b>${d.name}</b>`}
        polygonsTransitionDuration={300}

        // 🧡 Store markers
        pointsData={locations}
        pointMaterial={new THREE.MeshBasicMaterial({
          color: "orange",
          transparent: true,
          opacity: 0.85,
          blending: THREE.AdditiveBlending
        })}
        pointLat={(d) => d.lat}
        pointLng={(d) => d.lng}
        pointLabel={(d) => `${d.store}, ${d.city}, ${d.state}`}
        pointColor={() => "orange"}
        pointRadius={0.15}
        pointAltitude={0.02}
        onPointClick={handleStoreSelect}
      />
    </div>
  );
};

export default GlobeComponent;
