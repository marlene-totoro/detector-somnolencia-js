import { drawFaceMesh } from './drawFaceMesh.js';
import { showCamera } from './showCamera.js';

import './styles.css';

document.querySelector( '#app' ).innerHTML = `
  <main>
    <h1> Detector de Somnolencia </h1>
    <hr />
    <div id="container">
      <video id="entrada-camara"></video>
      <canvas id="salida-canvas" width="600" height="500"></canvas>
    </div>
    <div>
      <button id="calibrate-button"> Calibrar </button>
    </div>
    <div>
      <p id="count"></p>
      <h1 id="resultCheck"> Detector de Somnolencia </h1>
    </div>
  </main>
`;

const videoElement  = document.getElementById( 'entrada-camara' );
const canvasElement = document.getElementById( 'salida-canvas' );
const canvasCtx     = canvasElement.getContext( '2d' );
const resultado     = document.getElementById( 'resultCheck' );
const calibrateButtonELement = document.getElementById( 'calibrate-button' );
const countElement = document.getElementById( 'count' );

const faceMesh = drawFaceMesh( canvasElement, canvasCtx, resultado, calibrateButtonELement, countElement );
showCamera( videoElement, faceMesh );
