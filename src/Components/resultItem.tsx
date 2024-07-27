import Graphic from "@arcgis/core/Graphic"
import { JimuMapView } from "jimu-arcgis"
import React from "react"

const ResultItem = (graphic: Graphic, mapView: JimuMapView) => {


    const zoomTo = () => {
        mapView.view.extent = graphic.geometry.extent
    }

    return (
        <div className="result-item" onClick={zoomTo}>
            
        </div>
    )
}   

export default ResultItem