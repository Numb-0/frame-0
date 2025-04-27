import { bind } from "astal";
import Hyprland from "gi://AstalHyprland";

export default function Workspaces() {
  const hyprland = Hyprland.get_default();
  const workspaces = Array.from({ length: 6 }, (_, i) => i + 1);

  function WorkspaceButton({ workspace }: { workspace: number }): JSX.Element {
    return (
      <button
        valign={CENTER}
        cssClasses={bind(hyprland, "focused_workspace").as((ws) =>
          ws.id == workspace
            ? ["workspace", "active"]
            : hyprland.get_workspace(workspace)?.get_clients().length > 0
            ? ["workspace", "occupied"]
            : ["workspace"]
        )}
        onClicked={() =>
          hyprland.get_focused_workspace().get_id() != workspace
            ? hyprland.dispatch("workspace", workspace.toString())
            : null
        }
      >
        <box cssClasses={["appIcon"]}/>
      </button>
    );
  }

  return (
      <box spacing={4} cssClasses={["workspaces"]}>
        {workspaces.map((workspace) => (
          <WorkspaceButton workspace={workspace} />
        ))}
      </box>
  );
}
