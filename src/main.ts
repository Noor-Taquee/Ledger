import "./index.css";
import "./styles/animations.css";
import "./styles/colors.css";

import "./router.js";

import { formPanel } from "./pages/form-page/page.js";
import { homePanel } from "./pages/home-page/page.js";
import { historyPanel } from "./pages/history-page/page.js";

formPanel.dataset.index = "0";
homePanel.dataset.index = "1";
historyPanel.dataset.index = "2";
