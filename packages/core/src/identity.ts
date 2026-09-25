// SPDX-FileCopyrightText: 2026 Algorythmic
// SPDX-License-Identifier: Apache-2.0

import { randomUUID } from "crypto";
import { ulid } from "ulidx";

/**
 * Creates a UUID-based identity string.
 *
 * @returns A UUID string.
 */
export const uuIdentity = () => randomUUID();

/**
 * Creates a ULID-based identity string.
 *
 * @returns A ULID string.
 */
export const ulIdentity = () => ulid();

/**
 * Identifies an OEI object by its unique id value.
 *
 * @typeParam T - The identifier value type.
 */
export interface Identity<T = string | number> {
	id: T;
}
