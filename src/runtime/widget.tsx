/*
1. Weighting algorithm 
2. UI (inputs / results) 
3. Zoom to functionality 
4. Survey 123
5. 


*/


import { AllWidgetProps } from "jimu-core"
import React from "react"
import { JimuMapView, JimuMapViewComponent } from "jimu-arcgis"
import { useState } from "react"
import FeatureLayer from "@arcgis/core/layers/FeatureLayer"
import Feature from "@arcgis/core/widgets/Feature"
import Graphic from "@arcgis/core/Graphic"
import { CalciteButton } from "calcite-components"

type State = {

}

const Widget = (props: AllWidgetProps<unknown>): React.ReactElement => {

    const [state, setState] = useState<State>()

    const [mapView, setMapView] = useState<JimuMapView>(null);

    const [allFeatures, setAllFeatures] = useState<Graphic[]>(null)

    const [importantAttributes, setImportantAttributes] = useState<string[]>()

    const run = (): void => {
        determineOrdering()
    }

    const determineOrdering = (): void => {

        // For each feature / graphic in our feature layer 
        if (allFeatures) {

            allFeatures.map((graph) => {
                var score = 0

                // Go through every attribute in the feature 
                graph.attributes.map((prop: string) => {

                    // If the feature attribute ends in _score
                    if (prop.endsWith("_score")) {

                        // If that attribute is actually important to the teacher 
                        if (importantAttributes.includes(prop)) {
                            score += graph.attributes[prop] * (importantAttributes.length - importantAttributes.indexOf(prop))
                        }

                    }
                })

                // Sets the score of the graphic 
                graph.attributes.score = score
            })
        }
    }

    const updateAllFeatures = async (): Promise<void> => {


        if (mapView) {
            console.log("HERE")
            await mapView.view.when()
            const allEditableLayers: __esri.Collection<FeatureLayer | __esri.SceneLayer | __esri.SubtypeGroupLayer> = mapView.view.map.editableLayers

            // Will hopefully just be one feature layer 
            const featureLayers: __esri.Collection<FeatureLayer> = new __esri.Collection<FeatureLayer>()

            // Add layers of type FeatureLayer to the Colections object featureLayers 
            for (const lay of allEditableLayers) {
                if (lay.type === "feature") {
                    featureLayers.add(lay)
                }
            }

            const featureLayer: FeatureLayer = featureLayers.at(0)
            featureLayer.queryFeatures().then((res: __esri.FeatureSet) => {

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
        }

        else {
            setMapView(jmv)
        }
    }

    return (
        <div className="widget">

            <CalciteButton onClick={run}>
                RUN BUTTON
            </CalciteButton>
            hello
            <JimuMapViewComponent
                useMapWidgetId={props.useMapWidgetIds?.[0]}
                onActiveViewChange={activeViewChangeHandler}
            />


        </div>

    )
}

export default Widget; 