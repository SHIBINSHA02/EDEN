varying vec2 vUv;
uniform vec2 uResolution;
uniform float uPixelSize;
uniform vec3 uBaseColor;
uniform vec3 uPrimaryCenter;
uniform vec3 uPrimarySurround[4];
uniform vec3 uFadeCenter;
uniform vec3 uFadeSurround;
uniform vec3 uPlusSigns[1000];

void main() {
  vec2 pixelatedUv = floor(vUv * uResolution) / uResolution;
  vec2 gridPos = floor(vUv * uResolution);
  vec3 color = uBaseColor;

  for (int i = 0; i < 1000; i++) {
    if (uPlusSigns[i].x == 0.0 && uPlusSigns[i].y == 0.0) break;
    vec2 center = uPlusSigns[i].xy;
    float isPrimary = uPlusSigns[i].z;

    if (gridPos.x == center.x && gridPos.y == center.y) {
      color = isPrimary == 1.0 ? uPrimaryCenter : uFadeCenter;
      break;
    }
    if (isPrimary == 1.0) {
      if (gridPos.x == center.x && gridPos.y == center.y - 1.0) color = uPrimarySurround[0];
      if (gridPos.x == center.x && gridPos.y == center.y + 1.0) color = uPrimarySurround[1];
      if (gridPos.x == center.x - 1.0 && gridPos.y == center.y) color = uPrimarySurround[2];
      if (gridPos.x == center.x + 1.0 && gridPos.y == center.y) color = uPrimarySurround[3];
    } else {
      if ((gridPos.x == center.x && abs(gridPos.y - center.y) == 1.0) ||
          (gridPos.y == center.y && abs(gridPos.x - center.x) == 1.0)) {
        color = uFadeSurround;
      }
    }
  }

  gl_FragColor = vec4(color, 1.0);
}