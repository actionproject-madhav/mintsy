import SpotPricesPanel from '../markets/SpotPricesPanel';

/** @deprecated Prefer SpotPricesPanel; kept for any legacy imports */
export default function LivePriceWidget() {
  return <SpotPricesPanel variant="compact" />;
}
