# Commit Signing (DCO + Cryptographic Signatures)

## Why this exists

OEI repositories enforce two independent, unrelated checks on every commit:
a **DCO sign-off** and a **cryptographic signature**. Their git flags look
almost identical (`-s` vs `-S`), which makes them easy to conflate, but
satisfying one does nothing for the other. This doc exists because that
confusion cost real troubleshooting time during OEI repository bootstrap
work and will cost it again for anyone who hits it cold.

## The two mechanisms

|                     | DCO Sign-off                                                           | Cryptographic Signature                              |
| ------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------- |
| **Proves**          | You have the right to contribute this code under the project's license | This commit genuinely came from you, unaltered       |
| **Mechanism**       | A `Signed-off-by:` trailer in the commit message (plain text)          | A GPG or SSH signature embedded in the commit object |
| **Flag**            | `git commit -s`                                                        | `git commit -S`                                      |
| **Enforced by**     | The DCO GitHub App, as a required status check                         | The repo's branch ruleset ("Require signatures")     |
| **Checked against** | Nothing, it is just text in the message                                | A signing key registered to your GitHub account      |

Both at once: `git commit -S -s`, or set `commit.gpgsign true` globally and
always pass `-s` explicitly (sign-off is never automatic, even with
`gpgsign` on).

## One-time setup: cryptographic signing

SSH-based signing is simpler than GPG if you do not already have a GPG key
you use for this.

1. Generate a key if you do not already have one you want to use:

```sh
ssh-keygen -t ed25519 -C "your-email@example.com" -f ~/.ssh/git_signing_key
```

2. On GitHub: **Settings -> SSH and GPG keys -> New SSH key**. Set **Key
   type: Signing Key**, not Authentication Key. This is the single most
   common failure point: an SSH key already added for authentication
   (cloning, pushing) is a separate registration from one GitHub trusts
   for signature verification, even when it is the same key file. Adding
   it once as an auth key does not cover this; it has to be added again,
   explicitly as a signing key.
3. Configure git to use it:

```sh
git config --global gpg.format ssh
git config --global user.signingkey ~/.ssh/git_signing_key
git config --global commit.gpgsign true
```

4. Optional, for local verification only. Set up an allowed signers file so
   `git log --show-signature` can actually check things locally instead of
   erroring:

```sh
mkdir -p ~/.config/git
echo "your-email@example.com $(cat ~/.ssh/git_signing_key.pub)" >> ~/.config/git/allowed_signers
git config --global gpg.ssh.allowedSignersFile ~/.config/git/allowed_signers
```

Step 4 is not required for GitHub to accept your signed commits. GitHub
verifies independently against keys registered on your account. It only
affects whether your own local `git log` can confirm a signature.

## Fixing commits that are missing one or both

If you already committed without sign-off and/or signature, the fix is a
rebase, not individual amends: rewrite the range, then force-push.

**Add DCO sign-off to existing commits:**

```sh
git rebase --signoff --gpg-sign origin/develop
git push --force-with-lease origin <branch>
```

`--signoff` during a rebase is idempotent. Commits that already have a
correct `Signed-off-by:` trailer are left unchanged, so this is safe across
a whole branch.

**Add cryptographic signatures to existing commits** (safe to run even on
commits that already have correct sign-off; this only touches signatures):

```sh
git rebase --root --exec "git commit --amend --no-edit -S"
git push --force-with-lease origin <branch>
```

Both can be combined in one amend if doing both at once from scratch:
`git commit --amend --no-edit -S -s`.

Before rewriting history on a shared or already-merged branch, confirm
nobody else has work based on the commits you are about to rewrite, and
that nothing (release tags, published provenance attestations) is already
pointing at SHAs you are changing. A `--root` rebase touches everything.

## Troubleshooting

**`git log --show-signature` says "No signature" but you are sure you
signed it.**
Check the raw commit object before trusting that message:

```sh
git cat-file commit HEAD | head -5
```

If you see a `gpgsig` line, the commit is signed. The "No signature" output
is a local verification failure, usually because
`gpg.ssh.allowedSignersFile` is not configured (setup step 4). This does
not mean GitHub will reject the push.

**Push rejected: "Commits must have verified signatures."**
First confirm this is the signature check and not the DCO check. They fail
with different check names/messages (`DCO / DCO` vs ruleset signature
violation). If it is the signature check:

1. Confirm local config: `git config --get commit.gpgsign`,
   `git config --get gpg.format`, and `git config --get user.signingkey`
   should all return values, and the signing key path should exist.
2. Confirm via `git cat-file` (above) that commits contain a `gpgsig` line.
3. If both are true, the likely cause is key registration on GitHub as
   Authentication only, not Signing. Re-add the same key with key type
   Signing Key.

**Push rejected: `DCO / DCO` check listing commit hashes.**
That is the sign-off check, unrelated to cryptographic signatures. Those
commits are missing `Signed-off-by:` trailers. Fix with the `--signoff`
rebase above.

## Common mistake

Running `git commit -s` when a push is rejected for "Commits must have
verified signatures." This fixes nothing because `-s` only affects DCO
sign-off. Read the exact failing check before choosing a fix.
