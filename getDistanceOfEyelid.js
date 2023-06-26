export const getDistancesOfEyelid = ( landmarks ) => {
  const upperLeftEyelid = landmarks[ 386 ]; 
  const lowerLeftEyelid = landmarks[ 374 ];
  const upperRightEyelid = landmarks[ 159 ];
  const lowerRightEyelid = landmarks[ 145 ];
  const leftEyeDistance = Math.sqrt( Math.pow( upperLeftEyelid.x - lowerLeftEyelid.x, 2 ) + Math.pow( upperLeftEyelid.y - lowerLeftEyelid.y, 2 ) );
  const rightEyeDistance = Math.sqrt( Math.pow( upperRightEyelid.x - lowerRightEyelid.x, 2 ) + Math.pow( upperRightEyelid.y - lowerRightEyelid.y, 2 ) );

  return {
    leftEyeDistance,
    rightEyeDistance,
  }
}
