import { App, Astal, Gtk, Gdk } from "astal/gtk4";
import { Variable } from "astal";
import Workspaces from "./components/bar/workspaces";
import ThemeChanger from "./components/bar/themeChanger";
import BatteryStatus from "./components/bar/batteryStatus";
import VolumeStatus from "./components/bar/volumeStatus";
import BluetoothStatus from "./components/bar/bluetoothStatus";

const time = Variable("").poll(1000, () => {
  let now = new Date();
  return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
});

export default function Bar(gdkmonitor: Gdk.Monitor) {
  return (
    <window
      visible
      cssClasses={THEME().as((theme) => ["Bar", theme])}
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={App}
    >
      <centerbox cssName="centerbox">
        <box spacing={6}>
          <image cssClasses={["logo"]} iconName={"nixos-symbolic"} />
          <Workspaces />
          <ThemeChanger />
        </box>
        <box cssClasses={THEME().as((theme) => ["time", theme])}>
          <button>
            <label label={time()} />
          </button>
        </box>
        <box spacing={4}>
          <BluetoothStatus />
          <VolumeStatus />
          <BatteryStatus />
        </box>
      </centerbox>
    </window>
  );
}
