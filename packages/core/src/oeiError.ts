// SPDX-FileCopyrightText: 2026 Algorythmic
// SPDX-License-Identifier: Apache-2.0

export type OeiErrorCode =
	| "CONFLICT"
	| "INTERNAL"
	| "NOT_FOUND"
	| "UNAUTHORIZED"
	| "UNSPECIFIED"
	| "VALIDATION_ERROR";

export class OeiError extends Error {
	readonly code: OeiErrorCode;
	readonly cause?: unknown;
	readonly context?: Record<string, unknown>;

	constructor(
		message: string,
		code: OeiErrorCode = "UNSPECIFIED",
		opts?: { cause?: unknown; context?: Record<string, unknown> },
	) {
		super(message);
		this.name = "DomainError";
		this.code = code;
		this.cause = opts?.cause;
		this.context = opts?.context;
	}

	toJSON() {
		return {
			name: this.name,
			code: this.code,
			message: this.message,
			context: this.context,
		};
	}
}
