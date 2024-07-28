/*
1. Weighting algorithm 
2. UI (inputs / results) 
3. Zoom to functionality 
4. Survey 123
5. 


*/

import { AllWidgetProps } from "jimu-core";
import React from "react";
import { JimuMapView, JimuMapViewComponent } from "jimu-arcgis";
import { useState } from "react";
// import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Feature from "@arcgis/core/widgets/Feature";
import Graphic from "@arcgis/core/Graphic";
import { CalciteButton } from "calcite-components";
import { useEffect } from "react";
import ResultItem from "../Components/resultItem";
import { CalciteLabel } from "calcite-components";
import { ActivitiesList } from "../Components/activitySelection";
import FeatureLayer from "esri/layers/FeatureLayer"
import WebMap from "@arcgis/core/WebMap";
import esriRequest from 'esri/request';

import jsonObj from "./thing.json"



const Widget = (props: AllWidgetProps<unknown>): React.ReactElement => {

  const [mapView, setMapView] = useState<JimuMapView>(null);

  const [allFeatures, setAllFeatures] = useState<Graphic[]>(null);

  const [importantAttributes, setImportantAttributes] = useState<string[]>();

  const [topTenFeatures, setTopTenFeatures] = useState<Graphic[]>(null);

  const run = (): void => {
    console.log("run is running");
    determineOrdering();
  };
  const handleEvent = (selected): void => {
    setImportantAttributes(selected);
  };
  const determineOrdering = (): void => {
    console.log("SDFDS");
    // For each feature / graphic in our feature layer
    if (allFeatures) {
      console.log("SDFSDF");
      allFeatures.map((graph) => {
        var score = 0;

        // Go through every attribute in the feature

        const graphAttributes: JSON = graph.attributes;
        console.log(graphAttributes);

        Object.keys(graphAttributes).forEach((key: string) => {
          if (key.endsWith("_score")) {
            if (importantAttributes.includes(key)) {
              score +=
                graph.attributes[key] *
                (importantAttributes.length - importantAttributes.indexOf(key));
            }
          }
        });

        // Sets the score of the graphic
        graph.attributes.score = score;
      });
    }

    console.log(allFeatures);

    allFeatures.sort((a, b) => b.attributes.score - a.attributes.score);
    const topTen: Graphic[] = allFeatures.slice(0, 10);

    setTopTenFeatures(topTen);
  };

  const updateAllFeatures = async (jmv: JimuMapView): Promise<void> => {
    if (jmv && jmv.view) {
      console.log(jmv);
      console.log("HERE");
      await jmv.view.when();
      const allEditableLayers: __esri.Collection<
        FeatureLayer | __esri.SceneLayer | __esri.SubtypeGroupLayer
      > = jmv.view.map.editableLayers;

      const graphics: __esri.Collection<Graphic> = jmv.view.graphics

      for (const graph of graphics) {
        console.log(graph)
      }


      console.log(jsonObj)
      // for (const obj in jsonObj.objectIds){
      //   esriRequest("https://services8.arcgis.com/LLNIdHmmdjO2qQ5q/arcgis/rest/services/LA_County_Parks___Open_Spaces_WFL1/FeatureServer/4/query", 
      //     {
      //       responseType: "json",
      //       body: `
      //       {

      //       }`
      //     }
      //   )


      esriRequest("https://services8.arcgis.com/LLNIdHmmdjO2qQ5q/arcgis/rest/services/LA_County_Parks___Open_Spaces_WFL1/FeatureServer/4/query", {
        responseType: "json", 
        query: {
          f: "json", 
          where: "1=1"
        }
      }).then(res => {
        console.log(res)
        
      })

        esriRequest("https://services8.arcgis.com/LLNIdHmmdjO2qQ5q/arcgis/rest/services/LA_County_Parks___Open_Spaces_WFL1/FeatureServer/4/query", {
          responseType: "json",
          query: {
            f: "json",
            objectIds: 1354
          }
      }
    ).then((response) => {
      // Access the feature from the response
      const feature = response.data.features[0];
    
      // Create a graphic using the feature's geometry and attributes
      const graphic = new Graphic({
        geometry: feature.geometry,
        attributes: feature.attributes
      });
    
      // Use the graphic in your code
      console.log(graphic);
    }).catch((error) => {
      // Handle any errors that occur during the request
      console.error('Error:', error);
    });




      // const layer = new FeatureLayer({
      //   // URL to the service
      //   url: "https://services8.arcgis.com/LLNIdHmmdjO2qQ5q/arcgis/rest/services/LA_County_Parks___Open_Spaces_WFL1/FeatureServer/4",
      // });

      // console.log("SDFDSF");
      // await layer.load();

      // layer.queryFeatures().then((res: __esri.FeatureSet) => {
      //   console.log("HERE?");

      //   setAllFeatures(res.features);
      //   console.log("all features set");
      // });
    } else {
      setAllFeatures(null);
      console.log("all features not selected");
    }
  };

  const activeViewChangeHandler = (jmv: JimuMapView): void => {
    if (jmv) {
      setMapView(jmv);
      updateAllFeatures(jmv);
      //setImportantAttributes(["deer_score", "fern_pine_score"]);
    } else {
      setMapView(jmv);
    }
  };

  return (
    <div className="widget">
      {/* <CalciteButton onClick={run}>RUN BUTTON</CalciteButton>
      hello */}
      <ActivitiesList
        locationListItems={
          topTenFeatures
            ? topTenFeatures.map((graph) => (
              <ResultItem graphic={graph} mapView={mapView} />
            ))
            : []
        }
        func={run}
        handleEvent={handleEvent}
      ></ActivitiesList>
      <JimuMapViewComponent
        useMapWidgetId={props.useMapWidgetIds?.[0]}
        onActiveViewChange={activeViewChangeHandler}
      />
    </div>
  );
};

export default Widget;
