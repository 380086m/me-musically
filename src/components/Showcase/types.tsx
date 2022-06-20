import { ReactComponentElement } from "react";
import List from "../../components/List/List";

export interface ShowcaseProps {
  screenshotHeader?: string;
  header?: string;
  smallHeader?: string;
  selectorToDownload?: string;
  list: ReactComponentElement<typeof List>;
}
