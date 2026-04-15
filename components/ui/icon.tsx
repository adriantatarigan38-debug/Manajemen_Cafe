import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faBoxesStacked,
  faChartLine,
  faChevronDown,
  faChevronUp,
  faCircleExclamation,
  faClipboardList,
  faEye,
  faEyeSlash,
  faFileShield,
  faGaugeHigh,
  faLock,
  faMugHot,
  faRightToBracket,
  faSpinner,
  faUpload,
  faUser,
  faUsers,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const iconMap = {
  bars: faBars,
  bell: faBell,
  "chevron-down": faChevronDown,
  "chevron-up": faChevronUp,
  "circle-exclamation": faCircleExclamation,
  "gauge-high": faGaugeHigh,
  "mug-hot": faMugHot,
  "clipboard-list": faClipboardList,
  "boxes-stacked": faBoxesStacked,
  users: faUsers,
  user: faUser,
  "chart-line": faChartLine,
  "file-shield": faFileShield,
  upload: faUpload,
  xmark: faXmark,
  lock: faLock,
  eye: faEye,
  "eye-slash": faEyeSlash,
  spinner: faSpinner,
  "right-to-bracket": faRightToBracket,
};

export function Icon({
  name,
  className,
}: {
  name: keyof typeof iconMap;
  className?: string;
}) {
  return <FontAwesomeIcon icon={iconMap[name]} className={className} />;
}
