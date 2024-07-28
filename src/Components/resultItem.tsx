import Graphic from "@arcgis/core/Graphic"
import { JimuMapView } from "jimu-arcgis"
import React from "react"
import { CalciteListItem } from "calcite-components"

const ResultItem = ({graphic, mapView}): React.ReactElement => {


    const zoomTo = () => {
        mapView.view.extent = graphic.geometry.extent
    }

    return (
        // change this to CalciteListItem and make on click OnCalciteListItemSelect={()=> zoomTo
        <CalciteListItem onCalciteListItemSelect={zoomTo} label={graphic.attributes.parkname}>
            
        </CalciteListItem>
    )
}   

export default ResultItem