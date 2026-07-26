# Component compositions

These examples are distilled from the canonical Storybook Canvas stories. Query the installed
`custom-elements.json` before relying on an attribute, event, slot, CSS property, or CSS part.

## alert-box

```html
<alert-box variant="info">
  <p><strong>Heads up!</strong> Your session expires soon.</p>
  <close-control-box slot="close-control" label="Dismiss alert"></close-control-box>
</alert-box>
```

Import `@box-model/web/alert` and `@box-model/web/close-control`. Listen for `close` on
`alert-box`.

## badge-box

```html
<badge-box><span>New</span></badge-box>
```

Import `@box-model/web/badge`.

## banner-box

```html
<banner-box variant="info">
  <p>System maintenance starts at 23:00 UTC.</p>
  <details slot="details">
    <summary>More information</summary>
    <p>The maintenance window ends at 02:00 UTC.</p>
  </details>
  <div slot="actions">
    <button-box><button type="button">View status</button></button-box>
  </div>
</banner-box>
```

Import `@box-model/web/banner` and `@box-model/web/button`.

## button-box

```html
<button-box variant="primary" size="medium">
  <button type="button">Save changes</button>
</button-box>
```

Import `@box-model/web/button`. Keep a native button or anchor in the default slot.

## card-box

```html
<card-box hoverable>
  <div slot="header"><h2>Release status</h2></div>
  <p>The package is ready for review.</p>
  <p slot="footer">Updated just now</p>
  <div slot="actions">
    <button-box><button type="button">View details</button></button-box>
  </div>
</card-box>
```

Import `@box-model/web/card` and `@box-model/web/button`.

## checkbox-group-box

```html
<checkbox-group-box legend="Notifications">
  <label><input type="checkbox" name="notifications" value="email" /> Email</label>
  <label><input type="checkbox" name="notifications" value="sms" /> SMS</label>
</checkbox-group-box>
```

Import `@box-model/web/checkbox`. Keep each native checkbox inside its label.

## close-control-box

```html
<close-control-box label="Dismiss notification"></close-control-box>
```

Import `@box-model/web/close-control`. Listen for `close`; always provide a contextual label.

## columns-box

```html
<columns-box gap="md" min-width="15rem">
  <card-box
    ><h3 slot="header">First</h3>
    <p>First column.</p></card-box
  >
  <card-box
    ><h3 slot="header">Second</h3>
    <p>Second column.</p></card-box
  >
</columns-box>
```

Import `@box-model/web/columns` and `@box-model/web/card`.

## dialog-box

```html
<dialog-box id="confirm-dialog">
  <dialog-header-box slot="header"><h2>Confirm release</h2></dialog-header-box>
  <p>Publish version 0.0.1?</p>
  <dialog-footer-box slot="footer">
    <button-box><button type="button">Publish</button></button-box>
  </dialog-footer-box>
  <close-control-box slot="close-control" label="Close dialog"></close-control-box>
</dialog-box>
```

Import `@box-model/web/dialog`, `@box-model/web/button`, and
`@box-model/web/close-control`. Set the `open` property to show it and listen for `close`.

## dialog-footer-box

```html
<dialog-box>
  <p>Dialog content.</p>
  <dialog-footer-box slot="footer">
    <button-box><button type="button">Continue</button></button-box>
  </dialog-footer-box>
</dialog-box>
```

`dialog-footer-box` is registered by `@box-model/web/dialog`.

## dialog-header-box

```html
<dialog-box>
  <dialog-header-box slot="header"><h2>Account settings</h2></dialog-header-box>
  <p>Dialog content.</p>
</dialog-box>
```

`dialog-header-box` is registered by `@box-model/web/dialog`.

## divider-box

```html
<p>First section</p>
<divider-box orientation="horizontal"></divider-box>
<p>Second section</p>
```

Import `@box-model/web/divider`.

## drawer-box

```html
<drawer-box id="filters" placement="right">
  <drawer-header-box slot="heading"><h2>Filters</h2></drawer-header-box>
  <p>Filter controls go here.</p>
  <div slot="actions">
    <button-box><button type="button">Apply</button></button-box>
  </div>
  <close-control-box slot="close-control" label="Close filters"></close-control-box>
</drawer-box>
```

Import `@box-model/web/drawer`, `@box-model/web/button`, and
`@box-model/web/close-control`. Set the `open` property to show it.

## drawer-header-box

```html
<drawer-box>
  <drawer-header-box slot="heading"><h2>Navigation</h2></drawer-header-box>
  <nav aria-label="Account"><a href="/profile">Profile</a></nav>
</drawer-box>
```

`drawer-header-box` is registered by `@box-model/web/drawer`.

## input-box

```html
<label for="account-name">Account name</label>
<input-box fullwidth>
  <input id="account-name" name="account-name" type="text" autocomplete="name" />
</input-box>
```

