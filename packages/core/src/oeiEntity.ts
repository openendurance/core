// SPDX-FileCopyrightText: 2026 Algorythmic
// SPDX-License-Identifier: Apache-2.0

import { type Identity } from "./identity";
import type { Status } from "./status";

/**
 * Base shape for an OEI entity.
 */
export interface OeiEntity<T = string | number> extends Identity<T> {
	/**
	 * Date the entity was approved for publication.
	 */
	approvedAt?: Date;

	/**
	 * User that approved the entity.
	 */
	approvedBy?: string;

	/**
	 * Date the entity was created.
	 */
	createdAt: Date;

	/**
	 * User that created the entity.
	 */
	createdBy: string;

	/**
	 * The entity's unique id.
	 */
	id: T;

	/**
	 * Name.
	 */
	name: string;

	/**
	 * User that owns the entity.
	 */
	owner: string;

	/**
	 * Entity status, e.g. "approved", "pending", "rejected", etc.
	 */
	status: Status;

	/**
	 * Reason for the current status, e.g. "new".
	 */
	statusReason?: string;

	/**
	 * Date the entity was last updated.
	 */
	updatedAt?: Date;

	/**
	 * User that last updated the entity.
	 */
	updatedBy?: string;
}
