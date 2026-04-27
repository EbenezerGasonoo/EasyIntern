/**
 * Normalizes stored university names for display and comparison (extra spaces, trailing noise).
 * @param {string|null|undefined} name
 * @returns {string}
 */
export function formatInstitutionName(name) {
  if (name == null) return '';
  return String(name).replace(/\s+/g, ' ').trim();
}

/**
 * @param {object} u
 * @returns {object}
 */
export function mapUniversityForPublicList(u) {
  return {
    ...u,
    name: formatInstitutionName(u.name),
  };
}
