import { bind, execAsync, Variable } from "astal";
import { App, Astal, Gtk, Gdk, hook } from "astal/gtk4";
import Hyprland from "gi://AstalHyprland";
import { changeTheme } from "./components/bar/themeChanger";
import Bluetooth from "gi://AstalBluetooth";

export default function PowerActions() {
  const hyprland = Hyprland.get_default();
  const bluetooth = Bluetooth.get_default();
  var toggle = true;

  return (
    <window
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | RIGHT | LEFT | BOTTOM}
      keymode={Astal.Keymode.EXCLUSIVE}
      name={"PowerActions"}
      cssClasses={THEME().as((theme) => ["PowerActions", theme])}
      application={App}
      monitor={bind(hyprland, "focusedMonitor").as((monitor) => monitor.id)}
      onKeyPressed={(self, keyval) => keyval === Gdk.KEY_Escape && self.hide()}
    >
      <box halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER} spacing={6}>
        <button cssClasses={["power"]} onClicked={() => execAsync("poweroff")}>
          <image iconName="system-shutdown-symbolic" />
        </button>
        <button cssClasses={["reboot"]} onClicked={() => execAsync("reboot")}>
          <image iconName="system-reboot-symbolic" />
        </button>
        <button
          cssClasses={["lock"]}
          onClicked={() => {
            execAsync("hyprlock");
            App.get_window("PowerActions")?.hide();
          }}
        >
          <image iconName="lock-symbolic" />
        </button>
        <button cssClasses={["bluetooth"]} onClicked={() => bluetooth.toggle()}>
          <image
            iconName={bind(bluetooth.adapter, "powered").as((powered) =>
              powered
                ? "bluetooth-active-symbolic"
                : "bluetooth-disabled-symbolic"
            )}
          />
        </button>
        <button
          cssClasses={THEME().as(() =>
            (toggle = !toggle) ? ["swap"] : ["swap", "active"]
          )}
          onClicked={changeTheme}
        >
          <image iconName="arrow-symbolic" />
        </button>
      </box>
    </window>
  );
}
