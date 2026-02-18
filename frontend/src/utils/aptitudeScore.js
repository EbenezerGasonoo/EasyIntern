/**
 * Computes a 0–100 "profile strength" (aptitude) score for an intern
 * so companies can see at a glance how complete and attractive the profile is.
 */

const WEIGHTS = {
  bio: 15,
  skills: 30,   // max 30 (e.g. 5 per skill, cap at 6)
  education: 15,
  experience: 15,
  location: 15,
  profilePic: 5,
  resume: 5,
}

export function getAptitudeScore(intern) {
  if (!intern) return { score: 0, breakdown: [] }

  const skills = Array.isArray(intern.skills) ? intern.skills : []
  const skillsScore = Math.min(WEIGHTS.skills, skills.length * 5)
  const hasBio = Boolean(intern.bio?.trim?.())
  const hasEducation = Boolean(intern.education?.trim?.())
  const hasExperience = Boolean(intern.experience?.trim?.())
  const hasLocation = Boolean(intern.location?.trim?.())
  const hasPhoto = Boolean(intern.profilePic?.trim?.())
  const hasResume = Boolean(intern.resume?.trim?.())

  const breakdown = [
    { label: 'Bio', max: WEIGHTS.bio, value: hasBio ? WEIGHTS.bio : 0 },
    { label: 'Skills', max: WEIGHTS.skills, value: skillsScore },
    { label: 'Education', max: WEIGHTS.education, value: hasEducation ? WEIGHTS.education : 0 },
    { label: 'Experience', max: WEIGHTS.experience, value: hasExperience ? WEIGHTS.experience : 0 },
    { label: 'Location', max: WEIGHTS.location, value: hasLocation ? WEIGHTS.location : 0 },
    { label: 'Photo', max: WEIGHTS.profilePic, value: hasPhoto ? WEIGHTS.profilePic : 0 },
    { label: 'Resume', max: WEIGHTS.resume, value: hasResume ? WEIGHTS.resume : 0 },
  ]

  const score = Math.min(100, Math.round(breakdown.reduce((sum, b) => sum + b.value, 0)))

  return { score, breakdown }
}

/**
 * Returns segment data for a pie chart: each slice = one category's share of the total.
 * Used to show "what makes up" the profile (skills, education, experience, etc.).
 */
export function getAptitudePieSegments(intern) {
  const { breakdown } = getAptitudeScore(intern)
  const total = breakdown.reduce((s, b) => s + b.value, 0) || 1
  const colors = ['#4a90e2', '#5cb85c', '#f0ad4e', '#5bc0de', '#9b59b6', '#e74c3c', '#95a5a6']
  return breakdown
    .filter((b) => b.value > 0)
    .map((b, i) => ({
      label: b.label,
      value: b.value,
      percent: Math.round((b.value / total) * 100),
      color: colors[i % colors.length],
    }))
}
