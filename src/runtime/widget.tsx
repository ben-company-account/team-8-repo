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
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Feature from "@arcgis/core/widgets/Feature";
import Graphic from "@arcgis/core/Graphic";
import { CalciteButton } from "calcite-components"  ;
import { ActivitiesList } from "../Components/activitySelection";
import { useEffect } from "react"
import ResultItem from "../Components/resultItem"

type State = {};

const Widget = (props: AllWidgetProps<unknown>): React.ReactElement => {
  const [state, setState] = useState<State>();

  const [mapView, setMapView] = useState<JimuMapView>(null);

  const [allFeatures, setAllFeatures] = useState<Graphic[]>(null);

    const [importantAttributes, setImportantAttributes] = useState<string[]>()

    const [topTenFeatures, setTopTenFeatures] = useState<Graphic[]>(null)

    const run = (): void => {
        determineOrdering()
        console.log(importantAttributes)
    }

    const determineOrdering = (): void => {
        console.log("SDFDS")
        // For each feature / graphic in our feature layer
        if (allFeatures) {
            console.log("SDFSDF")
            allFeatures.map((graph) => {
                var score = 0;

                // Go through every attribute in the feature 

                const graphAttributes: JSON = graph.attributes
                console.log(graphAttributes)

                Object.keys(graphAttributes).forEach((key: string) => {
                    if (key.endsWith("_score")){
                        if (importantAttributes.includes(key)) {
                            score += graph.attributes[key] * (importantAttributes.length - importantAttributes.indexOf(key))
                        }
                    }
                  });

                // Sets the score of the graphic 
                graph.attributes.score = score
            })
        }

        console.log(allFeatures)

        allFeatures.sort((a, b) => b.attributes.score - a.attributes.score)
        const topTen: Graphic[] = allFeatures.slice(0, 10)

        setTopTenFeatures(topTen)

    }


    const updateAllFeatures = async (jmv: JimuMapView): Promise<void> => {
        if (jmv && jmv.view) {
            console.log(jmv)
            console.log("HERE");
            await jmv.view.when();
            const allEditableLayers: __esri.Collection<
                FeatureLayer | __esri.SceneLayer | __esri.SubtypeGroupLayer
            > = jmv.view.map.editableLayers;

            console.log(allEditableLayers.length)

            const layer = new FeatureLayer({
                // URL to the service
                url: "https://services8.arcgis.com/LLNIdHmmdjO2qQ5q/arcgis/rest/services/LA_County_Parks___Open_Spaces_WFL1/FeatureServer/4"
            });

            console.log("SDFDSF")
            await layer.load()

            // console.log(layer)
            // console.log("SDFSDF")
            // console.log(layer.type)


            // // Will hopefully just be one feature layer
            // let featureLayers: __esri.Collection<FeatureLayer>

            // // Add layers of type FeatureLayer to the Colections object featureLayers 
            // allEditableLayers.map((lay) => {
            //     console.log("ESEHHSF")
            //     if (lay.type === "feature") {
            //         featureLayers.add(lay)
            //     }
            // })



            layer.queryFeatures().then((res: __esri.FeatureSet) => {
                console.log("HERE?")

                setAllFeatures(res.features)


            })

        }
        else {
            setAllFeatures(null)
        }

    }


    const activeViewChangeHandler = (jmv: JimuMapView): void => {
        if (jmv) {
            setMapView(jmv)
            updateAllFeatures(jmv)
            setImportantAttributes(["deer_score", "fern_pine_score"])
        } else {
            setMapView(jmv);
        }
    }
  

    return (
        <div className="widget">

            <ActivitiesList func={run}></ActivitiesList>

            hello
            <JimuMapViewComponent
                useMapWidgetId={props.useMapWidgetIds?.[0]}
                onActiveViewChange={activeViewChangeHandler}
            />

            {topTenFeatures && 
                topTenFeatures.map((graph) => (
                    <ResultItem graphic={graph} mapView={mapView}/>
                        
                ))
            }


        </div>

    )
}

export default Widget; 