export const drawMask = ( canvasCtx, landmarks ) => {
  // drawConnectors( canvasCtx, landmarks, FACEMESH_TESSELATION, { color: '#C0C0C070', lineWidth: 1 } );
  drawConnectors( canvasCtx, landmarks, FACEMESH_RIGHT_EYE, { color: '#D14D72' } );
  drawConnectors( canvasCtx, landmarks, FACEMESH_LEFT_EYE, { color: '#FF6000' } );
  // drawConnectors( canvasCtx, landmarks, FACEMESH_RIGHT_EYEBROW, { color: '#F9E2AF' } );
  // drawConnectors( canvasCtx, landmarks, FACEMESH_LEFT_EYEBROW, { color: '#30FF30' } );
  // drawConnectors( canvasCtx, landmarks, FACEMESH_RIGHT_IRIS, { color: '#070A52' } );
  // drawConnectors( canvasCtx, landmarks, FACEMESH_LEFT_IRIS, { color: '#27E1C1' } );
  // drawConnectors( canvasCtx, landmarks, FACEMESH_FACE_OVAL, { color: '#E0E0E0' } );
  // drawConnectors( canvasCtx, landmarks, FACEMESH_LIPS, { color: '#E0E0E0' } );
}
