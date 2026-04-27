/** @param {string | null | undefined} s */
export function normalizeInstitutionName(s) {
  return String(s || '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
}

/**
 * Returns true if profile education text plausibly matches the platform school name.
 * @param {string} education
 * @param {string} schoolName
 */
export function educationMatchesSchoolName(education, schoolName) {
  if (!schoolName) return true
  const a = normalizeInstitutionName(education)
  const b = normalizeInstitutionName(schoolName)
  if (!a || !b) return true
  return a === b || a.includes(b) || b.includes(a)
}
