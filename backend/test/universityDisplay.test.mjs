import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatInstitutionName, mapUniversityForPublicList } from '../src/utils/universityDisplay.js';

test('formatInstitutionName trims and collapses spaces', () => {
  assert.equal(formatInstitutionName('  Gold   State  University  '), 'Gold State University');
  assert.equal(formatInstitutionName(null), '');
});

test('mapUniversityForPublicList normalizes name', () => {
  const out = mapUniversityForPublicList({
    id: '1',
    name: '  Test Uni ',
    website: null,
    studentIdFormatHint: 'hint',
  });
  assert.equal(out.name, 'Test Uni');
  assert.equal(out.studentIdFormatHint, 'hint');
});
