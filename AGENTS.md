<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- Product and site content (About copy, contact email, manual Pins) live in src/data/*.ts; keep them the single editable source so the owner can edit without touching components.
- Pinterest data is fetched server-side only (src/lib/pinterest.functions.ts) from a PINTEREST_ACCESS_TOKEN env var; never call Pinterest from the browser.
