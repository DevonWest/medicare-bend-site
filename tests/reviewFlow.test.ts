import assert from "node:assert/strict";
import { test } from "node:test";
import {
  GOOGLE_REVIEW_URL,
  getReviewRatingDestination,
  validateReviewFeedbackInput,
} from "../lib/reviewFlow";
import {
  getActiveLicensedTeamMembers,
  getActiveReviewableTeamMembers,
  getHomepageTeamPreviewMembers,
  getTeamMemberInitials,
  getTeamMemberLastName,
  getTeamMemberSlug,
} from "../lib/team";

test("outbound Google review routing is disabled until a Bend review URL is set", () => {
  assert.equal(GOOGLE_REVIEW_URL, "");
});

test("5-star rating routes to the internal feedback page while no public review URL is configured", () => {
  assert.equal(
    getReviewRatingDestination("scott-lewis", 5),
    "/review/feedback?agent=scott-lewis&rating=5",
  );
});

test("1-4 star ratings go to the internal feedback page with rating and agent params", () => {
  assert.equal(
    getReviewRatingDestination("scott-lewis", 4),
    "/review/feedback?agent=scott-lewis&rating=4",
  );
  assert.equal(
    getReviewRatingDestination("scott-lewis", 1),
    "/review/feedback?agent=scott-lewis&rating=1",
  );
});

test("reviewable team members are limited to the current Bend roster", () => {
  const names = getActiveReviewableTeamMembers().map((member) => member.name);

  assert.deepEqual(names, ["Scott Lewis"]);
  assert.ok(!names.includes("Lynn Wold"));
  assert.ok(!names.includes("Kristi Wright"));
  assert.ok(!names.includes("Karen Speerstra"));
  assert.equal(getTeamMemberSlug("Scott Lewis"), "scott-lewis");
});

test("active licensed agents are the current Bend roster in neutral alphabetical order", () => {
  const members = getActiveLicensedTeamMembers();
  const names = members.map((member) => member.name);

  assert.deepEqual(names, ["Scott Lewis"]);
  assert.ok(
    members.every(
      (member) => member.active && !member.retired && member.title.includes("Licensed Insurance Agent"),
    ),
  );
});

test("homepage team preview keeps all active licensed agents visible", () => {
  const previewMembers = getHomepageTeamPreviewMembers();
  const previewNames = previewMembers.map((member) => member.name);

  assert.deepEqual(previewNames, ["Scott Lewis"]);
  assert.deepEqual(
    [...previewNames].sort(),
    [...getActiveLicensedTeamMembers().map((member) => member.name)].sort(),
  );
});

test("team last-name helper handles suffixes, hyphenated names, and single-word names", () => {
  assert.equal(getTeamMemberLastName("John Doe Jr."), "Doe");
  assert.equal(getTeamMemberLastName("Jane Doe Sr."), "Doe");
  assert.equal(getTeamMemberLastName("John Doe II"), "Doe");
  assert.equal(getTeamMemberLastName("John Doe III"), "Doe");
  assert.equal(getTeamMemberLastName("Mary Smith-Jones"), "Smith-Jones");
  assert.equal(getTeamMemberLastName("Cher"), "Cher");
});

test("team initials helper ignores extra spaces", () => {
  assert.equal(getTeamMemberInitials("  Scott   Lewis "), "SL");
});

test("review feedback validation accepts rating 5 while Google routing is disabled", () => {
  const validation = validateReviewFeedbackInput({
    fullName: "Jane Doe",
    email: "jane@example.com",
    rating: 5,
    message: "Great experience.",
    sourcePath: "/review/feedback",
  });

  assert.equal(validation.ok, true);
  assert.equal(validation.errors.rating, undefined);
});

test("review feedback validation still rejects out-of-range ratings", () => {
  const validation = validateReviewFeedbackInput({
    fullName: "Jane Doe",
    email: "jane@example.com",
    rating: 6,
    message: "Out of range.",
    sourcePath: "/review/feedback",
  });

  assert.equal(validation.ok, false);
  assert.ok(validation.errors.rating);
});
