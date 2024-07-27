import { AllWidgetProps } from "jimu-core"
import React from "react"
import { JimuMapView, JimuMapViewComponent } from "jimu-arcgis"
import { useState } from "react"
import FeatureLayer from "@arcgis/core/layers/FeatureLayer"
import Feature from "@arcgis/core/widgets/Feature"
import Graphic from "@arcgis/core/Graphic"

type State = {

}

const Widget = (props: AllWidgetProps<unknown>): React.ReactElement => {

    const [state, setState] = useState<State>()

    const [mapView, setMapView] = useState<JimuMapView>(null);

    const [allFeatures, setAllFeatures] = useState<Graphic[]>(null)

    const determineOrdering = (): void => {

    }

    const updateAllFeatures = async (): Promise<void> => {


        if (mapView) {
            console.log("HERE")
            await mapView.view.when()
            const allEditableLayers: __esri.Collection<FeatureLayer | __esri.SceneLayer | __esri.SubtypeGroupLayer> = mapView.view.map.editableLayers

            // Will hopefully just be one feature layer 
            const featureLayers: __esri.Collection<FeatureLayer> = new __esri.Collection<FeatureLayer>()

            // Add layers of type FeatureLayer to the Colections object featureLayers 
            for (const lay of allEditableLayers){
                if (lay.type === "feature"){
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
            hello
            <JimuMapViewComponent
                useMapWidgetId={props.useMapWidgetIds?.[0]}
                onActiveViewChange={activeViewChangeHandler}
            />
        </div>

    )
}

export default Widget; 