# Working with AI

Learn how to use the React Aria MCP Server, Agent Skills, and more to help you build with AI.

## Agent Skills

[Agent Skills](https://agentskills.io) are folders of instructions, scripts, and resources that your AI coding tool can load when relevant to help with specific tasks.

To install the React Aria skill, run:

```bash
npx skills add https://react-aria.adobe.com
```

## MCP Server

[Node.js](https://nodejs.org/) must be installed on your system to run the MCP server.

<Tabs
  aria-label="MCP Clients"
  density="compact"
>
  <TabList><Tab id="cursor">Cursor</Tab><Tab id="vscode">VS Code</Tab><Tab id="claude-desktop">Claude Code (Desktop)</Tab><Tab id="claude-code">Claude Code (CLI)</Tab><Tab id="codex">Codex</Tab><Tab id="gemini-cli">Gemini CLI</Tab><Tab id="other">Other</Tab></TabList>

  <TabPanel id="cursor">
    Click the button to install:

    [Add to Cursor](cursor://anysphere.cursor-deeplink/mcp/install.md?name=React%20Aria\&config=eyJjb21tYW5kIjoibnB4IEByZWFjdC1hcmlhL21jcEBsYXRlc3QifQ%3D%3D)

    Or follow Cursor's MCP install [guide](https://cursor.com/docs/context/mcp#installing-mcp-servers) and use the following config:

    ```js
    {
      "mcpServers": {
        "React Aria": {
          "command": "npx",
          "args": ["@react-aria/mcp@latest"]
        }
      }
    }
    ```
  </TabPanel>

  <TabPanel id="vscode">
    Click the button to install:

    [Add to Visual Studio Code](vscode:mcp/install.md?%7B%22name%22%3A%22React%20Aria%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22%40react-aria%2Fmcp%40latest%22%5D%7D)

    Or follow VS Code's MCP install [guide](https://code.visualstudio.com/docs/copilot/chat/mcp-servers#_add-an-mcp-server) and use the following config. You can also add the server using the VS Code CLI:

    ```bash
    code --add-mcp '{"name":"React Aria","command":"npx","args":["@react-aria/mcp@latest"]}'
    ```

    ```js
    {
      "mcpServers": {
        "React Aria": {
          "command": "npx",
          "args": ["@react-aria/mcp@latest"]
        }
      }
    }
    ```
  </TabPanel>

  <TabPanel id="claude-desktop">
    Click the button to add to Claude Desktop:

    [Add to Claude Desktop](claude://claude.ai/directory/connectors/ant.dir.gh.adobe.react-aria.md)
  </TabPanel>

  <TabPanel id="claude-code">
    Use the Claude Code CLI to add the server:

    ```bash
    claude mcp add react-aria npx @react-aria/mcp@latest
    ```

    For more information, see the [Claude Code MCP documentation](https://docs.claude.com/en/docs/claude-code/mcp).
  </TabPanel>

  <TabPanel id="codex">
    Create or edit the configuration file `~/.codex/config.toml` and add:

    ```
    [mcp_servers.react-aria]
    command = "npx"
    args = ["@react-aria/mcp@latest"]
    ```

    For more information, see the [Codex MCP documentation](https://github.com/openai/codex/blob/main/docs/config.md#mcp_servers).
  </TabPanel>

  <TabPanel id="gemini-cli">
    Use the Gemini CLI to add the server:

    ```bash
    gemini mcp add react-aria npx @react-aria/mcp@latest
    ```

    For more information, see the [Gemini CLI MCP documentation](https://github.com/google-gemini/gemini-cli/blob/main/docs/tools/mcp-server.md#how-to-set-up-your-mcp-server).
  </TabPanel>

  <TabPanel id="other">
    Add the server to your MCP client configuration (the exact file and schema may depend on your client).

    ```js
    {
      "mcpServers": {
        "React Aria": {
          "command": "npx",
          "args": ["@react-aria/mcp@latest"]
        }
      }
    }
    ```
  </TabPanel>
</Tabs>

## Markdown docs

Each page in the React Aria documentation is also available as a standalone markdown file.

Add the `.md` extension to the URL to get the markdown version of a page. Additionally, each page has a "Copy for LLM" button which, when pressed, will copy the contents of the page to your clipboard as markdown text.

## llms.txt

The [llms.txt](llms.txt) file contains a list of all the markdown pages available in the React Aria documentation.
