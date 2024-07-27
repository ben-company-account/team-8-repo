import React from "react";
import { useState } from "react";
import { CalciteList, CalciteListItem } from "@esri/calcite-components-react";
import { treeTypesDict } from "./activitiesManifest";
import { plantsAnimalsDict } from "./activitiesManifest";
import { activitiesDict } from "./activitiesManifest";
import { otherAmenitiesDict } from "./activitiesManifest";
export const ActivitiesList = (): JSX.Element => {
  //list of keys that will be used for making fields in comboboxes
  const treeListItems = [];
  const plantAnimalItems = [];
  const activitiesItems = [];
  const amenities = [];
  const [rankingItems, setRankingItems] = useState<
    HTMLCalciteListItemElement[]
  >([]);
  for (const tree in treeTypesDict) {
    treeListItems.push(
      <CalciteListItem label={treeTypesDict[tree]}></CalciteListItem>
    );
  }
  for (const poa in plantsAnimalsDict) {
    treeListItems.push(
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
    <>
      <CalciteList
        label="Trees"
        selectionMode="multiple"
        onCalciteListChange={(evt) => {
          const items = new Set([...rankingItems, ...evt.target.selectedItems]);
          setRankingItems([...items]);
        }}
      >
        {treeListItems}
      </CalciteList>
      <CalciteList
        label="Plants and animals"
        selectionMode="multiple"
        onCalciteListChange={(evt) => {
          const items = new Set([...rankingItems, ...evt.target.selectedItems]);
          setRankingItems([...items]);
        }}
      >
        {plantAnimalItems}
      </CalciteList>
      <CalciteList
        label="Activities"
        selectionMode="multiple"
        onCalciteListChange={(evt) => {
          const items = new Set([...rankingItems, ...evt.target.selectedItems]);
          setRankingItems([...items]);
        }}
      >
        {activitiesItems}
      </CalciteList>
      <CalciteList
        label="Amenities"
        selectionMode="multiple"
        onCalciteListChange={(evt) => {
          const items = new Set([...rankingItems, ...evt.target.selectedItems]);
          setRankingItems([...items]);
        }}
      >
        {amenities}
      </CalciteList>
    </>
  );
};
