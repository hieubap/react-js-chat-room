import React, { memo, useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "react-leaflet-markercluster/dist/styles.min.css";
import L from "leaflet";

const center = [15.8828276, 107.590866];

const MapComponent = memo(({ map, refGeoJson }) => {
  const [state, _setState] = useState({ current: null });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };
  const whenCreated = (m) => {
    // const zoomControl = new L.Control({ position: "topright" });
    // zoomControl.addTo(m);
    map.current = m;
  };
  useEffect(() => {
    setInterval(() => {
      navigator.geolocation.getCurrentPosition((p) => {
        console.log(p, { lat: p.coords.latitude, lng: p.coords.longitude });
        setState({
          current: { lat: p.coords.latitude, lng: p.coords.longitude },
        });
      });
    }, 3000);
  }, []);

  console.log(state, "state geo");

  return (
    <MapContainer
      fullscreenControl={{ pseudoFullscreen: true }}
      className="markercluster-map"
      center={center}
      zoom={5}
      style={{ height: "100%", width: "100%" }}
      whenCreated={whenCreated}
      boxZoom={false}
      // zoomControl={false}
      // zoomControl={L.control({ position: "bottomleft" })}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://server.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {state.current && (
        <Marker
          icon={L.icon({
            iconUrl:
              "https://cdn.iconscout.com/icon/free/png-256/location-3079544-2561454.png",

            iconSize: [32, 32],
          })}
          position={state.current}
        ></Marker>
      )}

      {/* <GroupMarker
        key={index}
        opacity={checks.some((c) => c === index) ? 1 : 0}
        dataPoints={dataPoints[m.dataIndex]}
        iconUrl={m.iconUrl}
        onVisiblePopup={onVisiblePopup}
      /> */}
      {/* <GeoPolygon refGeoJson={refGeoJson} /> */}
      {/* 
        <GeoPolygon refGeoJson={refGeoJson} />
        {visibleCircle && centerFocus && range && (
          <Circle
            center={centerFocus}
            pathOptions={{ color: "blue", fillColor: "blue" }}
            radius={range * 1000}
          />
        )} */}
    </MapContainer>
  );
});

export default MapComponent;
