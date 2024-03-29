/**
 * Automated mesh primitive registration.
 */
import getMeshMixin from '../getMeshMixin';
import { geometries, geometryNames } from '../../../core/geometry';
import { registerPrimitive } from '../primitives';
import utils from '../../../utils/';

// For testing.
export const meshPrimitives = {};

// Generate primitive for each geometry type.
geometryNames.forEach((geometryName) => {
  const geometry = geometries[geometryName];
  const geometryHyphened = unCamelCase(geometryName);

  // Generate mappings.
  const mappings = {};
  Object.keys(geometry.schema).forEach((property) => {
    mappings[unCamelCase(property)] = `geometry.${property}`;
  });

  // Register.
  const tagName = `a-${geometryHyphened}`;
  const primitive = registerPrimitive(tagName, utils.extendDeep({}, getMeshMixin(), {
    defaultComponents: {geometry: {primitive: geometryName}},
    mappings: mappings
  }));
  meshPrimitives[tagName] = primitive;
});

/**
 * camelCase to hyphened-string.
 */
function unCamelCase (str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
