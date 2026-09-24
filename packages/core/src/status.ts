// SPDX-FileCopyrightText: 2026 Algorythmic
// SPDX-License-Identifier: Apache-2.0

/**
 * Allowed status values.
 */
export const STATUSES = ["APPROVED", "PENDING", "REJECTED"];

/**
 * A status value from {@link STATUSES}.
 */
export type Status = (typeof STATUSES)[number];
