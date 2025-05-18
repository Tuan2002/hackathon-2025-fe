import { DOCUMENT_PRICE_STATUS_COLORS } from '@/constants/documentPriceStatuses';

interface IPriceStatus {
  text: string;
  color: string;
  label: string;
}
const generatePriceStatus = (price: number): IPriceStatus => {
  if (price > 0 && price <= 10) {
    return {
      text: 'Thấp',
      color: DOCUMENT_PRICE_STATUS_COLORS.LOW,
      label: price.toString(),
    };
  }
  if (price > 10 && price <= 100) {
    return {
      text: 'Trung bình',
      color: DOCUMENT_PRICE_STATUS_COLORS.MEDIUM,
      label: price.toString(),
    };
  }
  if (price > 100) {
    return {
      text: 'Cao',
      color: DOCUMENT_PRICE_STATUS_COLORS.HIGH,
      label: price.toString(),
    };
  }
  return {
    text: 'Miễn phí',
    color: DOCUMENT_PRICE_STATUS_COLORS.FREE,
    label: 'Miễn phí',
  };
};
export default generatePriceStatus;
