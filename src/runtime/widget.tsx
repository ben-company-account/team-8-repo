import { AllWidgetProps } from "jimu-core"
import React from "jimu-core"
import { JimuMapView, JimuMapViewComponent } from "jimu-arcgis"
import { useState } from "react"

type State = {
    jimuMapView: JimuMapView
}

const Widget = (props: AllWidgetProps<unknown>)=> {

    const [state, setState] = useState<State>({ jimuMapView: null })

    const determineOrdering = (): void => {

    }



    const activeViewChangeHandler = (jmv: JimuMapView): void => {
        if (jmv) {
            setState((prevState) => ({
                ...prevState, jimuMapView: jmv
            }))
        }

        else {
            setState((prevState) => ({
                ...prevState, jimuMapView: null
            }))
        }
    }

    return (
        <JimuMapViewComponent
            useMapWidgetId={props.useMapWidgetIds?.[0]}
            onActiveViewChange={activeViewChangeHandler}
        />
    )
}