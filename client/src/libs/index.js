export async function getConnectedDevices(type) {
  const devices = await navigator.mediaDevices.enumerateDevices();
  return await devices.filter((dev) => dev.kind === type);
}

export async function openCamera(cameraId, minWidth, minHeight) {
  const constraints = {
    audio: { echoCancellation: true },
    video: {
      deviceId: cameraId,
      width: { min: minWidth },
      height: { min: minHeight },
    },
  };

  return await navigator.mediaDevices.getUserMedia(constraints);
}
