import "bootstrap/dist/css/bootstrap.min.css";
import classNames from "classnames/bind";
import styles from "./settings.module.scss";
import Sidebar from "@/app/settings/sidebar";
const cx = classNames.bind(styles);
export default function SettingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={cx("layout-wrapper")}>
      <div className={cx("layout-container")}>
        <div className={cx("layout-content")}>
          <Sidebar />
          {children}
        </div>
      </div>
    </div>
  );
}
