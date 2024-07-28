import Graphic from "@arcgis/core/Graphic"
import { JimuMapView } from "jimu-arcgis"
import React from "react"

const ResultItem = ({graphic, mapView}): React.ReactElement => {


    const zoomTo = () => {
        mapView.view.extent = graphic.geometry.extent
    }

    return (
        <div className="result-item" onClick={zoomTo}>
            thing
        </div>
    )
}   

export default ResultItem