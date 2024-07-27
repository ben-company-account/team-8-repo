import { React, defaultMessages as jimuCoreDefaultMessages } from "jimu-core";
import { MapWidgetSelector } from "jimu-ui/advanced/setting-components";
import { type AllWidgetSettingProps } from "jimu-for-builder";
import {
    Button,
    Dropdown,
    Label,
    Tooltip,
    defaultMessages as jimuUIDefaultMessages,
} from "jimu-ui";
import {
    SettingSection,
    SettingRow,
} from "jimu-ui/advanced/setting-components";
import { InfoOutlined } from "jimu-icons/outlined/suggested/info";
import { type JimuMapView, MapViewManager } from "jimu-arcgis";
import { Immutable, type UseDataSource } from "jimu-core";
import {
    DataSourceSelector,
    AllDataSourceTypes,
} from "jimu-ui/advanced/data-source-selector";
import setting from "dist/widgets/common/timeline/src/setting/setting";

const Setting = (
    props: AllWidgetSettingProps<unknown>
): React.ReactElement => {
    const onMapSelected = (useMapWidgetIds: string[]): void => {
        console.log(props.id);
        console.log(props.useMapWidgetIds)
        console.log(`props: ${props}`)
        props.onSettingChange({
            id: props.id,
            useMapWidgetIds: useMapWidgetIds,
        });
    };


    return (
        <div className="ben-widget">
            <SettingSection title="sourceLabel">
                <SettingRow>
                    <Label
                        centric
                        tabIndex={0}
                        className="w-100 d-flex"
                        title={"selectMapWidget"}
                        aria-label={"selectMapWidget"}
                    >
                        <div className="ml-2 d-inline ep-tooltip">
                            {"selectMapWidget"}
                        </div>
                    </Label>

                    <Tooltip
                        tabIndex={0}
                        placement="top"
                        showArrow
                        aria-label={"selectMapWidgetHint"}
                        title={"selectMapWidgetHint"}
                    >
                        <div className="something">
                            <InfoOutlined size="m" />
                        </div>
                    </Tooltip>
                </SettingRow>

                <SettingRow>
                    <MapWidgetSelector
                        onSelect={onMapSelected}
                        useMapWidgetIds={props.useMapWidgetIds}
                    />
                </SettingRow>
            </SettingSection>
        </div>
    );
}

export default Setting; 