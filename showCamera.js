export const showCamera = ( videoElement, faceMesh ) => {
  const camera = new Camera( videoElement, {
    onFrame: async () => {
      await faceMesh.send({ image: videoElement });
    },
  });
  camera.start();
};
