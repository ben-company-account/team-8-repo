import React, { useEffect } from "react";
import { useState } from "react";
import {
  CalciteList,
  CalciteListItem,
  CalciteBlock,
  CalcitePanel,
  CalciteButton,
  CalciteTab,
  CalciteTabNav,
  CalciteTabTitle,
  CalciteTabs,
} from "@esri/calcite-components-react";
import { treeTypesDict } from "../runtime/activitiesManifest";
import { plantsAnimalsDict } from "../runtime/activitiesManifest";
import { activitiesDict } from "../runtime/activitiesManifest";
import { otherAmenitiesDict } from "../runtime/activitiesManifest";

interface Props {
  func: () => void;
  locationListItems?: any[];
  handleEvent: (selected) => void;
}

export const ActivitiesList = (props: Props): JSX.Element => {
  //list of keys that will be used for making fields in comboboxes
  const treeListItems = [];
  const plantAnimalItems = [];
  const activitiesItems = [];
  const amenities = [];
  const [rankingItems, setRankingItems] = useState<string[]>([]);
  const [htmlItems, setHtmlItems] = useState<any[]>([]);
  const [finalRanking, setFinalRanking] = useState<string[]>([]);
  const [locationItems, setLocationItems] = useState<any[]>([]);
  useEffect(() => {
    if (props.locationListItems) {
      setLocationItems(props.locationListItems);
    }
  }, [props.locationListItems]);
  useEffect(() => {
    props.handleEvent(finalRanking);
  }, [finalRanking, props]);
  useEffect(() => {
    setHtmlItems(
      rankingItems.map((item) => (
        <CalciteListItem label={item}></CalciteListItem>
      ))
    );
  }, [rankingItems]);
  for (const tree in treeTypesDict) {
    treeListItems.push(
      <CalciteListItem label={treeTypesDict[tree]}></CalciteListItem>
    );
  }
  for (const poa in plantsAnimalsDict) {
    plantAnimalItems.push(
      <CalciteListItem label={plantsAnimalsDict[poa]}></CalciteListItem>
    );
  }
  for (const activity in activitiesDict) {
    activitiesItems.push(
      <CalciteListItem label={activitiesDict[activity]}></CalciteListItem>
    );
  }
  for (const other in otherAmenitiesDict) {
    amenities.push(
      <CalciteListItem label={otherAmenitiesDict[other]}></CalciteListItem>
    );
  }

  return (
    <CalcitePanel>
      <div style={{ maxHeight: "600px", overflowY: "auto", padding: "10px" }}>
        <CalciteTabs>
          <CalciteTabNav slot="title-group">
            <CalciteTabTitle selected>Filters</CalciteTabTitle>
            <CalciteTabTitle>Results</CalciteTabTitle>
          </CalciteTabNav>
          <CalciteTab>
            <CalciteBlock collapsible open heading="trees">
              <CalciteList
                label="Trees"
                selectionMode="multiple"
                onCalciteListChange={(evt) => {
                  const items = new Set([
                    ...rankingItems,
                    ...evt.target.selectedItems.map((item) => item.label),
                  ]);
                  setRankingItems([...items]);
                }}
              >
                {treeListItems}
              </CalciteList>
            </CalciteBlock>
            <CalciteBlock collapsible heading="Plants and Animals">
              <CalciteList
                label="Plants and animals"
                selectionMode="multiple"
                onCalciteListChange={(evt) => {
                  const items = new Set([
                    ...rankingItems,
                    ...evt.target.selectedItems.map((item) => item.label),
                  ]);
                  setRankingItems([...items]);
                }}
              >
                {plantAnimalItems}
              </CalciteList>
            </CalciteBlock>
            <CalciteBlock collapsible heading="Activities">
              <CalciteList
                label="Activities"
                selectionMode="multiple"
                onCalciteListChange={(evt) => {
                  const items = new Set([
                    ...rankingItems,
                    ...evt.target.selectedItems.map((item) => item.label),
                  ]);
                  setRankingItems([...items]);
                }}
              >
                {activitiesItems}
              </CalciteList>
            </CalciteBlock>
            <CalciteBlock collapsible heading="Other Amenitites">
              <CalciteList
                label="Amenities"
                selectionMode="multiple"
                onCalciteListChange={(evt) => {
                  const selectedItemLabels = evt.target.selectedItems.map(
                    (item) => item.label
                  );
                  //const items = new Set([...rankingItems, ...selectedItemLabels]);
                  const set1 = new Set(rankingItems);
                  const set2 = new Set(selectedItemLabels);
                  const overlap = new Set(
                    [...set1].filter((item) => set2.has(item))
                  );
                  //console.log(`Overlap: ${[...overlap].join(", ")}`);

                  // Step 3: Exclude the overlap
                  const set1Exclusive = new Set(
                    [...set1].filter((item) => !overlap.has(item))
                  );
                  const set2Exclusive = new Set(
                    [...set2].filter((item) => !overlap.has(item))
                  );

                  // Step 4: Combine the results
                  const result = [...set1Exclusive, ...set2Exclusive];
                  //console.log(`Result: ${result.join(", ")}`);
                  setRankingItems(result);
                }}
              >
                {amenities}
              </CalciteList>
            </CalciteBlock>
            <CalciteBlock heading="Rank" open>
              <CalciteList
                dragEnabled={true}
                onCalciteListOrderChange={(evt) => {
                  const trees = evt.target.filteredItems
                    .map((item) => item.label)
                    .flatMap((value) =>
                      Object.keys(treeTypesDict).filter(
                        (key) => treeTypesDict[key] === value
                      )
                    );
                  const animal = evt.target.filteredItems
                    .map((item) => item.label)
                    .flatMap((value) =>
                      Object.keys(plantsAnimalsDict).filter(
                        (key) => treeTypesDict[key] === value
                      )
                    );
                  const active = evt.target.filteredItems
                    .map((item) => item.label)
                    .flatMap((value) =>
                      Object.keys(activitiesDict).filter(
                        (key) => activitiesDict[key] === value
                      )
                    );
                  const other = evt.target.filteredItems
                    .map((item) => item.label)
                    .flatMap((value) =>
                      Object.keys(otherAmenitiesDict).filter(
                        (key) => otherAmenitiesDict[key] === value
                      )
                    );
                  setFinalRanking([...trees, ...animal, ...active, ...other]);
                  //console.log(evt.target.filteredItems.map((item) => item.label));
                }}
              >
                {htmlItems}
              </CalciteList>
              <CalciteButton
                onClick={props.func}
                {...(finalRanking.length === 0 ? { disabled: true } : {})}
              >
                Find Locations
              </CalciteButton>
            </CalciteBlock>
          </CalciteTab>
          <CalciteTab>
            <CalciteBlock
              heading="results"
              open
              {...(htmlItems.length === 0 ? { disabled: true } : {})}
            >
              <CalciteList selectionMode="single" selectionAppearance="border">
                {locationItems}
              </CalciteList>
            </CalciteBlock>
          </CalciteTab>
        </CalciteTabs>
      </div>
    </CalcitePanel>
  );
};
