import { bind } from "astal";
import { App, Astal, Gdk, Gtk, hook } from "astal/gtk4";
import Apps from "gi://AstalApps";
import Hyprland from "gi://AstalHyprland";
import Grid from "./components/astalified/Grid";
import ScrolledWindow from "./components/astalified/ScrolledWindow";
import { Entry } from "astal/gtk4/widget";
import FlowBox from "./components/astalified/FlowBox";

export default function Applauncher() {
  const hyprland = Hyprland.get_default();
  const apps = new Apps.Apps({
    nameMultiplier: 2,
    entryMultiplier: 0,
    executableMultiplier: 2,
  });
  const appList = apps.fuzzy_query("")

  function AppButton({ app }: { app: Apps.Application }): JSX.Element {
    return (
      <button
        cssClasses={["appbutton"]}
        tooltipText={app.name}
        name={app.name}
        onActivate={(self) => {
          app.launch();
          App.toggle_window("Applauncher");
          self.parent.set_state_flags(Gtk.StateFlags.NORMAL, true);
        }}
      >
        <image iconName={app.get_icon_name() || ""} />
      </button>
    );
  }

  const appButtons = appList.map((app) => AppButton({app}))

  function filter_appbuttons(text: string) {
    appButtons.forEach(appbutton => {
      appbutton.name.toLowerCase().includes(text.toLowerCase()) ? appbutton.parent.show() : appbutton.parent.hide()
      appbutton.parent.set_state_flags(Gtk.StateFlags.NORMAL, true);
    })
  }

  function launch_first_visible_app() {
    appButtons.find( appbutton => appbutton.visible == true)?.activate()
  }

  return (
    <window
      anchor={ TOP | RIGHT | LEFT | BOTTOM }
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      keymode={Astal.Keymode.EXCLUSIVE}
      name={"Applauncher"}
      application={App}
      cssClasses={THEME().as(theme => ["Applauncher", theme])}
      monitor={bind(hyprland, "focused_monitor").as((monitor) => monitor.id)}
      onKeyPressed={(self, keyval) => keyval === Gdk.KEY_Escape && self.hide()}
    >
      <box halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER} vertical={true} spacing={8}>
        <entry onActivate={(self) => { launch_first_visible_app(); self.text = "" }} onChanged={self => filter_appbuttons(self.text)}/>
        <ScrolledWindow hscrollbarPolicy={Gtk.PolicyType.NEVER}>
          <FlowBox homogeneous minChildrenPerLine={4}>
            {appButtons}
          </FlowBox>
        </ScrolledWindow>
      </box>
    </window>
  );
}
