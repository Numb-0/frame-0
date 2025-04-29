import { bind } from "astal";
import Bluetooth from "gi://AstalBluetooth";

export default function BluetoothStatus() {
  const bluetooth = Bluetooth.get_default();

  return (
    <box cssClasses={["bluetooth"]}>
      <menubutton>
        <image
          iconName={bind(bluetooth.adapter, "powered").as((powered) =>
            powered
              ? "bluetooth-active-symbolic"
              : "bluetooth-disabled-symbolic"
          )}
        />
        <popover>
            <box spacing={4}>
                <image iconName={"power-symbolic"} />
                <switch onNotifyActive={() => bluetooth.toggle()} />
            </box>
        </popover>
      </menubutton>
    </box>
  );
}