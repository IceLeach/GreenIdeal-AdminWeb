import { Button } from "antd";
import React, { useEffect } from "react";
// import { getThis } from '../../../../public/grapheditor/SaveUI';
// @ts-ignore
// import AMap from 'AMap';

const graph: React.FC = () => {
  // useEffect(() => {
  //   new AMap.Map('map', {
  //     zoom: 11,
  //     viewMode: '3D',
  //     layers: [
  //       new AMap.TileLayer.Satellite(),
  //       new AMap.TileLayer.RoadNet(),
  //     ]
  //   })
  // }, []);

  // useEffect(() => {
  //   window.addEventListener('setItem', () => {
  //     const newVal = sessionStorage.getItem('watchStorage');
  //     console.log('newVal', newVal)
  //   });
  // }, []);

  const save = () => {
    // @ts-ignore
    const w = document.getElementById("ifr").contentWindow;
    // console.log('w', w.grapheditor)
    w.grapheditor.saveFile();
  }

  return (
    // <div>
    //   <div style={{ width: '100%', height: 700 }} id="map"></div>
    // </div>
    <>
      <Button
        onClick={save}
      >
        保存
      </Button>
      <iframe
        id="ifr"
        title="pp"
        src="./grapheditor"
        width='100%'
        height={665}
        frameBorder={0}
      />
    </>
  );
}

export default graph;
