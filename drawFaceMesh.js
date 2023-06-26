import { drawMask } from './drawMask.js';
import { faceMeshOptions } from './faceMeshOptions.js';
import { getDistancesOfEyelid } from './getDistanceOfEyelid.js';

export const drawFaceMesh = ( canvasElement, canvasCtx, checkOutputElement, calibrateButtonELement, countElement ) => {

  let validDistanceLeftEye = localStorage.getItem( 'leftEyeDistance' ) || 0;
  let validDistanceRightEye = localStorage.getItem( 'rightEyeDistance' ) || 0;

  const faceMesh = new FaceMesh({
    locateFile: ( file ) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${ file }`;
    }
  });

  faceMesh.setOptions( faceMeshOptions );

  calibrateButtonELement.addEventListener( 'click', () => { 
    alert( 'Por favor, cierra los ojos y espera 3 segundos a que se muestre el mensaje de calibración' );
    calibrateButtonELement.disabled = true;
    let count = 3;
    const interval = setInterval( () => {
      if ( count === 0 ) {
        clearInterval( interval );
        faceMesh.onResults( ( results ) => {
          try {
            if ( results.multiFaceLandmarks ) {
              const { leftEyeDistance, rightEyeDistance } = getDistancesOfEyelid( results.multiFaceLandmarks[ 0 ] );
              validDistanceLeftEye = leftEyeDistance;
              validDistanceRightEye = rightEyeDistance;
              localStorage.setItem( 'leftEyeDistance', ( validDistanceLeftEye + ( validDistanceLeftEye * 0.40 ) ) );
              localStorage.setItem( 'rightEyeDistance', ( validDistanceRightEye + ( validDistanceRightEye * 0.40 ) ) );
              countElement.innerHTML = `Se ha calibrado correctamente` ;
            }
          } catch ( error ) {
            countElement.innerHTML = `Error ha habido un error al intentar calibrar, no se reconocio su rostro`;
          }
          faceMesh.onResults( resultsFaceMeshHandler );
        } );
        calibrateButtonELement.disabled = false;
      } else {
        countElement.innerHTML = count;
      }
      count--;
    }, 1000 );
    calibrateButtonELement.innerHTML = 'Volver a Calibrar';
  });

  const resultsFaceMeshHandler = ( results ) => {
    onResults( results, canvasElement, canvasCtx, checkOutputElement, { validDistanceLeftEye, validDistanceRightEye } );
  }

  faceMesh.onResults( resultsFaceMeshHandler );

  return faceMesh;
};

const onResults = ( results, canvasElement, canvasCtx, checkOutputElement, { validDistanceLeftEye, validDistanceRightEye } ) => {

  canvasCtx.save();
  canvasCtx.clearRect( 0, 0, canvasElement.width, canvasElement.height );
  canvasCtx.drawImage( results.image, 0, 0, canvasElement.width, canvasElement.height );

  if ( results.multiFaceLandmarks ) {
    for ( const landmarks of results.multiFaceLandmarks ) {
      drawMask( canvasCtx, landmarks );
      const { leftEyeDistance, rightEyeDistance } = getDistancesOfEyelid( landmarks );

      const isClosedEyes = ( 
        leftEyeDistance  <= validDistanceLeftEye
          &&
        rightEyeDistance <= validDistanceRightEye
      );

      const soloPruebas = `
      distancia ojo izquierdo: ${ leftEyeDistance } ${ validDistanceLeftEye } <br />
      distancia ojo derecho: ${ rightEyeDistance } ${ validDistanceRightEye }<br />
      ojo izquierdo cerrado: ${ leftEyeDistance  <= validDistanceLeftEye } <br />
      ojo derecho cerrado: ${ rightEyeDistance <= validDistanceRightEye }  <br />
      `;

      checkOutputElement.innerHTML = `Ojos cerrardos: ${ isClosedEyes ? 'SI' : 'NO' } <br />${ soloPruebas }`;
    }
  }
  canvasCtx.restore();
};