Import `@box-model/web/input`. Keep the native input and associated label.

## link-box

```html
<link-box variant="primary" size="md">
  <a href="/docs">Read the documentation</a>
</link-box>
```

Import `@box-model/web/link`. Keep a native anchor or button in the default slot.

## list-box

```html
<list-box>
  <li>Install the package</li>
  <li>Load the theme</li>
  <li>Import a component</li>
</list-box>
```

Import `@box-model/web/list`. Set `ordered` when sequence matters.

## loading-box

```html
<loading-box label-visible>Loading account details</loading-box>
```

Import `@box-model/web/loading`. Keep meaningful loading text even when it is visually hidden.

## markdown-box

```html
<markdown-box> # Release notes The package is **ready to review**. </markdown-box>
```

Import `@box-model/web/markdown`. Raw HTML is escaped; use supported Markdown containers for Box
Model component composition.

## progress-box

```html
<progress-box value="72" max="100" label="Upload progress">
  <span>Uploading package</span>
</progress-box>
```

Import `@box-model/web/progress`. Always provide a task-specific `label`.

## radio-group-box

```html
<radio-group-box legend="Billing interval">
  <label><input type="radio" name="billing" value="monthly" checked /> Monthly</label>
  <label><input type="radio" name="billing" value="annual" /> Annual</label>
</radio-group-box>
```

Import `@box-model/web/radio`. Keep a shared native radio `name`.

## select-box

```html
<label for="environment">Environment</label>
<select-box fullwidth>
  <select id="environment" name="environment">
    <option value="">Choose an environment</option>
    <option value="production">Production</option>
    <option value="staging">Staging</option>
  </select>
</select-box>
```

Import `@box-model/web/select`.

## skeleton-box

```html
<skeleton-box animated width="18rem" height="1.25rem"></skeleton-box>
```

Import `@box-model/web/skeleton`. Provide surrounding semantics that communicate the loading state.

## stat-box

```html
<stat-box value="99.99%" delta="+0.02%" trend="up" show-trend-indicator>
  <span slot="title">Availability</span>
  <p>Across the last 30 days.</p>
</stat-box>
```

Import `@box-model/web/stat`.

## status-icon-box

```html
<status-icon-box variant="success" label="Deployment succeeded"></status-icon-box>
```

Import `@box-model/web/status-icon`. Supply a label whenever the icon communicates meaning.

## table-box

```html
<table-box zebra="surface">
  <table>
    <thead>
      <tr>
        <th scope="col">Service</th>
        <th scope="col">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>API</td>
        <td>Healthy</td>
      </tr>
    </tbody>
  </table>
</table-box>
```

Import `@box-model/web/table`. Keep native table structure and header scopes.

## tag-box

```html
<tag-box variant="neutral"><span>Web component</span></tag-box>
```

Import `@box-model/web/tag`.

## terminal-box

```html
<terminal-box>
  <terminal-line-box variant="prompt">npm install @box-model/web</terminal-line-box>
  <terminal-line-box variant="info">Loading components…</terminal-line-box>
  <terminal-line-box variant="success">Ready to ship</terminal-line-box>
</terminal-box>
```

Import `@box-model/web/terminal`; it also registers `terminal-line-box`.

## terminal-line-box

```html
<terminal-box>
  <terminal-line-box variant="prompt" cursor>npm run build</terminal-line-box>
</terminal-box>
```

`terminal-line-box` is registered by `@box-model/web/terminal`.

## textarea-box

```html
<label for="release-notes">Release notes</label>
<textarea-box fullwidth>
  <textarea id="release-notes" name="release-notes"></textarea>
</textarea-box>
```

Import `@box-model/web/textarea`.

## toast-box

```html
<toast-box variant="success">
  <p>Your settings were saved.</p>
  <close-control-box slot="close-control" label="Dismiss notification"></close-control-box>
</toast-box>
```

Import `@box-model/web/toast` and `@box-model/web/close-control`. Listen for `close`.

## toolbar-box

```html
<toolbar-box>
  <button type="button" aria-label="Bold"><strong>B</strong></button>
  <button type="button" aria-label="Italic"><em>I</em></button>
</toolbar-box>
```

Import `@box-model/web/toolbar`. Every icon-only action needs an accessible name.

## tooltip-box

```html
<tooltip-box default-placement="top">
  <button slot="trigger" type="button">More information</button>
  <span>Deployment details are available in the activity log.</span>
</tooltip-box>
```

Import `@box-model/web/tooltip`. Use a keyboard-focusable trigger.

## wysiwyg-box

```html
<label for="editor">Markdown content</label>
<wysiwyg-box>
  <textarea id="editor"># Release notes</textarea>
</wysiwyg-box>
```

Import `@box-model/web/wysiwyg`. Listen for `input` on `wysiwyg-box`; pair it with
`markdown-box` for preview rendering.
