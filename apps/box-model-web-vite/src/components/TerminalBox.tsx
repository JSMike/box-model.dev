import { TerminalBox as TerminalBoxTag, TerminalLineBox } from '@box-model/web/terminal';
import { CardBox } from '@box-model/web/card';
import { StatusIconBox } from '@box-model/web/status-icon';

// Ensure custom elements are defined
import '@box-model/web/terminal';

export function TerminalBox() {
  return (
    <CardBox className="widget widget--terminal">
      <div slot="header" className="widget__header">
        <h3>System Terminal</h3>
        <StatusIconBox variant="success" />
      </div>
      <terminal-box>
        <terminal-line-box variant="prompt">npm install @box-model/web</terminal-line-box>
        <terminal-line-box variant="success">
          + @box-model/web@1.0.0
          <br />
          added 1 package in 0.5s
        </terminal-line-box>
        <terminal-line-box variant="prompt">npx box-model init</terminal-line-box>
        <terminal-line-box variant="info">
          Initializing configuration...
          <br />
          Detected TypeScript...
          <br />
          Strict mode enabled.
        </terminal-line-box>
        <terminal-line-box variant="success">
          All systems operational.
          <br />
          0px border-radius enforced.
        </terminal-line-box>
        <terminal-line-box variant="prompt" cursor></terminal-line-box>
      </terminal-box>
    </CardBox>
  );
}
