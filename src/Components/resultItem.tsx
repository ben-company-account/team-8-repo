import Graphic from "@arcgis/core/Graphic"
import { JimuMapView } from "jimu-arcgis"
import React from "react"
import { CalciteListItem, CalciteAction } from "calcite-components"

const ResultItem = ({graphic, mapView}): React.ReactElement => {


    const zoomTo = () => {
        mapView.view.extent = graphic.geometry.extent
    }

    const questionMarkClickHandler = async (): Promise<void> => {
        
    }

    return (
        // change this to CalciteListItem and make on click OnCalciteListItemSelect={()=> zoomTo
        <CalciteListItem onCalciteListItemSelect={zoomTo} label={graphic.attributes.parkname}>
            <CalciteAction slot="actions-end"
            text=""
            icon="question-mark"
            scale="s"
            onClick={questionMarkClickHandler}
            />

            
        </CalciteListItem>
    )
}   

export default ResultItem