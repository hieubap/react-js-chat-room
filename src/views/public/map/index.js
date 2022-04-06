import L from "leaflet";
import React, { useCallback, useEffect, useRef, useState } from "react";
import MapComponent from "./MapComponent";
import geoData from "./gadm.json";
// import "./styles.scss";

const MapWrapper = () => {
  const center = [15.8828276, 107.590866];
  const refGeoJson = useRef();
  const map = useRef();
  // const [map, setMap] = useState();
  const [state, _setState] = useState({
    geoData: [],
    showLeftBottom: true,
  });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };

  const onVisiblePopup = useCallback(({ item, ...data }) => {
    setState(data);
    map?.current?.panTo(new L.LatLng(item.toaDo[0], item.toaDo[1]));
  }, []);

  const handleGadmJson = () => {
    return (
      {
        type: "FeatureCollection",
        features: geoData.reduce(
          (acc, geo, index) => [
            ...acc,
            ...geo.location.map((i, idx) => ({
              type: "Feature",
              properties: { id: `${index}_${idx}`, title: geo.city },
              id: `${index}_${idx}`,
              geometry: {
                type: "Polygon",
                coordinates: [
                  i.map((j) => {
                    return [j.lng, j.lat];
                  }),
                ],
              },
            })),
          ],
          []
        ),
      } || {}
    );
  };

  useEffect(() => {
    setTimeout(() => {
      const newGeoState = {
        type: "FeatureCollection",
        features: handleGadmJson().features.map((geo) => {
          return {
            ...geo,
            properties: {
              ...geo.properties,
              color: "maroon",
            },
          };
        }),
      };

      setState({ geoData: newGeoState });
      refGeoJson.current?.clearLayers();
      refGeoJson.current?.addData(newGeoState);
      console.log(refGeoJson, "refGeoJson");
    });
  }, []);

  return (
    <MapComponent
      dataPoints={state.dataPoints}
      checks={state.checks}
      map={map}
      refGeoJson={refGeoJson}
      onVisiblePopup={onVisiblePopup}
      visibleCircle={state.scope}
      centerFocus={state.centerFocus}
      range={state.range}
    />
  );
};

export default MapWrapper;
